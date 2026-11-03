import { createFileRoute } from '@tanstack/react-router';
import { ClientGrid } from '~/components/home/ClientGrid';
import { Hero } from '~/components/home/Hero';
import { Pricing } from '~/components/home/Pricing';
import { Services } from '~/components/home/Services';
import { StudioStrip } from '~/components/home/StudioStrip';
import { WorkRail } from '~/components/home/WorkRail';
import { organizationJsonLd } from '~/lib/structured-data';
import { site } from '~/lib/site';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: `${portfolio.name} — ${portfolio.role} in ${portfolio.location.city}`,
      description: site.description,
      path: '/',
      jsonLd: organizationJsonLd()
    }),
  component: Home
});

function Home() {
  return (
    <>
      <Hero />
      <WorkRail />
      <Services />
      <ClientGrid />
      <Pricing />
      <StudioStrip />
    </>
  );
}
