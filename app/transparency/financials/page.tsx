import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import { StatusBadge } from '@/components/shared/status-badge';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { MetricCard } from '@/components/finance/metric-card';
import { FinancialTable } from '@/components/finance/financial-table';
import { RevenueChart } from '@/components/finance/revenue-chart';
import { ExpenseChart } from '@/components/finance/expense-chart';
import { BalanceSheetChart } from '@/components/finance/balance-sheet-chart';
import { CapitalAllocationChart } from '@/components/finance/capital-allocation-chart';
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
              { label: 'Transparency', href: '/transparency' },
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
                href="/transparency/financials/portfolio-economics"
                className="inline-flex items-center gap-2 border border-brand bg-brand px-4 py-2 text-xs font-medium text-white hover:bg-brand/90 transition-colors shrink-0"
              >
                View Portfolio Economics
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FY2026 Snapshot — Key Metrics */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              index="01"
              label="FY2026 Snapshot"
              title="Key financial metrics."
              description="Estimated position for the current fiscal year."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" stagger={0.06}>
            <StaggerItem><MetricCard label="Revenue" amount={latest.revenue} currencySymbol={sym} /></StaggerItem>
            <StaggerItem><MetricCard label="Operating Expenses" amount={latest.operatingExpenses} currencySymbol={sym} /></StaggerItem>
            <StaggerItem><MetricCard label="Operating Profit" amount={latest.operatingProfit} currencySymbol={sym} /></StaggerItem>
            <StaggerItem><MetricCard label="Net Profit" amount={latest.netProfit} currencySymbol={sym} /></StaggerItem>
            <StaggerItem><MetricCard label="Cash & Equivalents" amount={latest.cashAndEquivalents} currencySymbol={sym} /></StaggerItem>
            <StaggerItem><MetricCard label="Total Assets" amount={latest.assets} currencySymbol={sym} /></StaggerItem>
            <StaggerItem><MetricCard label="Total Liabilities" amount={latest.liabilities} currencySymbol={sym} /></StaggerItem>
            <StaggerItem><MetricCard label="Estimated Equity" amount={latest.equity} currencySymbol={sym} /></StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Revenue Composition */}
      {latest.revenueStreams && latest.revenueStreams.length > 0 && (
        <section className="border-b border-border bg-secondary/30">
          <div className="tiv-container py-16 md:py-20">
            <Reveal>
              <SectionHeader
                index="02"
                label="Revenue Composition"
                title="Where revenue comes from."
                description="TIV's business model combines recurring infrastructure services with technology development."
              />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="border border-border bg-card p-6">
                <RevenueChart data={latest.revenueStreams} currencySymbol={sym} />
              </div>
              <div className="border border-border bg-card p-6">
                <FinancialTable
                  headers={['Revenue Stream', `Estimated ${latest.fiscalYear}`]}
                  rows={latest.revenueStreams.map((s) => ({
                    label: s.label,
                    amount: s.amount,
                  }))}
                  currencySymbol={sym}
                  totalLabel="Total Revenue"
                  totalAmount={latest.revenue}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Operating Expenses */}
      {latest.expenseCategories && latest.expenseCategories.length > 0 && (
        <section className="border-b border-border">
          <div className="tiv-container py-16 md:py-20">
            <Reveal>
              <SectionHeader
                index="03"
                label="Operating Expenses"
                title="Where resources go."
                description="The organization prioritizes engineering and infrastructure while maintaining a lean operating structure."
              />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="border border-border bg-card p-6">
                <ExpenseChart data={latest.expenseCategories} currencySymbol={sym} />
              </div>
              <div className="border border-border bg-card p-6">
                <FinancialTable
                  headers={['Expense Category', `Estimated ${latest.fiscalYear}`]}
                  rows={latest.expenseCategories.map((e) => ({
                    label: e.label,
                    amount: e.amount,
                  }))}
                  currencySymbol={sym}
                  totalLabel="Total Operating Expenses"
                  totalAmount={latest.operatingExpenses}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Balance Sheet */}
      {latest.assetBreakdown && latest.liabilityBreakdown && latest.equityBreakdown && (
        <section className="border-b border-border bg-secondary/30">
          <div className="tiv-container py-16 md:py-20">
            <Reveal>
              <SectionHeader
                index="04"
                label="Balance Sheet"
                title="Assets, liabilities, and equity."
                description={`Estimated position at ${latest.fiscalYear} end.`}
              />
            </Reveal>

            {/* Chart */}
            <div className="mt-10 border border-border bg-card p-6">
              <BalanceSheetChart
                assets={latest.assetBreakdown}
                liabilities={latest.liabilityBreakdown}
                equity={latest.equityBreakdown}
                currencySymbol={sym}
              />
              {/* Accounting relationship */}
              <div className="mt-6 border-t border-border pt-6 text-center">
                <span className="tiv-meta">ACCOUNTING RELATIONSHIP</span>
                <p className="mt-2 font-mono text-sm">
                  Assets = Liabilities + Equity
                </p>
                <p className="mt-1 font-mono text-sm text-brand">
                  {sym}{((latest.assets || 0) / 100000).toFixed(1)}L = {sym}{((latest.liabilities || 0) / 100000).toFixed(1)}L + {sym}{((latest.equity || 0) / 100000).toFixed(1)}L
                </p>
              </div>
            </div>

            {/* Detailed tables */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Assets */}
              <div className="border border-border bg-card p-6">
                <span className="tiv-meta-brand">Assets</span>
                <div className="mt-4">
                  <FinancialTable
                    headers={['Asset', 'Value']}
                    rows={latest.assetBreakdown.map((a) => ({
                      label: a.label,
                      amount: a.amount,
                    }))}
                    currencySymbol={sym}
                    totalLabel="Total Assets"
                    totalAmount={latest.assets}
                  />
                </div>
              </div>

              {/* Liabilities */}
              <div className="border border-border bg-card p-6">
                <span className="tiv-meta-brand">Liabilities</span>
                <div className="mt-4">
                  <FinancialTable
                    headers={['Liability', 'Value']}
                    rows={latest.liabilityBreakdown.map((l) => ({
                      label: l.label,
                      amount: l.amount,
                    }))}
                    currencySymbol={sym}
                    totalLabel="Total Liabilities"
                    totalAmount={latest.liabilities}
                  />
                </div>
              </div>

              {/* Equity */}
              <div className="border border-border bg-card p-6">
                <span className="tiv-meta-brand">Equity</span>
                <div className="mt-4">
                  <FinancialTable
                    headers={['Equity', 'Value']}
                    rows={latest.equityBreakdown.map((e) => ({
                      label: e.label,
                      amount: e.amount,
                    }))}
                    currencySymbol={sym}
                    totalLabel="Estimated Equity"
                    totalAmount={latest.equity}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Capital Allocation */}
      {latest.capitalAllocation && latest.capitalAllocation.length > 0 && (
        <section className="border-b border-border">
          <div className="tiv-container py-16 md:py-20">
            <Reveal>
              <SectionHeader
                index="05"
                label="Capital Allocation"
                title="How capital is directed."
                description="TIV's capital is directed primarily toward building infrastructure and technology that can compound over time."
              />
            </Reveal>
            <div className="mt-10 border border-border bg-card p-6 md:p-8">
              <CapitalAllocationChart data={latest.capitalAllocation} />
            </div>
            <div className="mt-6 max-w-2xl">
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                The organization expects infrastructure and R&D spending to
                remain strategically important as networking, optical systems,
                and software platforms develop.
              </p>
            </div>
          </div>
        </section>
      )}

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
