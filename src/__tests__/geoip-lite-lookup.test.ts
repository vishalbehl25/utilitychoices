/** @jest-environment node */

import { lookupGeoFromIpLocal } from '@/lib/enquiry/geoip-lite-lookup';

describe('lookupGeoFromIpLocal', () => {
  it('returns null for private IPs', () => {
    expect(lookupGeoFromIpLocal('127.0.0.1')).toBeNull();
    expect(lookupGeoFromIpLocal('192.168.1.1')).toBeNull();
    expect(lookupGeoFromIpLocal('10.0.0.1')).toBeNull();
  });

  it('returns null for invalid or empty IPs', () => {
    expect(lookupGeoFromIpLocal('')).toBeNull();
    expect(lookupGeoFromIpLocal('Unknown')).toBeNull();
  });

  it('resolves a known public IP to geo data', () => {
    const result = lookupGeoFromIpLocal('8.8.8.8');

    expect(result).not.toBeNull();
    expect(result?.country).toBe('US');
    expect(result?.latitude).not.toBe('N/A');
    expect(result?.longitude).not.toBe('N/A');
  });
});
