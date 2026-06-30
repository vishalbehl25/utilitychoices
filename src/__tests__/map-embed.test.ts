/** @jest-environment node */

import {
  buildCoordinatesMapEmbedUrl,
  buildVisitorMapEmbedUrl,
  resolveMapEmbedUrl,
} from '@/lib/map-embed';

describe('map embed helpers', () => {
  it('builds a classic coordinate embed with marker center (ll + q)', () => {
    const url = buildCoordinatesMapEmbedUrl('-37.9123', '145.2567');

    expect(url).toContain('www.google.com/maps');
    expect(url).toContain('output=embed');
    expect(url).toContain('q=-37.9123%2C145.2567');
    expect(url).toContain('ll=-37.9123%2C145.2567');
  });

  it('prefers coordinates over city text for visitor map', () => {
    const url = buildVisitorMapEmbedUrl({
      latitude: '-37.9123',
      longitude: '145.2567',
      city: 'Melbourne',
      region: 'Victoria',
    });

    expect(url).toContain('q=-37.9123%2C145.2567');
  });

  it('falls back to city when coordinates are unavailable', () => {
    const url = buildVisitorMapEmbedUrl({
      city: 'Melbourne',
      region: 'Victoria',
      country: 'AU',
    });

    expect(url).toContain('Melbourne');
  });

  it('uses classic embed for full Map/Satellite/Labels UI', () => {
    const url = resolveMapEmbedUrl({
      latitude: '28.518561',
      longitude: '77.199242',
    });

    expect(url).toContain('www.google.com/maps');
    expect(url).not.toContain('/embed/v1/');
    expect(url).toContain('output=embed');
  });
});
