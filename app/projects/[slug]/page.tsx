import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/content';
import { ProjectDetailView } from '@/components/projects/project-detail-view';
import { generateProjectMetadata } from '@/lib/seo';
import { generatePageGraph, generateSoftwareApplicationSchema } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return generateProjectMetadata(project, { basePath: 'projects' });
}

export default function ProjectPageRoute({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project.title, path: `/projects/${project.slug}` },
  ];

  const pageGraph = generatePageGraph({
    pagePath: `/projects/${project.slug}`,
    pageTitle: `${project.title} — Tonmoy Infrastructure and Vision`,
    pageDescription: project.seoDescription || project.description,
    breadcrumbs,
    entities: [generateSoftwareApplicationSchema(project)],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <ProjectDetailView project={project} basePath="projects" />
    </>
  );
}
