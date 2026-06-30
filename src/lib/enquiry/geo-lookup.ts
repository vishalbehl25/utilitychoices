import { lookupGeoFromIpLocal } from '@/lib/enquiry/geoip-lite-lookup';
import { isPrivateIp } from '@/lib/enquiry/request-metadata';
import type { EnquiryGeoData } from '@/lib/enquiry/types';

const FALLBACK_GEO: EnquiryGeoData = {
  country: 'Unknown',
  region: 'Unknown',
  city: 'Unknown',
  latitude: 'N/A',
  longitude: 'N/A',
};

const GEO_TIMEOUT_MS = 4000;

interface IpWhoIsResponse {
  success?: boolean;
  city?: string;
  country_code?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

interface IpApiCoResponse {
  city?: string;
  country_code?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  error?: boolean;
}

interface IpApiComResponse {
  status?: string;
  country?: string;
  countryCode?: string;
  regionName?: string;
  city?: string;
  lat?: number;
  lon?: number;
}

function formatCoordinate(value: number | undefined): string {
  return typeof value === 'number' ? String(value) : 'N/A';
}

function mapGeoResponse(data: {
  city?: string;
  country_code?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}): EnquiryGeoData {
  return {
    country: data.country_code?.trim() || 'Unknown',
    region: data.region?.trim() || 'Unknown',
    city: data.city?.trim() || 'Unknown',
    latitude: formatCoordinate(data.latitude),
    longitude: formatCoordinate(data.longitude),
  };
}

async function fetchGeoFromIpWhoIs(ipAddress: string): Promise<EnquiryGeoData | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ipAddress)}`,
      {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpWhoIsResponse;
    if (!data.success) {
      return null;
    }

    return mapGeoResponse(data);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchGeoFromIpApiCom(ipAddress: string): Promise<EnquiryGeoData | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);

  try {
    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ipAddress)}?fields=status,country,countryCode,regionName,city,lat,lon`,
      {
        signal: controller.signal,
        headers: { Accept: 'application/json', 'User-Agent': 'UtilityChoice/1.0' },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpApiComResponse;
    if (data.status !== 'success') {
      return null;
    }

    return mapGeoResponse({
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

async function fetchGeoFromIpApiCo(ipAddress: string): Promise<EnquiryGeoData | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://ipapi.co/${encodeURIComponent(ipAddress)}/json/`,
      {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpApiCoResponse;
    if (data.error) {
      return null;
    }

    return mapGeoResponse(data);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function lookupGeoFromIp(ipAddress: string): Promise<EnquiryGeoData> {
  if (isPrivateIp(ipAddress)) {
    return FALLBACK_GEO;
  }

  const fromGeoIpLite = lookupGeoFromIpLocal(ipAddress);
  if (fromGeoIpLite && fromGeoIpLite.country !== 'Unknown') {
    return fromGeoIpLite;
  }

  const fromIpApiCom = await fetchGeoFromIpApiCom(ipAddress);
  if (fromIpApiCom && fromIpApiCom.country !== 'Unknown') {
    return fromIpApiCom;
  }

  const fromIpWhoIs = await fetchGeoFromIpWhoIs(ipAddress);
  if (fromIpWhoIs && fromIpWhoIs.country !== 'Unknown') {
    return fromIpWhoIs;
  }

  const fromIpApiCo = await fetchGeoFromIpApiCo(ipAddress);
  if (fromIpApiCo && fromIpApiCo.country !== 'Unknown') {
    return fromIpApiCo;
  }

  return FALLBACK_GEO;
}
