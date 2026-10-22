import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjects, getProject } from '@/lib/content';
import { calculateProjectEconomicProfile } from '@/lib/portfolio-economics/calculations';
import { getDefaultFinancialPeriod, getFinancialPeriods } from '@/lib/portfolio-economics/periods';
import { StatusBadge } from '@/components/shared/status-badge';
import { ConfidenceBadge } from '@/components/portfolio-economics/confidence-badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { ProjectEconomicsInteractive } from '@/components/portfolio-economics/project-economics-interactive';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return generatePageMetadata({
    title: `${project.title} — Portfolio Economics`,
    description: `Public portfolio economics for ${project.title}: source-backed development investment, operating-cost and revenue attribution, engineering effort, and qualitative strategic assessment. Unrecorded actuals remain Not Tracked; no speculative monetary valuation is published.`,
    path: `/projects/${project.slug}/economics`,
    overrideTitle: true,
  });
}

export default async function ProjectEconomicsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Preserve the latest published financial snapshot when a project has historical evidence.
  // For active projects with no entries in that snapshot, use the open period containing
  // today's date so a newly launched venture is not presented as if it existed in FY2026.
  const publishedPeriod = getDefaultFinancialPeriod();
  const publishedProfile = calculateProjectEconomicProfile(project.slug, publishedPeriod.id);
  const hasPublishedLedgerEvidence = Boolean(
    publishedProfile &&
      (publishedProfile.developmentInvestmentCash !== null ||
        publishedProfile.developmentInvestmentEconomic !== null ||
        publishedProfile.totalOperatingCosts !== null ||
        publishedProfile.attributedRevenue !== null ||
        publishedProfile.totalEngineeringHours !== null ||
        publishedProfile.sourcesCount > 0)
  );
  const today = new Date().toISOString().slice(0, 10);
  const activePeriod = getFinancialPeriods().find(
    (period) =>
      period.status === 'Open' &&
      period.startDate <= today &&
      period.endDate >= today
  );
  const selectedPeriod =
    !hasPublishedLedgerEvidence && project.developmentStage === 'active' && activePeriod
      ? activePeriod
      : publishedPeriod;
  const profile = calculateProjectEconomicProfile(project.slug, selectedPeriod.id);
  if (!profile) notFound();

  const pageGraph = generatePageGraph({
    pagePath: `/projects/${project.slug}/economics`,
    pageTitle: `${project.title} Portfolio Economics — Tonmoy Infrastructure and Vision`,
    pageDescription: `Resource measurement, financial record status, cost and revenue attribution, engineering effort, and qualitative strategic assessment for ${project.title}. Unrecorded actuals remain Not Tracked.`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${project.slug}` },
      { name: 'Economics', path: `/projects/${project.slug}/economics` },
    ],
  });

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
        {/* Unverified / Emerging Venture Notice */}
        {profile.overallConfidence === 'Unverified' && (
          <div className="border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              Active Venture In Development — Unrecorded Historical Actuals
            </div>
            <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
              <strong>{profile.projectTitle}</strong> is an active initiative with incomplete project-level financial records for <strong>{profile.fiscalYear}</strong>.
              The public ledger currently has no verified values for cash or economic development investment, direct or allocated operating costs, attributed revenue, or logged engineering hours for this selected period.
              These fields remain <strong>Not Tracked</strong>; missing records must not be interpreted as zero expenditure or zero revenue. No fictional financial values have been added.
            </p>
            {project.slug === 'runstead' && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects/runstead#financial-model"
                  className="inline-flex items-center gap-1.5 border border-brand bg-brand px-3.5 py-1.5 text-xs font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
                >
                  View Illustrative Financial Model
                  <TrendingUp className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/projects/runstead#investment-thesis"
                  className="inline-flex items-center gap-1.5 border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Read Investment Thesis
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Multi-Currency Interactive Project Economics Engine */}
        <ProjectEconomicsInteractive
          initialProfile={profile}
          projectSlug={project.slug}
        />
      </main>
    </div>
  );
}
