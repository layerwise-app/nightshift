import { useEffect, useId, useState } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { display, euro, G, mono, Screen, TIERS, type Tier, Wordmark } from './brand';

const MAX_TICKETS = 4;
const FEE = 2.5;
const CAMPING = 42.5;
const LOCKER = 12;

type Counts = Record<Tier['id'], number>;

const ring =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6A4D]';

function Stepper({
  label,
  value,
  canAdd,
  onChange
}: {
  label: string;
  value: number;
  canAdd: boolean;
  onChange: (next: number) => void;
}) {
  const btn =
    `flex size-10 items-center justify-center rounded-full text-[22px] leading-none transition-colors disabled:opacity-30 ${ring}`;
  return (
    <fieldset className='m-0 flex items-center gap-1.5 border-0 p-0'>
      <legend className='sr-only'>{label} tickets</legend>
      <button
        type='button'
        className={btn}
        style={{ background: value > 0 ? G.night : 'rgba(11,12,46,0.08)', color: value > 0 ? G.sand : G.ink }}
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
        aria-label={`Remove one ${label} ticket`}
      >
        −
      </button>
      <span className='w-7 text-center text-[20px] font-bold tabular-nums' aria-hidden='true'>
        {value}
      </span>
      <button
        type='button'
        className={btn}
        style={{ background: G.coral, color: G.ink }}
        disabled={!canAdd}
        onClick={() => onChange(value + 1)}
        aria-label={`Add one ${label} ticket`}
      >
        +
      </button>
    </fieldset>
  );
}

function Switch({
  checked,
  onChange,
  label,
  detail
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  detail: string;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center gap-3 rounded-[16px] px-4 py-3.5 text-left ${ring}`}
      style={{ background: 'rgba(243,233,218,0.08)' }}
    >
      <span className='min-w-0 flex-1'>
        <span className='block text-[15px] font-semibold' style={{ color: G.sand }}>
          {label}
        </span>
        <span className='mt-0.5 block text-[12.5px] leading-snug' style={{ color: 'rgba(243,233,218,0.66)' }}>
          {detail}
        </span>
      </span>
      <span
        aria-hidden='true'
        className='relative h-[28px] w-[46px] shrink-0 rounded-full transition-colors'
        style={{ background: checked ? G.coral : 'rgba(243,233,218,0.22)' }}
      >
        <span
          className='absolute top-[3px] size-[22px] rounded-full transition-[left]'
          style={{ left: checked ? 21 : 3, background: checked ? G.ink : G.sand }}
        />
      </span>
    </button>
  );
}

function TierCard({
  tier,
  count,
  canAdd,
  onChange
}: {
  tier: Tier;
  count: number;
  canAdd: boolean;
  onChange: (n: number) => void;
}) {
  const [resaleOpen, setResaleOpen] = useState(false);
  const pct = Math.round(tier.sold * 100);
  const hot = tier.sold >= 0.85 && !tier.soldOut;
  return (
    <li
      className='rounded-[20px] p-4'
      style={{
        background: tier.soldOut ? 'rgba(243,233,218,0.1)' : G.sand,
        color: tier.soldOut ? 'rgba(243,233,218,0.8)' : G.ink
      }}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <p style={{ ...display, fontSize: 32 }}>{tier.name}</p>
          <p className='mt-1 text-[12.5px] font-medium opacity-75'>{tier.date}</p>
        </div>
        <p className='pt-0.5 text-right'>
          <span className='block text-[19px] font-bold tabular-nums'>{euro(tier.price)}</span>
          <span className='block text-[11px] opacity-60'>+ {euro(FEE)} fee</span>
        </p>
      </div>
      <p className='mt-2 text-[12.5px] leading-snug opacity-70'>{tier.note}</p>

      <div className='mt-3'>
        <div className='h-[6px] overflow-hidden rounded-full' style={{ background: tier.soldOut ? 'rgba(243,233,218,0.18)' : 'rgba(11,12,46,0.12)' }}>
          <div className='h-full rounded-full' style={{ width: `${pct}%`, background: tier.soldOut ? 'rgba(243,233,218,0.45)' : G.coral }} />
        </div>
        <div className='mt-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.06em]'>
          <span style={{ fontFamily: mono }}>{tier.soldOut ? 'Sold out' : `${pct}% sold`}</span>
          {hot ? <span style={{ color: G.coralDeep }}>Going fast</span> : null}
        </div>
      </div>

      {tier.soldOut ? (
        <div className='mt-3'>
          <button
            type='button'
            aria-expanded={resaleOpen}
            onClick={() => setResaleOpen((v) => !v)}
            className={`w-full rounded-[12px] px-3 py-2.5 text-left text-[13.5px] font-semibold ${ring}`}
            style={{ background: 'rgba(243,233,218,0.12)', color: G.sand }}
          >
            Official resale · 3 listed at face value {resaleOpen ? '↑' : '→'}
          </button>
          {resaleOpen ? (
            <p className='mt-2 px-1 text-[12.5px] leading-snug' style={{ color: 'rgba(243,233,218,0.75)' }}>
              Resale tickets cost exactly {euro(tier.price)} plus the same fee. Finish this order first, then join the
              Saturday resale list from your wallet.
            </p>
          ) : null}
        </div>
      ) : (
        <div className='mt-3 flex items-center justify-between'>
          <span className='text-[12.5px] font-medium opacity-70'>{count > 0 ? `${count} in this order` : 'How many?'}</span>
          <Stepper label={tier.name} value={count} canAdd={canAdd} onChange={onChange} />
        </div>
      )}
    </li>
  );
}

export type PickerProps = {
  initial?: Partial<Counts>;
  initialSplit?: boolean;
  /** Highlight one tier, used by the drop-day film. */
  pressed?: Tier['id'];
};

/** The ticket picker visitors see when the fair queue lets them in. */
export function TicketPicker({ initial, initialSplit = false, pressed }: PickerProps) {
  const [counts, setCounts] = useState<Counts>({ weekend: 0, fri: 0, sat: 0, sun: 0, ...initial });
  const [camping, setCamping] = useState(false);
  const [locker, setLocker] = useState(false);
  const [split, setSplit] = useState(initialSplit);
  const [reserved, setReserved] = useState(false);
  const [seconds, setSeconds] = useState(600);
  const liveId = useId();

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => (s <= 1 ? 600 : s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const tickets = Object.values(counts).reduce((a, b) => a + b, 0);
  const subtotal = TIERS.reduce((sum, t) => sum + counts[t.id] * t.price, 0);
  const total = subtotal + tickets * FEE + (camping ? tickets * CAMPING : 0) + (locker && tickets > 0 ? LOCKER : 0);
  const share = tickets > 0 ? total / tickets : 0;
  const held = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  if (reserved) {
    return (
      <Screen bg={G.night} color={G.sand}>
        <PhoneStatusBar tone='light' />
        <div className='flex flex-1 flex-col px-6 pb-8 pt-6'>
          <Wordmark size={18} />
          <div className='mt-auto'>
            <span
              className='flex size-16 items-center justify-center rounded-full text-[30px] font-bold'
              style={{ background: G.coral, color: G.ink }}
              aria-hidden='true'
            >
              ✓
            </span>
            <p className='mt-6' style={{ ...display, fontSize: 52 }}>
              {tickets} {tickets === 1 ? 'ticket' : 'tickets'} held
            </p>
            <p className='mt-3 text-[15px] leading-relaxed' style={{ color: 'rgba(243,233,218,0.75)' }}>
              {split
                ? `You pay ${euro(share)} now. Your ${tickets - 1 === 1 ? 'friend gets' : `${tickets - 1} friends get`} a link to pay their own share within 24 hours.`
                : `Pay ${euro(total)} with iDEAL within ${held}. After that the tickets go back to the queue.`}
            </p>
            <div className='mt-6 space-y-2 rounded-[18px] p-4 text-[14px]' style={{ background: 'rgba(243,233,218,0.08)' }}>
              {TIERS.filter((t) => counts[t.id] > 0).map((t) => (
                <p key={t.id} className='flex justify-between'>
                  <span>
                    {counts[t.id]} × {t.name}
                  </span>
                  <span className='tabular-nums'>{euro(counts[t.id] * t.price)}</span>
                </p>
              ))}
              {camping ? (
                <p className='flex justify-between'>
                  <span>
                    {tickets} × Camping spot
                  </span>
                  <span className='tabular-nums'>{euro(tickets * CAMPING)}</span>
                </p>
              ) : null}
              {locker ? (
                <p className='flex justify-between'>
                  <span>Locker at Gate B</span>
                  <span className='tabular-nums'>{euro(LOCKER)}</span>
                </p>
              ) : null}
              <p className='flex justify-between' style={{ color: 'rgba(243,233,218,0.7)' }}>
                <span>Service fees</span>
                <span className='tabular-nums'>{euro(tickets * FEE)}</span>
              </p>
              <p className='flex justify-between border-t pt-2 font-semibold' style={{ borderColor: 'rgba(243,233,218,0.16)' }}>
                <span>Total</span>
                <span className='tabular-nums'>{euro(total)}</span>
              </p>
            </div>
            <button
              type='button'
              onClick={() => setReserved(false)}
              className={`mt-5 h-12 w-full rounded-full text-[15px] font-semibold ${ring}`}
              style={{ background: 'rgba(243,233,218,0.12)', color: G.sand }}
            >
              Change order
            </button>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen bg={G.night} color={G.sand}>
      <PhoneStatusBar tone='light' />
      <div className='flex items-center justify-between px-5 pb-3 pt-1'>
        <Wordmark size={18} />
        <span
          className='flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold'
          style={{ background: 'rgba(255,106,77,0.16)', color: G.coral, fontFamily: mono }}
        >
          <span className='size-1.5 rounded-full' style={{ background: G.coral }} aria-hidden='true' />
          <span aria-hidden='true'>Held {held}</span>
          <span className='sr-only'>Your spot is held for {held}</span>
        </span>
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[150px]'>
        <h2 className='px-1 pt-2' style={{ ...display, fontSize: 50 }}>
          Pick your days
        </h2>
        <p className='mt-2 px-1 text-[13px] leading-snug' style={{ color: 'rgba(243,233,218,0.7)' }}>
          27–29 June 2025 · Maashaven pier · up to {MAX_TICKETS} tickets per order
        </p>

        <ul className='mt-4 space-y-2.5'>
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              count={counts[tier.id]}
              canAdd={tickets < MAX_TICKETS}
              onChange={(n) => setCounts((c) => ({ ...c, [tier.id]: n }))}
            />
          ))}
        </ul>
        {tickets >= MAX_TICKETS ? (
          <p className='mt-2 px-1 text-[12.5px]' style={{ color: G.coral }}>
            That’s the maximum of {MAX_TICKETS}. It keeps bulk buyers out.
          </p>
        ) : null}

        <p className='mb-2 mt-6 px-1 text-[11px] font-semibold uppercase tracking-[0.08em]' style={{ fontFamily: mono, color: G.lilac }}>
          Extras
        </p>
        <div className='space-y-2'>
          <Switch
            checked={camping}
            onChange={setCamping}
            label='Camping spot, Heijplaat field'
            detail={`${euro(CAMPING)} per person · Thu 18:00 to Mon 12:00`}
          />
          <Switch checked={locker} onChange={setLocker} label='Locker at Gate B' detail={`${euro(LOCKER)} per order · fits two backpacks`} />
        </div>

        <p className='mb-2 mt-6 px-1 text-[11px] font-semibold uppercase tracking-[0.08em]' style={{ fontFamily: mono, color: G.lilac }}>
          Paying for a group?
        </p>
        <Switch
          checked={split}
          onChange={setSplit}
          label='Split with friends'
          detail='Everyone pays their own share within 24 hours. Unpaid tickets go back into the queue.'
        />
        {split ? (
          <ul className='mt-2 space-y-1.5 rounded-[16px] p-3' style={{ background: 'rgba(243,233,218,0.06)' }}>
            {Array.from({ length: Math.max(tickets, 1) }, (_, i) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: seats in a group order
                key={i}
                className='flex items-center gap-3 rounded-[12px] px-2 py-1.5 text-[14px]'
              >
                <span
                  className='flex size-8 items-center justify-center rounded-full text-[12px] font-bold'
                  style={i === 0 ? { background: G.coral, color: G.ink } : { border: '1.5px dashed rgba(243,233,218,0.4)', color: G.sand }}
                  aria-hidden='true'
                >
                  {i === 0 ? 'LB' : '+'}
                </span>
                <span className='flex-1'>{i === 0 ? 'You (Lotte)' : `Invite friend ${i}`}</span>
                <span className='tabular-nums' style={{ color: 'rgba(243,233,218,0.8)' }}>
                  {tickets > 0 ? euro(share) : '—'}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div
        className='absolute inset-x-0 bottom-0 border-t px-5 pb-7 pt-3.5'
        style={{ background: G.deep, borderColor: 'rgba(243,233,218,0.12)' }}
      >
        <div className='flex items-end justify-between gap-3'>
          <div>
            <p className='text-[12px]' style={{ color: 'rgba(243,233,218,0.65)' }}>
              {tickets === 0 ? 'No tickets yet' : `${tickets} ${tickets === 1 ? 'ticket' : 'tickets'} · fees included`}
            </p>
            <p className='mt-0.5 tabular-nums' style={{ ...display, fontSize: 36 }}>
              {euro(split && tickets > 1 ? share : total)}
              {split && tickets > 1 ? (
                <span className='ml-1.5 align-middle text-[13px] font-semibold normal-case' style={{ fontStretch: '100%', color: G.lilac }}>
                  your share
                </span>
              ) : null}
            </p>
          </div>
          <button
            type='button'
            disabled={tickets === 0}
            onClick={() => setReserved(true)}
            className={`h-[52px] rounded-full px-6 text-[16px] font-bold transition-opacity disabled:opacity-35 ${ring}`}
            style={{
              background: G.coral,
              color: G.ink,
              boxShadow: pressed ? `0 0 0 6px rgba(255,106,77,0.3)` : undefined
            }}
          >
            Check out
          </button>
        </div>
        <p id={liveId} className='sr-only' aria-live='polite'>
          {tickets === 0 ? 'No tickets selected' : `${tickets} tickets, total ${euro(total)}`}
          {split && tickets > 1 ? `, your share ${euro(share)}` : ''}
        </p>
      </div>
    </Screen>
  );
}
