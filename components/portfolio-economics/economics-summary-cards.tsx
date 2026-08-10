'use client';

import { formatCurrency, formatHours } from '@/lib/portfolio-economics/decimal';
import { ConfidenceBadge } from './confidence-badge';
import type { PortfolioEconomicsSummary } from '@/lib/portfolio-economics/types';
import { TrendingUp, Clock, Layers, Cpu, Server, DollarSign } from 'lucide-react';

export function EconomicsSummaryCards({
  summary,
  isInternal = false,
}: {
  summary: PortfolioEconomicsSummary;
  isInternal?: boolean;
}) {
  const cards = [
    {
      label: 'TOTAL ATTRIBUTED REVENUE',
      value: formatCurrency(summary.totalAttributedRevenue, summary.currency, 'Not Tracked'),
      subtext: summary.unattributedRevenue
        ? `+ ₹${summary.unattributedRevenue.toLocaleString('en-IN')} Corporate Unattributed`
        : 'Reconciled stream',
      icon: DollarSign,
      confidence: 'Verified' as const,
    },
    {
      label: 'PROJECT OPERATING COSTS',
      value: formatCurrency(summary.totalOperatingCosts, summary.currency, 'Not Tracked'),
      subtext: summary.totalDirectOperatingCosts
        ? `Direct: ₹${summary.totalDirectOperatingCosts.toLocaleString('en-IN')} • Shared: ₹${(summary.totalAllocatedSharedCosts || 0).toLocaleString('en-IN')}`
        : 'Direct & Allocated Hosting/Compute',
      icon: Server,
      confidence: 'Allocated' as const,
    },
    {
      label: 'DEVELOPMENT INVESTMENT',
      value: formatCurrency(summary.totalDevelopmentInvestment, summary.currency, 'Not Tracked'),
      subtext: summary.totalDevelopmentInvestmentCash
        ? `Cash: ₹${summary.totalDevelopmentInvestmentCash.toLocaleString('en-IN')} • Economic: ₹${(summary.totalDevelopmentInvestmentEconomic || 0).toLocaleString('en-IN')}`
        : 'Cash & Economic Engineering Time',
      icon: TrendingUp,
      confidence: 'Calculated' as const,
    },
    {
      label: 'RESEARCH INVESTMENT',
      value: formatCurrency(summary.totalResearchInvestment, summary.currency, 'Not Tracked'),
      subtext: 'AI Models, Datasets & Lab Equipment',
      icon: Cpu,
      confidence: 'Verified' as const,
    },
    {
      label: 'ENGINEERING EFFORT',
      value: formatHours(summary.totalEngineeringHours, 'Not Tracked'),
      subtext: 'Development, Research & Maintenance',
      icon: Clock,
      confidence: 'Verified' as const,
    },
    {
      label: 'PORTFOLIO INITIATIVES',
      value: `${summary.totalProjectsTracked} Projects`,
      subtext: `${summary.activeProjectsCount} Active Software • ${summary.totalProjectsTracked - summary.activeProjectsCount} Research/Infra`,
      icon: Layers,
      confidence: 'Verified' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="group relative border border-border bg-card p-5 transition-all hover:border-brand/40"
          >
            <div className="flex items-start justify-between">
              <span className="tiv-meta text-[11px]">{card.label}</span>
              <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand" />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-2">
              <p className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {card.value}
              </p>
              <ConfidenceBadge confidence={card.confidence} />
            </div>

            <p className="mt-2 text-xs text-muted-foreground truncate" title={card.subtext}>
              {card.subtext}
            </p>

            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
          </div>
        );
      })}
    </div>
  );
}
