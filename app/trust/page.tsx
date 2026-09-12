import Link from 'next/link';
import { ArrowRight, Shield, Lock, FileText, Scale, Eye, Accessibility, GitBranch } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Trust Center & Verification Portal',
  description:
    'Consolidated trust portal for Tonmoy Infrastructure and Vision — security disclosures, privacy practices, terms of service, open-source licenses, accessibility, and governance.',
  path: '/trust',
  keywords: ['TIV trust', 'trust center', 'compliance', 'security verification', 'privacy', 'open governance'],
});

const trustAreas = [
  { icon: Shield, label: 'Security', description: 'Security overview, vulnerability disclosure, and advisories.', href: '/security' },
  { icon: Lock, label: 'Privacy', description: 'How TIV handles information and protects privacy.', href: '/privacy' },
  { icon: FileText, label: 'Terms', description: 'Terms governing use of TIV services and software.', href: '/terms' },
  { icon: Scale, label: 'Licenses', description: 'Project licensing and open-source license directory.', href: '/licenses' },
  { icon: Accessibility, label: 'Accessibility', description: 'TIV\'s commitment to accessible technology.', href: '/accessibility' },
  { icon: Eye, label: 'Transparency', description: 'Financial reporting, annual reports, and operational transparency.', href: '/transparency' },
  { icon: GitBranch, label: 'Governance', description: 'How TIV is governed and held accountable.', href: '/about/governance' },
];

export default function TrustPage() {
  const pageGraph = generatePageGraph({
    title: 'Trust Center & Verification Portal — Tonmoy Infrastructure and Vision',
    description:
      'Consolidated trust portal for Tonmoy Infrastructure and Vision — security disclosures, privacy practices, terms of service, open-source licenses, accessibility, and governance.',
    path: '/trust',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Trust', item: '/trust' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="TRUST"
        label="Verification"
        title="Trust center."
        description="How can I verify and responsibly interact with TIV? This is the consolidated trust portal — security, privacy, terms, licenses, accessibility, transparency, and governance in one place."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Trust' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Areas"
              title="What trust covers."
              description="TIV's trust architecture spans seven areas. Each area reflects a commitment to being verifiable and accountable."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {trustAreas.map((area) => (
              <StaggerItem key={area.label}>
                <Link
                  href={area.href}
                  className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <area.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg tracking-tight transition-colors group-hover:text-brand">
                    {area.label}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                    View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Principle"
              title="Trust through transparency."
              description="TIV earns trust by being transparent — not by asking for it. Information is published by default, not by exception."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="max-w-2xl space-y-6">
              <div className="border-l-2 border-brand pl-6">
                <h3 className="font-display text-lg tracking-tight">No fake claims</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  TIV does not claim certifications, partnerships, or
                  organizational structures that do not exist.
                </p>
              </div>
              <div className="border-l-2 border-border pl-6">
                <h3 className="font-display text-lg tracking-tight">Published by default</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  Financial information, security practices, and governance are
                  published by default — not revealed only when asked.
                </p>
              </div>
              <div className="border-l-2 border-border pl-6">
                <h3 className="font-display text-lg tracking-tight">Open source</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  TIV software is open source. Infrastructure should be
                  inspectable and ownable.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
