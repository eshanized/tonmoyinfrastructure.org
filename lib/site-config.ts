/**
 * Centralized Site and SEO Configuration for Tonmoy Infrastructure and Vision (TIV).
 * Contains public organization identity, canonical URLs, and technical profiles.
 */

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? '/tonmoyinfrastructure.org' : '');
export const basePath = rawBasePath ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}` : '';

export const siteConfig = {
  name: 'Tonmoy Infrastructure and Vision',
  shortName: 'TIV',
  formalName: 'Tonmoy Infrastructure and Vision (TIV)',
  applicationName: 'Tonmoy Infrastructure and Vision Ltd',
  registration: {
    applicationReference: 'Reg-2026-346380',
    service: 'Foreign Company Registration',
    taxResidence: 'Bangladesh',
    statusNote:
      'Approval status and final registration number are not shown in the supplied record.',
    disclosure:
      'The submitted company record lists application reference Reg-2026-346380 for Foreign Company Registration. This is an application reference, not a final registration number or proof of completed incorporation.',
  },
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
  address: {
    street: 'Pusat Bisnis Jayapura, Jl. Pasifik Permai',
    city: 'Jayapura',
    state: 'Papua',
    region: 'Papua',
    postalCode: '99111',
    country: 'Indonesia',
    phone: '(0967) 551888',
    telephoneUri: 'tel:+62967551888',
    latitude: -2.543186,
    longitude: 140.714993,
    mapUrl: 'https://maps.google.com/?q=-2.543186,140.714993',
  },
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
