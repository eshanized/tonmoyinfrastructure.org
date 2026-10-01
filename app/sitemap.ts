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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.canonicalUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: buildCanonicalUrl('/work'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/products'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/projects'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/releases'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: buildCanonicalUrl('/open-source'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: buildCanonicalUrl('/technology'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/technology/ai'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: buildCanonicalUrl('/technology/architecture'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/solutions'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/infrastructure'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/ai'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/areas'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/research/experiments'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/research/publications'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/whitepaper'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/whitepaper/v1.0'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/transparency/financials'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency/financials/portfolio-economics'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/transparency/financials/portfolio-economics/methodology'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency/annual-reports'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency/governance'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: buildCanonicalUrl('/news'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: buildCanonicalUrl('/about'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/about/company'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/about/leadership'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/about/governance'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/about/timeline'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: buildCanonicalUrl('/security'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/trust'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: buildCanonicalUrl('/careers'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: buildCanonicalUrl('/contact'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/investors'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/media'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/docs'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/status'), lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: buildCanonicalUrl('/legal'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: buildCanonicalUrl('/privacy'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/terms'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/accessibility'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/licenses'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/sitemap'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Canonical project entity URLs
  const projectPages: MetadataRoute.Sitemap = getProjects().map((p) => ({
    url: buildCanonicalUrl(`/projects/${p.slug}`),
    lastModified: new Date(p.updatedAt || '2026-09-13'),
    changeFrequency: 'monthly' as const,
    priority: p.status === 'Stable Release' ? 0.9 : 0.8,
  }));

  const infraPages: MetadataRoute.Sitemap = getInfrastructureServices().map((s) => ({
    url: buildCanonicalUrl(`/infrastructure/${s.slug === 'optical-systems' ? 'optical' : s.slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const pubPages: MetadataRoute.Sitemap = getPublications().map((p) => ({
    url: buildCanonicalUrl(`/research/publications/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.75,
  }));

  const newsPages: MetadataRoute.Sitemap = getNews().map((a) => ({
    url: buildCanonicalUrl(`/news/${a.slug}`),
    lastModified: new Date(a.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const reportPages: MetadataRoute.Sitemap = getTransparencyReports().map((r) => ({
    url: buildCanonicalUrl(`/transparency/${r.slug}`),
    lastModified: new Date(r.publicationDate),
    changeFrequency: 'yearly' as const,
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...infraPages,
    ...pubPages,
    ...newsPages,
    ...reportPages,
  ];
}
