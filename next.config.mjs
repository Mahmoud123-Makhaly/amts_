import './src/libs/env.mjs';
import nextIntl from 'next-intl/plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to resolve the glob pattern to an array of file paths
const resolveSassPaths = async () => {
  const sassPaths = [path.join(__dirname, 'assets'), path.join(__dirname, 'components/**/*.scss')];
  return sassPaths;
};

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  swcMinify: true,
  sassOptions: {
    includePaths: await resolveSassPaths(), // Resolve the Sass paths asynchronously
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const withNextIntl = nextIntl('./src/i18n.ts');
export default bundleAnalyzer(withNextIntl(nextConfig));
