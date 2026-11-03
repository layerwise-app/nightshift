import { useEffect, useRef, useState } from 'react';
import { clockText, isOnShift, quarterOf } from '~/lib/time';
import { cn } from '~/lib/utils';
import { portfolio } from '~/portfolio.config';
import { useAsk } from './AskPanel';

const { timeZone, clockLabel } = portfolio.location;
const { slotsOpen, slotsPerQuarter, shift } = portfolio.availability;

/** The current minute, refreshed on the minute. */
function useMinute(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setNow(new Date());
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    };
    timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    return () => clearTimeout(timer);
  }, []);
  return now;
}

/** Writes scroll progress (0–1) to a CSS variable and a text node, without re-rendering. */
function useScrollProgress(
  root: React.RefObject<HTMLElement | null>,
  labels: React.RefObject<HTMLElement | null>[]
) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.current?.style.setProperty('--progress', progress.toFixed(4));
      const text = String(Math.round(progress * 100)).padStart(3, '0');
      for (const label of labels) {
        if (label.current) label.current.textContent = text;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [root, labels]);
}

function SlotBar({ vertical }: { vertical?: boolean }) {
  return (
    <span
      aria-hidden='true'
      className={cn('flex gap-[3px]', vertical ? 'flex-col-reverse' : 'flex-row')}
    >
      {Array.from({ length: slotsPerQuarter }, (_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decorative bar
          key={i}
          className={cn(
            vertical ? 'h-[14px] w-[5px]' : 'h-[5px] w-[12px]',
            i < slotsPerQuarter - slotsOpen
              ? 'bg-line-strong'
              : 'bg-signal'
          )}
        />
      ))}
    </span>
  );
}

/**
 * Status labels on the screen edges: scroll position on the left rail, the
 * local time and this quarter's open slots on the right. Phones get the same
 * readouts in a slim bar along the bottom.
 */
export function EdgeReadouts() {
  const now = useMinute();
  const rootRef = useRef<HTMLDivElement>(null);
  const deskLabel = useRef<HTMLSpanElement>(null);
  const [labels] = useState(() => [deskLabel]);
  useScrollProgress(rootRef, labels);
  const { openAsk } = useAsk();

  const time = clockText(now, timeZone);
  const onShift = isOnShift(now, timeZone, shift);
  const quarter = quarterOf(now, timeZone);
  const slotsText = `${slotsOpen} of ${slotsPerQuarter} slots open`;

  return (
    <div ref={rootRef} data-readouts className='contents' style={{ '--progress': 0 } as React.CSSProperties}>
      {/* Top progress line under the header (all sizes below desktop). */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed inset-x-0 top-[var(--header-h)] z-[60] h-[2px] origin-left bg-signal lg:hidden'
        style={{ transform: 'scaleX(var(--progress))' }}
      />

      {/* Desktop: left rail fills with progress. */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed bottom-0 top-[var(--header-h)] z-[60] hidden w-[2px] -translate-x-[0.5px] lg:block'
        style={{ left: 'calc(var(--gutter) - 0.5px)' }}
      >
        <div
          className='h-full w-full origin-top bg-signal'
          style={{ transform: 'scaleY(var(--progress))' }}
        />
      </div>
      <div className='pointer-events-none fixed bottom-6 left-0 z-[60] hidden w-[var(--gutter)] justify-center lg:flex'>
        <p className='label rotate-180 text-ink-3 [writing-mode:vertical-rl]'>
          Scroll <span ref={deskLabel} className='text-ink'>000</span>%
        </p>
      </div>

      {/* Desktop: right gutter, clock at the top and slots at the bottom. */}
      <div className='pointer-events-none fixed right-0 top-[calc(var(--header-h)+24px)] z-[60] hidden w-[var(--gutter)] justify-center lg:flex'>
        <p className='label text-ink-3 [writing-mode:vertical-rl]'>
          <span className='text-ink' suppressHydrationWarning>
            {clockLabel} {time}
          </span>
          <span className='mx-2 inline-block'>/</span>
          <span suppressHydrationWarning className={onShift ? 'text-signal' : undefined}>
            {onShift ? 'On shift' : 'Off shift'}
          </span>
        </p>
      </div>
      <div className='pointer-events-none fixed bottom-6 right-0 z-[60] hidden w-[var(--gutter)] flex-col items-center gap-3 lg:flex'>
        <p className='label rotate-180 text-ink-3 [writing-mode:vertical-rl]'>
          <span suppressHydrationWarning>{quarter.short}</span>
          <span className='mx-2 inline-block'>/</span>
          <span className='text-ink'>{slotsText}</span>
        </p>
        <SlotBar vertical />
      </div>

      {/* Phones and tablets: one bar along the bottom. */}
      <div className='fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-bg pb-[env(safe-area-inset-bottom)] lg:hidden'>
        <div className='flex h-10 items-center justify-between gap-3 px-4'>
          <p className='label flex items-center gap-2 text-ink-2'>
            <SlotBar />
            <span>
              <span className='text-ink'>{slotsOpen}/{slotsPerQuarter}</span> open{' '}
              <span suppressHydrationWarning>{quarter.short}</span>
            </span>
          </p>
          <p className='label text-ink-3' suppressHydrationWarning>
            {clockLabel} <span className='text-ink'>{time}</span>
          </p>
          <button
            type='button'
            onClick={() => openAsk()}
            className='label -mr-2 flex h-10 items-center gap-1.5 px-2 text-ink'
          >
            <span className='text-signal'>●</span> Ask
          </button>
        </div>
      </div>
    </div>
  );
}
