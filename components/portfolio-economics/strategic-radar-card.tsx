'use client';

import type { StrategicAssessment } from '@/lib/portfolio-economics/types';
import { Target, AlertTriangle } from 'lucide-react';

export function StrategicRadarCard({
  assessment,
  projectTitle,
}: {
  assessment?: StrategicAssessment;
  projectTitle: string;
}) {
  if (!assessment) {
    return (
      <div className="border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Target className="h-4 w-4" />
          <span className="tiv-meta text-xs">STRATEGIC ASSESSMENT</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          No formal strategic assessment currently recorded for {projectTitle}.
        </p>
      </div>
    );
  }

  const dimensions = [
    { label: 'Strategic Importance', score: assessment.strategicImportance, desc: 'Centrality to TIV sovereign stack vision' },
    { label: 'Technical Differentiation', score: assessment.technicalDifferentiation, desc: 'Architectural novelty and defensibility' },
    { label: 'Infrastructure Relevance', score: assessment.infrastructureRelevance, desc: 'Foundational operational utility' },
    { label: 'Research Significance', score: assessment.researchSignificance, desc: 'Advancement in computing or AI knowledge' },
    { label: 'Revenue Potential', score: assessment.revenuePotential, desc: 'Long-term self-sustaining commercial capacity' },
    { label: 'Ecosystem Importance', score: assessment.ecosystemImportance, desc: 'Synergy and integration across other projects' },
  ];

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-brand" />
            <span className="tiv-meta text-xs">STRATEGIC ASSESSMENT</span>
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
            {projectTitle} Qualitative Evaluation
          </h3>
        </div>

        <div className="text-left sm:text-right font-mono text-xs text-muted-foreground">
          <div>Assessor: <span className="text-foreground">{assessment.assessor}</span></div>
          <div>Date: {assessment.assessmentDate}</div>
        </div>
      </div>

      {/* Strict Anti-Valuation Disclaimer */}
      <div className="mt-4 flex items-start gap-2.5 rounded-none border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-foreground font-medium">Non-Monetary Strategic Scoring:</strong>{' '}
          These 1–5 qualitative ratings assess technical differentiation and ecosystem utility.
          They are <span className="underline font-semibold text-foreground">never converted into monetary valuations</span> or speculative project worth.
        </div>
      </div>

      {/* Grid of Dimension Bars */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dimensions.map((dim, i) => (
          <div key={i} className="border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-semibold text-foreground">{dim.label}</span>
              <span className="font-mono text-sm font-bold text-brand">{dim.score}/5</span>
            </div>

            <div className="mt-2.5 flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <span
                  key={level}
                  className={`h-2 flex-1 ${
                    level <= dim.score ? 'bg-brand' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <p className="mt-2 text-[11px] text-muted-foreground leading-snug">
              {dim.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Notes */}
      {assessment.notes && (
        <div className="mt-6 border-t border-border pt-4">
          <span className="tiv-meta text-[10px]">ASSESSMENT RATIONALE</span>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {assessment.notes}
          </p>
        </div>
      )}
    </div>
  );
}
