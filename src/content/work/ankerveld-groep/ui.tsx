import '@fontsource-variable/ibm-plex-sans';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import type { CSSProperties, ReactNode } from 'react';
import type { AssetStatus } from './data';

/** Ankerveld Werkplaats palette: steel, concrete, and the safety colours on site. */
export const C = {
  navy: '#0E2433',
  navy2: '#163349',
  navy3: '#21455F',
  steel: '#5B6E7C',
  concrete: '#F3F5F6',
  line: '#D7DEE3',
  white: '#FFFFFF',
  amber: '#F2B705',
  amberInk: '#3A2C00',
  rust: '#C4532B',
  rustBg: '#FBE9E2',
  green: '#2E7D4F',
  greenBg: '#E3F1E8',
  dueBg: '#FDF3D1',
  water: '#D9E4EA'
} as const;

export const sans = "'IBM Plex Sans Variable', 'IBM Plex Sans', system-ui, sans-serif";
export const mono = "'IBM Plex Mono', ui-monospace, Menlo, monospace";

export const font: CSSProperties = { fontFamily: sans, color: C.navy };

/** Focus ring in safety amber, visible on navy and on concrete. */
export const focusRing =
  'outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]';

export const statusMeta: Record<AssetStatus, { label: string; fg: string; bg: string; dot: string }> = {
  ok: { label: 'OK', fg: C.green, bg: C.greenBg, dot: C.green },
  due: { label: 'Due', fg: '#7A5A00', bg: C.dueBg, dot: C.amber },
  overdue: { label: 'Overdue', fg: C.rust, bg: C.rustBg, dot: C.rust }
};

export function Mono({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <span className={className} style={{ fontFamily: mono, ...style }}>
      {children}
    </span>
  );
}

export function StatusBadge({ status, label, size = 'md' }: { status: AssetStatus; label?: string; size?: 'sm' | 'md' | 'lg' }) {
  const m = statusMeta[status];
  const pad = size === 'lg' ? '6px 12px' : size === 'sm' ? '2px 7px' : '4px 9px';
  const fs = size === 'lg' ? 15 : size === 'sm' ? 11.5 : 13;
  return (
    <span
      className='inline-flex items-center gap-[6px] whitespace-nowrap rounded-[4px] font-semibold'
      style={{ background: m.bg, color: m.fg, padding: pad, fontSize: fs }}
    >
      <span className='inline-block rounded-full' style={{ width: 7, height: 7, background: m.dot }} />
      {label ?? m.label}
    </span>
  );
}

/** Freshness label: every number in the portal says where it came from and when. */
export function Synced({ time, from, stale, tone = 'light' }: { time: string; from?: string; stale?: boolean; tone?: 'light' | 'dark' }) {
  const color = stale ? (tone === 'dark' ? C.amber : '#8A6400') : tone === 'dark' ? '#9FB3C2' : C.steel;
  return (
    <span className='inline-flex items-center gap-[6px]' style={{ fontFamily: mono, fontSize: 11.5, color }}>
      <svg width='11' height='11' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
        <path d='M10.5 6a4.5 4.5 0 1 1-1.3-3.2' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
        <path d='M10.6 1.4v2.3H8.3' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
      {stale ? 'Sync delayed · ' : 'synced '}
      {time}
      {from ? ` · ${from}` : ''}
    </span>
  );
}

/** The Ankerveld mark: an amber block with an anchor fluke cut out, reading as an A. */
export function AnkerveldMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 32 32' aria-hidden='true'>
      <rect width='32' height='32' rx='3' fill={C.amber} />
      <path d='M16 5.5 25.5 26h-5.2l-1.6-3.8h-5.4L11.7 26H6.5L16 5.5Zm0 8.2-1.8 4.6h3.6L16 13.7Z' fill={C.navy} />
    </svg>
  );
}

export function Wordmark({ tone = 'dark', size = 15 }: { tone?: 'dark' | 'light'; size?: number }) {
  const color = tone === 'dark' ? C.white : C.navy;
  return (
    <span className='inline-flex items-center gap-[10px]'>
      <AnkerveldMark size={size * 1.75} />
      <span style={{ color, lineHeight: 1.05 }}>
        <span className='block font-semibold' style={{ fontSize: size, letterSpacing: '-0.01em' }}>
          Ankerveld
        </span>
        <span className='block' style={{ fontFamily: mono, fontSize: size * 0.68, opacity: 0.72, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Werkplaats
        </span>
      </span>
    </span>
  );
}

type IconName =
  | 'chevron'
  | 'back'
  | 'download'
  | 'search'
  | 'bell'
  | 'grid'
  | 'box'
  | 'ticket'
  | 'doc'
  | 'cart'
  | 'map'
  | 'check'
  | 'alert'
  | 'wrench'
  | 'plus'
  | 'globe'
  | 'filter'
  | 'pin';

const paths: Record<IconName, ReactNode> = {
  chevron: <path d='m9 6 6 6-6 6' />,
  back: <path d='m15 6-6 6 6 6' />,
  download: (
    <>
      <path d='M12 4v11' />
      <path d='m7 10 5 5 5-5' />
      <path d='M5 20h14' />
    </>
  ),
  search: (
    <>
      <circle cx='11' cy='11' r='6.5' />
      <path d='m16 16 4 4' />
    </>
  ),
  bell: (
    <>
      <path d='M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z' />
      <path d='M10 20.5a2 2 0 0 0 4 0' />
    </>
  ),
  grid: (
    <>
      <rect x='4' y='4' width='7' height='7' />
      <rect x='13' y='4' width='7' height='7' />
      <rect x='4' y='13' width='7' height='7' />
      <rect x='13' y='13' width='7' height='7' />
    </>
  ),
  box: (
    <>
      <path d='M4 8 12 4l8 4v8l-8 4-8-4V8Z' />
      <path d='m4 8 8 4 8-4M12 12v8' />
    </>
  ),
  ticket: (
    <>
      <path d='M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V7Z' />
      <path d='M14 7v10' strokeDasharray='2 2' />
    </>
  ),
  doc: (
    <>
      <path d='M6 3h8l4 4v14H6V3Z' />
      <path d='M14 3v4h4M9 12h6M9 16h6' />
    </>
  ),
  cart: (
    <>
      <path d='M4 5h2l2 10h10l2-7H7' />
      <circle cx='9' cy='19' r='1.3' />
      <circle cx='17' cy='19' r='1.3' />
    </>
  ),
  map: (
    <>
      <path d='m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z' />
      <path d='M9 4v14M15 6v14' />
    </>
  ),
  check: <path d='m5 12 5 5 9-10' />,
  alert: (
    <>
      <path d='M12 4 21 19H3L12 4Z' />
      <path d='M12 10v4M12 16.5v.5' />
    </>
  ),
  wrench: <path d='M14.5 4.5a4.5 4.5 0 0 0-5.3 5.9L4 15.6 8.4 20l5.2-5.2a4.5 4.5 0 0 0 5.9-5.3l-2.8 2.8-3.2-.8-.8-3.2 2.8-2.8Z' />,
  plus: <path d='M12 5v14M5 12h14' />,
  globe: (
    <>
      <circle cx='12' cy='12' r='8' />
      <path d='M4 12h16M12 4c2.5 2.4 2.5 13.6 0 16M12 4c-2.5 2.4-2.5 13.6 0 16' />
    </>
  ),
  filter: <path d='M4 6h16M7 12h10M10 18h4' />,
  pin: (
    <>
      <path d='M12 21s6-5.6 6-11a6 6 0 0 0-12 0c0 5.4 6 11 6 11Z' />
      <circle cx='12' cy='10' r='2.2' />
    </>
  )
};

export function Icon({ name, size = 20, stroke = 1.8, style }: { name: IconName; size?: number; stroke?: number; style?: CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={stroke}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
