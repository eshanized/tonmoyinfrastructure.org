'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        'space-y-6 text-pretty leading-relaxed text-muted-foreground',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-12 border-t border-border pt-8 font-display text-3xl tracking-tight text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 border-t border-border pt-8 font-display text-2xl tracking-tight text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 font-display text-xl tracking-tight text-foreground">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 font-display text-lg font-medium text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-brand underline-offset-4 transition-colors hover:underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-6">{children}</ol>
          ),
          li: ({ children, ...props }) => {
            const parent = (props as { node?: { parent?: { tagName?: string } } }).node?.parent;
            const isOrdered = parent?.tagName === 'ol';
            return (
              <li className="leading-relaxed">
                {!isOrdered && (
                  <span className="mr-2 text-brand">—</span>
                )}
                <span>{children}</span>
              </li>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brand bg-brand/5 p-4">
              <div className="text-sm leading-relaxed">{children}</div>
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre className="overflow-x-auto border border-border bg-secondary/50 p-4 font-mono text-sm">
                  <code {...props}>{children}</code>
                </pre>
              );
            }
            return (
              <code
                className="border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-border">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="pb-3 pr-6 pt-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/50 py-2.5 pr-6 text-muted-foreground">
              {children}
            </td>
          ),
          hr: () => <hr className="border-border" />,
          input: ({ checked, ...props }) =>
            props.type === 'checkbox' ? (
              <span
                className={cn(
                  'mr-2 inline-flex h-4 w-4 items-center justify-center border text-xs',
                  checked
                    ? 'border-brand bg-brand text-brand-foreground'
                    : 'border-border bg-card'
                )}
              >
                {checked ? '✓' : ''}
              </span>
            ) : null,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
