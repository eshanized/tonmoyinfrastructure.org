import { PageHeader } from '@/components/shared/page-header';
import { Markdown } from '@/components/shared/markdown';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getLegalDocument } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description:
    'Terms and conditions governing the use of the TIV website, open protocols, and software releases.',
  path: '/terms',
  keywords: ['TIV terms of service', 'terms of use', 'software terms'],
});

export default function RootTermsPage() {
  const doc = getLegalDocument('terms');

  const pageGraph = generatePageGraph({
    title: 'Terms of Service — Tonmoy Infrastructure and Vision',
    description:
      'Terms and conditions governing the use of the TIV website, open protocols, and software releases.',
    path: '/terms',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Terms of Service', item: '/terms' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / TERMS"
        label="Terms of Service"
        title="Terms of service."
        description="Conditions governing the use of TIV web services and software."
        meta={doc ? [{ label: 'Last Updated', value: doc.lastUpdated }] : []}
      />
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Legal', href: '/legal' },
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
