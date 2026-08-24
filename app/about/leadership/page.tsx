import Link from 'next/link';
import { ArrowRight, UserRound, Cpu, GitBranch, Laptop, Server, FlaskConical, Scale } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { FounderLinks, FounderPortrait, SelectedWork, FounderPrinciples } from '@/components/leadership/founder-components';
import { FounderRelationshipDiagram } from '@/components/leadership/founder-relationship-diagram';
import { getFounder, getLeadership } from '@/lib/people';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph, generateFounderPersonSchema } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Leadership & Engineering Stewardship',
  description:
    'Leadership and engineering stewardship for Tonmoy Infrastructure and Vision. Eshan Roy (eshanized), systems engineering, and open-source architecture.',
  path: '/about/leadership',
  keywords: ['TIV leadership', 'Eshan Roy', 'eshanized', 'systems architect', 'open source founder'],
});

const areaIcons: Record<string, typeof Cpu> = {
  'Systems Programming': Cpu,
  Linux: Laptop,
  'Developer Infrastructure': Server,
  'Autonomous Software': FlaskConical,
  'Open Source': GitBranch,
};

export default function LeadershipPage() {
  const founder = getFounder();
  const leadership = getLeadership();

  if (!founder) return null;

  const additionalMembers = leadership.filter((p) => p.slug !== founder.slug);

  const pageGraph = generatePageGraph({
    title: 'Leadership & Engineering Stewardship — Tonmoy Infrastructure and Vision',
    description:
      'Leadership and engineering stewardship for Tonmoy Infrastructure and Vision. Eshan Roy (eshanized), systems engineering, and open-source architecture.',
    path: '/about/leadership',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'About', item: '/about' },
      { name: 'Leadership', item: '/about/leadership' },
    ],
    additionalNodes: [
      generateFounderPersonSchema(),
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />

      <PageHeader
        index="ABOUT / LEADERSHIP"
        label="People"
        title="Built by people who engineer the systems."
        description="TIV is not an anonymous web entity. There is a real engineer and builder behind the organization. This page publishes only verified information."
      />

      {/* Founder profile */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <span className="tiv-meta">FOUNDER</span>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Left: profile content */}
            <Reveal delay={0.1}>
              <div>
                <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
                  {founder.name}
                </h1>
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">
                    @{founder.handle}
                  </span>
                </div>
                <p className="mt-4 font-display text-lg text-brand">
                  {founder.role} · {founder.organization}
                </p>
                <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {founder.summary}
                </p>

                {/* Areas */}
                <div className="mt-8">
                  <span className="tiv-meta">AREAS OF WORK</span>
                  <StaggerContainer className="mt-4 flex flex-wrap gap-2" stagger={0.06}>
                    {founder.areas.map((area) => {
                      const Icon = areaIcons[area] || Cpu;
                      return (
                        <StaggerItem key={area}>
                          <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-sm">
                            <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                            {area}
                          </span>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                </div>

                {/* Links */}
                <div className="mt-8">
                  <span className="tiv-meta">PUBLIC PROFILES</span>
                  <div className="mt-4">
                    <FounderLinks links={founder.links} />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: portrait slot */}
            <Reveal delay={0.2}>
              <FounderPortrait name={founder.name} photo={founder.photo} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Founder Work"
              title="Selected work."
              description="Real projects rather than résumé language. Each entry distinguishes the founder's individual work from TIV organizational projects and open-source contributions."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <SelectedWork work={founder.selectedWork} />
          </Reveal>
        </div>
      </section>

      {/* Founder → TIV relationship diagram */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Relationship"
              title="Founder and organization."
              description="The founder's engineering work and the organization's broader infrastructure direction are connected."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <div className="border border-border bg-card p-6 md:p-10">
              <FounderRelationshipDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering principles */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Principles"
              title="TIV's engineering principles."
              description="These principles inform TIV's work — they are organizational, not attributed to any single individual unless explicitly stated."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <FounderPrinciples />
          </Reveal>
        </div>
      </section>

      {/* Timeline — only if milestones exist */}
      {founder.timeline.length > 0 && (
        <section className="border-b border-border">
          <div className="tiv-container py-16 md:py-24">
            <Reveal>
              <SectionHeader
                index="04"
                label="Timeline"
                title="Milestones."
                description="Verified milestones from the founder's work. Dates are included only where the publication date or history can be confirmed."
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Board / leadership */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index={founder.timeline.length > 0 ? '05' : '04'}
              label="Governance"
              title="Board and leadership."
              description="TIV's leadership structure is being formalized. Information will be published as the organization grows."
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5 text-brand" aria-hidden="true" />
                <span className="tiv-meta-brand">FOUNDER</span>
              </div>
              <p className="mt-4 font-display text-2xl tracking-tight">{founder.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {founder.role} · {founder.organization}
              </p>
            </div>
          </Reveal>

          {additionalMembers.length > 0 ? (
            <StaggerContainer className="mt-px grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2" stagger={0.08}>
              {additionalMembers.map((member) => (
                <StaggerItem key={member.slug}>
                  <div className="group relative flex h-full flex-col bg-card p-6">
                    <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    <span className="tiv-meta">{member.type}</span>
                    <h4 className="mt-2 font-display text-lg font-medium">{member.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <Reveal delay={0.15} className="mt-px">
              <div className="border border-border bg-card p-8">
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  No additional leadership or board members are publicly listed at this time.
                  Additional leadership and governance information will be published as the
                  organization formalizes its governance structure.
                </p>
                <Link
                  href="/about/governance"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                >
                  Read about TIV's governance approach
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Info callout */}
      <section>
        <div className="tiv-container py-8">
          <Callout type="info" title="Verified Information Only">
            TIV does not fabricate leadership, board members, advisors, or organizational
            history. Only verified information is published. Where information is not yet
            available, it is omitted.
          </Callout>
        </div>
      </section>
    </>
  );
}
