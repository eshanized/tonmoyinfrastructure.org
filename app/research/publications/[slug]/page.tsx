import { notFound } from 'next/navigation';
import { FileText, Github, Database, Download } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { MetadataList } from '@/components/shared/metadata-list';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Markdown } from '@/components/shared/markdown';
import { Callout } from '@/components/shared/callout';
import { getPublication, getPublications } from '@/lib/content';
import { generatePublicationMetadata } from '@/lib/seo';
import { generatePageGraph, generateScholarlyArticleSchema } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getPublications().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const pub = getPublication(params.slug);
  if (!pub) return {};
  return generatePublicationMetadata(pub);
}

export default function PublicationPage({
  params,
}: {
  params: { slug: string };
}) {
  const pub = getPublication(params.slug);
  if (!pub) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Publications', path: '/research/publications' },
    { name: pub.title, path: `/research/publications/${pub.slug}` },
  ];

  const pageGraph = generatePageGraph({
    pagePath: `/research/publications/${pub.slug}`,
    pageTitle: `${pub.title} — TIV Research`,
    pageDescription: pub.abstract,
    breadcrumbs,
    entities: [generateScholarlyArticleSchema(pub)],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index={pub.identifier}
        label="Publication"
        title={pub.title}
        description={pub.abstract}
        meta={[
          { label: 'STATUS', value: pub.status },
          { label: 'AREA', value: pub.area },
          { label: 'VERSION', value: `v${pub.version}` },
          { label: 'DATE', value: pub.date },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Research', href: '/research' },
              { label: 'Publications', href: '/research/publications' },
              { label: pub.identifier },
            ]}
          />

          {/* Quick links */}
          <div className="flex flex-wrap gap-3">
            {pub.pdf && (
              <a
                href={pub.pdf}
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            )}
            {pub.repository && (
              <a
                href={pub.repository}
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
              >
                <Github className="h-4 w-4" />
                Repository
              </a>
            )}
            {pub.dataset && (
              <a
                href={pub.dataset}
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
              >
                <Database className="h-4 w-4" />
                Dataset
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              {pub.status === 'Draft' && (
                <Callout type="warning" title="Draft Document" className="mb-8">
                  This is a draft document. Content may change significantly before
                  final publication.
                </Callout>
              )}
              {pub.status === 'Experimental' && (
                <Callout type="info" title="Experimental" className="mb-8">
                  This document describes experimental work. Results are preliminary.
                </Callout>
              )}
              <Markdown content={pub.content} />
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-border p-6">
                <span className="tiv-meta mb-4 block">Publication Metadata</span>
                <MetadataList
                  columns={2}
                  items={[
                    { label: 'Identifier', value: pub.identifier },
                    { label: 'Status', value: pub.status },
                    { label: 'Area', value: pub.area },
                    { label: 'Version', value: `v${pub.version}` },
                    { label: 'Date', value: pub.date },
                    { label: 'Project', value: pub.project },
                  ]}
                />
                <div className="mt-6 border-t border-border pt-4">
                  <span className="tiv-meta mb-2 block">Authors</span>
                  <ul className="space-y-1">
                    {pub.authors.map((author) => (
                      <li key={author} className="text-sm">{author}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Citation */}
              <div className="mt-6 border border-border p-6">
                <span className="tiv-meta mb-3 block">Citation</span>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                  {pub.authors.join(', ')}. ({pub.date}). {pub.title}. {pub.identifier}. v{pub.version}. Tonmoy Infrastructure and Vision.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
