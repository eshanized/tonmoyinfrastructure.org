import Link from 'next/link';
import { Github, FileText, FlaskConical, Globe, ExternalLink, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  SourcePlatform,
  ProjectSource,
  ArtifactClassification,
  AffiliationType,
} from '@/lib/types';

export function HuggingFaceIcon({
  className,
  size = 16,
}: {
  className?: string;
  size?: number | string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={cn('inline-block shrink-0', className)}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 6.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm8 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-4 9c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
    </svg>
  );
}

export function PlatformIcon({
  platform,
  className,
  size = 15,
}: {
  platform: SourcePlatform | string;
  className?: string;
  size?: number | string;
}) {
  switch (platform) {
    case 'huggingface':
      return <HuggingFaceIcon className={className} size={size} />;
    case 'github':
      return <Github className={cn('shrink-0', className)} size={size} />;
    case 'research':
      return <FlaskConical className={cn('shrink-0', className)} size={size} />;
    case 'documentation':
      return <FileText className={cn('shrink-0', className)} size={size} />;
    case 'website':
      return <Globe className={cn('shrink-0', className)} size={size} />;
    case 'registry':
      return <Package className={cn('shrink-0', className)} size={size} />;
    default:
      return <ExternalLink className={cn('shrink-0', className)} size={size} />;
  }
}

export function SourceBadge({
  source,
  className,
}: {
  source: ProjectSource;
  className?: string;
}) {
  const isExternal = source.url.startsWith('http://') || source.url.startsWith('https://');
  const label =
    source.label ||
    (source.platform === 'huggingface'
      ? 'Hugging Face'
      : source.platform === 'github'
      ? 'GitHub'
      : source.platform === 'documentation'
      ? 'Documentation'
      : source.platform === 'research'
      ? 'Research Paper'
      : source.platform === 'registry'
      ? 'npm Registry'
      : 'Authoritative Source');

  const content = (
    <span
      className={cn(
        'group inline-flex items-center gap-1.5 border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground transition-all hover:border-brand/60 hover:text-brand',
        className
      )}
    >
      <PlatformIcon platform={source.platform} className="text-muted-foreground group-hover:text-brand" />
      <span>{label}</span>
      {isExternal && (
        <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
      )}
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`View authoritative source: ${label}`}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return <Link href={source.url}>{content}</Link>;
}

export function ArtifactClassificationBadge({
  classification,
  className,
}: {
  classification?: ArtifactClassification | string;
  className?: string;
}) {
  if (!classification) return null;

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'AI Model':
        return 'border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400';
      case 'Space / Demo':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'Application':
        return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'Software Platform':
      case 'Software System':
        return 'border-brand/40 bg-brand/10 text-brand';
      case 'Research Project':
      case 'Publication':
        return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400';
      case 'Dataset':
        return 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'Tool':
      case 'Library':
        return 'border-slate-500/40 bg-slate-500/10 text-foreground';
      default:
        return 'border-border bg-secondary/50 text-muted-foreground';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
        getBadgeStyle(classification),
        className
      )}
    >
      {classification}
    </span>
  );
}

export function AffiliationBadge({
  affiliation,
  className,
}: {
  affiliation?: AffiliationType | string;
  className?: string;
}) {
  if (!affiliation) return null;

  const getStyle = (aff: string) => {
    switch (aff) {
      case 'TIV':
        return 'border-brand/40 text-brand bg-brand/5';
      case 'TIVerse':
        return 'border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/5';
      case 'Founder':
        return 'border-zinc-500/40 text-muted-foreground bg-zinc-500/5';
      case 'External':
        return 'border-border text-muted-foreground';
      default:
        return 'border-border text-muted-foreground';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
        getStyle(affiliation),
        className
      )}
    >
      <span>ORG:</span>
      <span className="font-semibold">{affiliation}</span>
    </span>
  );
}
