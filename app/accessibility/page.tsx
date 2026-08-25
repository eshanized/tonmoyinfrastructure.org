import { PageHeader } from '@/components/shared/page-header';
import { Markdown } from '@/components/shared/markdown';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getLegalDocument } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Accessibility Statement & Standards',
  description:
    'TIV commitment to digital accessibility, WCAG 2.2 AA standards, semantic markup, and assistive technology compatibility.',
  path: '/accessibility',
  keywords: ['TIV accessibility', 'WCAG 2.2 AA', 'assistive technology', 'accessible design'],
});

export default function RootAccessibilityPage() {
  const doc = getLegalDocument('accessibility');

  const pageGraph = generatePageGraph({
    title: 'Accessibility Statement & Standards — Tonmoy Infrastructure and Vision',
    description:
      'TIV commitment to digital accessibility, WCAG 2.2 AA standards, semantic markup, and assistive technology compatibility.',
    path: '/accessibility',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Accessibility Statement', item: '/accessibility' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / ACCESSIBILITY"
        label="Accessibility"
        title="Accessibility statement."
        description="Our commitment to making digital infrastructure accessible to all users."
        meta={doc ? [{ label: 'Last Updated', value: doc.lastUpdated }] : []}
      />
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Legal', href: '/legal' },
              { label: 'Accessibility' },
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
