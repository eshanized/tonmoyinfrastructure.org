// ─── Portfolio Economics Data Store ────────────────────────────────────────
// Centralized, typed repository for managing economic records across periods.
// All financial logic is strictly separated from presentation.
// Supports safe mutation, audit logging, and queries by project and period.

import {
  initialSharedCostSources,
  initialSharedCostAllocations,
  initialOperatingCosts,
  initialInvestments,
  initialEngineeringHours,
  initialRevenue,
  initialAssets,
  initialAssetAllocations,
  initialResearchExpenditures,
  initialStrategicAssessments,
} from './initial-data';
import type {
  DevelopmentInvestment,
  OperatingCost,
  SharedCostSource,
  SharedCostAllocation,
  ProjectRevenue,
  EngineeringHourRecord,
  Asset,
  AssetAllocation,
  ResearchExpenditure,
  StrategicAssessment,
} from './types';
import { logAuditAction } from './audit';
import { validatePercentageSum } from './decimal';

class PortfolioDataStore {
  private sharedCostSources: SharedCostSource[] = [...initialSharedCostSources];
  private sharedCostAllocations: SharedCostAllocation[] = [...initialSharedCostAllocations];
  private operatingCosts: OperatingCost[] = [...initialOperatingCosts];
  private investments: DevelopmentInvestment[] = [...initialInvestments];
  private engineeringHours: EngineeringHourRecord[] = [...initialEngineeringHours];
  private revenues: ProjectRevenue[] = [...initialRevenue];
  private assets: Asset[] = [...initialAssets];
  private assetAllocations: AssetAllocation[] = [...initialAssetAllocations];
  private researchExpenditures: ResearchExpenditure[] = [...initialResearchExpenditures];
  private strategicAssessments: StrategicAssessment[] = [...initialStrategicAssessments];

  // ─── Query Methods ─────────────────────────────────────────────────────────

  getSharedCostSources(periodId?: string): SharedCostSource[] {
    return periodId
      ? this.sharedCostSources.filter((s) => s.financialPeriodId === periodId)
      : [...this.sharedCostSources];
  }

  getSharedCostAllocations(sharedCostId?: string): SharedCostAllocation[] {
    return sharedCostId
      ? this.sharedCostAllocations.filter((a) => a.sharedCostId === sharedCostId)
      : [...this.sharedCostAllocations];
  }

  getOperatingCosts(periodId?: string, projectId?: string): OperatingCost[] {
    return this.operatingCosts.filter((c) => {
      if (periodId && c.financialPeriodId !== periodId) return false;
      if (projectId && c.projectId !== projectId) return false;
      return true;
    });
  }

  getInvestments(periodId?: string, projectId?: string): DevelopmentInvestment[] {
    return this.investments.filter((i) => {
      if (periodId && i.financialPeriodId !== periodId) return false;
      if (projectId && i.projectId !== projectId) return false;
      return true;
    });
  }

  getEngineeringHours(periodId?: string, projectId?: string): EngineeringHourRecord[] {
    return this.engineeringHours.filter((h) => {
      if (periodId && h.financialPeriodId !== periodId) return false;
      if (projectId && h.projectId !== projectId) return false;
      return true;
    });
  }

  getRevenues(periodId?: string, projectId?: string): ProjectRevenue[] {
    return this.revenues.filter((r) => {
      if (periodId && r.financialPeriodId !== periodId) return false;
      if (projectId && r.projectId !== projectId) return false;
      return true;
    });
  }

  getAssets(): Asset[] {
    return [...this.assets];
  }

  getAsset(id: string): Asset | undefined {
    return this.assets.find((a) => a.id === id);
  }

  getAssetAllocations(periodId?: string, projectId?: string, assetId?: string): AssetAllocation[] {
    return this.assetAllocations.filter((a) => {
      if (periodId && a.periodId !== periodId) return false;
      if (projectId && a.projectId !== projectId) return false;
      if (assetId && a.assetId !== assetId) return false;
      return true;
    });
  }

  getResearchExpenditures(periodId?: string, projectId?: string): ResearchExpenditure[] {
    return this.researchExpenditures.filter((r) => {
      if (periodId && r.financialPeriodId !== periodId) return false;
      if (projectId && r.projectId !== projectId) return false;
      return true;
    });
  }

  getStrategicAssessments(projectId?: string): StrategicAssessment[] {
    return projectId
      ? this.strategicAssessments.filter((s) => s.projectId === projectId)
      : [...this.strategicAssessments];
  }

  getStrategicAssessment(projectId: string): StrategicAssessment | undefined {
    return this.strategicAssessments.find((s) => s.projectId === projectId);
  }

  // ─── Mutation Methods with Validation & Audit ───────────────────────────────

  addInvestment(
    investment: DevelopmentInvestment,
    user = 'system',
    role = 'Financial Administrator'
  ): void {
    if (!investment.projectId || !investment.financialPeriodId) {
      throw new Error('Project ID and Financial Period ID are required for development investment.');
    }
    this.investments.push(investment);
    logAuditAction(
      user,
      role,
      'create',
      'DevelopmentInvestment',
      investment.id,
      null,
      investment as unknown as Record<string, unknown>
    );
  }

  addOperatingCost(
    cost: OperatingCost,
    user = 'system',
    role = 'Financial Administrator'
  ): void {
    if (!cost.projectId || !cost.financialPeriodId) {
      throw new Error('Project ID and Financial Period ID are required for operating cost.');
    }
    this.operatingCosts.push(cost);
    logAuditAction(
      user,
      role,
      'create',
      'OperatingCost',
      cost.id,
      null,
      cost as unknown as Record<string, unknown>
    );
  }

  addRevenue(
    rev: ProjectRevenue,
    user = 'system',
    role = 'Financial Administrator'
  ): void {
    if (!rev.financialPeriodId) {
      throw new Error('Financial Period ID is required for revenue.');
    }
    this.revenues.push(rev);
    logAuditAction(
      user,
      role,
      'create',
      'ProjectRevenue',
      rev.id,
      null,
      rev as unknown as Record<string, unknown>
    );
  }

  addEngineeringHours(
    hours: EngineeringHourRecord,
    user = 'system',
    role = 'Project Manager'
  ): void {
    if (!hours.projectId || !hours.personId || !hours.financialPeriodId) {
      throw new Error('Project ID, Person ID, and Financial Period ID are required for engineering hours.');
    }
    this.engineeringHours.push(hours);
    logAuditAction(
      user,
      role,
      'create',
      'EngineeringHourRecord',
      hours.id,
      null,
      hours as unknown as Record<string, unknown>
    );
  }

  addSharedCostWithAllocations(
    source: SharedCostSource,
    allocations: SharedCostAllocation[],
    user = 'system',
    role = 'Financial Administrator'
  ): void {
    // Validate allocation sum === 100% within tolerance
    const percentages = allocations.map((a) => a.percentage);
    const sumValidation = validatePercentageSum(percentages);
    if (!sumValidation.isValid) {
      throw new Error(
        `Shared cost allocations must sum to 100%. Current sum: ${sumValidation.sum}% (diff: ${sumValidation.difference}%)`
      );
    }

    this.sharedCostSources.push(source);
    this.sharedCostAllocations.push(...allocations);

    logAuditAction(
      user,
      role,
      'create',
      'SharedCostSource',
      source.id,
      null,
      { source, allocations } as unknown as Record<string, unknown>
    );
  }

  saveStrategicAssessment(
    assessment: StrategicAssessment,
    user = 'system',
    role = 'Financial Administrator'
  ): void {
    // Validate 1-5 range for all scores
    const scores = [
      assessment.strategicImportance,
      assessment.technicalDifferentiation,
      assessment.infrastructureRelevance,
      assessment.researchSignificance,
      assessment.revenuePotential,
      assessment.ecosystemImportance,
    ];
    for (const score of scores) {
      if (score < 1 || score > 5 || !Number.isInteger(score)) {
        throw new Error(`Strategic assessment scores must be integers between 1 and 5. Received: ${score}`);
      }
    }

    const idx = this.strategicAssessments.findIndex((s) => s.projectId === assessment.projectId);
    const oldVal = idx >= 0 ? this.strategicAssessments[idx] : null;

    if (idx >= 0) {
      this.strategicAssessments[idx] = assessment;
    } else {
      this.strategicAssessments.push(assessment);
    }

    logAuditAction(
      user,
      role,
      idx >= 0 ? 'update' : 'create',
      'StrategicAssessment',
      assessment.id,
      oldVal as unknown as Record<string, unknown>,
      assessment as unknown as Record<string, unknown>
    );
  }

  // Reset store to initial fixtures (useful for test isolation)
  resetToInitial(): void {
    this.sharedCostSources = [...initialSharedCostSources];
    this.sharedCostAllocations = [...initialSharedCostAllocations];
    this.operatingCosts = [...initialOperatingCosts];
    this.investments = [...initialInvestments];
    this.engineeringHours = [...initialEngineeringHours];
    this.revenues = [...initialRevenue];
    this.assets = [...initialAssets];
    this.assetAllocations = [...initialAssetAllocations];
    this.researchExpenditures = [...initialResearchExpenditures];
    this.strategicAssessments = [...initialStrategicAssessments];
  }
}

export const portfolioDataStore = new PortfolioDataStore();
