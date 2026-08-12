'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/shared/status-badge';
import { ConfidenceBadge } from './confidence-badge';
import { formatCurrency, formatHours } from '@/lib/portfolio-economics/decimal';
import type { ProjectEconomicProfile } from '@/lib/portfolio-economics/types';
import { ArrowUpRight, Search, Info } from 'lucide-react';

export function ProjectsEconomicsTable({
  projects,
  currency = 'INR',
  isInternal = false,
}: {
  projects: ProjectEconomicProfile[];
  currency?: string;
  isInternal?: boolean;
}) {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = Array.from(new Set(projects.map((p) => p.projectCategory)));

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.projectTitle.toLowerCase().includes(filter.toLowerCase()) ||
      p.projectSlug.toLowerCase().includes(filter.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.projectCategory === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const getCompletenessBadge = (level: 'High' | 'Medium' | 'Low') => {
    switch (level) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Med
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            Low
          </span>
        );
    }
  };

  return (
    <div className="border border-border bg-card">
      {/* Controls Bar */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="tiv-meta text-xs font-semibold">PROJECT PORTFOLIO MATRIX</span>
          <span className="text-xs text-muted-foreground">({filteredProjects.length} tracked)</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-8 rounded-none border border-border bg-background pl-8 pr-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-8 border border-border bg-background px-2.5 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Investment</th>
              <th className="px-4 py-3 font-medium text-right">Operating Cost</th>
              <th className="px-4 py-3 font-medium text-right">Revenue</th>
              <th className="px-4 py-3 font-medium text-right">Engineering</th>
              <th className="px-4 py-3 font-medium text-right">Contribution</th>
              <th className="px-4 py-3 font-medium text-center">Confidence</th>
              {isInternal && <th className="px-4 py-3 font-medium text-center">Completeness</th>}
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border font-mono text-xs">
            {filteredProjects.map((p) => {
              // Decide revenue display
              let revenueDisplay = 'Not Tracked';
              if (p.isResearch) {
                revenueDisplay = 'Not Applicable';
              } else if (p.attributedRevenue !== null) {
                revenueDisplay = isInternal
                  ? formatCurrency(p.attributedRevenue, currency)
                  : 'Tracked';
              } else if (p.revenueStatusText) {
                revenueDisplay = p.revenueStatusText;
              }

              // Decide investment display
              const investmentDisplay = isInternal
                ? formatCurrency(p.totalDevelopmentInvestment, currency, 'Not Tracked')
                : p.totalDevelopmentInvestment !== null
                ? 'Tracked'
                : 'Not Tracked';

              // Decide operating cost display
              const costDisplay = isInternal
                ? formatCurrency(p.totalOperatingCosts, currency, 'Not Tracked')
                : p.totalOperatingCosts !== null
                ? 'Tracked'
                : 'Not Tracked';

              // Contribution
              const contributionDisplay = isInternal
                ? formatCurrency(p.portfolioContribution, currency, '—')
                : '—';

              return (
                <tr
                  key={p.projectId}
                  className="group transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-3.5">
                    <Link
                      href={`/projects/${p.projectSlug}/economics`}
                      className="font-sans font-medium text-foreground group-hover:text-brand flex items-center gap-1.5"
                    >
                      {p.projectTitle}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <span className="text-[10px] text-muted-foreground block font-mono">
                      {p.projectCategory}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <StatusBadge status={p.projectStatus} />
                  </td>

                  <td className="px-4 py-3.5 text-right font-medium">
                    {investmentDisplay}
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    {costDisplay}
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span
                      className={
                        p.isResearch
                          ? 'text-muted-foreground italic'
                          : revenueDisplay === 'Tracked' || revenueDisplay.startsWith('₹')
                          ? 'text-foreground font-medium'
                          : 'text-muted-foreground'
                      }
                    >
                      {revenueDisplay}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    {formatHours(p.totalEngineeringHours, 'Not Tracked')}
                  </td>

                  <td className="px-4 py-3.5 text-right font-semibold">
                    <span
                      className={
                        p.portfolioContribution && p.portfolioContribution > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : p.portfolioContribution && p.portfolioContribution < 0
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-muted-foreground'
                      }
                    >
                      {contributionDisplay}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-center">
                    <ConfidenceBadge confidence={p.overallConfidence} />
                  </td>

                  {isInternal && (
                    <td className="px-4 py-3.5 text-center" title={`Data Completeness: ${p.dataCompleteness}`}>
                      {getCompletenessBadge(p.dataCompleteness)}
                    </td>
                  )}

                  <td className="px-4 py-3.5 text-right font-sans">
                    <Link
                      href={`/projects/${p.projectSlug}/economics`}
                      className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Disclosure Legend */}
      <div className="border-t border-border bg-muted/10 p-3 text-[11px] text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>
            {isInternal
              ? 'Management View: displaying full attributable financial metrics and data completeness scores.'
              : 'Public View: project metrics marked "Tracked" protect sensitive contract figures while verifying measurement.'}
          </span>
        </div>
        <div className="font-mono text-[10px]">
          7 Initiatives • Currency: INR (₹)
        </div>
      </div>
    </div>
  );
}
