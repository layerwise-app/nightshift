import type { CSSProperties, ReactNode } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { ArchMark, CanalHouse, ink, palette, sans, serif, soft, Wordmark } from './brand';

/** Screens from okkerse.nl and the paperwork it produces. Dutch, as the site ships. */

// ---------------------------------------------------------------- shared bits

function SiteHeader({ lang = 'NL' }: { lang?: 'NL' | 'EN' }) {
  return (
    <header className='flex h-[52px] shrink-0 items-center justify-between border-b px-5' style={{ borderColor: ink.line }}>
      <span className='flex items-center gap-2.5'>
        <ArchMark size={30} />
        <span style={{ ...soft, fontSize: 17, fontWeight: 620, letterSpacing: '-0.02em', color: ink.green }}>
          Okkerse <i style={{ fontWeight: 480 }}>&amp; Dochters</i>
        </span>
      </span>
      <span className='flex items-center gap-3 text-[12px] font-semibold' style={{ color: ink.muted }}>
        <span>
          <span style={{ color: lang === 'NL' ? ink.green : undefined }}>NL</span> <span style={{ color: ink.line }}>|</span>{' '}
          <span style={{ color: lang === 'EN' ? ink.green : undefined }}>EN</span>
        </span>
        <svg width='20' height='14' viewBox='0 0 20 14' aria-hidden='true'>
          <path d='M0 1h20M0 7h20M0 13h20' stroke={ink.green} strokeWidth='2' />
        </svg>
      </span>
    </header>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex h-[844px] w-[390px] flex-col overflow-hidden' style={{ background: ink.cream, color: ink.text, fontFamily: sans }}>
      <PhoneStatusBar tone='dark' time='09:41' />
      {children}
    </div>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <span
      className='flex size-[22px] shrink-0 items-center justify-center rounded-[6px]'
      style={{ background: on ? ink.green : '#fff', boxShadow: on ? 'none' : `inset 0 0 0 1.5px ${ink.line}` }}
    >
      {on ? (
        <svg width='12' height='10' viewBox='0 0 12 10' aria-hidden='true'>
          <path d='M1 5l3.5 3.5L11 1.5' fill='none' stroke={ink.cream} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      ) : null}
    </span>
  );
}

/** Tiny drawn photo thumbnails a customer might upload. */
function Snapshot({ kind }: { kind: 'frame' | 'door' | 'gable' }) {
  return (
    <svg viewBox='0 0 96 96' className='size-full' aria-hidden='true'>
      {kind === 'frame' ? (
        <>
          <rect width='96' height='96' fill='#8F3E2A' />
          <rect x='16' y='12' width='64' height='76' fill='#E9E4D8' />
          <rect x='23' y='19' width='50' height='62' fill='#2A363C' />
          <rect x='46.5' y='19' width='3' height='62' fill='#E9E4D8' />
          <rect x='23' y='48' width='50' height='4' fill='#E9E4D8' />
          <path d='M16 70l10 4-4 8 9 6H16z' fill='#A88E6A' />
          <path d='M66 12l8 6-3 6 9 2V12z' fill='#A88E6A' />
          <path d='M20 74l6 2M70 16l5 3' stroke='#5E4A33' strokeWidth='1.2' />
        </>
      ) : kind === 'door' ? (
        <>
          <rect width='96' height='96' fill='#8F3E2A' />
          <rect x='22' y='8' width='52' height='88' fill='#E9E4D8' />
          <rect x='28' y='26' width='40' height='70' fill='#3E5A47' />
          <rect x='33' y='32' width='13' height='20' fill='none' stroke='#2E4535' strokeWidth='2' />
          <rect x='50' y='32' width='13' height='20' fill='none' stroke='#2E4535' strokeWidth='2' />
          <path d='M30 70c6-2 10 2 16 0s8-4 12 0' stroke='#9BAE9F' strokeWidth='2' fill='none' />
          <circle cx='61' cy='62' r='2.2' fill='#D9A441' />
        </>
      ) : (
        <>
          <rect width='96' height='96' fill='#CFE0E6' />
          <path d='M14 96V52c0-8 12-10 16-18V18c0-6 4-10 10-10h16c6 0 10 4 10 10v16c4 8 16 10 16 18v44z' fill='#8F3E2A' />
          <rect x='40' y='22' width='16' height='16' fill='#2A363C' stroke='#E9E4D8' strokeWidth='3' />
          <rect x='26' y='56' width='16' height='22' fill='#2A363C' stroke='#E9E4D8' strokeWidth='3' />
          <rect x='54' y='56' width='16' height='22' fill='#2A363C' stroke='#E9E4D8' strokeWidth='3' />
        </>
      )}
    </svg>
  );
}

// ---------------------------------------------------------------- quote flow

/** Quote request, step 2 of 4: what needs painting. */
export function QuoteStepScreen() {
  const items = [
    { label: 'Buitenkozijnen', hint: 'ramen, deuren, boeidelen', on: true },
    { label: 'Voordeur', hint: 'inclusief deurlijst en bovenlicht', on: true },
    { label: 'Gevel of metselwerk', hint: 'reinigen, voegen, kalkverf', on: false },
    { label: 'Binnenmuren', hint: 'per kamer', on: false },
    { label: 'Trappenhuis', hint: 'trap, leuning, spijlen', on: false }
  ];
  return (
    <Phone>
      <SiteHeader />
      <div className='flex-1 px-5 pt-5'>
        <div className='flex items-center justify-between text-[12px] font-bold'>
          <span style={{ color: ink.brick }}>OFFERTE AANVRAGEN</span>
          <span style={{ color: ink.muted }}>Stap 2 van 4</span>
        </div>
        <div className='mt-2 flex gap-1'>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className='h-1.5 flex-1 rounded-full' style={{ background: n <= 2 ? ink.green : ink.line }} />
          ))}
        </div>
        <h1 className='mt-4 text-[28px] leading-[1.02]' style={{ ...soft, fontWeight: 560, letterSpacing: '-0.025em', color: ink.green }}>
          Wat moet er geschilderd worden?
        </h1>
        <ul className='mt-4 space-y-1.5'>
          {items.map((item) => (
            <li
              key={item.label}
              className='flex items-center gap-3 rounded-[12px] px-3.5 py-2'
              style={{ background: item.on ? '#fff' : ink.paper, boxShadow: `inset 0 0 0 ${item.on ? 1.5 : 1}px ${item.on ? ink.green : ink.line}` }}
            >
              <Check on={item.on} />
              <span className='min-w-0 flex-1'>
                <span className='block text-[15px] font-bold leading-tight'>{item.label}</span>
                <span className='block text-[12.5px]' style={{ color: ink.muted }}>
                  {item.hint}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className='mt-5 text-[14px] font-bold'>Is het pand een monument?</p>
        <div className='mt-2 grid grid-cols-3 rounded-[11px] p-1' style={{ background: ink.paper, boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
          {['Ja', 'Nee', 'Weet ik niet'].map((label, i) => (
            <span
              key={label}
              className='flex h-9 items-center justify-center rounded-[8px] text-[13.5px] font-semibold'
              style={{ background: i === 0 ? ink.green : 'transparent', color: i === 0 ? ink.cream : ink.text }}
            >
              {label}
            </span>
          ))}
        </div>
        <p className='mt-2 text-[12.5px] leading-snug' style={{ color: ink.muted }}>
          Dan komt Lotte eerst kijken, gratis. Zij regelt ook de afstemming met de gemeente.
        </p>
        <p className='mt-4 text-[14px] font-bold'>
          Foto’s <span className='font-normal' style={{ color: ink.muted }}>(mag ook later)</span>
        </p>
        <div className='mt-2 flex gap-2'>
          {(['frame', 'door', 'gable'] as const).map((k) => (
            <span key={k} className='size-[68px] overflow-hidden rounded-[10px]'>
              <Snapshot kind={k} />
            </span>
          ))}
          <span className='flex size-[68px] items-center justify-center rounded-[10px] text-[26px] font-light' style={{ boxShadow: `inset 0 0 0 1.5px ${ink.line}`, color: ink.green, background: ink.paper }}>
            +
          </span>
        </div>
      </div>
      <div className='flex gap-2 px-5 pb-8 pt-3'>
        <span className='flex h-12 flex-1 items-center justify-center rounded-[12px] text-[14.5px] font-bold' style={{ boxShadow: `inset 0 0 0 1.5px ${ink.green}`, color: ink.green }}>
          Vorige
        </span>
        <span className='flex h-12 flex-[1.6] items-center justify-center rounded-[12px] text-[14.5px] font-bold' style={{ background: ink.green, color: ink.cream }}>
          Volgende: wanneer?
        </span>
      </div>
    </Phone>
  );
}

const requestRows = [
  { k: 'Wie', v: 'Femke Jansen', d: '06 41 22 87 90' },
  { k: 'Waar', v: 'Hoogstraat 87, Schiedam', d: 'rijksmonument' },
  { k: 'Wat', v: 'Voordeur + 6 buitenkozijnen', d: 'Schiedams Groen OD-101, hoogglans' },
  { k: 'Wanneer', v: 'Vóór 1 september', d: 'liefst niet in de bouwvak' },
  { k: 'Budget', v: '€ 2.000 – 3.000', d: 'volgens de kleurenkiezer' }
];

/** After sending: what happens next, and a preview of the page Kees gets. */
export function QuoteSentScreen() {
  return (
    <Phone>
      <SiteHeader />
      <div className='flex-1 px-5 pt-6'>
        <div className='flex items-center gap-3'>
          <span className='flex size-11 items-center justify-center rounded-full' style={{ background: ink.green }}>
            <svg width='18' height='14' viewBox='0 0 18 14' aria-hidden='true'>
              <path d='M1.5 7.5l5 4.5L16.5 2' fill='none' stroke={ink.cream} strokeWidth='2.6' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </span>
          <span className='text-[12px] font-bold uppercase tracking-[0.16em]' style={{ color: ink.brick }}>
            Aanvraag OD-24-0613
          </span>
        </div>
        <h1 className='mt-4 text-[31px] leading-[1.02]' style={{ ...soft, fontWeight: 560, letterSpacing: '-0.025em', color: ink.green }}>
          Verstuurd. Kees belt je vandaag nog terug.
        </h1>
        <p className='mt-4 text-[13px] font-bold'>Dit ligt nu bij hem op het bureau</p>
        <div className='mt-2 rounded-[12px] bg-white px-4 py-3' style={{ boxShadow: `inset 0 0 0 1px ${ink.line}, 0 12px 24px -18px rgba(0,0,0,0.4)` }}>
          {requestRows.map((row) => (
            <div key={row.k} className='flex gap-3 border-b py-1.5 last:border-b-0' style={{ borderColor: ink.line }}>
              <span className='w-[62px] shrink-0 pt-[3px] text-[10.5px] font-bold uppercase tracking-[0.12em]' style={{ color: ink.muted }}>
                {row.k}
              </span>
              <span className='text-[15px] font-bold leading-snug'>{row.v}</span>
            </div>
          ))}
        </div>
        <p className='mt-5 text-[13px] font-bold'>Wat er nu gebeurt</p>
        <ol className='mt-2 space-y-0'>
          {[
            { when: 'Vandaag, voor 17:00', what: 'Kees belt om je vragen door te nemen' },
            { when: 'Binnen 5 werkdagen', what: 'Lotte komt kijken en neemt kleurstalen mee' },
            { when: 'Twee dagen later', what: 'Je krijgt de offerte als pdf, met vaste prijs' }
          ].map((step, i) => (
            <li key={step.when} className='flex gap-3'>
              <span className='flex flex-col items-center'>
                <span className='mt-1 size-3 rounded-full' style={{ background: i === 0 ? ink.ochre : ink.paper, boxShadow: `inset 0 0 0 2px ${i === 0 ? ink.ochre : ink.green}` }} />
                {i < 2 ? <span className='w-0.5 flex-1' style={{ background: ink.line }} /> : null}
              </span>
              <span className='pb-3'>
                <span className='block text-[14px] font-bold leading-tight'>{step.when}</span>
                <span className='block text-[13px]' style={{ color: ink.muted }}>
                  {step.what}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className='px-5 pb-8 pt-2'>
        <span className='flex h-12 items-center justify-center rounded-[12px] text-[14.5px] font-bold' style={{ background: ink.green, color: ink.cream }}>
          Terug naar de kleuren
        </span>
      </div>
    </Phone>
  );
}

// ---------------------------------------------------------------- paperwork

const paper: CSSProperties = {
  width: 520,
  height: 735,
  background: '#FFFFFF',
  color: ink.text,
  fontFamily: sans,
  boxShadow: '0 40px 70px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.04)',
  position: 'relative'
};

/** The one-page request the office printer spits out for Kees. */
export function RequestPrint({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ ...paper, ...style, padding: '38px 40px' }}>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <ArchMark size={44} />
          <div>
            <div className='text-[13px] font-extrabold tracking-[0.22em]'>AANVRAAG</div>
            <div className='text-[12px]' style={{ color: ink.muted }}>
              di 11 juni 2024 · 09:42 · via okkerse.nl
            </div>
          </div>
        </div>
        <div className='text-right text-[30px] font-extrabold tabular-nums leading-none' style={{ color: ink.brick }}>
          #0613
        </div>
      </div>
      <div className='mt-7 border-t-[3px]' style={{ borderColor: ink.text }}>
        {requestRows.map((row) => (
          <div key={row.k} className='grid grid-cols-[96px_1fr] gap-4 border-b py-[13px]' style={{ borderColor: '#D8D3C8' }}>
            <span className='pt-1.5 text-[12px] font-extrabold uppercase tracking-[0.16em]' style={{ color: ink.muted }}>
              {row.k}
            </span>
            <span>
              <span className='block text-[25px] font-extrabold leading-[1.1] tracking-[-0.01em]'>{row.v}</span>
              <span className='mt-0.5 block text-[14px]' style={{ color: ink.muted }}>
                {row.d}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className='mt-6 flex gap-5 text-[14px] font-semibold'>
        {['Gebeld', 'Afspraak', 'Naar Lotte'].map((label, i) => (
          <span key={label} className='flex items-center gap-2'>
            <span className='flex size-[22px] items-center justify-center' style={{ boxShadow: `inset 0 0 0 2px ${ink.text}` }}>
              {i === 0 ? (
                <svg width='16' height='14' viewBox='0 0 16 14' aria-hidden='true'>
                  <path d='M2 8c2 1 3 3 4 4 2-5 5-8 9-11' fill='none' stroke='#1D3D8F' strokeWidth='2.2' strokeLinecap='round' />
                </svg>
              ) : null}
            </span>
            {label}
          </span>
        ))}
      </div>
      <div className='absolute bottom-[30px] left-10 right-10 flex justify-between text-[11.5px]' style={{ color: ink.muted }}>
        <span>Pagina 2: foto’s en details voor Marieke</span>
        <span>1/2</span>
      </div>
    </div>
  );
}

/** Page one of a quote, with the 9% / 21% VAT split Dutch homeowners expect. */
export function QuotePdf({ style }: { style?: CSSProperties }) {
  const lines = [
    { what: 'Buitenkozijnen: schuren, bijwerken, grondverf en twee lagen aflak', qty: '6 st', eur: '1.320,00' },
    { what: 'Voordeur: afbijten, gronden, twee lagen hoogglans OD-101', qty: '1 st', eur: '465,00' },
    { what: 'Glaslatten vervangen bij houtrot, eiken', qty: '4 m', eur: '168,00' },
    { what: 'Hoogwerker, inclusief vergunning stoep', qty: '1 dag', eur: '210,00' },
    { what: 'Kleur- en materiaalcheck met de gemeente (monument)', qty: '', eur: 'inbegrepen' }
  ];
  return (
    <div style={{ ...paper, ...style, padding: '34px 38px' }}>
      <div className='flex items-start justify-between'>
        <span className='flex items-center gap-3'>
          <ArchMark size={46} />
          <Wordmark size={19} />
        </span>
        <div className='text-right text-[10.5px] leading-[1.5]' style={{ color: ink.muted }}>
          Lange Haven 118
          <br />
          3111 CK Schiedam
          <br />
          010 426 71 18 · okkerse.nl
          <br />
          KvK 24301188
        </div>
      </div>
      <div className='mt-5 flex items-end justify-between'>
        <div>
          <div className='text-[30px] leading-none' style={{ ...soft, fontWeight: 600, color: ink.green }}>
            Offerte
          </div>
          <div className='mt-1.5 text-[12px] tabular-nums' style={{ color: ink.muted }}>
            O-2024-118 · 13 juni 2024 · geldig tot 11 juli 2024
          </div>
        </div>
        <div className='text-right text-[12px] leading-[1.5]'>
          Mevr. F. Jansen
          <br />
          Hoogstraat 87
          <br />
          3111 HE Schiedam
        </div>
      </div>
      <table className='mt-4 w-full border-collapse text-[12px]'>
        <thead>
          <tr className='text-left text-[10.5px] uppercase tracking-[0.12em]' style={{ color: ink.muted }}>
            <th className='pb-2 font-bold'>Omschrijving</th>
            <th className='pb-2 text-right font-bold'>Aantal</th>
            <th className='pb-2 text-right font-bold'>Bedrag</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.what} className='border-t align-top' style={{ borderColor: '#E3DED3' }}>
              <td className='py-2 pr-4 leading-snug'>{line.what}</td>
              <td className='py-2 text-right tabular-nums' style={{ color: ink.muted }}>
                {line.qty}
              </td>
              <td className='py-2 pl-3 text-right tabular-nums'>{line.eur === 'inbegrepen' ? <i style={{ color: ink.muted }}>inbegrepen</i> : `€ ${line.eur}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='ml-auto mt-3 w-[250px] border-t-2 pt-2 text-[12px] tabular-nums' style={{ borderColor: ink.text }}>
        {[
          ['Arbeid', '€ 1.740,00'],
          ['Materiaal', '€ 423,00'],
          ['Btw 9% over arbeid', '€ 156,60'],
          ['Btw 21% over materiaal', '€ 88,83']
        ].map(([k, v]) => (
          <div key={k} className='flex justify-between py-0.5'>
            <span style={{ color: ink.muted }}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
        <div className='mt-1.5 flex justify-between border-t pt-1.5 text-[15px] font-extrabold' style={{ borderColor: '#E3DED3' }}>
          <span>Totaal</span>
          <span>€ 2.408,43</span>
        </div>
      </div>
      <div className='mt-4 text-[11.5px] leading-[1.55]' style={{ color: ink.muted }}>
        Uitvoering week 28–29. Zes jaar garantie op buitenschilderwerk. Kleur OD-101 Schiedams Groen is afgestemd met
        Erfgoed Schiedam op 12 juni.
      </div>
      <div className='mt-5 flex items-end justify-between'>
        <div>
          <div className='text-[26px] leading-none' style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 420, color: '#1D3D8F' }}>
            Marieke Okkerse
          </div>
          <div className='mt-1.5 border-t pt-1 text-[11px]' style={{ borderColor: ink.line, color: ink.muted }}>
            Marieke Okkerse, mede-eigenaar
          </div>
        </div>
        <div className='mb-1 flex h-[6px] w-[150px]'>
          {palette.slice(0, 6).map((p) => (
            <span key={p.code} className='flex-1' style={{ background: p.hex }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- website

/** okkerse.nl home page, desktop, 1240 × 780. */
export function HomeDesktop() {
  const links = ['Werkwijze', 'Monumenten', 'Kleuren', 'Projecten', 'Over ons'];
  return (
    <div className='relative h-[780px] w-[1240px] overflow-hidden' style={{ background: ink.paper, color: ink.text, fontFamily: sans }}>
      <nav className='flex h-[76px] items-center gap-10 border-b px-12' style={{ borderColor: ink.line }}>
        <span className='flex items-center gap-3'>
          <ArchMark size={40} />
          <span style={{ ...soft, fontSize: 22, fontWeight: 620, letterSpacing: '-0.02em', color: ink.green }}>
            Okkerse <i style={{ fontWeight: 480 }}>&amp; Dochters</i>
          </span>
        </span>
        <span className='flex gap-7 text-[14.5px] font-semibold'>
          {links.map((link, i) => (
            <span key={link} style={{ color: i === 2 ? ink.green : ink.text, boxShadow: i === 2 ? `inset 0 -2px 0 ${ink.ochre}` : undefined, paddingBottom: 4 }}>
              {link}
            </span>
          ))}
        </span>
        <span className='ml-auto flex items-center gap-5 text-[14px] font-semibold'>
          <span style={{ color: ink.muted }}>010 426 71 18</span>
          <span style={{ color: ink.muted }}>
            <span style={{ color: ink.green }}>NL</span> | EN
          </span>
          <span className='flex h-11 items-center rounded-[11px] px-5 font-bold' style={{ background: ink.green, color: ink.cream }}>
            Offerte aanvragen
          </span>
        </span>
      </nav>

      <section className='grid grid-cols-[1fr_560px] gap-12 px-12 pt-10'>
        <div>
          <p className='text-[12.5px] font-bold uppercase tracking-[0.2em]' style={{ color: ink.brick }}>
            Schilders sinds 1971 · Schiedam en omstreken
          </p>
          <h1 className='mt-4 text-[62px] leading-[0.98]' style={{ ...soft, fontWeight: 560, letterSpacing: '-0.03em', color: ink.green }}>
            Schilderwerk dat een <i style={{ fontWeight: 440 }}>generatie</i> meegaat.
          </h1>
          <p className='mt-6 max-w-[46ch] text-[18px] leading-[1.5]' style={{ color: ink.muted }}>
            Woonhuizen, grachtenpanden en rijksmonumenten. Veertien vaste schilders, geleid door Marieke en Lotte Okkerse.
            Vader Kees neemt nog altijd de telefoon op.
          </p>
          <div className='mt-7 flex gap-3'>
            <span className='flex h-[52px] items-center rounded-[12px] px-6 text-[15.5px] font-bold' style={{ background: ink.ochre, color: ink.text }}>
              Kies een kleur
            </span>
            <span className='flex h-[52px] items-center rounded-[12px] px-6 text-[15.5px] font-bold' style={{ boxShadow: `inset 0 0 0 1.5px ${ink.green}`, color: ink.green }}>
              Offerte in vier vragen →
            </span>
          </div>
          <div className='mt-6 flex gap-7 text-[13px] font-semibold' style={{ color: ink.muted }}>
            <span>
              <b style={{ color: ink.text }}>4,9</b> uit 212 beoordelingen
            </span>
            <span>Erkend restauratieschilder</span>
            <span>6 jaar garantie buiten</span>
          </div>
        </div>
        <div className='relative h-[431px] overflow-hidden rounded-[20px]' style={{ marginTop: -8 }}>
          <CanalHouse door='#1F3B2D' frames='#F1EBDD' wall='#B49C74' className='block h-full w-full' />
          <span
            className='absolute bottom-4 left-4 flex items-center gap-3 rounded-[12px] px-4 py-2.5 text-[13px]'
            style={{ background: 'rgba(251,248,242,0.95)', boxShadow: '0 10px 24px -14px rgba(0,0,0,0.5)' }}
          >
            <span className='size-3 rounded-full' style={{ background: ink.green }} />
            <span>
              <b>Lange Haven 42</b> · rijksmonument · voordeur in OD-101
            </span>
          </span>
        </div>
      </section>

      <section className='absolute inset-x-12 bottom-8'>
        <div className='flex items-baseline justify-between'>
          <p className='text-[13px] font-bold'>De kleurenwaaier: tien kleuren die we altijd op voorraad hebben</p>
          <p className='text-[13px] font-semibold' style={{ color: ink.green }}>
            Probeer ze op jouw huis →
          </p>
        </div>
        <div className='mt-3 grid grid-cols-10 gap-2'>
          {palette.map((p) => (
            <div key={p.code} className='overflow-hidden rounded-[10px]' style={{ boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
              <div className='h-[54px]' style={{ background: p.hex }} />
              <div className='bg-white px-2.5 py-1.5'>
                <div className='truncate text-[11.5px] font-bold'>{p.name}</div>
                <div className='text-[10.5px] tabular-nums' style={{ color: ink.muted }}>
                  {p.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
