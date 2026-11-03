import { useEffect, useId, useRef, useState } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { ArchMark, CanalHouse, ink, paintByCode, palette, sans, serif, soft, type Surface } from './brand';
import {
  estimate,
  euros,
  finishInfo,
  formatArea,
  formatLitres,
  litres,
  surfaceInfo,
  type Finish,
  type SurfaceChoice
} from './estimate';

const ring = 'outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#D9A441]';
const ringWithin = 'has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#D9A441]';

const surfaces: Surface[] = ['door', 'frames', 'wall'];

export const defaultChoices: Record<Surface, SurfaceChoice> = {
  door: { colour: 'OD-101', finish: 'gloss', area: 2.2 },
  frames: { colour: 'OD-160', finish: 'satin', area: 7.5 },
  wall: { colour: 'OD-114', finish: 'matt', area: 18 }
};

type MatcherProps = {
  initialSurface?: Surface;
  initialChoices?: Record<Surface, SurfaceChoice>;
  /** Open the request sheet straight away (for stills). */
  initialSheet?: 'review' | 'sent' | null;
};

function totalRange(choices: Record<Surface, SurfaceChoice>): [number, number] {
  return surfaces.reduce<[number, number]>(
    (sum, s) => {
      const [lo, hi] = estimate(s, choices[s]);
      return [sum[0] + lo, sum[1] + hi];
    },
    [0, 0]
  );
}

/**
 * The colour matcher on okkerse.nl, phone layout. Pick a part of the house,
 * pick a colour from the house palette and a finish, set the area; the house
 * repaints and the estimate updates. "Send to Okkerse" shows the one-page
 * request the office prints.
 */
export function ColourMatcher({ initialSurface = 'door', initialChoices = defaultChoices, initialSheet = null }: MatcherProps) {
  const [active, setActive] = useState<Surface>(initialSurface);
  const [choices, setChoices] = useState(initialChoices);
  const [sheet, setSheet] = useState<'review' | 'sent' | null>(initialSheet);
  const id = useId();

  const current = choices[active];
  const currentPaint = paintByCode(current.colour);
  const [lo, hi] = totalRange(choices);

  const update = (patch: Partial<SurfaceChoice>) =>
    setChoices((prev) => ({ ...prev, [active]: { ...prev[active], ...patch } }));

  const setArea = (value: number) => {
    const clamped = Math.max(0, Math.min(200, Math.round(value * 10) / 10));
    update({ area: clamped });
  };

  return (
    <div className='relative flex h-[844px] w-[390px] flex-col overflow-hidden' style={{ background: ink.cream, color: ink.text, fontFamily: sans }}>
      <PhoneStatusBar tone='dark' time='10:24' />
      <header className='flex h-[52px] shrink-0 items-center justify-between border-b px-5' style={{ borderColor: ink.line }}>
        <span className='flex items-center gap-2.5'>
          <ArchMark size={30} />
          <span style={{ ...soft, fontSize: 17, fontWeight: 620, letterSpacing: '-0.02em', color: ink.green }}>
            Okkerse <i style={{ fontWeight: 480 }}>&amp; Dochters</i>
          </span>
        </span>
        <span className='flex items-center gap-3 text-[12px] font-semibold' style={{ color: ink.muted }}>
          <span>
            NL <span style={{ color: ink.line }}>|</span> <span style={{ color: ink.green }}>EN</span>
          </span>
          <svg width='20' height='14' viewBox='0 0 20 14' aria-hidden='true'>
            <path d='M0 1h20M0 7h20M0 13h20' stroke={ink.green} strokeWidth='2' />
          </svg>
        </span>
      </header>

      <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4'>
        <div className='px-5 pt-5'>
          <p className='text-[11px] font-bold uppercase tracking-[0.2em]' style={{ color: ink.brick }}>
            Colour matcher
          </p>
          <h1 className='mt-1.5 text-[29px] leading-[1.02]' style={{ ...soft, fontWeight: 560, letterSpacing: '-0.025em', color: ink.green }}>
            Try our colours on a Schiedam house
          </h1>
        </div>

        <div className='mx-3 mt-4 overflow-hidden rounded-[14px]' style={{ boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
          <CanalHouse
            door={paintByCode(choices.door.colour).hex}
            frames={paintByCode(choices.frames.colour).hex}
            wall={paintByCode(choices.wall.colour).hex}
            active={active}
            onPick={setActive}
            className='block h-auto w-full'
          />
        </div>

        <fieldset className='mt-3 px-3'>
          <legend className='sr-only'>Part of the house</legend>
          <div className='grid grid-cols-3 gap-1.5'>
            {surfaces.map((s) => {
              const paint = paintByCode(choices[s].colour);
              const on = active === s;
              return (
                <label
                  key={s}
                  className={`relative flex h-[46px] cursor-pointer items-center gap-2 rounded-[10px] px-2.5 text-[12.5px] font-semibold leading-tight ${ringWithin}`}
                  style={{ background: on ? ink.green : ink.paper, color: on ? ink.cream : ink.text, boxShadow: on ? 'none' : `inset 0 0 0 1px ${ink.line}` }}
                >
                  <input
                    type='radio'
                    name={`${id}-surface`}
                    value={s}
                    checked={on}
                    onChange={() => setActive(s)}
                    className='sr-only'
                  />
                  <span className='size-[18px] shrink-0 rounded-full' style={{ background: paint.hex, boxShadow: `inset 0 0 0 1.5px ${on ? ink.cream : 'rgba(0,0,0,0.18)'}` }} />
                  {surfaceInfo[s].label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <section className='mt-5 px-5' aria-labelledby={`${id}-swatch-title`}>
          <div className='flex items-baseline justify-between gap-3'>
            <h2 id={`${id}-swatch-title`} className='text-[13px] font-bold'>
              Colour · {surfaceInfo[active].label.toLowerCase()}
            </h2>
            <span className='truncate text-[12.5px]' style={{ color: ink.muted }}>
              {currentPaint.name} {currentPaint.code}
            </span>
          </div>
          <div className='mt-3 grid grid-cols-5 gap-x-2 gap-y-3'>
            {palette.map((paint) => {
              const on = paint.code === current.colour;
              return (
                <button
                  key={paint.code}
                  type='button'
                  aria-pressed={on}
                  aria-label={`${paint.name}, ${paint.code}`}
                  onClick={() => update({ colour: paint.code })}
                  className={`flex flex-col items-center gap-1.5 rounded-[8px] ${ring}`}
                >
                  <span
                    className='relative flex size-[52px] items-center justify-center rounded-[10px]'
                    style={{
                      background: paint.hex,
                      boxShadow: on ? `0 0 0 2.5px ${ink.cream}, 0 0 0 5px ${ink.green}` : 'inset 0 0 0 1px rgba(0,0,0,0.12)'
                    }}
                  >
                    {on ? (
                      <svg width='18' height='14' viewBox='0 0 18 14' aria-hidden='true'>
                        <path d='M1.5 7.5l5 4.5L16.5 2' fill='none' stroke={paint.on} strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    ) : null}
                  </span>
                  <span className='w-full text-center text-[10.5px] font-semibold leading-[1.15]' style={{ color: on ? ink.green : ink.muted }}>
                    {paint.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <fieldset className='mt-5 px-5'>
          <legend className='text-[13px] font-bold'>Finish</legend>
          <div className='mt-2 grid grid-cols-3 rounded-[11px] p-1' style={{ background: ink.paper, boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
            {(Object.keys(finishInfo) as Finish[]).map((f) => {
              const on = current.finish === f;
              return (
                <label
                  key={f}
                  className={`relative flex h-9 cursor-pointer items-center justify-center rounded-[8px] text-[13.5px] font-semibold ${ringWithin}`}
                  style={{ background: on ? ink.green : 'transparent', color: on ? ink.cream : ink.text }}
                >
                  <input type='radio' name={`${id}-finish`} value={f} checked={on} onChange={() => update({ finish: f })} className='sr-only' />
                  {finishInfo[f].label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className='mt-5 px-5'>
          <label htmlFor={`${id}-area`} className='text-[13px] font-bold'>
            Area to paint
          </label>
          <div className='mt-2 flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setArea(current.area - 0.5)}
              aria-label='Half a square metre less'
              className={`flex size-11 items-center justify-center rounded-[10px] text-[20px] font-semibold ${ring}`}
              style={{ background: ink.paper, boxShadow: `inset 0 0 0 1px ${ink.line}`, color: ink.green }}
            >
              −
            </button>
            <div className='relative flex-1'>
              <input
                id={`${id}-area`}
                type='number'
                inputMode='decimal'
                min={0}
                max={200}
                step={0.5}
                value={formatArea(current.area)}
                onChange={(e) => setArea(Number(e.target.value || 0))}
                className={`h-11 w-full rounded-[10px] pl-4 pr-12 text-[17px] font-semibold tabular-nums ${ring}`}
                style={{ background: ink.paper, boxShadow: `inset 0 0 0 1px ${ink.line}`, color: ink.text }}
              />
              <span className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px]' style={{ color: ink.muted }}>
                m²
              </span>
            </div>
            <button
              type='button'
              onClick={() => setArea(current.area + 0.5)}
              aria-label='Half a square metre more'
              className={`flex size-11 items-center justify-center rounded-[10px] text-[20px] font-semibold ${ring}`}
              style={{ background: ink.paper, boxShadow: `inset 0 0 0 1px ${ink.line}`, color: ink.green }}
            >
              +
            </button>
          </div>
        </div>

        <dl className='mx-5 mt-5 divide-y rounded-[12px] px-4' style={{ background: ink.paper, boxShadow: `inset 0 0 0 1px ${ink.line}`, borderColor: ink.line }}>
          {surfaces.map((s) => {
            const c = choices[s];
            const paint = paintByCode(c.colour);
            const [a, b] = estimate(s, c);
            return (
              <div key={s} className='flex items-center gap-3 py-2.5' style={{ borderColor: ink.line }}>
                <dt className='flex min-w-0 flex-1 items-center gap-3 text-[12.5px] leading-tight'>
                  <span className='size-[22px] shrink-0 rounded-[6px]' style={{ background: paint.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }} />
                  <span className='min-w-0'>
                    <span className='block font-bold'>{surfaceInfo[s].label}</span>
                    <span style={{ color: ink.muted }}>
                      {paint.code} · {finishInfo[c.finish].label.toLowerCase()} · {formatArea(c.area)} m² · {formatLitres(litres(c))} L
                    </span>
                  </span>
                </dt>
                <dd className='shrink-0 text-[12.5px] font-semibold tabular-nums'>
                  €{euros(a)}–{euros(b)}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className='mx-5 mt-3 text-[11.5px] leading-snug' style={{ color: ink.muted }}>
          Labour and two coats of paint, before VAT. Listed buildings are always quoted on site.
        </p>
      </div>

      <div className='flex shrink-0 items-center gap-3 px-5 pb-7 pt-3.5' style={{ background: ink.green, color: ink.cream }}>
        <div className='min-w-0 flex-1' aria-live='polite'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.16em] opacity-75'>Estimate, all three</p>
          <p className='mt-0.5 text-[21px] tabular-nums' style={{ fontFamily: serif, fontWeight: 600 }}>
            €{euros(lo)} – {euros(hi)}
          </p>
        </div>
        <button
          type='button'
          onClick={() => setSheet('review')}
          className={`h-12 shrink-0 rounded-[12px] px-5 text-[14.5px] font-bold ${ring}`}
          style={{ background: ink.ochre, color: ink.text }}
        >
          Send to Okkerse
        </button>
      </div>

      {sheet ? (
        <RequestSheet choices={choices} range={[lo, hi]} state={sheet} onState={setSheet} />
      ) : null}
    </div>
  );
}

function RequestSheet({
  choices,
  range,
  state,
  onState
}: {
  choices: Record<Surface, SurfaceChoice>;
  range: [number, number];
  state: 'review' | 'sent';
  onState: (state: 'review' | 'sent' | null) => void;
}) {
  const id = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);

  // Move focus into the sheet when it opens or changes step; skip the first
  // render of stills that start open.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current || state === 'review') headingRef.current?.focus();
    mounted.current = true;
  }, [state]);

  const send = () => {
    if (!phone.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onState('sent');
  };

  return (
    <div
      className='absolute inset-0 z-10 flex flex-col justify-end'
      style={{ background: 'rgba(21,42,32,0.55)' }}
    >
      <div
        role='dialog'
        aria-modal='true'
        onKeyDown={(e) => {
          if (e.key === 'Escape') onState(null);
        }}
        aria-labelledby={`${id}-title`}
        className='rounded-t-[22px] px-5 pb-8 pt-3'
        style={{ background: ink.cream, boxShadow: '0 -20px 40px -20px rgba(0,0,0,0.4)' }}
      >
        <span className='mx-auto block h-1 w-10 rounded-full' style={{ background: ink.line }} />
        {state === 'review' ? (
          <>
            <h2 id={`${id}-title`} ref={headingRef} tabIndex={-1} className='mt-4 text-[25px] leading-[1.05] outline-none' style={{ ...soft, fontWeight: 580, color: ink.green }}>
              This is what Kees will read
            </h2>
            <p className='mt-1.5 text-[13px] leading-snug' style={{ color: ink.muted }}>
              One printed page, big type. Lotte or Kees calls you back within one working day.
            </p>
            <ol className='mt-4 space-y-1.5 rounded-[12px] bg-white p-4 text-[15px] leading-snug' style={{ boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
              {surfaces.filter((s) => choices[s].area > 0).map((s) => {
                const c = choices[s];
                const paint = paintByCode(c.colour);
                return (
                  <li key={s} className='flex gap-2.5'>
                    <span className='mt-[3px] size-[14px] shrink-0 rounded-[4px]' style={{ background: paint.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }} />
                    <span>
                      <b>{surfaceInfo[s].label}</b> — {paint.name}, {finishInfo[c.finish].label.toLowerCase()}, {formatArea(c.area)} m²
                    </span>
                  </li>
                );
              })}
              <li className='mt-2 border-t pt-2 font-bold tabular-nums' style={{ borderColor: ink.line }}>
                Rough budget €{euros(range[0])} – {euros(range[1])}
              </li>
            </ol>
            <div className='mt-4 grid grid-cols-2 gap-2'>
              <label className='text-[12px] font-bold'>
                Your name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='name'
                  className={`mt-1 h-11 w-full rounded-[10px] bg-white px-3 text-[15px] font-normal ${ring}`}
                  style={{ boxShadow: `inset 0 0 0 1px ${ink.line}` }}
                />
              </label>
              <label className='text-[12px] font-bold'>
                Phone
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type='tel'
                  autoComplete='tel'
                  aria-invalid={error}
                  aria-describedby={error ? `${id}-err` : undefined}
                  className={`mt-1 h-11 w-full rounded-[10px] bg-white px-3 text-[15px] font-normal ${ring}`}
                  style={{ boxShadow: `inset 0 0 0 ${error ? 2 : 1}px ${error ? ink.brick : ink.line}` }}
                />
              </label>
            </div>
            {error ? (
              <p id={`${id}-err`} className='mt-2 text-[12.5px] font-semibold' style={{ color: ink.brick }}>
                Add a phone number so we can call you.
              </p>
            ) : null}
            <div className='mt-4 flex gap-2'>
              <button
                type='button'
                onClick={() => onState(null)}
                className={`h-12 flex-1 rounded-[12px] text-[14.5px] font-bold ${ring}`}
                style={{ boxShadow: `inset 0 0 0 1.5px ${ink.green}`, color: ink.green }}
              >
                Change colours
              </button>
              <button
                type='button'
                onClick={send}
                className={`h-12 flex-1 rounded-[12px] text-[14.5px] font-bold ${ring}`}
                style={{ background: ink.green, color: ink.cream }}
              >
                Send request
              </button>
            </div>
          </>
        ) : (
          <div className='pt-4 text-center'>
            <ArchMark size={64} className='mx-auto' />
            <h2 id={`${id}-title`} ref={headingRef} tabIndex={-1} className='mt-4 text-[27px] leading-[1.05] outline-none' style={{ ...soft, fontWeight: 580, color: ink.green }}>
              Sent to the office
            </h2>
            <p className='mx-auto mt-2 max-w-[30ch] text-[14px] leading-snug' style={{ color: ink.muted }}>
              Reference <b style={{ color: ink.text }}>OD-24-0613</b>. Your page is on the printer at the Lange Haven. Expect a call before 17:00 on the next working day.
            </p>
            <button
              type='button'
              onClick={() => onState(null)}
              className={`mt-6 h-12 w-full rounded-[12px] text-[14.5px] font-bold ${ring}`}
              style={{ background: ink.green, color: ink.cream }}
            >
              Back to the colours
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
