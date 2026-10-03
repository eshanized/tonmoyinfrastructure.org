const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? '/tonmoyinfrastructure.org' : '');
const basePath = rawBasePath ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}` : '';

const nextConfig = {
  output: 'export',
  ...(basePath ? { basePath } : {}),
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
