'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  calculateFinancialModel,
  SCENARIO_ASSUMPTIONS,
  type ScenarioId,
  type FinancialModelResults,
} from '@/lib/runstead-financial-model';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  Sliders,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export function RunsteadFinancialModelView() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>('base');

  const modelResults: FinancialModelResults = useMemo(() => {
    return calculateFinancialModel(selectedScenario);
  }, [selectedScenario]);

  const {
    scenario,
    annualSummaries,
    monthlyRecords,
    breakEvenMonth,
    paybackMonth,
    peakFundingRequirement,
    endingYear3ARR,
    endingYear3Customers,
    averageGrossMarginPercent,
    estimatedLTV,
    blendedCAC,
    ltvToCacRatio,
  } = modelResults;

  // Selected milestone snapshot months for compact display
  const milestoneMonths = [1, 6, 12, 18, 24, 30, 36];
  const milestoneRecords = monthlyRecords.filter((r) =>
    milestoneMonths.includes(r.month)
  );

  return (
    <div id="financial-model" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center bg-brand/10 text-brand border border-brand/20">
                <DollarSign className="h-3.5 w-3.5" />
              </span>
              <span className="tiv-meta-brand text-xs font-semibold tracking-wider">
                ILLUSTRATIVE FINANCIAL SCENARIO MODEL
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight text-foreground">
              36-Month Commercial Trajectory &amp; Unit Economics
            </h3>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="flex items-center border border-border bg-card p-1">
            {(['conservative', 'base', 'upside'] as ScenarioId[]).map((scId) => {
              const sc = SCENARIO_ASSUMPTIONS[scId];
              const isActive = selectedScenario === scId;
              return (
                <button
                  key={scId}
                  type="button"
                  onClick={() => setSelectedScenario(scId)}
                  className={`px-3 py-1.5 text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-brand text-brand-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {sc.name.replace(' Scenario', '')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Scenario Description */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-border/70 bg-secondary/20 p-4 text-xs font-mono">
          <div>
            <span className="text-brand font-semibold uppercase tracking-wider">
              {scenario.badge}:
            </span>{' '}
            <span className="text-foreground/90">{scenario.tagline}</span>
            <p className="mt-1 font-sans text-xs text-muted-foreground">
              {scenario.description}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-muted-foreground">
            <Sliders className="h-3.5 w-3.5" />
            <span>Horizon: 36 Months</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="border border-border bg-card p-4">
          <span className="tiv-meta text-[10px] block">YEAR 3 ARR</span>
          <p className="mt-1 font-display text-xl font-bold text-foreground">
            ${endingYear3ARR.toLocaleString()}
          </p>
          <span className="mt-0.5 text-[10px] font-mono text-muted-foreground block">
            Annualized Recurring
          </span>
        </div>

        <div className="border border-border bg-card p-4">
          <span className="tiv-meta text-[10px] block">YEAR 3 CUSTOMERS</span>
          <p className="mt-1 font-display text-xl font-bold text-foreground">
            {endingYear3Customers.toLocaleString()}
          </p>
          <span className="mt-0.5 text-[10px] font-mono text-muted-foreground block">
            Active Resellers
          </span>
        </div>

        <div className="border border-border bg-card p-4">
          <span className="tiv-meta text-[10px] block">BREAK-EVEN TIMING</span>
          <p className="mt-1 font-display text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {breakEvenMonth ? `Month ${breakEvenMonth}` : 'Over 36m'}
          </p>
          <span className="mt-0.5 text-[10px] font-mono text-muted-foreground block">
            Net Cash Flow &gt;= $0
          </span>
        </div>

        <div className="border border-border bg-card p-4">
          <span className="tiv-meta text-[10px] block">PEAK CAPITAL NEED</span>
          <p className="mt-1 font-display text-xl font-bold text-amber-600 dark:text-amber-400">
            ${peakFundingRequirement.toLocaleString()}
          </p>
          <span className="mt-0.5 text-[10px] font-mono text-muted-foreground block">
            Max Cumulative Drawdown
          </span>
        </div>

        <div className="border border-border bg-card p-4">
          <span className="tiv-meta text-[10px] block">AVG GROSS MARGIN</span>
          <p className="mt-1 font-display text-xl font-bold text-foreground">
            {averageGrossMarginPercent}%
          </p>
          <span className="mt-0.5 text-[10px] font-mono text-muted-foreground block">
            Revenue minus Direct COGS
          </span>
        </div>

        <div className="border border-border bg-card p-4">
          <span className="tiv-meta text-[10px] block">LTV / CAC RATIO</span>
          <p className="mt-1 font-display text-xl font-bold text-foreground">
            {ltvToCacRatio}x
          </p>
          <span className="mt-0.5 text-[10px] font-mono text-muted-foreground block">
            LTV: ${estimatedLTV} • CAC: ${blendedCAC}
          </span>
        </div>
      </div>

      {/* 3-Year Annualized Financial Statement Table */}
      <div className="border border-border bg-card">
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div>
            <span className="tiv-meta text-xs">ANNUALIZED PRO FORMA STATEMENT</span>
            <h4 className="mt-1 font-display text-base font-semibold text-foreground">
              3-Year Financial Trajectory ({scenario.name})
            </h4>
          </div>
          <span className="font-mono text-xs text-muted-foreground">Currency: USD ($)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground text-[11px]">
                <th className="px-4 py-3 font-medium">Metric Dimension</th>
                <th className="px-4 py-3 font-medium text-right">Year 1 (Foundation)</th>
                <th className="px-4 py-3 font-medium text-right">Year 2 (Expansion)</th>
                <th className="px-4 py-3 font-medium text-right">Year 3 (Scale)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="px-4 py-2.5 font-sans font-medium text-foreground">
                  Active Paying Customers (Ending)
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right text-foreground font-semibold">
                    {yr.endingPayingCustomers}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">
                  Ending MRR (Monthly Recurring)
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right text-foreground">
                    ${yr.endingMRR.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="bg-secondary/20">
                <td className="px-4 py-2.5 font-sans font-semibold text-brand">
                  Ending ARR (Annualized Recurring Revenue)
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right font-bold text-brand">
                    ${yr.endingARR.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">
                  Blended ARPU (Monthly)
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right text-foreground">
                    ${yr.blendedARPU}
                  </td>
                ))}
              </tr>

              <tr className="border-t-2 border-border/80">
                <td className="px-4 py-2.5 font-sans font-medium text-foreground">
                  Total Annual Recognized Platform Revenue
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right font-medium text-foreground">
                    ${yr.totalAnnualRevenue.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2.5 font-sans text-muted-foreground pl-6">
                  — Direct Variable COGS (Hosting, Payment fees, APIs)
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right text-muted-foreground">
                    (${yr.totalAnnualCOGS.toLocaleString()})
                  </td>
                ))}
              </tr>

              <tr className="bg-secondary/10">
                <td className="px-4 py-2.5 font-sans font-medium text-foreground">
                  Gross Profit &amp; Margin
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right font-medium text-foreground">
                    ${yr.annualGrossProfit.toLocaleString()} ({yr.annualGrossMarginPercent}%)
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2.5 font-sans text-muted-foreground pl-6">
                  — Operating Expenses (Engineering, Infra, Support, Marketing, G&amp;A)
                </td>
                {annualSummaries.map((yr) => (
                  <td key={yr.year} className="px-4 py-2.5 text-right text-muted-foreground">
                    (${yr.totalAnnualOpEx.toLocaleString()})
                  </td>
                ))}
              </tr>

              <tr className="border-t border-border font-bold">
                <td className="px-4 py-3 font-sans text-foreground">
                  Net Annual Operating Cash Flow
                </td>
                {annualSummaries.map((yr) => (
                  <td
                    key={yr.year}
                    className={`px-4 py-3 text-right ${
                      yr.netAnnualCashFlow >= 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {yr.netAnnualCashFlow >= 0
                      ? `$${yr.netAnnualCashFlow.toLocaleString()}`
                      : `($${Math.abs(yr.netAnnualCashFlow).toLocaleString()})`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Milestone Trajectory Progression (M1 to M36) */}
      <div className="border border-border bg-card">
        <div className="border-b border-border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="tiv-meta text-xs">PROGRESSION SAMPLING</span>
            <h4 className="mt-1 font-display text-base font-semibold text-foreground">
              Milestone Checkpoint Telemetry (Semi-Annual)
            </h4>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Values reflect month-end positions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground text-[10px]">
                <th className="px-3 py-2.5">Month</th>
                <th className="px-3 py-2.5 text-right">Free Tenants</th>
                <th className="px-3 py-2.5 text-right">Paying Resellers</th>
                <th className="px-3 py-2.5 text-right">MRR</th>
                <th className="px-3 py-2.5 text-right">ARR</th>
                <th className="px-3 py-2.5 text-right">Total Op Cost</th>
                <th className="px-3 py-2.5 text-right">Net Cash Flow</th>
                <th className="px-3 py-2.5 text-right">Cumulative Flow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {milestoneRecords.map((r) => (
                <tr key={r.month} className="hover:bg-muted/30 transition-colors">
                  <td className="px-3 py-2 font-bold text-foreground">
                    M{r.month}
                  </td>
                  <td className="px-3 py-2 text-right text-muted-foreground">
                    {r.freeSandboxTenants.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-foreground">
                    {r.totalPayingCustomers}
                  </td>
                  <td className="px-3 py-2 text-right text-foreground">
                    ${r.mrr.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-brand">
                    ${r.arr.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right text-muted-foreground">
                    ${r.totalMonthlyOperatingCost.toLocaleString()}
                  </td>
                  <td
                    className={`px-3 py-2 text-right font-medium ${
                      r.netCashFlow >= 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {r.netCashFlow >= 0
                      ? `$${r.netCashFlow.toLocaleString()}`
                      : `($${Math.abs(r.netCashFlow).toLocaleString()})`}
                  </td>
                  <td
                    className={`px-3 py-2 text-right ${
                      r.cumulativeCashFlow >= 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {r.cumulativeCashFlow >= 0
                      ? `$${r.cumulativeCashFlow.toLocaleString()}`
                      : `($${Math.abs(r.cumulativeCashFlow).toLocaleString()})`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assumptions & Integrity Documentation */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sliders className="h-4 w-4 text-brand" />
            <span className="tiv-meta text-xs">MODEL ASSUMPTION SPECIFICATION</span>
          </div>
          <dl className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Indicative Plan Pricing:</span>
              <span className="text-foreground">$0 / $49 / $149 / $399 / $999</span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Free-to-Paid Conversion Rate:</span>
              <span className="text-foreground">{(scenario.freeToPaidConversionRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Monthly Reseller Churn Rate:</span>
              <span className="text-foreground">{(scenario.monthlyChurnRate * 100).toFixed(1)}% (Annualized: ~{(1 - Math.pow(1 - scenario.monthlyChurnRate, 12)) * 100 | 0}%)</span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Tier Distribution (L / G / S / E):</span>
              <span className="text-foreground">
                {(scenario.tierDistribution.launch * 100).toFixed(0)}% / {(scenario.tierDistribution.growth * 100).toFixed(0)}% / {(scenario.tierDistribution.scale * 100).toFixed(0)}% / {(scenario.tierDistribution.enterprise * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Dedicated Core Engineering:</span>
              <span className="text-foreground">${scenario.coreEngineeringMonthly.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Base Infrastructure &amp; Staging:</span>
              <span className="text-foreground">${scenario.baseClusterInfrastructureMonthly.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Variable Unit Server Cost:</span>
              <span className="text-foreground">${scenario.variableHostingCostPerCustomer.toFixed(2)} / tenant / mo</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-muted-foreground">Third-Party Payment &amp; API:</span>
              <span className="text-foreground">2.9% + $0.30/txn + ${scenario.thirdPartyApiCostPerCustomer.toFixed(2)}/mo</span>
            </div>
          </dl>
        </div>

        <div className="border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="tiv-meta text-xs">FINANCIAL INTEGRITY &amp; BOUNDARIES</span>
          </div>
          <div className="space-y-3 text-xs leading-relaxed text-muted-foreground font-sans">
            <p>
              <strong className="text-foreground">1. Hypothetical Estimates Only:</strong> This model is an illustrative tool designed for engineering and commercial milestone planning. It does not reflect past revenue, bank ledger balances, or management commitments.
            </p>
            <p>
              <strong className="text-foreground">2. Downstream Invoice Exclusion:</strong> Invoices generated by resellers selling web hosting, domains, or SSL to their end-users belong entirely to those independent businesses. Only Runstead&apos;s direct platform subscription fees are counted.
            </p>
            <p>
              <strong className="text-foreground">3. No Guaranteed Return:</strong> Neither Tonmoy Infrastructure &amp; Vision nor Runstead offers guaranteed returns on investment, assured exit horizons, or statutory distributions.
            </p>
            <p>
              <strong className="text-foreground">4. Formal Investment Terms:</strong> An official company-approved valuation or equity offering has not been authorized. Maintainers and partners evaluate Milestones 4–6 resource requirements based on audited engineering deliverables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
