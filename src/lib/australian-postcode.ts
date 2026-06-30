/** Australian state / territory codes used for regional product filtering. */
export type AustralianState =
  | 'NSW'
  | 'VIC'
  | 'QLD'
  | 'SA'
  | 'WA'
  | 'TAS'
  | 'NT'
  | 'ACT';

export const STATE_LABELS: Record<AustralianState, string> = {
  NSW: 'New South Wales',
  VIC: 'Victoria',
  QLD: 'Queensland',
  SA: 'South Australia',
  WA: 'Western Australia',
  TAS: 'Tasmania',
  NT: 'Northern Territory',
  ACT: 'Australian Capital Territory',
};

const STATE_NAME_TO_CODE: Record<string, AustralianState> = {
  'new south wales': 'NSW',
  nsw: 'NSW',
  victoria: 'VIC',
  vic: 'VIC',
  queensland: 'QLD',
  qld: 'QLD',
  'south australia': 'SA',
  sa: 'SA',
  'western australia': 'WA',
  wa: 'WA',
  tasmania: 'TAS',
  tas: 'TAS',
  'northern territory': 'NT',
  nt: 'NT',
  'australian capital territory': 'ACT',
  act: 'ACT',
};

/** Map long state names (Google / Photon) to short codes. */
export function normalizeAustralianState(
  value: string | null | undefined,
): AustralianState | null {
  if (!value) return null;
  const key = value.trim().toLowerCase();
  return STATE_NAME_TO_CODE[key] ?? null;
}

/**
 * Derive state from a 4-digit Australian postcode (range-based lookup).
 * @see Australia Post postcode ranges by state
 */
export function getStateFromPostcode(postcode: string): AustralianState | null {
  const pc = parseInt(postcode, 10);
  if (Number.isNaN(pc) || postcode.length !== 4) return null;

  if (
    (pc >= 2000 && pc <= 2599) ||
    (pc >= 2619 && pc <= 2899) ||
    (pc >= 2921 && pc <= 2999)
  ) {
    return 'NSW';
  }
  if (
    (pc >= 2600 && pc <= 2618) ||
    (pc >= 2900 && pc <= 2920) ||
    (pc >= 3000 && pc <= 3999)
  ) {
    return 'VIC';
  }
  if (
    (pc >= 4000 && pc <= 4999) ||
    (pc >= 9000 && pc <= 9999)
  ) {
    return 'QLD';
  }
  if (pc >= 5000 && pc <= 5999) return 'SA';
  if (pc >= 6000 && pc <= 6999) return 'WA';
  if (pc >= 7000 && pc <= 7999) return 'TAS';
  if (
    (pc >= 800 && pc <= 999) ||
    (pc >= 8000 && pc <= 8999)
  ) {
    return 'NT';
  }
  if (pc >= 200 && pc <= 299) return 'ACT';

  return null;
}

export function getStateLabel(state: AustralianState | null): string | null {
  return state ? STATE_LABELS[state] : null;
}
