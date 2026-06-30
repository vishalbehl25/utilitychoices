/** Server-only — uses geoip-lite bundled database. Do not import from client code. */
import geoip from 'geoip-lite';
import { isPrivateIp } from '@/lib/enquiry/request-metadata';
import type { EnquiryGeoData } from '@/lib/enquiry/types';

function formatCoordinate(value: number | undefined): string {
  return typeof value === 'number' && Number.isFinite(value) ? String(value) : 'N/A';
}

export function lookupGeoFromIpLocal(ipAddress: string): EnquiryGeoData | null {
  const trimmed = ipAddress.trim();
  if (!trimmed || trimmed === 'Unknown' || isPrivateIp(trimmed)) {
    return null;
  }

  const geo = geoip.lookup(trimmed);
  if (!geo?.country) {
    return null;
  }

  const [latitude, longitude] = geo.ll ?? [];

  return {
    country: geo.country.trim(),
    region: geo.region?.trim() || 'Unknown',
    city: geo.city?.trim() || 'Unknown',
    latitude: formatCoordinate(latitude),
    longitude: formatCoordinate(longitude),
  };
}
