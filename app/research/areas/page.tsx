import Link from 'next/link';
import { ArrowRight, Brain, Network, Zap, Server, Cpu, Code, BookOpen, Layers } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getResearchAreas } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Research Areas & Technical Domains',
  description:
    'Detailed investigation domains across artificial intelligence, networking, fiber optics, distributed systems, systems engineering, and developer infrastructure.',
  path: '/research/areas',
  keywords: ['AI research', 'networking research', 'fiber optics', 'distributed systems', 'systems engineering', 'TIV research'],
});

const areaDetails: Record<
  string,
  {
    icon: typeof Brain;
    focus: string[];
    systems: { label: string; href: string }[];
    objectives: string;
  }
> = {
  'artificial-intelligence': {
    icon: Brain,
    focus: [
      'Deterministic code generation and verification',
      'Context-aware AST manipulation and symbolic reasoning',
      'Local-first agent architectures for autonomous workflows',
      'Evaluation metrics for non-hallucinatory software modifications',
    ],
    systems: [
      { label: 'Octate (AI Code Review Engine)', href: '/projects/octate' },
      { label: 'Mercura (Local AI Assistant)', href: '/projects/mercura' },
      { label: 'Autonomous Systems Paper', href: '/research/publications/autonomous-development-systems' },
    ],
    objectives:
      'Developing AI systems that operate with deterministic rigor, verifiable reasoning, and zero data leakage, enabling engineers to delegate complex tasks safely.',
  },
  networking: {
    icon: Network,
    focus: [
      'Multipath transport and BGP route convergence',
      'Low-latency overlay networks for distributed state synchronization',
      'Zero-trust hardware cryptographic attestations',
      'Traffic telemetry and congestion avoidance in bare-metal clusters',
    ],
    systems: [
      { label: 'TIVNet Overlay Architecture', href: '/infrastructure/networking' },
      { label: 'Autonomous Systems Paper', href: '/research/publications/autonomous-development-systems' },
    ],
    objectives:
      'Designing self-healing network protocols that eliminate packet retransmission penalties and preserve deterministic latency across global compute clusters.',
  },
  'fiber-optics': {
    icon: Zap,
    focus: [
      'Dense wavelength-division multiplexing (DWDM) efficiency',
      'Inter-facility dark fiber routing and low-loss splicing',
      'Real-time optical time-domain reflectometry (OTDR) monitoring',
      'Photonic interconnects for sub-microsecond compute-to-compute transfer',
    ],
    systems: [
      { label: 'Optical Systems Service', href: '/infrastructure/optical-systems' },
      { label: 'Experimental Infrastructure', href: '/research/experiments' },
    ],
    objectives:
      'Pushing the boundary of high-capacity photonic transit to build dedicated low-attenuation backbones for internal compute workloads.',
  },
  'distributed-systems': {
    icon: Server,
    focus: [
      'Byzantine fault-tolerant consensus under partitions',
      'Conflict-free replicated data types (CRDTs) for offline-first state',
      'Deterministic lock-free queues for high-concurrency event ingestion',
      'Provable linearizability verification across heterogeneous nodes',
    ],
    systems: [
      { label: 'OpenMail (Queue Engine)', href: '/projects/openmail' },
      { label: 'M31A (Autonomous Infrastructure)', href: '/projects/m31a' },
    ],
    objectives:
      'Building distributed primitives that guarantee causal consistency without compromising single-node throughput or introducing cloud vendor lock-in.',
  },
  'systems-engineering': {
    icon: Cpu,
    focus: [
      'Zero-copy memory pipelines with Linux io_uring',
      'Custom slab allocators for bounded memory consumption',
      'Hardware cache-line alignment in high-throughput daemon runtimes',
      'Static binary distribution and deterministic containerless deploys',
    ],
    systems: [
      { label: 'M31A (Compute Engine)', href: '/projects/m31a' },
      { label: 'OpenMail (Core Daemon)', href: '/projects/openmail' },
    ],
    objectives:
      'Extracting bare-metal efficiency from standard x86 and ARM architectures through zero-dependency systems programming and low-level kernel abstractions.',
  },
  'developer-infrastructure': {
    icon: Code,
    focus: [
      'Local-first continuous integration and isolated sandbox execution',
      'Hermetic build systems and cryptographic artifact provenance',
      'Instantaneous feedback loops for compile-test-debug cycles',
      'Privacy-preserving developer telemetry and profiling harnesses',
    ],
    systems: [
      { label: 'Mercura Platform', href: '/projects/mercura' },
      { label: 'Octate (Code Review CLI)', href: '/projects/octate' },
    ],
    objectives:
      'Restoring developer autonomy with blisteringly fast, local-first tooling that requires zero external network roundtrips for core engineering workflows.',
  },
};

export default function ResearchAreasPage() {
  const areas = getResearchAreas();

  const pageGraph = generatePageGraph({
    title: 'Research Areas & Technical Domains — Tonmoy Infrastructure and Vision',
    description:
      'Detailed investigation domains across artificial intelligence, networking, fiber optics, distributed systems, systems engineering, and developer infrastructure.',
    path: '/research/areas',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Research', item: '/research' },
      { name: 'Areas', item: '/research/areas' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="RESEARCH / DOMAINS"
        label="Research Areas"
        title="Six domains of technical inquiry."
        description="TIV conducts disciplined research across the foundational layers of computing. Each domain directly informs our software and physical infrastructure."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Research', href: '/research' },
              { label: 'Areas' },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Investigation Program"
              title="Disciplined, hypothesis-driven exploration."
              description="Our research philosophy rejects speculative hype in favor of measurable engineering advances, open publications, and reproducible systems."
            />
          </Reveal>

          <StaggerContainer className="mt-12 space-y-12" stagger={0.1}>
            {areas.map((area, idx) => {
              const details = areaDetails[area.slug];
              const Icon = details?.icon || Brain;

              return (
                <StaggerItem key={area.slug}>
                  <div className="border border-border bg-card p-8 md:p-10 transition-colors hover:border-brand/40">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center border border-border text-brand">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
                            <span className="tiv-meta-brand">{area.title}</span>
                          </div>
                          <h3 className="font-display text-2xl tracking-tight mt-1">{area.title}</h3>
                        </div>
                      </div>
                      <StatusBadge status="Research" />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <span className="tiv-meta">CORE OBJECTIVE</span>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                            {details?.objectives || area.description}
                          </p>
                        </div>

                        <div>
                          <span className="tiv-meta">ACTIVE INVESTIGATION QUESTIONS</span>
                          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {details?.focus.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="text-brand font-mono">→</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 space-y-6">
                        <div>
                          <span className="tiv-meta">APPLIED IN TIV SYSTEMS</span>
                          <div className="mt-3 space-y-2">
                            {details?.systems.map((sys) => (
                              <Link
                                key={sys.label}
                                href={sys.href}
                                className="group flex items-center justify-between border border-border p-2.5 text-xs transition-colors hover:border-brand/40"
                              >
                                <span className="font-medium text-foreground group-hover:text-brand">{sys.label}</span>
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="tiv-meta">STATUS</span>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Active empirical research and working paper drafting in progress.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Cross links */}
      <section className="bg-secondary/30">
        <div className="tiv-container py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/research/experiments"
              className="group border border-border bg-card p-6 transition-colors hover:border-brand/40"
            >
              <span className="tiv-meta">EMPIRICAL METHOD</span>
              <h3 className="mt-2 font-display text-xl group-hover:text-brand transition-colors">
                Experimental Methodology & Laboratories
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Review our laboratory setups, bench test frameworks, and measurement constraints.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-brand">
                View experiments
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/research/publications"
              className="group border border-border bg-card p-6 transition-colors hover:border-brand/40"
            >
              <span className="tiv-meta">PUBLICATIONS</span>
              <h3 className="mt-2 font-display text-xl group-hover:text-brand transition-colors">
                Formal Papers & Technical Monographs
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Read peer-reviewed research papers and technical reports published by TIV.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-brand">
                Browse publications
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
