/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext
} from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import type * as React from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import { AskProvider } from '~/components/site/AskPanel';
import { Cursor } from '~/components/site/Cursor';
import { EdgeReadouts } from '~/components/site/EdgeReadouts';
import { Footer } from '~/components/site/Footer';
import { Header } from '~/components/site/Header';
import { site } from '~/lib/site';
import { fontFaceCss, fontPreloads, themeStyle } from '~/lib/theme';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';
import '~/styles/app.css';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  // Site-wide defaults; each page's `seo()` overrides tags with the same name.
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: portfolio.colors.background },
      ...(site.googleSiteVerification
        ? [
            {
              name: 'google-site-verification',
              content: site.googleSiteVerification
            }
          ]
        : []),
      ...seo({ title: site.name, description: site.description }).meta
    ],
    links: [
      ...fontPreloads,
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  }),
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' style={themeStyle}>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: font rules built from the config file */}
        <style dangerouslySetInnerHTML={{ __html: fontFaceCss }} />
        <HeadContent />
      </head>
      <body>
        <AskProvider>
          <Header />
          <main id='main' className='pt-[var(--header-h)]'>
            {children}
          </main>
          <Footer />
          <EdgeReadouts />
          <Cursor />
        </AskProvider>
        <Scripts />
      </body>
    </html>
  );
}
