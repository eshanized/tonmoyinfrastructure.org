import type {
  Project,
  ProjectStatus,
  ResearchArea,
  Publication,
  InfrastructureService,
  NewsArticle,
  TransparencyReport,
  FinancialReport,
  Job,
  Repo,
  TechnicalArtifact,
  TechnicalFootprintPlatform,
  M31Node,
} from '@/lib/types';
import {
  validateProjects,
  validateFinancials,
  validateNews,
} from '@/lib/schemas';

// ─── Projects ──────────────────────────────────────────────

const rawProjects: Project[] = [
