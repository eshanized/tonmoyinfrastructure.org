import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { StatusBadge } from '@/components/shared/status-badge';
import { getReleases } from '@/lib/institutional';
import { getProjects } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Software Releases & Changelogs',
  description:
    'Version history, release changelogs, and checksums for TIV stable software systems: OpenMail, Mercura, M31A, and Octate.',
  path: '/releases',
  keywords: ['TIV releases', 'software releases', 'changelogs', 'OpenMail release', 'Mercura release'],
});

export default function ReleasesPage() {
  const releases = getReleases();
  const projects = getProjects().filter((p) => p.status === 'Stable Release');

  const pageGraph = generatePageGraph({
    title: 'Software Releases & Changelogs — Tonmoy Infrastructure and Vision',
    description:
      'Version history, release changelogs, and checksums for TIV stable software systems: OpenMail, Mercura, M31A, and Octate.',
    path: '/releases',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Releases', item: '/releases' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="RELEASES"
        label="Software"
        title="Releases."
        description="Version history and release notes for TIV software projects. TIV builds and ships stable software — only real releases are listed."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Releases' }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Stable Software"
              title="Shipped systems."
              description="Four stable release software products — built, shipped, and maintained by TIV."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              {projects.map((project) => (
                <div key={project.slug} className="bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg tracking-tight">{project.title}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Release Notes"
              title="Version history."
              description="Detailed release notes for each TIV software project. Release records will appear here as they are documented."
            />
          </Reveal>
          {releases.length === 0 ? (
            <div className="mt-10 border border-border bg-card p-12">
              <Callout type="info" title="Release Notes Coming">
                TIV has shipped stable releases for all four software products.
                Detailed release notes and version history will be published here
                as they are documented. TIV does not fabricate release notes or
                version numbers.
              </Callout>
            </div>
          ) : (
            <Reveal delay={0.1} className="mt-10">
              <div className="space-y-px border border-border bg-border">
                {releases.map((release) => (
                  <div key={release.slug} className="bg-card p-6">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-lg tracking-tight">
                        {release.version}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        {release.date}
                      </span>
                    </div>
                    {release.notes.map((note) => (
                      <div key={note.type} className="mt-4">
                        <span className="tiv-meta">{note.type}</span>
                        <ul className="mt-2 space-y-1">
                          {note.items.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              — {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
