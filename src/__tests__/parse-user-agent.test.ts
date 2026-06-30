/** @jest-environment node */

import { parseUserAgent } from '@/lib/enquiry/parse-user-agent';

describe('parseUserAgent', () => {
  it('parses Chrome on macOS', () => {
    const result = parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    );

    expect(result.browser).toBe('Chrome 136.0.0.0');
    expect(result.operatingSystem).toBe('macOS 10.15.7');
  });

  it('parses Edge on Windows', () => {
    const result = parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    );

    expect(result.browser).toBe('Edge 120.0.0.0');
    expect(result.operatingSystem).toBe('Windows 10');
  });
});
