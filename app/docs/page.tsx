import Link from 'next/link';
import { ArrowRight, FileText, BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getDocLinks } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Technical Documentation & Guides',
  description:
    'Comprehensive technical documentation directory for TIV systems, APIs, deployment playbooks, and research specifications.',
  path: '/docs',
  keywords: ['TIV documentation', 'technical guides', 'API documentation', 'architecture specs'],
});

export default function DocsPage() {
  const docs = getDocLinks();
  const categories = Array.from(new Set(docs.map((d) => d.category)));

  const pageGraph = generatePageGraph({
    title: 'Technical Documentation & Guides — Tonmoy Infrastructure and Vision',
    description:
      'Comprehensive technical documentation directory for TIV systems, APIs, deployment playbooks, and research specifications.',
    path: '/docs',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Documentation', item: '/docs' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="DOCS"
        label="Knowledge"
        title="Documentation."
        description="A directory of documentation for TIV projects, infrastructure, and research. Documentation links are added as they become available."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Documentation' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          {categories.map((cat, catIdx) => {
            const catDocs = docs.filter((d) => d.category === cat);
            return (
              <div key={cat} className={catIdx > 0 ? 'mt-16' : ''}>
                <Reveal>
                  <SectionHeader
                    index={String(catIdx + 1).padStart(2, '0')}
                    label={cat}
                    title={`${cat} documentation.`}
                  />
                </Reveal>
                <StaggerContainer className="mt-8 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2" stagger={0.06}>
                  {catDocs.map((doc) => (
                    <StaggerItem key={doc.slug}>
                      <div className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80">
                        <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-brand" aria-hidden="true" />
                          <h3 className="font-display text-base font-medium transition-colors group-hover:text-brand">
                            {doc.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                          {doc.description}
                        </p>
                        {doc.available && doc.externalUrl ? (
                          <Link
                            href={doc.externalUrl}
                            className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                          >
                            View
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        ) : (
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                            Not yet available
                          </span>
                        )}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            );
          })}

          {docs.length === 0 && (
            <div className="border border-border bg-card p-12">
              <Callout type="info" title="No Documentation Available">
                Documentation will be added as projects reach usable states and
                external documentation systems are configured.
              </Callout>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
