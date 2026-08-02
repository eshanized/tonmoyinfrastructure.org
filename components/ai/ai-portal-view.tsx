import Link from 'next/link';
import {
  Cpu,
  Sparkles,
  Layers,
  Terminal,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Database,
  ShieldCheck,
  Code2,
  Box,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { StatusBadge } from '@/components/shared/status-badge';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import {
  SourceBadge,
  ArtifactClassificationBadge,
  AffiliationBadge,
  PlatformIcon,
} from '@/components/shared/source-badge';
import { M31EcosystemView } from '@/components/technology/m31-ecosystem-view';
import { getAIProjects, getPublications } from '@/lib/content';
import type { Project } from '@/lib/types';

interface AIPortalViewProps {
  basePath: 'technology' | 'research';
}

export function AIPortalView({ basePath }: AIPortalViewProps) {
  const aiProjects = getAIProjects();
  const publications = getPublications().filter(
    (pub) => pub.area.toLowerCase().includes('intelligence') || pub.area.toLowerCase().includes('systems')
  );

  const models = aiProjects.filter((p) => p.artifactType === 'AI Model');
  const systems = aiProjects.filter((p) => p.artifactType === 'Software System' || p.artifactType === 'Application');
  const spaces = aiProjects.filter((p) => p.artifactType === 'Space / Demo');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    basePath === 'technology'
      ? { label: 'Technology', href: '/technology' }
      : { label: 'Research', href: '/research' },
    { label: 'Artificial Intelligence' },
  ];

  return (
    <>
      <PageHeader
        index="AI & MACHINE LEARNING"
        label="Research & Systems"
        title="Artificial Intelligence & Machine Learning."
        description="Public AI/ML models, agent systems, interactive demos, and experimental architectures originating from Tonmoy Infrastructure & Vision and its research labs."
        meta={[
          { label: 'FOUNDATION', value: 'M31 Architecture' },
          { label: 'MODELS', value: `${models.length} Public Checkpoints` },
          { label: 'SPACES', value: `${spaces.length} Interactive Demo` },
          { label: 'CLASSIFICATION', value: 'System / Model / Demo' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      {/* Authoritative Public Hubs Callout */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-amber-500/10 text-amber-500">
                    <PlatformIcon platform="Hugging Face" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-medium">Hugging Face Profile</h3>
                    <p className="font-mono text-xs text-muted-foreground">huggingface.co/eshanized</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-500">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </span>
              </div>
              <p className="mt-3 text-pretty text-sm text-muted-foreground">
                Authoritative host for public M31 checkpoints, tokenizer configs, agent runtimes, and interactive programmer spaces.
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
                <span className="font-mono text-xs text-muted-foreground">
                  {models.length} Models · {spaces.length} Space
                </span>
                <a
                  href="https://huggingface.co/eshanized"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
                >
                  Visit Hugging Face Profile
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-foreground/5 text-foreground">
                    <PlatformIcon platform="GitHub" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-medium">GitHub Repositories</h3>
                    <p className="font-mono text-xs text-muted-foreground">github.com/eshanized</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-500">
                  <ShieldCheck className="h-3 w-3" />
                  Authoritative
                </span>
              </div>
              <p className="mt-3 text-pretty text-sm text-muted-foreground">
                Source code repositories, agent harness architectures, tokenizer pipelines, and training specifications.
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
                <span className="font-mono text-xs text-muted-foreground">
                  Open Source Codebases
                </span>
                <a
                  href="https://github.com/eshanized"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
                >
                  Visit GitHub Profile
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Callout type="warning" title="Research Checkpoint Integrity & Evaluation Policy">
              Public AI models (<strong>M31Genesis</strong>, <strong>M31Tesla</strong>, <strong>M31Entropy</strong>) and Space demos (<strong>M31 Q</strong>) represent experimental research checkpoints. Unlike TIV&apos;s core software platforms (such as <strong>M31A</strong> and <strong>OpenMail</strong>, which are verified Stable Releases), these checkpoints explore native causal LM capabilities, context mechanisms, and agentic workflows. They must be independently evaluated for alignment and accuracy prior to any production usage.
            </Callout>
          </div>
        </div>
      </section>

      {/* M31 Ecosystem View */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Ecosystem"
              title="The M31 Ecosystem Architecture."
              description="A clear distinction between agent systems, causal language models, runtime harnesses, and interactive programmer demos."
            />
          </Reveal>
          <div className="mt-12">
            <M31EcosystemView />
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Checkpoints"
              title="AI & Causal Language Models."
              description="Open weights and checkpoint architectures published on Hugging Face for research and developer evaluation."
            />
          </Reveal>

          <StaggerContainer className="mt-12 space-y-6" stagger={0.1}>
            {models.map((model) => (
              <StaggerItem key={model.slug}>
                <div className="border border-border bg-card p-6 md:p-8 transition-colors hover:border-brand/40">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl font-bold tracking-tight">
                        {model.title}
                      </h3>
                      <ArtifactClassificationBadge classification={model.artifactType} />
                      <StatusBadge status={model.status} />
                      <AffiliationBadge affiliation={model.affiliation} />
                    </div>
                    {model.parameters && (
                      <span className="border border-brand/30 bg-brand/5 px-3 py-1 font-mono text-xs font-semibold text-brand">
                        {model.parameters}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                    {model.description}
                  </p>

                  {/* Technical Specifications Matrix */}
                  <div className="mt-6 grid grid-cols-2 gap-3 border border-border bg-secondary/30 p-4 sm:grid-cols-4">
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase">Parameter Class</span>
                      <p className="mt-1 font-mono text-sm font-semibold">{model.parameters || 'Undisclosed'}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase">Architecture</span>
                      <p className="mt-1 font-mono text-sm font-semibold">{model.architecture || 'Transformer'}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase">Context Window</span>
                      <p className="mt-1 font-mono text-sm font-semibold">{model.contextWindow || 'Standard'}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase">License</span>
                      <p className="mt-1 font-mono text-sm font-semibold">{model.license || 'Open Source'}</p>
                    </div>
                  </div>

                  {/* Sources and Links */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="flex flex-wrap items-center gap-2">
                      {model.sources?.map((s) => (
                        <SourceBadge key={s.url} source={s} />
                      ))}
                    </div>
                    <Link
                      href={`/projects/${model.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                    >
                      Technical Details & Specifications
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Systems & Platforms Section */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Systems"
              title="Software & Agent Systems."
              description="End-to-end applications and runtime engines integrating artificial intelligence into software workflows."
            />
          </Reveal>

          <div className="mt-12">
            {systems.map((system) => (
              <div
                key={system.slug}
                className="border border-border bg-card p-6 md:p-8 transition-colors hover:border-brand/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {system.title}
                    </h3>
                    <ArtifactClassificationBadge classification={system.artifactType} />
                    <StatusBadge status={system.status} />
                    <AffiliationBadge affiliation={system.affiliation} />
                  </div>
                  <span className="border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-500">
                    Production System
                  </span>
                </div>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  {system.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap items-center gap-2">
                    {system.sources?.map((s) => (
                      <SourceBadge key={s.url} source={s} />
                    ))}
                  </div>
                  <Link
                    href={`/products/${system.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                  >
                    View Product Architecture
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Spaces Section */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="04"
              label="Spaces"
              title="Interactive Hugging Face Demos."
              description="Web-based demonstrator spaces allowing developers to explore agent capabilities directly."
            />
          </Reveal>

          <div className="mt-12">
            {spaces.map((space) => (
              <div
                key={space.slug}
                className="border border-border bg-card p-6 md:p-8 transition-colors hover:border-brand/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {space.title}
                    </h3>
                    <ArtifactClassificationBadge classification={space.artifactType} />
                    <StatusBadge status={space.status} />
                    <AffiliationBadge affiliation={space.affiliation} />
                  </div>
                  <span className="border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-500">
                    Hugging Face Space
                  </span>
                </div>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  {space.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap items-center gap-2">
                    {space.sources?.map((s) => (
                      <SourceBadge key={s.url} source={s} />
                    ))}
                  </div>
                  <a
                    href="https://huggingface.co/spaces/eshanized/M31Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                  >
                    Launch Hugging Face Space
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datasets Disclosure Section */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-20">
          <div className="border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium">Public Datasets Disclosure</h3>
                <span className="font-mono text-xs text-muted-foreground">Governance & Data Integrity</span>
              </div>
            </div>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              <strong>No public training corpora or benchmark datasets are currently published.</strong> TIV internalizes proprietary training datasets and partner splits under non-disclosure and strict copyright clearance. When benchmark datasets meet open-source reproducibility standards, they will be registered directly under authoritative organizational namespaces on Hugging Face and GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* Publications & Related Reports */}
      <section>
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              index="05"
              label="Publications"
              title="Related Publications & Papers."
              description="Peer-reviewed papers, system whitepapers, and technical reports on AI systems and computing."
              link={{ label: 'All publications', href: '/research/publications' }}
            />
          </Reveal>

          <StaggerContainer className="mt-10 space-y-px" stagger={0.08}>
            {publications.map((pub) => (
              <StaggerItem key={pub.slug}>
                <Link
                  href={`/research/publications/${pub.slug}`}
                  className="group relative flex flex-col gap-3 border border-border bg-card p-6 transition-colors hover:border-brand/40 md:flex-row md:items-center md:justify-between"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {pub.identifier}
                    </span>
                    <StatusBadge status={pub.status} />
                  </div>
                  <h3 className="flex-1 font-display text-lg transition-colors group-hover:text-brand md:px-6">
                    {pub.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    v{pub.version} · {pub.date}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
