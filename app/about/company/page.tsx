import Link from 'next/link';
import { ArrowRight, Globe, Mail, Building2, Calendar, FileText, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getCompanyInfo } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Company & Corporate Identity',
  description:
    'Formal corporate identity of Tonmoy Infrastructure and Vision. Legal name, brand, registration details, and official contact information.',
  path: '/about/company',
  keywords: ['TIV company', 'corporate identity', 'legal name', 'official contacts'],
});

export default function CompanyPage() {
  const company = getCompanyInfo();

  const pageGraph = generatePageGraph({
    title: 'Company & Corporate Identity — Tonmoy Infrastructure and Vision',
    description:
      'Formal corporate identity of Tonmoy Infrastructure and Vision. Legal name, brand, registration details, and official contact information.',
    path: '/about/company',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'About', item: '/about' },
      { name: 'Company', item: '/about/company' },
    ],
  });

  const fields = [
    { label: 'Legal Company Name', value: company.legalName, icon: Building2 },
    { label: 'Brand Name', value: company.brandName, icon: Building2 },
    { label: 'Company Type', value: company.type, icon: FileText },
    { label: 'Jurisdiction', value: company.jurisdiction, icon: MapPin },
    { label: 'Incorporation Date', value: company.incorporationDate, icon: Calendar },
    { label: 'Registration Information', value: company.registrationInfo, icon: FileText },
    { label: 'Registered Office', value: company.registeredOffice, icon: MapPin },
  ].filter((f) => f.value);

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="ABOUT / COMPANY"
        label="Corporate Identity"
        title="Company."
        description="The formal corporate identity of Tonmoy Infrastructure and Vision. Only verified information is published — fields without confirmed data are omitted rather than fabricated."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'About', href: '/about' },
              { label: 'Company' },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Verified Information Only">
            TIV does not fabricate registration details, addresses, or legal
            information. Only fields with confirmed data are shown. The content
            model supports additional fields as they become available.
          </Callout>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Identity"
              title="Organization overview."
              description={company.description}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.label} className="bg-card p-6">
                  <div className="flex items-center gap-2">
                    <field.icon className="h-4 w-4 text-brand" aria-hidden="true" />
                    <span className="tiv-meta">{field.label}</span>
                  </div>
                  <p className="mt-3 font-display text-lg tracking-tight">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-px">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">Official Website</span>
                </div>
                <p className="mt-3 font-mono text-sm">
                  <a
                    href={company.officialWebsite}
                    className="text-brand hover:underline"
                  >
                    {company.officialWebsite}
                  </a>
                </p>
              </div>
              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">Official Contact</span>
                </div>
                <p className="mt-3 font-mono text-sm">
                  <Link
                    href="/contact"
                    className="text-brand hover:underline"
                  >
                    {company.officialContact}
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>

          {company.primaryDomains.length > 0 && (
            <Reveal delay={0.2} className="mt-px">
              <div className="border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">Primary Domains</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {company.primaryDomains.map((domain) => (
                    <span
                      key={domain}
                      className="border border-border px-3 py-1.5 font-mono text-sm"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Related"
              title="Connected information."
              description="Company information is connected to TIV's governance, leadership, and transparency architecture."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              <Link
                href="/about/governance"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">GOVERNANCE</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Governance
                </h3>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link
                href="/about/leadership"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">PEOPLE</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Leadership
                </h3>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link
                href="/transparency"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">TRANSPARENCY</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Transparency
                </h3>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
