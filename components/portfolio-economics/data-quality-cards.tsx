'use client';

import type { PortfolioEconomicsSummary } from '@/lib/portfolio-economics/types';
import { ConfidenceBadge } from './confidence-badge';
import { ShieldCheck, Database, CheckCircle2, AlertCircle } from 'lucide-react';

export function DataQualityCards({
  summary,
}: {
  summary: PortfolioEconomicsSummary;
}) {
  const { confidenceBreakdown, dataCoveragePercent, projectsWithCostData, projectsWithEngineeringData, projectsWithRevenueData, totalProjectsTracked } = summary;

  const totalConfidenceMetrics =
    confidenceBreakdown.verifiedCount +
    confidenceBreakdown.calculatedCount +
    confidenceBreakdown.allocatedCount +
    confidenceBreakdown.estimatedCount +
    confidenceBreakdown.unverifiedCount;

  const getPercent = (count: number) => {
    if (!totalConfidenceMetrics) return 0;
    return Math.round((count / totalConfidenceMetrics) * 100);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* 1. Confidence Distribution */}
      <div className="border border-border bg-card p-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="tiv-meta text-xs">CONFIDENCE DISTRIBUTION</span>
          <ShieldCheck className="h-4 w-4 text-brand" />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <ConfidenceBadge confidence="Verified" />
            <span className="font-mono text-foreground font-medium">
              {confidenceBreakdown.verifiedCount} projects ({getPercent(confidenceBreakdown.verifiedCount)}%)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <ConfidenceBadge confidence="Calculated" />
            <span className="font-mono text-foreground font-medium">
              {confidenceBreakdown.calculatedCount} projects ({getPercent(confidenceBreakdown.calculatedCount)}%)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <ConfidenceBadge confidence="Allocated" />
            <span className="font-mono text-foreground font-medium">
              {confidenceBreakdown.allocatedCount} projects ({getPercent(confidenceBreakdown.allocatedCount)}%)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <ConfidenceBadge confidence="Estimated" />
            <span className="font-mono text-foreground font-medium">
              {confidenceBreakdown.estimatedCount} projects ({getPercent(confidenceBreakdown.estimatedCount)}%)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <ConfidenceBadge confidence="Unverified" />
            <span className="font-mono text-muted-foreground font-medium">
              {confidenceBreakdown.unverifiedCount} projects ({getPercent(confidenceBreakdown.unverifiedCount)}%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Data Completeness Coverage */}
      <div className="border border-border bg-card p-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="tiv-meta text-xs">MEASUREMENT COVERAGE</span>
          <Database className="h-4 w-4 text-brand" />
        </div>

        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-display text-foreground md:text-3xl">
              {dataCoveragePercent}%
            </span>
            <span className="text-xs font-mono text-muted-foreground">Portfolio Depth</span>
          </div>

          <div className="mt-3 h-2 w-full bg-muted overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-500"
              style={{ width: `${dataCoveragePercent}%` }}
            />
          </div>

          <div className="mt-4 space-y-2 font-mono text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Operating Costs Tracked:</span>
              <span className="font-medium text-foreground">{projectsWithCostData}/{totalProjectsTracked}</span>
            </div>
            <div className="flex justify-between">
              <span>Engineering Hours Tracked:</span>
              <span className="font-medium text-foreground">{projectsWithEngineeringData}/{totalProjectsTracked}</span>
            </div>
            <div className="flex justify-between">
              <span>Revenue / Commercial Stream:</span>
              <span className="font-medium text-foreground">{projectsWithRevenueData}/{totalProjectsTracked}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Lineage & Source Principles */}
      <div className="border border-border bg-card p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="tiv-meta text-xs">DATA LINEAGE INTEGRITY</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>

          <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-brand shrink-0" />
              <span>
                <strong className="text-foreground font-medium">Accounting Separation:</strong> All figures link to general ledger vouchers, timesheets, or allocation memos.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-brand shrink-0" />
              <span>
                <strong className="text-foreground font-medium">No False Zeroes:</strong> Untracked figures are explicitly preserved as "Not Tracked" or "Not Disclosed".
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-brand shrink-0" />
              <span>
                <strong className="text-foreground font-medium">Sum Integrity:</strong> Shared allocations validate mathematically to 100% of source cost.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-4 border-t border-border pt-3 text-[11px] font-mono text-muted-foreground">
          Source Ledger: GL-FY2026-MGT &amp; Invoices
        </div>
      </div>
    </div>
  );
}
