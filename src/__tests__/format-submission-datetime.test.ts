/** @jest-environment node */

import {
  formatSubmissionDateTime,
  resolveSubmissionTimeZone,
} from '@/lib/enquiry/format-submission-datetime';

describe('format-submission-datetime', () => {
  it('formats using the browser timezone when provided', () => {
    const formatted = formatSubmissionDateTime(
      '2026-06-08T10:04:33.940Z',
      'Asia/Kolkata',
    );

    expect(formatted).toMatch(/08\/06\/26/i);
    expect(formatted.toLowerCase()).toContain('3:34');
  });

  it('falls back to country timezone when browser timezone is missing', () => {
    expect(resolveSubmissionTimeZone({ country: 'IN' })).toBe('Asia/Kolkata');
    expect(resolveSubmissionTimeZone({ country: 'AU' })).toBe(
      'Australia/Adelaide',
    );
  });

  it('defaults to Adelaide for unknown countries', () => {
    expect(resolveSubmissionTimeZone({ country: 'US' })).toBe(
      'Australia/Adelaide',
    );
  });
});
