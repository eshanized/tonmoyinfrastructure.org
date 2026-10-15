'use client';

import { useState, useEffect, useMemo } from 'react';
import type { FinancialReport } from '@/lib/types';
import { CurrencySelector } from '@/components/portfolio-economics/currency-selector';
import {
  type SupportedCurrency,
  convertCurrency,
  getCurrencySymbol,
  formatCurrency,
} from '@/lib/portfolio-economics/decimal';
import { SectionHeader } from '@/components/shared/section-header';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { MetricCard } from '@/components/finance/metric-card';
import { FinancialTable } from '@/components/finance/financial-table';
import { RevenueChart } from '@/components/finance/revenue-chart';
import { ExpenseChart } from '@/components/finance/expense-chart';
import { BalanceSheetChart } from '@/components/finance/balance-sheet-chart';
import { CapitalAllocationChart } from '@/components/finance/capital-allocation-chart';
import { Coins } from 'lucide-react';

interface FinancialsInteractiveViewProps {
  initialReport: FinancialReport;
}

export function FinancialsInteractiveView({
  initialReport,
}: FinancialsInteractiveViewProps) {
  const [currency, setCurrency] = useState<SupportedCurrency>('INR');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tiv-portfolio-currency');
      if (saved && (saved === 'USD' || saved === 'INR' || saved === 'BDT')) {
        setCurrency(saved as SupportedCurrency);
      }
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  const handleCurrencyChange = (newCurrency: SupportedCurrency) => {
    setCurrency(newCurrency);
    try {
      localStorage.setItem('tiv-portfolio-currency', newCurrency);
    } catch {
      // Ignore localStorage issues
    }
  };

  const fromCurrency = initialReport.currency || 'INR';

  const report = useMemo(() => {
    if (fromCurrency === currency) {
      return initialReport;
    }
    const sym = getCurrencySymbol(currency);
    return {
      ...initialReport,
      currency,
      currencySymbol: sym,
      revenue: convertCurrency(initialReport.revenue, fromCurrency, currency) ?? 0,
      operatingExpenses: convertCurrency(initialReport.operatingExpenses, fromCurrency, currency) ?? 0,
      operatingProfit: convertCurrency(initialReport.operatingProfit, fromCurrency, currency) ?? 0,
      netProfit: convertCurrency(initialReport.netProfit, fromCurrency, currency) ?? 0,
      assets: convertCurrency(initialReport.assets, fromCurrency, currency) ?? 0,
      liabilities: convertCurrency(initialReport.liabilities, fromCurrency, currency) ?? 0,
      equity: convertCurrency(initialReport.equity, fromCurrency, currency) ?? 0,
      cashAndEquivalents: convertCurrency(initialReport.cashAndEquivalents, fromCurrency, currency) ?? 0,
      revenueStreams: initialReport.revenueStreams?.map((s) => ({
        ...s,
        amount: convertCurrency(s.amount, fromCurrency, currency) ?? 0,
      })),
      expenseCategories: initialReport.expenseCategories?.map((e) => ({
        ...e,
        amount: convertCurrency(e.amount, fromCurrency, currency) ?? 0,
      })),
      assetBreakdown: initialReport.assetBreakdown?.map((a) => ({
        ...a,
        amount: convertCurrency(a.amount, fromCurrency, currency) ?? 0,
      })),
      liabilityBreakdown: initialReport.liabilityBreakdown?.map((l) => ({
        ...l,
        amount: convertCurrency(l.amount, fromCurrency, currency) ?? 0,
      })),
      equityBreakdown: initialReport.equityBreakdown?.map((e) => ({
        ...e,
        amount: convertCurrency(e.amount, fromCurrency, currency) ?? 0,
      })),
    };
  }, [initialReport, fromCurrency, currency]);

  const sym = report.currencySymbol;
  const isSouthAsian = currency === 'INR' || currency === 'BDT' || sym === '₹' || sym === '৳';

  // Helper for multi-currency subtitles in MetricCard
  const getSecondaryCurrencies = (rawAmount?: number) => {
    if (rawAmount === undefined) return undefined;
    const others = (['USD', 'INR', 'BDT'] as SupportedCurrency[]).filter((c) => c !== currency);
    return others
      .map((c) => {
        const converted = convertCurrency(rawAmount, fromCurrency, c);
        return `${c} ${formatCurrency(converted, c)}`;
      })
      .join(' • ');
  };

  return (
    <>
      {/* Currency Switcher Control Bar */}
      <section className="border-b border-border bg-card/40">
        <div className="tiv-container py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-brand" />
            <div>
              <span className="tiv-meta text-xs font-semibold block">PRESENTATION CURRENCY</span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Triangulated standard: 1 USD = 84.00 INR = 120.00 BDT
              </span>
            </div>
          </div>
          <CurrencySelector
            value={currency}
            onChange={handleCurrencyChange}
            compact={false}
            showDisclosure={true}
          />
        </div>
      </section>

      {/* FY2026 Snapshot — Key Metrics */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              index="01"
              label={`${report.fiscalYear} Snapshot`}
              title="Key financial metrics."
              description={`Estimated position for ${report.fiscalYear} in ${currency} (${sym}).`}
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" stagger={0.06}>
            <StaggerItem>
              <MetricCard
                label="Revenue"
                amount={report.revenue}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.revenue)}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                label="Operating Expenses"
                amount={report.operatingExpenses}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.operatingExpenses)}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                label="Operating Profit"
                amount={report.operatingProfit}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.operatingProfit)}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                label="Net Profit"
                amount={report.netProfit}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.netProfit)}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                label="Cash & Equivalents"
                amount={report.cashAndEquivalents}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.cashAndEquivalents)}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                label="Total Assets"
                amount={report.assets}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.assets)}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                label="Total Liabilities"
                amount={report.liabilities}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.liabilities)}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                label="Estimated Equity"
                amount={report.equity}
                currencySymbol={sym}
                currency={currency}
                subtext={getSecondaryCurrencies(initialReport.equity)}
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Revenue Composition */}
      {report.revenueStreams && report.revenueStreams.length > 0 && (
        <section className="border-b border-border bg-secondary/30">
          <div className="tiv-container py-16 md:py-20">
            <Reveal>
              <SectionHeader
                index="02"
                label="Revenue Composition"
                title="Where revenue comes from."
                description={`TIV's business model combines recurring infrastructure services with technology development (${currency}).`}
              />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="border border-border bg-card p-6">
                <RevenueChart
                  data={report.revenueStreams}
                  currencySymbol={sym}
                  currency={currency}
                />
              </div>
              <div className="border border-border bg-card p-6">
                <FinancialTable
                  headers={['Revenue Stream', `Estimated ${report.fiscalYear} (${currency})`]}
                  rows={report.revenueStreams.map((s) => ({
                    label: s.label,
                    amount: s.amount,
                  }))}
                  currencySymbol={sym}
                  currency={currency}
                  totalLabel="Total Revenue"
                  totalAmount={report.revenue}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Operating Expenses */}
      {report.expenseCategories && report.expenseCategories.length > 0 && (
        <section className="border-b border-border">
          <div className="tiv-container py-16 md:py-20">
            <Reveal>
              <SectionHeader
                index="03"
                label="Operating Expenses"
                title="Where resources go."
                description={`The organization prioritizes engineering and infrastructure while maintaining a lean operating structure (${currency}).`}
              />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="border border-border bg-card p-6">
                <ExpenseChart
                  data={report.expenseCategories}
                  currencySymbol={sym}
                  currency={currency}
                />
              </div>
              <div className="border border-border bg-card p-6">
                <FinancialTable
                  headers={['Expense Category', `Estimated ${report.fiscalYear} (${currency})`]}
                  rows={report.expenseCategories.map((e) => ({
                    label: e.label,
                    amount: e.amount,
                  }))}
                  currencySymbol={sym}
                  currency={currency}
                  totalLabel="Total Operating Expenses"
                  totalAmount={report.operatingExpenses}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Balance Sheet */}
      {report.assetBreakdown && report.liabilityBreakdown && report.equityBreakdown && (
        <section className="border-b border-border bg-secondary/30">
          <div className="tiv-container py-16 md:py-20">
            <Reveal>
              <SectionHeader
                index="04"
                label="Balance Sheet"
                title="Assets, liabilities, and equity."
                description={`Estimated position at ${report.fiscalYear} end in ${currency} (${sym}).`}
              />
            </Reveal>

            {/* Chart */}
            <div className="mt-10 border border-border bg-card p-6">
              <BalanceSheetChart
                assets={report.assetBreakdown}
                liabilities={report.liabilityBreakdown}
                equity={report.equityBreakdown}
                currencySymbol={sym}
                currency={currency}
              />
              {/* Accounting relationship */}
              <div className="mt-6 border-t border-border pt-6 text-center">
                <span className="tiv-meta">ACCOUNTING RELATIONSHIP ({currency})</span>
                <p className="mt-2 font-mono text-sm">
                  Assets = Liabilities + Equity
                </p>
                <p className="mt-1 font-mono text-sm text-brand">
                  {isSouthAsian ? (
                    <>
                      {sym}{((report.assets || 0) / 100000).toFixed(1)}L = {sym}{((report.liabilities || 0) / 100000).toFixed(1)}L + {sym}{((report.equity || 0) / 100000).toFixed(1)}L
                    </>
                  ) : (
                    <>
                      {sym}{Math.round(report.assets || 0).toLocaleString('en-US')} = {sym}{Math.round(report.liabilities || 0).toLocaleString('en-US')} + {sym}{Math.round(report.equity || 0).toLocaleString('en-US')}
                    </>
                  )}
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
                    headers={['Asset', `Value (${currency})`]}
                    rows={report.assetBreakdown.map((a) => ({
                      label: a.label,
                      amount: a.amount,
                    }))}
                    currencySymbol={sym}
                    currency={currency}
                    totalLabel="Total Assets"
                    totalAmount={report.assets}
                  />
                </div>
              </div>

              {/* Liabilities */}
              <div className="border border-border bg-card p-6">
                <span className="tiv-meta-brand">Liabilities</span>
                <div className="mt-4">
                  <FinancialTable
                    headers={['Liability', `Value (${currency})`]}
                    rows={report.liabilityBreakdown.map((l) => ({
                      label: l.label,
                      amount: l.amount,
                    }))}
                    currencySymbol={sym}
                    currency={currency}
                    totalLabel="Total Liabilities"
                    totalAmount={report.liabilities}
                  />
                </div>
              </div>

              {/* Equity */}
              <div className="border border-border bg-card p-6">
                <span className="tiv-meta-brand">Equity</span>
                <div className="mt-4">
                  <FinancialTable
                    headers={['Equity', `Value (${currency})`]}
                    rows={report.equityBreakdown.map((e) => ({
                      label: e.label,
                      amount: e.amount,
                    }))}
                    currencySymbol={sym}
                    currency={currency}
                    totalLabel="Estimated Equity"
                    totalAmount={report.equity}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Capital Allocation */}
      {report.capitalAllocation && report.capitalAllocation.length > 0 && (
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
              <CapitalAllocationChart data={report.capitalAllocation} />
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
    </>
  );
}
