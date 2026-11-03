import type { ReactNode } from 'react';
import { C, Icon, Pill, Portrait, SANS, serif, Wordmark } from './brand';
import { HandDrawing, ZONES } from './hand';

/** Desktop pages of kliniekdassen.nl, drawn at 1280 CSS px wide. */

function Page({ children, height }: { children: ReactNode; height: number }) {
  return (
    <div className='relative overflow-hidden' style={{ width: 1280, height, background: C.chalk, color: C.ink, fontFamily: SANS }}>
      {children}
    </div>
  );
}

export function SiteHeader({ active }: { active?: string }) {
  const nav = ['Conditions', 'Treatments', 'Waiting times', 'Your operation', 'Team', 'For GPs'];
  return (
    <header className='flex h-[76px] items-center justify-between px-14' style={{ borderBottom: `1px solid ${C.line}` }}>
      <Wordmark size={21} />
      <nav className='flex items-center gap-7 text-[15px] font-medium'>
        {nav.map((n) => (
          <span key={n} style={{ color: n === active ? C.ink : C.inkSoft, borderBottom: n === active ? `2px solid ${C.apricot}` : '2px solid transparent', paddingBottom: 4, paddingTop: 6 }}>
            {n}
          </span>
        ))}
      </nav>
      <span className='flex items-center gap-4'>
        <span className='text-[14px] font-semibold' style={{ color: C.muted }}>NL · <span style={{ color: C.ink }}>EN</span></span>
        <Pill tone='apricot' style={{ height: 42, fontSize: 14 }}>
          <Icon name='upload' size={17} /> Upload a referral
        </Pill>
      </span>
    </header>
  );
}

/** Condition page: carpal tunnel syndrome, with the recovery timeline. */
export function ConditionPage({ height = 760 }: { height?: number }) {
  const timeline = [
    { when: 'Day 0', t: 'The operation', d: 'Local anaesthetic, 15 minutes. You go home the same morning.' },
    { when: 'Days 1–3', t: 'Rest and raise', d: 'Keep the hand up. Paracetamol is usually enough.' },
    { when: 'Day 12', t: 'Stitches out', d: 'At hand therapy, with your first exercises.' },
    { when: 'Weeks 3–6', t: 'Everyday use', d: 'Typing, cooking and cycling again, gently.' },
    { when: 'Weeks 6–12', t: 'Full grip', d: 'Strength comes back slowly. Night tingling often goes first.' }
  ];
  return (
    <Page height={height}>
      <SiteHeader active='Conditions' />
      <div className='grid grid-cols-[1fr_380px] gap-14 px-14 pt-8'>
        <div>
          <p className='text-[14px]' style={{ color: C.muted }}>
            Conditions <span className='mx-1.5'>/</span> Palm and fingers <span className='mx-1.5'>/</span> <span style={{ color: C.ink }}>Carpal tunnel syndrome</span>
          </p>
          <h1 className='mt-5' style={serif(64, 400, { lineHeight: 0.98 })}>Carpal tunnel syndrome</h1>
          <div className='mt-5 flex items-center gap-3 text-[14px]' style={{ color: C.inkSoft }}>
            <Portrait hair='bun' size={34} />
            <span>
              Reviewed by <strong style={{ color: C.ink }}>Dr. Imke Dassen</strong>, hand surgeon · 12 March 2025 · 6 minute read
            </span>
          </div>
          <div className='mt-8 grid grid-cols-2 gap-10'>
            <div>
              <h2 style={serif(24, 480)}>What it is</h2>
              <p className='mt-2.5 text-[16.5px] leading-[1.55]' style={{ color: C.inkSoft }}>
                A nerve in your wrist gets squeezed in a narrow tunnel of bone and ligament. It is common, especially after 50, and during pregnancy.
              </p>
            </div>
            <div>
              <h2 style={serif(24, 480)}>What you might feel</h2>
              <ul className='mt-2.5 space-y-1.5 text-[16px] leading-[1.45]' style={{ color: C.inkSoft }}>
                {['Tingling in thumb, index and middle finger', 'Waking at night, shaking the hand awake', 'Dropping things, a clumsy pinch'].map((x) => (
                  <li key={x} className='flex gap-2.5'>
                    <span className='mt-[9px] size-[6px] shrink-0 rounded-full' style={{ background: C.apricot }} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <aside className='mt-2 rounded-[22px] p-6' style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          <p className='text-[12px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.sageDeep }}>What often helps</p>
          <ol className='mt-3 space-y-3'>
            {[
              { n: '1', t: 'A night splint', d: 'Keeps the wrist straight while you sleep.' },
              { n: '2', t: 'An injection', d: 'Calms the swelling for weeks to months.' },
              { n: '3', t: 'A release operation', d: 'Gives the nerve room. 15 minutes, awake.' }
            ].map((s) => (
              <li key={s.n} className='flex gap-3'>
                <span className='flex size-[28px] shrink-0 items-center justify-center rounded-full text-[14px] font-semibold' style={{ background: C.sageSoft }}>{s.n}</span>
                <span>
                  <span className='block text-[16px] font-semibold'>{s.t}</span>
                  <span className='block text-[14.5px]' style={{ color: C.inkSoft }}>{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className='mt-5 flex items-center gap-2.5 rounded-[14px] p-3.5 text-[14.5px]' style={{ background: C.chalk }}>
            <Icon name='clock' size={18} color={C.sageDeep} />
            First consult: <strong>about 4 weeks</strong>
          </div>
        </aside>
      </div>

      <section className='absolute inset-x-0 bottom-0 px-14 pb-10 pt-7' style={{ background: C.ink, color: C.chalk }}>
        <div className='flex items-baseline justify-between'>
          <h2 style={serif(30, 420, { color: C.chalk })}>Recovery after a release operation, week by week</h2>
          <span className='text-[13.5px]' style={{ color: C.sage }}>Everyone heals at their own pace. These are typical times.</span>
        </div>
        <div className='relative mt-6 grid grid-cols-5 gap-5'>
          <span className='absolute left-[7px] right-0 top-[7px] h-[2px]' style={{ background: 'rgba(185,207,196,0.35)' }} />
          {timeline.map((s, i) => (
            <div key={s.when} className='relative'>
              <span className='relative block size-[16px] rounded-full' style={{ background: i === 0 ? C.apricot : C.sage, boxShadow: `0 0 0 4px ${C.ink}` }} />
              <p className='mt-4 text-[13px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.apricot }}>{s.when}</p>
              <p className='mt-1 text-[17px] font-semibold'>{s.t}</p>
              <p className='mt-1 text-[14.5px] leading-[1.45]' style={{ color: C.sageSoft }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

const MAP_W = 330;
const MAP_H = (MAP_W * 344) / 300;

/** The new home page: plain words, the hand map, the wait time up front. */
export function HomePage({ height = 760 }: { height?: number }) {
  const conditions = ['Carpal tunnel syndrome', 'Trigger finger', 'Thumb base arthritis', 'De Quervain’s tendinitis', 'Wrist ganglion', 'Dupuytren’s disease'];
  return (
    <Page height={height}>
      <SiteHeader />
      <div className='grid grid-cols-[1fr_470px] gap-10 px-14 pt-12'>
        <div className='pt-4'>
          <p className='text-[13px] font-semibold uppercase tracking-[0.1em]' style={{ color: C.sageDeep }}>Hand and wrist surgery · Rotterdam-Kralingen</p>
          <h1 className='mt-5' style={serif(76, 380, { lineHeight: 0.96, letterSpacing: '-0.025em' })}>
            Hand and wrist care, <em style={{ fontStyle: 'italic', fontWeight: 360 }}>explained plainly.</em>
          </h1>
          <p className='mt-6 max-w-[520px] text-[18px] leading-[1.55]' style={{ color: C.inkSoft }}>
            Three surgeons and two hand therapists. Most visits start with a referral from your GP, and most treatments take less than an hour.
          </p>
          <div className='mt-8 flex gap-3'>
            <Pill tone='ink'>Where does it hurt? <Icon name='arrow' size={18} /></Pill>
            <Pill tone='line'><Icon name='upload' size={18} /> Upload a referral</Pill>
          </div>
          <dl className='mt-12 grid max-w-[600px] grid-cols-3 gap-4'>
            {[
              { k: 'First consult', v: 'about 4 weeks' },
              { k: 'Open', v: 'Mon–Fri, 08–17' },
              { k: 'Address', v: 'Kralingse Plaslaan 112' }
            ].map((d) => (
              <div key={d.k} className='pt-3' style={{ borderTop: `1px solid ${C.lineStrong}` }}>
                <dt className='text-[13px]' style={{ color: C.muted }}>{d.k}</dt>
                <dd className='mt-1 text-[16px] font-semibold'>{d.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className='relative h-[540px] rounded-[28px]' style={{ background: C.sage }}>
          <p className='absolute left-7 top-6 text-[14px] font-semibold'>Tap where it hurts</p>
          <div className='absolute left-1/2 top-[46px] -translate-x-1/2'>
            <div className='relative' style={{ width: MAP_W, height: MAP_H }}>
              <HandDrawing selected='palm' width={MAP_W} />
              {ZONES.map((z) => (
                <span
                  key={z.id}
                  className='absolute flex size-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full'
                  style={{ left: (z.x / 300) * MAP_W, top: (z.y / 344) * MAP_H, background: z.id === 'palm' ? C.apricot : C.paper, border: `2px solid ${C.ink}` }}
                >
                  <span className='size-[8px] rounded-full' style={{ background: C.ink }} />
                </span>
              ))}
            </div>
          </div>
          <div className='absolute bottom-5 left-5 right-5 rounded-[18px] p-4' style={{ background: C.paper }}>
            <p className='text-[12px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.sageDeep }}>Palm · often</p>
            <p className='mt-1 text-[16px] font-semibold'>Carpal tunnel syndrome, Dupuytren’s, a tendon sheath cyst</p>
          </div>
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 flex items-center gap-3 px-14 py-6' style={{ borderTop: `1px solid ${C.line}`, background: C.chalk }}>
        <span className='mr-2 whitespace-nowrap text-[14px] font-semibold' style={{ color: C.muted }}>Common conditions</span>
        {conditions.map((c) => (
          <span key={c} className='whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] font-medium' style={{ background: C.paper, border: `1px solid ${C.line}` }}>{c}</span>
        ))}
      </div>
    </Page>
  );
}

/** The practice site before the redesign (2013), redrawn from screenshots. */
export function OldSite({ height = 760 }: { height?: number }) {
  const sys = 'Verdana, Tahoma, Geneva, sans-serif';
  return (
    <div className='relative overflow-hidden' style={{ width: 1280, height, background: '#e9eef2', fontFamily: sys, color: '#222' }}>
      <div className='mx-auto' style={{ width: 980, background: '#fff', minHeight: height, boxShadow: '0 0 0 1px #c9d3db' }}>
        <div className='flex items-end justify-between px-5 pb-3 pt-5' style={{ background: '#2a5d8f', color: '#fff' }}>
          <div>
            <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: 34, fontStyle: 'italic' }}>Kliniek Dassen</p>
            <p style={{ fontSize: 11 }}>Hand- en polschirurgie · Plastische chirurgie · Handtherapie · Sinds 1998</p>
          </div>
          <p style={{ fontSize: 11 }}>Tel. 010 - 452 18 60 &nbsp;|&nbsp; Fax 010 - 452 18 69 &nbsp;|&nbsp; <u>Contact</u></p>
        </div>
        <div className='flex flex-wrap gap-x-3 gap-y-1 px-5 py-2' style={{ background: '#dbe6ef', fontSize: 11, color: '#1d4f80' }}>
          {['Home', 'Over ons', 'Specialisten', 'Aandoeningen A-Z', 'Behandelingen', 'Tarieven', 'Zorgverzekeraars', 'Verwijzers', 'Wachttijden (PDF)', 'Nieuws', 'Vacatures', 'Klachtenregeling', 'Route', 'Links'].map((n) => (
            <u key={n}>{n}</u>
          ))}
        </div>
        <div className='px-5 py-1.5' style={{ background: '#fff7c9', fontSize: 11, borderBottom: '1px solid #e5d98a' }}>
          <b>LET OP:</b> in verband met de zomerperiode zijn de wachttijden gewijzigd. Zie de PDF voor actuele informatie. &nbsp;+++&nbsp; Nieuw: wij zijn nu ook op zaterdag telefonisch bereikbaar van 9:00-11:00 +++
        </div>
        <div className='grid grid-cols-[200px_1fr_220px] gap-4 p-5'>
          <div style={{ fontSize: 11 }}>
            <p className='mb-1 px-2 py-1 font-bold' style={{ background: '#2a5d8f', color: '#fff' }}>Aandoeningen</p>
            {['Artrose duimbasis', 'Carpaal tunnel syndroom (CTS)', 'Cubitaal tunnel syndroom', 'De Quervain', 'Dupuytren', 'Ganglion (peesknoop)', 'Hypermobiliteit', 'Kahler', 'Littekens', 'Mallet finger', 'Polsfractuur', 'Reumatische hand', 'Scaphoid', 'TFCC-letsel', 'Trigger finger', 'Zenuwletsel'].map((x) => (
              <p key={x} className='px-2 py-[3px]' style={{ borderBottom: '1px dotted #c9d3db', color: '#1d4f80' }}><u>{x}</u></p>
            ))}
          </div>
          <div>
            <div className='relative flex h-[170px] items-center justify-center overflow-hidden' style={{ background: '#a9c4dc', border: '1px solid #8fb0cc' }}>
              <svg width='150' height='150' viewBox='0 0 100 100' aria-hidden='true'>
                <path d='M30 95V55c0-6 8-6 8 0V30c0-6 8-6 8 0v20-28c0-6 8-6 8 0v28-22c0-6 8-6 8 0v34l6-10c3-5 10-2 8 3L64 80c-3 8-10 15-20 15z' fill='#f1d3b8' stroke='#9c6b4b' strokeWidth='1.5' />
              </svg>
              <p className='absolute bottom-2 left-3' style={{ fontFamily: '"Times New Roman", serif', fontSize: 24, fontStyle: 'italic', color: '#fff', textShadow: '1px 1px 2px #345' }}>Welkom op onze website!</p>
              <p className='absolute right-3 top-2' style={{ fontSize: 10, color: '#fff' }}>◀ 1 / 5 ▶</p>
            </div>
            <h1 className='mt-4' style={{ fontSize: 18, fontWeight: 'bold', color: '#2a5d8f' }}>Welkom bij Kliniek Dassen</h1>
            <p className='mt-2' style={{ fontSize: 11, lineHeight: 1.6 }}>
              Kliniek Dassen is een zelfstandig behandelcentrum (ZBC) voor hand- en polschirurgie. Onze specialisten zijn lid van de NVvH en hebben ruime ervaring met operatieve en niet-operatieve behandelingen van de hand en pols. Voor een afspraak heeft u een verwijzing nodig van uw huisarts of specialist. Verwijsbrieven kunnen worden gefaxt naar 010 - 452 18 69 of per post worden verzonden. Na ontvangst van de verwijzing wordt u binnen 10 werkdagen telefonisch benaderd voor het maken van een afspraak. Indien u na 10 werkdagen niets heeft vernomen verzoeken wij u contact op te nemen.
            </p>
            <p className='mt-2' style={{ fontSize: 11, lineHeight: 1.6 }}>
              Voor informatie over de vergoeding van uw behandeling verwijzen wij u naar uw zorgverzekeraar. Kijk voor de actuele wachttijden in het overzicht <u style={{ color: '#1d4f80' }}>wachttijden_2013_v4.pdf</u> (laatst bijgewerkt 02-07-2013).
            </p>
            <div className='mt-4 grid grid-cols-3 gap-3'>
              {['Nieuws: nieuwe handtherapeut', 'Nieuws: verbouwing wachtkamer', 'Nieuws: CTS-spreekuur'].map((n) => (
                <div key={n} className='p-2' style={{ border: '1px solid #c9d3db', fontSize: 10.5 }}>
                  <p className='font-bold' style={{ color: '#2a5d8f' }}>{n}</p>
                  <p className='mt-1'>Lees meer over dit bericht op de nieuwspagina... <u style={{ color: '#1d4f80' }}>[meer]</u></p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11 }}>
            <div className='p-3' style={{ background: '#f2f5f8', border: '1px solid #c9d3db' }}>
              <p className='font-bold' style={{ color: '#2a5d8f' }}>Voor verwijzers</p>
              <p className='mt-1'>Download het verwijsformulier en fax het ingevulde formulier naar 010 - 452 18 69.</p>
              <p className='mt-2 inline-block px-2 py-1' style={{ background: '#e8862e', color: '#fff', fontWeight: 'bold' }}>» Verwijsformulier (Word)</p>
            </div>
            <div className='mt-3 p-3' style={{ background: '#f2f5f8', border: '1px solid #c9d3db' }}>
              <p className='font-bold' style={{ color: '#2a5d8f' }}>Openingstijden</p>
              <p className='mt-1'>ma t/m do 8:30 - 17:00<br />vr 8:30 - 12:30<br />za 9:00 - 11:00 (alleen telefonisch)</p>
            </div>
            <div className='mt-3 p-3 text-center' style={{ border: '1px solid #c9d3db' }}>
              <p>Bezoekers: <span style={{ fontFamily: 'monospace', background: '#222', color: '#7f7', padding: '0 4px' }}>0184 223</span></p>
              <p className='mt-1' style={{ fontSize: 10, color: '#888' }}>Laatst bijgewerkt: 02-07-2013</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TEAM = [
  { name: 'Dr. Imke Dassen', role: 'Hand surgeon, founder', focus: 'Thumb base and carpal tunnel', days: 'Mon, Tue, Thu', p: { hair: 'bun' as const, glasses: true } },
  { name: 'Dr. Ruben Oei', role: 'Hand and wrist surgeon', focus: 'Wrist arthroscopy, TFCC injuries', days: 'Mon, Wed, Fri', p: { hair: 'crop' as const } },
  { name: 'Dr. Marloes Brinkman', role: 'Plastic surgeon, hand surgery', focus: 'Nerves, tendons, Dupuytren’s', days: 'Tue, Wed, Thu', p: { hair: 'bob' as const } },
  { name: 'Femke Tjon', role: 'Hand therapist', focus: 'Exercises after surgery', days: 'Mon to Thu', p: { hair: 'curly' as const } },
  { name: 'Bas Huijsman', role: 'Hand therapist', focus: 'Custom splints, scar care', days: 'Tue to Fri', p: { hair: 'short' as const, beard: true, glasses: true } }
];

/** Team page: five people, line-drawn, with what they actually do. */
export function TeamPage({ height = 760 }: { height?: number }) {
  return (
    <Page height={height}>
      <SiteHeader active='Team' />
      <div className='px-14 pt-10'>
        <div className='flex items-end justify-between'>
          <div>
            <p className='text-[13px] font-semibold uppercase tracking-[0.1em]' style={{ color: C.sageDeep }}>The team</p>
            <h1 className='mt-3' style={serif(56, 400)}>Who you will meet</h1>
          </div>
          <p className='max-w-[420px] text-[16px] leading-[1.5]' style={{ color: C.inkSoft }}>
            Every condition page on this site is written with and signed by one of our three surgeons. You see the same surgeon from first consult to last check.
          </p>
        </div>
        <ul className='mt-9 grid grid-cols-5 gap-5'>
          {TEAM.map((m, i) => (
            <li key={m.name} className='rounded-[22px] p-5' style={{ background: i < 3 ? C.paper : C.sageSoft, border: `1px solid ${C.line}` }}>
              <Portrait {...m.p} size={176} bg={i < 3 ? C.sageSoft : C.paper} />
              <p className='mt-5' style={serif(23, 480)}>{m.name}</p>
              <p className='mt-1 text-[14.5px] font-medium' style={{ color: C.inkSoft }}>{m.role}</p>
              <div className='mt-4 space-y-2 pt-3 text-[13.5px]' style={{ borderTop: `1px solid ${C.line}` }}>
                <p><span style={{ color: C.muted }}>Focus</span><br />{m.focus}</p>
                <p><span style={{ color: C.muted }}>Consults</span><br />{m.days}</p>
              </div>
              <p className='mt-4 text-[12px] tabular-nums' style={{ color: C.muted }}>BIG {['49021834501', '79034416201', '19045572303', '59031127630', '09048836730'][i]}</p>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

const WAITS = [
  { t: 'First consult with a surgeon', w: 4, prev: 5, note: 'For a new referral' },
  { t: 'Hand therapy intake', w: 1, prev: 1, note: 'Splints and exercises' },
  { t: 'Carpal tunnel release', w: 6, prev: 6, note: 'After you decide on surgery' },
  { t: 'Trigger finger release', w: 5, prev: 6, note: 'After you decide on surgery' },
  { t: 'Thumb base surgery', w: 11, prev: 9, note: 'Needs a longer theatre slot' },
  { t: 'Wrist arthroscopy', w: 9, prev: 9, note: 'Two days a month' }
];

/** Waiting times, published every Monday, including the long ones. */
export function WaitTimesPage({ height = 760 }: { height?: number }) {
  const max = 12;
  return (
    <Page height={height}>
      <SiteHeader active='Waiting times' />
      <div className='grid grid-cols-[360px_1fr] gap-14 px-14 pt-10'>
        <div>
          <p className='text-[13px] font-semibold uppercase tracking-[0.1em]' style={{ color: C.sageDeep }}>Updated every Monday</p>
          <h1 className='mt-3' style={serif(54, 400, { lineHeight: 1 })}>Waiting times, honestly</h1>
          <p className='mt-5 text-[16.5px] leading-[1.55]' style={{ color: C.inkSoft }}>
            Taken from our agenda on Monday morning, not estimated. When a wait gets longer, it shows here first.
          </p>
          <div className='mt-7 rounded-[18px] p-5' style={{ background: C.ink, color: C.chalk }}>
            <p className='flex items-center gap-2 text-[15px] font-semibold'><Icon name='info' size={18} color={C.apricot} /> Is it urgent?</p>
            <p className='mt-2 text-[14.5px] leading-[1.5]' style={{ color: C.sageSoft }}>
              Your GP can call our triage line. Urgent problems, like a cut tendon, are seen within 48 hours.
            </p>
          </div>
          <p className='mt-5 flex items-center gap-2 text-[14px]' style={{ color: C.muted }}>
            <Icon name='cal' size={17} /> Last update: Monday 3 November 2025, 07:30
          </p>
        </div>
        <div className='rounded-[24px] p-7' style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          <div className='grid grid-cols-[260px_1fr_92px] items-center gap-5 pb-3 text-[12.5px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.muted, borderBottom: `1px solid ${C.line}` }}>
            <span>Appointment</span>
            <span className='flex justify-between'>
              {[0, 2, 4, 6, 8, 10, 12].map((n) => <span key={n}>{n}</span>)}
            </span>
            <span className='text-right'>Weeks</span>
          </div>
          {WAITS.map((r) => {
            const diff = r.w - r.prev;
            return (
              <div key={r.t} className='grid grid-cols-[260px_1fr_92px] items-center gap-5 py-[15px]' style={{ borderBottom: `1px solid ${C.line}` }}>
                <span>
                  <span className='block text-[16px] font-semibold'>{r.t}</span>
                  <span className='block text-[13.5px]' style={{ color: C.muted }}>{r.note}</span>
                </span>
                <span className='relative h-[14px] rounded-full' style={{ background: C.chalk }}>
                  <span className='absolute inset-y-0 left-0 rounded-full' style={{ width: `${(r.w / max) * 100}%`, background: r.w >= 9 ? C.apricot : C.sage }} />
                  <span className='absolute top-1/2 h-[22px] w-[2px] -translate-y-1/2' style={{ left: `${(r.prev / max) * 100}%`, background: C.ink, opacity: 0.35 }} />
                </span>
                <span className='text-right'>
                  <span className='block text-[22px] font-semibold tabular-nums'>{r.w}</span>
                  <span className='block text-[12.5px]' style={{ color: diff > 0 ? '#B4572B' : diff < 0 ? C.sageDeep : C.muted }}>
                    {diff > 0 ? `+${diff} since Oct` : diff < 0 ? `${diff} since Oct` : 'same as Oct'}
                  </span>
                </span>
              </div>
            );
          })}
          <p className='mt-4 flex items-center gap-2 text-[13px]' style={{ color: C.muted }}>
            <span className='inline-block h-[14px] w-[2px]' style={{ background: C.ink, opacity: 0.35 }} /> line marks last month’s wait
          </p>
        </div>
      </div>
    </Page>
  );
}
