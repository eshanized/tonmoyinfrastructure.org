import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getPublications } from '@/lib/publications/pipeline';
import { FeaturedPublication } from '@/components/publications/featured-publication';
import { PublicationCatalog } from '@/components/publications/publication-catalog';
import { generatePageMetadata, buildCanonicalUrl } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';
import type { Publication, PublicationStatus } from '@/lib/publications/types';

export const metadata: Metadata = generatePageMetadata({
  title: 'Publications & Technical Papers — Tonmoy Infrastructure and Vision',
  description:
    'Institutional research library of Tonmoy Infrastructure and Vision (TIV). Research papers, technical reports, empirical findings, and software engineering manuscripts.',
  path: '/research/publications',
  overrideTitle: true,
  keywords: [
    'TIV publications',
    'research papers',
    'technical reports',
    'software engineering research',
    'autonomous systems',
    'Tonmoy Infrastructure and Vision',
  ],
});

export default function PublicationsPage() {
  const publications: Publication[] = getPublications();
  const featuredPub = publications.find((p: Publication) => p.featured);

  const areas: string[] = Array.from(new Set(publications.map((p: Publication) => p.area))).sort();
  const types: string[] = Array.from(new Set(publications.map((p: Publication) => p.type || 'Research Paper'))).sort();
  const statuses: PublicationStatus[] = Array.from(new Set(publications.map((p: Publication) => p.status))).sort();

  const publishedCount = publications.filter((p: Publication) => p.status === 'Published').length;
  const draftCount = publications.filter((p: Publication) => p.status === 'Draft').length;
  const experimentalCount = publications.filter((p: Publication) => p.status === 'Experimental').length;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Publications', path: '/research/publications' },
  ];

  const itemListSchema = {
    '@type': 'ItemList',
    name: 'TIV Research Publications',
    description: 'Catalog of publications, technical reports, and experimental findings from TIV Research.',
    numberOfItems: publications.length,
    itemListElement: publications.map((pub: Publication, idx: number) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: pub.title,
      url: buildCanonicalUrl(`/research/publications/${pub.slug}`),
    })),
  };

  const pageGraph = generatePageGraph({
    pagePath: '/research/publications',
    pageTitle: 'Publications & Technical Papers — Tonmoy Infrastructure and Vision',
    pageDescription:
      'Institutional research library of Tonmoy Infrastructure and Vision (TIV). Research papers, technical reports, empirical findings, and software engineering manuscripts.',
    breadcrumbs,
    entities: [itemListSchema],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="PUBLICATIONS"
        label="Research Library"
        title="Institutional research and technical papers."
        description="We conduct primary research into artificial intelligence, runtime governance, distributed systems, fiber optics, and sovereign infrastructure — and publish findings openly with full methodological transparency."
      />

      {/* Breadcrumbs and Stats bar */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Research', href: '/research' },
              { label: 'Publications' },
            ]}
          />

          <div className="mt-6 grid grid-cols-2 gap-4 border border-border bg-card p-4 sm:grid-cols-4">
            <div>
              <span className="tiv-meta text-[10px] block mb-1">Total Catalogue</span>
              <span className="font-mono text-xl font-bold text-foreground">
                {publications.length}
              </span>
            </div>
            <div>
              <span className="tiv-meta text-[10px] block mb-1">Published</span>
              <span className="font-mono text-xl font-bold text-emerald-500">
                {publishedCount}
              </span>
            </div>
            <div>
              <span className="tiv-meta text-[10px] block mb-1">Drafts in Progress</span>
              <span className="font-mono text-xl font-bold text-amber-500">
                {draftCount}
              </span>
            </div>
            <div>
              <span className="tiv-meta text-[10px] block mb-1">Active Areas</span>
              <span className="font-mono text-xl font-bold text-brand">
                {areas.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Featured Publication */}
      {featuredPub && <FeaturedPublication publication={featuredPub} />}

      {/* Main Catalogue Section */}
      <section className="py-16 md:py-24">
        <div className="tiv-container">
          <div className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
              All Publications
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Filter by research domain, publication type, or status.
            </p>
          </div>

          <PublicationCatalog
            initialPublications={publications}
            areas={areas}
            types={types}
            statuses={statuses}
          />
        </div>
      </section>
    </>
  );
}
