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
  path: '/products',
  title: 'Products — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'Software products developed by Tonmoy Infrastructure and Vision, including four stable platforms and Kyro, an open-source desktop AI assistant with a public v0.1.0 Linux release.',
});

export default function ProductsPage() {
  const products = getProjects().filter(
    (p) => p.type === 'software' && p.status === 'Stable Release'
  );
  const kyro = getProjects().find((p) => p.slug === 'kyro');

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  const pageGraph = generatePageGraph({
    pagePath: '/products',
    pageTitle: 'Products — Tonmoy Infrastructure and Vision',
    pageDescription:
      'Four stable software products plus Kyro, an MIT-licensed desktop AI assistant with an early public Linux v0.1.0 release and ongoing development.',
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="PRODUCTS"
        label="Software"
        title="TIV Products."
        description="Browse four stable TIV software applications and Kyro, an MIT-licensed desktop AI assistant with public v0.1.0 Linux downloads and ongoing development."
        meta={[
          { label: 'PORTFOLIO', value: '4 Products' },
          { label: 'STATUS', value: 'Stable Release' },
          { label: 'DEVELOPMENT', value: 'Active' },
          { label: 'DELIVERY', value: 'Shipped' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Stable Releases"
              title="Four stable products."
              description="Built, shipped, and actively maintained. Distinguishing product stability from continuous development."
            />
          </Reveal>

          <StaggerContainer
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
            stagger={0.1}
          >
            {products.map((product) => (
              <StaggerItem key={product.slug}>
                <ProjectCard project={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Ventures in Development Discovery */}
      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-20">
          <div className="flex flex-col justify-between gap-6 border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
            <div>
              <span className="tiv-meta text-brand">VENTURES IN DEVELOPMENT</span>
              <h3 className="mt-2 font-display text-xl tracking-tight">
                Looking for TIV&apos;s Emerging Software Ventures?
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                In addition to our four stable software platforms, explore <strong>Runstead</strong> — our modern SaaS operating system for web hosting businesses featuring multi-tenant PostgreSQL Row-Level Security.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/projects/runstead"
                className="inline-flex items-center gap-1.5 border border-brand bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
              >
                Explore Runstead
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects/"
                className="inline-flex items-center gap-1.5 border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {kyro && (
        <section className="border-t border-border bg-secondary/20">
          <div className="tiv-container py-16 md:py-20">
            <div className="grid grid-cols-1 gap-8 border border-brand/40 bg-card p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <span className="tiv-meta-brand">EARLY PUBLIC RELEASE · ACTIVE DEVELOPMENT</span>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">Kyro — Desktop AI Assistant</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Kyro v0.1.0 is available for Linux x86_64. Its local-first desktop workspace combines computer-use tools,
                  browser automation, document and file workflows, and a developer workbench. It remains under active
                  development and is not yet described as a stable production release.
                </p>
                <p className="mt-3 text-xs text-muted-foreground">MIT License · Tauri 2 · React · TypeScript · Rust</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects/kyro" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-sm font-medium hover:border-brand hover:text-brand">
                  Project profile <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/projects/kyro/downloads" className="inline-flex items-center gap-2 border border-brand bg-brand px-4 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90">
                  Download v0.1.0 <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://kyro.tonmoyinfrastructure.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-sm font-medium hover:border-brand hover:text-brand">
                  Official website <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
