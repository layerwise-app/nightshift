import '@fontsource-variable/newsreader';
import '@fontsource-variable/newsreader/wght-italic.css';
import '@fontsource-variable/figtree';
import type { CSSProperties, ReactNode } from 'react';

/** Kliniek Dassen's own palette and type. Nothing here uses the Nightshift tokens. */
export const C = {
  chalk: '#F6F4EF',
  paper: '#FFFFFF',
  ink: '#12343B',
  inkSoft: '#3E5A60',
  muted: '#6B7F82',
  sage: '#B9CFC4',
  sageSoft: '#DCE7E1',
  sageDeep: '#5E8577',
  apricot: '#E9A26B',
  apricotSoft: '#F6DCC6',
  line: 'rgba(18, 52, 59, 0.14)',
  lineStrong: 'rgba(18, 52, 59, 0.28)'
} as const;

export const SERIF = "'Newsreader Variable', 'Newsreader', Georgia, 'Times New Roman', serif";
export const SANS = "'Figtree Variable', 'Figtree', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";

export const serif = (size: number, weight = 420, extra?: CSSProperties): CSSProperties => ({
  fontFamily: SERIF,
  fontSize: size,
  fontWeight: weight,
  lineHeight: 1.05,
  letterSpacing: '-0.015em',
  ...extra
});

/** The practice mark: a rounded tile with a badger stripe ("das" is Dutch for badger). */
export function DassenMark({ size = 30, tone = 'ink' }: { size?: number; tone?: 'ink' | 'chalk' }) {
  const bg = tone === 'ink' ? C.ink : C.chalk;
  const fg = tone === 'ink' ? C.chalk : C.ink;
  return (
    <svg width={size} height={size} viewBox='0 0 32 32' aria-hidden='true'>
      <rect width='32' height='32' rx='9' fill={bg} />
      <path d='M9 8.5h6.2c5 0 8.3 3 8.3 7.5s-3.3 7.5-8.3 7.5H9z' fill='none' stroke={fg} strokeWidth='2.4' strokeLinejoin='round' />
      <path d='M13.2 8.6v14.8' stroke={C.apricot} strokeWidth='2.4' />
    </svg>
  );
}

export function Wordmark({ size = 21, tone = 'ink' }: { size?: number; tone?: 'ink' | 'chalk' }) {
  const color = tone === 'ink' ? C.ink : C.chalk;
  return (
    <span className='inline-flex items-center gap-2.5' style={{ color }}>
      <DassenMark size={size * 1.45} tone={tone} />
      <span style={{ fontFamily: SERIF, fontSize: size, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1 }}>
        Kliniek Dassen
      </span>
    </span>
  );
}

/** Small line icons in the site's style (1.6 px strokes, round caps). */
export function Icon({ name, size = 18, color = 'currentColor' }: { name: 'arrow' | 'check' | 'clock' | 'upload' | 'phone' | 'pin' | 'doc' | 'close' | 'camera' | 'chev' | 'info' | 'cal'; size?: number; color?: string }) {
  const p = { fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<typeof name, ReactNode> = {
    arrow: <path d='M4 10h12M11 5l5 5-5 5' {...p} />,
    check: <path d='M4.5 10.5l3.5 3.5 7.5-8' {...p} />,
    clock: (
      <>
        <circle cx='10' cy='10' r='7' {...p} />
        <path d='M10 6v4l2.6 1.8' {...p} />
      </>
    ),
    upload: <path d='M10 13V4M6.5 7.5L10 4l3.5 3.5M4 13.5V16h12v-2.5' {...p} />,
    phone: <path d='M6.5 3.5h2l1 3.5-1.6 1.2a8.5 8.5 0 0 0 3.9 3.9L13 10.5l3.5 1v2a2 2 0 0 1-2.2 2A11.5 11.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z' {...p} />,
    pin: (
      <>
        <path d='M10 17s5.5-5 5.5-9.2a5.5 5.5 0 0 0-11 0C4.5 12 10 17 10 17z' {...p} />
        <circle cx='10' cy='7.8' r='2' {...p} />
      </>
    ),
    doc: <path d='M6 3h5.5L15 6.5V17H6zM11 3v4h4M8.5 10.5h4M8.5 13.5h4' {...p} />,
    close: <path d='M5.5 5.5l9 9M14.5 5.5l-9 9' {...p} />,
    camera: (
      <>
        <path d='M3.5 6.5h3l1.5-2h4l1.5 2h3v9h-13z' {...p} />
        <circle cx='10' cy='11' r='2.8' {...p} />
      </>
    ),
    chev: <path d='M8 5l5 5-5 5' {...p} />,
    info: (
      <>
        <circle cx='10' cy='10' r='7' {...p} />
        <path d='M10 9v4.5M10 6.5v.2' {...p} />
      </>
    ),
    cal: (
      <>
        <rect x='3.5' y='4.5' width='13' height='12' rx='2' {...p} />
        <path d='M3.5 8.5h13M7 3v3M13 3v3' {...p} />
      </>
    )
  };
  return (
    <svg width={size} height={size} viewBox='0 0 20 20' aria-hidden='true' className='shrink-0'>
      {paths[name]}
    </svg>
  );
}

type PortraitProps = {
  hair: 'bun' | 'short' | 'curly' | 'bob' | 'crop';
  glasses?: boolean;
  beard?: boolean;
  size?: number;
  bg?: string;
};

/** A single-weight line portrait. The site uses these instead of photos. */
export function Portrait({ hair, glasses, beard, size = 160, bg = C.sageSoft }: PortraitProps) {
  const s = { fill: 'none', stroke: C.ink, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const hairPath: Record<PortraitProps['hair'], ReactNode> = {
    bun: (
      <>
        <path d='M56 74c-2-20 12-34 32-34s34 14 32 34' {...s} />
        <circle cx='88' cy='31' r='11' {...s} />
        <path d='M60 70c10-4 22-14 28-24 6 10 18 20 28 24' {...s} />
      </>
    ),
    short: <path d='M57 78c-4-24 10-40 31-40 20 0 34 14 31 38-6-10-18-16-31-16-12 0-24 6-31 18z' {...s} />,
    curly: (
      <path
        d='M55 80c-6-4-6-12 0-15-4-6 0-14 7-13 0-8 9-12 15-8 4-7 15-7 19 0 7-4 15 1 14 8 7 0 10 8 6 13 6 4 5 11-1 15'
        {...s}
      />
    ),
    bob: <path d='M54 98c-6-30 6-58 34-58s40 28 34 58M58 74c14-2 26-10 32-22 4 10 14 18 28 20' {...s} />,
    crop: <path d='M58 72c0-18 12-30 30-30s30 12 30 30c-8-6-18-9-30-9s-22 3-30 9z' {...s} />
  };
  return (
    <svg width={size} height={size} viewBox='0 0 176 176' aria-hidden='true'>
      <rect width='176' height='176' rx='88' fill={bg} />
      <clipPath id={`pc-${hair}-${glasses ? 1 : 0}-${beard ? 1 : 0}`}>
        <rect width='176' height='176' rx='88' />
      </clipPath>
      <g clipPath={`url(#pc-${hair}-${glasses ? 1 : 0}-${beard ? 1 : 0})`}>
        {/* shoulders and collar */}
        <path d='M30 176c4-28 24-42 58-42s54 14 58 42' {...s} />
        <path d='M74 135l14 16 14-16' {...s} />
        <path d='M78 118v16M98 118v16' {...s} />
        {/* face */}
        <path d='M60 78c0 26 12 44 28 44s28-18 28-44' {...s} />
        <path d='M60 80c-5-1-8 3-6 8s5 6 7 5M116 80c5-1 8 3 6 8s-5 6-7 5' {...s} />
        {hairPath[hair]}
        {/* features */}
        <path d='M73 86c3-2 6-2 9 0M94 86c3-2 6-2 9 0' {...s} strokeWidth={2} />
        <path d='M88 90c-1 6-3 10-1 12 1 1 3 1 4 0' {...s} strokeWidth={1.8} />
        <path d='M80 109c5 3 11 3 16 0' {...s} strokeWidth={2} />
        {glasses ? (
          <>
            <rect x='68' y='80' width='18' height='13' rx='5' {...s} strokeWidth={1.8} />
            <rect x='90' y='80' width='18' height='13' rx='5' {...s} strokeWidth={1.8} />
            <path d='M86 85h4' {...s} strokeWidth={1.8} />
          </>
        ) : null}
        {beard ? <path d='M62 96c2 18 12 28 26 28s24-10 26-28c-6 8-14 10-26 10s-20-2-26-10z' {...s} strokeWidth={1.8} /> : null}
      </g>
    </svg>
  );
}

/** A thin rounded button-looking pill used across the practice site. */
export function Pill({ children, tone = 'ink', style }: { children: ReactNode; tone?: 'ink' | 'apricot' | 'line'; style?: CSSProperties }) {
  const tones = {
    ink: { background: C.ink, color: C.chalk, border: `1px solid ${C.ink}` },
    apricot: { background: C.apricot, color: C.ink, border: `1px solid ${C.apricot}` },
    line: { background: 'transparent', color: C.ink, border: `1px solid ${C.lineStrong}` }
  };
  return (
    <span
      className='inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5'
      style={{ height: 46, fontFamily: SANS, fontSize: 15, fontWeight: 600, ...tones[tone], ...style }}
    >
      {children}
    </span>
  );
}
