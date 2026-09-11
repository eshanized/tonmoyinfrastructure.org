import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { calculatePortfolioEconomicsSummary } from '@/lib/portfolio-economics/calculations';
import { getFinancialPeriods, getDefaultFinancialPeriod } from '@/lib/portfolio-economics/periods';
import { sanitizePortfolioForPublic } from '@/lib/portfolio-economics/auth';
import { EconomicsHeader } from '@/components/portfolio-economics/economics-header';
import { EconomicsSummaryCards } from '@/components/portfolio-economics/economics-summary-cards';
import { ProjectsEconomicsTable } from '@/components/portfolio-economics/projects-economics-table';
import { DataQualityCards } from '@/components/portfolio-economics/data-quality-cards';
import { PortfolioCharts } from '@/components/portfolio-economics/portfolio-charts';
import { ReconciliationCard } from '@/components/portfolio-economics/reconciliation-card';
import { ReportPreviewModal } from '@/components/portfolio-economics/report-preview-modal';
import Link from 'next/link';
import { BookOpen, ArrowRight, ShieldCheck, FileSpreadsheet } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Portfolio Economics',
  description:
    'A transparent measurement and accounting view of development investment, operating costs, attributed revenue, engineering effort, and data confidence across TIV projects.',
  path: '/transparency/financials/portfolio-economics',
  keywords: [
    'TIV portfolio economics',
    'infrastructure investment',
    'open source accounting',
    'engineering effort tracking',
    'shared cost allocation',
    'data confidence',
  ],
});

export default function PublicPortfolioEconomicsPage() {
  const periods = getFinancialPeriods();
  const defaultPeriod = getDefaultFinancialPeriod();
  const rawSummary = calculatePortfolioEconomicsSummary(defaultPeriod.id);
  const summary = sanitizePortfolioForPublic(rawSummary);

  const pageGraph = generatePageGraph({
    pagePath: '/transparency/financials/portfolio-economics',
    pageTitle: 'Portfolio Economics — Tonmoy Infrastructure and Vision',
    pageDescription:
      'A factual measurement system documenting development investment, operating costs, revenue attribution, engineering hours, and data confidence across TIV initiatives.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
      { name: 'Financials', path: '/transparency/financials' },
      { name: 'Portfolio Economics', path: '/transparency/financials/portfolio-economics' },
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={pageGraph} />

      {/* Header */}
      <EconomicsHeader
        summary={summary}
        periods={periods}
        selectedPeriodId={defaultPeriod.id}
        isInternal={false}
      />

      <main className="tiv-container py-12 space-y-12">
        {/* Key Economics Metrics */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <span className="tiv-meta text-xs">MACRO PORTFOLIO COMMITMENT</span>
            <span className="text-xs font-mono text-muted-foreground">
              Period: {summary.fiscalYear} ({summary.currency})
            </span>
          </div>
          <EconomicsSummaryCards summary={summary} isInternal={false} />
        </section>

        {/* Visual Analytics */}
        <section>
          <div className="mb-4">
            <span className="tiv-meta text-xs">EMPIRICAL ALLOCATION GRAPHS</span>
          </div>
          <PortfolioCharts summary={summary} />
        </section>

        {/* Project Economics Table */}
        <section>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="tiv-meta text-xs">PORTFOLIO INITIATIVES</span>
              <h2 className="font-display text-xl font-bold text-foreground">
                Project Resource &amp; Contribution Registry
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Direct and allocated infrastructure costs measured
            </span>
          </div>
          <ProjectsEconomicsTable
            projects={summary.projects}
            currency={summary.currency}
            isInternal={false}
          />
        </section>

        {/* Data Quality & Lineage Breakdown */}
        <section>
          <div className="mb-4">
            <span className="tiv-meta text-xs">AUDITABILITY &amp; CONFIDENCE</span>
            <h2 className="font-display text-xl font-bold text-foreground">
              Measurement Confidence &amp; Data Lineage
            </h2>
          </div>
          <DataQualityCards summary={summary} />
        </section>

        {/* Corporate Reconciliation Card */}
        <section>
          <ReconciliationCard summary={summary} />
        </section>

        {/* Official Annual Report Document Preview */}
        <section>
          <ReportPreviewModal periodId={defaultPeriod.id} isInternal={false} />
        </section>

        {/* Methodology Link Banner */}
        <section className="border border-brand/30 bg-gradient-to-r from-brand/10 via-brand/5 to-transparent p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-brand">
                <BookOpen className="h-5 w-5" />
                <span className="tiv-meta text-xs font-semibold">METHODOLOGY &amp; PRINCIPLES</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                How TIV Measures Portfolio Economics
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Read our complete public methodology covering cash vs economic investment,
                founder time treatment, shared server allocation algorithms, revenue attribution,
                and why Portfolio Economics is strictly not a valuation system.
              </p>
            </div>

            <Link
              href="/transparency/financials/portfolio-economics/methodology"
              className="inline-flex items-center justify-center gap-2 border border-brand bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand/90 transition-colors shrink-0"
            >
              Read Full Methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
