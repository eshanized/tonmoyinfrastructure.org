import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WhitepaperHeader } from '@/components/whitepaper/whitepaper-header';
import { WhitepaperTOC } from '@/components/whitepaper/whitepaper-toc';
import { WhitepaperSection } from '@/components/whitepaper/whitepaper-section';
import { ReferenceList } from '@/components/whitepaper/reference-list';
import { PrincipleCards } from '@/components/whitepaper/principle-cards';
import { WhitepaperSystemDiagram, OpticalPathDiagram, SelfHostingStackDiagram } from '@/components/whitepaper/whitepaper-diagrams';
import { ReadingProgress } from '@/components/shared/reading-progress';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import { getWhitepaper, getWhitepaperVersion } from '@/lib/whitepaper';

import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { siteConfig } from '@/lib/site-config';

export function generateStaticParams() {
  const wp = getWhitepaper();
  return wp.versions.map((v) => ({ version: `v${v.version}` }));
}

export function generateMetadata({
  params,
}: {
  params: { version: string };
}): Metadata {
  const wp = getWhitepaperVersion(params.version);
  if (!wp) return {};
  return generatePageMetadata({
    path: `/research/whitepaper/v${wp.version}`,
    title: `TIV Infrastructure Whitepaper v${wp.version} — Tonmoy Infrastructure and Vision`,
    overrideTitle: true,
    description: wp.abstract,
    ogType: 'article',
  });
}

export default function WhitepaperVersionPage({
  params,
}: {
  params: { version: string };
}) {
  const wp = getWhitepaperVersion(params.version);
  if (!wp) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Whitepaper', path: '/research/whitepaper' },
    { name: `v${wp.version}`, path: `/research/whitepaper/v${wp.version}` },
  ];

  const whitepaperEntity = {
    '@type': 'TechArticle',
    '@id': `${siteConfig.url}/research/whitepaper/v${wp.version}/#article`,
    headline: `TIV Infrastructure Whitepaper v${wp.version}`,
    description: wp.abstract,
    url: `${siteConfig.url}/research/whitepaper/v${wp.version}`,
    version: wp.version,
    datePublished: '2026-09-01',
    author: {
      '@id': `${siteConfig.url}/#organization`,
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };

  const pageGraph = generatePageGraph({
    pagePath: `/research/whitepaper/v${wp.version}`,
    pageTitle: `TIV Infrastructure Whitepaper v${wp.version} — Tonmoy Infrastructure and Vision`,
    pageDescription: wp.abstract,
    breadcrumbs,
    entities: [whitepaperEntity],
  });

  const tocItems = wp.sections.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
  }));

  const philosophyIdx = wp.sections.findIndex((s) => s.id === 'infrastructure-philosophy');
  const opticalIdx = wp.sections.findIndex((s) => s.id === 'optical-infrastructure');
  const selfHostedIdx = wp.sections.findIndex((s) => s.id === 'self-hosted-infrastructure');

  return (
    <>
      <JsonLd data={pageGraph} />
      <ReadingProgress />

      <section className="relative overflow-hidden border-b border-border tiv-grid">
        <div className="tiv-container relative py-16 md:py-24">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span className="tiv-meta-brand">
                TIV Infrastructure Whitepaper — v{wp.version}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="max-w-3xl text-balance font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Building infrastructure that people can{' '}
              <span className="text-brand">understand</span>,{' '}
              <span className="text-brand">operate</span>,{' '}
              <span className="text-brand">own</span>, and{' '}
              <span className="text-brand">depend on</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {wp.abstract}
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-16">
            <div className="border border-border bg-card/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="tiv-meta">System Topology</span>
                <span className="tiv-meta-brand">TIV</span>
              </div>
              <WhitepaperSystemDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Research', href: '/research' },
              { label: 'Whitepaper', href: '/research/whitepaper' },
              { label: `v${wp.version}` },
            ]}
          />
          <div className="mt-6">
            <WhitepaperHeader wp={wp} />
          </div>
        </div>
      </section>

      <section>
        <div className="tiv-container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
            <div>
              <WhitepaperTOC items={tocItems} />
            </div>
            <div className="min-w-0 max-w-3xl">
              <Callout type="info" title="About This Document">
                This is version {wp.version} of the TIV Infrastructure Whitepaper.
                The latest version is always available at{' '}
                <a href="/research/whitepaper" className="text-brand underline-offset-4 hover:underline">
                  /research/whitepaper
                </a>.
              </Callout>

              {wp.sections.map((section, i) => (
                <div key={section.id}>
                  <WhitepaperSection
                    section={section}
                    sections={wp.sections}
                    index={i}
                  />
                  {i === philosophyIdx && (
                    <div className="mt-8">
                      <Reveal>
                        <span className="tiv-meta mb-4 block">The Four Principles</span>
                        <PrincipleCards />
                      </Reveal>
                    </div>
                  )}
                  {i === opticalIdx && (
                    <div className="mt-8 border border-border bg-card/50 p-6">
                      <span className="tiv-meta mb-4 block">Optical Transmission Path</span>
                      <OpticalPathDiagram />
                    </div>
                  )}
                  {i === selfHostedIdx && (
                    <div className="mt-8 border border-border bg-card/50 p-6">
                      <span className="tiv-meta mb-4 block">Self-Hosting Stack</span>
                      <SelfHostingStackDiagram />
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-16 border-t border-border pt-12">
                <h2 className="font-display text-2xl tracking-tight">References</h2>
                <div className="mt-6">
                  <ReferenceList references={wp.references} />
                </div>
              </div>

              <div className="mt-12 border-t border-border pt-12">
                <h2 className="font-display text-2xl tracking-tight">Version History</h2>
                <div className="mt-6 space-y-px">
                  {wp.versions.map((v) => (
                    <div key={v.version} className="border border-border bg-card p-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-medium">v{v.version}</span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-green-600 dark:text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            {v.status}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">{v.publishedAt}</span>
                        </div>
                        {v.pdf && (
                          <a href={v.pdf} className="text-sm font-medium text-brand">Download PDF</a>
                        )}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.changeSummary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
