import type { CaseStudy } from '~/content/types';
import { shareImageFor } from '~/lib/images';
import { siteUrl } from '~/lib/site';
import { portfolio } from '~/portfolio.config';

/** schema.org Organization for the studio, shown on Home and About. */
export function organizationJsonLd() {
  const { location } = portfolio;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': siteUrl('/#organization'),
    name: portfolio.name,
    description: portfolio.bio.short,
    url: siteUrl('/'),
    logo: siteUrl('/logo.png'),
    image: siteUrl('/og-image.jpg'),
    foundingDate: String(portfolio.founded),
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: portfolio.crewSize
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressCountry: location.countryCode
    },
    ...(portfolio.ownerEmail ? { email: portfolio.ownerEmail } : {}),
    sameAs: portfolio.social.map((link) => link.url),
    knowsAbout: ['Brand identity', 'Web design', 'Front-end development', 'Product design']
  };
}

/** schema.org CreativeWork for one case study, with its cover as the image. */
export function caseStudyJsonLd(study: CaseStudy) {
  const image = shareImageFor(study.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${study.client}: ${study.title}`,
    headline: study.title,
    description: study.summary,
    url: siteUrl(`/work/${study.slug}`),
    dateCreated: String(study.year),
    ...(image ? { image: siteUrl(image) } : {}),
    creator: { '@id': siteUrl('/#organization'), '@type': 'Organization', name: portfolio.name },
    about: study.sector,
    keywords: study.role.join(', ')
  };
}
