import { describe, expect, it } from 'vitest';
import { clockText, isOnShift, quarterOf } from '~/lib/time';

const tz = 'Europe/Amsterdam';

describe('time helpers', () => {
  it('formats the local clock', () => {
    expect(clockText(new Date('2026-11-04T08:05:00Z'), tz)).toBe('09:05');
    expect(clockText(new Date('2026-07-01T22:30:00Z'), tz)).toBe('00:30');
  });

  it('uses the local date for the quarter', () => {
    // 23:30 UTC on 31 December is already New Year in Rotterdam.
    expect(quarterOf(new Date('2026-12-31T23:30:00Z'), tz)).toMatchObject({ quarter: 1, year: 2027, short: 'Q1·27' });
    expect(quarterOf(new Date('2026-11-04T12:00:00Z'), tz).long).toBe('Q4 2026');
  });

  it('knows when the studio is on shift', () => {
    const shift = { from: 10, to: 19 };
    expect(isOnShift(new Date('2026-11-04T10:00:00Z'), tz, shift)).toBe(true); // Wed 11:00
    expect(isOnShift(new Date('2026-11-04T18:30:00Z'), tz, shift)).toBe(false); // Wed 19:30
    expect(isOnShift(new Date('2026-11-07T12:00:00Z'), tz, shift)).toBe(false); // Saturday
  });
});
