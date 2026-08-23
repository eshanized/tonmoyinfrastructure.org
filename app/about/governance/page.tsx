import Link from 'next/link';
import { ArrowRight, Scale, ShieldCheck, FileText, FlaskConical, GitBranch, Building2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Governance Principles & Decision Process',
  description:
    "TIV's approach to governance — corporate responsibility, technical accountability, financial stewardship, and open-source commitments.",
  path: '/about/governance',
  keywords: ['TIV governance', 'governance principles', 'decision process', 'open source stewardship'],
});

const governanceAreas = [
  {
    icon: Building2,
    label: 'Corporate Responsibility',
    description:
      'TIV operates as a single organization building across software, infrastructure, and research. Corporate decisions are made by the founder with a commitment to long-term sustainability over short-term growth.',
  },
  {
    icon: Scale,
    label: 'Technical Accountability',
    description:
      'TIV is accountable for the software and infrastructure it builds. Systems are documented, decisions are explained, and architecture is published where security permits.',
  },
  {
    icon: ShieldCheck,
    label: 'Security Responsibility',
    description:
      'TIV maintains a security disclosure policy and publishes advisories. Security is treated as an engineering responsibility, not a compliance exercise.',
  },
  {
    icon: FileText,
    label: 'Financial Transparency',
    description:
      'TIV publishes annual financial summaries. Figures are presented honestly — including when they are management estimates rather than audited statements.',
  },
  {
    icon: FlaskConical,
    label: 'Research Integrity',
    description:
      'TIV does not claim peer review, results, or capabilities that do not exist. Research is published openly, including negative results and incomplete findings.',
  },
  {
    icon: GitBranch,
    label: 'Open Source Responsibility',
    description:
      'TIV\'s software is open source. Infrastructure should be inspectable and ownable. TIV is responsible for maintaining and documenting the software it publishes.',
  },
];

export default function GovernancePage() {
  const pageGraph = generatePageGraph({
    title: 'Governance Principles & Decision Process — Tonmoy Infrastructure and Vision',
    description:
      "TIV's approach to governance — corporate responsibility, technical accountability, financial stewardship, and open-source commitments.",
    path: '/about/governance',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'About', item: '/about' },
      { name: 'Governance', item: '/about/governance' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="ABOUT / GOVERNANCE"
        label="Structure"
        title="How TIV is governed."
        description="TIV's approach to governance — without inventing a formal corporate structure. This page describes how decisions are made, what TIV is accountable for, and how the organization intends to formalize its governance over time."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Current Governance Status">
            TIV does not currently have a formal board of directors or committee structure.
            The organization is led by its founder. Governance will be formalized as the
            organization grows. This page describes the principles that guide that process.
          </Callout>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Areas"
              title="What governance covers."
              description="TIV's governance spans six areas of responsibility. Each area reflects a commitment the organization makes publicly."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {governanceAreas.map((area) => (
              <StaggerItem key={area.label}>
                <div className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <area.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg tracking-tight transition-colors group-hover:text-brand">
                    {area.label}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Principles"
              title="Governance principles."
              description="The principles that guide how TIV is governed today and how governance will evolve."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="max-w-2xl space-y-6">
              <div className="border-l-2 border-brand pl-6">
                <h3 className="font-display text-lg tracking-tight">Transparency by default</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  TIV publishes what it can without exposing what it shouldn't. Governance
                  decisions, financial information, and security practices are published by
                  default, not by exception.
                </p>
              </div>
              <div className="border-l-2 border-border pl-6">
                <h3 className="font-display text-lg tracking-tight">Engineering-led</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  Decisions are made by people who build the systems. TIV is an engineering
                  organization, not a marketing organization with an engineering department.
                </p>
              </div>
              <div className="border-l-2 border-border pl-6">
                <h3 className="font-display text-lg tracking-tight">No false claims</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  TIV does not claim certifications, partnerships, board members, or
                  organizational structures that do not exist. Information is published only
                  when it is verified.
                </p>
              </div>
              <div className="border-l-2 border-border pl-6">
                <h3 className="font-display text-lg tracking-tight">Progressive formalization</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  Governance will be formalized as the organization grows. The current
                  structure — founder-led — is stated honestly. Future structures will be
                  documented when they exist.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Related"
              title="Connected information."
              description="Governance information is connected to TIV's transparency architecture."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              <Link
                href="/about/leadership"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">PEOPLE</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Leadership
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Founder profile and leadership structure.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link
                href="/transparency/financials"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">FINANCIAL</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Financial Reports
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Annual financial summaries and statements.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link
                href="/security"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">SECURITY</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Security
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Disclosure policy and security advisories.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
