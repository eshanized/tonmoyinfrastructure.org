import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/content';
import { ProjectDetailView } from '@/components/projects/project-detail-view';
import { generateProjectMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return generateProjectMetadata(project, { basePath: 'products' });
}

export default async function ProductPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailView project={project} basePath="products" />;
}
