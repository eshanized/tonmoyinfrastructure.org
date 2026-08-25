import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getJobs } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Careers & Engineering Opportunities',
  description:
    'Engineering roles and research opportunities at Tonmoy Infrastructure and Vision across systems programming, networking, and distributed infrastructure.',
  path: '/careers',
  keywords: ['TIV careers', 'systems engineering jobs', 'infrastructure engineering', 'research careers'],
});

const cultureAreas = [
  {
    title: 'Engineering Culture',
    description:
      'TIV is an engineering-led organization. Engineers make technical decisions. We build from first principles, ship working software, prefer simplicity, and document everything.',
  },
  {
    title: 'Research Culture',
    description:
      'Research is first-class at TIV — not a side activity. We publish openly, build from research, and do not claim results that do not exist. Research is measured in years, not quarters.',
  },
  {
    title: 'Infrastructure Work',
    description:
      'TIV works across the full stack — from software to physical infrastructure. This means working on real systems: servers, networks, fiber optics, and the software that runs on them.',
  },
  {
    title: 'Hiring Philosophy',
    description:
      'We hire people who want to build things that should exist. We do not invent vacancies. When positions open, they are real — with full descriptions, requirements, and application instructions.',
  },
];

const applicationSteps = [
  { step: '01', title: 'Find an open position', description: 'Browse available positions below. If none are listed, we do not have openings.' },
  { step: '02', title: 'Apply through the contact page', description: 'Use the contact page with the Careers category. Include your background and what interests you about TIV.' },
  { step: '03', title: 'Initial conversation', description: 'If your background aligns, we will schedule an initial conversation to discuss the role and your experience.' },
  { step: '04', title: 'Technical discussion', description: 'For engineering roles, we discuss technical work — past projects, approach to problems, and what you would build at TIV.' },
];

export default function CareersPage() {
  const jobs = getJobs();

  const pageGraph = generatePageGraph({
    title: 'Careers & Engineering Opportunities — Tonmoy Infrastructure and Vision',
    description:
      'Engineering roles and research opportunities at Tonmoy Infrastructure and Vision across systems programming, networking, and distributed infrastructure.',
    path: '/careers',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Careers', item: '/careers' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="CAREERS"
        label="Open Positions"
        title="Build infrastructure that matters."
        description="TIV is building infrastructure across software, networks, and research. We are looking for people who want to build things that should exist."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Careers' }]} />
        </div>
      </section>

      {/* Culture */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Culture"
              title="How TIV works."
              description="TIV is an engineering organization. Understanding how we work is essential before considering joining."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              {cultureAreas.map((area) => (
                <div key={area.title} className="bg-card p-6">
                  <h3 className="font-display text-lg tracking-tight">{area.title}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Application process */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Process"
              title="How to apply."
              description="The application process is straightforward."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
              {applicationSteps.map((step) => (
                <div key={step.step} className="bg-card p-6">
                  <span className="font-display text-3xl font-bold tracking-tight text-muted-foreground/20">
                    {step.step}
                  </span>
                  <h3 className="mt-2 font-display text-base font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Open positions */}
      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Positions"
              title="Open positions."
              description="Only actual open positions are listed. We do not fabricate vacancies."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            {jobs.length === 0 ? (
              <div className="border border-border bg-card p-12">
                <Callout type="info" title="No Open Positions">
                  TIV does not currently have any open positions. We do not invent
                  vacancies. When positions open, they will be listed here with full
                  descriptions, requirements, and application instructions.
                </Callout>
                <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
                  We are always interested in hearing from people who align with
                  our mission. If you want to build infrastructure that people can
                  understand, operate, own, and depend on, reach out through our
                  contact page.
                </p>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ) : (
              <div className="space-y-px border border-border bg-border">
                {jobs.map((job) => (
                  <div key={job.slug} className="bg-card p-6">
                    <h3 className="font-display text-lg">{job.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.department} · {job.location} · {job.type}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
