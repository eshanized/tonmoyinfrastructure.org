import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  Github,
  FileText,
  CheckCircle2,
  Circle,
  Tag,
  Calendar,
  Shield,
  Layers,
  Code2,
  ExternalLink,
  BarChart3,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Markdown } from '@/components/shared/markdown';
import { Callout } from '@/components/shared/callout';
import { TivIcon, getProjectTypeIcon } from '@/components/shared/tiv-icon';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import {
  SourceBadge,
  ArtifactClassificationBadge,
  AffiliationBadge,
  PlatformIcon,
} from '@/components/shared/source-badge';
import { getProjects } from '@/lib/content';
import { getReleasesForProject } from '@/lib/institutional';
import type { Project, Release, ReleaseNote } from '@/lib/types';

interface ProjectDetailViewProps {
  project: Project;
  basePath?: 'projects' | 'products' | 'work';
}

export function ProjectDetailView({
  project,
  basePath = 'projects',
}: ProjectDetailViewProps) {
  const allProjects = getProjects();
  const related = allProjects.filter((p) => p.slug !== project.slug);
  const releases = getReleasesForProject(project.slug);

  const parentLabel =
    basePath === 'products'
      ? 'Products'
      : basePath === 'work'
      ? 'Work'
      : 'Projects';
  const parentHref = `/${basePath}`;
  const isStable = project.status === 'Stable Release';

  return (
    <>
      {/* 01 — HERO */}
      <PageHeader
        index={project.category.toUpperCase()}
        label={project.artifactType || project.type}
        title={project.title}
        description={project.description}
        meta={[
          { label: 'STATUS', value: project.status },
          { label: 'STAGE', value: project.developmentStage.toUpperCase() },
          { label: 'VERSION', value: project.version || '1.0.0' },
          { label: 'LICENSE', value: project.license || 'Open Source' },
        ]}
      />

      {/* Breadcrumbs & Quick Links */}
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: parentLabel, href: parentHref },
              { label: project.title },
            ]}
          />

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.sources && project.sources.length > 0 ? (
                project.sources.map((src, idx) => (
                  <SourceBadge key={idx} source={src} />
                ))
              ) : project.repository ? (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
                >
                  <Github className="h-4 w-4" />
                  Repository
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
                  <Github className="h-4 w-4" />
                  Repository — Release Distribution
                </span>
              )}

              {project.documentation &&
                (project.documentation.startsWith('http') ? (
                  <a
                    href={project.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
                  >
                    <FileText className="h-4 w-4" />
                    Documentation
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </a>
                ) : (
                  <Link
                    href={project.documentation}
                    className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
                  >
                    <FileText className="h-4 w-4" />
                    Documentation
                  </Link>
                ))}

              <Link
                href="#releases"
                className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
              >
                <Tag className="h-4 w-4" />
                {isStable ? 'Release Notes' : 'Checkpoints / Milestones'}
              </Link>

              <Link
                href={`/projects/${project.slug}/economics`}
                className="inline-flex items-center gap-2 border border-brand/40 bg-brand/5 px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/10"
              >
                <BarChart3 className="h-4 w-4" />
                Portfolio Economics
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — STATUS & LIFECYCLE AUDIT (Section 3, 4, 12, 15) */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-12">
          {project.checkpointsNote && (
            <div className="mb-6 border-l-4 border-amber-500 bg-amber-500/10 p-5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Shield className="h-4 w-4" />
                Experimental Research Notice
              </div>
              <p className="mt-1 text-sm text-foreground/90">
                {project.checkpointsNote}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            <div className="bg-card p-5">
              <span className="tiv-meta">LIFECYCLE STATUS</span>
              <p
                className={`mt-2 font-display text-lg font-semibold ${
                  isStable
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {project.status}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {isStable ? 'Shipped & deployed software' : 'Experimental research artifact'}
              </p>
            </div>
            <div className="bg-card p-5">
              <span className="tiv-meta">DEVELOPMENT STAGE</span>
              <p className="mt-2 font-display text-lg font-semibold text-foreground">
                {project.developmentStage.toUpperCase()}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {isStable ? 'Ongoing enhancements' : 'Active research & evaluation'}
              </p>
            </div>
            <div className="bg-card p-5">
              <span className="tiv-meta">CLASSIFICATION</span>
              <p className="mt-2 font-display text-base font-semibold text-brand">
                {project.artifactType || 'Software System'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {project.parameterCount || `v${project.version || '1.0.0'}`}
              </p>
            </div>
            <div className="bg-card p-5">
              <span className="tiv-meta">AFFILIATION & LICENSE</span>
              <p className="mt-2 font-mono text-base font-semibold text-foreground">
                {project.affiliation || 'TIV'} · {project.license || 'Open Source'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {project.organization || 'Tonmoy Infrastructure & Vision'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — MAIN CONTENT & ARCHITECTURE */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            {/* Left: Detailed sections */}
            <div className="min-w-0 space-y-16">
              {/* Overview */}
              <Reveal>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-border text-brand">
                      <TivIcon
                        name={getProjectTypeIcon(project.type)}
                        size={20}
                      />
                    </div>
                    <span className="tiv-meta-brand">OVERVIEW</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl md:text-3xl">
                    About {project.title}
                  </h2>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.description}
                  </p>
                </div>
              </Reveal>

              {/* Problem */}
              {project.problem && (
                <Reveal delay={0.05}>
                  <div className="border-l-2 border-brand pl-6">
                    <span className="tiv-meta-brand">THE PROBLEM</span>
                    <h3 className="mt-2 font-display text-xl md:text-2xl">
                      Why this system exists
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.problem}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* Approach */}
              {project.approach && (
                <Reveal delay={0.1}>
                  <div className="border-l-2 border-border pl-6">
                    <span className="tiv-meta">OUR APPROACH</span>
                    <h3 className="mt-2 font-display text-xl md:text-2xl">
                      Engineering philosophy & approach
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.approach}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* Architecture */}
              {project.architecture && (
                <Reveal delay={0.15}>
                  <div className="border border-border bg-card p-8">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-brand" />
                      <span className="tiv-meta-brand">ARCHITECTURE</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl md:text-2xl">
                      System architecture
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.architecture}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <Reveal delay={0.2}>
                  <div>
                    <span className="tiv-meta-brand">CAPABILITIES</span>
                    <h3 className="mt-2 font-display text-xl md:text-2xl">
                      Core system capabilities
                    </h3>
                    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {project.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 border border-border bg-card p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          <span className="text-sm leading-relaxed text-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Model Architecture & Parameters Specification if AI Model */}
              {(project.modelArchitecture || project.intendedUse) && (
                <Reveal delay={0.18}>
                  <div className="border border-border bg-card p-8 space-y-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-purple-500" />
                        <span className="tiv-meta-brand">AI MODEL ARCHITECTURE & VERIFIED PARAMETERS</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl md:text-2xl">
                        Technical Model Specification
                      </h3>
                    </div>

                    {project.modelArchitecture && (
                      <div className="border border-border bg-background p-4">
                        <span className="tiv-meta block mb-1">Architecture Summary</span>
                        <p className="font-mono text-xs leading-relaxed text-foreground">
                          {project.modelArchitecture}
                        </p>
                      </div>
                    )}

                    {project.intendedUse && project.intendedUse.length > 0 && (
                      <div>
                        <span className="tiv-meta block mb-2">Verified Intended Use Cases</span>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {project.intendedUse.map((use, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground border border-border p-2.5 bg-background">
                              <span className="text-brand font-mono">✓</span>
                              <span>{use}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              )}

              {/* Technical Markdown specification */}
              {project.content && (
                <Reveal delay={0.25}>
                  <div className="border-t border-border pt-12">
                    <span className="tiv-meta mb-6 block">TECHNICAL SPECIFICATION</span>
                    <Markdown content={project.content} />
                  </div>
                </Reveal>
              )}

              {/* Roadmap */}
              {project.roadmap && project.roadmap.length > 0 && (
                <Reveal delay={0.3}>
                  <div className="border border-border bg-card p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="tiv-meta-brand">ROADMAP & MILESTONES</span>
                        <h3 className="mt-1 font-display text-xl">
                          Milestones & active developments
                        </h3>
                      </div>
                      <span className="tiv-meta">
                        {project.roadmap.filter((r) => r.done).length} /{' '}
                        {project.roadmap.length} COMPLETED
                      </span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {project.roadmap.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 border-b border-border/50 pb-3 last:border-b-0"
                        >
                          {step.done ? (
                            <CheckCircle2 className="h-4 w-4 text-brand" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground/40" />
                          )}
                          <span
                            className={`text-sm ${
                              step.done
                                ? 'font-medium text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {step.item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Releases Section */}
              <div id="releases">
                <Reveal delay={0.35}>
                  <div>
                    <span className="tiv-meta-brand">
                      {isStable ? 'RELEASES' : 'CHECKPOINTS & HISTORY'}
                    </span>
                    <h3 className="mt-2 font-display text-xl md:text-2xl">
                      {isStable ? 'Release history' : 'Checkpoint lineage & milestones'}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {isStable
                        ? `Published stable releases and updates for ${project.title}.`
                        : `Step-wise checkpoints and lineage updates for ${project.title}.`}
                    </p>

                    {releases.length > 0 ? (
                      <div className="mt-6 space-y-4">
                        {releases.map((rel) => (
                          <div
                            key={rel.slug}
                            className="border border-border bg-card p-6"
                          >
                            <div className="flex items-baseline justify-between">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-base font-semibold text-brand">
                                  v{rel.version}
                                </span>
                                <StatusBadge status={rel.status} />
                              </div>
                              <span className="font-mono text-xs text-muted-foreground">
                                {rel.date}
                              </span>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">
                              {rel.summary}
                            </p>
                            {rel.notes && rel.notes.length > 0 && (
                              <div className="mt-4 space-y-3 border-t border-border pt-4">
                                {rel.notes.map((note, idx) => (
                                  <div key={idx}>
                                    <span className="tiv-meta">{note.type}</span>
                                    <ul className="mt-2 space-y-1">
                                      {note.items.map((item, i) => (
                                        <li
                                          key={i}
                                          className="text-xs text-muted-foreground"
                                        >
                                          — {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-6 border border-border bg-card p-6">
                        <p className="font-mono text-sm text-brand">
                          {isStable
                            ? `v${project.version || '1.0.0'} — Initial Stable Release`
                            : `${project.version || 'Experimental Checkpoint'} — Verified Milestone`}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {isStable
                            ? 'Shipped and deployed as stable release software.'
                            : 'Experimental checkpoints verified against public repositories.'}
                        </p>
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>

              {/* Related Research */}
              {project.relatedResearch && project.relatedResearch.length > 0 && (
                <Reveal delay={0.4}>
                  <div className="border border-border bg-secondary/30 p-6">
                    <span className="tiv-meta-brand">RELATED RESEARCH</span>
                    <h3 className="mt-1 font-display text-lg">
                      Associated research publications
                    </h3>
                    <div className="mt-4 space-y-2">
                      {project.relatedResearch.map((resSlug) => (
                        <Link
                          key={resSlug}
                          href={`/research/publications/${resSlug}`}
                          className="group flex items-center justify-between border border-border bg-card p-4 transition-colors hover:border-brand/40"
                        >
                          <span className="text-sm font-medium group-hover:text-brand">
                            {resSlug.replace(/-/g, ' ').toUpperCase()}
                          </span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right: Sticky Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              <div className="border border-border bg-card p-6">
                <span className="tiv-meta mb-4 block">System & Provenance Details</span>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="tiv-meta mb-1">Lifecycle Status</dt>
                    <dd>
                      <StatusBadge status={project.status} />
                    </dd>
                  </div>
                  <div>
                    <dt className="tiv-meta mb-1">Development Stage</dt>
                    <dd className="font-mono text-xs text-foreground">
                      {project.developmentStage.toUpperCase()}
                    </dd>
                  </div>
                  {project.artifactType && (
                    <div>
                      <dt className="tiv-meta mb-1">Artifact Classification</dt>
                      <dd>
                        <ArtifactClassificationBadge classification={project.artifactType} />
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="tiv-meta mb-1">Version / Tag</dt>
                    <dd className="font-mono text-xs text-brand">
                      {project.version || '1.0.0'}
                    </dd>
                  </div>
                  {project.parameterCount && (
                    <div>
                      <dt className="tiv-meta mb-1">Parameters</dt>
                      <dd className="font-mono text-xs text-foreground font-semibold">
                        {project.parameterCount}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="tiv-meta mb-1">Category</dt>
                    <dd className="font-mono text-xs">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="tiv-meta mb-1">License</dt>
                    <dd className="font-mono text-xs">
                      {project.license || 'Open Source'}
                    </dd>
                  </div>

                  {/* Ownership & Affiliation */}
                  <div className="border-t border-border pt-3">
                    <dt className="tiv-meta mb-1">Affiliation & Organization</dt>
                    <dd className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <AffiliationBadge affiliation={project.affiliation || 'TIV'} />
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {project.organization || 'Tonmoy Infrastructure & Vision'}
                      </p>
                      {(project.owner || project.author) && (
                        <p className="font-mono text-xs text-muted-foreground/70">
                          Maintainer: @{project.owner || project.author}
                        </p>
                      )}
                    </dd>
                  </div>

                  {/* Public Sources */}
                  {project.sources && project.sources.length > 0 && (
                    <div className="border-t border-border pt-3">
                      <dt className="tiv-meta mb-2">Authoritative Sources</dt>
                      <dd className="flex flex-col gap-2">
                        {project.sources.map((src, idx) => (
                          <SourceBadge key={idx} source={src} />
                        ))}
                      </dd>
                    </div>
                  )}

                  {project.technology && project.technology.length > 0 && (
                    <div className="border-t border-border pt-3">
                      <dt className="tiv-meta mb-2">Technology Stack</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {project.technology.map((tech) => (
                          <span
                            key={tech}
                            className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {project.updatedAt && (
                    <div>
                      <dt className="tiv-meta mb-1">Last Updated</dt>
                      <dd className="font-mono text-xs text-muted-foreground">
                        {project.updatedAt}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Related Projects */}
              {related.length > 0 && (
                <div className="border border-border bg-card p-6">
                  <span className="tiv-meta mb-4 block">
                    {isStable ? 'Other Stable Systems' : 'Related Projects'}
                  </span>
                  <ul className="space-y-3">
                    {related.slice(0, 5).map((rel) => (
                      <li key={rel.slug}>
                        <Link
                          href={`/${basePath}/${rel.slug}`}
                          className="group flex items-center justify-between text-sm transition-colors hover:text-brand"
                        >
                          <span>{rel.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Navigation footer */}
      <section>
        <div className="tiv-container py-12">
          <div className="flex items-center justify-between">
            <Link
              href={parentHref}
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All {parentLabel}
            </Link>
            {related[0] && (
              <Link
                href={`/${basePath}/${related[0].slug}`}
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                Next: {related[0].title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
