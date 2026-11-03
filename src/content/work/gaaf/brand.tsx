import '@fontsource-variable/outfit';
import type { CSSProperties, ReactNode } from 'react';

/** Gaaf's own palette and type. Nothing here uses the Nightshift tokens. */
export const G = {
  cobalt: '#1F3FD1',
  cobaltDeep: '#14298F',
  mint: '#C9F0DF',
  mintDeep: '#8FD9B8',
  tomato: '#FF5A36',
  paper: '#FBF8F2',
  sand: '#EFE8DA',
  ink: '#0F1A3D',
  ink2: '#4A5272',
  line: '#DCD5C6',
  alu: '#C9CCD3',
  aluDark: '#9EA3AD',
  font: "'Outfit Variable', 'Outfit', system-ui, sans-serif"
} as const;

/** Lid colours: each person in a household gets their own tin. */
export const LIDS = [
  { name: 'Cobalt', hex: G.cobalt },
  { name: 'Tomato', hex: G.tomato },
  { name: 'Mint', hex: G.mintDeep },
  { name: 'Sun', hex: '#FFC93C' },
  { name: 'Ink', hex: G.ink }
] as const;

export const gaafRoot: CSSProperties = {
  fontFamily: G.font,
  color: G.ink,
  fontFeatureSettings: '"ss01"'
};

/** The mark: a tin lid seen from above, with a smile pressed into it. */
export function GaafMark({ size = 28, color = G.cobalt, smile = G.paper }: { size?: number; color?: string; smile?: string }) {
  return (
    <svg width={size} height={size} viewBox='0 0 40 40' aria-hidden='true'>
      <circle cx='20' cy='20' r='19' fill={color} />
      <circle cx='20' cy='20' r='15.5' fill='none' stroke={smile} strokeOpacity='0.28' strokeWidth='1.2' />
      <path d='M12.5 21.5c2 4 4.6 5.8 7.5 5.8s5.5-1.8 7.5-5.8' fill='none' stroke={smile} strokeWidth='3' strokeLinecap='round' />
    </svg>
  );
}

export function GaafWordmark({ size = 32, color = G.cobalt, mark = true }: { size?: number; color?: string; mark?: boolean }) {
  return (
    <span className='inline-flex items-center' style={{ gap: size * 0.22, color }}>
      {mark ? <GaafMark size={size * 0.92} color={color} smile={color === G.paper ? G.cobalt : G.paper} /> : null}
      <span style={{ fontFamily: G.font, fontWeight: 800, fontSize: size, letterSpacing: '-0.045em', lineHeight: 1 }}>gaaf</span>
    </span>
  );
}

/** A refillable aluminium tin, side view. 74 mm across, 28 mm tall. */
export function TinSide({ width = 220, lid = G.cobalt, label = true }: { width?: number; lid?: string; label?: boolean }) {
  const h = width * (28 / 74);
  return (
    <svg width={width} height={h + 8} viewBox={`0 0 74 ${28 + 2.2}`} aria-hidden='true'>
      <defs>
        <linearGradient id={`alu-${lid.slice(1)}`} x1='0' x2='1'>
          <stop offset='0' stopColor='#AEB3BC' />
          <stop offset='0.22' stopColor='#E7E9ED' />
          <stop offset='0.55' stopColor='#C3C7CF' />
          <stop offset='0.85' stopColor='#E1E3E8' />
          <stop offset='1' stopColor='#A2A7B1' />
        </linearGradient>
      </defs>
      <ellipse cx='37' cy='28.6' rx='35' ry='1.6' fill='#0F1A3D' opacity='0.16' />
      <rect x='1' y='9' width='72' height='19' rx='2.4' fill={`url(#alu-${lid.slice(1)})`} />
      <rect x='0.4' y='1' width='73.2' height='10' rx='2.6' fill={lid} />
      <rect x='0.4' y='9.3' width='73.2' height='1.7' fill='#000' opacity='0.12' />
      <rect x='3' y='2.6' width='22' height='1.1' rx='0.55' fill='#fff' opacity='0.28' />
      {label ? (
        <text x='37' y='21.6' textAnchor='middle' fontFamily={G.font} fontWeight='800' fontSize='7.4' letterSpacing='-0.3' fill={G.ink} opacity='0.82'>
          gaaf
        </text>
      ) : null}
    </svg>
  );
}

/** Tin seen from above: the lid with the embossed smile. */
export function TinTop({ size = 220, lid = G.cobalt }: { size?: number; lid?: string }) {
  return (
    <svg width={size} height={size} viewBox='0 0 100 100' aria-hidden='true'>
      <circle cx='51.5' cy='53' r='47' fill='#0F1A3D' opacity='0.14' />
      <circle cx='50' cy='50' r='47' fill={lid} />
      <circle cx='50' cy='50' r='43.5' fill='none' stroke='#fff' strokeOpacity='0.22' strokeWidth='1.2' />
      <circle cx='50' cy='50' r='36' fill='none' stroke='#000' strokeOpacity='0.1' strokeWidth='0.8' />
      <path d='M31 53c5 10 11.5 14.5 19 14.5S64 63 69 53' fill='none' stroke='#fff' strokeOpacity='0.9' strokeWidth='6' strokeLinecap='round' />
      <text x='50' y='42' textAnchor='middle' fontFamily={G.font} fontWeight='800' fontSize='15' letterSpacing='-0.6' fill='#fff' opacity='0.9'>
        gaaf
      </text>
      <path d='M14 30a40 40 0 0 1 22-18' fill='none' stroke='#fff' strokeOpacity='0.35' strokeWidth='2.4' strokeLinecap='round' />
    </svg>
  );
}

/** A flat refill pouch, 8 mm thick when full. */
export function Pouch({
  width = 200,
  count = 62,
  tone = G.mint,
  flavour = 'Fresh mint'
}: {
  width?: number;
  count?: number;
  tone?: string;
  flavour?: string;
}) {
  const h = width * 1.32;
  return (
    <svg width={width} height={h} viewBox='0 0 100 132' aria-hidden='true'>
      <rect x='3' y='5' width='96' height='126' rx='5' fill='#0F1A3D' opacity='0.12' />
      <path d='M2 8 Q2 3 7 3 H93 Q98 3 98 8 V124 Q98 129 93 129 H7 Q2 129 2 124 Z' fill={tone} />
      <rect x='2' y='3' width='96' height='12' rx='4' fill='#000' opacity='0.06' />
      <line x1='8' y1='17' x2='92' y2='17' stroke={G.ink} strokeOpacity='0.35' strokeWidth='0.7' strokeDasharray='2 1.6' />
      <text x='10' y='40' fontFamily={G.font} fontWeight='800' fontSize='17' letterSpacing='-0.8' fill={G.ink}>gaaf</text>
      <text x='10' y='54' fontFamily={G.font} fontWeight='500' fontSize='6.4' fill={G.ink}>Toothpaste tablets</text>
      <text x='10' y='62' fontFamily={G.font} fontWeight='500' fontSize='6.4' fill={G.ink} opacity='0.7'>{flavour} · 1450 ppm F</text>
      <text x='10' y='108' fontFamily={G.font} fontWeight='800' fontSize='26' letterSpacing='-1.2' fill={G.ink}>{count}</text>
      <text x='10' y='118' fontFamily={G.font} fontWeight='500' fontSize='5.6' fill={G.ink} opacity='0.75'>tablets · refill pouch</text>
      <circle cx='80' cy='103' r='11' fill='none' stroke={G.ink} strokeOpacity='0.6' strokeWidth='0.9' />
      <text x='80' y='101.5' textAnchor='middle' fontFamily={G.font} fontWeight='700' fontSize='4.4' fill={G.ink}>HOME</text>
      <text x='80' y='106.5' textAnchor='middle' fontFamily={G.font} fontWeight='700' fontSize='4.4' fill={G.ink}>COMPOST</text>
    </svg>
  );
}

const BRISTLES = Array.from({ length: 7 }, (_, i) => ({ x: 9.6 + (i % 2) * 3.4, y: 5.5 + i * 3, deep: i % 3 === 0 }));

/** Brush with a replaceable head. Handle in recycled aluminium. */
export function Brush({ height = 360, handle = G.cobalt }: { height?: number; handle?: string }) {
  const w = height * (26 / 190);
  return (
    <svg width={w} height={height} viewBox='0 0 26 190' aria-hidden='true'>
      <rect x='8.5' y='4' width='9' height='24' rx='3' fill='#FFFFFF' stroke={G.ink} strokeOpacity='0.15' strokeWidth='0.6' />
      {BRISTLES.map((b) => (
        <rect key={b.y} x={b.x} y={b.y} width='3' height='2.4' rx='1' fill={b.deep ? G.mintDeep : G.mint} />
      ))}
      <rect x='10.2' y='27' width='5.6' height='10' rx='1.6' fill='#F3F1EC' stroke={G.ink} strokeOpacity='0.15' strokeWidth='0.6' />
      <path d='M10 37 L16 37 L20 70 Q21 78 21 88 L21 180 Q21 186 13 186 Q5 186 5 180 L5 88 Q5 78 6 70 Z' fill={handle} />
      <path d='M8 92 L8 176' stroke='#fff' strokeOpacity='0.3' strokeWidth='1.6' strokeLinecap='round' />
      <text x='13' y='140' textAnchor='middle' fontFamily={G.font} fontWeight='800' fontSize='6' fill='#fff' transform='rotate(-90 13 140)'>gaaf</text>
    </svg>
  );
}

/** Compostable floss in a refillable glass vial. */
export function Floss({ height = 160, cap = G.tomato }: { height?: number; cap?: string }) {
  const w = height * (40 / 90);
  return (
    <svg width={w} height={height} viewBox='0 0 40 90' aria-hidden='true'>
      <rect x='3' y='18' width='34' height='70' rx='9' fill='#E8F2EE' stroke={G.ink} strokeOpacity='0.18' strokeWidth='0.8' />
      <circle cx='20' cy='52' r='11' fill={G.paper} stroke={G.ink} strokeOpacity='0.2' strokeWidth='0.8' />
      <circle cx='20' cy='52' r='4' fill={G.mintDeep} />
      <rect x='2' y='4' width='36' height='16' rx='5' fill={cap} />
      <rect x='6' y='7' width='10' height='2' rx='1' fill='#fff' opacity='0.4' />
      <text x='20' y='80' textAnchor='middle' fontFamily={G.font} fontWeight='800' fontSize='7' fill={G.ink} opacity='0.8'>floss</text>
    </svg>
  );
}

/** The letterbox parcel: 38 × 26.5 cm, never thicker than 3.2 cm. */
export function LetterboxBox({ width = 420, fill = G.tomato }: { width?: number; fill?: string }) {
  const h = width * 0.62;
  return (
    <svg width={width} height={h} viewBox='0 0 200 124' aria-hidden='true'>
      <path d='M20 40 L130 18 L190 44 L80 70 Z' fill={fill} />
      <path d='M20 40 L80 70 L80 86 L20 56 Z' fill='#C8401F' />
      <path d='M80 70 L190 44 L190 60 L80 86 Z' fill='#E54A28' />
      <path d='M64 34 L150 16' stroke='#fff' strokeOpacity='0.5' strokeWidth='1' strokeDasharray='3 2' />
      <text x='112' y='44' textAnchor='middle' fontFamily={G.font} fontWeight='800' fontSize='15' letterSpacing='-0.6' fill={G.paper} transform='rotate(-12 112 44) skewX(18)'>
        gaaf
      </text>
    </svg>
  );
}

export function Pill({ children, bg = G.mint, color = G.ink, style }: { children: ReactNode; bg?: string; color?: string; style?: CSSProperties }) {
  return (
    <span
      className='inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold'
      style={{ background: bg, color, ...style }}
    >
      {children}
    </span>
  );
}

/** Thickness gauge against the 3.2 cm letterbox limit. */
export function SlotGauge({ cm, compact = false }: { cm: number; compact?: boolean }) {
  const limit = 3.2;
  const pct = Math.min(1, cm / limit);
  const fits = cm <= 3.0;
  return (
    <div>
      <div className='flex items-baseline justify-between' style={{ fontSize: compact ? 12 : 13 }}>
        <span style={{ color: G.ink2 }}>Parcel thickness</span>
        <span className='font-semibold tabular-nums' style={{ color: fits ? G.ink : G.tomato }}>
          {cm.toFixed(1).replace('.', ',')} / 3,2 cm
        </span>
      </div>
      <div className='relative mt-1.5 h-[8px] rounded-full' style={{ background: G.sand }}>
        <div className='absolute inset-y-0 left-0 rounded-full' style={{ width: `${pct * 100}%`, background: fits ? G.cobalt : G.tomato }} />
        <div className='absolute inset-y-[-3px] w-[2px] rounded-full' style={{ left: `${(3.0 / limit) * 100}%`, background: G.ink, opacity: 0.4 }} />
      </div>
    </div>
  );
}
