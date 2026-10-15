const { execFileSync } = require('child_process');
const path = require('path');

// Automatically discover, validate, and compile MDX research publications
try {
  const compilerScript = path.join(__dirname, 'scripts', 'compile-publications.mjs');
  execFileSync(process.execPath, [compilerScript], { stdio: 'inherit' });
} catch (err) {
  console.error('[next.config.js] Failed to compile MDX publications:', err.message);
  process.exit(1);
}

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? '/tonmoyinfrastructure.org' : '');
const basePath = rawBasePath ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}` : '';

const nextConfig = {
  output: 'export',
  ...(basePath ? { basePath } : {}),
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  // redirects() cannot be used with output: 'export'. Static redirects are placed in public/_redirects and public/.htaccess
};

module.exports = nextConfig;
