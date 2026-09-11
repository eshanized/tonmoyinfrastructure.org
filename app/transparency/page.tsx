import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Shield,
  Scale,
  BarChart3,
  Building2,
  Cpu,
  Code2,
  Sparkles,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { PlatformIcon } from '@/components/shared/source-badge';
import { getTransparencyReports, getFinancialReports } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Transparency & Institutional Reporting',
  description:
    'TIV transparency reporting — financial estimates, governance models, security practices, and organizational documentation published openly.',
  path: '/transparency',
  keywords: ['TIV transparency', 'institutional reporting', 'open governance', 'financial disclosures'],
});

const sections = [
  {
    label: 'Company',
    description: 'Organizational information and structure.',
    href: '/about',
    icon: Building2,
  },
  {
    label: 'Financials',
    description: 'Annual financial summaries and statements.',
    href: '/transparency/financials',
    icon: BarChart3,
  },
  {
    label: 'Governance',
    description: 'How TIV is governed and makes decisions.',
    href: '/about/governance',
    icon: Scale,
  },
  {
    label: 'Leadership',
    description: 'Founder profile and organizational leadership.',
    href: '/about/leadership',
    icon: Building2,
  },
  {
    label: 'Security',
    description: 'Security philosophy, advisories, and disclosure.',
    href: '/security',
    icon: Shield,
  },
  {
    label: 'Research',
    description: 'Open research publications and technical reports.',
    href: '/research',
    icon: FileText,
  },
  {
    label: 'Open Source',
    description: 'Open-source repositories and contributions.',
    href: '/open-source',
    icon: FileText,
  },
  {
    label: 'AI & Models',
    description: 'Public machine learning models and Space demos.',
    href: '/technology/ai',
    icon: Sparkles,
  },
];

export default function TransparencyPage() {
  const reports = getTransparencyReports();
  const financials = getFinancialReports();

  const pageGraph = generatePageGraph({
    title: 'Transparency & Institutional Reporting — Tonmoy Infrastructure and Vision',
    description:
      'TIV transparency reporting — financial estimates, governance models, security practices, and organizational documentation published openly.',
    path: '/transparency',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Transparency', item: '/transparency' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="TRANSPARENCY"
        label="Open Reporting"
        title="Building in public."
        description="TIV publishes what it can without exposing what it shouldn't. Financial reports, governance, security, and research — all visible. This is one of the defining features of the organization."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader label="Sections" title="What we publish." />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {sections.map((section) => (
              <StaggerItem key={section.label}>
                <Link
                  href={section.href}
                  className="group relative bg-card p-6 transition-colors hover:bg-card/80"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <section.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg tracking-tight transition-colors group-hover:text-brand">
                    {section.label}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                    View
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* PUBLIC WORK */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="PUBLIC WORK"
              label="Verifiable Footprint"
              title="Let the work speak for the company."
              description="TIV does not ask for trust based on corporate statements. We publish our codebases, AI models, research papers, and architecture specifications so that our claims can be independently inspected and verified."
            />
          </Reveal>

          {/* Quick Inspection Hub */}
          <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/open-source"
              className="group bg-card p-6 transition-colors hover:bg-card/80"
            >
              <div className="flex items-center justify-between">
                <Code2 className="h-5 w-5 text-brand" />
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand">
                Inspect Source Code
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Browse open-source repositories, system implementations, and tooling on GitHub.
              </p>
            </Link>

            <Link
              href="/technology/ai"
              className="group bg-card p-6 transition-colors hover:bg-card/80"
            >
              <div className="flex items-center justify-between">
                <Sparkles className="h-5 w-5 text-brand" />
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand">
                Inspect AI Models
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Examine M31 checkpoints, architecture configs, weights, and interactive Spaces on Hugging Face.
              </p>
            </Link>

            <Link
              href="/research"
              className="group bg-card p-6 transition-colors hover:bg-card/80"
            >
              <div className="flex items-center justify-between">
                <Cpu className="h-5 w-5 text-brand" />
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand">
                Inspect Research
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Explore foundational research across distributed systems, optical networking, and AI.
              </p>
            </Link>

            <Link
              href="/research/publications"
              className="group bg-card p-6 transition-colors hover:bg-card/80"
            >
              <div className="flex items-center justify-between">
                <BookOpen className="h-5 w-5 text-brand" />
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand">
                Inspect Publications
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Read technical reports, peer papers, and formal whitepapers with versioned revisions.
              </p>
            </Link>
          </div>

          {/* Statement of Transparency Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold">What is Public</h4>
                  <span className="font-mono text-[11px] text-muted-foreground">Open Access</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Shipped Products:</strong> Complete, stable platforms (OpenMail, Mercura, M31A, Octate) with full documentation and active maintenance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Open Source Repositories:</strong> Permissively licensed developer tooling, runtime engines, and protocol packages hosted at <a href="https://github.com/eshanized" target="_blank" rel="noopener noreferrer" className="text-brand underline">github.com/eshanized</a>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Institutional Governance:</strong> Management financial estimates, leadership charters, annual reviews, and security disclosures.</span>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-amber-500/30 bg-amber-500/10 text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold">What is Experimental</h4>
                  <span className="font-mono text-[11px] text-muted-foreground">Research & Prototypes</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>AI Model Checkpoints:</strong> M31Genesis (425M), M31Tesla (228.9M), and M31Entropy (314M) published on <a href="https://huggingface.co/eshanized" target="_blank" rel="noopener noreferrer" className="text-brand underline">huggingface.co/eshanized</a>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Interactive Demonstrators:</strong> M31 Q // For programmers hosted on Hugging Face Spaces.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Experimental Architectures:</strong> Large-vocabulary tokenization, sliding window attention tests, and GQA runtime harnesses.</span>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-border bg-muted/30 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold">What is Proprietary / Internal</h4>
                  <span className="font-mono text-[11px] text-muted-foreground">Restricted Infrastructure</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Operational Telemetry:</strong> Physical optical cross-connect telemetry, core routing tables, and dark fiber monitoring feeds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Raw Datasets & Pre-training Corpora:</strong> Raw multi-gigabyte training corpora subject to partner licensing and intellectual property terms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Production Secrets & Keys:</strong> Cryptographic infrastructure keys, root certificates, and client enterprise credentials.</span>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-cyan-500/30 bg-cyan-500/10 text-cyan-500">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold">Why Checkpoints Remain Research-Only</h4>
                  <span className="font-mono text-[11px] text-muted-foreground">Scientific Integrity</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Honest Status Labeling:</strong> Foundation models like M31Genesis explore causal generation in sub-billion parameter classes; labeling them &quot;production&quot; would be dishonest.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Peer Review & Community Audit:</strong> Open checkpoint publishing allows researchers to inspect weights, measure perplexity, and identify biases openly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">·</span>
                  <span><strong>Evaluation Prior to Deployment:</strong> Checkpoints require domain-specific fine-tuning and safety filters before deployment in mission-critical environments.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              label="Reports"
              title="Transparency reports."
              description="Annual reports covering TIV's activities, finances, and direction."
            />
          </Reveal>
          <StaggerContainer className="mt-10 space-y-px" stagger={0.08}>
            {reports.map((report) => (
              <StaggerItem key={report.slug}>
                <div className="group relative flex flex-col gap-4 border border-border bg-card p-6 transition-colors hover:border-brand/40 md:flex-row md:items-center md:justify-between">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="tiv-meta">{report.fiscalYear}</span>
                      <StatusBadge status={report.status} />
                    </div>
                    <h3 className="mt-3 font-display text-lg transition-colors group-hover:text-brand">
                      {report.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Version {report.version} · Published {report.publicationDate}
                    </p>
                  </div>
                  <Link
                    href={`/transparency/${report.slug}`}
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                  >
                    Read report
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
