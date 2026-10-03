/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  // redirects() cannot be used with output: 'export'. Static redirects are placed in public/_redirects and public/.htaccess
};

module.exports = nextConfig;
