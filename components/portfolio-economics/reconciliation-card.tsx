'use client';

import type { PortfolioEconomicsSummary } from '@/lib/portfolio-economics/types';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency } from '@/lib/portfolio-economics/decimal';
import { FileCheck, AlertCircle } from 'lucide-react';

export function ReconciliationCard({
  summary,
}: {
  summary: PortfolioEconomicsSummary;
}) {
  const {
    fiscalYear,
    currency,
    reconciliationStatus,
    reconciliationNotes,
    totalCorporateRevenue,
    totalAttributedRevenue,
    unattributedRevenue,
    totalOperatingCosts,
    totalDirectOperatingCosts,
    totalAllocatedSharedCosts,
    totalUnallocatedCosts,
    totalResearchInvestment,
  } = summary;

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-brand" />
            <span className="tiv-meta text-xs">FINANCIAL RECONCILIATION</span>
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
            Corporate General Ledger vs Project Economics
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">Status:</span>
          <StatusBadge status={reconciliationStatus} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Revenue Reconciliation */}
        <div className="border border-border bg-background p-4 font-mono text-xs">
          <span className="tiv-meta text-[10px] text-brand block mb-3">REVENUE RECONCILIATION</span>

          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Project-Attributed Revenue:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(totalAttributedRevenue, currency)}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Unattributed Corporate Revenue:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(unattributedRevenue, currency)}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-border font-bold">
              <span className="text-foreground">Sum of Revenue Streams:</span>
              <span className="text-brand">
                {formatCurrency(
                  (totalAttributedRevenue || 0) + (unattributedRevenue || 0),
                  currency
                )}
              </span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Corporate Financial Statements:</span>
              <span>{formatCurrency(totalCorporateRevenue, currency)}</span>
            </div>
          </div>
        </div>

        {/* Operating Cost Reconciliation */}
        <div className="border border-border bg-background p-4 font-mono text-xs">
          <span className="tiv-meta text-[10px] text-brand block mb-3">OPERATING COST RECONCILIATION</span>

          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Direct Project Costs:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(totalDirectOperatingCosts, currency)}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Allocated Shared Infrastructure:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(totalAllocatedSharedCosts, currency)}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Direct Research Expenditures:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(totalResearchInvestment, currency)}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Unallocated Corporate Overhead:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(totalUnallocatedCosts, currency)}
              </span>
            </div>

            <div className="flex justify-between py-1 font-bold text-foreground">
              <span>Total Reconciled Relevant Costs:</span>
              <span className="text-brand">
                {formatCurrency(
                  (totalDirectOperatingCosts || 0) +
                    (totalAllocatedSharedCosts || 0) +
                    (totalResearchInvestment || 0) +
                    (totalUnallocatedCosts || 0),
                  currency
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes / Audit Log items */}
      {reconciliationNotes.length > 0 && (
        <div className="mt-6 border-t border-border pt-4">
          <span className="tiv-meta text-[10px]">RECONCILIATION AUDIT MEMORANDUM</span>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            {reconciliationNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-brand shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
