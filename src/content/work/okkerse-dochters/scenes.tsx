import type { CSSProperties, ReactNode } from 'react';
import { BrowserFrame, PHONE, PhoneFrame } from '~/components/frames/frames';
import { defineScenes } from '~/components/frames/scene';
import { ArchMark, Brush, BusinessCard, ink, palette, sans, serif, soft, Van, Wordmark } from './brand';
import { ColourMatcher, defaultChoices } from './matcher';
import { HomeDesktop, QuotePdf, QuoteSentScreen, QuoteStepScreen, RequestPrint } from './screens';

function Fill({ bg, children, style }: { bg: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className='absolute inset-0 overflow-hidden' style={{ background: bg, fontFamily: sans, ...style }}>
      {children}
    </div>
  );
}

function ScaledPhone({ scale, left, top, children, finish }: { scale: number; left: number; top: number; children: ReactNode; finish?: 'graphite' | 'silver' | 'sand' }) {
  return (
    <div className='absolute origin-top-left' style={{ left, top, transform: `scale(${scale})` }}>
      <PhoneFrame finish={finish}>{children}</PhoneFrame>
    </div>
  );
}

function Chip({ hex, name, code, style }: { hex: string; name: string; code: string; style?: CSSProperties }) {
  return (
    <div className='absolute overflow-hidden rounded-[14px]' style={{ width: 170, height: 470, background: '#fff', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.6)', ...style }}>
      <div style={{ height: 380, background: hex }} />
      <div className='px-4 py-3' style={{ fontFamily: sans }}>
        <div className='text-[17px] font-bold' style={{ color: ink.text }}>
          {name}
        </div>
        <div className='text-[14px] tabular-nums' style={{ color: ink.muted }}>
          {code}
        </div>
      </div>
    </div>
  );
}

const coverChoices = {
  ...defaultChoices,
  door: { ...defaultChoices.door, colour: 'OD-131' },
  frames: { ...defaultChoices.frames, colour: 'OD-160' },
  wall: { ...defaultChoices.wall, colour: 'OD-140' }
};

function Cover() {
  return (
    <Fill bg={ink.green}>
      <div className='absolute left-[150px] top-[250px]' style={{ color: ink.cream }}>
        <ArchMark size={96} fill={ink.cream} text={ink.green} />
        <div className='mt-9 leading-[0.92]' style={{ ...soft, fontSize: 132, fontWeight: 600, letterSpacing: '-0.035em' }}>
          Okkerse
          <br />
          <i style={{ fontWeight: 440 }}>&amp; Dochters</i>
        </div>
        <div className='mt-8 text-[19px] font-semibold uppercase tracking-[0.24em]' style={{ color: ink.ochre }}>
          Schilders sinds 1971 · Schiedam
        </div>
      </div>
      <Chip hex='#A3412A' name='Havenrood' code='OD-131' style={{ left: 800, top: 230, transform: 'rotate(-14deg)' }} />
      <Chip hex='#D9A441' name='Okergeel' code='OD-140' style={{ left: 850, top: 205, transform: 'rotate(-7deg)' }} />
      <ScaledPhone scale={0.8} left={930} top={133}>
        <ColourMatcher initialSurface='door' initialChoices={coverChoices} />
      </ScaledPhone>
    </Fill>
  );
}

function BrandSheet() {
  return (
    <Fill bg={ink.cream}>
      <div className='absolute inset-x-[56px] top-[40px] flex justify-between text-[13px] font-semibold uppercase tracking-[0.18em]' style={{ color: ink.muted }}>
        <span>Huisstijl Okkerse &amp; Dochters · versie 1.3 · 2024</span>
        <span>04 — Basis</span>
      </div>
      {/* lockup on green */}
      <div className='absolute left-[56px] top-[84px] flex h-[470px] w-[640px] flex-col items-center justify-center rounded-[16px]' style={{ background: ink.green }}>
        <ArchMark size={170} fill={ink.cream} text={ink.green} />
        <div className='mt-8 text-center'>
          <Wordmark size={46} color={ink.cream} subColor={ink.ochre} />
        </div>
      </div>
      {/* construction */}
      <div className='absolute left-[720px] top-[84px] h-[222px] w-[664px] rounded-[16px] bg-white p-6' style={{ boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
        <div className='text-[12px] font-bold uppercase tracking-[0.16em]' style={{ color: ink.muted }}>
          Het boogje
        </div>
        <div className='mt-3 flex items-end gap-8'>
          <svg width='150' height='150' viewBox='-20 -20 120 140' aria-hidden='true'>
            {[0, 20, 40, 60, 80].map((x) => (
              <path key={`v${x}`} d={`M${x} -20v140`} stroke='#E3DCCD' strokeWidth='0.8' />
            ))}
            {[0, 20, 40, 60, 80, 100].map((y) => (
              <path key={`h${y}`} d={`M-20 ${y}h120`} stroke='#E3DCCD' strokeWidth='0.8' />
            ))}
            <circle cx='40' cy='40' r='38' fill='none' stroke={ink.brick} strokeWidth='0.8' strokeDasharray='3 3' />
            <path d='M2 98V40a38 38 0 0 1 76 0v58z' fill='none' stroke={ink.green} strokeWidth='2' />
            <path d='M10 90V41a30 30 0 0 1 60 0v49z' fill='none' stroke={ink.green} strokeWidth='1' />
            <text x='40' y='72' textAnchor='middle' fill={ink.green} style={{ ...soft, fontStyle: 'italic', fontWeight: 560, fontSize: 30 }}>
              O&amp;D
            </text>
          </svg>
          <div className='grid flex-1 grid-cols-3 gap-5 pb-2 text-[13px] leading-snug' style={{ color: ink.text }}>
            <div>
              <div className='font-bold'>Vorm</div>
              <div style={{ color: ink.muted }}>Het raam van een Schiedams grachtenpand: halve cirkel op een rechthoek, 4 : 5.</div>
            </div>
            <div>
              <div className='font-bold'>Kleinst</div>
              <div style={{ color: ink.muted }}>14 mm op een kwasthelft, 24 px op een scherm. Daaronder alleen de lijnversie.</div>
            </div>
            <div>
              <div className='font-bold'>Vrije ruimte</div>
              <div style={{ color: ink.muted }}>Een halve boogbreedte rondom, ook op het busje.</div>
            </div>
          </div>
        </div>
      </div>
      {/* type */}
      <div className='absolute left-[720px] top-[326px] grid h-[228px] w-[664px] grid-cols-2 gap-0 overflow-hidden rounded-[16px] bg-white' style={{ boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
        <div className='border-r p-6' style={{ borderColor: ink.line }}>
          <div className='text-[12px] font-bold uppercase tracking-[0.16em]' style={{ color: ink.muted }}>
            Fraunces · Soft 100 · Wonk
          </div>
          <div className='mt-1 text-[96px] leading-none' style={{ ...soft, fontWeight: 600, color: ink.green, letterSpacing: '-0.03em' }}>
            Aa<i style={{ fontWeight: 440 }}>&amp;</i>
          </div>
          <div className='mt-2 text-[17px] leading-tight' style={{ ...soft, fontWeight: 520, color: ink.text }}>
            Koppen, het woordmerk en alles op de bus.
          </div>
        </div>
        <div className='p-6'>
          <div className='text-[12px] font-bold uppercase tracking-[0.16em]' style={{ color: ink.muted }}>
            Figtree · 400–800
          </div>
          <div className='mt-1 text-[96px] font-bold leading-none' style={{ fontFamily: sans, color: ink.text, letterSpacing: '-0.04em' }}>
            Aa1
          </div>
          <div className='mt-2 text-[15px] leading-snug' style={{ color: ink.muted }}>
            Offertes, formulieren en de site. Cijfers altijd tabulair: € 2.408,43.
          </div>
        </div>
      </div>
      {/* palette */}
      <div className='absolute inset-x-[56px] top-[586px] grid grid-cols-10 gap-[10px]'>
        {palette.map((p) => (
          <div key={p.code} className='overflow-hidden rounded-[12px] bg-white' style={{ boxShadow: `inset 0 0 0 1px ${ink.line}` }}>
            <div className='flex h-[150px] items-end p-3 text-[12px] font-bold tabular-nums' style={{ background: p.hex, color: p.on, boxShadow: `inset 0 -1px 0 ${ink.line}` }}>
              {p.hex.toUpperCase()}
            </div>
            <div className='px-3 py-2.5'>
              <div className='text-[13.5px] font-bold leading-tight' style={{ color: ink.text }}>
                {p.name}
              </div>
              <div className='text-[11.5px] tabular-nums' style={{ color: ink.muted }}>
                {p.code}
              </div>
              <div className='mt-1 text-[11px] leading-snug' style={{ color: ink.muted }}>
                {p.after}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fill>
  );
}

function Livery() {
  return (
    <Fill bg='#EDE6D8'>
      <div className='absolute inset-x-0 bottom-0 top-[578px]' style={{ background: ink.green }} />
      <Van livery='new' className='absolute left-[180px] top-[64px] h-auto w-[1080px]' />
      <div className='absolute left-[110px] top-[618px]' style={{ transform: 'rotate(-4deg)' }}>
        <BusinessCard side='front' />
      </div>
      <div className='absolute left-[500px] top-[632px]' style={{ transform: 'rotate(3deg)' }}>
        <BusinessCard side='back' style={{ boxShadow: '0 30px 50px -20px rgba(0,0,0,0.6)' }} />
      </div>
      <Brush className='absolute left-[930px] top-[690px] h-auto w-[440px]' />
      <div className='absolute left-[950px] top-[800px] text-[13px] font-semibold uppercase tracking-[0.16em]' style={{ color: ink.ochre }}>
        Ingebrand in elke kwast · 14 mm
      </div>
    </Fill>
  );
}

function Website() {
  return (
    <Fill bg={ink.ochre}>
      <div className='absolute left-[100px] top-[39px]'>
        <BrowserFrame url='okkerse.nl' width={1240} height={780}>
          <HomeDesktop />
        </BrowserFrame>
      </div>
    </Fill>
  );
}

function PairPhone({ bg, children, finish }: { bg: string; children: ReactNode; finish?: 'graphite' | 'silver' | 'sand' }) {
  const scale = 0.9;
  return (
    <Fill bg={bg}>
      <ScaledPhone scale={scale} left={(720 - PHONE.width * scale) / 2} top={(900 - PHONE.height * scale) / 2} finish={finish}>
        {children}
      </ScaledPhone>
    </Fill>
  );
}

function Documents() {
  return (
    <Fill bg={ink.green}>
      <div className='absolute left-[150px] top-[96px]' style={{ transform: 'rotate(-2.5deg)' }}>
        <RequestPrint />
      </div>
      <div className='absolute left-[760px] top-[70px]' style={{ transform: 'rotate(1.8deg)' }}>
        <QuotePdf />
      </div>
      <div className='absolute bottom-[34px] left-[150px] flex gap-[300px] text-[13px] font-semibold uppercase tracking-[0.16em]' style={{ color: ink.ochre }}>
        <span>Voor Kees · 30 seconden</span>
        <span className='pl-[110px]'>Voor de klant · de offerte</span>
      </div>
    </Fill>
  );
}

function Street({ livery }: { livery: 'old' | 'new' }) {
  return (
    <Fill bg='#E7DFCF'>
      {/* a plastered wall with a drainpipe and a house number, the same in both */}
      <div className='absolute inset-x-0 top-0 h-[640px]' style={{ background: '#E7DFCF' }} />
      <div className='absolute left-[1290px] top-0 h-[640px] w-[18px]' style={{ background: '#B9B2A3' }} />
      <div className='absolute left-[110px] top-[90px] flex size-[54px] items-center justify-center rounded-[6px] text-[24px] font-bold' style={{ background: '#2E4A68', color: '#F1EBDD', fontFamily: serif }}>
        118
      </div>
      <div className='absolute inset-x-0 top-[640px] h-[14px]' style={{ background: '#A8A091' }} />
      <div className='absolute inset-x-0 bottom-0 top-[654px]' style={{ background: '#C9C0AF' }} />
      {Array.from({ length: 16 }, (_, i) => 40 + i * 92).map((left) => (
        <span key={left} className='absolute top-[654px] h-[246px] w-px' style={{ left, background: '#B8AE9B' }} />
      ))}
      <Van livery={livery} className='absolute left-[130px] top-[180px] h-auto w-[1180px]' />
    </Fill>
  );
}

const sentChoices = {
  door: { colour: 'OD-101', finish: 'gloss' as const, area: 2.2 },
  frames: { colour: 'OD-160', finish: 'satin' as const, area: 9 },
  wall: { colour: 'OD-108', finish: 'matt' as const, area: 0 }
};

export const scenes = defineScenes([
  { id: 'cover', width: 1440, height: 960, render: () => <Cover /> },
  { id: 'brand-sheet', width: 1440, height: 900, render: () => <BrandSheet /> },
  { id: 'before-identity', width: 1440, height: 900, render: () => <Street livery='old' /> },
  { id: 'after-identity', width: 1440, height: 900, render: () => <Street livery='new' /> },
  { id: 'livery', width: 1440, height: 900, render: () => <Livery /> },
  { id: 'website', width: 1440, height: 900, render: () => <Website /> },
  {
    id: 'pair-quote-a',
    width: 720,
    height: 900,
    render: () => (
      <PairPhone bg={ink.ochre}>
        <QuoteStepScreen />
      </PairPhone>
    )
  },
  {
    id: 'pair-quote-b',
    width: 720,
    height: 900,
    render: () => (
      <PairPhone bg={ink.brick} finish='sand'>
        <QuoteSentScreen />
      </PairPhone>
    )
  },
  {
    id: 'pair-matcher-a',
    width: 720,
    height: 900,
    render: () => (
      <PairPhone bg='#4E6A63'>
        <ColourMatcher initialSurface='wall' initialChoices={{ ...defaultChoices, wall: { colour: 'OD-108', finish: 'matt', area: 22 } }} />
      </PairPhone>
    )
  },
  {
    id: 'pair-matcher-b',
    width: 720,
    height: 900,
    render: () => (
      <PairPhone bg={ink.green} finish='silver'>
        <ColourMatcher initialChoices={sentChoices} initialSheet='review' />
      </PairPhone>
    )
  },
  { id: 'documents', width: 1440, height: 900, render: () => <Documents /> }
]);

