import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    'Version history for TIV software, including stable releases and Kyro v0.1.0, an early public Linux release with direct package downloads and SHA-256 checksums.',
  path: '/releases',
  keywords: ['TIV releases', 'software releases', 'changelogs', 'OpenMail release', 'Mercura release', 'Kyro v0.1.0', 'Kyro Linux download', 'Kyro AppImage', 'Kyro Debian package', 'Kyro Arch package', 'Kyro RPM', 'SHA-256 checksums'],
});

export default function ReleasesPage() {
  const releases = getReleases();
  const projects = getProjects().filter((p) => p.status === 'Stable Release');
  const kyro = getProjects().find((p) => p.slug === 'kyro');

  const pageGraph = generatePageGraph({
    title: 'Software Releases & Changelogs — Tonmoy Infrastructure and Vision',
    description:
      'Version history for TIV software, including stable releases and Kyro v0.1.0, an early public Linux release with direct package downloads and SHA-256 checksums.',
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
        description="Version history for stable TIV software and early public releases. Kyro v0.1.0 is available for Linux x86_64 with official installer packages and checksums."
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

      {kyro && (
        <section className="border-t border-border bg-secondary/20">
          <div className="tiv-container py-14 md:py-18">
            <Reveal>
              <SectionHeader
                index="02"
                label="Early Public Release"
                title="Kyro v0.1.0 for Linux."
                description="Kyro has a public Linux x86_64 release, separate from TIV’s four products classified as stable. Download assets and checksums are maintained in its official GitHub release."
              />
            </Reveal>
            <div className="mt-8 border border-border bg-card p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-lg font-semibold text-brand">v0.1.0</span>
                    <StatusBadge status="Preview" />
                    <span className="font-mono text-xs text-muted-foreground">Published 21 Oct 2026</span>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Initial Linux multi-distro release for a local-first desktop AI assistant built with Tauri 2, Rust, and React.
                    The product remains in active development and is not claimed to be a stable production release.
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">Linux packages: .deb, .rpm, .pkg.tar.zst, AppImage, portable .tar.gz, SHA-256 manifest.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="https://github.com/eshanized/Kyro/releases/tag/v0.1.0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-sm font-medium hover:border-brand hover:text-brand">
                    Release notes <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link href="/projects/kyro/downloads" className="inline-flex items-center gap-2 border border-brand bg-brand px-4 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90">
                    Download Kyro <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="https://kyro.tonmoyinfrastructure.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-sm font-medium hover:border-brand hover:text-brand">
                    Official website <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
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
