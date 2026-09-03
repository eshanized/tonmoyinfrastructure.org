import Link from 'next/link';
import { ArrowRight, FileText, FlaskConical, Database, BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { TivIcon, getResearchAreaIcon } from '@/components/shared/tiv-icon';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getResearchAreas, getPublications } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  path: '/research',
  title: 'Research — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'TIV research across artificial intelligence, networking, fiber optics, distributed systems, systems engineering, and developer infrastructure.',
});

const sectionLinks = [
  { label: 'Research Areas', href: '/research/areas', icon: FlaskConical },
  { label: 'Experiments', href: '/research/experiments', icon: Database },
  { label: 'Whitepaper', href: '/research/whitepaper', icon: FileText },
  { label: 'Publications', href: '/research/publications', icon: BookOpen },
];

export default function ResearchPage() {
  const areas = getResearchAreas();
  const publications = getPublications();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
  ];

  const pageGraph = generatePageGraph({
    pagePath: '/research',
    pageTitle: 'Research — Tonmoy Infrastructure and Vision',
    pageDescription:
      'TIV research across artificial intelligence, networking, fiber optics, distributed systems, systems engineering, and developer infrastructure.',
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="RESEARCH"
        label="Research Portal"
        title="Research as a first-class activity."
        description="TIV treats research as fundamental, not peripheral. We investigate AI, networking, fiber optics, distributed systems, and systems engineering — and publish openly."
      />

      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-8">
          <StaggerContainer className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4" stagger={0.06}>
            {sectionLinks.map((link) => (
              <StaggerItem key={link.label}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-3 bg-card p-4 transition-colors hover:bg-card/80"
                >
                  <link.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  <span className="text-sm font-medium">{link.label}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Whitepaper highlight */}
      <section className="border-b border-border">
        <div className="tiv-container py-12">
          <Reveal>
            <Link
              href="/research/whitepaper"
              className="group relative flex flex-col gap-4 border border-border bg-card p-6 transition-colors hover:border-brand/40 md:flex-row md:items-center md:justify-between"
            >
              <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-border text-brand transition-all group-hover:border-brand/40">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="tiv-meta-brand">TIV Infrastructure Whitepaper</span>
                  <h3 className="mt-1 font-display text-xl tracking-tight transition-colors group-hover:text-brand">
                    What TIV is building, and why.
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Vision and technical-position document. v1.0 — Sept 2026.
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="areas" className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              label="Research Areas"
              title="Six areas of investigation."
              description="TIV's research spans the foundational layers of computing and infrastructure."
              link={{ label: 'Detailed areas breakdown', href: '/research/areas' }}
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {areas.map((area, i) => (
              <StaggerItem key={area.slug}>
                <div className="group relative bg-card p-6">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-all group-hover:border-brand/40 group-hover:text-brand">
                        <TivIcon name={getResearchAreaIcon(area.icon)} size={16} />
                      </div>
                    </div>
                    <span className="tiv-meta">RESEARCH</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl tracking-tight transition-colors group-hover:text-brand">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {area.description}
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
            <SectionHeader
              label="Publications"
              title="Recent publications."
              description="Research papers, technical reports, and experimental findings."
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
            {publications.length === 0 && (
              <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                No publications yet. Research is in progress.
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
