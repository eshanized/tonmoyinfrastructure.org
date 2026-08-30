import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getRepos } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Open Source License Directory',
  description:
    'Confirmed open-source licenses governing Tonmoy Infrastructure and Vision software, libraries, and tools.',
  path: '/licenses',
  keywords: ['TIV licenses', 'open source software licenses', 'software licensing directory'],
});

export default function LicensesPage() {
  const repos = getRepos();

  const pageGraph = generatePageGraph({
    title: 'Open Source License Directory — Tonmoy Infrastructure and Vision',
    description:
      'Confirmed open-source licenses governing Tonmoy Infrastructure and Vision software, libraries, and tools.',
    path: '/licenses',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Licenses', item: '/licenses' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LICENSES"
        label="Legal"
        title="License directory."
        description="Licensing information for TIV software projects. Only confirmed licenses are shown — projects without a determined license are clearly marked."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Licenses' }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Confirmed Licenses Only">
            TIV only displays licenses that are actually confirmed for each
            project. Projects in research or planning phases may not have a
            license determined yet — this is stated honestly rather than
            assuming a default license.
          </Callout>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Projects"
              title="Project licenses."
              description="License and repository information for each TIV software project."
            />
          </Reveal>
          <StaggerContainer className="mt-10 space-y-px border border-border bg-border" stagger={0.06}>
            {repos.map((repo) => (
              <StaggerItem key={repo.slug}>
                <div className="bg-card p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_120px_120px_120px]">
                    <div>
                      <h3 className="font-display text-base font-medium tracking-tight">
                        {repo.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {repo.description}
                      </p>
                    </div>
                    <div>
                      <span className="tiv-meta">License</span>
                      <p className="mt-1 text-sm font-mono">
                        {repo.license || '—'}
                      </p>
                    </div>
                    <div>
                      <span className="tiv-meta">Language</span>
                      <p className="mt-1 text-sm font-mono">
                        {repo.language || '—'}
                      </p>
                    </div>
                    <div>
                      <span className="tiv-meta">Repository</span>
                      <p className="mt-1 text-sm">
                        {repo.repository ? (
                          <a
                            href={repo.repository}
                            className="text-brand hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-muted-foreground/60">Not yet public</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/work/${repo.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                    >
                      View project
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
