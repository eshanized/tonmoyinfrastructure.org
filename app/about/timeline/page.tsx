import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getTimelineEvents } from '@/lib/institutional';
import { getProjects } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Milestones & Organizational Timeline',
  description:
    "Visual timeline of verified milestones in TIV's history — foundation, software releases, research papers, and infrastructure development.",
  path: '/about/timeline',
  keywords: ['TIV timeline', 'milestones', 'software releases', 'organizational history'],
});

const categoryColors: Record<string, string> = {
  Foundation: 'bg-brand',
  Software: 'bg-blue-500',
  Infrastructure: 'bg-amber-500',
  Research: 'bg-emerald-500',
  Organization: 'bg-purple-500',
  Publication: 'bg-cyan-500',
};

export default function TimelinePage() {
  const events = getTimelineEvents();
  const projects = getProjects();

  const pageGraph = generatePageGraph({
    title: 'Milestones & Organizational Timeline — Tonmoy Infrastructure and Vision',
    description:
      "Visual timeline of verified milestones in TIV's history — foundation, software releases, research papers, and infrastructure development.",
    path: '/about/timeline',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'About', item: '/about' },
      { name: 'Timeline', item: '/about/timeline' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="ABOUT / TIMELINE"
        label="History"
        title="Timeline."
        description="Verified milestones in TIV's history. Only confirmed dates and events are shown — no dates are fabricated to make the timeline look more complete."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'About', href: '/about' },
              { label: 'Timeline' },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Verified Milestones Only">
            This timeline includes only events with confirmed dates. TIV does
            not invent historical milestones. As the organization grows, new
            milestones will be added.
          </Callout>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Milestones"
              title="Verified events."
              description="A chronological record of TIV's milestones, from foundation through software releases and research."
            />
          </Reveal>

          <StaggerContainer className="mt-12 max-w-3xl" stagger={0.08}>
            {events.map((event, i) => {
              const project = event.relatedProject
                ? projects.find((p) => p.slug === event.relatedProject)
                : null;
              return (
                <StaggerItem key={event.id}>
                  <div className="relative flex gap-6 pb-12 last:pb-0">
                    {/* Line */}
                    {i < events.length - 1 && (
                      <div className="absolute left-[7px] top-4 h-full w-px bg-border" />
                    )}
                    {/* Dot */}
                    <div className="relative z-10 mt-1.5">
                      <div
                        className={`h-3.5 w-3.5 rounded-full border-2 border-background ${categoryColors[event.category] || 'bg-brand'}`}
                      />
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-mono text-sm text-brand">
                          {event.year}
                          {event.month && `·${event.month}`}
                        </span>
                        <span className="tiv-meta">{event.category}</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg tracking-tight">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                      {project && (
                        <Link
                          href={`/work/${project.slug}`}
                          className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                        >
                          {project.title}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {events.length === 0 && (
            <div className="border border-border bg-card p-12">
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                No verified timeline events are available yet. Milestones will be
                added as they are confirmed.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Category legend */}
      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-12">
          <Reveal>
            <span className="tiv-meta mb-4 block">Categories</span>
            <div className="flex flex-wrap gap-4">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${color}`} />
                  <span className="text-sm text-muted-foreground">{cat}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
