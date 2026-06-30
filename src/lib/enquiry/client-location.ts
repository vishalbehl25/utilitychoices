import { getBrowserTimeZone } from '@/lib/enquiry/format-submission-datetime';
import { parseUserAgent } from '@/lib/enquiry/parse-user-agent';
import { sanitizeIpAddress } from '@/lib/enquiry/request-metadata';
import type { ClientSubmissionMetadata } from '@/lib/enquiry/types';

const GPS_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 12000,
  maximumAge: 0,
};

interface IpWhoIsResponse {
  success?: boolean;
  ip?: string;
  city?: string;
  country_code?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

interface ReverseGeocodeResponse {
  success?: boolean;
  formattedAddress?: string;
  city?: string;
  region?: string;
  country?: string;
}

function formatCoordinate(value: number | undefined): string {
  return typeof value === 'number' ? String(value) : 'N/A';
}

function getNavigatorUserAgent(): string | undefined {
  return typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
}

function withParsedAgent(
  metadata: ClientSubmissionMetadata,
  userAgent?: string,
): ClientSubmissionMetadata {
  const ua = userAgent?.trim() || metadata.userAgent?.trim() || 'Unknown';
  const parsed = parseUserAgent(ua);
  const timeZone = metadata.timeZone ?? getBrowserTimeZone();
  return {
    ...metadata,
    userAgent: ua,
    browser: parsed.browser,
    operatingSystem: parsed.operatingSystem,
    timeZone,
  };
}

function withSanitizedIp(
  metadata: ClientSubmissionMetadata,
): ClientSubmissionMetadata {
  const ipAddress = sanitizeIpAddress(metadata.ipAddress);
  if (!ipAddress) {
    const { ipAddress: _removed, ...rest } = metadata;
    return rest;
  }
  return { ...metadata, ipAddress };
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, GPS_OPTIONS);
  });
}

async function isGeolocationDenied(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.permissions?.query) {
    return false;
  }

  try {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    return status.state === 'denied';
  } catch {
    return false;
  }
}

async function tryGetCurrentPosition(): Promise<GeolocationPosition | null> {
  if (await isGeolocationDenied()) {
    return null;
  }

  try {
    return await getCurrentPosition();
  } catch (error) {
    const geoError = error as GeolocationPositionError;
    if (geoError?.code === 1) {
      return null;
    }
    return null;
  }
}

async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodeResponse | null> {
  try {
    const params = new URLSearchParams({
      lat: String(latitude),
      lng: String(longitude),
    });
    const response = await fetch(`/api/geocode/reverse?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as ReverseGeocodeResponse;
  } catch {
    return null;
  }
}

function mapIpWhoIsResponse(
  data: IpWhoIsResponse,
): ClientSubmissionMetadata | null {
  if (!data.success || !data.ip) {
    return null;
  }

  const ipAddress = sanitizeIpAddress(data.ip);
  if (!ipAddress) {
    return null;
  }

  return {
    locationSource: 'ip',
    ipAddress,
    city: data.city?.trim(),
    country: data.country_code?.trim() || 'Unknown',
    region: data.region?.trim() || 'Unknown',
    latitude: formatCoordinate(data.latitude),
    longitude: formatCoordinate(data.longitude),
  };
}

async function fetchIpMetadataFromBrowser(): Promise<ClientSubmissionMetadata | null> {
  try {
    const response = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (!response.ok) return null;
    const data = (await response.json()) as IpWhoIsResponse;
    return mapIpWhoIsResponse(data);
  } catch {
    return null;
  }
}

async function fetchIpMetadataFromServer(): Promise<ClientSubmissionMetadata | null> {
  try {
    const response = await fetch('/api/enquiry-metadata', { cache: 'no-store' });
    if (!response.ok) return null;
    const data = (await response.json()) as ClientSubmissionMetadata;
    const ipAddress = sanitizeIpAddress(data.ipAddress);
    if (!ipAddress) {
      return null;
    }
    return withSanitizedIp({ ...data, locationSource: 'ip', ipAddress });
  } catch {
    return null;
  }
}

async function fetchIpMetadata(): Promise<ClientSubmissionMetadata> {
  const fromServer = await fetchIpMetadataFromServer();
  if (fromServer?.country && fromServer.country !== 'Unknown') {
    return fromServer;
  }

  const fromBrowser = await fetchIpMetadataFromBrowser();
  if (fromBrowser?.country && fromBrowser.country !== 'Unknown') {
    return fromBrowser;
  }

  return withSanitizedIp({
    locationSource: 'ip',
    ipAddress: fromServer?.ipAddress ?? fromBrowser?.ipAddress,
    city: fromServer?.city ?? fromBrowser?.city,
    country: fromServer?.country ?? fromBrowser?.country ?? 'Unknown',
    region: fromServer?.region ?? fromBrowser?.region ?? 'Unknown',
    latitude: fromServer?.latitude ?? fromBrowser?.latitude ?? 'N/A',
    longitude: fromServer?.longitude ?? fromBrowser?.longitude ?? 'N/A',
  });
}

async function fetchGpsMetadata(
  userAgent?: string,
): Promise<ClientSubmissionMetadata | null> {
  const position = await tryGetCurrentPosition();
  if (!position) {
    return null;
  }

  try {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const reverse = await reverseGeocodeCoordinates(latitude, longitude);
    const ipMeta = await fetchIpMetadata();

    return withSanitizedIp(
      withParsedAgent(
        {
          locationSource: 'gps',
          ipAddress: ipMeta.ipAddress,
          latitude: String(latitude),
          longitude: String(longitude),
          city: reverse?.city?.trim() || ipMeta.city,
          region: reverse?.region?.trim() || ipMeta.region,
          country: reverse?.country?.trim() || ipMeta.country,
          detectedAddress: reverse?.formattedAddress,
        },
        userAgent,
      ),
    );
  } catch {
    return null;
  }
}

export interface ClientMapMetadata {
  latitude?: string;
  longitude?: string;
  city?: string;
  region?: string;
  country?: string;
  detectedAddress?: string;
}

let cachedLocation: Promise<ClientSubmissionMetadata> | null = null;
let cachedMapLocation: Promise<ClientMapMetadata | null> | null = null;

async function fetchGpsMapMetadata(): Promise<ClientMapMetadata | null> {
  const position = await tryGetCurrentPosition();
  if (!position) {
    return null;
  }

  try {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const reverse = await reverseGeocodeCoordinates(latitude, longitude);

    return {
      latitude: String(latitude),
      longitude: String(longitude),
      city: reverse?.city?.trim(),
      region: reverse?.region?.trim(),
      country: reverse?.country?.trim(),
      detectedAddress: reverse?.formattedAddress,
    };
  } catch {
    return null;
  }
}

async function fetchIpMapMetadata(): Promise<ClientMapMetadata | null> {
  const ipMeta = await fetchIpMetadata();
  if (!isValidCoordinate(ipMeta.latitude) || !isValidCoordinate(ipMeta.longitude)) {
    return null;
  }

  return {
    latitude: ipMeta.latitude,
    longitude: ipMeta.longitude,
    city: ipMeta.city,
    region: ipMeta.region,
    country: ipMeta.country,
  };
}

function isValidCoordinate(value?: string): boolean {
  if (!value || value === 'N/A') return false;
  return Number.isFinite(Number(value));
}

export async function getClientMapMetadata(): Promise<ClientMapMetadata | null> {
  if (!cachedMapLocation) {
    cachedMapLocation = resolveClientMapLocation();
  }
  return cachedMapLocation;
}

async function resolveClientMapLocation(): Promise<ClientMapMetadata | null> {
  const gpsMap = await fetchGpsMapMetadata();
  if (gpsMap) {
    return gpsMap;
  }

  return fetchIpMapMetadata();
}

export async function getClientSubmissionMetadata(): Promise<ClientSubmissionMetadata> {
  if (!cachedLocation) {
    cachedLocation = resolveClientLocation();
  }
  return cachedLocation;
}

export function resetClientLocationCache(): void {
  cachedLocation = null;
  cachedMapLocation = null;
}

async function resolveClientLocation(): Promise<ClientSubmissionMetadata> {
  const userAgent = getNavigatorUserAgent();
  const gpsMetadata = await fetchGpsMetadata(userAgent);
  if (gpsMetadata) {
    return gpsMetadata;
  }

  const ipMetadata = await fetchIpMetadata();
  return withParsedAgent(withSanitizedIp(ipMetadata), userAgent);
}
