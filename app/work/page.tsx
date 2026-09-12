import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { ProjectCard } from '@/components/shared/project-card';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { TivIcon } from '@/components/shared/tiv-icon';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getProjects, getWorkCategories } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  path: '/work',
  title: 'Work — Projects & Products — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'TIV projects across software, internet infrastructure, network infrastructure, and foundational research.',
});

const categoryIcons: Record<string, string> = {
  Software: 'code',
  'Internet Infrastructure': 'globe',
  'Network Infrastructure': 'network',
  Research: 'flask',
};

export default function WorkPage() {
  const projects = getProjects();
  const categories = getWorkCategories();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ];

  const pageGraph = generatePageGraph({
    pagePath: '/work',
    pageTitle: 'Work — Projects & Products — Tonmoy Infrastructure and Vision',
    pageDescription:
      'TIV projects across software, internet infrastructure, network infrastructure, and foundational research.',
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="WORK"
        label="Projects & Products"
        title="What we build."
        description="TIV builds and ships practical software infrastructure. Four stable release products — OpenMail, Mercura, M31A, and Octate — plus infrastructure services and fundamental research."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader label="Categories" title="Four categories of work." />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2" stagger={0.08}>
            {categories.map((cat) => (
              <StaggerItem key={cat.number}>
                <div className="group relative bg-card p-8">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-5xl font-bold tracking-tight text-muted-foreground/20 transition-colors group-hover:text-brand">
                        {cat.number}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all group-hover:border-brand/40 group-hover:text-brand">
                        <TivIcon name={categoryIcons[cat.title] || 'code'} size={18} />
                      </div>
                    </div>
                    <StatusBadge status={cat.status} />
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-tight transition-colors group-hover:text-brand">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader label="All Projects" title="Project portfolio." />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
