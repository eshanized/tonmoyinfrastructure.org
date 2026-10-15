'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import type { FinancialPeriod, PortfolioEconomicsSummary } from '@/lib/portfolio-economics/types';
import {
  convertPortfolioSummary,
  calculatePortfolioEconomicsSummary,
} from '@/lib/portfolio-economics/calculations';
import { sanitizePortfolioForPublic } from '@/lib/portfolio-economics/auth';
import {
  type SupportedCurrency,
  CURRENCY_CONFIG,
} from '@/lib/portfolio-economics/decimal';
import { PortfolioCurrencyProvider } from './currency-context';
import { EconomicsHeader } from './economics-header';
import { EconomicsSummaryCards } from './economics-summary-cards';
import { ProjectsEconomicsTable } from './projects-economics-table';
import { DataQualityCards } from './data-quality-cards';
import { PortfolioCharts } from './portfolio-charts';
import { ReconciliationCard } from './reconciliation-card';
import { CorporateAssetRegister } from './corporate-asset-register';
import { ReportPreviewModal } from './report-preview-modal';
import { CurrencySelector } from './currency-selector';

export function PublicPortfolioView({
  initialSummary,
  periods,
  defaultPeriod,
}: {
  initialSummary: PortfolioEconomicsSummary;
  periods: FinancialPeriod[];
  defaultPeriod: FinancialPeriod;
}) {
  const [selectedPeriodId, setSelectedPeriodId] = useState(defaultPeriod.id);
  const [currency, setCurrency] = useState<SupportedCurrency>('INR');

  // Compute summary for selected period, then sanitize, then convert currency
  const summary = useMemo(() => {
    const raw = calculatePortfolioEconomicsSummary(selectedPeriodId);
    const sanitized = sanitizePortfolioForPublic(raw);
    return convertPortfolioSummary(sanitized, currency);
  }, [selectedPeriodId, currency]);

  return (
    <PortfolioCurrencyProvider defaultCurrency={currency}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <EconomicsHeader
          summary={summary}
          periods={periods}
          selectedPeriodId={selectedPeriodId}
          onSelectPeriod={setSelectedPeriodId}
          isInternal={false}
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        <main className="tiv-container py-12 space-y-12">
          {/* Key Economics Metrics */}
          <section>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="tiv-meta text-xs">MACRO PORTFOLIO COMMITMENT</span>
                <span className="ml-3 text-xs font-mono text-muted-foreground">
                  Period: {summary.fiscalYear} ({summary.currency})
                </span>
              </div>
              <CurrencySelector
                value={currency}
                onChange={setCurrency}
                compact={true}
                showDisclosure={true}
              />
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
                Direct and allocated infrastructure costs measured ({summary.currency})
              </span>
            </div>
            <ProjectsEconomicsTable
              projects={summary.projects}
              currency={summary.currency}
              isInternal={false}
              onCurrencyChange={setCurrency}
            />
          </section>

          {/* Corporate Asset Register & Capital Infrastructure */}
          <section>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="tiv-meta text-xs">CAPITAL INFRASTRUCTURE ASSETS</span>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Corporate Asset Register &amp; Capital Valuation
                </h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Audited historical acquisition cost &amp; economic net book value across Jayapura Sovereign Facility &amp; Regional Infrastructure
              </span>
            </div>
            <CorporateAssetRegister
              isInternal={false}
              activeCurrency={currency}
              onCurrencyChange={setCurrency}
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
            <ReportPreviewModal periodId={selectedPeriodId} isInternal={false} />
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
    </PortfolioCurrencyProvider>
  );
}
