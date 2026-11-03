import { PhoneStatusBar } from '~/components/frames/frames';
import { display, euro, font, G, LINEUP, mono, Screen, TicketCode, TIERS, WaveBand, WaveMark, Wordmark } from './brand';

const sandSoft = 'rgba(243,233,218,0.7)';
const sandFaint = 'rgba(243,233,218,0.12)';
const inkSoft = 'rgba(11,12,46,0.62)';
const inkFaint = 'rgba(11,12,46,0.1)';

function MonoLabel({ children, color }: { children: string; color?: string }) {
  return (
    <p className='text-[11px] font-semibold uppercase tracking-[0.08em]' style={{ fontFamily: mono, color }}>
      {children}
    </p>
  );
}

// ------------------------------------------------------------------ queue

export function QueueScreen({ ahead = 4218, progress = 0.08 }: { ahead?: number; progress?: number }) {
  return (
    <Screen bg={G.night} color={G.sand}>
      <PhoneStatusBar tone='light' time='10:00' />
      <div className='flex items-center justify-between px-5 pt-1'>
        <Wordmark size={18} />
        <span className='text-[12px]' style={{ fontFamily: mono, color: sandSoft }}>
          Drop · Tue 4 Mar
        </span>
      </div>
      <div className='flex flex-1 flex-col px-5 pt-10'>
        <MonoLabel color={G.lilac}>You’re in the queue</MonoLabel>
        <p className='mt-3 tabular-nums' style={{ ...display, fontSize: 132, color: G.coral, lineHeight: 0.8 }}>
          {ahead.toLocaleString('en-GB')}
        </p>
        <p className='mt-3 text-[20px] font-semibold'>{ahead === 0 ? 'You’re next' : 'people ahead of you'}</p>

        <div className='mt-8'>
          <div className='relative h-[10px] rounded-full' style={{ background: sandFaint }}>
            <div className='absolute inset-y-0 left-0 rounded-full' style={{ width: `${Math.max(4, progress * 100)}%`, background: G.coral }} />
            <span
              className='absolute top-1/2 size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px]'
              style={{ left: `${Math.max(4, progress * 100)}%`, background: G.sand, borderColor: G.coral }}
            />
          </div>
          <div className='mt-2.5 flex justify-between text-[12px]' style={{ fontFamily: mono, color: sandSoft }}>
            <span>Joined 10:00:03</span>
            <span>Your turn ≈ 10:06</span>
          </div>
        </div>

        <div className='mt-7 grid grid-cols-3 gap-2'>
          {[
            ['Wait', ahead === 0 ? 'now' : `${Math.max(1, Math.round(ahead / 700))} min`],
            ['Let in', '860/min'],
            ['Left', '41,260']
          ].map(([k, v]) => (
            <div key={k} className='rounded-[14px] px-3 py-3' style={{ background: sandFaint }}>
              <p className='text-[11px]' style={{ fontFamily: mono, color: sandSoft }}>
                {k}
              </p>
              <p className='mt-1 text-[19px] font-bold tabular-nums'>{v}</p>
            </div>
          ))}
        </div>

        <div className='mt-7 rounded-[18px] p-4' style={{ background: G.sand, color: G.ink }}>
          <p className='text-[15px] font-bold'>Refreshing won’t move you up</p>
          <p className='mt-1.5 text-[13.5px] leading-snug' style={{ color: inkSoft }}>
            Everyone who arrived before 10:00 got a random place. Yours is saved to this phone and to the link in your email.
          </p>
        </div>

        <div className='mt-auto flex items-center gap-3 pb-8 pt-6 text-[13px]' style={{ color: sandSoft }}>
          <WaveMark size={20} color={G.lilac} />
          Keep this page open. We’ll buzz when it’s your turn.
        </div>
      </div>
    </Screen>
  );
}

export function YourTurnScreen() {
  return (
    <Screen bg={G.coral} color={G.ink}>
      <PhoneStatusBar tone='dark' time='10:06' />
      <div className='flex flex-1 flex-col px-6 pb-10 pt-4'>
        <Wordmark size={18} color={G.ink} mark={G.night} />
        <div className='mt-auto'>
          <MonoLabel color={G.night}>10:06:40 · queue done</MonoLabel>
          <p className='mt-4' style={{ ...display, fontSize: 108 }}>
            It’s your turn
          </p>
          <p className='mt-5 text-[17px] font-medium leading-snug'>
            Your spot is held for 10 minutes. Up to four tickets, any mix of days.
          </p>
          <span
            className='mt-8 flex h-[56px] w-full items-center justify-center rounded-full text-[17px] font-bold'
            style={{ background: G.ink, color: G.sand }}
          >
            Pick tickets
          </span>
        </div>
      </div>
    </Screen>
  );
}

// ----------------------------------------------------------------- wallet

export function WalletScreen({ seed = 41, refresh = 18 }: { seed?: number; refresh?: number }) {
  return (
    <Screen bg={G.sand} color={G.ink}>
      <PhoneStatusBar tone='dark' time='13:41' />
      <div className='flex items-center justify-between px-5 pb-3 pt-1'>
        <p style={{ ...display, fontSize: 30 }}>Your tickets</p>
        <span className='rounded-full px-3 py-1 text-[12px] font-semibold' style={{ background: inkFaint }}>
          1 of 2
        </span>
      </div>

      <div className='mx-4 overflow-hidden rounded-[26px]' style={{ background: G.night, color: G.sand }}>
        <div className='flex items-start justify-between px-5 pt-5'>
          <div>
            <Wordmark size={16} />
            <p className='mt-4' style={{ ...display, fontSize: 46 }}>
              Weekend
            </p>
            <p className='mt-1.5 text-[13px]' style={{ color: sandSoft }}>
              Fri 27 – Sun 29 June 2025
            </p>
          </div>
          <span className='mt-1 rounded-full px-2.5 py-1 text-[11px] font-bold' style={{ background: G.coral, color: G.ink }}>
            Gate B
          </span>
        </div>
        <div className='mt-4 flex justify-center px-5'>
          <div className='rounded-[18px] bg-white p-3'>
            <TicketCode seed={seed} size={200} />
          </div>
        </div>
        <div className='mx-5 mt-3 flex items-center gap-2 text-[12px]' style={{ fontFamily: mono, color: sandSoft }}>
          <span className='relative h-[4px] flex-1 overflow-hidden rounded-full' style={{ background: sandFaint }}>
            <span className='absolute inset-y-0 left-0 rounded-full' style={{ width: `${(refresh / 30) * 100}%`, background: G.lilac }} />
          </span>
          New code in {refresh}s
        </div>
        <div className='mt-4 flex border-t text-[13px]' style={{ borderColor: sandFaint }}>
          <div className='flex-1 px-5 py-3.5'>
            <p className='text-[11px]' style={{ color: sandSoft }}>
              Name
            </p>
            <p className='font-semibold'>Lotte Brandsma</p>
          </div>
          <div className='flex-1 border-l px-5 py-3.5' style={{ borderColor: sandFaint }}>
            <p className='text-[11px]' style={{ color: sandSoft }}>
              Ticket
            </p>
            <p className='font-semibold' style={{ fontFamily: mono }}>
              GS25-W-0417
            </p>
          </div>
        </div>
      </div>

      <div className='mx-4 mt-3 flex items-center gap-3 rounded-[16px] px-4 py-3' style={{ background: inkFaint }}>
        <span className='flex size-8 shrink-0 items-center justify-center rounded-full' style={{ background: G.night }} aria-hidden='true'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' stroke={G.lilac} strokeWidth='1.8' strokeLinecap='round' aria-hidden='true'>
            <path d='M2 6a8.5 8.5 0 0 1 12 0M4.5 8.6a5 5 0 0 1 7 0' />
            <path d='M2 2l12 12' stroke={G.coral} />
          </svg>
        </span>
        <p className='text-[13px] leading-snug'>
          <span className='font-bold'>Works without signal.</span> Keys for all three days saved on 26 Jun at 21:14.
        </p>
      </div>

      <div className='mx-4 mt-3 grid grid-cols-2 gap-2 text-[14px] font-semibold'>
        <span className='flex h-12 items-center justify-center rounded-full' style={{ background: G.ink, color: G.sand }}>
          Transfer
        </span>
        <span className='flex h-12 items-center justify-center rounded-full border-2' style={{ borderColor: G.ink }}>
          Sell at face value
        </span>
      </div>

      <nav className='mt-auto flex justify-around border-t px-2 pb-7 pt-3 text-[11px] font-semibold' style={{ borderColor: inkFaint }}>
        {['Tickets', 'Line-up', 'Map', 'Me'].map((t, i) => (
          <span key={t} className='flex flex-col items-center gap-1' style={{ color: i === 0 ? G.coralDeep : inkSoft }}>
            <span className='size-[6px] rounded-full' style={{ background: i === 0 ? G.coralDeep : 'transparent' }} />
            {t}
          </span>
        ))}
      </nav>
    </Screen>
  );
}

// ----------------------------------------------------------------- resale

const LISTINGS = [
  { id: 'GS25-S-2291', listed: 'Listed 09:14' },
  { id: 'GS25-S-0583', listed: 'Listed 09:31' },
  { id: 'GS25-S-7710', listed: 'Listed 10:02' }
];

export function ResaleListScreen() {
  const sat = TIERS.find((t) => t.id === 'sat');
  return (
    <Screen bg={G.sand} color={G.ink}>
      <PhoneStatusBar tone='dark' time='10:04' />
      <div className='px-5 pt-2'>
        <MonoLabel color={G.coralDeep}>Official resale</MonoLabel>
        <p className='mt-2' style={{ ...display, fontSize: 54 }}>
          Saturday 28
        </p>
        <p className='mt-2 text-[14px] leading-snug' style={{ color: inkSoft }}>
          Sold out on drop day. Every ticket here costs face value plus the same €2.50 fee. No bidding, no markup.
        </p>
      </div>
      <ul className='mt-5 space-y-2 px-4'>
        {LISTINGS.map((l, i) => (
          <li key={l.id} className='flex items-center gap-3 rounded-[18px] bg-white px-4 py-3.5'>
            <div className='min-w-0 flex-1'>
              <p className='text-[15px] font-bold'>Saturday day pass</p>
              <p className='mt-0.5 text-[12px]' style={{ fontFamily: mono, color: inkSoft }}>
                {l.listed} · {l.id}
              </p>
            </div>
            <p className='text-right'>
              <span className='block text-[16px] font-bold tabular-nums'>{euro(sat?.price ?? 74.5)}</span>
              <span className='block text-[11px]' style={{ color: inkSoft }}>
                + €2,50
              </span>
            </p>
            <span
              className='flex h-10 items-center rounded-full px-4 text-[14px] font-bold'
              style={i === 0 ? { background: G.coral } : { background: inkFaint }}
            >
              Buy
            </span>
          </li>
        ))}
      </ul>
      <div className='mx-4 mt-4 rounded-[18px] p-4' style={{ background: G.night, color: G.sand }}>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-[15px] font-bold'>Tell me when one is listed</p>
          <span className='relative h-[28px] w-[46px] shrink-0 rounded-full' style={{ background: G.coral }}>
            <span className='absolute left-[21px] top-[3px] size-[22px] rounded-full' style={{ background: G.ink }} />
          </span>
        </div>
        <p className='mt-2 text-[13px] leading-snug' style={{ color: sandSoft }}>
          You’re #312 on the Saturday list. When your turn comes, the ticket is held for you for 15 minutes.
        </p>
      </div>
      <p className='mt-auto px-5 pb-9 text-[12px] leading-snug' style={{ color: inkSoft }}>
        2,904 Saturday tickets changed hands here in 2025, all at face value.
      </p>
    </Screen>
  );
}

export function ResaleSellScreen() {
  return (
    <Screen bg={G.night} color={G.sand}>
      <PhoneStatusBar tone='light' time='20:17' />
      <div className='px-5 pt-2'>
        <p className='text-[14px]' style={{ color: sandSoft }}>
          ← Your tickets
        </p>
        <p className='mt-5' style={{ ...display, fontSize: 54 }}>
          Sell your ticket
        </p>
      </div>
      <div className='mx-4 mt-5 rounded-[20px] p-4' style={{ background: sandFaint }}>
        <p className='text-[12px]' style={{ fontFamily: mono, color: sandSoft }}>
          GS25-S-2291
        </p>
        <p className='mt-1 text-[18px] font-bold'>Saturday day pass</p>
        <p className='text-[13px]' style={{ color: sandSoft }}>
          Sat 28 June 2025 · bought 4 Mar
        </p>
      </div>
      <div className='mx-4 mt-3 rounded-[20px] p-4' style={{ background: G.sand, color: G.ink }}>
        <div className='flex items-baseline justify-between'>
          <p className='text-[14px] font-semibold'>Price</p>
          <p style={{ ...display, fontSize: 40 }}>{euro(74.5)}</p>
        </div>
        <p className='mt-1 text-[13px] leading-snug' style={{ color: inkSoft }}>
          Fixed at what you paid. The buyer pays the €2.50 fee, so you get the full amount.
        </p>
        <div className='mt-3 space-y-1.5 border-t pt-3 text-[13.5px]' style={{ borderColor: inkFaint }}>
          <p className='flex justify-between'>
            <span>Paid out to</span>
            <span className='font-semibold' style={{ fontFamily: mono }}>
              NL91 •••• 0417
            </span>
          </p>
          <p className='flex justify-between'>
            <span>When</span>
            <span className='font-semibold'>Within 2 days of sale</span>
          </p>
        </div>
      </div>
      <p className='mx-5 mt-4 text-[13px] leading-snug' style={{ color: sandSoft }}>
        Your code stops working the moment someone buys it. Until then you can take the listing down.
      </p>
      <div className='mt-auto px-4 pb-9'>
        <span className='flex h-[56px] items-center justify-center rounded-full text-[17px] font-bold' style={{ background: G.coral, color: G.ink }}>
          List for {euro(74.5)}
        </span>
      </div>
    </Screen>
  );
}

export function ResaleSoldScreen() {
  const steps = [
    ['Listed', 'Thu 12 Jun, 20:17'],
    ['Bought by someone on the list', 'Thu 12 Jun, 20:21'],
    ['Paid out to NL91 •••• 0417', 'Fri 13 Jun']
  ];
  return (
    <Screen bg={G.coral} color={G.ink}>
      <PhoneStatusBar tone='dark' time='20:22' />
      <div className='flex flex-1 flex-col px-6 pb-10 pt-6'>
        <Wordmark size={18} color={G.ink} mark={G.night} />
        <p className='mt-14' style={{ ...display, fontSize: 96 }}>
          Sold
        </p>
        <p className='mt-3 text-[18px] font-semibold'>{euro(74.5)} is on its way.</p>
        <ol className='mt-10 space-y-0'>
          {steps.map(([t, d], i) => (
            <li key={t} className='relative flex gap-4 pb-6'>
              <span className='relative flex flex-col items-center'>
                <span className='size-4 rounded-full border-[3px]' style={{ borderColor: G.ink, background: i < 2 ? G.ink : G.coral }} />
                {i < steps.length - 1 ? <span className='mt-1 w-[3px] flex-1' style={{ background: G.ink }} /> : null}
              </span>
              <span className='-mt-1'>
                <span className='block text-[16px] font-bold'>{t}</span>
                <span className='block text-[13px]' style={{ fontFamily: mono }}>
                  {d}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p className='mt-auto text-[13.5px] leading-snug'>The ticket went to #1 on the Saturday list. Nobody paid more than you did.</p>
      </div>
    </Screen>
  );
}

// ---------------------------------------------------------------- landing

export function LandingPage({ width = 1200 }: { width?: number }) {
  return (
    <div className='relative overflow-hidden' style={{ width, background: G.sand, color: G.ink, fontFamily: font }}>
      <div className='flex items-center justify-between px-12 py-6'>
        <Wordmark size={26} color={G.night} />
        <nav className='flex items-center gap-8 text-[15px] font-semibold'>
          {['Line-up', 'Tickets', 'The pier', 'Travel', 'Info'].map((n) => (
            <span key={n}>{n}</span>
          ))}
          <span className='text-[13px]' style={{ fontFamily: mono, color: inkSoft }}>
            NL / EN
          </span>
          <span className='rounded-full px-5 py-2.5 text-[14px] font-bold' style={{ background: G.night, color: G.sand }}>
            Join the queue
          </span>
        </nav>
      </div>

      <section className='grid grid-cols-[1.35fr_1fr] gap-10 px-12 pt-6'>
        <div>
          <p className='text-[13px] font-semibold uppercase tracking-[0.1em]' style={{ fontFamily: mono, color: G.coralDeep }}>
            Maashaven pier · Rotterdam
          </p>
          <h1 className='mt-4' style={{ ...display, fontSize: 212, color: G.night, lineHeight: 0.8 }}>
            Golfslag
          </h1>
          <p className='mt-4' style={{ ...display, fontSize: 64, color: G.coral }}>
            27—29 June 2025
          </p>
          <p className='mt-5 max-w-[460px] text-[18px] leading-snug' style={{ color: inkSoft }}>
            Three days of electronic and indie music on a concrete pier, with the river on three sides and the last ferry at 01:20.
          </p>
        </div>
        <aside className='self-start rounded-[28px] p-7' style={{ background: G.night, color: G.sand }}>
          <MonoLabel color={G.lilac}>Ticket drop</MonoLabel>
          <p className='mt-3' style={{ ...display, fontSize: 60 }}>
            Tue 4 March, 10:00
          </p>
          <div className='mt-5 grid grid-cols-4 gap-2 text-center'>
            {[
              ['06', 'days'],
              ['14', 'hrs'],
              ['22', 'min'],
              ['09', 'sec']
            ].map(([n, u]) => (
              <div key={u} className='rounded-[14px] py-3' style={{ background: sandFaint }}>
                <p className='tabular-nums' style={{ ...display, fontSize: 42 }}>
                  {n}
                </p>
                <p className='mt-1 text-[11px]' style={{ fontFamily: mono, color: sandSoft }}>
                  {u}
                </p>
              </div>
            ))}
          </div>
          <p className='mt-5 text-[15px] leading-snug' style={{ color: sandSoft }}>
            The waiting room opens at 09:30. Everyone inside before 10:00 gets a random place, so there is no need to refresh at
            09:59.
          </p>
          <span className='mt-6 flex h-[54px] items-center justify-center rounded-full text-[16px] font-bold' style={{ background: G.coral, color: G.ink }}>
            Remind me on 4 March
          </span>
        </aside>
      </section>

      <section className='mt-14 grid grid-cols-3 border-t-[3px]' style={{ borderColor: G.night }}>
        {LINEUP.map((d, i) => (
          <div key={d.day} className={`px-12 py-8 ${i > 0 ? 'border-l-[3px]' : ''}`} style={{ borderColor: G.night }}>
            <MonoLabel color={G.coralDeep}>{`${d.day} June`}</MonoLabel>
            <ul className='mt-4 space-y-1'>
              {d.acts.map((a, j) => (
                <li key={a} style={{ ...display, fontSize: j === 0 ? 48 : j < 3 ? 34 : 26, color: j === 0 ? G.night : G.ink }}>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <div className='-mt-2' style={{ background: G.night }}>
        <WaveBand width={width} rows={4} gap={20} amp={8} color={G.coral} />
      </div>
    </div>
  );
}

// -------------------------------------------------------------- dashboard

const PER_MINUTE = [1180, 2360, 2480, 2420, 2310, 2240, 2150, 2080, 1990, 1940, 1880, 1830, 1790, 1760, 1720, 1690, 1640, 1610, 1580, 1540, 1500, 1460, 1430, 1390];

export function Dashboard({ width = 1240 }: { width?: number }) {
  const max = 2600;
  const chartW = 560;
  const chartH = 200;
  const bar = chartW / PER_MINUTE.length;
  const tiers = [
    { name: 'Weekend', sold: 10920, cap: 12000 },
    { name: 'Friday', sold: 9840, cap: 12000 },
    { name: 'Saturday', sold: 12000, cap: 12000 },
    { name: 'Sunday', sold: 7320, cap: 12000 }
  ];
  const panel = { background: '#15174F', borderColor: 'rgba(183,187,255,0.14)' };
  return (
    <div className='flex' style={{ width, height: 800, background: G.deep, color: G.sand, fontFamily: font }}>
      <aside className='flex w-[220px] shrink-0 flex-col border-r px-5 py-6' style={{ borderColor: 'rgba(183,187,255,0.14)' }}>
        <Wordmark size={20} />
        <p className='mt-1 pl-[30px] text-[11px]' style={{ fontFamily: mono, color: G.lilac }}>
          Box office
        </p>
        <nav className='mt-8 space-y-1 text-[14px] font-semibold'>
          {['Live drop', 'Orders', 'Tiers & stock', 'Group orders', 'Resale', 'Gates', 'Settings'].map((n, i) => (
            <p
              key={n}
              className='rounded-[10px] px-3 py-2'
              style={i === 0 ? { background: 'rgba(255,106,77,0.16)', color: G.coral } : { color: sandSoft }}
            >
              {n}
            </p>
          ))}
        </nav>
        <div className='mt-auto rounded-[14px] p-3 text-[12px] leading-snug' style={{ background: sandFaint, color: sandSoft }}>
          <span className='font-semibold' style={{ color: G.sand }}>
            Roos Kalverda
          </span>
          <br />
          Head of ticketing
        </div>
      </aside>

      <div className='flex-1 px-7 py-6'>
        <div className='flex items-end justify-between'>
          <div>
            <p className='text-[12px]' style={{ fontFamily: mono, color: G.lilac }}>
              Drop day · Tue 4 Mar 2025 · 10:23:41
            </p>
            <h1 className='mt-1' style={{ ...display, fontSize: 52 }}>
              Live drop
            </h1>
          </div>
          <span className='flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold' style={{ background: 'rgba(106,227,160,0.14)', color: '#7BE8AE' }}>
            <span className='size-2 rounded-full' style={{ background: '#7BE8AE' }} />
            Queue healthy · 0 errors
          </span>
        </div>

        <div className='mt-5 grid grid-cols-4 gap-3'>
          {[
            ['Tickets sold', '40,080', 'of 48,000 · 84%'],
            ['In the queue', '9,812', 'peak 31,402 at 10:00'],
            ['Median wait', '6m 12s', 'longest 17m 03s'],
            ['Bot sessions held', '18,204', 'never reached checkout']
          ].map(([k, v, s]) => (
            <div key={k} className='rounded-[16px] border p-4' style={panel}>
              <p className='text-[12px]' style={{ color: sandSoft }}>
                {k}
              </p>
              <p className='mt-1 tabular-nums' style={{ ...display, fontSize: 44 }}>
                {v}
              </p>
              <p className='mt-1 text-[11.5px]' style={{ fontFamily: mono, color: G.lilac }}>
                {s}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-3 grid grid-cols-[1.25fr_1fr] gap-3'>
          <div className='rounded-[16px] border p-5' style={panel}>
            <div className='flex items-baseline justify-between'>
              <p className='text-[15px] font-bold'>Tickets per minute</p>
              <p className='text-[11.5px]' style={{ fontFamily: mono, color: sandSoft }}>
                10:00 – 10:23
              </p>
            </div>
            <svg width={chartW} height={chartH + 24} className='mt-4' aria-hidden='true'>
              {[0, 1000, 2000].map((v) => (
                <g key={v}>
                  <line x1={0} x2={chartW} y1={chartH - (v / max) * chartH} y2={chartH - (v / max) * chartH} stroke='rgba(183,187,255,0.14)' />
                  <text x={0} y={chartH - (v / max) * chartH - 4} fill={sandSoft} fontSize='10' fontFamily={mono}>
                    {v.toLocaleString('en-GB')}
                  </text>
                </g>
              ))}
              {PER_MINUTE.map((v, i) => (
                <rect
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed series
                  key={i}
                  x={i * bar + 2}
                  y={chartH - (v / max) * chartH}
                  width={bar - 4}
                  height={(v / max) * chartH}
                  rx={3}
                  fill={i === PER_MINUTE.length - 1 ? G.coral : G.lilac}
                  opacity={i === PER_MINUTE.length - 1 ? 1 : 0.75}
                />
              ))}
              {[0, 6, 12, 18, 23].map((i) => (
                <text
                  key={i}
                  x={i === 23 ? chartW : i * bar + bar / 2}
                  y={chartH + 18}
                  fill={sandSoft}
                  fontSize='10'
                  fontFamily={mono}
                  textAnchor={i === 0 ? 'start' : i === 23 ? 'end' : 'middle'}
                >
                  {`10:${String(i).padStart(2, '0')}`}
                </text>
              ))}
            </svg>
          </div>
          <div className='rounded-[16px] border p-5' style={panel}>
            <p className='text-[15px] font-bold'>Stock by tier</p>
            <ul className='mt-4 space-y-4'>
              {tiers.map((t) => {
                const pct = t.sold / t.cap;
                return (
                  <li key={t.name}>
                    <div className='flex justify-between text-[13.5px]'>
                      <span className='font-semibold'>{t.name}</span>
                      <span className='tabular-nums' style={{ fontFamily: mono, color: pct >= 1 ? G.coral : sandSoft }}>
                        {pct >= 1 ? 'SOLD OUT' : `${t.sold.toLocaleString('en-GB')} / ${t.cap.toLocaleString('en-GB')}`}
                      </span>
                    </div>
                    <div className='mt-1.5 h-[8px] overflow-hidden rounded-full' style={{ background: sandFaint }}>
                      <div className='h-full rounded-full' style={{ width: `${pct * 100}%`, background: pct >= 1 ? G.coral : G.sand }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className='mt-3 grid grid-cols-3 gap-3'>
          {[
            ['Group orders', '2,318', '91% of shares paid within 24 h'],
            ['Released back to queue', '412', 'unpaid shares and expired holds'],
            ['Let in per minute', '860', 'capped to keep checkout under 2 s']
          ].map(([k, v, s]) => (
            <div key={k} className='flex items-center justify-between rounded-[16px] border px-5 py-4' style={panel}>
              <div>
                <p className='text-[13px] font-semibold'>{k}</p>
                <p className='mt-0.5 text-[11.5px]' style={{ fontFamily: mono, color: sandSoft }}>
                  {s}
                </p>
              </div>
              <p className='shrink-0 whitespace-nowrap tabular-nums' style={{ ...display, fontSize: 34 }}>
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
