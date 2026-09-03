import Link from 'next/link';
import { ArrowRight, Activity, Terminal, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Experiments & Scientific Methodology',
  description:
    'Laboratory setups, empirical research methodology, benchmarks, and experimental boundaries at TIV.',
  path: '/research/experiments',
  keywords: ['TIV experiments', 'research methodology', 'systems benchmarks', 'empirical computer science'],
});

const experiments = [
  {
    id: 'EXP-001',
    title: 'Zero-Copy Queue Pipeline Throughput',
    domain: 'Systems Engineering / OpenMail',
    status: 'Completed' as const,
    hypothesis:
      'Replacing intermediate heap copies with memory-mapped buffers and io_uring submissions in OpenMail yields a 3.4x throughput increase on multi-core Linux hosts.',
    methodology:
      'Synthetic benchmark harness generating 100,000 synthetic MIME payloads per second across 32 concurrent worker threads on bare-metal x86_64 nodes.',
    findings:
      'Achieved sustained 92,400 msgs/sec with p99.9 latency under 4.2ms. Memory consumption stabilized at 1.8GB with zero garbage-collection latency spikes.',
  },
  {
    id: 'EXP-002',
    title: 'Sub-50ms Context Retrieval for Local AI Assistants',
    domain: 'Artificial Intelligence / Mercura',
    status: 'In Progress' as const,
    hypothesis:
      'Hierarchical index caching of abstract syntax trees (ASTs) on NVMe storage allows local LLM agent loops to parse 500k-line codebases without cloud vector databases.',
    methodology:
      'Continuous execution of real-world refactor workflows on 12 open-source repositories using Mercura running on consumer hardware (Apple M-series & Linux RTX 4090).',
    findings:
      'Initial benchmarks demonstrate cold-start context lookup of 38ms and warm query resolution under 12ms with strict deterministic reproducibility.',
  },
  {
    id: 'EXP-003',
    title: 'Wavelength Attenuation in Urban Dark Fiber Conduits',
    domain: 'Fiber Optics / Physical Infrastructure',
    status: 'Planning' as const,
    hypothesis:
      'Standard CWDM/DWDM optical transceivers operated across high-vibration municipal conduits can maintain Bit Error Rates (BER) below 10^-12 without active amplification.',
    methodology:
      'Optical Time Domain Reflectometer (OTDR) profiling across 15km passive single-mode fiber links simulating temperature and traffic-induced conduit movement.',
    findings:
      'Baseline calibration complete; physical carrier testing scheduled for deployment in Phase 2 field infrastructure tests.',
  },
  {
    id: 'EXP-004',
    title: 'Asymmetric Latency Tolerant Peer Consensus',
    domain: 'Distributed Systems / Networking',
    status: 'In Progress' as const,
    hypothesis:
      'A quorum-based gossip mesh with adaptive leader lease time reduces commit stall during trans-continental transit jitter spikes.',
    methodology:
      '10-node geo-distributed cluster across 5 continents running simulated packet drops (2-8%) and latency spikes up to 400ms.',
    findings:
      'Eliminated 94% of election churn during simulated trans-oceanic fiber degradation events.',
  },
];

export default function ResearchExperimentsPage() {
  const pageGraph = generatePageGraph({
    title: 'Experiments & Scientific Methodology — Tonmoy Infrastructure and Vision',
    description:
      'Laboratory setups, empirical research methodology, benchmarks, and experimental boundaries at TIV.',
    path: '/research/experiments',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Research', item: '/research' },
      { name: 'Experiments', item: '/research/experiments' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="RESEARCH / EXPERIMENTAL METHOD"
        label="Laboratory & Experiments"
        title="Empirical research and laboratory work."
        description="We believe in verifiable engineering. Every claim is subject to rigorous hypothesis testing, transparent measurement harnesses, and public replication."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Research', href: '/research' },
              { label: 'Experiments' },
            ]}
          />
        </div>
      </section>

      {/* Methodology Section */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="The Scientific Standard"
              title="Methodological principles."
              description="How TIV constructs, executes, and validates experimental work."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center border border-border text-brand">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium">Deterministic Reproducibility</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                All benchmark harnesses, synthetic workloads, and raw log files are version-controlled alongside research notes. Any researcher should be able to clone and run the experiment.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center border border-border text-brand">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium">Real-World Load Profiling</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                We avoid synthetic micro-benchmarks that test ideal cache states. Our tests incorporate packet jitter, memory saturation, and concurrent I/O interference.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center border border-border text-brand">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium">Vendor Neutrality</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Experiments evaluate fundamental architecture rather than proprietary vendor features. Findings are independent of proprietary cloud platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Experiments */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Bench Catalog"
              title="Preliminary & active experiments."
              description="Current experimental initiatives validating core assumptions across TIV systems."
            />
          </Reveal>

          <StaggerContainer className="mt-12 space-y-6" stagger={0.08}>
            {experiments.map((exp) => (
              <StaggerItem key={exp.id}>
                <div className="border border-border bg-card p-8 transition-colors hover:border-brand/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-brand">{exp.id}</span>
                      <span className="text-muted-foreground font-mono text-xs">/</span>
                      <span className="tiv-meta">{exp.domain}</span>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 font-mono text-xs font-medium border ${
                        exp.status === 'Completed'
                          ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                          : exp.status === 'In Progress'
                            ? 'border-brand/30 text-brand bg-brand/10'
                            : 'border-border text-muted-foreground bg-muted/20'
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl">{exp.title}</h3>

                  <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div>
                      <span className="tiv-meta">HYPOTHESIS</span>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.hypothesis}</p>
                    </div>
                    <div>
                      <span className="tiv-meta">TEST HARNESS & METHOD</span>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.methodology}</p>
                    </div>
                    <div>
                      <span className="tiv-meta">OBSERVED FINDINGS</span>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/90 font-mono text-[11px] bg-secondary/50 p-2.5 border border-border">
                        {exp.findings}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Experimental Boundaries */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Limits & Integrity"
              title="Experimental boundaries."
              description="Clear definitions of what we test, what we do not claim, and known experimental constraints."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h4 className="font-display text-lg">What TIV Validates</h4>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Throughput and latency on specified hardware baselines.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Memory-safety guarantees in high-concurrency environments.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Resilience against simulated network splits and clock drift.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Open-source protocol conformance (RFC 5321, RFC 5322, BGP-4).
                </li>
              </ul>
            </div>

            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h4 className="font-display text-lg">Experimental Constraints</h4>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">!</span>
                  Benchmarks reflect our specific hardware configurations and workloads.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">!</span>
                  Preliminary optical results are based on simulated municipal conduits.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">!</span>
                  We do not publish comparative competitive claims without verified test reproductions.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">!</span>
                  Research systems are marked as experimental until formal stable release.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="bg-secondary/30">
        <div className="tiv-container py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/research/areas"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
          >
            ← View Research Areas
          </Link>
          <Link
            href="/research/publications"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
          >
            Read Published Research Papers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
