import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { ProjectCard } from '@/components/shared/project-card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getProjects } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  path: '/projects',
  title: 'Software & Systems Portfolio — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'Stable release software platforms, infrastructure systems, and research projects built and shipped by Tonmoy Infrastructure and Vision.',
});

export default function ProjectsPage() {
  const projects = getProjects().filter((p) => p.status === 'Stable Release');

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];

  const pageGraph = generatePageGraph({
    pagePath: '/projects',
    pageTitle: 'Software & Systems Portfolio — Tonmoy Infrastructure and Vision',
    pageDescription:
      'Stable release software platforms, infrastructure systems, and research projects built and shipped by Tonmoy Infrastructure and Vision.',
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="PROJECTS"
        label="Software Portfolio"
        title="Shipped software systems."
        description="TIV has built and shipped four stable release software platforms — OpenMail, Mercura, M31A, and Octate. Each system addresses a concrete infrastructure problem."
        meta={[
          { label: 'PORTFOLIO', value: '4 Systems' },
          { label: 'STATUS', value: 'Stable Release' },
          { label: 'DEVELOPMENT', value: 'Active' },
          { label: 'PHILOSOPHY', value: 'Self-Reliant' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Stable Portfolio"
              title="Four systems built and shipped."
              description="These are complete stable releases, not upcoming concepts or prototypes. Active development continues on each."
            />
          </Reveal>

          <StaggerContainer
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
            stagger={0.1}
          >
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* AI & Experimental Work Discovery */}
      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-20">
          <div className="flex flex-col justify-between gap-6 border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
            <div>
              <span className="tiv-meta text-brand">OPEN TECHNICAL WORK & RESEARCH</span>
              <h3 className="mt-2 font-display text-xl tracking-tight">
                Looking for TIV&apos;s AI Models and Experimental Checkpoints?
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                In addition to our four stable software platforms, TIV publishes AI research models (M31Genesis, M31Tesla, M31Entropy) and Space demos on Hugging Face and GitHub.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/technology/ai"
                className="inline-flex items-center gap-1.5 border border-brand bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90"
              >
                AI / ML Portal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/open-source"
                className="inline-flex items-center gap-1.5 border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Open Technical Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
