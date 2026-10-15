'use client';

import { useState } from 'react';
import { Copy, Check, BookOpen } from 'lucide-react';
import type { Publication } from '@/lib/publications/types';
import { formatApaCitation, formatBibtexCitation } from '@/lib/publications/citations';
import { cn } from '@/lib/utils';

interface CitationBlockProps {
  publication: Publication;
  className?: string;
}

export function CitationBlock({ publication, className }: CitationBlockProps) {
  const [format, setFormat] = useState<'apa' | 'bibtex'>('apa');
  const [copied, setCopied] = useState(false);

  const apaText = formatApaCitation(publication);
  const bibtexText = formatBibtexCitation(publication);
  const activeText = format === 'apa' ? apaText : bibtexText;

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(activeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className={cn('border border-border bg-card p-5', className)}>
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-brand" aria-hidden="true" />
          <span className="tiv-meta">Scholarly Citation</span>
        </div>
        <div className="flex items-center gap-1 border border-border p-0.5 bg-secondary/30">
          <button
            type="button"
            onClick={() => setFormat('apa')}
            className={cn(
              'px-2 py-0.5 text-xs font-mono transition-colors',
              format === 'apa'
                ? 'bg-brand text-brand-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-pressed={format === 'apa'}
          >
            APA 7th
          </button>
          <button
            type="button"
            onClick={() => setFormat('bibtex')}
            className={cn(
              'px-2 py-0.5 text-xs font-mono transition-colors',
              format === 'bibtex'
                ? 'bg-brand text-brand-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-pressed={format === 'bibtex'}
          >
            BibTeX
          </button>
        </div>
      </div>

      <div className="relative mt-2">
        <pre className="overflow-x-auto bg-secondary/30 p-3 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-words border border-border/50">
          <code>{activeText}</code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${format.toUpperCase()} citation`}
          className="mt-3 inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-xs font-mono text-muted-foreground transition-colors hover:border-brand hover:text-brand"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              <span className="text-emerald-500">Copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copy citation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
