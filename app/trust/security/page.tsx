import { SecurityCenterView } from '@/components/security/security-center-view';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata = generatePageMetadata({
  title: 'Security Center — Trust',
  description:
    'Security overview, vulnerability disclosure policy, advisories, and contact information.',
  path: '/trust/security',
  canonical: `${siteConfig.url}/security`,
});

export default function TrustSecurityPage() {
  const pageGraph = generatePageGraph({
    title: 'Security Center — Trust — Tonmoy Infrastructure and Vision',
    description:
      'Security overview, vulnerability disclosure policy, advisories, and contact information.',
    path: '/trust/security',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Trust', item: '/trust' },
      { name: 'Security', item: '/trust/security' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <SecurityCenterView
        breadcrumbs={[
          { label: 'Trust', href: '/trust' },
          { label: 'Security' },
        ]}
      />
    </>
  );
}
