import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getPublications } from '@/lib/content';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Publications & Technical Papers',
  description:
    'TIV research publications, technical reports, empirical findings, and peer-reviewed software engineering manuscripts.',
  path: '/research/publications',
  keywords: ['TIV publications', 'research papers', 'technical reports', 'software engineering research'],
});

export default function PublicationsPage() {
  const publications = getPublications();

  const pageGraph = generatePageGraph({
    title: 'Publications & Technical Papers — Tonmoy Infrastructure and Vision',
    description:
      'TIV research publications, technical reports, empirical findings, and peer-reviewed software engineering manuscripts.',
    path: '/research/publications',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Research', item: '/research' },
      { name: 'Publications', item: '/research/publications' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="PUBLICATIONS"
        label="Research"
        title="Publications."
        description="Research papers, technical reports, and experimental findings from TIV's research activities."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Research', href: '/research' },
              { label: 'Publications' },
            ]}
          />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          {publications.length === 0 ? (
            <div className="border border-border bg-card p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No publications have been published yet. Research is in progress.
              </p>
            </div>
          ) : (
            <StaggerContainer className="space-y-px" stagger={0.08}>
              {publications.map((pub) => (
                <StaggerItem key={pub.slug}>
                  <Link
                    href={`/research/publications/${pub.slug}`}
                    className="group relative grid grid-cols-1 gap-4 border border-border bg-card p-6 transition-colors hover:border-brand/40 md:grid-cols-[140px_120px_1fr_auto] md:items-center"
                  >
                    <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    <span className="font-mono text-xs text-muted-foreground">
                      {pub.identifier}
                    </span>
                    <StatusBadge status={pub.status} />
                    <div>
                      <h3 className="font-display text-lg transition-colors group-hover:text-brand">
                        {pub.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {pub.area} · v{pub.version} · {pub.date}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {pub.authors.join(', ')}
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
