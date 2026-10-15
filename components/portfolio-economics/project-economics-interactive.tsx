'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { ProjectEconomicProfile } from '@/lib/portfolio-economics/types';
import { CurrencySelector } from '@/components/portfolio-economics/currency-selector';
import {
  formatCurrency,
  formatHours,
  formatPercentage,
  getCurrencySymbol,
  convertCurrency,
  type SupportedCurrency,
} from '@/lib/portfolio-economics/decimal';
import { convertProjectProfile } from '@/lib/portfolio-economics/calculations';
import { StrategicRadarCard } from '@/components/portfolio-economics/strategic-radar-card';
import {
  DollarSign,
  Server,
  Clock,
  Building,
  ShieldCheck,
  TrendingUp,
  Coins,
} from 'lucide-react';

interface ProjectEconomicsInteractiveProps {
  initialProfile: ProjectEconomicProfile;
  projectSlug: string;
}

export function ProjectEconomicsInteractive({
  initialProfile,
  projectSlug,
}: ProjectEconomicsInteractiveProps) {
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

  const profile = useMemo(() => {
    return convertProjectProfile(initialProfile, currency);
  }, [initialProfile, currency]);

  const sym = getCurrencySymbol(currency);

  // Helper for secondary currency badges
  const getSecondaryCurrencies = (amountInBase: number | null | undefined, baseCurrency: string = 'INR') => {
    if (amountInBase === null || amountInBase === undefined) return null;
    const others = (['USD', 'INR', 'BDT'] as SupportedCurrency[]).filter((c) => c !== currency);
    return others.map((c) => {
      const converted = convertCurrency(amountInBase, baseCurrency, c);
      return `${c} ${formatCurrency(converted, c)}`;
    }).join(' • ');
  };

  return (
    <div className="space-y-8">
      {/* Currency Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-brand" />
          <div>
            <span className="tiv-meta text-xs font-semibold block">PRESENTATION CURRENCY</span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Dynamic conversion across USD ($), INR (₹), and BDT (৳)
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

      {/* Core Contribution & Snapshot */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-border bg-card p-5">
          <span className="tiv-meta text-[11px]">PORTFOLIO CONTRIBUTION</span>
          <p className="mt-2 font-display text-2xl font-semibold text-foreground">
            {formatCurrency(profile.portfolioContribution, currency, '—')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Attributed Revenue - Operating Costs
          </p>
          {profile.portfolioContribution !== null && (
            <p className="mt-2 text-[10px] font-mono text-muted-foreground border-t border-border/40 pt-1.5">
              {getSecondaryCurrencies(initialProfile.portfolioContribution, initialProfile.currency)}
            </p>
          )}
        </div>

        <div className="border border-border bg-card p-5">
          <span className="tiv-meta text-[11px]">TOTAL OPERATING COSTS</span>
          <p className="mt-2 font-display text-2xl font-semibold text-foreground">
            {formatCurrency(profile.totalOperatingCosts, currency, 'Not Tracked')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Direct ({sym}{(profile.directOperatingCosts || 0).toLocaleString()}) + Shared ({sym}{(profile.allocatedSharedCosts || 0).toLocaleString()})
          </p>
          {profile.totalOperatingCosts !== null && (
            <p className="mt-2 text-[10px] font-mono text-muted-foreground border-t border-border/40 pt-1.5">
              {getSecondaryCurrencies(initialProfile.totalOperatingCosts, initialProfile.currency)}
            </p>
          )}
        </div>

        <div className="border border-border bg-card p-5">
          <span className="tiv-meta text-[11px]">DEVELOPMENT INVESTMENT</span>
          <p className="mt-2 font-display text-2xl font-semibold text-foreground">
            {formatCurrency(profile.totalDevelopmentInvestment, currency, 'Not Tracked')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Cash: {sym}{(profile.developmentInvestmentCash || 0).toLocaleString()} • Economic: {sym}{(profile.developmentInvestmentEconomic || 0).toLocaleString()}
          </p>
          {profile.totalDevelopmentInvestment !== null && (
            <p className="mt-2 text-[10px] font-mono text-muted-foreground border-t border-border/40 pt-1.5">
              {getSecondaryCurrencies(initialProfile.totalDevelopmentInvestment, initialProfile.currency)}
            </p>
          )}
        </div>

        <div className="border border-border bg-card p-5">
          <span className="tiv-meta text-[11px]">LOGGED ENGINEERING EFFORT</span>
          <p className="mt-2 font-display text-2xl font-semibold text-foreground">
            {formatHours(profile.totalEngineeringHours, 'Not Tracked')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {profile.effectiveCostPerHour
              ? `Effective ${sym}${profile.effectiveCostPerHour.toFixed(0)}/hr`
              : 'Verified timesheet entries'}
          </p>
          {profile.effectiveCostPerHour && (
            <p className="mt-2 text-[10px] font-mono text-muted-foreground border-t border-border/40 pt-1.5">
              {getSecondaryCurrencies(initialProfile.effectiveCostPerHour, initialProfile.currency)}
            </p>
          )}
        </div>
      </section>

      {/* Detailed Breakdown: Revenue & Operating Costs */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Attribution */}
        <div className="border border-border bg-card p-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-brand" />
              <span className="tiv-meta text-xs">REVENUE ATTRIBUTION ({currency})</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Direct Causality
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs font-mono">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Direct Commercial Revenue:</span>
              <span className="text-foreground font-medium">
                {profile.isResearch ? 'Not Applicable' : formatCurrency(profile.directRevenue, currency, '—')}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Allocated Service Revenue:</span>
              <span className="text-foreground font-medium">
                {profile.isResearch ? 'Not Applicable' : formatCurrency(profile.allocatedRevenue, currency, '—')}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-border font-bold text-sm">
              <span className="text-foreground font-sans">Total Attributed Revenue:</span>
              <span className="text-brand">
                {profile.isResearch ? 'Not Applicable' : formatCurrency(profile.attributedRevenue, currency, 'Not Separately Disclosed')}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            {profile.isResearch
              ? 'Research projects are exploratory assets with public open checkpoints. Commercial revenue expectations are not applicable.'
              : 'Commercial revenue is only attributed to projects with direct customer contracts or unbundled usage. General corporate income is retained at portfolio level.'}
          </p>
        </div>

        {/* Operating Cost Composition */}
        <div className="border border-border bg-card p-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-brand" />
              <span className="tiv-meta text-xs">OPERATING COSTS ({currency})</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Direct &amp; Shared</span>
          </div>

          <div className="mt-4 space-y-3 text-xs font-mono">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Direct Hosting &amp; Compute:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(profile.directOperatingCosts, currency, 'Not Tracked')}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Allocated Shared Server &amp; CI:</span>
              <span className="text-foreground font-medium">
                {formatCurrency(profile.allocatedSharedCosts, currency, 'Not Tracked')}
              </span>
            </div>

            {profile.researchInvestment !== null && (
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Direct Research &amp; Datasets:</span>
                <span className="text-foreground font-medium">
                  {formatCurrency(profile.researchInvestment, currency)}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-border font-bold text-sm">
              <span className="text-foreground font-sans">Total Operating Costs:</span>
              <span className="text-brand">
                {formatCurrency(profile.totalOperatingCosts, currency, 'Not Tracked')}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            Direct costs represent dedicated servers and storage. Shared costs reflect compute and bandwidth consumption allocated mathematically from multi-project clusters.
          </p>
        </div>
      </section>

      {/* Engineering Effort Breakdown */}
      <section className="border border-border bg-card p-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand" />
            <span className="tiv-meta text-xs">ENGINEERING EFFORT LEDGER</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Total Logged: {formatHours(profile.totalEngineeringHours, '0 hrs')}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono text-xs">
          <div className="border border-border bg-background p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">Development</span>
            <p className="mt-1 text-lg font-bold text-foreground">
              {profile.developmentHours || 0} hrs
            </p>
          </div>

          <div className="border border-border bg-background p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">Research</span>
            <p className="mt-1 text-lg font-bold text-foreground">
              {profile.researchHours || 0} hrs
            </p>
          </div>

          <div className="border border-border bg-background p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">Maintenance</span>
            <p className="mt-1 text-lg font-bold text-foreground">
              {profile.maintenanceHours || 0} hrs
            </p>
          </div>

          <div className="border border-border bg-background p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">Effective Rate</span>
            <p className="mt-1 text-lg font-bold text-brand">
              {profile.effectiveCostPerHour
                ? `${sym}${profile.effectiveCostPerHour.toFixed(0)}/h`
                : '—'}
            </p>
          </div>
        </div>
      </section>

      {/* Shared Infrastructure & Physical Assets */}
      {profile.allocatedAssets.length > 0 && (
        <section className="border border-border bg-card p-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-brand" />
              <span className="tiv-meta text-xs">SHARED INFRASTRUCTURE &amp; ASSET ALLOCATION</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Asset Register Integration
            </span>
          </div>

          <div className="mt-4 divide-y divide-border font-mono text-xs">
            {profile.allocatedAssets.map((asset, idx) => (
              <div key={idx} className="flex items-center justify-between py-3">
                <div>
                  <span className="font-sans font-medium text-foreground block">{asset.assetName}</span>
                  <span className="text-[11px] text-muted-foreground">
                    Type: {asset.assetType} • Allocation Basis: {asset.allocationBasis}
                  </span>
                </div>
                <span className="font-bold text-brand">
                  {formatPercentage(asset.allocationPercentage)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strategic Assessment (Non-Monetary 1-5 Scores) */}
      <section>
        <StrategicRadarCard
          assessment={profile.strategicAssessment}
          projectTitle={profile.projectTitle}
        />
      </section>

      {/* Data Lineage & Evidence Base */}
      <section className="border border-border bg-card p-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand" />
            <span className="tiv-meta text-xs">AUDIT SOURCES &amp; DATA LINEAGE</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Traceability: {profile.sourcesCount} Reference(s)
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {profile.sources.map((s, idx) => (
            <div key={idx} className="border border-border bg-background p-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-bold">{s.reference}</span>
                <span className="text-muted-foreground">{s.sourceType} • {s.date}</span>
              </div>
              <p className="mt-1 font-sans text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
