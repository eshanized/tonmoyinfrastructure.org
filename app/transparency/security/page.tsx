import { SecurityCenterView } from '@/components/security/security-center-view';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata = generatePageMetadata({
  title: 'Security Center — Transparency',
  description:
    'Security disclosures, policies, advisories, and contact information.',
  path: '/transparency/security',
  canonical: `${siteConfig.url}/security`,
});

export default function TransparencySecurityPage() {
  const pageGraph = generatePageGraph({
    title: 'Security Center — Transparency — Tonmoy Infrastructure and Vision',
    description:
      'Security disclosures, policies, advisories, and contact information.',
    path: '/transparency/security',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Transparency', item: '/transparency' },
      { name: 'Security', item: '/transparency/security' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <SecurityCenterView
        breadcrumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Security' },
        ]}
      />
    </>
  );
}
