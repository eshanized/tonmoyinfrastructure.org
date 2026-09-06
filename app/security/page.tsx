import { SecurityCenterView } from '@/components/security/security-center-view';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Security Center & Vulnerability Disclosures',
  description:
    'Vulnerability disclosure policy, PGP encryption keys, security advisories, and infrastructure defenses at TIV.',
  path: '/security',
  keywords: ['TIV security', 'vulnerability disclosure', 'PGP key', 'security advisories'],
});

export default function SecurityPage() {
  const pageGraph = generatePageGraph({
    title: 'Security Center & Vulnerability Disclosures — Tonmoy Infrastructure and Vision',
    description:
      'Vulnerability disclosure policy, PGP encryption keys, security advisories, and infrastructure defenses at TIV.',
    path: '/security',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Security', item: '/security' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <SecurityCenterView
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Security' },
        ]}
      />
    </>
  );
}
