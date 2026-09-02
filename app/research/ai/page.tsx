import type { Metadata } from 'next';
import { AIPortalView } from '@/components/ai/ai-portal-view';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  path: '/research/ai',
  title: 'AI & Machine Learning Research — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'Research checkpoints, open causal models, agent systems, and experimental architectures from Tonmoy Infrastructure & Vision.',
});

export default function ResearchAIPage() {
  return <AIPortalView basePath="research" />;
}
