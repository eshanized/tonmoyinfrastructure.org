'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { publicationMDXComponents } from '@/lib/publications/components';

interface MDXRendererProps {
  content: string;
}

const customComponents: any = {
  ...publicationMDXComponents,
  figure: (props: any) => {
    if (props.src) {
      return <publicationMDXComponents.Figure {...props} />;
    }
    return <figure {...props} />;
  },
  callout: (props: any) => <publicationMDXComponents.Callout {...props} />,
  codeblock: (props: any) => <publicationMDXComponents.CodeBlock {...props} />,
  researchtable: (props: any) => <publicationMDXComponents.ResearchTable {...props} />,
  reference: (props: any) => <publicationMDXComponents.Reference {...props} />,
};

export function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <article className="publication-prose leading-relaxed text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={customComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
