import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Site Directory & Human-Readable Map',
  description:
    'A comprehensive, human-readable directory of the Tonmoy Infrastructure and Vision website across software, infrastructure, research, and governance.',
  path: '/sitemap',
  keywords: ['TIV sitemap', 'site directory', 'website navigation'],
});

const sections = [
  {
    title: 'Company & Stewardship',
    links: [
      { label: 'About TIV', href: '/about' },
      { label: 'Corporate Identity', href: '/about/company' },
      { label: 'Founder & Leadership', href: '/about/leadership' },
      { label: 'Governance Principles', href: '/about/governance' },
      { label: 'Organizational Timeline', href: '/about/timeline' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Directory', href: '/contact' },
      { label: 'Media Kit', href: '/media' },
      { label: 'Investor Relations', href: '/investors' },
    ],
  },
  {
    title: 'Software & Systems',
    links: [
      { label: 'All Projects', href: '/projects' },
      { label: 'OpenMail', href: '/projects/openmail' },
      { label: 'Mercura', href: '/projects/mercura' },
      { label: 'M31A', href: '/projects/m31a' },
      { label: 'Octate', href: '/projects/octate' },
      { label: 'M31Genesis (425M LM)', href: '/projects/m31genesis' },
      { label: 'M31Tesla (228.9M Agent)', href: '/projects/m31tesla' },
      { label: 'M31Entropy (314M Vocab)', href: '/projects/m31entropy' },
      { label: 'Software Releases', href: '/releases' },
      { label: 'Open Technical Work', href: '/open-source' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
  {
    title: 'Infrastructure & Operations',
    links: [
      { label: 'Infrastructure Overview', href: '/infrastructure' },
      { label: 'Domains & DNS', href: '/infrastructure/domains' },
      { label: 'Bare-Metal Hosting', href: '/infrastructure/hosting' },
      { label: 'Compute Clusters', href: '/infrastructure/compute' },
      { label: 'Low-Latency Networking', href: '/infrastructure/networking' },
      { label: 'Optical Systems', href: '/infrastructure/optical-systems' },
      { label: 'System & Service Status', href: '/status' },
    ],
  },
  {
    title: 'Technology & Architecture',
    links: [
      { label: 'Technology Stack', href: '/technology' },
      { label: 'Layered System Architecture', href: '/technology/architecture' },
      { label: 'AI Architecture', href: '/technology/ai' },
    ],
  },
  {
    title: 'Research & Science',
    links: [
      { label: 'Research Overview', href: '/research' },
      { label: 'Technical Domains & Areas', href: '/research/areas' },
      { label: 'Scientific Experiments', href: '/research/experiments' },
      { label: 'Publications & Papers', href: '/research/publications' },
      { label: 'Autonomous Systems Paper', href: '/research/publications/autonomous-development-systems' },
      { label: 'Technical Whitepaper', href: '/research/whitepaper' },
      { label: 'AI Research Portal', href: '/research/ai' },
    ],
  },
  {
    title: 'Transparency & Disclosures',
    links: [
      { label: 'Transparency Hub', href: '/transparency' },
      { label: 'Financial Statements', href: '/transparency/financials' },
      { label: 'Annual Reports', href: '/transparency/annual-reports' },
      { label: 'Governance Disclosures', href: '/transparency/governance' },
      { label: 'News & Announcements', href: '/news' },
    ],
  },
  {
    title: 'Trust, Security & Legal',
    links: [
      { label: 'Trust Center', href: '/trust' },
      { label: 'Security Center', href: '/security' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Accessibility Statement', href: '/accessibility' },
      { label: 'Open Source Licenses', href: '/licenses' },
      { label: 'Legal Directory', href: '/legal' },
    ],
  },
];

export default function SitemapPage() {
  const pageGraph = generatePageGraph({
    title: 'Site Directory & Human-Readable Map — Tonmoy Infrastructure and Vision',
    description:
      'A comprehensive, human-readable directory of the Tonmoy Infrastructure and Vision website across software, infrastructure, research, and governance.',
    path: '/sitemap',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Site Map', item: '/sitemap' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="SITEMAP"
        label="Directory"
        title="Site map."
        description="A human-readable directory of the TIV website. Every public page, organized by section."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Site Map' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <StaggerContainer className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {sections.map((section) => (
              <StaggerItem key={section.title}>
                <div className="bg-card p-6">
                  <h2 className="font-display text-lg tracking-tight">
                    {section.title}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
                        >
                          {link.label}
                          <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
