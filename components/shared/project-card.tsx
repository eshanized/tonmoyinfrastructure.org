import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/shared/status-badge';
import { TivIcon, getProjectTypeIcon } from '@/components/shared/tiv-icon';
import { PlatformIcon } from '@/components/shared/source-badge';
import type { Project } from '@/lib/types';

export function ProjectCard({
  project,
  href,
}: {
  project: Project;
  href?: string;
}) {
  const targetHref = href || `/projects/${project.slug}`;

  return (
    <Link
      href={targetHref}
      className="group relative flex flex-col border border-border bg-card p-6 transition-all duration-300 hover:border-brand/40 md:p-8"
    >
      {/* Accent line that expands on hover */}
      <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
            <TivIcon name={getProjectTypeIcon(project.type)} size={18} />
          </div>
          <div>
            <span className="tiv-meta block">{project.category}</span>
            {project.version && (
              <span className="font-mono text-[10px] text-brand">
                v{project.version}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={project.status} />
          <div className="flex items-center gap-1.5">
            {project.artifactType && (
              <span className="border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {project.artifactType}
              </span>
            )}
            <span className="font-mono text-[10px] text-muted-foreground">
              DEV: {project.developmentStage?.toUpperCase() || 'ACTIVE'}
            </span>
          </div>
        </div>
      </div>

      <h3 className="mt-6 font-display text-2xl tracking-tight transition-colors group-hover:text-brand">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {project.technology && project.technology.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technology.map((tech) => (
            <span
              key={tech}
              className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.parameterCount && (
            <span className="border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono text-xs text-purple-600 dark:text-purple-400">
              {project.parameterCount}
            </span>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-1.5 text-sm font-medium text-brand">
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
        </div>

        {project.sources && project.sources.length > 0 && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            {project.sources.map((src, idx) => (
              <span
                key={idx}
                className="flex h-6 w-6 items-center justify-center border border-border bg-secondary/30 text-muted-foreground transition-colors group-hover:text-foreground"
                title={`${src.platform}: ${src.type}`}
              >
                <PlatformIcon platform={src.platform} size={12} />
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
