import { describe, expect, it } from 'vitest';
import { answerText, askEntries, type AskContext } from '~/content/ask';
import { searchAsk, tokens } from '~/lib/ask-search';

const ctx: AskContext = {
  slotsOpen: 2,
  slotsPerQuarter: 4,
  quarter: 'Q4 2026',
  nextStart: 'January 2027',
  city: 'Rotterdam'
};
const search = (q: string) => searchAsk(q, askEntries, (e) => answerText(e, ctx)).map((e) => e.id);

describe('searchAsk', () => {
  it('returns every question for an empty query, in written order', () => {
    expect(search('')).toEqual(askEntries.map((e) => e.id));
    expect(search('   how do you ')).toEqual(askEntries.map((e) => e.id));
  });

  it('ranks the obvious question first', () => {
    expect(search('website cost')[0]).toBe('website-cost');
    expect(search('when can you start')[0]).toBe('start');
    expect(search('copy')[0]).toBe('copy');
    expect(search('retainer')[0]).toBe('retainer');
  });

  it('finds questions through keywords people type', () => {
    expect(search('btw')).toContain('payment');
    expect(search('shopify')).toContain('stack');
    expect(search('remote')).toContain('abroad');
  });

  it('requires every word to match somewhere', () => {
    expect(search('website zebra')).toEqual([]);
    expect(search('qwertyuiop')).toEqual([]);
  });

  it('drops stop words from the query', () => {
    expect(tokens('How do you price a website?')).toEqual(['price', 'website']);
  });
});

describe('ask content', () => {
  it('has unique ids and non-empty answers', () => {
    const ids = askEntries.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const entry of askEntries) {
      expect(answerText(entry, ctx).join(' ').length).toBeGreaterThan(40);
    }
  });

  it('reads live availability into the answer', () => {
    const start = askEntries.find((e) => e.id === 'start');
    expect(start && answerText(start, ctx)[0]).toContain('2 of 4 project slots open in Q4 2026');
    expect(start && answerText(start, { ...ctx, slotsOpen: 0 })[0]).toContain('Q4 2026 is full');
  });
});
