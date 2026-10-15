import Link from 'next/link';
import { ArrowRight, Github, FileText, Shield, Activity, Building, Mail, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { ProjectCard } from '@/components/shared/project-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { TivIcon, getResearchAreaIcon } from '@/components/shared/tiv-icon';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { CountUp } from '@/components/shared/count-up';
import { HeroDiagram } from '@/components/shared/hero-diagram';
import { SystemMap } from '@/components/infrastructure/system-map';
import { InfrastructureMap } from '@/components/infrastructure/infrastructure-map';
import {
  getFeaturedProjects,
  getResearchAreas,
  getRepos,
  getNews,
  getInfrastructureServices,
} from '@/lib/content';
import { getFounder } from '@/lib/people';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  path: '/',
  title: 'Enterprise Infrastructure & Systems Engineering — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'Tonmoy Infrastructure and Vision (TIV) engineers sovereign software platforms, verifiable developer runtimes, and distributed infrastructure architecture. Explore stable releases including OpenMail, Mercura, M31A, and Octate.',
});

export default function HomePage() {
  const projects = getFeaturedProjects();
  const researchAreas = getResearchAreas();
  const repos = getRepos();
  const news = getNews().slice(0, 3);
  const infraServices = getInfrastructureServices();
  const founder = getFounder();

  return (
    <>
      {/* 01 — HERO / COMPANY PROPOSITION */}
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
                  Tonmoy Infrastructure and Vision (TIV) builds practical software systems,
                  sovereign mail infrastructure, and high-assurance developer runtimes.
                  Engineered for operators, developers, and organizations who prioritize
                  data ownership, deterministic execution, and verifiable systems.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="group inline-flex items-center justify-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    Explore products
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/infrastructure"
                    className="group inline-flex items-center justify-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    Infrastructure systems
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    Business inquiries
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
                  <div>
                    <span className="tiv-meta">SHIPPED SOFTWARE</span>
                    <p className="mt-1 font-display text-base font-semibold text-foreground">4 Stable Platforms</p>
                    <p className="text-xs text-muted-foreground">OpenMail, Mercura, M31A, Octate</p>
                  </div>
                  <div>
                    <span className="tiv-meta">SYSTEM DESIGN</span>
                    <p className="mt-1 font-display text-base font-semibold text-foreground">Self-Reliant</p>
                    <p className="text-xs text-muted-foreground">Local-first, vendor free</p>
                  </div>
                  <div>
                    <span className="tiv-meta">OPEN RESEARCH</span>
                    <p className="mt-1 font-display text-base font-semibold text-foreground">M31 AI Models</p>
                    <p className="text-xs text-muted-foreground">Causal models & papers</p>
                  </div>
                  <div>
                    <span className="tiv-meta">GOVERNANCE</span>
                    <p className="mt-1 font-display text-base font-semibold text-foreground">Transparency</p>
                    <p className="text-xs text-muted-foreground">Public financial records</p>
                  </div>
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

      {/* 02 — SHIPPED PRODUCTS (SOFTWARE) */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Shipped Software"
              title="Software we've built and shipped."
              description="Four stable release platforms — engineered for self-hosting, developer autonomy, and operational sovereignty."
              link={{ label: 'All projects', href: '/projects' }}
            />
          </Reveal>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2" stagger={0.1}>
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Ventures in Development Highlight */}
          <Reveal delay={0.2} className="mt-8">
            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="tiv-meta text-amber-400">VENTURE IN DEVELOPMENT</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl tracking-tight">
                    Runstead — Modern Hosting-Business Operating System
                  </h3>
                  <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">
                    Next-generation hosting-business automation and client-organization platform engineered with multi-tenant PostgreSQL Row-Level Security (RLS). Currently in active pre-release development and interactive demonstration.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    href="/projects/runstead"
                    className="inline-flex items-center gap-1.5 border border-brand bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
                  >
                    View Venture Profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/projects/runstead#financial-model"
                    className="inline-flex items-center gap-1.5 border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Financial Model
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — INFRASTRUCTURE & SOVEREIGN FACILITY */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Infrastructure & Facilities"
              title="From Jayapura to the optical layer."
              description="TIV operates an authentic physical facility in Jayapura for sovereign internal systems, offering enterprise hosting capacity via private inquiry alongside active optical network research."
              link={{ label: 'Explore infrastructure', href: '/infrastructure' }}
            />
          </Reveal>

          {/* Sovereign Facility Ground Truth Callout */}
          <Reveal delay={0.05} className="mt-8">
            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-brand" />
                    <span className="tiv-meta text-brand">CONFIRMED OPERATIONAL FACILITY</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl tracking-tight">
                    Jayapura Sovereign Data Center — Papua, Indonesia
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Operational (Internal)
                  </span>
                  <Link
                    href="/contact"
                    className="border border-border px-3 py-1 font-mono text-xs hover:border-brand hover:text-brand transition-colors"
                  >
                    Inquire for Capacity
                  </Link>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
                <div>
                  <span className="tiv-meta">FACILITY SCOPE</span>
                  <p className="mt-1 font-medium text-foreground">Internal Systems & Private Inquiry</p>
                </div>
                <div>
                  <span className="tiv-meta">POWER ARCHITECTURE</span>
                  <p className="mt-1 font-medium text-foreground">2N Redundant Feeds</p>
                </div>
                <div>
                  <span className="tiv-meta">STORAGE POOL</span>
                  <p className="mt-1 font-medium text-foreground">120 TB Verified Pool</p>
                </div>
                <div>
                  <span className="tiv-meta">COLOCATION POLICY</span>
                  <p className="mt-1 font-medium text-foreground">No Public Self-Service</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <InfrastructureMap />
          </Reveal>

          {/* Infrastructure services overview */}
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

      {/* 04 — ENGINEERING EVIDENCE & SYSTEM TOPOLOGY */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="04"
              label="System Architecture"
              title="One unified engineering ecosystem."
              description="TIV operates as an integrated system — applications, runtime gates, network protocols, and hardware custody interact across deterministic boundaries."
              link={{ label: 'Explore architecture', href: '/technology' }}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <SystemMap />
          </Reveal>
        </div>
      </section>

      {/* 05 — OPEN RESEARCH & OPEN SOURCE */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="05"
              label="Research & Open Source"
              title="Research from first principles, built in the open."
              description="TIV conducts empirical systems research across optical networking, autonomous engineering runtimes, and causal AI models, distributing software under transparent copyleft and permissive licenses."
              link={{ label: 'Research portal', href: '/research' }}
            />
          </Reveal>

          {/* Research Areas */}
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

          {/* Repositories */}
          <div className="mt-12">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="tiv-meta">OPEN-SOURCE CODEBASES</span>
              <Link href="/open-source" className="text-xs font-mono text-brand hover:underline">
                View all repositories &rarr;
              </Link>
            </div>
            <StaggerContainer className="mt-6 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3" stagger={0.08}>
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
        </div>
      </section>

      {/* 06 — FINANCIAL TRANSPARENCY & GOVERNANCE */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <SectionHeader
                  index="06"
                  label="Transparency & Governance"
                  title="Building in public with structural accountability."
                  description="TIV publishes what it can without exposing what it shouldn't. Financial estimates, asset registers, governance structures, and security commitments remain fully visible."
                  link={{ label: 'Transparency portal', href: '/transparency' }}
                />
                <div className="mt-8 space-y-4">
                  <Link
                    href="/transparency/financials"
                    className="group flex items-center gap-3 border border-border p-4 transition-colors hover:border-brand/40"
                  >
                    <FileText className="h-5 w-5 text-brand" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Financial Disclosures</p>
                      <p className="text-xs text-muted-foreground">Annual reports, balance sheets, and capital reconciliation</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/security"
                    className="group flex items-center gap-3 border border-border p-4 transition-colors hover:border-brand/40"
                  >
                    <Shield className="h-5 w-5 text-brand" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Security & Vulnerability Disclosure</p>
                      <p className="text-xs text-muted-foreground">PGP key, reporting channels, and security advisory policy</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/governance"
                    className="group flex items-center gap-3 border border-border p-4 transition-colors hover:border-brand/40"
                  >
                    <Building className="h-5 w-5 text-brand" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Corporate Governance</p>
                      <p className="text-xs text-muted-foreground">Institutional bylaws, oversight, and operational independence</p>
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
                  <span className="tiv-meta">FY2026 CAPITAL DISCLOSURE</span>
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

      {/* 07 — LEADERSHIP */}
      {founder && (
        <section className="border-b border-border">
          <div className="tiv-container py-16 md:py-24">
            <Reveal>
              <SectionHeader
                index="07"
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

      {/* 08 — DEVELOPER EVENT (TIV I/O) */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="08"
              label="Developer Event"
              title="Tonmoy Infrastructure and Vision I/O."
              description="A company-led technology and developer conference presenting TIV's engineering work across software systems, internet infrastructure, networking, and research."
              link={{ label: 'Explore TIV I/O', href: '/io' }}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <div className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-[1.4fr_1fr]">
              <div className="bg-card p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-3xl font-bold tracking-tight text-brand">
                    TIV I/O
                  </span>
                  <span className="border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                    TECHNOLOGY & DEVELOPER CONFERENCE
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-tight">
                  Engineering depth, open architecture, and system demonstrations.
                </h3>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                  Tonmoy Infrastructure and Vision I/O (TIV I/O) is designed to present verified
                  technical milestones, architectural decisions, and live system demonstrations
                  across developer tools, autonomous software runtimes, network infrastructure, and
                  open research.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
                  <div>
                    <span className="tiv-meta">COVERAGE</span>
                    <p className="mt-1 font-medium text-foreground">Software, Networks & AI</p>
                  </div>
                  <div>
                    <span className="tiv-meta">ORGANIZER</span>
                    <p className="mt-1 font-medium text-foreground">Tonmoy Infrastructure & Vision</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/io"
                    className="group inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    Explore TIV I/O
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    Event inquiries
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-card p-8 md:p-10">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="tiv-meta">EVENT STATUS</span>
                    <span className="inline-flex items-center gap-1.5 border border-brand/30 bg-brand/10 px-2.5 py-0.5 font-mono text-xs text-brand">
                      In Planning
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="border-b border-border pb-3">
                      <span className="tiv-meta">DATES & SCHEDULE</span>
                      <p className="mt-1 font-display text-lg text-foreground">To be announced</p>
                    </div>
                    <div className="border-b border-border pb-3">
                      <span className="tiv-meta">LOCATION & VENUE</span>
                      <p className="mt-1 font-display text-lg text-foreground">To be announced</p>
                    </div>
                    <div>
                      <span className="tiv-meta">REGISTRATION & ATTENDANCE</span>
                      <p className="mt-1 font-display text-lg text-foreground">To be announced</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
                  Event dates, program agenda, and registration details will be published once
                  finalized. Follow official updates via TIV News.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 09 — LATEST DISPATCHES */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="09"
              label="Latest Dispatches"
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

      {/* 10 — BUSINESS CONVERSION & FINAL STATEMENT */}
      <section className="relative overflow-hidden tiv-grid bg-secondary/30">
        <div className="tiv-container relative py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            <Reveal>
              <span className="tiv-section-marker">10 / BUSINESS CONVERSION & DIRECTION</span>
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
                can be understood, owned, and built to last. Partner with us for
                dedicated compute deployments, research initiatives, or enterprise integrations.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                >
                  Initiate institutional inquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
                >
                  Explore organization
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/security"
                  className="group inline-flex items-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
                >
                  Security reporting
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
