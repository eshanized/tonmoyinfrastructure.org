import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Search — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description: 'Search across TIV public content, projects, publications, and infrastructure.',
  path: '/search',
  noIndex: true,
});

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
