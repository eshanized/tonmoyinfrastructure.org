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

/**
 * Normalizes a route path into an absolute canonical URL using the production site URL.
 * Strips query parameters, trailing slashes (except root), and normalizes leading slashes.
 */
export function buildCanonicalUrl(path: string = '/'): string {
  // Strip query parameters and fragment identifiers
  const cleanPath = path.split('?')[0].split('#')[0];
  
  if (!cleanPath || cleanPath === '/') {
    return siteConfig.canonicalUrl;
  }

  // Ensure leading slash and strip any trailing slashes
  const normalized = `/${cleanPath.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return `${siteConfig.url}${normalized}`;
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
  const canonicalUrl = canonical || buildCanonicalUrl(path);
  const finalTitle = formatTitle(title, overrideTitle);
  const defaultOgParams = title ? `?title=${encodeURIComponent(title)}&type=TIV` : '';
  const finalOgImage = ogImage || `${siteConfig.url}${siteConfig.defaultOgImage}${defaultOgParams}`;

  const metadata: Metadata = {
    title: finalTitle,
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
  const title = `${project.title} — ${siteConfig.name}`;
  const description = project.seoDescription || project.description;
  const ogImage =
    project.ogImage ||
    `${siteConfig.url}/api/og?title=${encodeURIComponent(project.title)}&type=${encodeURIComponent(
      project.artifactType || 'PROJECT'
    )}&status=${encodeURIComponent(project.status)}`;

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
  const title = `${publication.title} — TIV Research`;
  const ogImage = `${siteConfig.url}/api/og?title=${encodeURIComponent(
    publication.title
  )}&type=PUBLICATION&status=${encodeURIComponent(publication.status)}`;

  return generatePageMetadata({
    title,
    description: publication.abstract,
    path: canonicalPath,
    ogType: 'article',
    ogImage,
    publishedTime: publication.date,
    authors: publication.authors,
    overrideTitle: true,
    keywords: [
      publication.area,
      publication.identifier,
      'TIV Research',
      'Tonmoy Infrastructure and Vision',
      ...publication.authors,
    ],
  });
}

/**
 * Generates entity metadata for a News Article.
 */
export function generateArticleMetadata(newsItem: NewsItem): Metadata {
  const canonicalPath = `/news/${newsItem.slug}`;
  const title = `${newsItem.title} — ${siteConfig.name}`;
  const ogImage = `${siteConfig.url}/api/og?title=${encodeURIComponent(newsItem.title)}&type=NEWS`;

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
  const ogImage = `${siteConfig.url}/api/og?title=${encodeURIComponent(
    report.title
  )}&type=REPORT&status=${encodeURIComponent(report.status)}`;

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
  const ogImage = `${siteConfig.url}/api/og?title=${encodeURIComponent(
    service.title
  )}&type=INFRASTRUCTURE&status=${encodeURIComponent(service.status)}`;

  return generatePageMetadata({
    title,
    description: service.description,
    path: canonicalPath,
    ogImage,
    overrideTitle: true,
    keywords: [service.category, service.title, 'Infrastructure', 'TIV'],
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
