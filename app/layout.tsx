import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ScrollProgress } from '@/components/shared/scroll-progress';
import { cn } from '@/lib/utils';

const barlow = localFont({
  src: [
    {
      path: './fonts/barlow-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/barlow-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/barlow-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/barlow-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-barlow',
  display: 'swap',
});

const jetbrains = localFont({
  src: [
    {
      path: './fonts/jetbrains-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/jetbrains-mono-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/jetbrains-mono-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
});


import { siteConfig } from '@/lib/site-config';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.canonicalUrl,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.canonicalUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.defaultOgImage}`],
  },
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
  manifest: siteConfig.manifest,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    ...(siteConfig.verification.google ? { google: siteConfig.verification.google } : {}),
    ...(siteConfig.verification.bing
      ? { other: { 'msvalidate.01': siteConfig.verification.bing } }
      : {}),
  },
};

const rootStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [generateOrganizationSchema(), generateWebSiteSchema()],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          barlow.variable,
          jetbrains.variable,
          'font-sans antialiased'
        )}
      >
        <JsonLd data={rootStructuredData} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <ScrollProgress />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
