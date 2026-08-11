'use client';

import { useState } from 'react';
import { compareFinancialPeriods } from '@/lib/portfolio-economics/calculations';
import { getFinancialPeriods } from '@/lib/portfolio-economics/periods';
import { formatCurrency } from '@/lib/portfolio-economics/decimal';
import { Calendar, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

export function PeriodComparison({
  initialPeriodA = 'fy2026',
  initialPeriodB = 'fy2027',
}: {
  initialPeriodA?: string;
  initialPeriodB?: string;
}) {
  const periods = getFinancialPeriods();
  const [periodAId, setPeriodAId] = useState(initialPeriodA);
  const [periodBId, setPeriodBId] = useState(initialPeriodB);

  const comp = compareFinancialPeriods(periodAId, periodBId);
  const { periodA, periodB, revenueGrowthPercent, costGrowthPercent, investmentGrowthPercent, contributionGrowthPercent, notes } = comp;

  const renderGrowth = (val: number | null) => {
    if (val === null) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
          <Minus className="h-3 w-3" /> Unavailable
        </span>
      );
    }
    const isPositive = val > 0;
    const isZero = val === 0;
    return (
      <span
        className={`inline-flex items-center gap-1 font-mono text-xs font-bold ${
          isZero
            ? 'text-muted-foreground'
            : isPositive
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-amber-600 dark:text-amber-400'
        }`}
      >
        {isPositive ? <TrendingUp className="h-3 w-3" /> : !isZero ? <TrendingDown className="h-3 w-3" /> : null}
        {isPositive ? `+${val}%` : `${val}%`}
      </span>
    );
  };

  return (
    <div className="border border-border bg-card p-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-brand" />
          <span className="tiv-meta text-xs">ANNUAL TREND &amp; PERIOD COMPARISON</span>
        </div>
        <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
          Fiscal Period Performance Analysis
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Growth metrics are computed exclusively when defensible data exists across both periods. TIV never extrapolates growth from unavailable records.
        </p>
      </div>

      {/* Period Selectors */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-border pb-4">
        <div>
          <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
            Baseline Period:
          </label>
          <select
            value={periodAId}
            onChange={(e) => setPeriodAId(e.target.value)}
            className="w-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
          >
            {periods.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fiscalYear} ({p.status})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
            Comparison Period:
          </label>
          <select
            value={periodBId}
            onChange={(e) => setPeriodBId(e.target.value)}
            className="w-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
          >
            {periods.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fiscalYear} ({p.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-border bg-background p-4">
          <span className="tiv-meta text-[10px]">ATTRIBUTED REVENUE</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-xs text-muted-foreground">Growth:</span>
            {renderGrowth(revenueGrowthPercent)}
          </div>
          <div className="mt-2 text-[11px] font-mono text-muted-foreground flex justify-between">
            <span>{periodA.fiscalYear}: {formatCurrency(periodA.totalAttributedRevenue, 'INR', '—')}</span>
            <span>{periodB.fiscalYear}: {formatCurrency(periodB.totalAttributedRevenue, 'INR', '—')}</span>
          </div>
        </div>

        <div className="border border-border bg-background p-4">
          <span className="tiv-meta text-[10px]">OPERATING COSTS</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-xs text-muted-foreground">Growth:</span>
            {renderGrowth(costGrowthPercent)}
          </div>
          <div className="mt-2 text-[11px] font-mono text-muted-foreground flex justify-between">
            <span>{periodA.fiscalYear}: {formatCurrency(periodA.totalOperatingCosts, 'INR', '—')}</span>
            <span>{periodB.fiscalYear}: {formatCurrency(periodB.totalOperatingCosts, 'INR', '—')}</span>
          </div>
        </div>

        <div className="border border-border bg-background p-4">
          <span className="tiv-meta text-[10px]">DEVELOPMENT INVESTMENT</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-xs text-muted-foreground">Growth:</span>
            {renderGrowth(investmentGrowthPercent)}
          </div>
          <div className="mt-2 text-[11px] font-mono text-muted-foreground flex justify-between">
            <span>{periodA.fiscalYear}: {formatCurrency(periodA.totalDevelopmentInvestment, 'INR', '—')}</span>
            <span>{periodB.fiscalYear}: {formatCurrency(periodB.totalDevelopmentInvestment, 'INR', '—')}</span>
          </div>
        </div>

        <div className="border border-border bg-background p-4">
          <span className="tiv-meta text-[10px]">PORTFOLIO CONTRIBUTION</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-xs text-muted-foreground">Growth:</span>
            {renderGrowth(contributionGrowthPercent)}
          </div>
          <div className="mt-2 text-[11px] font-mono text-muted-foreground flex justify-between">
            <span>{periodA.fiscalYear}: {formatCurrency(periodA.portfolioContribution, 'INR', '—')}</span>
            <span>{periodB.fiscalYear}: {formatCurrency(periodB.portfolioContribution, 'INR', '—')}</span>
          </div>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <ul className="space-y-1 text-[11px] font-mono text-muted-foreground">
            {notes.map((n, i) => (
              <li key={i} className="flex items-center gap-2">
                <AlertCircle className="h-3 w-3 text-muted-foreground shrink-0" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
