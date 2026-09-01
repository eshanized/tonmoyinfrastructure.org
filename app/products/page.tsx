import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { ProjectCard } from '@/components/shared/project-card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getProjects } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  path: '/products',
  title: 'Products — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'Software products developed and shipped by Tonmoy Infrastructure and Vision. OpenMail, Mercura, M31A, and Octate are existing stable platforms.',
});

export default function ProductsPage() {
  const products = getProjects().filter((p) => p.type === 'software');

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  const pageGraph = generatePageGraph({
    pagePath: '/products',
    pageTitle: 'Products — Tonmoy Infrastructure and Vision',
    pageDescription:
      'Software products developed and shipped by Tonmoy Infrastructure and Vision. OpenMail, Mercura, M31A, and Octate are existing stable platforms.',
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="PRODUCTS"
        label="Software"
        title="TIV Products."
        description="Completed software applications with stable releases. OpenMail, Mercura, M31A, and Octate are existing stable platforms."
        meta={[
          { label: 'PORTFOLIO', value: '4 Products' },
          { label: 'STATUS', value: 'Stable Release' },
          { label: 'DEVELOPMENT', value: 'Active' },
          { label: 'DELIVERY', value: 'Shipped' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Stable Releases"
              title="Four stable products."
              description="Built, shipped, and actively maintained. Distinguishing product stability from continuous development."
            />
          </Reveal>

          <StaggerContainer
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
            stagger={0.1}
          >
            {products.map((product) => (
              <StaggerItem key={product.slug}>
                <ProjectCard project={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
