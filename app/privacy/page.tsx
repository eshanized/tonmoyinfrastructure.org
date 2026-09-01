import { PageHeader } from '@/components/shared/page-header';
import { Markdown } from '@/components/shared/markdown';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getLegalDocument } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy & Data Protection',
  description:
    'How Tonmoy Infrastructure and Vision protects user privacy: zero behavioral telemetry, zero advertising trackers, and absolute user sovereignty.',
  path: '/privacy',
  keywords: ['TIV privacy policy', 'data protection', 'zero telemetry', 'user privacy'],
});

export default function RootPrivacyPage() {
  const doc = getLegalDocument('privacy');

  const pageGraph = generatePageGraph({
    title: 'Privacy Policy & Data Protection — Tonmoy Infrastructure and Vision',
    description:
      'How Tonmoy Infrastructure and Vision protects user privacy: zero behavioral telemetry, zero advertising trackers, and absolute user sovereignty.',
    path: '/privacy',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Privacy Policy', item: '/privacy' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / PRIVACY"
        label="Privacy Policy"
        title="Privacy policy."
        description="How TIV handles information and protects privacy."
        meta={doc ? [{ label: 'Last Updated', value: doc.lastUpdated }] : []}
      />
      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Legal', href: '/legal' },
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
