import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjects, getProject } from '@/lib/content';
import { calculateProjectEconomicProfile } from '@/lib/portfolio-economics/calculations';
import { getDefaultFinancialPeriod } from '@/lib/portfolio-economics/periods';
import { formatCurrency, formatHours, formatPercentage } from '@/lib/portfolio-economics/decimal';
import { StatusBadge } from '@/components/shared/status-badge';
import { ConfidenceBadge } from '@/components/portfolio-economics/confidence-badge';
import { StrategicRadarCard } from '@/components/portfolio-economics/strategic-radar-card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  DollarSign,
  Server,
  Clock,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  FileText,
  Building,
} from 'lucide-react';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  return generatePageMetadata({
    title: `${project.title} — Portfolio Economics`,
    description: `Economic profile, investment tracking, operating costs, and engineering hours attributable to ${project.title}.`,
    path: `/projects/${project.slug}/economics`,
    overrideTitle: true,
  });
}

export default function ProjectEconomicsPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const defaultPeriod = getDefaultFinancialPeriod();
  const profile = calculateProjectEconomicProfile(project.slug, defaultPeriod.id);
  if (!profile) notFound();

  const pageGraph = generatePageGraph({
    pagePath: `/projects/${project.slug}/economics`,
    pageTitle: `${project.title} Portfolio Economics — Tonmoy Infrastructure and Vision`,
    pageDescription: `Resource measurement and economic analytics for ${project.title}.`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${project.slug}` },
      { name: 'Economics', path: `/projects/${project.slug}/economics` },
    ],
  });

  const currency = profile.currency;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={pageGraph} />

      {/* Header */}
      <div className="border-b border-border bg-gradient-to-b from-card/60 via-card/20 to-transparent">
        <div className="tiv-container py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: project.title, href: `/projects/${project.slug}` },
              { label: 'Portfolio Economics' },
            ]}
          />

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="tiv-meta text-brand font-semibold tracking-wider">
                  PROJECT ECONOMIC PROFILE
                </span>
                <span className="text-border">•</span>
                <StatusBadge status={profile.projectStatus} />
                <span className="text-border">•</span>
                <ConfidenceBadge confidence={profile.overallConfidence} />
              </div>

              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                {profile.projectTitle} Economics.
              </h1>

              <p className="mt-2 text-sm text-muted-foreground font-mono">
                Period: {profile.fiscalYear} • Category: {profile.projectCategory} • Stage: {profile.developmentStage}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-2 text-xs font-mono text-foreground hover:border-brand hover:text-brand"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Project Overview
              </Link>
              <Link
                href="/transparency/financials/portfolio-economics"
                className="inline-flex items-center gap-1.5 border border-brand bg-brand px-3 py-2 text-xs font-mono text-white hover:bg-brand/90"
              >
                Portfolio Matrix
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="tiv-container py-12 space-y-10">
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
          </div>

          <div className="border border-border bg-card p-5">
            <span className="tiv-meta text-[11px]">TOTAL OPERATING COSTS</span>
            <p className="mt-2 font-display text-2xl font-semibold text-foreground">
              {formatCurrency(profile.totalOperatingCosts, currency, 'Not Tracked')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct (₹{(profile.directOperatingCosts || 0).toLocaleString('en-IN')}) + Shared (₹{(profile.allocatedSharedCosts || 0).toLocaleString('en-IN')})
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <span className="tiv-meta text-[11px]">DEVELOPMENT INVESTMENT</span>
            <p className="mt-2 font-display text-2xl font-semibold text-foreground">
              {formatCurrency(profile.totalDevelopmentInvestment, currency, 'Not Tracked')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Cash: ₹{(profile.developmentInvestmentCash || 0).toLocaleString('en-IN')} • Economic: ₹{(profile.developmentInvestmentEconomic || 0).toLocaleString('en-IN')}
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <span className="tiv-meta text-[11px]">LOGGED ENGINEERING EFFORT</span>
            <p className="mt-2 font-display text-2xl font-semibold text-foreground">
              {formatHours(profile.totalEngineeringHours, 'Not Tracked')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {profile.effectiveCostPerHour ? `Effective ₹${profile.effectiveCostPerHour}/hr` : 'Verified timesheet entries'}
            </p>
          </div>
        </section>

        {/* Detailed Breakdown: Revenue & Operating Costs */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Attribution */}
          <div className="border border-border bg-card p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-brand" />
                <span className="tiv-meta text-xs">REVENUE ATTRIBUTION</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Attribution Standard: Direct Causality
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
                <span className="tiv-meta text-xs">OPERATING COSTS</span>
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
                {profile.effectiveCostPerHour ? `₹${profile.effectiveCostPerHour}/h` : '—'}
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
      </main>
    </div>
  );
}
