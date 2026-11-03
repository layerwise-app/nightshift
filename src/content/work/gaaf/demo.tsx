import { useId, useMemo, useState, type ReactNode } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { G, GaafWordmark, SlotGauge, gaafRoot } from './brand';
import { computeRhythm, euro, type RhythmInput } from './rhythm';

const focus =
  'outline-none focus-visible:outline focus-visible:outline-[2.5px] focus-visible:outline-offset-2 focus-visible:outline-[#1F3FD1]';

function Stepper({
  label,
  note,
  value,
  min,
  max,
  onChange,
  noun
}: {
  label: string;
  note: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  noun: string;
}) {
  return (
    <fieldset className='flex items-center justify-between gap-3 py-3'>
      <legend className='sr-only'>{label}</legend>
      <div aria-hidden='true'>
        <p className='text-[16px] font-semibold'>
          {label}
        </p>
        <p className='text-[12.5px]' style={{ color: G.ink2 }}>
          {note}
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          aria-label={`One ${noun} fewer`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className={`flex size-10 items-center justify-center rounded-full text-[22px] font-medium transition-colors disabled:opacity-30 ${focus}`}
          style={{ background: G.sand, color: G.ink }}
        >
          −
        </button>
        <output className='w-7 text-center text-[20px] font-bold tabular-nums' aria-label={`${value} ${label.toLowerCase()}`}>
          {value}
        </output>
        <button
          type='button'
          aria-label={`One ${noun} more`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className={`flex size-10 items-center justify-center rounded-full text-[22px] font-medium transition-colors disabled:opacity-30 ${focus}`}
          style={{ background: G.cobalt, color: G.paper }}
        >
          +
        </button>
      </div>
    </fieldset>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  note,
  icon
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  note: string;
  icon: ReactNode;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center gap-3 rounded-[16px] px-3 py-2.5 text-left transition-colors ${focus}`}
      style={{ background: checked ? '#FFFFFF' : 'transparent', boxShadow: checked ? `inset 0 0 0 1.5px ${G.cobalt}` : `inset 0 0 0 1px ${G.line}` }}
    >
      <span className='flex size-10 shrink-0 items-center justify-center rounded-[12px]' style={{ background: checked ? G.mint : G.sand }}>
        {icon}
      </span>
      <span className='min-w-0 flex-1'>
        <span className='block text-[15px] font-semibold'>{title}</span>
        <span className='block text-[12px]' style={{ color: G.ink2 }}>
          {note}
        </span>
      </span>
      <span
        aria-hidden='true'
        className='relative h-[26px] w-[44px] shrink-0 rounded-full transition-colors'
        style={{ background: checked ? G.cobalt : G.line }}
      >
        <span
          className='absolute top-[3px] size-[20px] rounded-full bg-white transition-transform'
          style={{ transform: `translateX(${checked ? 21 : 3}px)` }}
        />
      </span>
    </button>
  );
}

const TabletIcon = (
  <svg width='22' height='22' viewBox='0 0 22 22' aria-hidden='true'>
    <circle cx='11' cy='11' r='8' fill={G.paper} stroke={G.ink} strokeWidth='1.5' />
    <path d='M6.5 11h9' stroke={G.ink} strokeWidth='1.5' strokeLinecap='round' />
  </svg>
);
const HeadIcon = (
  <svg width='22' height='22' viewBox='0 0 22 22' aria-hidden='true'>
    <rect x='8' y='2' width='6' height='11' rx='2' fill={G.paper} stroke={G.ink} strokeWidth='1.5' />
    <path d='M9 13v7h4v-7' fill='none' stroke={G.ink} strokeWidth='1.5' />
  </svg>
);
const FlossIcon = (
  <svg width='22' height='22' viewBox='0 0 22 22' aria-hidden='true'>
    <rect x='5' y='6' width='12' height='14' rx='4' fill={G.paper} stroke={G.ink} strokeWidth='1.5' />
    <rect x='4.5' y='2' width='13' height='5' rx='2' fill={G.tomato} />
  </svg>
);

export function RhythmScreen({ initial }: { initial?: Partial<RhythmInput> }) {
  const [state, setState] = useState<RhythmInput>({
    adults: 2,
    kids: 1,
    timesPerDay: 2,
    tablets: true,
    brushHeads: true,
    floss: false,
    ...initial
  });
  const set = <K extends keyof RhythmInput>(key: K, value: RhythmInput[K]) => setState((s) => ({ ...s, [key]: value }));
  const r = useMemo(() => computeRhythm(state), [state]);
  const nothing = !state.tablets && !state.brushHeads && !state.floss;
  const groupName = useId();

  const announcement = nothing
    ? 'Choose at least one product.'
    : `Every ${r.everyWeeks} weeks, ${r.tabletsPerMonth} tablets a month, ${euro(r.perMonth)} a month. ${
        r.fits ? 'Fits through your letterbox.' : `Sent as ${r.parcels} letterbox parcels.`
      }`;

  return (
    <div className='flex h-full flex-col' style={{ ...gaafRoot, background: G.paper }}>
      <PhoneStatusBar tone='dark' time='08:12' />
      <div className='flex items-center justify-between px-5 pb-2 pt-1'>
        <GaafWordmark size={24} />
        <span className='text-[12px] font-semibold' style={{ color: G.ink2 }}>
          Step 2 of 3
        </span>
      </div>
      <div className='mx-5 h-[4px] overflow-hidden rounded-full' style={{ background: G.sand }}>
        <div className='h-full w-2/3 rounded-full' style={{ background: G.cobalt }} />
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4'>
        <h2 className='mt-5 text-[30px] font-extrabold leading-[1] tracking-[-0.04em]'>Your refill rhythm</h2>
        <p className='mt-2 text-[14px] leading-snug' style={{ color: G.ink2 }}>
          Tell us who brushes. We size each parcel so you never run out and never stockpile.
        </p>

        <div className='mt-4 rounded-[20px] bg-white px-4 py-1' style={{ boxShadow: `inset 0 0 0 1px ${G.line}` }}>
          <Stepper label='Adults' noun='adult' note='Fresh mint, 1450 ppm' value={state.adults} min={0} max={6} onChange={(v) => set('adults', v)} />
          <div className='h-px' style={{ background: G.line }} />
          <Stepper label='Kids under 12' noun='kid' note='Junior apple, 1000 ppm' value={state.kids} min={0} max={6} onChange={(v) => set('kids', v)} />
        </div>

        <fieldset className='mt-5'>
          <legend className='text-[13px] font-semibold uppercase tracking-[0.06em]' style={{ color: G.ink2 }}>
            Brushing, per person per day
          </legend>
          <div className='mt-2 grid grid-cols-3 gap-1 rounded-full p-1' style={{ background: G.sand }}>
            {([1, 2, 3] as const).map((n) => (
              <label key={n} className='relative'>
                <input
                  type='radio'
                  name={groupName}
                  value={n}
                  checked={state.timesPerDay === n}
                  onChange={() => set('timesPerDay', n)}
                  className='peer sr-only'
                />
                <span
                  className='flex h-10 cursor-pointer items-center justify-center rounded-full text-[15px] font-semibold transition-colors peer-focus-visible:outline peer-focus-visible:outline-[2.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#1F3FD1]'
                  style={state.timesPerDay === n ? { background: G.cobalt, color: G.paper } : { color: G.ink }}
                >
                  {n}× a day
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className='mt-5'>
          <p className='text-[13px] font-semibold uppercase tracking-[0.06em]' style={{ color: G.ink2 }}>
            In each parcel
          </p>
          <div className='mt-2 space-y-2'>
            <Toggle checked={state.tablets} onChange={(v) => set('tablets', v)} title='Toothpaste tablets' note='€0,075 a tablet · compostable pouch' icon={TabletIcon} />
            <Toggle checked={state.brushHeads} onChange={(v) => set('brushHeads', v)} title='Brush heads' note='One per person every 12 weeks · €3,50' icon={HeadIcon} />
            <Toggle checked={state.floss} onChange={(v) => set('floss', v)} title='Floss, 50 m' note='Corn fibre, glass vial · €4,95' icon={FlossIcon} />
          </div>
        </div>
      </div>

      <section
        aria-label='Your rhythm'
        className='rounded-t-[26px] px-5 pb-6 pt-4'
        style={{ background: G.cobalt, color: G.paper }}
      >
        <p className='sr-only' aria-live='polite'>
          {announcement}
        </p>
        {nothing ? (
          <div className='py-8 text-center'>
            <p className='text-[22px] font-bold tracking-[-0.02em]'>Pick at least one product</p>
            <p className='mt-1 text-[13px] opacity-80'>Tablets, brush heads or floss.</p>
          </div>
        ) : (
          <>
            <div className='flex items-end justify-between gap-3'>
              <div>
                <p className='text-[12px] font-semibold uppercase tracking-[0.08em] opacity-75'>Delivered every</p>
                <p className='text-[40px] font-extrabold leading-[0.95] tracking-[-0.05em]'>
                  {r.everyWeeks} weeks
                </p>
              </div>
              <div className='pb-1 text-right'>
                <p className='text-[24px] font-bold leading-none tracking-[-0.03em] tabular-nums'>{euro(r.perMonth)}</p>
                <p className='mt-1 text-[12px] opacity-75'>a month</p>
              </div>
            </div>
            <p className='mt-2 text-[13px] opacity-85'>
              {state.tablets ? `${r.tabletsPerMonth} tablets a month · ${r.tin}` : 'No tablets'}
              {r.pouches > 0 ? ` · ${r.pouches} ${r.pouches === 1 ? 'pouch' : 'pouches'} a parcel` : ''}
            </p>
            <ol className='mt-3 flex gap-1.5' aria-label='Next deliveries'>
              {r.dates.map((date, i) => (
                <li
                  key={date}
                  className='flex-1 rounded-[12px] px-2 py-1.5 text-center text-[12.5px] font-semibold'
                  style={{ background: i === 0 ? G.paper : 'rgba(251,248,242,0.14)', color: i === 0 ? G.cobalt : G.paper }}
                >
                  {date}
                </li>
              ))}
            </ol>
            <div className='mt-3 rounded-[14px] px-3 py-2.5' style={{ background: G.paper, color: G.ink }}>
              <SlotGauge cm={Math.min(r.thicknessCm, 3.2 * r.parcels) / r.parcels} compact />
              <p className='mt-1.5 flex items-center gap-1.5 text-[12.5px] font-semibold' style={{ color: r.fits ? G.cobalt : G.tomato }}>
                <span aria-hidden='true'>{r.fits ? '✓' : '!'}</span>
                {r.fits ? 'Fits through your letterbox' : `Too thick for one slot: sent as ${r.parcels} letterbox parcels`}
              </p>
            </div>
          </>
        )}
        <button
          type='button'
          disabled={nothing}
          className='mt-3 flex h-12 w-full items-center justify-center rounded-full text-[16px] font-bold disabled:opacity-40 outline-none focus-visible:outline focus-visible:outline-[2.5px] focus-visible:outline-offset-2 focus-visible:outline-[#FBF8F2]'
          style={{ background: G.tomato, color: '#fff' }}
        >
          Start my rhythm
        </button>
      </section>
    </div>
  );
}

export default function GaafDemo() {
  return <RhythmScreen />;
}
