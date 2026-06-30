import {
  extractAustralianPostcode,
  formatPhotonFeature,
} from '@/lib/australian-address';

describe('extractAustralianPostcode', () => {
  it('extracts from end of address', () => {
    expect(
      extractAustralianPostcode('124 Western Avenue, Montville QLD 4560, Australia'),
    ).toBe('4560');
  });

  it('accepts postcode-only input', () => {
    expect(extractAustralianPostcode('3000')).toBe('3000');
  });
});

describe('formatPhotonFeature', () => {
  it('formats a named place', () => {
    const result = formatPhotonFeature({
      name: '12 Apostles',
      state: 'Victoria',
      country: 'Australia',
    });
    expect(result.label).toContain('12 Apostles');
    expect(result.label).toContain('Australia');
  });
});
