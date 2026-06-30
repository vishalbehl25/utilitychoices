const COUNTRY_TIMEZONE_FALLBACK: Record<string, string> = {
  IN: 'Asia/Kolkata',
  AU: 'Australia/Adelaide',
};

const DEFAULT_TIMEZONE = 'Australia/Adelaide';

function isValidTimeZone(timeZone?: string): timeZone is string {
  if (!timeZone?.trim()) return false;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timeZone.trim() });
    return true;
  } catch {
    return false;
  }
}

export function resolveSubmissionTimeZone(input?: {
  timeZone?: string;
  country?: string;
}): string {
  if (isValidTimeZone(input?.timeZone)) {
    return input.timeZone.trim();
  }

  const country = input?.country?.trim().toUpperCase();
  if (country && COUNTRY_TIMEZONE_FALLBACK[country]) {
    return COUNTRY_TIMEZONE_FALLBACK[country];
  }

  return DEFAULT_TIMEZONE;
}

export function formatSubmissionDateTime(
  iso: string,
  timeZone?: string,
): string {
  const resolvedTimeZone = resolveSubmissionTimeZone({ timeZone });

  return new Intl.DateTimeFormat('en-AU', {
    timeZone: resolvedTimeZone,
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(iso));
}

export function getBrowserTimeZone(): string | undefined {
  if (typeof Intl === 'undefined') {
    return undefined;
  }

  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return undefined;
  }
}
