import '@fontsource-variable/bricolage-grotesque/standard.css';
import type { CSSProperties, ReactNode } from 'react';

/** Golfslag Festival's own identity: night blue, coral, sand. */
export const G = {
  night: '#12145A',
  deep: '#0A0B36',
  ink: '#0B0C2E',
  coral: '#FF6A4D',
  coralDeep: '#E5482B',
  sand: '#F3E9DA',
  sandDeep: '#E6D6BE',
  lilac: '#B7BBFF',
  sea: '#3A44E0',
  white: '#FFFFFF'
} as const;

export const font = "'Bricolage Grotesque Variable', 'Arial Narrow', Arial, sans-serif";
export const mono = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

/** Condensed heavy type for posters and big numbers. */
export const display: CSSProperties = {
  fontFamily: font,
  fontStretch: '75%',
  fontWeight: 800,
  letterSpacing: '-0.01em',
  lineHeight: 0.86,
  textTransform: 'uppercase'
};

export function Screen({
  children,
  bg,
  color,
  className,
  style
}: {
  children: ReactNode;
  bg: string;
  color: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden ${className ?? ''}`}
      style={{ background: bg, color, fontFamily: font, ...style }}
    >
      {children}
    </div>
  );
}

/** Three stacked swells: the Golfslag mark. */
export function WaveMark({ size = 28, color = G.coral }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 0.78} viewBox='0 0 36 28' fill='none' aria-hidden='true'>
      {[4, 13, 22].map((y) => (
        <path
          key={y}
          d={`M2 ${y + 2} C 7 ${y - 3}, 11 ${y - 3}, 16 ${y + 2} S 25 ${y + 7}, 34 ${y}`}
          stroke={color}
          strokeWidth='3.6'
          strokeLinecap='round'
        />
      ))}
    </svg>
  );
}

export function Wordmark({
  color = G.sand,
  mark = G.coral,
  size = 22
}: {
  color?: string;
  mark?: string;
  size?: number;
}) {
  return (
    <span className='inline-flex items-center' style={{ gap: size * 0.35 }}>
      <WaveMark size={size * 1.15} color={mark} />
      <span style={{ ...display, fontSize: size, color, letterSpacing: '0.01em' }}>Golfslag</span>
    </span>
  );
}

/** A long band of waves for posters and backgrounds. */
export function WaveBand({
  width,
  rows = 6,
  gap = 22,
  amp = 9,
  color = G.lilac,
  stroke = 3,
  opacity = 1
}: {
  width: number;
  rows?: number;
  gap?: number;
  amp?: number;
  color?: string;
  stroke?: number;
  opacity?: number;
}) {
  const period = 64;
  const wave = (y: number, shift: number) => {
    let d = `M ${-period + shift} ${y}`;
    for (let x = -period + shift; x < width + period; x += period) {
      d += ` q ${period / 4} ${-amp} ${period / 2} 0 t ${period / 2} 0`;
    }
    return d;
  };
  return (
    <svg width={width} height={rows * gap + amp * 2} aria-hidden='true' style={{ opacity }}>
      {Array.from({ length: rows }, (_, i) => (
        <path
          // biome-ignore lint/suspicious/noArrayIndexKey: static decoration
          key={i}
          d={wave(amp + i * gap, (i % 2) * (period / 2))}
          stroke={color}
          strokeWidth={stroke}
          fill='none'
          strokeLinecap='round'
        />
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------- QR code

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const QR_N = 29;

function qrMatrix(seed: number): boolean[][] {
  const rand = mulberry32(seed);
  const m = Array.from({ length: QR_N }, () => Array.from({ length: QR_N }, () => rand() > 0.52));
  const finder = (ox: number, oy: number) => {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const X = ox + x;
        const Y = oy + y;
        if (X < 0 || Y < 0 || X >= QR_N || Y >= QR_N) continue;
        const edge = x === 0 || x === 6 || y === 0 || y === 6;
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        m[Y][X] = x >= 0 && x <= 6 && y >= 0 && y <= 6 && (edge || core);
      }
    }
  };
  finder(0, 0);
  finder(QR_N - 7, 0);
  finder(0, QR_N - 7);
  // alignment pattern
  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      m[QR_N - 7 + y][QR_N - 7 + x] = Math.max(Math.abs(x), Math.abs(y)) !== 1;
    }
  }
  // timing lines
  for (let i = 8; i < QR_N - 8; i++) {
    m[6][i] = i % 2 === 0;
    m[i][6] = i % 2 === 0;
  }
  return m;
}

/** A ticket code. The seed changes every 30 seconds in the real wallet. */
export function TicketCode({ seed, size = 220, color = G.ink }: { seed: number; size?: number; color?: string }) {
  const m = qrMatrix(seed);
  let d = '';
  m.forEach((row, y) => {
    row.forEach((on, x) => {
      if (on) d += `M${x} ${y}h1v1h-1z`;
    });
  });
  return (
    <svg width={size} height={size} viewBox={`-2 -2 ${QR_N + 4} ${QR_N + 4}`} shapeRendering='crispEdges' aria-hidden='true'>
      <rect x='-2' y='-2' width={QR_N + 4} height={QR_N + 4} fill='#fff' />
      <path d={d} fill={color} />
    </svg>
  );
}

// ---------------------------------------------------------------- data

export type Tier = {
  id: 'fri' | 'sat' | 'sun' | 'weekend';
  name: string;
  date: string;
  price: number;
  sold: number;
  soldOut?: boolean;
  note: string;
};

export const TIERS: Tier[] = [
  { id: 'weekend', name: 'Weekend', date: 'Fri 27 – Sun 29 Jun', price: 179, sold: 0.91, note: 'Name on ticket · 3 days' },
  { id: 'fri', name: 'Friday', date: 'Fri 27 Jun · 14:00–01:00', price: 69.5, sold: 0.82, note: 'Velourra, Marit Zee, Low Tide Choir' },
  { id: 'sat', name: 'Saturday', date: 'Sat 28 Jun · 12:00–01:00', price: 74.5, sold: 1, soldOut: true, note: 'Nadia Ferro, Juniper Riot, Brakwater' },
  { id: 'sun', name: 'Sunday', date: 'Sun 29 Jun · 12:00–23:00', price: 64.5, sold: 0.61, note: 'Lantern Society, Ilse Morgen, Boei' }
];

export const LINEUP: { day: string; acts: string[] }[] = [
  { day: 'Friday 27', acts: ['Velourra', 'Marit Zee', 'Low Tide Choir', 'Kaapse Ruis', 'Tarmac Garden', 'Fenix Mae'] },
  { day: 'Saturday 28', acts: ['Nadia Ferro', 'Juniper Riot', 'Brakwater', 'Sloe Kade', 'Hollow Bay Unit', 'Tomas Wendt'] },
  { day: 'Sunday 29', acts: ['Lantern Society', 'Ilse Morgen', 'Boei', 'Rivaz', 'Calm Sector', 'Marlon Achterberg'] }
];

export const euro = (n: number) =>
  `€${n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
