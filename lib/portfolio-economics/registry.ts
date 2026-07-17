// ─── Project Registry Integration ──────────────────────────────────────────
// Dynamically reads from TIV's core content repository.
// DO NOT hardcode project names or lifecycles into financial logic.
// All project metadata, lifecycles, and categories come dynamically from source metadata.

import { getProjects, getProject as getCoreProject } from '@/lib/content';
import type { Project } from '@/lib/types';

export interface RegisteredProject {
  id: string; // matches project slug
  slug: string;
  title: string;
  category: string;
  type: string;
  status: string;
  productStatus: string;
  developmentStage: string;
  economicLifecycle: 'Development' | 'Release' | 'Maintenance' | 'Growth' | 'Legacy' | 'Archived' | 'Research';
  isResearch: boolean;
  description: string;
  repository?: string;
  license?: string;
  sources: {
    platform: string;
    url: string;
    label?: string;
    verified?: boolean;
  }[];
}

/**
 * Map TIV development stage & status into an economic lifecycle stage.
 */
function deriveEconomicLifecycle(project: Project): RegisteredProject['economicLifecycle'] {
  if (project.type === 'research' || project.developmentStage === 'research') {
    return 'Research';
  }
  if (project.status === 'Stable Release' || project.productStatus === 'stable') {
    return 'Release';
  }
  if (project.developmentStage === 'maintenance' || project.status === 'Maintenance') {
    return 'Maintenance';
  }
  if (project.status === 'Legacy') {
    return 'Legacy';
  }
  if (project.status === 'Archived') {
    return 'Archived';
  }
  return 'Development';
}

/**
 * Retrieve all registered projects dynamically from TIV content metadata.
 */
export function getRegisteredProjects(): RegisteredProject[] {
  const coreProjects = getProjects();
  return coreProjects.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    category: p.category,
    type: p.type,
    status: p.status,
    productStatus: p.productStatus,
    developmentStage: p.developmentStage,
    economicLifecycle: deriveEconomicLifecycle(p),
    isResearch: p.type === 'research' || p.developmentStage === 'research',
    description: p.shortDescription || p.description,
    repository: p.repository,
    license: p.license,
    sources: (p.sources || []).map((s) => ({
      platform: s.platform,
      url: s.url,
      label: s.label,
      verified: s.verified,
    })),
  }));
}

/**
 * Retrieve a specific registered project by id / slug.
 */
export function getRegisteredProject(idOrSlug: string): RegisteredProject | undefined {
  const p = getCoreProject(idOrSlug);
  if (!p) return undefined;
  return {
    id: p.slug,
    slug: p.slug,
    title: p.title,
    category: p.category,
    type: p.type,
    status: p.status,
    productStatus: p.productStatus,
    developmentStage: p.developmentStage,
    economicLifecycle: deriveEconomicLifecycle(p),
    isResearch: p.type === 'research' || p.developmentStage === 'research',
    description: p.shortDescription || p.description,
    repository: p.repository,
    license: p.license,
    sources: (p.sources || []).map((s) => ({
      platform: s.platform,
      url: s.url,
      label: s.label,
      verified: s.verified,
    })),
  };
}

/**
 * Check if a project exists in the registry.
 */
export function isValidProjectId(projectId: string): boolean {
  return !!getRegisteredProject(projectId);
}
