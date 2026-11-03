import { caseStudies } from '~/content/work';
import { sitemapPaths } from '~/lib/site';

/** Every path in /sitemap.xml: the fixed pages plus one per case study. */
export function sitemapEntries(): string[] {
  return [...sitemapPaths, ...caseStudies.map((study) => `/work/${study.slug}`)];
}
