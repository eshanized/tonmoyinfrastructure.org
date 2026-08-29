import { PageHeader } from '@/components/shared/page-header';
import { Markdown } from '@/components/shared/markdown';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getLegalDocument } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Software Licensing Policies',
  description: 'Open-source licensing terms and copyright policies governing TIV distributions.',
  path: '/legal/licenses',
  keywords: ['TIV software licenses', 'open source licensing policy', 'copyright policies'],
});

export default function LegalLicensesPage() {
  const doc = getLegalDocument('licenses');

  const pageGraph = generatePageGraph({
    title: 'Software Licensing Policies — Tonmoy Infrastructure and Vision',
    description: 'Open-source licensing terms and copyright policies governing TIV distributions.',
    path: '/legal/licenses',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Legal', item: '/legal' },
      { name: 'Licenses', item: '/legal/licenses' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / LICENSES"
        label="Legal"
        title="Open-source licenses."
        description="Licensing agreements governing TIV systems, repositories, and distributions."
        meta={doc ? [{ label: 'Last Updated', value: doc.lastUpdated }] : []}
      />
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Legal', href: '/legal' },
              { label: 'Licenses' },
            ]}
          />
        </div>
      </section>
      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              {doc && <Markdown content={doc.content} />}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
