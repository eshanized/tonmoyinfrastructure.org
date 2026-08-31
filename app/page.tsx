import Link from 'next/link';
import { ArrowRight, Github, FileText, Shield, Activity } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { ProjectCard } from '@/components/shared/project-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { TivIcon, getResearchAreaIcon } from '@/components/shared/tiv-icon';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { CountUp } from '@/components/shared/count-up';
import { HeroDiagram } from '@/components/shared/hero-diagram';
import { SystemMap } from '@/components/infrastructure/system-map';
import { InfrastructureMap } from '@/components/infrastructure/infrastructure-map';
import { TechnologyStackDiagram } from '@/components/technology/technology-stack-diagram';
import {
  getFeaturedProjects,
  getWorkCategories,
  getResearchAreas,
  getRepos,
  getNews,
  getInfrastructureServices,
} from '@/lib/content';
import { getFounder } from '@/lib/people';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  path: '/',
  title: 'Tonmoy Infrastructure and Vision — Technology Infrastructure',
  overrideTitle: true,
  description:
    'Tonmoy Infrastructure and Vision builds practical software, internet infrastructure, networking systems, and emerging technologies that people can deploy, operate, and depend on.',
});

const categoryIcons: Record<string, string> = {
  Software: 'code',
  'Internet Infrastructure': 'globe',
  'Network Infrastructure': 'network',
  Research: 'flask',
};

export default function HomePage() {
  const projects = getFeaturedProjects();
  const workCategories = getWorkCategories();
  const researchAreas = getResearchAreas();
  const repos = getRepos();
  const news = getNews().slice(0, 3);
  const infraServices = getInfrastructureServices();
  const founder = getFounder();

  return (
    <>
      {/* 01 — HERO */}
      <section className="relative overflow-hidden border-b border-border tiv-grid">
        <div className="tiv-container relative py-20 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="max-w-2xl">
              <Reveal>
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-brand animate-pulse-dot" />
                  <span className="tiv-meta-brand">Tonmoy Infrastructure and Vision</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-balance font-display text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                  Infrastructure for a more{' '}
                  <span className="text-brand">self-reliant</span> internet.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Tonmoy Infrastructure and Vision builds practical software,
                  internet infrastructure, networking systems, and emerging
                  technologies that people can deploy, operate, and depend on.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/work"
                    className="group inline-flex items-center justify-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    Explore our work
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/research"
                    className="group inline-flex items-center justify-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    Explore research
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Hero infrastructure diagram */}
            <Reveal delay={0.4} className="hidden lg:block">
              <div className="border border-border bg-card/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="tiv-meta">SYSTEM TOPOLOGY</span>
                  <span className="tiv-meta-brand">TIV</span>
                </div>
                <HeroDiagram />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — TIV SYSTEM MAP */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="TIV System Map"
              title="One ecosystem, interconnected."
              description="TIV operates as a single system — software, networks, and research feed into each other. Explore the connections."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <SystemMap />
          </Reveal>
        </div>
      </section>

      {/* 03 — WHAT WE BUILD */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="What We Build"
              title="Four categories of work."
              description="TIV builds and ships practical software infrastructure, operates services, and researches next-generation infrastructure across the full stack."
            />
          </Reveal>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2" stagger={0.08}>
            {workCategories.map((cat) => (
              <StaggerItem key={cat.number}>
                <Link
                  href="/work"
                  className="group relative flex h-full flex-col bg-card p-8 transition-colors hover:bg-card/80"
                >
                  {/* Accent line */}
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" />

                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-5xl font-bold tracking-tight text-muted-foreground/20 transition-colors group-hover:text-brand">
                        {cat.number}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all group-hover:border-brand/40 group-hover:text-brand">
                        <TivIcon name={categoryIcons[cat.title] || 'code'} size={18} />
                      </div>
                    </div>
                    <StatusBadge status={cat.status} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-tight transition-colors group-hover:text-brand">
                    {cat.title}
                  </h3>
                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                    View work
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 04 — FEATURED PROJECTS */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="04"
              label="Shipped Systems"
              title="Software we've built and shipped."
              description="Four stable release systems — each addressing a real infrastructure problem."
              link={{ label: 'All projects', href: '/work' }}
            />
          </Reveal>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2" stagger={0.1}>
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 05 — INFRASTRUCTURE */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="05"
              label="Infrastructure"
              title="From software to physical layer."
              description="TIV's infrastructure spans the full stack — from applications down to optical links."
              link={{ label: 'Explore infrastructure', href: '/infrastructure' }}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <InfrastructureMap />
          </Reveal>

          {/* Infrastructure categories */}
          <StaggerContainer className="mt-8 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-5" stagger={0.06}>
            {infraServices.map((svc) => (
              <StaggerItem key={svc.slug}>
                <Link
                  href={`/infrastructure/${svc.slug === 'optical-systems' ? 'optical' : svc.slug}`}
                  className="group relative flex h-full flex-col bg-card p-5 transition-colors hover:bg-card/80"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <span className="tiv-meta block">{svc.classification}</span>
                  <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                    {svc.title}
                  </h3>
                  <div className="mt-3">
                    <StatusBadge status={svc.status} />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 06 — RESEARCH */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="06"
              label="Research"
              title="Research as a first-class activity."
              description="TIV treats research as fundamental, not peripheral. We publish openly and build from first principles."
              link={{ label: 'Research portal', href: '/research' }}
            />
          </Reveal>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {researchAreas.map((area) => (
              <StaggerItem key={area.slug}>
                <Link
                  href="/research"
                  className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-all group-hover:border-brand/40 group-hover:text-brand">
                      <TivIcon name={getResearchAreaIcon(area.icon)} size={16} />
                    </div>
                    <span className="tiv-meta-brand">{area.title}</span>
                  </div>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 07 — TECHNOLOGY ARCHITECTURE */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="07"
              label="Technology Architecture"
              title="A coherent six-layer stack."
              description="TIV organizes technology into six architectural layers from physical infrastructure to user applications. Each layer builds upon the one below."
              link={{ label: 'Explore architecture', href: '/technology' }}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <div className="border border-border bg-card p-6 md:p-10">
              <TechnologyStackDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 — OPEN SOURCE */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="08"
              label="Open Source"
              title="Built in the open."
              description="TIV's software is open source. We believe infrastructure should be inspectable and ownable."
              link={{ label: 'Open source', href: '/open-source' }}
            />
          </Reveal>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3" stagger={0.08}>
            {repos.map((repo) => (
              <StaggerItem key={repo.slug}>
                <div className="group relative flex h-full flex-col bg-card p-6">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <div className="flex items-start justify-between">
                    <Github className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <StatusBadge status={repo.status} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium transition-colors group-hover:text-brand">
                    {repo.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {repo.description}
                  </p>
                  <dl className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between">
                      <dt className="tiv-meta">Language</dt>
                      <dd className="font-mono text-xs">{repo.language}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="tiv-meta">License</dt>
                      <dd className="font-mono text-xs">{repo.license}</dd>
                    </div>
                  </dl>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 09 — TRANSPARENCY */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <SectionHeader
                  index="09"
                  label="Transparency"
                  title="Building in public."
                  description="TIV publishes what it can without exposing what it shouldn't. Financial reports, governance, and security — all visible."
                  link={{ label: 'Transparency', href: '/transparency' }}
                />
                <div className="mt-8 space-y-4">
                  <Link
                    href="/transparency/financials"
                    className="group flex items-center gap-3 border border-border p-4 transition-colors hover:border-brand/40"
                  >
                    <FileText className="h-5 w-5 text-brand" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Financial Reports</p>
                      <p className="text-xs text-muted-foreground">Annual summaries and statements</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/security"
                    className="group flex items-center gap-3 border border-border p-4 transition-colors hover:border-brand/40"
                  >
                    <Shield className="h-5 w-5 text-brand" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Security</p>
                      <p className="text-xs text-muted-foreground">Disclosure policy and advisories</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Transparency stats with count-up */}
            <Reveal delay={0.15}>
              <div className="border border-border bg-card p-8">
                <div className="flex items-center justify-between">
                  <span className="tiv-meta">FY2026</span>
                  <Activity className="h-4 w-4 text-brand" aria-hidden="true" />
                </div>
                <div className="mt-8 space-y-6">
                  <div>
                    <span className="tiv-meta">FINANCIAL STATUS</span>
                    <p className="mt-1 font-display text-2xl">Management Estimate</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Figures are illustrative and not audited financial statements.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div>
                      <span className="tiv-meta">REVENUE</span>
                      <p className="mt-1 font-display text-xl">
                        <CountUp end={18.4} duration={1.2} prefix="₹" suffix="L" decimals={1} />
                      </p>
                    </div>
                    <div>
                      <span className="tiv-meta">NET PROFIT</span>
                      <p className="mt-1 font-display text-xl text-brand">
                        <CountUp end={2.9} duration={1.2} prefix="₹" suffix="L" decimals={1} />
                      </p>
                    </div>
                    <div>
                      <span className="tiv-meta">ASSETS</span>
                      <p className="mt-1 font-display text-xl">
                        <CountUp end={15.6} duration={1.2} prefix="₹" suffix="L" decimals={1} />
                      </p>
                    </div>
                    <div>
                      <span className="tiv-meta">EQUITY</span>
                      <p className="mt-1 font-display text-xl">
                        <CountUp end={10.7} duration={1.2} prefix="₹" suffix="L" decimals={1} />
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <span className="tiv-meta">REPORTS</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      TIV Annual Report 2026 — Version 1.0. Full financial
                      breakdown available on the financials page.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 — FOUNDER REFERENCE */}
      {founder && (
        <section className="border-b border-border">
          <div className="tiv-container py-16 md:py-24">
            <Reveal>
              <SectionHeader
                index="10"
                label="Leadership"
                title="Founded by Eshan Roy."
                description="TIV is an independent infrastructure and research initiative founded by Eshan Roy (eshanized), focused on long-term engineering depth, open systems, and structural self-reliance."
              />
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <div className="border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="tiv-meta">FOUNDER & LEAD ARCHITECT</span>
                  <p className="mt-2 font-display text-2xl tracking-tight">
                    {founder.name}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                    Founder of {founder.organization}. Architecting decentralized networks, high-throughput email systems, and sovereign compute infrastructure.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium border border-border px-5 py-2.5 hover:border-brand hover:text-brand transition-colors"
                  >
                    About TIV
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about/leadership"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium bg-brand text-brand-foreground px-5 py-2.5 hover:opacity-90 transition-opacity"
                  >
                    Leadership Profile
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 11 — LATEST NEWS */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="11"
              label="Latest"
              title="News and updates."
              link={{ label: 'All news', href: '/news' }}
            />
          </Reveal>
          <StaggerContainer className="mt-12 space-y-px" stagger={0.08}>
            {news.map((article) => (
              <StaggerItem key={article.slug}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group relative flex flex-col gap-2 border border-border bg-card p-6 transition-colors hover:border-brand/40 md:flex-row md:items-center md:justify-between"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {article.date}
                    </span>
                    <span className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="flex-1 font-display text-lg transition-colors group-hover:text-brand md:px-6">
                    {article.title}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </StaggerItem>
            ))}
            {news.length === 0 && (
              <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                No news published yet.
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* 12 — FINAL STATEMENT */}
      <section className="relative overflow-hidden tiv-grid">
        <div className="tiv-container relative py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            <Reveal>
              <span className="tiv-section-marker">12 / FINAL STATEMENT</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-balance font-display text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Build what{' '}
                <span className="text-brand">should</span> exist.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Software, systems, networks, and research for infrastructure that
                can be understood, owned, and built to last.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                >
                  Explore TIV
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
