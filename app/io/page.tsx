import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Terminal,
  Cpu,
  Globe,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  FileText,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata = generatePageMetadata({
  path: '/io',
  title: 'TIV I/O — Tonmoy Infrastructure and Vision I/O',
  overrideTitle: true,
  description:
    'Tonmoy Infrastructure and Vision I/O (TIV I/O) is an independent technology and developer event bringing together software systems, internet infrastructure, networking, and research.',
  ogImage: `${siteConfig.url}/IO.webp`,
  keywords: [
    'TIV I/O',
    'Tonmoy Infrastructure and Vision I/O',
    'developer event',
    'technology conference',
    'software infrastructure',
    'networking systems',
    'systems architecture',
    'autonomous engineering',
    'open research',
  ],
});

interface TopicCategory {
  title: string;
  meta: string;
  icon: typeof Terminal;
  description: string;
  items: { name: string; href: string; tag: string }[];
}

const coverageCategories: TopicCategory[] = [
  {
    title: 'Software and Developer Tools',
    meta: '01 / SOFTWARE',
    icon: Terminal,
    description:
      'Practical self-hostable platforms, terminal-native intelligence, and high-assurance autonomous software engineering runtimes built for data ownership and local execution.',
    items: [
      { name: 'OpenMail — Self-Hosted Email Engine', href: '/projects/openmail', tag: 'Stable v1.0' },
      { name: 'Mercura — Distributed Version Control Hosting', href: '/projects/mercura', tag: 'Stable v1.0' },
      { name: 'M31A — Autonomous Software Engineering Runtime', href: '/projects/m31a', tag: 'Stable v0.1.1' },
      { name: 'Octate — Terminal-Native AI Code Review CLI', href: '/projects/octate', tag: 'Stable v1.0.0' },
    ],
  },
  {
    title: 'Internet and Network Infrastructure',
    meta: '02 / NETWORKS',
    icon: Globe,
    description:
      'Low-latency transport protocols, sovereign data center nodes, bare-metal hosting architecture, and physical-layer optical communications.',
    items: [
      { name: 'Infrastructure Architecture Overview', href: '/infrastructure', tag: 'Overview' },
      { name: 'Low-Latency Networking & Routing', href: '/infrastructure/networking', tag: 'Research' },
      { name: 'Bare-Metal & Private Hosting', href: '/infrastructure/hosting', tag: 'Planning' },
      { name: 'Optical Transmission Systems', href: '/infrastructure/optical', tag: 'Research' },
    ],
  },
  {
    title: 'Systems Engineering and Architecture',
    meta: '03 / SYSTEMS',
    icon: Layers,
    description:
      'Rigorous downward-dependency layered models, non-bypassable policy gates, OS-level sandbox confinement, deterministic verification engines, and resource budgeting.',
    items: [
      { name: 'Six-Layer Technology Architecture', href: '/technology', tag: 'Architecture' },
      { name: 'Layered System Hierarchy (L0–L9)', href: '/technology/architecture', tag: 'Specification' },
      { name: 'Production Solutions & Delivery Hub', href: '/solutions', tag: 'Solutions' },
    ],
  },
  {
    title: 'AI, Emerging Technologies, and Research',
    meta: '04 / RESEARCH',
    icon: Sparkles,
    description:
      'Compact causal language models for code synthesis, AST-aware repository intelligence, policy-governed agent runtimes, and reproducible scientific publications.',
    items: [
      { name: 'Research Portal & Investigation Areas', href: '/research', tag: 'Portal' },
      { name: 'AI & Machine Learning Foundations', href: '/technology/ai', tag: 'AI Systems' },
      { name: 'M31Genesis 425M Causal Language Model', href: '/projects/m31genesis', tag: 'Model Checkpoints' },
      { name: 'Autonomous Development Systems Paper', href: '/research/publications/autonomous-development-systems', tag: 'Publication' },
    ],
  },
];

const demonstrationFormats = [
  {
    title: 'Technical Keynotes',
    focus: 'Architectural Philosophy & System Roadmap',
    description:
      'In-depth technical presentations examining foundational architecture decisions, sovereign infrastructure paradigms, and multi-year engineering roadmaps.',
  },
  {
    title: 'Live Systems Demonstrations',
    focus: 'Runtime Execution & Real-World Operations',
    description:
      'Live, end-to-end walkthroughs of shipped systems operating under production constraints — autonomous runtime gating in M31A, AST parsing in Octate, and single-binary mail servers in OpenMail.',
  },
  {
    title: 'Policy & Confinement Deep Dives',
    focus: 'Security Boundaries & Deterministic Verification',
    description:
      'Technical explorations of non-bypassable policy evaluation gates, Linux cgroups v2 and POSIX rlimits process confinement, and evidence-based completion verification.',
  },
  {
    title: 'Open Research Disclosures',
    focus: 'Scientific Papers & Checkpoint Lineages',
    description:
      'Presentations on compact transformer architectures for code synthesis, cross-file symbol graph resolution, and experimental transport protocols.',
  },
];

export default function IoPage() {
  const pageGraph = generatePageGraph({
    title: 'Tonmoy Infrastructure and Vision I/O (TIV I/O) — Technology Event',
    description:
      'Tonmoy Infrastructure and Vision I/O (TIV I/O) is an independent technology and developer event presenting engineering work across software, internet infrastructure, networking, and research.',
    path: '/io',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'TIV I/O', item: '/io' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />

      {/* Hero / Identity */}
      <section className="relative overflow-hidden border-b border-border tiv-grid">
        <div className="tiv-container relative py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="max-w-2xl">
              <Reveal>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="flex h-7 items-center bg-brand px-3 font-display text-sm font-bold tracking-wider text-brand-foreground">
                    TIV I/O
                  </span>
                  <span className="border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                    TONMOY INFRASTRUCTURE AND VISION
                  </span>
                  <span className="border border-border bg-card px-3 py-1 font-mono text-xs text-brand">
                    STATUS: IN PLANNING
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-balance font-display text-5xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
                  Engineering depth.{' '}
                  <span className="text-brand">Open systems.</span> Real infrastructure.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                  <strong className="font-semibold text-foreground">
                    Tonmoy Infrastructure and Vision I/O (TIV I/O)
                  </strong>{' '}
                  is a company-led technology and developer event. It brings together TIV&apos;s
                  engineering work across practical software platforms, internet infrastructure,
                  networking systems, and foundational research.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#event-info"
                    className="group inline-flex items-center justify-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    Event status & updates
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="/work/"
                    className="group inline-flex items-center justify-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    Explore shipped work
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/research/"
                    className="group inline-flex items-center justify-center gap-2 border border-border px-6 py-3 font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    Explore research
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Branded Identity Graphic */}
            <Reveal delay={0.35} className="hidden lg:block">
              <div className="overflow-hidden border border-border bg-card/60 p-4 shadow-xl">
                <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
                  <span className="tiv-meta">EVENT IDENTITY</span>
                  <span className="tiv-meta-brand">TIV I/O</span>
                </div>
                <div className="overflow-hidden border border-border bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${siteConfig.basePath}/IO.webp`}
                    alt="Tonmoy Infrastructure and Vision I/O"
                    width={1200}
                    height={630}
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="border-b border-border">
        <div className="tiv-container py-6">
          <Breadcrumbs items={[{ label: 'TIV I/O' }]} />
        </div>
      </section>

      {/* 01 — What I/O Covers */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Coverage"
              title="What TIV I/O covers."
              description="A purposeful technical curriculum focused on production software, sovereign internet systems, architectural governance, and open research."
            />
          </Reveal>

          <StaggerContainer
            className="mt-12 grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-2"
            stagger={0.08}
          >
            {coverageCategories.map((category) => (
              <StaggerItem key={category.title}>
                <div className="group relative flex h-full flex-col bg-card p-8 transition-colors hover:bg-card/90">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-center justify-between">
                    <span className="tiv-meta">{category.meta}</span>
                    <div className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-brand group-hover:text-brand">
                      <category.icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl tracking-tight transition-colors group-hover:text-brand">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-border pt-4">
                    <span className="tiv-meta block">CONNECTED TIV SYSTEMS</span>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="group/link flex items-center justify-between text-sm transition-colors hover:text-brand"
                          >
                            <span className="text-foreground group-hover/link:text-brand">
                              {item.name}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground/70">
                              {item.tag}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 02 — Engineering & Demonstrations */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Demonstrations"
              title="Engineering, demonstrations, and research."
              description="TIV I/O is designed to present verifiable technical work rather than high-level slogans. Demonstrations focus on live systems, architectural decisions, and open science."
            />
          </Reveal>

          <StaggerContainer
            className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2"
            stagger={0.08}
          >
            {demonstrationFormats.map((format) => (
              <StaggerItem key={format.title}>
                <div className="group relative flex h-full flex-col bg-card p-8 transition-colors hover:bg-card/90">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <span className="tiv-meta">{format.focus}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight transition-colors group-hover:text-brand">
                    {format.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {format.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.2} className="mt-8">
            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h4 className="font-display text-base font-semibold">
                    Intended Format vs. Confirmed Program
                  </h4>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    The sections above describe the intended technical structure of TIV I/O.
                    Confirmed session listings, detailed speaker rosters, and exact timetables will
                    be published as event technical planning advances. No individual sessions are
                    currently locked or announced as final.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — Event Information (Honest / Truthful) */}
      <section id="event-info" className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Event Details"
              title="Event information."
              description="Truthful and verified event status. All logistics, venues, and registration paths remain unannounced until officially confirmed."
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">DATE & SCHEDULE</span>
                </div>
                <p className="mt-3 font-display text-2xl tracking-tight">To be announced</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Event dates will be published exclusively through official TIV announcements once
                  scheduled.
                </p>
              </div>

              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">LOCATION & VENUE</span>
                </div>
                <p className="mt-3 font-display text-2xl tracking-tight">To be announced</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Venue and physical or virtual attendance arrangements are currently unconfirmed.
                </p>
              </div>

              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">PROGRAM STATUS</span>
                </div>
                <p className="mt-3 font-display text-2xl tracking-tight text-brand">
                  In technical planning
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  The event framework is established. Agenda and presentation selection are in
                  progress.
                </p>
              </div>

              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">REGISTRATION STATUS</span>
                </div>
                <p className="mt-3 font-display text-2xl tracking-tight">To be announced</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Registration is not open. No tickets or booking links have been issued.
                </p>
              </div>

              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">EVENT CATEGORY</span>
                </div>
                <p className="mt-3 font-display text-lg tracking-tight">
                  Technology & Developer Conference
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Software, internet infrastructure, networking, and research.
                </p>
              </div>

              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">ORGANIZER</span>
                </div>
                <p className="mt-3 font-display text-lg tracking-tight">
                  Tonmoy Infrastructure and Vision
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  An independent engineering organization focused on self-reliant systems.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-8">
            <Callout type="info" title="Commitment to Accuracy">
              TIV does not fabricate event statistics, ticket pricing, speaker rosters, or attendance
              figures. Date, venue, and registration announcements will appear here once verified.
            </Callout>
          </Reveal>
        </div>
      </section>

      {/* 04 — Stay Informed */}
      <section id="stay-informed" className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="04"
              label="Updates"
              title="Stay informed."
              description="Follow genuine announcements through official TIV communications. We do not operate nonfunctional signup forms or collect unnecessary personal data."
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              <div className="bg-card p-8">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand" />
                  <h3 className="font-display text-xl font-semibold">News & Announcements</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Read official releases, architectural milestones, and forthcoming event dates as
                  they are published on the TIV news portal.
                </p>
                <div className="mt-6">
                  <Link
                    href="/news/"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                  >
                    View TIV news & updates
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="bg-card p-8">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-brand" />
                  <h3 className="font-display text-xl font-semibold">Direct Inquiries</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Have specific technical questions, partnership proposals, or event inquiries?
                  Reach out through our verified contact routing system.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact/"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                  >
                    Contact TIV (General / Technical)
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 — Explore TIV */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="05"
              label="Ecosystem"
              title="Explore the TIV ecosystem."
              description="Learn more about the engineering work, infrastructure systems, and research initiatives presented at TIV I/O."
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/products/"
                className="group relative flex flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">SOFTWARE</span>
                <h3 className="mt-2 font-display text-lg font-medium transition-colors group-hover:text-brand">
                  Shipped Products
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  OpenMail, Mercura, M31A, and Octate — four production-ready systems.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                href="/infrastructure/"
                className="group relative flex flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">INFRASTRUCTURE</span>
                <h3 className="mt-2 font-display text-lg font-medium transition-colors group-hover:text-brand">
                  Physical to Application
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  Data centers, routing topology, courier networks, and optical backbones.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                href="/research/"
                className="group relative flex flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">RESEARCH</span>
                <h3 className="mt-2 font-display text-lg font-medium transition-colors group-hover:text-brand">
                  Open Scientific Work
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  Causal language models, whitepapers, experimental checkpoints, and publications.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                href="/open-source"
                className="group relative flex flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">SOURCE</span>
                <h3 className="mt-2 font-display text-lg font-medium transition-colors group-hover:text-brand">
                  Open Source Work
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  Public repositories, permissive licenses, and inspectable codebases.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
