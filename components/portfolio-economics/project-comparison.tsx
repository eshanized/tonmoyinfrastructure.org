'use client';

import { useState } from 'react';
import type { ProjectEconomicProfile } from '@/lib/portfolio-economics/types';
import { formatCurrency, formatHours } from '@/lib/portfolio-economics/decimal';
import { StatusBadge } from '@/components/shared/status-badge';
import { ConfidenceBadge } from './confidence-badge';
import { ArrowLeftRight, Check, Minus } from 'lucide-react';

interface ComparisonMetric {
  label: string;
  valA: any;
  valB: any;
  format: (val: any, p: ProjectEconomicProfile) => React.ReactNode;
}

export function ProjectComparison({
  projects,
  currency = 'INR',
}: {
  projects: ProjectEconomicProfile[];
  currency?: string;
}) {
  const [projectAId, setProjectAId] = useState(projects[0]?.projectId || '');
  const [projectBId, setProjectBId] = useState(projects[1]?.projectId || projects[0]?.projectId || '');

  const projectA = projects.find((p) => p.projectId === projectAId);
  const projectB = projects.find((p) => p.projectId === projectBId);

  if (!projectA || !projectB) return null;

  const metrics: ComparisonMetric[] = [
    {
      label: 'Lifecycle Stage',
      valA: projectA.developmentStage,
      valB: projectB.developmentStage,
      format: (v: string) => <span className="uppercase text-xs font-mono">{v}</span>,
    },
    {
      label: 'Project Status',
      valA: projectA.projectStatus,
      valB: projectB.projectStatus,
      format: (v: string) => <StatusBadge status={v} />,
    },
    {
      label: 'Total Dev Investment',
      valA: projectA.totalDevelopmentInvestment,
      valB: projectB.totalDevelopmentInvestment,
      format: (v: number | null) => formatCurrency(v, currency, 'Not Tracked'),
    },
    {
      label: '— Cash Investment',
      valA: projectA.developmentInvestmentCash,
      valB: projectB.developmentInvestmentCash,
      format: (v: number | null) => formatCurrency(v, currency, 'Not Tracked'),
    },
    {
      label: '— Economic Time Value',
      valA: projectA.developmentInvestmentEconomic,
      valB: projectB.developmentInvestmentEconomic,
      format: (v: number | null) => formatCurrency(v, currency, 'Not Tracked'),
    },
    {
      label: 'Direct Operating Cost',
      valA: projectA.directOperatingCosts,
      valB: projectB.directOperatingCosts,
      format: (v: number | null) => formatCurrency(v, currency, 'Not Tracked'),
    },
    {
      label: 'Allocated Shared Cost',
      valA: projectA.allocatedSharedCosts,
      valB: projectB.allocatedSharedCosts,
      format: (v: number | null) => formatCurrency(v, currency, 'Not Tracked'),
    },
    {
      label: 'Total Operating Cost',
      valA: projectA.totalOperatingCosts,
      valB: projectB.totalOperatingCosts,
      format: (v: number | null) => formatCurrency(v, currency, 'Not Tracked'),
    },
    {
      label: 'Attributed Revenue',
      valA: projectA.attributedRevenue,
      valB: projectB.attributedRevenue,
      format: (v: number | null, p: ProjectEconomicProfile) =>
        p.isResearch ? 'Not Applicable' : formatCurrency(v, currency, p.revenueStatusText || 'Not Tracked'),
    },
    {
      label: 'Engineering Effort',
      valA: projectA.totalEngineeringHours,
      valB: projectB.totalEngineeringHours,
      format: (v: number | null) => formatHours(v, 'Not Tracked'),
    },
    {
      label: 'Portfolio Contribution',
      valA: projectA.portfolioContribution,
      valB: projectB.portfolioContribution,
      format: (v: number | null) => formatCurrency(v, currency, '—'),
    },
    {
      label: 'Data Confidence',
      valA: projectA.overallConfidence,
      valB: projectB.overallConfidence,
      format: (v: any) => <ConfidenceBadge confidence={v} />,
    },
    {
      label: 'Tracking Completeness',
      valA: projectA.dataCompleteness,
      valB: projectB.dataCompleteness,
      format: (v: string) => <span className="font-mono text-xs font-semibold">{v}</span>,
    },
  ];

  return (
    <div className="border border-border bg-card p-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-brand" />
          <span className="tiv-meta text-xs">CROSS-INITIATIVE COMPARISON</span>
        </div>
        <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
          Project Resource Consumption &amp; Economic Profile Comparison
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Factual side-by-side resource and contribution analysis. TIV does not rank projects based on speculative monetary valuations.
        </p>
      </div>

      {/* Selectors */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-border pb-4">
        <div>
          <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
            Initiative Alpha:
          </label>
          <select
            value={projectAId}
            onChange={(e) => setProjectAId(e.target.value)}
            className="w-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
          >
            {projects.map((p) => (
              <option key={p.projectId} value={p.projectId}>
                {p.projectTitle} ({p.projectCategory})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
            Initiative Beta:
          </label>
          <select
            value={projectBId}
            onChange={(e) => setProjectBId(e.target.value)}
            className="w-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
          >
            {projects.map((p) => (
              <option key={p.projectId} value={p.projectId}>
                {p.projectTitle} ({p.projectCategory})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="py-2.5 w-1/3">Economic Dimension</th>
              <th className="py-2.5 w-1/3 text-right font-medium text-foreground">{projectA.projectTitle}</th>
              <th className="py-2.5 w-1/3 text-right font-medium text-foreground">{projectB.projectTitle}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {metrics.map((m, idx) => (
              <tr key={idx} className="hover:bg-muted/20">
                <td className="py-2 text-muted-foreground font-sans">{m.label}</td>
                <td className="py-2 text-right font-mono">
                  {m.format(m.valA, projectA)}
                </td>
                <td className="py-2 text-right font-mono">
                  {m.format(m.valB, projectB)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
