import '@fontsource-variable/archivo/wdth.css';
import { useId, type CSSProperties, type ReactNode } from 'react';

/** Kamerstuk brand: paper, sand, charcoal, oak, terracotta, moss. */
export const K = {
  paper: '#F2EFE8',
  sand: '#E4DDD0',
  sand2: '#D9D0BF',
  ink: '#1D1C1A',
  ink2: '#57534C',
  ink3: '#8A847A',
  line: '#D3CBBC',
  oak: '#C89B65',
  terracotta: '#B4552F',
  moss: '#5E6A45',
  white: '#FBFAF6'
} as const;

export const FONT = "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif";

/** Expanded Archivo for headings. */
export const wide = (stretch = 118, weight = 760): CSSProperties => ({
  fontFamily: FONT,
  fontStretch: `${stretch}%`,
  fontWeight: weight,
  letterSpacing: '-0.012em'
});

export const ui: CSSProperties = { fontFamily: FONT, fontStretch: '100%' };

export const euro = (n: number) => `€${n.toLocaleString('en-GB').replace(/,/g, ',')}`;

/* ------------------------------------------------------------------ data */

export type Wood = { id: string; name: string; short: string; color: string; surcharge: number; weeks: number; origin: string };
export type Fabric = { id: string; name: string; material: string; color: string; surcharge: number; weeks: number; texture: Texture; mill: string };
export type Texture = 'boucle' | 'linen' | 'cord' | 'herringbone' | 'canvas';

export const WOODS: Wood[] = [
  { id: 'oak', name: 'Oak, oiled', short: 'Oak', color: '#C89B65', surcharge: 0, weeks: 0, origin: 'FSC oak, Veluwe' },
  { id: 'ash', name: 'Ash, white oil', short: 'Ash', color: '#DCC6A0', surcharge: 0, weeks: 0, origin: 'FSC ash, Drenthe' },
  { id: 'walnut', name: 'Walnut', short: 'Walnut', color: '#6E4630', surcharge: 380, weeks: 2, origin: 'European walnut, Limburg' },
  { id: 'black', name: 'Oak, black stain', short: 'Black oak', color: '#2D2925', surcharge: 160, weeks: 1, origin: 'FSC oak, stained in Dordrecht' }
];

export const FABRICS: Fabric[] = [
  { id: 'duin', name: 'Bouclé Duin', material: 'Wool bouclé', color: '#D8CDB8', surcharge: 240, weeks: 1, texture: 'boucle', mill: 'De Ploeg, Tilburg' },
  { id: 'klei', name: 'Linen Klei', material: 'Washed linen', color: '#B4552F', surcharge: 120, weeks: 0, texture: 'linen', mill: 'Linnenhuis, Twente' },
  { id: 'mos', name: 'Corduroy Mos', material: 'Wide-wale corduroy', color: '#5E6A45', surcharge: 180, weeks: 0, texture: 'cord', mill: 'Weverij Noord, Groningen' },
  { id: 'lood', name: 'Herringbone Lood', material: 'Wool herringbone', color: '#4A4C51', surcharge: 310, weeks: 2, texture: 'herringbone', mill: 'De Ploeg, Tilburg' },
  { id: 'kalk', name: 'Canvas Kalk', material: 'Cotton canvas', color: '#EAE4D7', surcharge: 0, weeks: 0, texture: 'canvas', mill: 'Linnenhuis, Twente' }
];

export const WIDTHS = [
  { cm: 180, price: 2890, weeks: 0, seats: 2 },
  { cm: 210, price: 3240, weeks: 0, seats: 3 },
  { cm: 240, price: 3590, weeks: 1, seats: 3 }
] as const;

export const SOFA_BASE_WEEKS = 7;

export function sofaQuote(woodId: string, fabricId: string, cm: number) {
  const wood = WOODS.find((w) => w.id === woodId) ?? WOODS[0];
  const fabric = FABRICS.find((f) => f.id === fabricId) ?? FABRICS[0];
  const width = WIDTHS.find((w) => w.cm === cm) ?? WIDTHS[1];
  return {
    wood,
    fabric,
    width,
    price: width.price + wood.surcharge + fabric.surcharge,
    weeks: SOFA_BASE_WEEKS + wood.weeks + fabric.weeks + width.weeks
  };
}

export type Workshop = { name: string; city: string; makes: string; since: number; makers: number; weeks: number };

export const WORKSHOPS: Workshop[] = [
  { name: 'Werkplaats Van Rijn', city: 'Dordrecht', makes: 'Sofas and armchairs', since: 1987, makers: 6, weeks: 7 },
  { name: 'Houtatelier Brink', city: 'Zwolle', makes: 'Dining tables', since: 2009, makers: 4, weeks: 6 },
  { name: 'Stoelmakerij De Kruk', city: 'Tilburg', makes: 'Chairs and benches', since: 1974, makers: 9, weeks: 5 },
  { name: 'Kastenmakers Oost', city: 'Enschede', makes: 'Sideboards and cabinets', since: 2014, makers: 3, weeks: 9 },
  { name: 'Draaierij Mol', city: 'Deventer', makes: 'Stools and turned legs', since: 1996, makers: 2, weeks: 3 },
  { name: 'Werkplaats Noordkade', city: 'Veghel', makes: 'Beds', since: 2011, makers: 5, weeks: 8 },
  { name: 'Stoffeerderij Bos', city: 'Gouda', makes: 'Upholstered chairs', since: 1958, makers: 4, weeks: 6 },
  { name: 'Atelier Veenstra', city: 'Leeuwarden', makes: 'Coffee and side tables', since: 2017, makers: 2, weeks: 5 },
  { name: 'Meubelmakerij Haak', city: 'Schiedam', makes: 'Shelving in steel and wood', since: 2005, makers: 3, weeks: 4 }
];

/* ----------------------------------------------------------- colour math */

function hexToRgb(hex: string) {
  const n = Number.parseInt(hex.replace('#', '').slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Mix a hex colour toward white (amount > 0) or black (amount < 0). */
export function shade(hex: string, amount: number) {
  const [r, g, b] = hexToRgb(hex);
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  const mix = (c: number) => Math.round(c + (t - c) * p).toString(16).padStart(2, '0');
  return `#${mix(r)}${mix(g)}${mix(b)}`;
}

/* --------------------------------------------- oblique drawing engine */

/**
 * Every piece is drawn from boxes in an oblique projection: front faces flat,
 * top faces a little lighter, right sides a little darker. Units are cm.
 */
export type Box = {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  color: string;
  texture?: Texture;
  r?: number;
  /** Lines drawn on the front face, as x offsets (cm), e.g. door gaps. */
  splits?: number[];
};

const KX = 0.44;
const KY = 0.27;

function pt(x: number, y: number, z: number) {
  return [x + z * KX, -y - z * KY] as const;
}

function poly(points: (readonly [number, number])[]) {
  return points.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
}

function TexturePatterns({ id, color }: { id: string; color: string }) {
  const dark = shade(color, -0.22);
  const light = shade(color, 0.18);
  return (
    <defs>
      <pattern id={`${id}-boucle`} width='3.2' height='3.2' patternUnits='userSpaceOnUse'>
        <circle cx='0.8' cy='0.8' r='0.55' fill={dark} opacity='0.35' />
        <circle cx='2.4' cy='2.3' r='0.5' fill={light} opacity='0.5' />
      </pattern>
      <pattern id={`${id}-linen`} width='2' height='2' patternUnits='userSpaceOnUse'>
        <path d='M0 0.5H2M0 1.5H2' stroke={dark} strokeWidth='0.18' opacity='0.35' />
        <path d='M0.5 0V2' stroke={light} strokeWidth='0.14' opacity='0.4' />
      </pattern>
      <pattern id={`${id}-cord`} width='2.6' height='10' patternUnits='userSpaceOnUse'>
        <rect x='0' y='0' width='0.9' height='10' fill={dark} opacity='0.32' />
        <rect x='1.4' y='0' width='0.5' height='10' fill={light} opacity='0.35' />
      </pattern>
      <pattern id={`${id}-herringbone`} width='4' height='4' patternUnits='userSpaceOnUse'>
        <path d='M0 4L2 0M2 0L4 4' stroke={light} strokeWidth='0.35' opacity='0.45' fill='none' />
      </pattern>
      <pattern id={`${id}-canvas`} width='1.6' height='1.6' patternUnits='userSpaceOnUse'>
        <path d='M0 0.4H1.6M0.4 0V1.6' stroke={dark} strokeWidth='0.12' opacity='0.3' />
      </pattern>
    </defs>
  );
}

function BoxShape({ b, pid }: { b: Box; pid: string }) {
  const { x, y, z, w, h, d, color } = b;
  const top = [pt(x, y + h, z), pt(x, y + h, z + d), pt(x + w, y + h, z + d), pt(x + w, y + h, z)];
  const side = [pt(x + w, y + h, z), pt(x + w, y + h, z + d), pt(x + w, y, z + d), pt(x + w, y, z)];
  const [fx, fy] = pt(x, y + h, z);
  const tex = b.texture ? `url(#${pid}-${b.texture})` : undefined;
  return (
    <g>
      <polygon points={poly(side)} fill={shade(color, -0.17)} />
      {tex ? <polygon points={poly(side)} fill={tex} /> : null}
      <polygon points={poly(top)} fill={shade(color, 0.13)} />
      {tex ? <polygon points={poly(top)} fill={tex} /> : null}
      <rect x={fx} y={fy} width={w} height={h} rx={b.r ?? 0} fill={color} />
      {tex ? <rect x={fx} y={fy} width={w} height={h} rx={b.r ?? 0} fill={tex} /> : null}
      {b.splits?.map((s) => (
        <line key={s} x1={fx + s} y1={fy + 1.2} x2={fx + s} y2={fy + h - 1.2} stroke={shade(color, -0.35)} strokeWidth='0.5' />
      ))}
    </g>
  );
}

type DrawingProps = {
  boxes: Box[];
  /** Footprint for the floor shadow: width and depth in cm. */
  footprint: { w: number; d: number };
  className?: string;
  style?: CSSProperties;
  title?: string;
  /** Extra space around the drawing in cm. */
  pad?: number;
  /** Fixed viewBox width so pieces of different widths share a scale. */
  frameWidth?: number;
  frameHeight?: number;
  children?: ReactNode;
};

export function Drawing({ boxes, footprint, className, style, title, pad = 8, frameWidth, frameHeight, children }: DrawingProps) {
  const pid = useId().replace(/:/g, '');
  const pts = boxes.flatMap((b) => [
    pt(b.x, b.y, b.z),
    pt(b.x + b.w, b.y + b.h, b.z + b.d),
    pt(b.x, b.y + b.h, b.z + b.d),
    pt(b.x + b.w, b.y, b.z)
  ]);
  const minX = Math.min(...pts.map((p) => p[0]));
  const maxX = Math.max(...pts.map((p) => p[0]));
  const minY = Math.min(...pts.map((p) => p[1]));
  const maxY = 0;
  const w = frameWidth ?? maxX - minX + pad * 2;
  const h = frameHeight ?? maxY - minY + pad * 2 + 6;
  const cx = (minX + maxX) / 2;
  const vb = `${cx - w / 2} ${maxY + pad + 6 - h} ${w} ${h}`;
  const shadow = [pt(-3, 0, -2), pt(footprint.w + 3, 0, -2), pt(footprint.w + 3, 0, footprint.d + 2), pt(-3, 0, footprint.d + 2)];
  const fabric = boxes.find((b) => b.texture)?.color ?? '#999999';
  return (
    <svg viewBox={vb} className={className} style={style} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <TexturePatterns id={pid} color={fabric} />
      <polygon points={poly(shadow)} fill='#1D1C1A' opacity='0.09' />
      {boxes.map((b, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: draw order is the identity
        <BoxShape key={i} b={b} pid={pid} />
      ))}
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------- furniture */

export function sofaBoxes(width: number, wood: string, fabric: string, texture?: Texture): Box[] {
  const W = width;
  const arm = 15;
  const inner = W - arm * 2;
  const seats = width <= 180 ? 2 : 3;
  const cw = inner / seats;
  const legs = (z: number): Box[] => [
    { x: 7, y: 0, z, w: 4.5, h: 11, d: 4.5, color: wood },
    { x: W - 11.5, y: 0, z, w: 4.5, h: 11, d: 4.5, color: wood }
  ];
  const boxes: Box[] = [
    ...legs(78),
    { x: 3, y: 11, z: 3, w: W - 6, h: 5, d: 86, color: wood },
    { x: 0, y: 16, z: 70, w: W, h: 60, d: 22, color: fabric, texture, r: 2 },
    { x: 0, y: 16, z: 0, w: arm, h: 44, d: 92, color: fabric, texture, r: 3 }
  ];
  for (let i = 0; i < seats; i++) {
    boxes.push({ x: arm + i * cw + 0.6, y: 36, z: 56, w: cw - 1.2, h: 36, d: 14, color: shade(fabric, 0.04), texture, r: 4 });
  }
  boxes.push({ x: arm, y: 16, z: 1, w: inner, h: 12, d: 69, color: shade(fabric, -0.06), texture });
  for (let i = 0; i < seats; i++) {
    boxes.push({ x: arm + i * cw + 0.6, y: 28, z: 0, w: cw - 1.2, h: 13, d: 62, color: fabric, texture, r: 3 });
  }
  boxes.push({ x: W - arm, y: 16, z: 0, w: arm, h: 44, d: 92, color: fabric, texture, r: 3 });
  boxes.push(...legs(4));
  return boxes;
}

export function Sofa({ width = 210, wood = WOODS[0].color, fabric = FABRICS[0].color, texture, frameWidth, className, style, title }: {
  width?: number; wood?: string; fabric?: string; texture?: Texture; frameWidth?: number; className?: string; style?: CSSProperties; title?: string;
}) {
  return <Drawing boxes={sofaBoxes(width, wood, fabric, texture)} footprint={{ w: width, d: 92 }} frameWidth={frameWidth} className={className} style={style} title={title} />;
}

export function Armchair({ wood = WOODS[0].color, fabric = FABRICS[1].color, texture, className }: { wood?: string; fabric?: string; texture?: Texture; className?: string }) {
  const boxes: Box[] = [
    { x: 6, y: 0, z: 66, w: 4, h: 14, d: 4, color: wood },
    { x: 68, y: 0, z: 66, w: 4, h: 14, d: 4, color: wood },
    { x: 4, y: 40, z: 60, w: 70, h: 44, d: 16, color: fabric, texture, r: 6 },
    { x: 0, y: 14, z: 4, w: 6, h: 4, d: 70, color: wood },
    { x: 0, y: 0, z: 6, w: 6, h: 54, d: 4, color: wood },
    { x: 6, y: 14, z: 4, w: 66, h: 26, d: 62, color: fabric, texture, r: 5 },
    { x: 72, y: 0, z: 6, w: 6, h: 54, d: 4, color: wood },
    { x: 72, y: 50, z: 2, w: 6, h: 4, d: 72, color: wood }
  ];
  return <Drawing boxes={boxes} footprint={{ w: 78, d: 76 }} className={className} />;
}

export function Table({ length = 220, wood = WOODS[0].color, className }: { length?: number; wood?: string; className?: string }) {
  const L = length;
  const boxes: Box[] = [
    { x: 8, y: 0, z: 78, w: 7, h: 71, d: 7, color: wood },
    { x: L - 15, y: 0, z: 78, w: 7, h: 71, d: 7, color: wood },
    { x: 8, y: 62, z: 8, w: L - 16, h: 9, d: 77, color: shade(wood, -0.05) },
    { x: 8, y: 0, z: 8, w: 7, h: 71, d: 7, color: wood },
    { x: L - 15, y: 0, z: 8, w: 7, h: 71, d: 7, color: wood },
    { x: 0, y: 71, z: 0, w: L, h: 4, d: 93, color: wood }
  ];
  return <Drawing boxes={boxes} footprint={{ w: L, d: 93 }} className={className} />;
}

export function Chair({ wood = WOODS[0].color, seat = FABRICS[1].color, texture, className }: { wood?: string; seat?: string; texture?: Texture; className?: string }) {
  const boxes: Box[] = [
    { x: 2, y: 0, z: 38, w: 3.6, h: 84, d: 3.6, color: wood },
    { x: 40, y: 0, z: 38, w: 3.6, h: 84, d: 3.6, color: wood },
    { x: 5, y: 60, z: 38.5, w: 35, h: 20, d: 2.6, color: wood },
    { x: 2, y: 0, z: 2, w: 3.6, h: 44, d: 3.6, color: wood },
    { x: 2, y: 40, z: 2, w: 41.6, h: 6, d: 38, color: seat, texture, r: 1.5 },
    { x: 40, y: 0, z: 2, w: 3.6, h: 44, d: 3.6, color: wood }
  ];
  return <Drawing boxes={boxes} footprint={{ w: 44, d: 42 }} className={className} />;
}

export function Sideboard({ wood = WOODS[2].color, className }: { wood?: string; className?: string }) {
  const boxes: Box[] = [
    { x: 6, y: 0, z: 36, w: 4, h: 14, d: 4, color: shade(wood, -0.15) },
    { x: 170, y: 0, z: 36, w: 4, h: 14, d: 4, color: shade(wood, -0.15) },
    { x: 0, y: 14, z: 0, w: 180, h: 62, d: 44, color: wood, splits: [45, 90, 135] },
    { x: 6, y: 0, z: 4, w: 4, h: 14, d: 4, color: shade(wood, -0.15) },
    { x: 170, y: 0, z: 4, w: 4, h: 14, d: 4, color: shade(wood, -0.15) }
  ];
  return <Drawing boxes={boxes} footprint={{ w: 180, d: 44 }} className={className} />;
}

export function Stool({ wood = WOODS[1].color, className }: { wood?: string; className?: string }) {
  const boxes: Box[] = [
    { x: 4, y: 0, z: 26, w: 3.5, h: 44, d: 3.5, color: wood },
    { x: 26, y: 0, z: 26, w: 3.5, h: 44, d: 3.5, color: wood },
    { x: 4, y: 14, z: 4, w: 25, h: 2.5, d: 25, color: shade(wood, -0.08) },
    { x: 4, y: 0, z: 4, w: 3.5, h: 44, d: 3.5, color: wood },
    { x: 26, y: 0, z: 4, w: 3.5, h: 44, d: 3.5, color: wood },
    { x: 0, y: 44, z: 0, w: 34, h: 4, d: 34, color: wood, r: 1 }
  ];
  return <Drawing boxes={boxes} footprint={{ w: 34, d: 34 }} className={className} />;
}

export function Bed({ wood = WOODS[0].color, linen = FABRICS[4].color, className }: { wood?: string; linen?: string; className?: string }) {
  const boxes: Box[] = [
    { x: 0, y: 0, z: 200, w: 170, h: 92, d: 6, color: wood },
    { x: 14, y: 38, z: 170, w: 64, h: 18, d: 22, color: shade(linen, 0.04), texture: 'linen', r: 5 },
    { x: 92, y: 38, z: 170, w: 64, h: 18, d: 22, color: shade(linen, 0.04), texture: 'linen', r: 5 },
    { x: 0, y: 8, z: 0, w: 170, h: 26, d: 200, color: wood },
    { x: 4, y: 34, z: 0, w: 162, h: 10, d: 170, color: linen, texture: 'linen', r: 2 }
  ];
  return <Drawing boxes={boxes} footprint={{ w: 170, d: 206 }} className={className} />;
}

export function CoffeeTable({ wood = WOODS[2].color, className }: { wood?: string; className?: string }) {
  const boxes: Box[] = [
    { x: 4, y: 0, z: 50, w: 5, h: 36, d: 5, color: wood },
    { x: 101, y: 0, z: 50, w: 5, h: 36, d: 5, color: wood },
    { x: 4, y: 10, z: 5, w: 102, h: 2.5, d: 50, color: shade(wood, -0.08) },
    { x: 4, y: 0, z: 5, w: 5, h: 36, d: 5, color: wood },
    { x: 101, y: 0, z: 5, w: 5, h: 36, d: 5, color: wood },
    { x: 0, y: 36, z: 0, w: 110, h: 4, d: 60, color: wood }
  ];
  return <Drawing boxes={boxes} footprint={{ w: 110, d: 60 }} className={className} />;
}

export function Shelf({ wood = WOODS[0].color, className }: { wood?: string; className?: string }) {
  const steel = '#2B2B2B';
  const boxes: Box[] = [
    { x: 10, y: 0, z: 26, w: 2, h: 150, d: 2, color: steel },
    { x: 108, y: 0, z: 26, w: 2, h: 150, d: 2, color: steel },
    { x: 0, y: 10, z: 0, w: 120, h: 3, d: 30, color: wood },
    { x: 0, y: 56, z: 0, w: 120, h: 3, d: 30, color: wood },
    { x: 0, y: 102, z: 0, w: 120, h: 3, d: 30, color: wood },
    { x: 0, y: 146, z: 0, w: 120, h: 3, d: 30, color: wood },
    { x: 10, y: 0, z: 2, w: 2, h: 150, d: 2, color: steel },
    { x: 108, y: 0, z: 2, w: 2, h: 150, d: 2, color: steel }
  ];
  return <Drawing boxes={boxes} footprint={{ w: 120, d: 30 }} className={className} />;
}

/* -------------------------------------------------------------- brand UI */

export function Wordmark({ size = 20, color = K.ink, className }: { size?: number; color?: string; className?: string }) {
  return (
    <span className={className} style={{ ...wide(125, 820), fontSize: size, color, letterSpacing: '0.01em', display: 'inline-flex', alignItems: 'center', gap: size * 0.35, lineHeight: 1 }}>
      <svg width={size * 0.72} height={size * 0.72} viewBox='0 0 10 10' aria-hidden='true'>
        <rect x='0' y='0' width='10' height='10' fill={K.terracotta} />
        <rect x='0' y='6' width='6' height='4' fill={color === K.ink ? K.paper : K.ink} />
      </svg>
      KAMERSTUK
    </span>
  );
}

/** A fabric or wood swatch with its texture. */
export function Swatch({ color, texture, size = 32, round = true, grain }: { color: string; texture?: Texture; size?: number; round?: boolean; grain?: boolean }) {
  const pid = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox='0 0 20 20' aria-hidden='true' style={{ borderRadius: round ? '50%' : 3, display: 'block', flexShrink: 0 }}>
      {texture ? <TexturePatterns id={pid} color={color} /> : null}
      <rect width='20' height='20' fill={color} />
      {texture ? <rect width='20' height='20' fill={`url(#${pid}-${texture})`} /> : null}
      {grain ? (
        <g fill='none' stroke={shade(color, -0.22)} strokeWidth='0.35' opacity='0.7'>
          <path d='M-1 4C5 2 9 6 21 3' />
          <path d='M-1 8C6 7 10 10 21 7.5' />
          <path d='M-1 12.5C4 11 12 14.5 21 11.5' />
          <path d='M-1 16.5C7 15 11 18 21 16' />
        </g>
      ) : null}
    </svg>
  );
}

export function Icon({ name, size = 18, color = 'currentColor' }: { name: 'cart' | 'back' | 'search' | 'pin' | 'check' | 'truck' | 'clock' | 'chev' | 'menu' | 'heart' | 'plus' | 'minus'; size?: number; color?: string }) {
  const p = { fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' aria-hidden='true'>
      {name === 'cart' && <path {...p} d='M3 5h2l2 11h11l2-8H7M10 20.5h.01M17 20.5h.01' />}
      {name === 'back' && <path {...p} d='M15 5l-7 7 7 7' />}
      {name === 'chev' && <path {...p} d='M9 5l7 7-7 7' />}
      {name === 'search' && <path {...p} d='M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.5-4.5' />}
      {name === 'pin' && <path {...p} d='M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' />}
      {name === 'check' && <path {...p} d='M5 12.5l4.5 4.5L19 7.5' />}
      {name === 'truck' && <path {...p} d='M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' />}
      {name === 'clock' && <path {...p} d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2' />}
      {name === 'menu' && <path {...p} d='M4 7h16M4 12h16M4 17h16' />}
      {name === 'heart' && <path {...p} d='M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z' />}
      {name === 'plus' && <path {...p} d='M12 5v14M5 12h14' />}
      {name === 'minus' && <path {...p} d='M5 12h14' />}
    </svg>
  );
}

/** Ready-in chip used on cards. */
export function LeadChip({ weeks, city, dark }: { weeks: number; city?: string; dark?: boolean }) {
  return (
    <span
      style={{ ...ui, fontSize: 11.5, fontWeight: 560, color: dark ? K.paper : K.ink, background: dark ? 'rgba(255,255,255,0.12)' : K.white, border: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : K.line}` }}
      className='inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px]'
    >
      <span className='size-[6px] rounded-full' style={{ background: K.moss }} />
      Ready in {weeks} wks{city ? ` · ${city}` : ''}
    </span>
  );
}
