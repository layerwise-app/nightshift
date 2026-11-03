import { useEffect, useState, type ReactNode } from 'react';
import { PhoneFrame } from '~/components/frames/frames';
import { display, G, mono, WaveBand } from './brand';
import { TicketPicker } from './picker';
import { QueueScreen, WalletScreen, YourTurnScreen } from './screens';

const LOOP = 10_000;

const STEPS = [
  {
    start: 0,
    time: '10:00:03',
    title: 'In the queue',
    body: '31,402 people arrived in the first minute. Everyone inside before ten got a random place.'
  },
  {
    start: 3600,
    time: '10:06:40',
    title: 'Your turn',
    body: 'The queue lets 860 people a minute through, so checkout never slows down.'
  },
  {
    start: 4800,
    time: '10:07:15',
    title: 'Two weekend passes',
    body: 'Any mix of days, up to four tickets. Split the bill if you are buying for friends.'
  },
  {
    start: 7400,
    time: '10:08:02',
    title: 'In the wallet',
    body: 'The code changes every 30 seconds and scans without signal at the gate.'
  }
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);

function stepAt(t: number) {
  let index = 0;
  STEPS.forEach((s, i) => {
    if (t >= s.start) index = i;
  });
  return index;
}

function screenFor(index: number, t: number): ReactNode {
  if (index === 0) {
    const p = easeInOut(clamp(t / 3400));
    return <QueueScreen ahead={Math.round(4218 * (1 - p))} progress={0.08 + 0.92 * p} />;
  }
  if (index === 1) return <YourTurnScreen />;
  if (index === 2) {
    const count = t >= 6200 ? 2 : t >= 5600 ? 1 : 0;
    return <TicketPicker key={`p${count}`} initial={{ weekend: count }} pressed={t >= 6900 ? 'weekend' : undefined} />;
  }
  const local = t - STEPS[3].start;
  return <WalletScreen seed={local >= 1300 ? 77 : 41} refresh={local >= 1300 ? 30 - Math.floor((local - 1300) / 1000) : 1} />;
}

/**
 * Drop day on one phone, from the queue to the wallet. `t` freezes the film
 * at a moment (used for the poster); without it, it loops.
 */
export function QueueFilm({ t: fixed }: { t?: number }) {
  const [now, setNow] = useState(fixed ?? 0);

  useEffect(() => {
    if (fixed !== undefined) return;
    let frame = 0;
    let start: number | null = null;
    const loop = (time: number) => {
      start ??= time;
      setNow((time - start) % LOOP);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [fixed]);

  const t = fixed ?? now;
  const index = stepAt(t);
  const step = STEPS[index];
  const fade = clamp((t - step.start) / 260);
  const prev = index > 0 && fade < 1 ? index - 1 : null;

  return (
    <div className='relative h-full w-full overflow-hidden' style={{ background: G.night, color: G.sand }}>
      <div className='absolute inset-x-0 bottom-[-20px]'>
        <WaveBand width={1440} rows={5} gap={24} amp={9} color={G.sea} stroke={3} />
      </div>

      <div className='absolute left-[120px] top-[150px] w-[560px]'>
        <p className='text-[13px] font-semibold uppercase tracking-[0.1em]' style={{ fontFamily: mono, color: G.lilac }}>
          Drop day · step {index + 1} of 4
        </p>
        <div style={{ opacity: fade, transform: `translateY(${(1 - fade) * 14}px)` }}>
          <p className='mt-6 tabular-nums' style={{ ...display, fontSize: 132, color: G.coral }}>
            {step.time}
          </p>
          <p className='mt-4' style={{ ...display, fontSize: 84 }}>
            {step.title}
          </p>
          <p className='mt-6 max-w-[440px] text-[21px] leading-snug' style={{ color: 'rgba(243,233,218,0.75)' }}>
            {step.body}
          </p>
        </div>
        <div className='mt-12 flex gap-2'>
          {STEPS.map((s, i) => (
            <span
              key={s.title}
              className='h-[6px] rounded-full'
              style={{ width: i === index ? 56 : 22, background: i <= index ? G.coral : 'rgba(243,233,218,0.2)' }}
            />
          ))}
        </div>
      </div>

      <div className='absolute left-[820px] top-[58px] origin-top-left' style={{ transform: 'scale(0.9)' }}>
        <PhoneFrame>
          <div className='absolute inset-0'>
            {prev !== null ? <div className='absolute inset-0'>{screenFor(prev, STEPS[index].start - 1)}</div> : null}
            <div className='absolute inset-0' style={{ opacity: prev !== null ? fade : 1 }}>
              {screenFor(index, t)}
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
