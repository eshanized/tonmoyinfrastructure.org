import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { buildCanonicalUrl } from '@/lib/seo';
import {
  getProjects,
  getPublications,
  getNews,
  getTransparencyReports,
  getInfrastructureServices,
} from '@/lib/content';

export const dynamic = 'force-static';

const PAGE_PRIORITIES = {
  home: 1,
  core: 0.9,
  hub: 0.8,
  supporting: 0.6,
} as const;

/**
 * Build a deterministic sitemap from canonical, indexable routes only.
 *
 * Individual product/work aliases redirect to /projects/:slug and therefore
 * do not receive their own entries. Query-driven search and internal routes
 * are excluded. Dynamic content is included only when it is publishable.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.canonicalUrl, changeFrequency: 'weekly', priority: PAGE_PRIORITIES.home },
    { url: buildCanonicalUrl('/work'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/products'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/projects'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/releases'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/open-source'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/io'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/technology'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/technology/ai'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/technology/architecture'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/solutions'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/infrastructure'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/research'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/research/ai'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/research/areas'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/research/experiments'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/research/publications'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/research/whitepaper'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.hub },
    { url: buildCanonicalUrl('/research/whitepaper/v1.0'), changeFrequency: 'yearly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/transparency'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/transparency/financials'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/transparency/financials/portfolio-economics'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/transparency/financials/portfolio-economics/methodology'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/transparency/annual-reports'), changeFrequency: 'yearly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/transparency/governance'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/news'), changeFrequency: 'weekly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/about'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/about/company'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/about/leadership'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/about/governance'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/about/timeline'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/security'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/trust'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/careers'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/contact'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/investors'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/media'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/docs'), changeFrequency: 'monthly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/status'), changeFrequency: 'daily', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/legal'), changeFrequency: 'yearly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/privacy'), changeFrequency: 'yearly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/terms'), changeFrequency: 'yearly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/accessibility'), changeFrequency: 'yearly', priority: PAGE_PRIORITIES.supporting },
    { url: buildCanonicalUrl('/licenses'), changeFrequency: 'yearly', priority: PAGE_PRIORITIES.supporting },
  ];

  const projectPages: MetadataRoute.Sitemap = getProjects()
    .filter((project) => !project.noIndex)
    .map((project) => {
      const rawDate = project.updatedAt || project.releaseDate;
      return {
        url: buildCanonicalUrl(`/projects/${project.slug}`),
        ...(rawDate && !Number.isNaN(Date.parse(rawDate))
          ? { lastModified: new Date(rawDate) }
          : {}),
        changeFrequency: 'monthly' as const,
        priority: project.slug === 'kyro' || project.status === 'Stable Release' ? PAGE_PRIORITIES.core : PAGE_PRIORITIES.supporting,
      };
    });

  const projectEconomicPages: MetadataRoute.Sitemap = getProjects()
    .filter((project) => !project.noIndex)
    .map((project) => {
      const rawDate = project.updatedAt || project.releaseDate;
      return {
        url: buildCanonicalUrl(`/projects/${project.slug}/economics`),
        ...(rawDate && !Number.isNaN(Date.parse(rawDate))
          ? { lastModified: new Date(rawDate) }
          : {}),
        changeFrequency: 'monthly' as const,
        priority: PAGE_PRIORITIES.supporting,
      };
    });

  const infraPages: MetadataRoute.Sitemap = getInfrastructureServices().map((service) => ({
    url: buildCanonicalUrl(`/infrastructure/${service.slug === 'optical-systems' ? 'optical' : service.slug}`),
    changeFrequency: 'monthly' as const,
    priority: PAGE_PRIORITIES.supporting,
  }));

  const pubPages: MetadataRoute.Sitemap = getPublications()
    .filter((publication) => !publication.noIndex && publication.status !== 'Draft')
    .map((publication) => {
      const rawDate = publication.updatedAt || publication.publicationDate || publication.date;
      return {
        url: buildCanonicalUrl(`/research/publications/${publication.slug}`),
        ...(rawDate && !Number.isNaN(Date.parse(rawDate))
          ? { lastModified: new Date(rawDate) }
          : {}),
        changeFrequency: 'yearly' as const,
        priority: PAGE_PRIORITIES.hub,
      };
    });

  const newsPages: MetadataRoute.Sitemap = getNews().map((article) => ({
    url: buildCanonicalUrl(`/news/${article.slug}`),
    ...(article.date && !Number.isNaN(Date.parse(article.date))
      ? { lastModified: new Date(article.date) }
      : {}),
    changeFrequency: 'yearly' as const,
    priority: PAGE_PRIORITIES.supporting,
  }));

  const reportPages: MetadataRoute.Sitemap = getTransparencyReports()
    .filter((report) => report.status === 'Published')
    .map((report) => ({
      url: buildCanonicalUrl(`/transparency/${report.slug}`),
      ...(report.publicationDate && !Number.isNaN(Date.parse(report.publicationDate))
        ? { lastModified: new Date(report.publicationDate) }
        : {}),
      changeFrequency: 'yearly' as const,
      priority: PAGE_PRIORITIES.supporting,
    }));

  const canonicalOrigin = new URL(siteConfig.canonicalUrl).origin;
  const entries = [
    ...staticPages,
    ...projectPages,
    ...projectEconomicPages,
    ...infraPages,
    ...pubPages,
    ...newsPages,
    ...reportPages,
  ].filter((entry) => {
    const url = new URL(entry.url);
    return url.origin === canonicalOrigin &&
      !url.pathname.startsWith('/search') &&
      !url.pathname.startsWith('/internal/') &&
      !url.pathname.startsWith('/api/');
  });

  const uniqueEntries = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    const existing = uniqueEntries.get(entry.url);
    if (!existing || (entry.priority ?? 0) > (existing.priority ?? 0)) {
      uniqueEntries.set(entry.url, entry);
    }
  }

  return Array.from(uniqueEntries.values()).sort((a, b) => a.url.localeCompare(b.url));
}
