/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/weather-app',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
