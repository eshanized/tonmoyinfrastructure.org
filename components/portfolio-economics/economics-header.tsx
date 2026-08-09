'use client';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import { StatusBadge } from '@/components/shared/status-badge';
import { Calendar, ShieldAlert, BarChart3, ArrowUpRight, BookOpen } from 'lucide-react';
import type { FinancialPeriod, PortfolioEconomicsSummary } from '@/lib/portfolio-economics/types';

interface EconomicsHeaderProps {
  summary: PortfolioEconomicsSummary;
  periods: FinancialPeriod[];
  selectedPeriodId: string;
  onSelectPeriod?: (periodId: string) => void;
  isInternal?: boolean;
}

export function EconomicsHeader({
  summary,
  periods,
  selectedPeriodId,
  onSelectPeriod,
  isInternal = false,
}: EconomicsHeaderProps) {
  return (
    <div className="border-b border-border bg-gradient-to-b from-card/60 via-card/20 to-transparent">
      <div className="tiv-container py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Transparency', href: '/transparency' },
            { label: 'Financials', href: '/transparency/financials' },
            { label: 'Portfolio Economics' },
          ]}
        />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="tiv-meta text-brand font-semibold tracking-wider">
                {isInternal ? 'MANAGEMENT ANALYTICS' : 'PUBLIC TRANSPARENCY'}
              </span>
              <span className="text-border">•</span>
              <span className="font-mono text-xs text-muted-foreground">
                MEASUREMENT ENGINE
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Portfolio Economics.
            </h1>

            <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
              A factual measurement and documentation system measuring development
              investment, operating costs, revenue attribution, engineering hours, shared
              infrastructure, and data confidence across TIV initiatives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Fiscal Period Selector */}
            <div className="flex items-center gap-2 border border-border bg-card px-3 py-2 text-sm">
              <Calendar className="h-4 w-4 text-brand" />
              <label htmlFor="period-select" className="text-xs font-mono uppercase text-muted-foreground">
                Period:
              </label>
              {onSelectPeriod ? (
                <select
                  id="period-select"
                  value={selectedPeriodId}
                  onChange={(e) => onSelectPeriod(e.target.value)}
                  className="bg-transparent font-mono text-sm font-medium text-foreground focus:outline-none cursor-pointer"
                >
                  {periods.map((p) => (
                    <option key={p.id} value={p.id} className="bg-card text-foreground">
                      {p.fiscalYear} ({p.status})
                    </option>
                  ))}
                </select>
              ) : (
                <span className="font-mono font-bold text-foreground">
                  {summary.fiscalYear}
                </span>
              )}
            </div>

            <Link
              href="/transparency/financials/portfolio-economics/methodology"
              className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
            >
              <BookOpen className="h-4 w-4 text-brand" />
              Methodology
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </Link>

            {isInternal ? (
              <Link
                href="/transparency/financials/portfolio-economics"
                className="inline-flex items-center gap-1.5 border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Public View
              </Link>
            ) : (
              <Link
                href="/transparency/financials/portfolio-economics/dashboard"
                className="inline-flex items-center gap-1.5 border border-brand/40 bg-brand/5 px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/10"
              >
                <BarChart3 className="h-4 w-4" />
                Management Console
              </Link>
            )}
          </div>
        </div>

        {/* Snapshot Metric Bar */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 border border-border bg-card/50 p-4">
          <div>
            <span className="tiv-meta text-[10px]">REPORTING PERIOD</span>
            <p className="mt-1 font-mono text-sm font-medium text-foreground">
              {summary.fiscalYear}
            </p>
            <span className="text-[11px] text-muted-foreground">
              {summary.periodStatus}
            </span>
          </div>

          <div>
            <span className="tiv-meta text-[10px]">RECONCILIATION</span>
            <div className="mt-1">
              <StatusBadge status={summary.reconciliationStatus} />
            </div>
            <span className="text-[11px] text-muted-foreground">
              Corporate Ledger Aligned
            </span>
          </div>

          <div>
            <span className="tiv-meta text-[10px]">DATA COVERAGE</span>
            <p className="mt-1 font-mono text-sm font-medium text-foreground">
              {summary.dataCoveragePercent}%
            </p>
            <span className="text-[11px] text-muted-foreground">
              {summary.projectsWithCostData}/{summary.totalProjectsTracked} projects measured
            </span>
          </div>

          <div>
            <span className="tiv-meta text-[10px]">CURRENCY STANDARD</span>
            <p className="mt-1 font-mono text-sm font-medium text-foreground">
              {summary.currency} (₹)
            </p>
            <span className="text-[11px] text-muted-foreground">
              Safe Decimal Arithmetic
            </span>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
            <span className="tiv-meta text-[10px]">SYSTEM PRINCIPLE</span>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Measurement &amp; Lineage.
              <span className="block font-medium text-foreground">Zero Valuation Speculation.</span>
            </p>
          </div>
        </div>

        {/* Essential Principle Callout */}
        <div className="mt-6">
          <Callout type="info" title="Portfolio Economics: Measurement System — Not Project Valuation">
            TIV does not currently assign or publish standalone monetary valuations
            for individual projects through the Portfolio Economics system. This dashboard
            strictly measures and documents economic resource consumption, operating costs,
            attributable revenue, and engineering time to build an auditable evidence base.
          </Callout>
        </div>
      </div>
    </div>
  );
}
