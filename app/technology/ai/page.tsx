import type { Metadata } from 'next';
import { AIPortalView } from '@/components/ai/ai-portal-view';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  path: '/technology/ai',
  title: 'Artificial Intelligence & Machine Learning — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'TIV artificial intelligence models, agent systems, interactive demos, and experimental architectures on Hugging Face and GitHub, including Kyro, a local-first desktop AI assistant with a public Linux v0.1.0 release.',
});

export default function TechnologyAIPage() {
  return <AIPortalView basePath="technology" />;
}
