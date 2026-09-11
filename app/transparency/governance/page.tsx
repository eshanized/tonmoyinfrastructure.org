import Link from 'next/link';
import { ArrowRight, ShieldCheck, Scale, Compass, Users, FileText, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getFounder } from '@/lib/people';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Organizational Governance & Stewardship',
  description:
    'Organizational governance, architectural decision framework, financial stewardship, and engineering ethics at TIV.',
  path: '/transparency/governance',
  keywords: ['TIV governance', 'organizational stewardship', 'engineering governance', 'decision framework'],
});

export default function GovernancePage() {
  const founder = getFounder();

  const pageGraph = generatePageGraph({
    title: 'Organizational Governance & Stewardship — Tonmoy Infrastructure and Vision',
    description:
      'Organizational governance, architectural decision framework, financial stewardship, and engineering ethics at TIV.',
    path: '/transparency/governance',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Transparency', item: '/transparency' },
      { name: 'Governance', item: '/transparency/governance' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="TRANSPARENCY / GOVERNANCE"
        label="Organizational Stewardship"
        title="How TIV is governed."
        description="TIV is structured for long-term engineering autonomy. Our governance framework prioritizes technical durability, transparent decision-making, and open stewardship over hypergrowth."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Transparency', href: '/transparency' },
              { label: 'Governance' },
            ]}
          />
        </div>
      </section>

      {/* 01 — Structure */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Structure"
              title="Organizational architecture."
              description="Founded and led by an engineer-architect, structured to protect research and infrastructure independence."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="border border-border bg-card p-8">
              <span className="tiv-meta">LEADERSHIP & ARCHITECTURE</span>
              <h3 className="mt-2 font-display text-2xl">Founder Stewardship</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                TIV was founded by {founder?.name || 'Eshan Roy'} ({founder?.handle || 'eshanized'}) as an independent research and infrastructure initiative. Unlike venture-backed organizations with misaligned exit incentives, TIV operates under founder-led engineering stewardship designed to preserve operational longevity.
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <Link
                  href="/about/leadership"
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-brand"
                >
                  View leadership profile
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="border border-border bg-card p-8">
              <span className="tiv-meta">OPERATIONAL AUTONOMY</span>
              <h3 className="mt-2 font-display text-2xl">Capital Independence</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                TIV maintains strict discipline regarding external capitalization. By operating lean, self-hosted infrastructure and funding development through direct software utilities and engineering reserves, we avoid growth imperatives that compromise user sovereignty or software durability.
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <Link
                  href="/transparency/financials"
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-brand"
                >
                  Review financial reports
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Decision Framework */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Principles"
              title="Architectural decision framework."
              description="How engineering choices, research commitments, and releases are vetted."
            />
          </Reveal>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3" stagger={0.08}>
            <StaggerItem>
              <div className="bg-card p-6 h-full flex flex-col">
                <ShieldCheck className="h-5 w-5 text-brand" />
                <h4 className="mt-4 font-display text-lg font-medium">Sovereignty Over Convenience</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                  We never architect systems dependent on opaque closed-source proprietary APIs where an open protocol exists. If a dependency threatens user control, we build an open replacement.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-card p-6 h-full flex flex-col">
                <Scale className="h-5 w-5 text-brand" />
                <h4 className="mt-4 font-display text-lg font-medium">Provable Honesty</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                  No fabricated uptime, no vanity awards, no exaggerated user counts, and no non-audited claims masquerading as audited facts. All metrics are clearly labeled with their source.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-card p-6 h-full flex flex-col">
                <Compass className="h-5 w-5 text-brand" />
                <h4 className="mt-4 font-display text-lg font-medium">Long Horizon Engineering</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                  We build for decades, not fiscal quarters. Our codebases favor backward compatibility, static linkage, deterministic build trees, and minimal runtime dependencies.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 03 — Commitments & Ethics */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Ethics"
              title="Stewardship commitments."
              description="Concrete rules guiding organizational behavior and public trust."
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="border border-border bg-card p-6">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                <h4 className="font-display text-base">Open-Source Primacy</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                All production software systems (OpenMail, Mercura, M31A, Octate) remain published under permissive or copyleft open-source licenses. We do not practice bait-and-switch re-licensing.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                <h4 className="font-display text-base">Open Technical Research</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Research findings, whitepapers, benchmarks, and experimental negative results are published openly for the broader computing community.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                <h4 className="font-display text-base">Zero Commercial Telemetry Exploitation</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                TIV software contains zero behavioral user tracking, third-party analytics SDKs, or data monetization hooks. Software telemetry is strictly opt-in and local-first.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                <h4 className="font-display text-base">Public Accountability</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Annual transparency reports and management financial estimates are published every fiscal year to ensure full organizational accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation links */}
      <section className="bg-secondary/30">
        <div className="tiv-container py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/transparency"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
          >
            ← Back to Transparency Portal
          </Link>
          <div className="flex gap-4">
            <Link
              href="/transparency/financials"
              className="text-sm font-medium text-brand hover:underline"
            >
              Financial Reports
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              href="/transparency/annual-reports"
              className="text-sm font-medium text-brand hover:underline"
            >
              Annual Reports
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
