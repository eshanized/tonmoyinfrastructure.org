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
  // Static pages: omit lastModified when no individual page edit date is tracked,
  // or use verified milestone dates to avoid build-time lastModified churn.
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.canonicalUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: buildCanonicalUrl('/work'), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/products'), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/projects'), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/releases'), lastModified: new Date('2026-10-02'), changeFrequency: 'weekly', priority: 0.7 },
    { url: buildCanonicalUrl('/open-source'), changeFrequency: 'weekly', priority: 0.8 },
    { url: buildCanonicalUrl('/io'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/technology'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/technology/ai'), changeFrequency: 'weekly', priority: 0.8 },
    { url: buildCanonicalUrl('/technology/architecture'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/solutions'), changeFrequency: 'weekly', priority: 0.9 },
    { url: buildCanonicalUrl('/infrastructure'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/ai'), changeFrequency: 'weekly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/areas'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/research/experiments'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/research/publications'), lastModified: new Date('2026-09-12'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/whitepaper'), lastModified: new Date('2026-09-13'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/research/whitepaper/v1.0'), lastModified: new Date('2026-09-13'), changeFrequency: 'yearly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/transparency/financials'), lastModified: new Date('2026-09-13'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency/financials/portfolio-economics'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/transparency/financials/portfolio-economics/methodology'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency/annual-reports'), lastModified: new Date('2026-09-13'), changeFrequency: 'yearly', priority: 0.7 },
    { url: buildCanonicalUrl('/transparency/governance'), changeFrequency: 'monthly', priority: 0.6 },
    { url: buildCanonicalUrl('/news'), lastModified: new Date('2026-09-12'), changeFrequency: 'weekly', priority: 0.7 },
    { url: buildCanonicalUrl('/about'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/about/company'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/about/leadership'), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl('/about/governance'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/about/timeline'), changeFrequency: 'monthly', priority: 0.6 },
    { url: buildCanonicalUrl('/security'), changeFrequency: 'monthly', priority: 0.7 },
    { url: buildCanonicalUrl('/trust'), changeFrequency: 'monthly', priority: 0.6 },
    { url: buildCanonicalUrl('/careers'), changeFrequency: 'weekly', priority: 0.5 },
    { url: buildCanonicalUrl('/contact'), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/investors'), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/media'), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/docs'), changeFrequency: 'monthly', priority: 0.5 },
    { url: buildCanonicalUrl('/status'), changeFrequency: 'daily', priority: 0.6 },
    { url: buildCanonicalUrl('/legal'), changeFrequency: 'yearly', priority: 0.5 },
    { url: buildCanonicalUrl('/privacy'), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/terms'), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/accessibility'), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/licenses'), changeFrequency: 'yearly', priority: 0.4 },
    { url: buildCanonicalUrl('/sitemap'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Canonical project entity URLs with authentic modification timestamps
  const projectPages: MetadataRoute.Sitemap = getProjects().map((p) => {
    const rawDate = p.updatedAt || p.releaseDate;
    return {
      url: buildCanonicalUrl(`/projects/${p.slug}`),
      ...(rawDate ? { lastModified: new Date(rawDate) } : {}),
      changeFrequency: 'monthly' as const,
      priority: p.status === 'Stable Release' ? 0.9 : 0.8,
    };
  });

  const infraPages: MetadataRoute.Sitemap = getInfrastructureServices().map((s) => ({
    url: buildCanonicalUrl(`/infrastructure/${s.slug === 'optical-systems' ? 'optical' : s.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const pubPages: MetadataRoute.Sitemap = getPublications().map((p) => ({
    url: buildCanonicalUrl(`/research/publications/${p.slug}`),
    lastModified: new Date(p.publicationDate || p.date),
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
