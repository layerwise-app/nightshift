import type { ReactNode } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { Brush, Floss, G, GaafWordmark, LIDS, LetterboxBox, Pill, Pouch, SlotGauge, TinSide, TinTop, gaafRoot } from './brand';

/* ------------------------------------------------------------------ desktop */

function SiteNav({ active }: { active?: string }) {
  const links = ['Shop', 'How tablets work', 'Refills', 'For hygienists', 'Journal'];
  return (
    <div className='flex h-[72px] items-center justify-between px-12' style={{ borderBottom: `1px solid ${G.line}` }}>
      <GaafWordmark size={30} />
      <nav className='flex gap-8 text-[15px] font-medium'>
        {links.map((l) => (
          <span key={l} style={{ color: l === active ? G.cobalt : G.ink, borderBottom: l === active ? `2px solid ${G.cobalt}` : undefined, paddingBottom: 2 }}>
            {l}
          </span>
        ))}
      </nav>
      <div className='flex items-center gap-3 text-[14px] font-medium'>
        <span style={{ color: G.ink2 }}>NL · EN</span>
        <span className='rounded-full px-4 py-2' style={{ boxShadow: `inset 0 0 0 1.5px ${G.ink}` }}>
          Log in
        </span>
        <span className='flex items-center gap-2 rounded-full px-4 py-2 font-semibold' style={{ background: G.cobalt, color: G.paper }}>
          Basket <span className='flex size-5 items-center justify-center rounded-full text-[11px]' style={{ background: G.tomato }}>2</span>
        </span>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className='h-full w-full overflow-hidden' style={{ ...gaafRoot, background: G.paper }}>
      <div className='flex h-[34px] items-center justify-center gap-8 text-[13px] font-medium' style={{ background: G.ink, color: G.paper }}>
        <span>Free letterbox delivery in NL and BE</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span>Skip or pause any refill, any time</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span>Fluoride 1450 ppm, made in Ghent</span>
      </div>
      <SiteNav />
      <div className='grid grid-cols-[1.05fr_1fr] gap-6 px-12 pt-14'>
        <div>
          <Pill bg={G.mint}>New: Junior apple, 1000 ppm</Pill>
          <h1 className='mt-6 text-[88px] font-extrabold leading-[0.9] tracking-[-0.055em]'>
            Toothpaste that turns up <span style={{ color: G.cobalt }}>before you run out.</span>
          </h1>
          <p className='mt-7 max-w-[30em] text-[19px] leading-[1.45]' style={{ color: G.ink2 }}>
            Tablets in a tin you keep. Refills sized to your household arrive through the letterbox every few weeks, in a parcel without a gram of plastic.
          </p>
          <div className='mt-8 flex gap-3'>
            <span className='rounded-full px-7 py-4 text-[17px] font-bold' style={{ background: G.tomato, color: '#fff' }}>
              Find your rhythm
            </span>
            <span className='rounded-full px-7 py-4 text-[17px] font-semibold' style={{ boxShadow: `inset 0 0 0 1.5px ${G.ink}` }}>
              How tablets work
            </span>
          </div>
          <div className='mt-10 flex items-center gap-4 text-[14px]' style={{ color: G.ink2 }}>
            <span className='flex'>
              {[G.cobalt, G.tomato, G.mintDeep, '#FFC93C'].map((c, i) => (
                <span key={c} className='size-8 rounded-full ring-[3px] ring-[#FBF8F2]' style={{ background: c, marginLeft: i ? -8 : 0 }} />
              ))}
            </span>
            <span>
              <b style={{ color: G.ink }}>4.180 households</b> on a rhythm since March
            </span>
          </div>
        </div>
        <div className='relative h-[560px] rounded-[36px]' style={{ background: G.cobalt }}>
          <div className='absolute left-[46px] top-[48px] h-[38px] w-[260px] rounded-full' style={{ background: G.cobaltDeep }} />
          <p className='absolute left-[64px] top-[56px] text-[13px] font-semibold uppercase tracking-[0.12em]' style={{ color: G.mint }}>
            3,0 cm · fits your letterbox
          </p>
          <div className='absolute left-[40px] top-[150px] rotate-[-8deg]'>
            <Pouch width={170} />
          </div>
          <div className='absolute left-[180px] top-[200px] rotate-[6deg]'>
            <Pouch width={170} tone='#FFFFFF' flavour='Junior apple' />
          </div>
          <div className='absolute bottom-[48px] right-[42px]'>
            <TinTop size={230} lid={G.tomato} />
          </div>
          <div className='absolute right-[70px] top-[52px] rotate-[18deg]'>
            <Brush height={300} handle={G.mint} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductPage() {
  const sizes = [
    { name: 'Starter: tin + 62 tablets', note: 'One month for one person', price: '€9,50', active: false },
    { name: 'Refill pouch, 62 tablets', note: 'Compostable, 0,8 cm flat', price: '€4,65', active: true },
    { name: 'Double refill, 124 tablets', note: 'For two, or two months', price: '€8,95', active: false }
  ];
  return (
    <div className='h-full w-full overflow-hidden' style={{ ...gaafRoot, background: G.paper }}>
      <SiteNav active='Shop' />
      <div className='px-12 pt-4 text-[13px]' style={{ color: G.ink2 }}>
        Shop / Tablets / <span style={{ color: G.ink }}>Fresh mint</span>
      </div>
      <div className='grid grid-cols-[1fr_1fr] gap-12 px-12 pt-4'>
        <div className='relative h-[560px] overflow-hidden rounded-[32px]' style={{ background: G.mint }}>
          <div className='absolute left-1/2 top-[64px] -translate-x-1/2'>
            <TinTop size={330} lid={G.cobalt} />
          </div>
          <div className='absolute bottom-[34px] left-[48px] flex items-end gap-5'>
            <TinSide width={190} lid={G.cobalt} />
            <TinSide width={150} lid={G.tomato} />
          </div>
          <div className='absolute bottom-[40px] right-[44px] rotate-[8deg]'>
            <Pouch width={120} tone={G.paper} />
          </div>
          <div className='absolute left-6 top-6 flex gap-2'>
            {['Tin', 'Pouch', 'Tablet', 'In the slot'].map((t, i) => (
              <span key={t} className='rounded-full px-3 py-1.5 text-[12px] font-semibold' style={{ background: i === 0 ? G.ink : 'rgba(255,255,255,0.7)', color: i === 0 ? G.paper : G.ink }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className='flex items-center gap-3 text-[14px]' style={{ color: G.ink2 }}>
            <span style={{ color: G.cobalt }}>★★★★★</span>
            4,7 from 1.212 reviews
          </div>
          <h1 className='mt-2 text-[46px] font-extrabold leading-[0.95] tracking-[-0.05em]'>Toothpaste tablets, fresh mint</h1>
          <p className='mt-3 max-w-[34em] text-[15px] leading-[1.45]' style={{ color: G.ink2 }}>
            Bite one, brush as usual, rinse. 1450 ppm fluoride and xylitol. One tablet is one brush.
          </p>
          <p className='mt-4 text-[13px] font-semibold uppercase tracking-[0.08em]' style={{ color: G.ink2 }}>
            Flavour
          </p>
          <div className='mt-2 flex gap-2'>
            {[
              { n: 'Fresh mint', c: G.mintDeep, a: true },
              { n: 'Wild mint', c: '#3E9C6E', a: false },
              { n: 'Junior apple', c: '#FFC93C', a: false }
            ].map((f) => (
              <span key={f.n} className='flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-[14px] font-semibold' style={{ boxShadow: `inset 0 0 0 ${f.a ? 2 : 1}px ${f.a ? G.cobalt : G.line}`, background: '#fff' }}>
                <span className='size-5 rounded-full' style={{ background: f.c }} /> {f.n}
              </span>
            ))}
          </div>
          <p className='mt-4 text-[13px] font-semibold uppercase tracking-[0.08em]' style={{ color: G.ink2 }}>
            Size
          </p>
          <div className='mt-2 space-y-2'>
            {sizes.map((s) => (
              <div key={s.name} className='flex items-center justify-between rounded-[16px] bg-white px-4 py-2.5' style={{ boxShadow: `inset 0 0 0 ${s.active ? 2 : 1}px ${s.active ? G.cobalt : G.line}` }}>
                <span className='flex items-center gap-3'>
                  <span className='flex size-5 items-center justify-center rounded-full' style={{ boxShadow: `inset 0 0 0 2px ${s.active ? G.cobalt : G.line}` }}>
                    {s.active ? <span className='size-2.5 rounded-full' style={{ background: G.cobalt }} /> : null}
                  </span>
                  <span>
                    <span className='block text-[15px] font-semibold'>{s.name}</span>
                    <span className='block text-[13px]' style={{ color: G.ink2 }}>{s.note}</span>
                  </span>
                </span>
                <span className='text-[16px] font-bold tabular-nums'>{s.price}</span>
              </div>
            ))}
          </div>
          <div className='mt-3 flex items-center justify-between rounded-[16px] px-4 py-2.5' style={{ background: G.cobalt, color: G.paper }}>
            <span>
              <span className='block text-[15px] font-semibold'>On your rhythm: every 6 weeks</span>
              <span className='block text-[13px] opacity-80'>Sized from your household · 10% off · skip any time</span>
            </span>
            <span className='h-[26px] w-[44px] rounded-full p-[3px]' style={{ background: G.mint }}>
              <span className='block size-5 translate-x-[18px] rounded-full' style={{ background: G.cobalt }} />
            </span>
          </div>
          <div className='mt-3 flex items-center gap-3'>
            <span className='flex-1 rounded-full py-3.5 text-center text-[17px] font-bold' style={{ background: G.tomato, color: '#fff' }}>
              Add to rhythm · €4,19
            </span>
            <span className='rounded-full px-4 py-3 text-[13px] font-semibold' style={{ background: G.sand }}>
              0,8 cm in the slot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- phone */

function NavIcon({ name }: { name: 'Home' | 'Deliveries' | 'Household' | 'Account' }) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'Home') return <svg {...common} aria-hidden='true'><path d='M4 11 12 4l8 7v8.5a.5.5 0 0 1-.5.5H15v-6H9v6H4.5a.5.5 0 0 1-.5-.5Z' /></svg>;
  if (name === 'Deliveries') return <svg {...common} aria-hidden='true'><path d='M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5Z' /><path d='M3.5 8.5 12 13l8.5-4.5M12 13v7' /></svg>;
  if (name === 'Household') return <svg {...common} aria-hidden='true'><circle cx='8' cy='12' r='4.5' /><circle cx='16.5' cy='12' r='3.5' /></svg>;
  return <svg {...common} aria-hidden='true'><circle cx='12' cy='8.5' r='3.8' /><path d='M4.5 20c1.2-3.7 4-5.5 7.5-5.5s6.3 1.8 7.5 5.5' /></svg>;
}

function PhoneShell({ children, bg = G.paper, nav = 'Deliveries' }: { children: ReactNode; bg?: string; nav?: string | null }) {
  return (
    <div className='relative flex h-full flex-col' style={{ ...gaafRoot, background: bg }}>
      <PhoneStatusBar tone='dark' time='07:46' />
      <div className='min-h-0 flex-1 overflow-hidden'>{children}</div>
      {nav ? (
        <div className='flex h-[78px] items-start justify-around border-t pt-2.5 text-[11px] font-semibold' style={{ borderColor: G.line, background: '#fff' }}>
          {(['Home', 'Deliveries', 'Household', 'Account'] as const).map((t) => (
            <span key={t} className='flex flex-col items-center gap-1' style={{ color: t === nav ? G.cobalt : G.ink2 }}>
              <NavIcon name={t} />
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DashboardScreen() {
  const upcoming = [
    { date: 'Thu 4 Jun', note: '2 pouches, 1 floss', state: 'Planned' },
    { date: 'Thu 16 Jul', note: 'Skipped: on holiday in Zeeland', state: 'Skipped' },
    { date: 'Thu 27 Aug', note: '2 pouches, 3 brush heads', state: 'Planned' }
  ];
  return (
    <PhoneShell>
      <div className='px-5 pt-2'>
        <div className='flex items-center justify-between'>
          <GaafWordmark size={22} />
          <span className='flex size-9 items-center justify-center rounded-full text-[14px] font-bold' style={{ background: G.mint }}>
            MK
          </span>
        </div>
        <p className='mt-5 text-[15px]' style={{ color: G.ink2 }}>
          Morning, Mirjam
        </p>
        <h2 className='text-[30px] font-extrabold leading-[1] tracking-[-0.045em]'>Next parcel in 9 days</h2>

        <div className='mt-4 rounded-[24px] p-4' style={{ background: G.cobalt, color: G.paper }}>
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-[12px] font-semibold uppercase tracking-[0.08em] opacity-75'>Thursday</p>
              <p className='text-[34px] font-extrabold leading-none tracking-[-0.04em]'>23 April</p>
            </div>
            <Pill bg={G.mint}>Every 6 weeks</Pill>
          </div>
          <ul className='mt-4 space-y-1.5 text-[14px]'>
            <li className='flex justify-between'><span>2 × refill pouch, fresh mint</span><span className='opacity-80'>€9,30</span></li>
            <li className='flex justify-between'><span>1 × refill pouch, junior apple</span><span className='opacity-80'>€4,65</span></li>
            <li className='flex justify-between'><span>3 × brush head</span><span className='opacity-80'>€10,50</span></li>
          </ul>
          <div className='mt-3 rounded-[14px] px-3 py-2.5' style={{ background: G.paper, color: G.ink }}>
            <SlotGauge cm={3.0} compact />
          </div>
          <div className='mt-3 grid grid-cols-3 gap-2 text-[14px] font-semibold'>
            {['Skip', 'Move date', 'Edit'].map((a, i) => (
              <span key={a} className='rounded-full py-2.5 text-center' style={{ background: i === 0 ? G.tomato : 'rgba(251,248,242,0.16)', color: '#fff' }}>
                {a}
              </span>
            ))}
          </div>
        </div>

        <p className='mt-5 text-[13px] font-semibold uppercase tracking-[0.06em]' style={{ color: G.ink2 }}>
          After that
        </p>
        <ul className='mt-2 divide-y rounded-[20px] bg-white' style={{ boxShadow: `inset 0 0 0 1px ${G.line}`, borderColor: G.line }}>
          {upcoming.map((u) => (
            <li key={u.date} className='flex items-center justify-between px-4 py-3' style={{ borderColor: G.line }}>
              <span>
                <span className='block text-[15px] font-semibold' style={{ textDecoration: u.state === 'Skipped' ? 'line-through' : undefined, color: u.state === 'Skipped' ? G.ink2 : G.ink }}>
                  {u.date}
                </span>
                <span className='block text-[12.5px]' style={{ color: G.ink2 }}>{u.note}</span>
              </span>
              <span className='rounded-full px-2.5 py-1 text-[11.5px] font-semibold' style={u.state === 'Skipped' ? { background: '#FFE3DB', color: '#B8341A' } : { background: G.mint, color: G.ink }}>
                {u.state}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PhoneShell>
  );
}

export function PauseScreen() {
  const options = [
    { t: 'Skip one parcel', n: 'Next one moves to 4 June', a: false },
    { t: 'Pause for 6 weeks', n: 'Back on Thursday 4 June', a: true },
    { t: 'Pause until I restart', n: 'We’ll check in after 3 months', a: false }
  ];
  return (
    <div className='relative h-full' style={gaafRoot}>
      <DashboardScreen />
      <div className='absolute inset-0' style={{ background: 'rgba(15,26,61,0.5)' }} />
      <div className='absolute inset-0'>
        <div className='absolute inset-x-0 bottom-0 rounded-t-[28px] px-5 pb-8 pt-3' style={{ background: G.paper }}>
          <div className='mx-auto h-[5px] w-10 rounded-full' style={{ background: G.line }} />
          <h3 className='mt-4 text-[26px] font-extrabold leading-[1.02] tracking-[-0.04em]'>Going away, or still stocked up?</h3>
          <p className='mt-2 text-[14px] leading-snug' style={{ color: G.ink2 }}>
            You have about <b style={{ color: G.ink }}>38 tablets</b> left: 6 days for three people at twice a day.
          </p>
          <div className='mt-4 space-y-2'>
            {options.map((o) => (
              <div key={o.t} className='flex items-center gap-3 rounded-[16px] bg-white px-4 py-3' style={{ boxShadow: `inset 0 0 0 ${o.a ? 2 : 1}px ${o.a ? G.cobalt : G.line}` }}>
                <span className='flex size-5 items-center justify-center rounded-full' style={{ boxShadow: `inset 0 0 0 2px ${o.a ? G.cobalt : G.line}` }}>
                  {o.a ? <span className='size-2.5 rounded-full' style={{ background: G.cobalt }} /> : null}
                </span>
                <span>
                  <span className='block text-[15px] font-semibold'>{o.t}</span>
                  <span className='block text-[12.5px]' style={{ color: G.ink2 }}>{o.n}</span>
                </span>
              </div>
            ))}
          </div>
          <div className='mt-4 rounded-[16px] px-4 py-3 text-[13px] leading-snug' style={{ background: G.mint }}>
            Pausing keeps your rhythm and your lid colours. Nothing to cancel, nothing to set up again.
          </div>
          <span className='mt-4 flex h-12 items-center justify-center rounded-full text-[16px] font-bold' style={{ background: G.cobalt, color: G.paper }}>
            Pause until 4 June
          </span>
          <span className='mt-2 block text-center text-[14px] font-semibold' style={{ color: G.ink2 }}>
            Keep my 23 April parcel
          </span>
        </div>
      </div>
    </div>
  );
}

export function QuizHousehold() {
  return (
    <PhoneShell nav={null} bg={G.paper}>
      <div className='flex h-full flex-col px-5 pt-2'>
        <div className='flex items-center justify-between text-[13px] font-semibold' style={{ color: G.ink2 }}>
          <span>← Back</span>
          <span>1 of 3</span>
        </div>
        <div className='mt-3 h-[4px] rounded-full' style={{ background: G.sand }}>
          <div className='h-full w-1/3 rounded-full' style={{ background: G.cobalt }} />
        </div>
        <h2 className='mt-7 text-[34px] font-extrabold leading-[0.98] tracking-[-0.05em]'>Whose tin is whose?</h2>
        <p className='mt-2 text-[14px] leading-snug' style={{ color: G.ink2 }}>
          Every person gets a tin with their own lid colour, so the kids stop borrowing yours.
        </p>
        <ul className='mt-5 space-y-2.5'>
          {[
            { n: 'Mirjam', k: 'Adult · fresh mint', lid: LIDS[0].hex },
            { n: 'Bas', k: 'Adult · wild mint', lid: LIDS[1].hex },
            { n: 'Fien, 7', k: 'Junior apple', lid: LIDS[3].hex }
          ].map((p) => (
            <li key={p.n} className='flex items-center gap-3 rounded-[18px] bg-white px-3 py-2.5' style={{ boxShadow: `inset 0 0 0 1px ${G.line}` }}>
              <TinTop size={46} lid={p.lid} />
              <span className='flex-1'>
                <span className='block text-[16px] font-semibold'>{p.n}</span>
                <span className='block text-[12.5px]' style={{ color: G.ink2 }}>{p.k}</span>
              </span>
              <span className='text-[13px] font-semibold' style={{ color: G.cobalt }}>Change</span>
            </li>
          ))}
          <li className='flex items-center justify-center rounded-[18px] py-3.5 text-[15px] font-semibold' style={{ boxShadow: `inset 0 0 0 1.5px ${G.cobalt}`, color: G.cobalt }}>
            + Add someone
          </li>
        </ul>
        <div className='mt-auto pb-8'>
          <p className='mb-3 text-[12.5px]' style={{ color: G.ink2 }}>Lid colours: {LIDS.map((l) => l.name).join(', ')}.</p>
          <span className='flex h-12 items-center justify-center rounded-full text-[16px] font-bold' style={{ background: G.cobalt, color: G.paper }}>
            Next: how often you brush
          </span>
        </div>
      </div>
    </PhoneShell>
  );
}

export function QuizNeeds() {
  const opts = [
    { t: 'Sensitive teeth', n: 'We add our 5% potassium nitrate tablet', a: true },
    { t: 'Braces or a retainer', n: 'Adds interdental brushes every 6 weeks', a: false },
    { t: 'Bleeding gums', n: 'We’ll suggest seeing a hygienist first', a: false },
    { t: 'None of these', n: '', a: false }
  ];
  return (
    <PhoneShell nav={null} bg={G.mint}>
      <div className='flex h-full flex-col px-5 pt-2'>
        <div className='flex items-center justify-between text-[13px] font-semibold' style={{ color: G.ink }}>
          <span>← Back</span>
          <span>3 of 3</span>
        </div>
        <div className='mt-3 h-[4px] rounded-full' style={{ background: 'rgba(15,26,61,0.12)' }}>
          <div className='h-full w-full rounded-full' style={{ background: G.cobalt }} />
        </div>
        <h2 className='mt-7 text-[34px] font-extrabold leading-[0.98] tracking-[-0.05em]'>Anything your mouth wants us to know?</h2>
        <ul className='mt-5 space-y-2'>
          {opts.map((o) => (
            <li key={o.t} className='flex items-center gap-3 rounded-[16px] bg-white px-4 py-3' style={{ boxShadow: `inset 0 0 0 ${o.a ? 2 : 0}px ${G.cobalt}` }}>
              <span className='flex size-[22px] items-center justify-center rounded-[7px] text-[13px] font-bold' style={o.a ? { background: G.cobalt, color: G.paper } : { boxShadow: `inset 0 0 0 1.6px ${G.ink2}` }}>
                {o.a ? '✓' : ''}
              </span>
              <span>
                <span className='block text-[15px] font-semibold'>{o.t}</span>
                {o.n ? <span className='block text-[12.5px]' style={{ color: G.ink2 }}>{o.n}</span> : null}
              </span>
            </li>
          ))}
        </ul>
        <div className='mt-4 flex gap-3 rounded-[18px] p-3.5' style={{ background: G.paper }}>
          <span className='flex size-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold' style={{ background: G.tomato, color: '#fff' }}>
            LB
          </span>
          <p className='text-[13px] leading-snug'>
            <b>Loes, our hygienist:</b> “Tablets have the same fluoride as a tube. Bite, wait for the foam, then brush for two minutes.”
          </p>
        </div>
        <div className='mt-auto pb-8'>
          <span className='flex h-12 items-center justify-center rounded-full text-[16px] font-bold' style={{ background: G.tomato, color: '#fff' }}>
            Show my rhythm
          </span>
        </div>
      </div>
    </PhoneShell>
  );
}

export { Brush, Floss, LetterboxBox, Pouch, TinSide, TinTop };
