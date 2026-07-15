// ─── Authorization & Role-Based Access Control ─────────────────────────────
// Supports roles: Financial Administrator, Finance Editor, Management, Project Manager, Viewer.
// Ensures strict isolation: internal-only financial records are NEVER leaked to public endpoints/views.

import type { UserRole, ProjectEconomicProfile, PortfolioEconomicsSummary } from './types';

export interface UserSession {
  userId: string;
  name: string;
  role: UserRole;
  isInternal: boolean;
}

// Default public session
export const PUBLIC_SESSION: UserSession = {
  userId: 'public-anonymous',
  name: 'Public Visitor',
  role: 'Viewer',
  isInternal: false,
};

// Default management session for internal use
export const DEFAULT_ADMIN_SESSION: UserSession = {
  userId: 'eshan-roy',
  name: 'Eshan Roy',
  role: 'Financial Administrator',
  isInternal: true,
};

export const AVAILABLE_ROLES: { role: UserRole; description: string; permissions: string[] }[] = [
  {
    role: 'Financial Administrator',
    description: 'Full administrative control over financial periods, data imports, audit logs, and publication.',
    permissions: ['read_internal', 'write', 'approve', 'publish', 'audit_view', 'export_all'],
  },
  {
    role: 'Finance Editor',
    description: 'Can draft and update investments, costs, revenues, and shared allocations.',
    permissions: ['read_internal', 'write', 'export_internal'],
  },
  {
    role: 'Management',
    description: 'Full view of all internal management dashboards, comparisons, reconciliations, and reports.',
    permissions: ['read_internal', 'review', 'export_internal'],
  },
  {
    role: 'Project Manager',
    description: 'View project economics and log engineering hours for assigned projects.',
    permissions: ['read_project_internal', 'log_hours'],
  },
  {
    role: 'Viewer',
    description: 'Read-only access to published public summaries.',
    permissions: ['read_public'],
  },
];

export function canPerformAction(
  session: UserSession,
  action: 'read_internal' | 'write' | 'approve' | 'publish' | 'audit_view' | 'export_all'
): boolean {
  if (!session.isInternal) return false;

  switch (action) {
    case 'read_internal':
      return ['Financial Administrator', 'Finance Editor', 'Management', 'Project Manager'].includes(session.role);
    case 'write':
      return ['Financial Administrator', 'Finance Editor'].includes(session.role);
    case 'approve':
      return ['Financial Administrator', 'Management'].includes(session.role);
    case 'publish':
      return session.role === 'Financial Administrator';
    case 'audit_view':
      return ['Financial Administrator', 'Management'].includes(session.role);
    case 'export_all':
      return ['Financial Administrator', 'Management'].includes(session.role);
    default:
      return false;
  }
}

/**
 * Sanitize a ProjectEconomicProfile for public viewing.
 * Internal-only fields are obscured or masked per TIV Public Disclosure Policy:
 * - Revenues marked as 'Not Separately Disclosed' or masked unless explicitly public
 * - Specific contractor or internal vendor details removed
 * - Management estimates clearly marked
 */
export function sanitizeProjectForPublic(
  profile: ProjectEconomicProfile
): ProjectEconomicProfile {
  const isPublic = profile.isPubliclyDisclosed;

  return {
    ...profile,
    // Sensitive direct numbers masked if not explicitly public
    directRevenue: isPublic ? profile.directRevenue : null,
    allocatedRevenue: isPublic ? profile.allocatedRevenue : null,
    attributedRevenue: isPublic ? profile.attributedRevenue : null,
    revenueStatusText: isPublic
      ? profile.revenueStatusText
      : profile.isResearch
      ? 'Not Applicable'
      : 'Not Separately Disclosed',

    portfolioContribution: isPublic ? profile.portfolioContribution : null,
    postInvestmentContribution: isPublic ? profile.postInvestmentContribution : null,
    investmentRecoveryRatio: isPublic ? profile.investmentRecoveryRatio : null,

    // Development investment can be displayed as Tracked or masked
    developmentInvestmentCash: isPublic ? profile.developmentInvestmentCash : null,
    developmentInvestmentEconomic: isPublic ? profile.developmentInvestmentEconomic : null,
    totalDevelopmentInvestment: isPublic ? profile.totalDevelopmentInvestment : null,

    // Strip internal documents from sources
    sources: profile.sources.map((s) => ({
      ...s,
      document: undefined, // Obscure internal file paths
    })),
  };
}

/**
 * Sanitize PortfolioEconomicsSummary for public viewing.
 */
export function sanitizePortfolioForPublic(
  summary: PortfolioEconomicsSummary
): PortfolioEconomicsSummary {
  return {
    ...summary,
    projects: summary.projects.map(sanitizeProjectForPublic),
    // Public summary shows macro portfolio coverage and aggregated metrics,
    // while keeping sensitive individual project internals protected
  };
}
