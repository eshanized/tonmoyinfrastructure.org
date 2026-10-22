import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { FinancialsInteractiveView } from '@/components/finance/financials-interactive-view';
import { getFinancialReports } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import Link from 'next/link';
import { BarChart3, ArrowRight } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Financial Reporting & Statements',
  description:
    'TIV financial reporting — unaudited management estimates, annual summaries, revenue composition, operating expenses, and capital allocation.',
  path: '/transparency/financials',
  keywords: ['TIV financials', 'financial statements', 'operating expenses', 'capital allocation', 'transparency reports'],
});

export default function FinancialsPage() {
  const reports = getFinancialReports();
  const latest = reports[0];

  const pageGraph = generatePageGraph({
    title: 'Financial Reporting & Statements — Tonmoy Infrastructure and Vision',
    description:
      'TIV financial reporting — unaudited management estimates, annual summaries, revenue composition, operating expenses, and capital allocation.',
    path: '/transparency/financials',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Transparency', item: '/transparency' },
      { name: 'Financials', item: '/transparency/financials' },
    ],
  });

  if (!latest) {
    return (
      <>
        <JsonLd data={pageGraph} />
        <PageHeader
          index="FINANCIALS"
          label="Transparency"
          title="Financial reporting."
          description="TIV publishes annual financial summaries. No financial reports are available yet."
        />
        <section>
          <div className="tiv-container py-16 md:py-20">
            <Callout type="info" title="No Financial Data Available">
              TIV does not fabricate financial data. When real financial data is
              available, it will be published here.
            </Callout>
          </div>
        </section>
      </>
    );
  }

  const sym = latest.currencySymbol;

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="FINANCIALS"
        label="Transparency"
        title="Building responsibly. Reporting transparently."
        description="TIV operates across software, internet infrastructure, hosting, networking, and research. Our financial reporting provides a clear view of how the organization is developing and where resources are being directed."
        meta={[
          { label: 'FISCAL YEAR', value: latest.fiscalYear },
          { label: 'STATUS', value: latest.status },
          { label: 'CURRENCY', value: `${latest.currency} (${sym})` },
          { label: 'REPORT TYPE', value: 'Management Estimate' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Transparency', href: '/transparency/' },
              { label: 'Financials' },
            ]}
          />
          <div className="mt-6">
            <Callout type="warning" title="Reporting Status — Management Estimate">
              Figures are illustrative management estimates prepared for public
              presentation and should not be treated as audited financial
              statements. Actual financial statements may differ materially.
            </Callout>
          </div>

          <div className="mt-6 border border-brand/40 bg-gradient-to-r from-brand/10 via-card to-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-brand">
                  <BarChart3 className="h-4 w-4" />
                  <span className="tiv-meta text-xs font-semibold">PORTFOLIO ECONOMICS SYSTEM</span>
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                  Looking for Project-Level Resource &amp; Investment Tracking?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-2xl leading-relaxed">
                  Explore TIV&apos;s Portfolio Economics engine measuring development investment,
                  recurring operating costs, shared server allocations, engineering effort, and data confidence across initiatives.
                </p>
              </div>

              <Link
                href="/transparency/financials/portfolio-economics/"
                className="inline-flex items-center gap-2 border border-brand bg-brand px-4 py-2 text-xs font-medium text-white hover:bg-brand/90 transition-colors shrink-0"
              >
                View Portfolio Economics
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Multi-Currency Financial Sections (01 - 05) */}
      <FinancialsInteractiveView initialReport={latest} />

      {/* Financial Direction */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              index="06"
              label="Financial Direction"
              title="Four principles."
              description="TIV's financial strategy is centered around sustainable infrastructure, product development, research, and financial discipline."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2" stagger={0.08}>
            {[
              {
                number: '01',
                title: 'Sustainable Infrastructure',
                description:
                  'Prioritize recurring revenue from hosting, domains, and infrastructure services.',
              },
              {
                number: '02',
                title: 'Product Development',
                description:
                  'Reinvest a meaningful portion of operating resources into software products and developer infrastructure.',
              },
              {
                number: '03',
                title: 'Research',
                description:
                  'Maintain long-term investment in networking, fiber optics, AI systems, and related technical research.',
              },
              {
                number: '04',
                title: 'Financial Discipline',
                description:
                  'Maintain sufficient liquidity while avoiding unnecessary fixed costs and excessive leverage.',
              },
            ].map((principle) => (
              <StaggerItem key={principle.number}>
                <div className="group relative bg-card p-8">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <span className="font-display text-3xl font-bold tracking-tight text-muted-foreground/20">
                    {principle.number}
                  </span>
                  <h3 className="mt-3 font-display text-lg tracking-tight transition-colors group-hover:text-brand">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Reporting Note */}
      <section>
        <div className="tiv-container py-16 md:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <SectionHeader
                index="07"
                label="Reporting Note"
                title="About these figures."
              />
            </Reveal>
            <div className="mt-8">
              <Callout type="warning" title="Important Disclaimer">
                {latest.reportingNote ||
                  'These figures are management estimates and not a substitute for audited financial statements.'}
              </Callout>
            </div>
            <div className="mt-8 border-l-2 border-border pl-6">
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                TIV intends to replace estimates with finalized financial
                information as reliable accounting records and reporting periods
                become available. Financial information is never labeled as
                audited unless independently audited.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
