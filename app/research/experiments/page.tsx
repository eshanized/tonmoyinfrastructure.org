import Link from 'next/link';
import { ArrowRight, Activity, Terminal, Shield, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
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

interface ExperimentItem {
  id: string;
  title: string;
  domain: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  executionEnvironment: 'Synthetic Benchmark on Bare-Metal Linux' | 'Local Workstation Hardware' | 'Optical Lab Simulation Testbed' | 'Emulated Network Cluster';
  hypothesis: string;
  methodology: string;
  findings: string;
  limitations: string;
}

const experiments: ExperimentItem[] = [
  {
    id: 'EXP-001',
    title: 'Zero-Copy Queue Pipeline Throughput',
    domain: 'Systems Engineering / OpenMail',
    status: 'Completed',
    executionEnvironment: 'Synthetic Benchmark on Bare-Metal Linux',
    hypothesis:
      'Replacing intermediate heap copies with memory-mapped buffers and io_uring submissions in OpenMail yields a 3.4x throughput increase on multi-core Linux hosts.',
    methodology:
      'Synthetic benchmark harness generating 100,000 synthetic MIME payloads per second across 32 concurrent worker threads on bare-metal x86_64 nodes.',
    findings:
      'Achieved sustained 92,400 msgs/sec with p99.9 latency under 4.2ms. Memory consumption stabilized at 1.8GB with zero garbage-collection latency spikes.',
    limitations:
      'Synthetic MIME payloads generated in memory without disk I/O persistence bottlenecks; real-world disk write sync and anti-spam scanning will lower aggregate message rates.',
  },
  {
    id: 'EXP-002',
    title: 'Sub-50ms Context Retrieval for Local AI Assistants',
    domain: 'Artificial Intelligence / Mercura',
    status: 'In Progress',
    executionEnvironment: 'Local Workstation Hardware',
    hypothesis:
      'Hierarchical index caching of abstract syntax trees (ASTs) on NVMe storage allows local LLM agent loops to parse 500k-line codebases without cloud vector databases.',
    methodology:
      'Continuous execution of real-world refactor workflows on 12 open-source repositories using Mercura running on consumer hardware (Apple M-series & Linux RTX 4090).',
    findings:
      'Initial benchmarks demonstrate cold-start context lookup of 38ms and warm query resolution under 12ms with strict deterministic reproducibility.',
    limitations:
      'Evaluated on single-user local developer workstations. Multi-tenant concurrent indexing under contention has not yet been benchmarked.',
  },
  {
    id: 'EXP-003',
    title: 'Wavelength Attenuation in Urban Dark Fiber Conduits',
    domain: 'Fiber Optics / Physical Infrastructure',
    status: 'Planning',
    executionEnvironment: 'Optical Lab Simulation Testbed',
    hypothesis:
      'Standard CWDM/DWDM optical transceivers operated across high-vibration municipal conduits can maintain Bit Error Rates (BER) below 10^-12 without active amplification.',
    methodology:
      'Optical Time Domain Reflectometer (OTDR) profiling across 15km passive single-mode fiber links simulating temperature and traffic-induced conduit movement in laboratory spool racks.',
    findings:
      'Baseline calibration complete; physical carrier testing scheduled for deployment in Phase 2 field infrastructure tests.',
    limitations:
      'Preliminary data derived from laboratory spools with simulated mechanical oscillation; real municipal duct environmental factors may introduce unmodeled dispersion.',
  },
  {
    id: 'EXP-004',
    title: 'Asymmetric Latency Tolerant Peer Consensus',
    domain: 'Distributed Systems / Networking',
    status: 'In Progress',
    executionEnvironment: 'Emulated Network Cluster',
    hypothesis:
      'A quorum-based gossip mesh with adaptive leader lease time reduces commit stall during trans-continental transit jitter spikes.',
    methodology:
      '10-node cluster running Linux network emulation (tc/netem) injecting synthetic packet drops (2-8%) and simulated geo-distributed latency spikes up to 400ms.',
    findings:
      'Eliminated 94% of election churn during simulated trans-oceanic fiber degradation events.',
    limitations:
      'Simulated via software packet drop and latency injection on a local test cluster, not trans-oceanic physical undersea cables.',
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

      {/* Methodology Principles */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Scientific Integrity"
              title="Methodological commitments."
              description="How TIV designs, isolates, and documents experimental systems research."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
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
                    <div className="flex items-center gap-2">
                      <span className="border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {exp.executionEnvironment}
                      </span>
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
                  </div>

                  <h3 className="mt-4 font-display text-xl">{exp.title}</h3>

                  <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div>
                      <span className="tiv-meta">HYPOTHESIS</span>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.hypothesis}</p>
                    </div>
                    <div>
                      <span className="tiv-meta">TEST HARNESS &amp; METHOD</span>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.methodology}</p>
                    </div>
                    <div>
                      <span className="tiv-meta">OBSERVED FINDINGS</span>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/90 font-mono text-[11px] bg-secondary/50 p-2.5 border border-border">
                        {exp.findings}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border pt-3">
                    <span className="tiv-meta text-[10px] text-amber-400">KNOWN CONSTRAINTS &amp; LIMITATIONS</span>
                    <p className="mt-1 text-xs font-mono text-muted-foreground leading-relaxed">
                      {exp.limitations}
                    </p>
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

          <div className="mt-12 space-y-4">
            <Callout type="warning" title="Negative Results and Failures Are Published">
              If an architecture hypothesis fails under benchmark stress or does not deliver expected performance improvements, we document the negative finding rather than discarding the test. Honest engineering requires recording architectural dead ends.
            </Callout>

            <Callout type="info" title="Simulation vs Physical Deployment Distinction">
              Simulated workloads and network emulation (such as netem packet drop testing) are clearly identified. We never represent laboratory simulations as observations made on physical multi-continent undersea fiber.
            </Callout>
          </div>
        </div>
      </section>
    </>
  );
}
