import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjects, getProject } from '@/lib/content';
import { calculateProjectEconomicProfile } from '@/lib/portfolio-economics/calculations';
import { getDefaultFinancialPeriod } from '@/lib/portfolio-economics/periods';
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
    description: `Economic profile, investment tracking, operating costs, and engineering hours attributable to ${project.title}.`,
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
              <strong>{profile.projectTitle}</strong> is an emerging platform under active development.
              Authentic historical financial transactions (cash development expenditure, direct operating expenses, and engineering timesheets) are currently <strong>Not Tracked</strong> in TIV&apos;s FY2026 historical accounting ledger.
              In strict accordance with TIV financial integrity standards, no fictional historical costs or simulated revenue figures have been fabricated.
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
