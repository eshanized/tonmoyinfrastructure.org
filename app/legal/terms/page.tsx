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
  title: 'Terms of Use',
  description: 'Terms governing use of TIV services and software.',
  path: '/legal/terms',
  canonical: `${siteConfig.url}/terms`,
});

export default function TermsPage() {
  const doc = getLegalDocument('terms');

  const pageGraph = generatePageGraph({
    title: 'Terms of Use — Tonmoy Infrastructure and Vision',
    description: 'Terms governing use of TIV services and software.',
    path: '/legal/terms',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Legal', item: '/legal' },
      { name: 'Terms', item: '/legal/terms' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / TERMS"
        label="Legal"
        title="Terms of use."
        description="Terms governing use of TIV services and software."
        meta={doc ? [{ label: 'Last Updated', value: doc.lastUpdated }] : []}
      />
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Trust', href: '/trust' },
              { label: 'Terms' },
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
