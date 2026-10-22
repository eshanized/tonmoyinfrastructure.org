import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import type {
  Project,
  Publication,
  NewsItem,
  TransparencyReport,
  InfrastructureService,
} from '@/lib/types';
import type { Person } from '@/lib/people';
import { getAuthorNames } from '@/lib/publications/citations';

/**
 * Normalizes a route path into an absolute canonical URL using the production site URL.
 * Preserves trailing slashes matching Next.js trailingSlash: true export architecture.
 */
export function buildCanonicalUrl(path: string = '/'): string {
  // Strip query parameters and fragment identifiers
  let cleanPath = (path || '/').split('?')[0].split('#')[0].trim();

  // If absolute URL provided, extract pathname
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    try {
      cleanPath = new URL(cleanPath).pathname;
    } catch {
      // fallback
    }
  }

  if (!cleanPath || cleanPath === '/') {
    return siteConfig.canonicalUrl;
  }

  // Ensure clean path without leading/trailing slashes
  const trimmed = cleanPath.replace(/^\/+/, '').replace(/\/+$/, '');

  // File assets with known extensions (e.g. sitemap.xml, robots.txt, og.png) don't get trailing slash
  if (/\.(html|xml|txt|png|jpe?g|svg|json|webmanifest|ico|pdf)$/i.test(trimmed)) {
    return `${siteConfig.url}/${trimmed}`;
  }

  // Next.js export with trailingSlash: true creates folder/index.html
  // Enforcing trailing slash prevents circular redirects and canonical mismatches
  return `${siteConfig.url}/${trimmed}/`;
}

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[] | string;
  overrideTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * Formats a page title consistently according to TIV title guidelines.
 */
export function formatTitle(title?: string, override: boolean = false): string {
  if (!title) return `${siteConfig.name} — ${siteConfig.tagline}`;
  if (override) return title;
  if (title.includes('—') || title.includes('–')) return title;
  if (title.includes(siteConfig.name) || title.includes(siteConfig.shortName)) return title;
  if (title.length + siteConfig.name.length + 3 > 60) {
    return `${title} — ${siteConfig.shortName}`;
  }
  return `${title} — ${siteConfig.name}`;
}

/**
 * Generates standardized, entity-aware metadata for any indexable or non-indexable page.
 */
export function generatePageMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  canonical,
  ogType = 'website',
  ogImage,
  noIndex = false,
  keywords,
  overrideTitle = false,
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataOptions = {}): Metadata {
  const canonicalUrl = canonical
    ? (canonical.startsWith('http') ? buildCanonicalUrl(new URL(canonical).pathname) : buildCanonicalUrl(canonical))
    : buildCanonicalUrl(path);
  const finalTitle = formatTitle(title, overrideTitle);
  const finalOgImage = ogImage || `${siteConfig.url}${siteConfig.defaultOgImage}`;

  const metadata: Metadata = {
    title: {
      absolute: finalTitle,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: finalTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: ogType,
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      images: [finalOgImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          nocache: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };

  if (keywords) {
    metadata.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map((k) => k.trim());
  }

  return metadata;
}

/**
 * Generates entity metadata for a Project or Software Platform.
 * Canonical URL is strictly set to /projects/${project.slug}.
 */
export function generateProjectMetadata(
  project: Project,
  options: { basePath?: 'projects' | 'products' | 'work' } = {}
): Metadata {
  const canonicalPath = `/projects/${project.slug}`;
  const rawTitle = project.seoTitle || project.title;
  const brandSuffix = rawTitle.length + siteConfig.name.length + 3 > 60 ? siteConfig.shortName : siteConfig.name;
  const title = (rawTitle.includes(siteConfig.name) || rawTitle.includes(siteConfig.shortName))
    ? rawTitle
    : `${rawTitle} — ${brandSuffix}`;
  const description = project.seoDescription || project.description;
  const ogImage = project.ogImage || `${siteConfig.url}${siteConfig.defaultOgImage}`;

  return generatePageMetadata({
    title,
    description,
    path: canonicalPath,
    ogImage,
    noIndex: project.noIndex || false,
    overrideTitle: true,
    keywords: project.keywords || [
      project.title,
      project.category,
      project.artifactType || 'Software',
      project.status,
      'Tonmoy Infrastructure and Vision',
      'TIV',
    ],
  });
}

/**
 * Generates entity metadata for a Research Publication.
 */
export function generatePublicationMetadata(publication: Publication): Metadata {
  const canonicalPath = `/research/publications/${publication.slug}`;
  const title = publication.seoTitle || `${publication.title} — TIV Research`;
  const description = publication.seoDescription || publication.abstract;
  const ogImage = publication.ogImage || `${siteConfig.url}${siteConfig.defaultOgImage}`;
  const authorNames = getAuthorNames(publication);

  return generatePageMetadata({
    title,
    description,
    path: canonicalPath,
    canonical: publication.canonicalUrl,
    ogType: 'article',
    ogImage,
    noIndex: publication.noIndex || false,
    publishedTime: publication.publicationDate || publication.date,
    modifiedTime: publication.updatedAt,
    authors: authorNames,
    overrideTitle: true,
    keywords: publication.keywords && publication.keywords.length > 0
      ? publication.keywords
      : [
          publication.area,
          publication.identifier,
          'TIV Research',
          'Tonmoy Infrastructure and Vision',
          ...authorNames,
          ...(publication.tags || []),
        ],
  });
}

/**
 * Generates entity metadata for a News Article.
 */
export function generateArticleMetadata(newsItem: NewsItem): Metadata {
  const canonicalPath = `/news/${newsItem.slug}`;
  const brandSuffix = newsItem.title.length + siteConfig.name.length + 3 > 60 ? siteConfig.shortName : siteConfig.name;
  const title = `${newsItem.title} — ${brandSuffix}`;
  const ogImage = `${siteConfig.url}${siteConfig.defaultOgImage}`;

  return generatePageMetadata({
    title,
    description: newsItem.excerpt,
    path: canonicalPath,
    ogType: 'article',
    ogImage,
    publishedTime: newsItem.date,
    overrideTitle: true,
    keywords: [newsItem.category, 'TIV News', 'Tonmoy Infrastructure and Vision'],
  });
}

/**
 * Generates entity metadata for a Transparency Report.
 */
export function generateReportMetadata(report: TransparencyReport): Metadata {
  const canonicalPath = `/transparency/${report.slug}`;
  const title = `${report.title} — TIV Transparency`;
  const ogImage = `${siteConfig.url}${siteConfig.defaultOgImage}`;

  return generatePageMetadata({
    title,
    description: report.summary,
    path: canonicalPath,
    ogImage,
    publishedTime: report.publicationDate,
    overrideTitle: true,
    keywords: ['Transparency Report', report.fiscalYear, 'Governance', 'TIV'],
  });
}

/**
 * Generates entity metadata for an Infrastructure Service.
 */
export function generateInfrastructureMetadata(service: InfrastructureService): Metadata {
  const canonicalSlug = service.slug === 'optical-systems' ? 'optical' : service.slug;
  const canonicalPath = `/infrastructure/${canonicalSlug}`;
  const title = `${service.title} — TIV Infrastructure`;
  const ogImage =
    service.slug === 'data-centers'
      ? `${siteConfig.url}/images/infrastructure/datacenter/exterior.webp`
      : `${siteConfig.url}${siteConfig.defaultOgImage}`;

  return generatePageMetadata({
    title,
    description: service.description,
    path: canonicalPath,
    ogImage,
    overrideTitle: true,
    keywords: [
      service.category,
      service.title,
      'Infrastructure',
      'TIV',
      ...(service.slug === 'data-centers'
        ? ['Jayapura', 'Papua', 'Indonesia', 'Sovereign Data Center']
        : []),
    ],
  });
}

/**
 * Generates metadata for a Person (e.g. Founder).
 */
export function generatePersonMetadata(person: Person): Metadata {
  const canonicalPath = person.type === 'Founder' ? '/about/leadership' : `/about/${person.slug}`;
  const title = `${person.name} — ${person.role}, ${siteConfig.name}`;

  return generatePageMetadata({
    title,
    description: person.summary,
    path: canonicalPath,
    overrideTitle: true,
    keywords: [person.name, person.handle, person.role, ...person.areas, siteConfig.name],
  });
}
