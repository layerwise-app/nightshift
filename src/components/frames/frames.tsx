import type { CSSProperties, ReactNode } from 'react';
import { cn } from '~/lib/utils';

/**
 * Device frames drawn in code around a real screen component. They are plain
 * boxes at their design size (CSS pixels); scale them with a transform.
 */

export const PHONE = {
  /** Screen size the phone screens are designed at. */
  screenWidth: 390,
  screenHeight: 844,
  bezel: 11,
  get width() {
    return this.screenWidth + this.bezel * 2;
  },
  get height() {
    return this.screenHeight + this.bezel * 2;
  }
} as const;

type PhoneFrameProps = {
  children: ReactNode;
  /** Frame finish. */
  finish?: 'graphite' | 'silver' | 'sand';
  className?: string;
  style?: CSSProperties;
};

const finishes = {
  graphite: { body: '#17171a', edge: '#3a3a40', button: '#242428' },
  silver: { body: '#d9d9dc', edge: '#f4f4f6', button: '#bdbdc2' },
  sand: { body: '#cdbfa9', edge: '#ebe1d0', button: '#b3a48c' }
} as const;

/** A generic modern phone, 412 × 866 CSS px, with a 390 × 844 screen. */
export function PhoneFrame({ children, finish = 'graphite', className, style }: PhoneFrameProps) {
  const f = finishes[finish];
  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ width: PHONE.width, height: PHONE.height, ...style }}
    >
      {/* side buttons */}
      <span className='absolute -left-[3px] top-[150px] h-[34px] w-[4px] rounded-l-[2px]' style={{ background: f.button }} />
      <span className='absolute -left-[3px] top-[206px] h-[58px] w-[4px] rounded-l-[2px]' style={{ background: f.button }} />
      <span className='absolute -right-[3px] top-[230px] h-[84px] w-[4px] rounded-r-[2px]' style={{ background: f.button }} />
      <div
        className='absolute inset-0 rounded-[60px]'
        style={{
          background: f.body,
          boxShadow: `inset 0 0 0 1.5px ${f.edge}, inset 0 0 0 4px ${f.body}, 0 40px 80px -30px rgba(0,0,0,0.55)`
        }}
      />
      <div
        className='absolute overflow-hidden rounded-[49px] bg-black'
        style={{
          left: PHONE.bezel,
          top: PHONE.bezel,
          width: PHONE.screenWidth,
          height: PHONE.screenHeight
        }}
      >
        {children}
        {/* punch-hole camera */}
        <span className='pointer-events-none absolute left-1/2 top-[13px] z-50 h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-[#050506] ring-1 ring-black/40' />
      </div>
    </div>
  );
}

/** Status bar drawn on top of a phone screen. */
export function PhoneStatusBar({
  tone = 'dark',
  time = '21:08',
  className
}: {
  /** `dark` draws dark glyphs (for light screens). */
  tone?: 'dark' | 'light';
  time?: string;
  className?: string;
}) {
  const color = tone === 'dark' ? '#0b0b0c' : '#ffffff';
  return (
    <div
      className={cn('flex h-[44px] items-center justify-between px-[30px] pt-[4px] text-[15px] font-semibold', className)}
      style={{ color, fontFamily: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif' }}
      aria-hidden='true'
    >
      <span className='tabular-nums tracking-tight'>{time}</span>
      <span className='flex items-center gap-[6px]'>
        <svg aria-hidden='true' width='18' height='11' viewBox='0 0 18 11' fill={color}>
          <rect x='0' y='7' width='3' height='4' rx='1' />
          <rect x='5' y='5' width='3' height='6' rx='1' />
          <rect x='10' y='2.5' width='3' height='8.5' rx='1' />
          <rect x='15' y='0' width='3' height='11' rx='1' />
        </svg>
        <svg aria-hidden='true' width='16' height='11' viewBox='0 0 16 11' fill='none' stroke={color} strokeWidth='1.8' strokeLinecap='round'>
          <path d='M1.5 4a9.5 9.5 0 0 1 13 0' />
          <path d='M4 6.6a6 6 0 0 1 8 0' />
          <circle cx='8' cy='9.3' r='1.1' fill={color} stroke='none' />
        </svg>
        <svg aria-hidden='true' width='26' height='12' viewBox='0 0 26 12' fill='none'>
          <rect x='0.75' y='0.75' width='22' height='10.5' rx='3' stroke={color} strokeOpacity='0.45' strokeWidth='1.5' />
          <rect x='2.5' y='2.5' width='16' height='7' rx='1.6' fill={color} />
          <rect x='24' y='4' width='1.6' height='4' rx='0.8' fill={color} fillOpacity='0.5' />
        </svg>
      </span>
    </div>
  );
}

type BrowserFrameProps = {
  children: ReactNode;
  /** Domain shown in the address bar, like `golfslag.nl`. */
  url: string;
  /** Size of the page area in CSS px. */
  width: number;
  height: number;
  tone?: 'light' | 'dark';
  className?: string;
  style?: CSSProperties;
};

export const BROWSER_BAR = 42;

/** A neutral browser window: an address bar over a page of the given size. */
export function BrowserFrame({ children, url, width, height, tone = 'light', className, style }: BrowserFrameProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-[12px]', className)}
      style={{
        width,
        height: height + BROWSER_BAR,
        background: dark ? '#1a1a1d' : '#ececee',
        boxShadow: dark
          ? 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 50px 100px -40px rgba(0,0,0,0.6)'
          : 'inset 0 0 0 1px rgba(0,0,0,0.08), 0 50px 100px -40px rgba(0,0,0,0.45)',
        ...style
      }}
    >
      <div className='flex items-center gap-3 px-4' style={{ height: BROWSER_BAR }} aria-hidden='true'>
        <span className='flex gap-[7px]'>
          {[0, 1, 2].map((i) => (
            <span key={i} className='size-[10px] rounded-full' style={{ background: dark ? '#3a3a3f' : '#cfcfd3' }} />
          ))}
        </span>
        <span
          className='mx-auto flex h-[26px] min-w-[38%] items-center justify-center gap-2 rounded-[7px] px-4 text-[12.5px]'
          style={{
            background: dark ? '#242428' : '#ffffff',
            color: dark ? '#a8a8ae' : '#5c5c62',
            fontFamily: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          <svg aria-hidden='true' width='9' height='11' viewBox='0 0 9 11' fill='currentColor'>
            <rect x='0' y='4.5' width='9' height='6.5' rx='1.5' />
            <path d='M2 4.5V3.2a2.5 2.5 0 0 1 5 0v1.3' fill='none' stroke='currentColor' strokeWidth='1.3' />
          </svg>
          {url}
        </span>
        <span className='w-[44px]' />
      </div>
      <div className='relative overflow-hidden' style={{ width, height }}>
        {children}
      </div>
    </div>
  );
}
