/** @jest-environment node */

import { resolveEnquiryMetadata } from '@/lib/enquiry/resolve-enquiry-metadata';

function createRequest(headers: Record<string, string>): Request {
  return new Request('https://example.com/api/contact', {
    method: 'POST',
    headers,
  });
}

describe('resolveEnquiryMetadata', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });
  it('uses server public IP and user agent when available', async () => {
    const metadata = await resolveEnquiryMetadata(
      createRequest({
        'x-forwarded-for': '203.0.113.10',
        'user-agent': 'Mozilla/5.0 Test Browser',
      }),
    );

    expect(metadata.ipAddress).toBe('203.0.113.10');
    expect(metadata.userAgent).toBe('Mozilla/5.0 Test Browser');
  });

  it('falls back to client metadata when server IP is localhost', async () => {
    const metadata = await resolveEnquiryMetadata(
      createRequest({
        'x-forwarded-for': '::1',
        'user-agent': 'Mozilla/5.0 Test Browser',
      }),
      {
        locationSource: 'ip',
        ipAddress: '115.129.45.102',
        userAgent: 'Mozilla/5.0 Client Browser',
        country: 'AU',
        region: 'Victoria',
        city: 'Melbourne',
        latitude: '-37.7468',
        longitude: '145.0681',
      },
    );

    expect(metadata.ipAddress).toBe('115.129.45.102');
    expect(metadata.userAgent).toBe('Mozilla/5.0 Test Browser');
    expect(metadata.country).toBe('AU');
    expect(metadata.region).toBe('Victoria');
    expect(metadata.city).toBe('Melbourne');
    expect(metadata.latitude).toBe('-37.7468');
    expect(metadata.longitude).toBe('145.0681');
    expect(metadata.locationSource).toBe('gps');
  });

  it('prefers GPS client coordinates over IP metadata', async () => {
    const metadata = await resolveEnquiryMetadata(
      createRequest({
        'x-forwarded-for': '::1',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      }),
      {
        locationSource: 'gps',
        ipAddress: '115.129.45.102',
        browser: 'Chrome 136.0.0.0',
        operatingSystem: 'macOS 10.15.7',
        country: 'AU',
        region: 'Victoria',
        city: 'The Basin',
        latitude: '-37.9123',
        longitude: '145.2567',
        detectedAddress: '78 Inverness Ave, The Basin VIC 3154, Australia',
      },
    );

    expect(metadata.locationSource).toBe('gps');
    expect(metadata.latitude).toBe('-37.9123');
    expect(metadata.longitude).toBe('145.2567');
    expect(metadata.city).toBe('The Basin');
    expect(metadata.browser).toBe('Chrome 136.0.0.0');
    expect(metadata.operatingSystem).toBe('macOS 10.15.7');
    expect(metadata.detectedAddress).toBe(
      '78 Inverness Ave, The Basin VIC 3154, Australia',
    );
  });

  it('enriches GPS coordinates with reverse geocode when city and country are unknown', async () => {
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
          }),
          { status: 200 },
        );
      }
      if (url.includes('nominatim.openstreetmap.org')) {
        return new Response(
          JSON.stringify({
            display_name:
              '275, Westend Marg, Saidulajaib Extension, Saket Tehsil, South Delhi, Delhi, 110016, India',
            address: {
              suburb: 'Saket Tehsil',
              city_district: 'South Delhi',
              city: 'Delhi',
              country_code: 'in',
            },
          }),
          { status: 200 },
        );
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const metadata = await resolveEnquiryMetadata(
      createRequest({
        'x-forwarded-for': '::1',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
      }),
      {
        locationSource: 'gps',
        browser: 'Chrome 148.0.0.0',
        operatingSystem: 'macOS 10.15.7',
        country: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        latitude: '28.51854133671542',
        longitude: '77.19920350041303',
      },
    );

    expect(metadata.locationSource).toBe('gps');
    expect(metadata.ipAddress).toBe('223.181.34.251');
    expect(metadata.city).toBe('Saket Tehsil');
    expect(metadata.region).toBe('South Delhi');
    expect(metadata.country).toBe('IN');
    expect(metadata.detectedAddress).toContain('Saket');
  });

  it('overrides wrong IP geo with reverse-geocode when GPS coordinates are present', async () => {
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
          }),
          { status: 200 },
        );
      }
      if (url.includes('nominatim.openstreetmap.org')) {
        return new Response(
          JSON.stringify({
            display_name:
              '275, Westend Marg, Saidulajaib Extension, Saket Tehsil, South Delhi, Delhi, 110016, India',
            address: {
              suburb: 'Saket Tehsil',
              city_district: 'South Delhi',
              city: 'Delhi',
              country_code: 'in',
            },
          }),
          { status: 200 },
        );
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const metadata = await resolveEnquiryMetadata(
      createRequest({
        'x-forwarded-for': '::1',
        'user-agent': 'Mozilla/5.0 Test Browser',
      }),
      {
        locationSource: 'gps',
        ipAddress: '223.181.34.251',
        country: 'IN',
        region: 'Haryana',
        city: 'Gurugram',
        latitude: '28.51854133671542',
        longitude: '77.19920350041303',
      },
    );

    expect(metadata.ipAddress).toBe('223.181.34.251');
    expect(metadata.region).toBe('South Delhi');
    expect(metadata.city).toBe('Saket Tehsil');
    expect(metadata.country).toBe('IN');
  });
});
