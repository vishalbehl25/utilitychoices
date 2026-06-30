/** @jest-environment node */

import {
  extractClientIp,
  extractRequestMetadata,
  extractUserAgent,
} from '@/lib/enquiry/request-metadata';

function createRequest(headers: Record<string, string>): Request {
  return new Request('https://example.com/api/contact', {
    method: 'POST',
    headers,
  });
}

describe('request-metadata', () => {
  it('extracts the first IP from x-forwarded-for', () => {
    const request = createRequest({
      'x-forwarded-for': '203.0.113.10, 10.0.0.1',
    });
    expect(extractClientIp(request)).toBe('203.0.113.10');
  });

  it('falls back to x-real-ip and cf-connecting-ip', () => {
    expect(
      extractClientIp(createRequest({ 'x-real-ip': '198.51.100.4' })),
    ).toBe('198.51.100.4');
    expect(
      extractClientIp(createRequest({ 'cf-connecting-ip': '192.0.2.1' })),
    ).toBe('192.0.2.1');
  });

  it('returns Unknown when no IP headers are present', () => {
    expect(extractClientIp(createRequest({}))).toBe('Unknown');
  });

  it('extracts user agent and bundles request metadata', () => {
    const request = createRequest({
      'x-forwarded-for': '203.0.113.10',
      'user-agent': 'Mozilla/5.0 Test Browser',
    });

    expect(extractUserAgent(request)).toBe('Mozilla/5.0 Test Browser');
    expect(extractRequestMetadata(request)).toEqual({
      ipAddress: '203.0.113.10',
      userAgent: 'Mozilla/5.0 Test Browser',
    });
  });
});
