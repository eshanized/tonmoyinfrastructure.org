import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Markdown } from '@/components/shared/markdown';
import { getTransparencyReport, getTransparencyReports } from '@/lib/content';
import { generateReportMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getTransparencyReports().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const report = getTransparencyReport(params.slug);
  if (!report) return {};
  return generateReportMetadata(report);
}

export default function TransparencyReportPage({
  params,
}: {
  params: { slug: string };
}) {
  const report = getTransparencyReport(params.slug);
  if (!report) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Transparency', path: '/transparency' },
    { name: report.title, path: `/transparency/${report.slug}` },
  ];

  const pageGraph = generatePageGraph({
    pagePath: `/transparency/${report.slug}`,
    pageTitle: `${report.title} — TIV Transparency`,
    pageDescription: report.summary,
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index={report.fiscalYear}
        label="Transparency Report"
        title={report.title}
        description={report.summary}
        meta={[
          { label: 'FISCAL YEAR', value: report.fiscalYear },
          { label: 'VERSION', value: report.version },
          { label: 'STATUS', value: report.status },
          { label: 'PUBLISHED', value: report.publicationDate },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Transparency', href: '/transparency' },
              { label: report.title },
            ]}
          />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <Markdown content={report.content} />
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-border p-6">
                <span className="tiv-meta mb-4 block">Report Details</span>
                <dl className="space-y-3">
                  <div>
                    <dt className="tiv-meta mb-1">Fiscal Year</dt>
                    <dd className="font-mono text-sm">{report.fiscalYear}</dd>
                  </div>
                  <div>
                    <dt className="tiv-meta mb-1">Version</dt>
                    <dd className="font-mono text-sm">{report.version}</dd>
                  </div>
                  <div>
                    <dt className="tiv-meta mb-1">Status</dt>
                    <dd><StatusBadge status={report.status} /></dd>
                  </div>
                  <div>
                    <dt className="tiv-meta mb-1">Published</dt>
                    <dd className="font-mono text-sm">{report.publicationDate}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
