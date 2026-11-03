/**
 * The Nightshift "N": one folded ribbon. Its two folds (top left, bottom right)
 * are fully rounded; its two ends are cut on the bias, like tape torn off a roll. The same outline
 * draws the SVG mark, the favicons, and the 3D logo in the hero.
 *
 * Coordinates live in a 100 × 100 box with y pointing down.
 */

type Corner = { x: number; y: number; r: number };

export const LOGO_CORNERS: Corner[] = [
  { x: 14, y: 16, r: 20 }, // top-left fold
  { x: 44, y: 16, r: 3 },
  { x: 68, y: 58, r: 1.5 }, // tip of the upper notch
  { x: 68, y: 16, r: 4 },
  { x: 86, y: 26, r: 5 }, // top end, cut on the bias
  { x: 86, y: 84, r: 20 }, // bottom-right fold
  { x: 56, y: 84, r: 3 },
  { x: 32, y: 42, r: 1.5 }, // tip of the lower notch
  { x: 32, y: 84, r: 4 },
  { x: 14, y: 74, r: 5 } // bottom end, cut on the bias
];

export type Segment =
  | { kind: 'move'; x: number; y: number }
  | { kind: 'line'; x: number; y: number }
  | { kind: 'quad'; cx: number; cy: number; x: number; y: number };

/** The outline as moves, lines, and quadratic corners. */
export function logoSegments(corners: Corner[] = LOGO_CORNERS): Segment[] {
  const n = corners.length;
  const cut = corners.map((v, i) => {
    const a = corners[(i - 1 + n) % n];
    const b = corners[(i + 1) % n];
    const da = Math.hypot(a.x - v.x, a.y - v.y);
    const db = Math.hypot(b.x - v.x, b.y - v.y);
    const t = Math.min(v.r, da / 2, db / 2);
    return {
      v,
      start: { x: v.x + ((a.x - v.x) / da) * t, y: v.y + ((a.y - v.y) / da) * t },
      end: { x: v.x + ((b.x - v.x) / db) * t, y: v.y + ((b.y - v.y) / db) * t }
    };
  });
  const segments: Segment[] = [
    { kind: 'move', x: cut[0].start.x, y: cut[0].start.y }
  ];
  cut.forEach((c, i) => {
    if (i > 0) segments.push({ kind: 'line', x: c.start.x, y: c.start.y });
    segments.push({
      kind: 'quad',
      cx: c.v.x,
      cy: c.v.y,
      x: c.end.x,
      y: c.end.y
    });
  });
  segments.push({ kind: 'line', x: cut[0].start.x, y: cut[0].start.y });
  return segments;
}

const round = (value: number) => Math.round(value * 100) / 100;

/** SVG path data for the N in the 100 × 100 box. */
export function logoPath(): string {
  return `${logoSegments()
    .map((s) => {
      if (s.kind === 'move') return `M${round(s.x)} ${round(s.y)}`;
      if (s.kind === 'line') return `L${round(s.x)} ${round(s.y)}`;
      return `Q${round(s.cx)} ${round(s.cy)} ${round(s.x)} ${round(s.y)}`;
    })
    .join('')}Z`;
}
