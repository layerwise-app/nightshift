import type { CaseStudy } from '~/content/types';

// Every `src/content/work/<slug>.ts` file is a case study. Adding a file adds
// the project to Home, Work, and the sitemap; deleting it removes it.
const modules = import.meta.glob<{ default: CaseStudy }>(
  ['./*.ts', '!./index.ts'],
  { eager: true }
);

export const caseStudies: CaseStudy[] = Object.entries(modules)
  .map(([path, mod]) => {
    const fileSlug = path.replace('./', '').replace(/\.ts$/, '');
    if (mod.default.slug !== fileSlug) {
      throw new Error(
        `src/content/work/${fileSlug}.ts has slug "${mod.default.slug}". Use "${fileSlug}" so its URL matches the file name.`
      );
    }
    return mod.default;
  })
  .sort((a, b) => a.order - b.order || b.year - a.year);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** The project after this one, looping back to the first. */
export function nextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}
