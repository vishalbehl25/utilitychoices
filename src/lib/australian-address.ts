/** Australia bounding box for geocoding APIs (Photon / fallback). */
export const AUSTRALIA_BBOX = '112.921114,-43.740498,153.638283,-10.137015';

const POSTCODE_REGEX = /\b(0[289][0-9]{2}|[1-9][0-9]{3})\b/;

/** Extract a 4-digit Australian postcode from a full address label. */
export function extractAustralianPostcode(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const fourDigitOnly = trimmed.match(/^[0-9]{4}$/);
  if (fourDigitOnly) return fourDigitOnly[0];

  const matches = [...trimmed.matchAll(new RegExp(POSTCODE_REGEX.source, 'g'))];
  if (matches.length === 0) return null;

  return matches[matches.length - 1][1];
}

export interface AddressSuggestion {
  id: string;
  label: string;
  postcode: string | null;
}

export function formatPhotonFeature(
  properties: Record<string, unknown>
): AddressSuggestion {
  const name = str(properties.name);
  const street = str(properties.street);
  const housenumber = str(properties.housenumber);
  const city = str(properties.city);
  const state = str(properties.state);
  const postcode = str(properties.postcode);
  const country = str(properties.country) || 'Australia';

  const streetLine = [housenumber, street].filter(Boolean).join(' ');
  const primary = name || streetLine || city;

  const localityParts: string[] = [];
  if (streetLine && primary !== streetLine && !primary.includes(streetLine)) {
    localityParts.push(streetLine);
  }
  const cityState = [city, state, postcode].filter(Boolean).join(' ');
  if (cityState) localityParts.push(cityState);

  let label = primary;
  if (localityParts.length > 0) {
    const suffix = localityParts.join(', ');
    label = label.includes(suffix) ? label : `${label}, ${suffix}`;
  }
  if (!/australia/i.test(label)) {
    label = `${label}, ${country}`;
  }

  const resolvedPostcode = postcode || extractAustralianPostcode(label);

  return {
    id: `${primary}-${city}-${postcode}`.slice(0, 120),
    label,
    postcode: resolvedPostcode,
  };
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}
