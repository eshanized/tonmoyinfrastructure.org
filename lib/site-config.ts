/**
 * Centralized Site and SEO Configuration for Tonmoy Infrastructure and Vision (TIV).
 * Contains verified corporate identity, canonical URLs, and authoritative technical profiles.
 */

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? '/tonmoyinfrastructure.org' : '');
export const basePath = rawBasePath ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}` : '';

export const siteConfig = {
  name: 'Tonmoy Infrastructure and Vision',
  shortName: 'TIV',
  formalName: 'Tonmoy Infrastructure and Vision (TIV)',
  tagline: 'Technology Infrastructure',
  basePath,
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://tonmoyinfrastructure.org/').replace(/\/+$/, ''),
  canonicalUrl: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://tonmoyinfrastructure.org/').replace(/\/+$/, '')}/`,
  description:
    'Tonmoy Infrastructure and Vision (TIV) builds practical software, internet infrastructure, networking systems, and emerging technologies that people can deploy, operate, and depend on.',
  brandColor: '#E5484D', // TIV Coral Red
  backgroundColor: '#09090b',
  locale: 'en_US',
  author: 'Tonmoy Infrastructure and Vision',
  logo: '/logo.svg',
  favicon: `${basePath}/favicon.svg`,
  defaultOgImage: '/og.png',
  manifest: `${basePath}/site.webmanifest`,
  founder: {
    name: 'Eshan Roy',
    handle: 'eshanized',
    role: 'Founder',
    organization: 'Tonmoy Infrastructure and Vision',
    url: '/about/leadership',
    github: 'https://github.com/eshanized',
    huggingFace: 'https://huggingface.co/eshanized',
    orcid: 'https://orcid.org/0009-0007-1261-6805',
    website: 'https://eshanized.is-a.dev/',
  },
  social: {
    github: 'https://github.com/eshanized',
    huggingFace: 'https://huggingface.co/eshanized',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
  },
} as const;

export type SiteConfig = typeof siteConfig;
