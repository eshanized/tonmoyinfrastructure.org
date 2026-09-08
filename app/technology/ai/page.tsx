import type { Metadata } from 'next';
import { AIPortalView } from '@/components/ai/ai-portal-view';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  path: '/technology/ai',
  title: 'Artificial Intelligence & Machine Learning — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'TIV artificial intelligence and machine learning models, agent systems, interactive demos, and experimental architectures on Hugging Face and GitHub.',
});

export default function TechnologyAIPage() {
  return <AIPortalView basePath="technology" />;
}
