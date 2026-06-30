import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdfkit', 'sharp', 'geoip-lite'],
  // Poll for file changes — more reliable on macOS and paths with spaces.
  watchOptions: {
    pollIntervalMs: 1000,
  },
  experimental: {
    // Default segment explorer corrupts the client manifest and breaks Fast Refresh.
    devtoolSegmentExplorer: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**'],
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source:
          '/credit-cards/nab-rewards-platinum-card-%E2%80%93-velocity-points',
        destination: '/credit-cards/nab-rewards-platinum-card-velocity-points',
        permanent: true,
      },
      {
        source: '/solar-panel',
        destination: '/Inverters',
        permanent: true,
      },
      {
        source: '/copy-of-solar-panel',
        destination: '/Inverters',
        permanent: true,
      },
    ];
  },
  // All images are served from /public/assets (see npm run download-all-assets).
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
