import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Markdown } from '@/components/shared/markdown';
import { Callout } from '@/components/shared/callout';
import { TivIcon } from '@/components/shared/tiv-icon';
import { Reveal } from '@/components/shared/motion';
import { NetworkDiagram } from '@/components/infrastructure/network-diagram';
import { OpticalPath } from '@/components/infrastructure/optical-path';
import { CourierDiagram } from '@/components/infrastructure/courier-diagram';
import { DataCenterDiagram } from '@/components/infrastructure/data-center-diagram';
import { getInfrastructureService, getInfrastructureServices } from '@/lib/content';
import { generateInfrastructureMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getInfrastructureServices().map((s) => ({
    slug: s.slug === 'optical-systems' ? 'optical' : s.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const slug = params.slug === 'optical' ? 'optical-systems' : params.slug;
  const svc = getInfrastructureService(slug);
  if (!svc) return {};
  return generateInfrastructureMetadata(svc);
}

export default function InfrastructureServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug === 'optical' ? 'optical-systems' : params.slug;
  const service = getInfrastructureService(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Infrastructure', path: '/infrastructure' },
    { name: service.title, path: `/infrastructure/${params.slug}` },
  ];

  const pageGraph = generatePageGraph({
    pagePath: `/infrastructure/${params.slug}`,
    pageTitle: `${service.title} — TIV Infrastructure`,
    pageDescription: service.description,
    breadcrumbs,
  });

  const isPlanning = service.status === 'Planning';
  const isResearch = service.status === 'Research';

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index={service.category.toUpperCase()}
        label={service.classification}
        title={service.title}
        description={service.description}
        meta={[
          { label: 'STATUS', value: service.status },
          { label: 'CLASSIFICATION', value: service.classification },
          { label: 'CATEGORY', value: service.category },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Infrastructure', href: '/infrastructure' },
              { label: service.title },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <Reveal>
            <div className="min-w-0">
              {isPlanning && (
                <Callout type="warning" title="Planning Phase" className="mb-8">
                  This service is in the planning phase. No services are currently
                  available. Information will be published when services launch.
                </Callout>
              )}
              {isResearch && (
                <Callout type="info" title="Research Phase" className="mb-8">
                  This is an active research area. No commercial services exist.
                  Research findings will be published through the TIV research portal.
                </Callout>
              )}
              <Markdown content={service.content} />

              {slug === 'networking' && (
                <div className="mt-10">
                  <NetworkDiagram />
                </div>
              )}

              {(slug === 'optical-systems' || slug === 'optical') && (
                <div className="mt-10">
                  <OpticalPath />
                </div>
              )}

              {slug === 'data-centers' && (
                <div className="mt-10">
                  <DataCenterDiagram />
                </div>
              )}

              {slug === 'courier' && (
                <div className="mt-10">
                  <CourierDiagram />
                </div>
              )}
            </div>
            </Reveal>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-border p-6">
                <span className="tiv-meta mb-4 block">Service Details</span>
                <dl className="space-y-3">
                  <div>
                    <dt className="tiv-meta mb-1">Status</dt>
                    <dd><StatusBadge status={service.status} /></dd>
                  </div>
                  <div>
                    <dt className="tiv-meta mb-1">Classification</dt>
                    <dd className="font-mono text-sm">{service.classification}</dd>
                  </div>
                  <div>
                    <dt className="tiv-meta mb-1">Category</dt>
                    <dd className="font-mono text-sm">{service.category}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
