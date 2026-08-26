import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Contact & Inquiries Directory',
  description:
    'Official channels for contacting Tonmoy Infrastructure and Vision: general inquiries, hosting operations, technical disclosures, security advisories, and research collaborations.',
  path: '/contact',
  keywords: ['contact TIV', 'support inquiries', 'security disclosure contact', 'engineering inquiries'],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageGraph = generatePageGraph({
    title: 'Contact & Inquiries Directory — Tonmoy Infrastructure and Vision',
    description:
      'Official channels for contacting Tonmoy Infrastructure and Vision: general inquiries, hosting operations, technical disclosures, security advisories, and research collaborations.',
    path: '/contact',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Contact', item: '/contact' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      {children}
    </>
  );
}
