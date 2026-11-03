import { describe, expect, it } from 'vitest';
import { crew } from '~/content/crew';
import type { Block, CaseStudy, Img } from '~/content/types';
import { caseStudies, getCaseStudy, nextCaseStudy } from '~/content/work';
import { shareImageFor } from '~/lib/images';
import { sitemapEntries } from '~/lib/sitemap';

function imagesOf(study: CaseStudy): Img[] {
  const fromBlock = (block: Block): Img[] => {
    switch (block.type) {
      case 'image':
        return [block.image];
      case 'pair':
        return [...block.images];
      case 'video':
        return [block.poster];
      case 'beforeAfter':
        return [block.before, block.after];
      default:
        return [];
    }
  };
  return [study.cover, ...study.blocks.flatMap(fromBlock)];
}

describe('case studies', () => {
  it('exist, with unique slugs that match their files', () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    const slugs = caseStudies.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(getCaseStudy(slug)?.slug).toBe(slug);
  });

  it('loop through "next project"', () => {
    const last = caseStudies[caseStudies.length - 1];
    expect(nextCaseStudy(last.slug).slug).toBe(caseStudies[0].slug);
  });

  for (const study of caseStudies) {
    describe(study.slug, () => {
      it('has the required story fields', () => {
        expect(study.title.length).toBeGreaterThan(8);
        expect(study.summary.length).toBeGreaterThan(40);
        expect(study.problem.brief.length).toBeGreaterThan(40);
        expect(study.problem.constraint.length).toBeGreaterThan(40);
        expect(study.decisions.length).toBeGreaterThanOrEqual(3);
        expect(study.outcome.metrics.length).toBeGreaterThanOrEqual(3);
        expect(study.role.length).toBeGreaterThan(0);
        expect(study.accent).toMatch(/^#[0-9a-f]{6}$/i);
      });

      it('credits real crew members', () => {
        const names = crew.map((c) => c.name);
        for (const member of study.team) {
          expect(names.some((n) => member.startsWith(n)), member).toBe(true);
        }
      });

      it('has every image it names, each with alt text', () => {
        const images = imagesOf(study);
        for (const img of images) {
          expect(img.src.startsWith('data:image/svg'), `missing image in ${study.slug}`).toBe(false);
          expect(img.alt.length, `alt text in ${study.slug}`).toBeGreaterThan(10);
          expect(img.blur.startsWith('data:image/webp')).toBe(true);
          expect(img.width).toBeGreaterThan(0);
        }
      });

      it('has at most one live demo, and a share image', () => {
        expect(study.blocks.filter((b) => b.type === 'demo').length).toBeLessThanOrEqual(1);
        expect(shareImageFor(study.slug), 'add an image named cover to get cover-og.jpg').toBeTruthy();
      });

      it('has no placeholder copy', () => {
        const text = JSON.stringify(study).toLowerCase();
        expect(text).not.toMatch(/lorem|ipsum|placeholder|todo/);
      });
    });
  }
});

// The sample projects that ship with the template hold a higher bar: five or
// more rendered images and one live demo each. Delete a sample and its check
// goes with it.
const SAMPLES = ['golfslag-festival', 'okkerse-dochters', 'kliniek-dassen', 'kamerstuk', 'gaaf', 'ankerveld-groep'];

describe('sample work', () => {
  for (const study of caseStudies.filter((s) => SAMPLES.includes(s.slug))) {
    it(`${study.slug} has five or more distinct images and one live demo`, () => {
      expect(new Set(imagesOf(study).map((img) => img.src)).size).toBeGreaterThanOrEqual(5);
      expect(study.blocks.filter((b) => b.type === 'demo')).toHaveLength(1);
    });
  }
});

describe('sitemap', () => {
  it('lists every page and every case study', () => {
    const entries = sitemapEntries();
    for (const path of ['/', '/work', '/about', '/contact']) expect(entries).toContain(path);
    for (const study of caseStudies) expect(entries).toContain(`/work/${study.slug}`);
  });
});
