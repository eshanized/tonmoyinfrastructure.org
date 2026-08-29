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
  title: 'Privacy Policy',
  description: 'How Tonmoy Infrastructure and Vision handles information and protects privacy.',
  path: '/legal/privacy',
  canonical: `${siteConfig.url}/privacy`,
});

export default function PrivacyPage() {
  const doc = getLegalDocument('privacy');

  const pageGraph = generatePageGraph({
    title: 'Privacy Policy — Tonmoy Infrastructure and Vision',
    description: 'How Tonmoy Infrastructure and Vision handles information and protects privacy.',
    path: '/legal/privacy',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Legal', item: '/legal' },
      { name: 'Privacy', item: '/legal/privacy' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / PRIVACY"
        label="Legal"
        title="Privacy policy."
        description="How TIV handles information and protects privacy."
        meta={doc ? [{ label: 'Last Updated', value: doc.lastUpdated }] : []}
      />
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Trust', href: '/trust' },
              { label: 'Privacy' },
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
