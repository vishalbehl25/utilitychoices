/** @jest-environment node */

import {
  mergeGeoFromCoordinates,
  reverseGeocodeCoordinates,
} from '@/lib/enquiry/reverse-geocode';

describe('reverseGeocodeCoordinates', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    delete process.env.GOOGLE_PLACES_API_KEY;
  });

  it('uses Nominatim when Google API key is not configured', async () => {
    global.fetch = jest.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
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

    const result = await reverseGeocodeCoordinates(28.518541, 77.199203);

    expect(result).toMatchObject({
      city: 'Saket Tehsil',
      region: 'South Delhi',
      country: 'IN',
      latitude: '28.518541',
      longitude: '77.199203',
    });
    expect(result?.formattedAddress).toContain('Saket');
  });

  it('prefers reverse-geocode values over IP geo when merging from coordinates', () => {
    const merged = mergeGeoFromCoordinates(
      {
        country: 'IN',
        region: 'Haryana',
        city: 'Gurugram',
        latitude: '28.518541',
        longitude: '77.199203',
      },
      {
        country: 'IN',
        region: 'South Delhi',
        city: 'Saket Tehsil',
        latitude: '28.518541',
        longitude: '77.199203',
        formattedAddress: 'Saket, Delhi, India',
      },
    );

    expect(merged.region).toBe('South Delhi');
    expect(merged.city).toBe('Saket Tehsil');
    expect(merged.latitude).toBe('28.518541');
  });
});
