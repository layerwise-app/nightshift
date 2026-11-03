import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource-variable/figtree';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Okkerse & Dochters — identity primitives drawn in code: the house palette,
 * the arch mark, the wordmark, and the illustrations (canal house, van, brush,
 * business cards) used across the screens and scenes.
 */

export const serif = "'Fraunces Variable', Georgia, 'Times New Roman', serif";
export const sans = "'Figtree Variable', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";
export const soft: CSSProperties = { fontFamily: serif, fontVariationSettings: "'SOFT' 100, 'WONK' 1" };

export const ink = {
  green: '#1F3B2D',
  greenDeep: '#152A20',
  cream: '#F4EDE0',
  paper: '#FBF8F2',
  brick: '#B5452B',
  ochre: '#D9A441',
  text: '#1B1914',
  muted: '#5E5A50',
  line: '#D9CFBD'
} as const;

export type PaintColour = {
  code: string;
  name: string;
  /** What the name refers to, for the colour matcher and the brand sheet. */
  after: string;
  hex: string;
  /** Text colour that reads on this paint. */
  on: string;
};

/** The house palette: ten colours the painters keep in stock, named after Schiedam. */
export const palette: PaintColour[] = [
  { code: 'OD-101', name: 'Schiedams Groen', after: 'the old distillery doors on the Lange Haven', hex: '#1F3B2D', on: '#F4EDE0' },
  { code: 'OD-108', name: 'Grachtwater', after: 'the Schie on a still morning', hex: '#4E6A63', on: '#F4EDE0' },
  { code: 'OD-114', name: 'Jeneverkruik', after: 'stoneware gin jugs', hex: '#B49C74', on: '#1B1914' },
  { code: 'OD-122', name: 'Molenwiek', after: 'sails of De Noord windmill', hex: '#3F4B54', on: '#F4EDE0' },
  { code: 'OD-131', name: 'Havenrood', after: 'harbour brick after rain', hex: '#A3412A', on: '#F4EDE0' },
  { code: 'OD-140', name: 'Okergeel', after: 'the ochre of old shutters', hex: '#D9A441', on: '#1B1914' },
  { code: 'OD-152', name: 'Lijnbaan Blauw', after: 'rope-walk workshop doors', hex: '#2E4A68', on: '#F4EDE0' },
  { code: 'OD-160', name: 'Kalkwit', after: 'limewashed back walls', hex: '#F1EBDD', on: '#1B1914' },
  { code: 'OD-171', name: 'Pakhuisgrijs', after: 'warehouse plaster', hex: '#8E897C', on: '#1B1914' },
  { code: 'OD-190', name: 'Teerzwart', after: 'tarred quay posts', hex: '#1E1C19', on: '#F4EDE0' }
];

export const paintByCode = (code: string) => palette.find((p) => p.code === code) ?? palette[0];

/** The arch of a Schiedam canal-house window, holding O&D. */
export function ArchMark({
  size = 48,
  fill = ink.green,
  text = ink.cream,
  outline = false,
  className,
  style
}: {
  size?: number;
  fill?: string;
  text?: string;
  /** Line-only version, for stamping and engraving. */
  outline?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox='0 0 80 100'
      width={size * 0.8}
      height={size}
      className={className}
      style={style}
      aria-hidden='true'
    >
      <path
        d='M2 98V40a38 38 0 0 1 76 0v58z'
        fill={outline ? 'none' : fill}
        stroke={outline ? fill : 'none'}
        strokeWidth={outline ? 3 : 0}
      />
      <path
        d='M10 90V41a30 30 0 0 1 60 0v49z'
        fill='none'
        stroke={outline ? fill : text}
        strokeWidth='1.6'
        opacity={outline ? 1 : 0.55}
      />
      <text
        x='40'
        y='72'
        textAnchor='middle'
        fill={outline ? fill : text}
        style={{ ...soft, fontStyle: 'italic', fontWeight: 560, fontSize: 30, letterSpacing: '-1px' }}
      >
        O&amp;D
      </text>
    </svg>
  );
}

/** "Okkerse & Dochters" — the family name upright, the daughters in italic. */
export function Wordmark({
  size = 40,
  color = ink.green,
  sub = true,
  subColor,
  className
}: {
  size?: number;
  color?: string;
  sub?: boolean;
  subColor?: string;
  className?: string;
}) {
  return (
    <span className={className} style={{ color, display: 'inline-block', lineHeight: 1 }}>
      <span style={{ ...soft, fontWeight: 620, fontSize: size, letterSpacing: '-0.025em', display: 'block' }}>
        Okkerse <span style={{ fontStyle: 'italic', fontWeight: 480 }}>&amp; Dochters</span>
      </span>
      {sub ? (
        <span
          style={{
            fontFamily: sans,
            fontWeight: 600,
            fontSize: Math.max(9, size * 0.24),
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: size * 0.22,
            color: subColor ?? color,
            opacity: subColor ? 1 : 0.78
          }}
        >
          Schilders sinds 1971 · Schiedam
        </span>
      ) : null}
    </span>
  );
}

/** Lockup: arch mark beside the wordmark. */
export function Lockup({ size = 40, color = ink.green, mark = ink.green, markText = ink.cream }: { size?: number; color?: string; mark?: string; markText?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.36 }}>
      <ArchMark size={size * 1.5} fill={mark} text={markText} />
      <Wordmark size={size} color={color} />
    </span>
  );
}

// ---------------------------------------------------------------- house

export type Surface = 'door' | 'frames' | 'wall';

type HouseProps = {
  door: string;
  frames: string;
  wall: string;
  /** Highlighted surface (dashed outline). */
  active?: Surface;
  onPick?: (surface: Surface) => void;
  className?: string;
  style?: CSSProperties;
  /** Hide the neighbours, for tight crops. */
  alone?: boolean;
};

function shade(hex: string, amount: number) {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  const mix = (c: number) => Math.round((t - c) * p + c);
  return `#${((1 << 24) | (mix(r) << 16) | (mix(g) << 8) | mix(b)).toString(16).slice(1)}`;
}

function Sash({ x, y, w, h, frame, cols = 2, rows = 3 }: { x: number; y: number; w: number; h: number; frame: string; cols?: number; rows?: number }) {
  const t = 5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={frame} />
      <rect x={x + t} y={y + t} width={w - 2 * t} height={h - 2 * t} fill='#24333A' />
      <polygon points={`${x + t},${y + h * 0.62} ${x + w * 0.62},${y + t} ${x + w * 0.86},${y + t} ${x + t},${y + h * 0.9}`} fill='#ffffff' opacity='0.08' />
      {Array.from({ length: cols - 1 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: muntins are positional
        <rect key={`c${i}`} x={x + t + ((w - 2 * t) / cols) * (i + 1) - 1.5} y={y + t} width='3' height={h - 2 * t} fill={frame} />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: muntins are positional
        <rect key={`r${i}`} x={x + t} y={y + t + ((h - 2 * t) / rows) * (i + 1) - (i === Math.floor((rows - 1) / 2) ? 3 : 1.5)} width={w - 2 * t} height={i === Math.floor((rows - 1) / 2) ? 6 : 3} fill={frame} />
      ))}
      <rect x={x - 4} y={y + h} width={w + 8} height='5' fill={shade(frame, -0.18)} />
    </g>
  );
}

/**
 * A Schiedam canal house with a bell gable. The front door, the window
 * frames, and the living-room wall (seen through the big ground-floor
 * window) take whatever paint they are given.
 */
export function CanalHouse({ door, frames, wall, active, onPick, className, style, alone }: HouseProps) {
  const brick = '#8F3E2A';
  const pick = (s: Surface) => (onPick ? () => onPick(s) : undefined);
  const hit = onPick ? { cursor: 'pointer' } : undefined;
  const outline = (s: Surface) => (active === s ? { stroke: ink.ochre, strokeWidth: 3, strokeDasharray: '7 5', fill: 'none' } : null);
  return (
    <svg viewBox='0 0 390 300' className={className} style={style} aria-hidden='true'>
      <defs>
        <pattern id='od-brick' width='18' height='8' patternUnits='userSpaceOnUse'>
          <rect width='18' height='8' fill={brick} />
          <path d='M0 7.5h18M9 0v3.5M0 3.75h18M0 4v3.5M18 4v3.5' stroke='#6E2E1F' strokeWidth='0.8' opacity='0.55' />
        </pattern>
        <clipPath id='od-room'>
          <rect x='212' y='206' width='70' height='64' />
        </clipPath>
      </defs>
      <rect width='390' height='300' fill='#E9E1D2' />
      {!alone ? (
        <>
          {/* neighbours */}
          <path d='M0 300V92h18l10-14h44l10 14h12v208z' fill='#C9C1AF' />
          <rect x='22' y='118' width='26' height='40' fill='#33424A' stroke='#F1EBDD' strokeWidth='4' />
          <rect x='58' y='118' width='26' height='40' fill='#33424A' stroke='#F1EBDD' strokeWidth='4' />
          <rect x='22' y='190' width='26' height='40' fill='#33424A' stroke='#F1EBDD' strokeWidth='4' />
          <rect x='58' y='190' width='26' height='40' fill='#33424A' stroke='#F1EBDD' strokeWidth='4' />
          <path d='M300 300V70l12-12h14l12-12h14l12 12h14l12 12v230z' fill='#5E6B62' />
          <rect x='310' y='104' width='28' height='42' fill='#2A363C' stroke='#E8E2D2' strokeWidth='4' />
          <rect x='350' y='104' width='28' height='42' fill='#2A363C' stroke='#E8E2D2' strokeWidth='4' />
          <rect x='310' y='184' width='28' height='42' fill='#2A363C' stroke='#E8E2D2' strokeWidth='4' />
          <rect x='350' y='184' width='28' height='42' fill='#2A363C' stroke='#E8E2D2' strokeWidth='4' />
        </>
      ) : null}
      {/* the house: body and bell gable */}
      <path
        d='M98 300V112c0-22 30-26 40-44V36c0-14 10-22 22-22h70c12 0 22 8 22 22v32c10 18 40 22 40 44v188z'
        fill='url(#od-brick)'
      />
      {/* cornice and gable trim in the frame colour */}
      <path d='M138 68c-10 18-40 22-40 44' fill='none' stroke={frames} strokeWidth='4' />
      <path d='M252 68c10 18 40 22 40 44' fill='none' stroke={frames} strokeWidth='4' />
      <path d='M138 36c0-14 10-22 22-22h70c12 0 22 8 22 22' fill='none' stroke={frames} strokeWidth='4' />
      <rect x='94' y='176' width='202' height='6' fill='#E6DCC8' />
      {/* hoist beam and gable window */}
      <rect x='191' y='18' width='8' height='14' fill='#3A2A22' />
      {/* biome-ignore lint/a11y/noStaticElementInteractions: tap shortcut on the drawing; the radio chips below are the accessible control */}
      <g onClick={pick('frames')} style={hit}>
        <Sash x={176} y={36} w={38} h={30} frame={frames} cols={2} rows={2} />
        <Sash x={118} y={100} w={46} h={66} frame={frames} />
        <Sash x={172} y={100} w={46} h={66} frame={frames} />
        <Sash x={226} y={100} w={46} h={66} frame={frames} />
      </g>
      {/* living room: window frame around a view of the painted wall */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: tap shortcut on the drawing; the radio chips are the accessible control */}
      <g onClick={pick('wall')} style={hit}>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: same tap shortcut */}
        <rect x='206' y='200' width='82' height='76' fill={frames} onClick={pick('frames')} />
        <g clipPath='url(#od-room)'>
          <rect x='212' y='206' width='70' height='64' fill={wall} />
          {/* picture, lamp and sofa back, in the wall's own shadow */}
          <rect x='224' y='216' width='22' height='16' fill={shade(wall, -0.32)} />
          <rect x='227' y='219' width='16' height='10' fill={shade(wall, 0.25)} />
          <path d='M262 206v14' stroke={shade(wall, -0.45)} strokeWidth='1.2' />
          <path d='M255 220h14l-3 8h-8z' fill={ink.ochre} />
          <rect x='216' y='246' width='62' height='24' rx='5' fill={shade(wall, -0.42)} />
          <polygon points='212,206 238,206 212,240' fill='#ffffff' opacity='0.1' />
        </g>
        <rect x='245' y='206' width='4' height='64' fill={frames} />
      </g>
      {/* front door with transom */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: tap shortcut on the drawing; the radio chips are the accessible control */}
      <g onClick={pick('door')} style={hit}>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: same tap shortcut */}
        <rect x='122' y='196' width='60' height='80' fill={frames} onClick={pick('frames')} />
        <rect x='127' y='201' width='50' height='14' fill='#24333A' />
        <path d='M152 201v14M140 201v14M164 201v14' stroke={frames} strokeWidth='2.5' />
        <rect x='129' y='219' width='46' height='57' fill={door} />
        <rect x='134' y='224' width='16' height='21' fill='none' stroke={shade(door, -0.3)} strokeWidth='2' />
        <rect x='154' y='224' width='16' height='21' fill='none' stroke={shade(door, -0.3)} strokeWidth='2' />
        <rect x='134' y='250' width='36' height='20' fill='none' stroke={shade(door, -0.3)} strokeWidth='2' />
        <circle cx='168' cy='248' r='2.6' fill={ink.ochre} />
        <rect x='147' y='247' width='10' height='3' rx='1.5' fill={ink.ochre} />
      </g>
      {/* stoop and street */}
      <rect x='116' y='276' width='72' height='8' fill='#B9B2A3' />
      <rect x='110' y='284' width='84' height='8' fill='#A8A091' />
      <rect y='292' width='390' height='8' fill='#7F786B' />
      {/* selection outline */}
      {outline('door') ? <rect x='125' y='215' width='54' height='65' rx='2' {...outline('door')} /> : null}
      {outline('frames') ? <rect x='112' y='30' width='166' height='250' rx='4' {...outline('frames')} /> : null}
      {outline('wall') ? <rect x='208' y='202' width='78' height='72' rx='2' {...outline('wall')} /> : null}
    </svg>
  );
}

// ---------------------------------------------------------------- van

/**
 * The same white panel van, side view, in the 2023 sticker or the 2024 livery.
 * Shared geometry so the two line up in the before/after.
 */
export function Van({ livery, className, style }: { livery: 'old' | 'new'; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox='0 0 820 360' className={className} style={style} aria-hidden='true'>
      <defs>
        <clipPath id={`van-body-${livery}`}>
          <path d='M40 262V170c0-14 6-24 18-32l66-50c14-10 28-14 44-14h566c20 0 36 16 36 36v152z' />
        </clipPath>
        <linearGradient id='van-sheen' x1='0' x2='0' y1='0' y2='1'>
          <stop offset='0' stopColor='#ffffff' stopOpacity='0.0' />
          <stop offset='1' stopColor='#000000' stopOpacity='0.08' />
        </linearGradient>
      </defs>
      <ellipse cx='420' cy='318' rx='380' ry='16' fill='#000' opacity='0.16' />
      {/* body */}
      <path d='M40 262V170c0-14 6-24 18-32l66-50c14-10 28-14 44-14h566c20 0 36 16 36 36v152z' fill='#F7F6F2' />
      <g clipPath={`url(#van-body-${livery})`}>
        {livery === 'new' ? (
          <>
            <rect x='0' y='214' width='820' height='60' fill={ink.green} />
            <rect x='0' y='210' width='820' height='4' fill={ink.ochre} />
          </>
        ) : (
          <>
            {/* the 1990s swoosh */}
            <path d='M150 236C330 170 520 260 760 150v22C520 282 330 196 150 258z' fill='#E23A2E' />
            <path d='M170 252C340 200 520 286 760 178v14C520 298 340 214 170 264z' fill='#F5C518' />
            <path d='M190 266C350 222 520 300 760 200v12C520 310 350 234 190 276z' fill='#1F5FB8' />
          </>
        )}
        <rect x='0' y='60' width='820' height='220' fill='url(#van-sheen)' />
      </g>
      {/* cab window, pillars, doors */}
      <path d='M70 160l60-46c8-6 16-8 26-8h52v60H76c-6 0-10-3-6-6z' fill='#2C3A41' />
      <path d='M96 150l40-30h30v4h-28l-38 28z' fill='#ffffff' opacity='0.18' />
      <path d='M222 80v182M420 80v182M700 80v182' stroke='#C9C6BD' strokeWidth='2' />
      <rect x='372' y='176' width='30' height='6' rx='3' fill='#BDB9AF' />
      <rect x='240' y='176' width='20' height='6' rx='3' fill='#BDB9AF' />
      <rect x='44' y='236' width='26' height='14' rx='3' fill='#F2B84B' />
      <rect x='722' y='92' width='8' height='34' rx='2' fill='#D43A2F' />
      {/* bumpers and wheels */}
      <rect x='28' y='252' width='60' height='20' rx='6' fill='#3A3A3A' />
      <rect x='718' y='252' width='54' height='20' rx='6' fill='#3A3A3A' />
      {[170, 620].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 66} 262a66 66 0 0 1 132 0z`} fill='#2A2A2A' />
          <circle cx={cx} cy='272' r='46' fill='#1D1D1D' />
          <circle cx={cx} cy='272' r='26' fill='#8D8D8A' />
          <circle cx={cx} cy='272' r='9' fill='#5E5E5B' />
        </g>
      ))}
      {livery === 'new' ? (
        <g>
          <g transform='translate(474 92)'>
            <path d='M2 98V40a38 38 0 0 1 76 0v58z' fill={ink.green} />
            <path d='M10 90V41a30 30 0 0 1 60 0v49z' fill='none' stroke={ink.cream} strokeWidth='1.6' opacity='0.55' />
            <text x='40' y='72' textAnchor='middle' fill={ink.cream} style={{ ...soft, fontStyle: 'italic', fontWeight: 560, fontSize: 30 }}>
              O&amp;D
            </text>
          </g>
          <text x='240' y='140' fill={ink.green} style={{ ...soft, fontWeight: 620, fontSize: 44, letterSpacing: '-1px' }}>
            Okkerse
          </text>
          <text x='240' y='186' fill={ink.green} style={{ ...soft, fontStyle: 'italic', fontWeight: 480, fontSize: 44, letterSpacing: '-1px' }}>
            &amp; Dochters
          </text>
          <text x='572' y='132' fill={ink.green} style={{ fontFamily: sans, fontWeight: 800, fontSize: 19, letterSpacing: '0.3px' }}>
            010 426 71 18
          </text>
          <text x='572' y='158' fill={ink.green} style={{ fontFamily: sans, fontWeight: 600, fontSize: 15 }}>
            okkerse.nl
          </text>
          <text x='252' y='249' fill={ink.cream} style={{ fontFamily: sans, fontWeight: 600, fontSize: 12.5, letterSpacing: '2.4px' }}>
            SCHILDERS SINDS 1971 · SCHIEDAM
          </text>
        </g>
      ) : (
        <g>
          {/* clip-art brush */}
          <g transform='translate(668 60) rotate(24)'>
            <rect x='0' y='0' width='22' height='70' rx='6' fill='#C2873E' stroke='#222' strokeWidth='2' />
            <rect x='-4' y='68' width='30' height='16' fill='#B8B8B8' stroke='#222' strokeWidth='2' />
            <path d='M-6 84h34l-4 30c-6 6-20 6-26 0z' fill='#E23A2E' stroke='#222' strokeWidth='2' />
          </g>
          <text x='236' y='148' fill='#1F5FB8' style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: 54, letterSpacing: '-2px' }} transform='translate(3 3)' opacity='0.35'>
            OKKERSE
          </text>
          <text x='236' y='148' fill='#E23A2E' stroke='#ffffff' strokeWidth='1.5' style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: 54, letterSpacing: '-2px' }}>
            OKKERSE
          </text>
          <text x='240' y='176' fill='#1F5FB8' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 21, letterSpacing: '4px' }}>
            SCHILDERSBEDRIJF
          </text>
          <text x='262' y='204' fill='#333' style={{ fontFamily: '"Brush Script MT", "Segoe Script", cursive', fontStyle: 'italic', fontSize: 22 }}>
            voor al uw schilderwerk!
          </text>
          <text x='474' y='198' fill='#F5C518' stroke='#111' strokeWidth='1.4' style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 28 }}>
            010-4267118
          </text>
        </g>
      )}
    </svg>
  );
}

// ---------------------------------------------------------------- brush & cards

/** A flat brush with the arch mark burned into its handle. */
export function Brush({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox='0 0 640 120' className={className} style={style} aria-hidden='true'>
      <defs>
        <linearGradient id='od-wood' x1='0' x2='0' y1='0' y2='1'>
          <stop offset='0' stopColor='#D9AE6E' />
          <stop offset='0.55' stopColor='#C4914F' />
          <stop offset='1' stopColor='#A9783D' />
        </linearGradient>
        <linearGradient id='od-ferrule' x1='0' x2='0' y1='0' y2='1'>
          <stop offset='0' stopColor='#E6E4DE' />
          <stop offset='0.5' stopColor='#A9A69E' />
          <stop offset='1' stopColor='#D2D0C9' />
        </linearGradient>
      </defs>
      <ellipse cx='330' cy='108' rx='290' ry='7' fill='#000' opacity='0.15' />
      {/* handle */}
      <path d='M40 60c0-14 16-24 40-24h250l40 6v36l-40 6H80c-24 0-40-10-40-24z' fill='url(#od-wood)' />
      <path d='M90 48c60-4 150-2 240 2M100 70c70 2 150 2 230-2M150 59c50-2 110 0 170 1' stroke='#9A6B33' strokeWidth='1.2' opacity='0.45' fill='none' />
      <circle cx='66' cy='60' r='7' fill='#8B5E2B' opacity='0.8' />
      {/* burned stamp */}
      <g transform='translate(150 41) scale(0.36)' opacity='0.78'>
        <path d='M2 98V40a38 38 0 0 1 76 0v58z' fill='none' stroke='#4A2E14' strokeWidth='4' />
        <text x='40' y='72' textAnchor='middle' fill='#4A2E14' style={{ ...soft, fontStyle: 'italic', fontWeight: 600, fontSize: 30 }}>
          O&amp;D
        </text>
      </g>
      <text x='188' y='65' fill='#4A2E14' opacity='0.78' style={{ fontFamily: sans, fontWeight: 700, fontSize: 11.5, letterSpacing: '2.4px' }}>
        OKKERSE &amp; DOCHTERS · SCHIEDAM
      </text>
      {/* ferrule */}
      <rect x='368' y='30' width='86' height='60' rx='5' fill='url(#od-ferrule)' />
      <path d='M384 30v60M398 30v60M412 30v60' stroke='#8E8B84' strokeWidth='1.5' opacity='0.6' />
      {/* bristles, tipped with Schiedams Groen */}
      <path d='M452 28h96c20 0 34 14 40 32-6 18-20 32-40 32h-96z' fill='#2B2520' />
      <path d='M548 28c20 0 34 14 40 32-6 18-20 32-40 32h-22c12-8 18-20 18-32s-6-24-18-32z' fill={ink.green} />
      <path d='M470 36h80M470 50h96M470 70h96M470 84h80' stroke='#000' strokeWidth='1' opacity='0.25' />
    </svg>
  );
}

export function BusinessCard({ side, style }: { side: 'front' | 'back'; style?: CSSProperties }) {
  const base: CSSProperties = {
    width: 420,
    height: 252,
    borderRadius: 8,
    boxShadow: '0 30px 50px -24px rgba(0,0,0,0.45)',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };
  if (side === 'front') {
    return (
      <div style={{ ...base, background: ink.green, color: ink.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <ArchMark size={86} fill={ink.cream} text={ink.green} />
        <Wordmark size={30} color={ink.cream} />
      </div>
    );
  }
  return (
    <div style={{ ...base, background: ink.paper, color: ink.text, padding: 30, fontFamily: sans }}>
      <div style={{ ...soft, fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: ink.green }}>Lotte Okkerse</div>
      <div style={{ fontSize: 13, marginTop: 6, color: ink.muted }}>Mede-eigenaar · monumenten &amp; restauratie</div>
      <div style={{ position: 'absolute', left: 30, bottom: 28, fontSize: 13, lineHeight: 1.6 }}>
        <div style={{ fontWeight: 700 }}>06 18 44 70 23</div>
        <div>lotte@okkerse.nl</div>
        <div style={{ color: ink.muted }}>Lange Haven 118, 3111 CK Schiedam</div>
      </div>
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 34, display: 'flex', flexDirection: 'column' }}>
        {['#1F3B2D', '#4E6A63', '#B49C74', '#A3412A', '#D9A441'].map((c) => (
          <span key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>
    </div>
  );
}

/** Small round icon button used across the site screens. */
export function Chip({ children, active, style }: { children: ReactNode; active?: boolean; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 34,
        padding: '0 14px',
        borderRadius: 999,
        border: `1.5px solid ${active ? ink.green : ink.line}`,
        background: active ? ink.green : 'transparent',
        color: active ? ink.cream : ink.text,
        fontFamily: sans,
        fontWeight: 600,
        fontSize: 13.5,
        ...style
      }}
    >
      {children}
    </span>
  );
}
