import Link from 'next/link';
import { ExternalLink, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { PlatformIcon } from '@/components/shared/source-badge';
import { getTechnicalFootprint } from '@/lib/content';

export function PublicTechnicalFootprint({
  showSectionHeader = true,
}: {
  showSectionHeader?: boolean;
}) {
  const footprint = getTechnicalFootprint();

  return (
    <div className="space-y-12">
      {showSectionHeader && (
        <SectionHeader
          label="Authoritative Sources"
          title="PUBLIC TECHNICAL FOOTPRINT"
          description="TIV develops and distributes sovereign technology across verified, authoritative public registries and platforms. We do not aggregate arbitrary personal activity; all resources shown here are officially associated with TIV and its engineering lineage."
        />
      )}

      {/* Grid of verified platforms */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {footprint.map((source) => {
          const isExternal =
            source.profileUrl.startsWith('http://') ||
            source.profileUrl.startsWith('https://');

          return (
            <div
              key={source.platform}
              className="group relative flex flex-col justify-between border border-border bg-card p-6 md:p-8 transition-all hover:border-brand/40"
            >
              <span className="absolute left-0 top-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />

              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-border bg-secondary/30 text-brand">
                      <PlatformIcon platform={source.platform} size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-medium tracking-tight">
                          {source.name}
                        </h3>
                        {source.verified && (
                          <span className="inline-flex items-center gap-1 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            VERIFIED
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">
                        @{source.handle} · {source.role}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {source.description}
                </p>

                {/* Resource Types Supported */}
                <div className="mt-5 border-t border-border pt-4">
                  <span className="tiv-meta mb-2 block">Supported Resources</span>
                  <div className="flex flex-wrap gap-1.5">
                    {source.resourceTypes.map((res) => (
                      <span
                        key={res}
                        className="border border-border bg-background px-2 py-0.5 font-mono text-xs text-foreground"
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Items */}
                {source.featuredItems && source.featuredItems.length > 0 && (
                  <div className="mt-4">
                    <span className="tiv-meta mb-2 block">Key Public Artifacts</span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {source.featuredItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-brand font-mono">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-4">
                {isExternal ? (
                  <a
                    href={source.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand transition-colors hover:underline"
                  >
                    View Official {source.name} Profile
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href={source.profileUrl}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand transition-colors hover:underline"
                  >
                    Explore {source.name}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Distinction & Provenance Policy */}
      <div className="border border-border bg-secondary/20 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 shrink-0 text-brand mt-1" />
          <div className="space-y-2 text-sm text-muted-foreground">
            <h4 className="font-display text-base font-medium text-foreground">
              Technical Footprint Governance & Classification
            </h4>
            <p>
              TIV maintains a strict boundary between official corporate/ecosystem work, founder exploratory projects,
              and external contributions. Hugging Face profile usernames or GitHub personal accounts are attributed
              transparently without conflating individual maintainership with corporate capitalization.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs text-foreground">
              <div className="border border-border p-2.5 bg-background">
                <span className="tiv-meta">TIV</span>
                <p className="mt-1">Official releases & core infrastructure</p>
              </div>
              <div className="border border-border p-2.5 bg-background">
                <span className="tiv-meta">TIVERSE</span>
                <p className="mt-1">Ecosystem projects & community tooling</p>
              </div>
              <div className="border border-border p-2.5 bg-background">
                <span className="tiv-meta">FOUNDER</span>
                <p className="mt-1">Exploratory research & personal tools</p>
              </div>
              <div className="border border-border p-2.5 bg-background">
                <span className="tiv-meta">EXTERNAL</span>
                <p className="mt-1">Upstream forks & standards compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
