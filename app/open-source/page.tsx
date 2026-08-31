import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PublicTechnicalFootprint } from '@/components/shared/public-technical-footprint';
import { OpenTechnicalWorkView } from '@/components/open-source/open-technical-work-view';
import { getTechnicalArtifacts } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  path: '/open-source',
  title: 'Open Technical Work — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'TIV open-source repositories, AI models, spaces, research publications, and developer tooling across GitHub and Hugging Face.',
});

export default function OpenSourcePage() {
  const artifacts = getTechnicalArtifacts();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Open Technical Work', path: '/open-source' },
  ];

  const pageGraph = generatePageGraph({
    pagePath: '/open-source',
    pageTitle: 'Open Technical Work — Tonmoy Infrastructure and Vision',
    pageDescription:
      'TIV open-source repositories, AI models, spaces, research publications, and developer tooling across GitHub and Hugging Face.',
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="OPEN SOURCE"
        label="Public Technical Footprint"
        title="OPEN TECHNICAL WORK"
        description="TIV develops software, sovereign AI models, interactive Spaces, research frameworks, and developer tools in the open. We believe critical infrastructure should be inspectable, auditable, and ownable without confusing different artifact lifecycles."
        meta={[
          { label: 'ECOSYSTEM', value: 'GitHub + Hugging Face' },
          { label: 'STATUS AUDIT', value: 'Explicit Lifecycles' },
          { label: 'METRICS', value: 'Authoritative / Verified' },
          { label: 'GOVERNANCE', value: 'TIV vs Founder Distinctions' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Open Technical Work' }]} />
        </div>
      </section>

      {/* 01 — PUBLIC TECHNICAL FOOTPRINT */}
      <section className="border-b border-border bg-secondary/10">
        <div className="tiv-container py-16 md:py-24">
          <PublicTechnicalFootprint />
        </div>
      </section>

      {/* 02 — METADATA INTEGRITY CALLOUT */}
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Authoritative & Verified Metadata Policy">
            Repository and model statistics (stars, downloads, active runtimes) are kept strictly factual
            based on verified public records, avoiding speculative live polling that might yield stale
            or non-deterministic output. Public technical artifacts are classified by their actual
            type—distinguishing applications, software platforms, AI models, and interactive Spaces.
          </Callout>
        </div>
      </section>

      {/* 03 — OPEN TECHNICAL WORK WITH FILTERS */}
      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              label="Artifact Registry"
              title="Discover TIV public work."
              description="Filter by artifact type across software repositories, AI models, hosted demonstration Spaces, libraries, and developer tools."
            />
          </Reveal>

          <div className="mt-12">
            <OpenTechnicalWorkView artifacts={artifacts} />
          </div>
        </div>
      </section>
    </>
  );
}
