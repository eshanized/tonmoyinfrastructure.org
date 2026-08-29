import { PageHeader } from '@/components/shared/page-header';
import { Markdown } from '@/components/shared/markdown';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getLegalDocument } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata = generatePageMetadata({
  title: 'Accessibility Statement',
  description: 'TIV commitment to accessible technology and WCAG standards.',
  path: '/legal/accessibility',
  canonical: `${siteConfig.url}/accessibility`,
});

export default function AccessibilityPage() {
  const doc = getLegalDocument('accessibility');

  const pageGraph = generatePageGraph({
    title: 'Accessibility Statement — Tonmoy Infrastructure and Vision',
    description: 'TIV commitment to accessible technology and WCAG standards.',
    path: '/legal/accessibility',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Legal', item: '/legal' },
      { name: 'Accessibility', item: '/legal/accessibility' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / ACCESSIBILITY"
        label="Legal"
        title="Accessibility."
        description="TIV\'s commitment to making its website accessible to all users."
        meta={doc ? [{ label: 'Last Updated', value: doc.lastUpdated }] : []}
      />
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Trust', href: '/trust' },
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
