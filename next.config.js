/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // redirects() cannot be used with output: 'export'. Static redirects are placed in public/_redirects
};

module.exports = nextConfig;
