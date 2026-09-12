import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/content';
import { ProjectDetailView } from '@/components/projects/project-detail-view';
import { generateProjectMetadata } from '@/lib/seo';
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
  return generateProjectMetadata(project, { basePath: 'work' });
}

export default function WorkProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return <ProjectDetailView project={project} basePath="work" />;
}
