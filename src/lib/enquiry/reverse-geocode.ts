import type { EnquiryGeoData } from '@/lib/enquiry/types';

export interface ReverseGeocodeResult extends EnquiryGeoData {
  formattedAddress?: string;
}

const GEOCODE_TIMEOUT_MS = 5000;
const NOMINATIM_USER_AGENT = 'UtilityChoice/1.0 (enquiry reverse geocode)';

interface GoogleGeocodeResponse {
  status: string;
  results?: Array<{
    formatted_address?: string;
    address_components?: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  }>;
}

interface NominatimResponse {
  display_name?: string;
  address?: Record<string, string>;
}

function getGoogleComponent(
  components: Array<{ long_name: string; short_name: string; types: string[] }>,
  types: string[],
  useShort = false,
): string {
  for (const type of types) {
    const match = components.find((component) => component.types.includes(type));
    if (match) {
      return (useShort ? match.short_name : match.long_name).trim();
    }
  }
  return '';
}

function mapGoogleResult(result: NonNullable<GoogleGeocodeResponse['results']>[number]): ReverseGeocodeResult {
  const components = result.address_components ?? [];

  return {
    formattedAddress: result.formatted_address?.trim(),
    city:
      getGoogleComponent(components, [
        'locality',
        'postal_town',
        'sublocality_level_1',
        'sublocality',
        'neighborhood',
        'administrative_area_level_2',
      ]) || 'Unknown',
    region: getGoogleComponent(components, ['administrative_area_level_1']) || 'Unknown',
    country: getGoogleComponent(components, ['country'], true) || 'Unknown',
    latitude: 'N/A',
    longitude: 'N/A',
  };
}

function pickNominatimCity(address: Record<string, string>): string {
  return (
    address.suburb?.trim() ||
    address.city_district?.trim() ||
    address.city?.trim() ||
    address.town?.trim() ||
    address.village?.trim() ||
    address.hamlet?.trim() ||
    ''
  );
}

function pickNominatimRegion(address: Record<string, string>): string {
  return (
    address.state?.trim() ||
    address.region?.trim() ||
    address.county?.trim() ||
    address.city_district?.trim() ||
    address.city?.trim() ||
    ''
  );
}

function mapNominatimResult(data: NominatimResponse): ReverseGeocodeResult | null {
  const address = data.address;
  if (!address) {
    return null;
  }

  const city = pickNominatimCity(address);
  const region = pickNominatimRegion(address);
  const country = address.country_code?.trim().toUpperCase() || 'Unknown';

  if (!city && !region && country === 'Unknown') {
    return null;
  }

  return {
    formattedAddress: data.display_name?.trim(),
    city: city || 'Unknown',
    region: region || 'Unknown',
    country,
    latitude: 'N/A',
    longitude: 'N/A',
  };
}

async function reverseGeocodeWithGoogle(
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodeResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEOCODE_TIMEOUT_MS);

  try {
    const params = new URLSearchParams({
      latlng: `${latitude},${longitude}`,
      key: apiKey,
      language: 'en',
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`,
      { signal: controller.signal, cache: 'no-store' },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GoogleGeocodeResponse;
    if (data.status !== 'OK' || !data.results?.length) {
      return null;
    }

    return mapGoogleResult(data.results[0]);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function reverseGeocodeWithNominatim(
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodeResult | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEOCODE_TIMEOUT_MS);

  try {
    const params = new URLSearchParams({
      lat: String(latitude),
      lon: String(longitude),
      format: 'json',
      addressdetails: '1',
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
      {
        signal: controller.signal,
        cache: 'no-store',
        headers: { 'User-Agent': NOMINATIM_USER_AGENT },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as NominatimResponse;
    return mapNominatimResult(data);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function pickEnrichedField(
  enrichedValue: string,
  baseValue: string,
): string {
  return enrichedValue !== 'Unknown' ? enrichedValue : baseValue;
}

export function mergeGeoFromCoordinates(
  base: EnquiryGeoData,
  enriched: ReverseGeocodeResult,
): EnquiryGeoData {
  return {
    country: pickEnrichedField(enriched.country, base.country),
    region: pickEnrichedField(enriched.region, base.region),
    city: pickEnrichedField(enriched.city, base.city),
    latitude: base.latitude,
    longitude: base.longitude,
  };
}

function mergeGeo(
  base: EnquiryGeoData,
  enriched: ReverseGeocodeResult,
): EnquiryGeoData {
  return {
    country: base.country !== 'Unknown' ? base.country : enriched.country,
    region: base.region !== 'Unknown' ? base.region : enriched.region,
    city: base.city !== 'Unknown' ? base.city : enriched.city,
    latitude: base.latitude,
    longitude: base.longitude,
  };
}

export async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodeResult | null> {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  const google = await reverseGeocodeWithGoogle(latitude, longitude);
  if (google && google.country !== 'Unknown') {
    return {
      ...google,
      latitude: String(latitude),
      longitude: String(longitude),
    };
  }

  const nominatim = await reverseGeocodeWithNominatim(latitude, longitude);
  if (nominatim) {
    return {
      ...nominatim,
      latitude: String(latitude),
      longitude: String(longitude),
    };
  }

  return google
    ? {
        ...google,
        latitude: String(latitude),
        longitude: String(longitude),
      }
    : null;
}

export function enrichGeoData(
  geo: EnquiryGeoData,
  enriched: ReverseGeocodeResult,
  preferCoordinates = false,
): EnquiryGeoData {
  return preferCoordinates
    ? mergeGeoFromCoordinates(geo, enriched)
    : mergeGeo(geo, enriched);
}
