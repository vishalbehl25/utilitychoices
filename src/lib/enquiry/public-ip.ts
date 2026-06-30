import { lookupGeoFromIp } from '@/lib/enquiry/geo-lookup';
import { isPrivateIp, sanitizeIpAddress } from '@/lib/enquiry/request-metadata';

export interface PublicIpMetadata {
  ipAddress: string;
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
}

const PUBLIC_IP_TIMEOUT_MS = 6000;
const FETCH_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'UtilityChoice/1.0',
};

interface IpApiComSelfResponse {
  status?: string;
  query?: string;
  country?: string;
  countryCode?: string;
  regionName?: string;
  city?: string;
  lat?: number;
  lon?: number;
}

interface IpifyResponse {
  ip?: string;
}

function formatCoordinate(value: number | undefined): string {
  return typeof value === 'number' ? String(value) : 'N/A';
}

function mapPublicIpMetadata(data: {
  ip?: string;
  city?: string;
  country_code?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}): PublicIpMetadata | null {
  const ipAddress = data.ip?.trim();
  if (!ipAddress || isPrivateIp(ipAddress)) {
    return null;
  }

  return {
    ipAddress,
    country: data.country_code?.trim() || 'Unknown',
    region: data.region?.trim() || 'Unknown',
    city: data.city?.trim() || 'Unknown',
    latitude: formatCoordinate(data.latitude),
    longitude: formatCoordinate(data.longitude),
  };
}

async function fetchFromIpApiCom(): Promise<PublicIpMetadata | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PUBLIC_IP_TIMEOUT_MS);

  try {
    const response = await fetch(
      'http://ip-api.com/json/?fields=status,query,country,countryCode,regionName,city,lat,lon',
      {
        signal: controller.signal,
        headers: FETCH_HEADERS,
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpApiComSelfResponse;
    if (data.status !== 'success' || !data.query) {
      return null;
    }

    return mapPublicIpMetadata({
      ip: data.query,
      country_code: data.countryCode,
      region: data.regionName,
      city: data.city,
      latitude: data.lat,
      longitude: data.lon,
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchIpFromIpify(): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PUBLIC_IP_TIMEOUT_MS);

  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal,
      headers: FETCH_HEADERS,
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpifyResponse;
    const ipAddress = data.ip?.trim();
    return ipAddress && !isPrivateIp(ipAddress) ? ipAddress : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchFromIpifyWithGeo(): Promise<PublicIpMetadata | null> {
  const ipAddress = await fetchIpFromIpify();
  if (!ipAddress) {
    return null;
  }

  const geo = await lookupGeoFromIp(ipAddress);
  return {
    ipAddress,
    country: geo.country,
    region: geo.region,
    city: geo.city,
    latitude: geo.latitude,
    longitude: geo.longitude,
  };
}

export async function fetchPublicIpMetadata(): Promise<PublicIpMetadata | null> {
  const fromIpApiCom = await fetchFromIpApiCom();
  if (fromIpApiCom) {
    return fromIpApiCom;
  }

  return fetchFromIpifyWithGeo();
}

export async function fetchPublicIpAddress(): Promise<string | null> {
  const metadata = await fetchPublicIpMetadata();
  return metadata?.ipAddress ?? null;
}

export { sanitizeIpAddress };
