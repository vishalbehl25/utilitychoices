/** @jest-environment node */

import {
  fetchPublicIpAddress,
  fetchPublicIpMetadata,
  sanitizeIpAddress,
} from '@/lib/enquiry/public-ip';

describe('public-ip', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('sanitizes private and localhost IPs', () => {
    expect(sanitizeIpAddress('::1')).toBeUndefined();
    expect(sanitizeIpAddress('127.0.0.1')).toBeUndefined();
    expect(sanitizeIpAddress('192.168.1.4')).toBeUndefined();
    expect(sanitizeIpAddress('223.181.34.251')).toBe('223.181.34.251');
  });

  it('resolves public IP from ip-api.com', async () => {
    global.fetch = jest.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('ip-api.com/json/?fields=')) {
        return new Response(
          JSON.stringify({
            status: 'success',
            query: '223.181.34.251',
            countryCode: 'IN',
            regionName: 'Haryana',
            city: 'Gurugram',
            lat: 28.4594965,
            lon: 77.0266383,
          }),
          { status: 200 },
        );
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const metadata = await fetchPublicIpMetadata();
    expect(metadata).toMatchObject({
      ipAddress: '223.181.34.251',
      country: 'IN',
      region: 'Haryana',
      city: 'Gurugram',
    });

    const ip = await fetchPublicIpAddress();
    expect(ip).toBe('223.181.34.251');
  });

  it('falls back to ipify when ip-api.com fails', async () => {
    global.fetch = jest.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('ip-api.com/json/?fields=')) {
        return new Response('', { status: 503 });
      }
      if (url.includes('api.ipify.org')) {
        return new Response(JSON.stringify({ ip: '223.181.34.251' }), {
          status: 200,
        });
      }
      if (url.includes('ip-api.com/json/223.181.34.251')) {
        return new Response(
          JSON.stringify({
            status: 'success',
            countryCode: 'IN',
            regionName: 'Haryana',
            city: 'Gurugram',
            lat: 28.4594965,
            lon: 77.0266383,
          }),
          { status: 200 },
        );
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const metadata = await fetchPublicIpMetadata();
    expect(metadata).toMatchObject({
      ipAddress: '223.181.34.251',
      country: 'IN',
      region: 'DL',
      city: 'New Delhi',
    });
  });
});
