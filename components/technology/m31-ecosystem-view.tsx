import Link from 'next/link';
import { ArrowRight, Cpu, Layers, GitBranch, Terminal, ShieldAlert, Sparkles, Box } from 'lucide-react';
import { StatusBadge } from '@/components/shared/status-badge';
import {
  SourceBadge,
  ArtifactClassificationBadge,
  HuggingFaceIcon,
  PlatformIcon,
} from '@/components/shared/source-badge';
import { getM31Ecosystem } from '@/lib/content';
import type { M31Node } from '@/lib/types';

export function M31EcosystemView() {
  const nodes = getM31Ecosystem();

  return (
    <div className="space-y-8">
      {/* Ecosystem intro header */}
      <div className="border-l-2 border-brand pl-6">
        <span className="tiv-meta-brand">ECOSYSTEM ARCHITECTURE</span>
        <h2 className="mt-2 font-display text-2xl md:text-3xl">
          The M31 Engineering & Research Family
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          M31 encompasses autonomous developer systems, native causal language models,
          lightweight Python agent runtimes, and large-vocabulary pretraining checkpoints.
          Each project within the ecosystem maintains an independent lifecycle category,
          distinguishing stable operational software from experimental research checkpoints.
        </p>
      </div>

      {/* Visual Tree Structure */}
      <div className="border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-9 w-9 items-center justify-center border border-border bg-secondary/50 text-brand">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold">M31 ECOSYSTEM ROOT</span>
              <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                Explicit Topology
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Relationships defined via explicit metadata, not nominal inference.
            </p>
          </div>
        </div>

        {/* Tree Nodes */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {nodes.map((node) => {
            const isStable = node.status === 'Stable Release';
            return (
              <div
                key={node.id}
                className="group relative flex flex-col justify-between border border-border bg-background p-5 transition-all hover:border-brand/40"
              >
                <span
                  className={`absolute left-0 top-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                    isStable ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ArtifactClassificationBadge classification={node.artifactType} />
                      <span className="font-mono text-xs text-muted-foreground">
                        {node.platform === 'huggingface' ? 'HF' : 'GH'}
                      </span>
                    </div>
                    <StatusBadge status={node.status} />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-brand">
                    {node.name}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {node.role}
                  </p>

                  <p className="mt-3 text-pretty text-xs leading-relaxed text-muted-foreground">
                    {node.description}
                  </p>

                  {node.parameterCount && (
                    <div className="mt-3 flex items-center gap-2 font-mono text-xs">
                      <span className="tiv-meta">Parameters:</span>
                      <span className="border border-border px-2 py-0.5 text-foreground">
                        {node.parameterCount}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Lifecycle: <span className="text-foreground">{node.lifecycle}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {node.href && (
                      <Link
                        href={node.href}
                        className="inline-flex items-center gap-1 font-mono text-xs text-brand hover:underline"
                      >
                        Project Details
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architectural Disclaimers & Integrity Note */}
      <div className="border border-dashed border-border bg-secondary/10 p-5 text-xs text-muted-foreground space-y-2">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          <span>Integrity Rule: Independent Lifecycle & No Fabrication</span>
        </div>
        <p>
          Projects sharing the M31 prefix represent discrete engineering efforts with distinct lifecycle properties.
          M31A is an active stable release, whereas M31Genesis, M31Tesla, and M31Entropy are experimental research artifacts.
          Project names do not imply external entity affiliations (e.g. M31Tesla has no association with Tesla, Inc.,
          nor does M31Entropy imply a thermodynamic architecture).
        </p>
      </div>
    </div>
  );
}
