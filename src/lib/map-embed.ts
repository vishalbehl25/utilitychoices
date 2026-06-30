import { SITE_CONFIG } from '@/constants/navigation';

/**
 * Classic Google Maps iframe embed.
 * Includes Map / Satellite toggle and the Labels checkbox in satellite view.
 * (Maps Embed API v1 does not expose those controls.)
 */
const LEGACY_EMBED_BASE = 'https://www.google.com/maps';

function isValidCoordinate(value?: string): value is string {
  if (!value || value === 'N/A') return false;
  return Number.isFinite(Number(value));
}

function buildLegacyEmbedUrl(query: string, zoom = '15'): string {
  const params = new URLSearchParams({
    q: query,
    hl: 'en',
    z: zoom,
    output: 'embed',
  });
  return `${LEGACY_EMBED_BASE}?${params.toString()}`;
}

function buildLegacyCoordinateEmbedUrl(
  latitude: string,
  longitude: string,
  zoom = '15',
): string {
  const coords = `${latitude},${longitude}`;
  const params = new URLSearchParams({
    q: coords,
    ll: coords,
    hl: 'en',
    z: zoom,
    output: 'embed',
  });
  return `${LEGACY_EMBED_BASE}?${params.toString()}`;
}

export function buildOfficeMapEmbedUrl(): string {
  const { street, locality, region, postalCode } = SITE_CONFIG.address;
  const query = `${street}, ${locality} ${region} ${postalCode}, Australia`;
  return buildLegacyEmbedUrl(query, '14');
}

export function buildCoordinatesMapEmbedUrl(
  latitude: string,
  longitude: string,
): string {
  return buildLegacyCoordinateEmbedUrl(latitude, longitude, '15');
}

export function buildVisitorMapEmbedUrl(input: {
  latitude?: string;
  longitude?: string;
  city?: string;
  region?: string;
  country?: string;
  detectedAddress?: string;
}): string | null {
  if (isValidCoordinate(input.latitude) && isValidCoordinate(input.longitude)) {
    return buildCoordinatesMapEmbedUrl(input.latitude, input.longitude);
  }

  const locationParts = [input.detectedAddress, input.city, input.region, input.country]
    .map((part) => part?.trim())
    .filter((part) => part && part !== 'Unknown');

  if (locationParts.length === 0) {
    return null;
  }

  return buildLegacyEmbedUrl(locationParts[0]!);
}

export function resolveMapEmbedUrl(input: {
  latitude?: string;
  longitude?: string;
  query?: string;
}): string {
  if (isValidCoordinate(input.latitude) && isValidCoordinate(input.longitude)) {
    return buildCoordinatesMapEmbedUrl(input.latitude, input.longitude);
  }

  if (input.query?.trim()) {
    return buildLegacyEmbedUrl(input.query.trim());
  }

  return buildOfficeMapEmbedUrl();
}
