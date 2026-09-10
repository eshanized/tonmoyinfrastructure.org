import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getAnnualReports } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Annual Reports & Institutional Reviews',
  description:
    'Annual reports for Tonmoy Infrastructure and Vision — operational reviews, research progress, unaudited financial status, and organizational trajectory.',
  path: '/transparency/annual-reports',
  keywords: ['TIV annual reports', 'institutional reporting', 'operations review', 'fiscal reporting'],
});

const statusConfig: Record<string, { color: string; label: string }> = {
  Draft: { color: 'bg-muted-foreground', label: 'Draft' },
  'Management Report': { color: 'bg-amber-500', label: 'Management Report' },
  Final: { color: 'bg-blue-500', label: 'Final' },
  Audited: { color: 'bg-emerald-500', label: 'Audited' },
};

export default function AnnualReportsPage() {
  const reports = getAnnualReports();

  const pageGraph = generatePageGraph({
    title: 'Annual Reports & Institutional Reviews — Tonmoy Infrastructure and Vision',
    description:
      'Annual reports for Tonmoy Infrastructure and Vision — operational reviews, research progress, unaudited financial status, and organizational trajectory.',
    path: '/transparency/annual-reports',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Transparency', item: '/transparency' },
      { name: 'Annual Reports', item: '/transparency/annual-reports' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="TRANSPARENCY / REPORTS"
        label="Annual"
        title="Annual reports."
        description="TIV's annual reports — covering operations, research, finances, and direction. Reports are clearly labeled by status — no report is marked as audited unless it has been independently audited."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Transparency', href: '/transparency' },
              { label: 'Annual Reports' },
            ]}
          />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Reports"
              title="Fiscal year reports."
              description="Each report covers a fiscal year — operations, research, finances, risks, and next-year direction."
            />
          </Reveal>

          {reports.length === 0 ? (
            <Reveal delay={0.1} className="mt-10">
              <div className="border border-border bg-card p-12">
                <Callout type="info" title="No Reports Available">
                  No annual reports are available yet. Reports will be published
                  as fiscal periods close and data is compiled.
                </Callout>
              </div>
            </Reveal>
          ) : (
            <StaggerContainer className="mt-10 space-y-px border border-border bg-border" stagger={0.08}>
              {reports.map((report) => {
                const config = statusConfig[report.status] || statusConfig['Draft'];
                return (
                  <StaggerItem key={report.slug}>
                    <div className="bg-card p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-sm text-brand">
                          {report.fiscalYear}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${config.color}`} />
                          <span className="tiv-meta">{config.label}</span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {report.publicationDate}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl tracking-tight">
                        {report.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                        {report.summary}
                      </p>

                      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <span className="tiv-meta">Operational Section</span>
                          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                            {report.operationalSection}
                          </p>
                        </div>
                        <div>
                          <span className="tiv-meta">Research Section</span>
                          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                            {report.researchSection}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <span className="tiv-meta">Major Projects</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {report.majorProjects.map((proj) => (
                            <span
                              key={proj}
                              className="border border-border px-2.5 py-1 text-xs"
                            >
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <span className="tiv-meta">Risks</span>
                        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                          {report.risks}
                        </p>
                      </div>

                      <div className="mt-6">
                        <span className="tiv-meta">Next Year Direction</span>
                        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                          {report.nextYearDirection}
                        </p>
                      </div>

                      {report.pdf && (
                        <div className="mt-6">
                          <a
                            href={report.pdf}
                            className="group inline-flex items-center gap-2 text-sm font-medium text-brand"
                          >
                            <FileText className="h-4 w-4" />
                            Download PDF
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
