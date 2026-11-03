import type { CSSProperties, ReactNode } from 'react';
import { BrowserFrame, PhoneFrame } from '~/components/frames/frames';
import { defineScenes } from '~/components/frames/scene';
import { Brush, Floss, G, GaafWordmark, LetterboxBox, Pouch, TinSide, TinTop, gaafRoot } from './brand';
import { RhythmScreen } from './demo';
import { DashboardScreen, LandingPage, PauseScreen, ProductPage, QuizHousehold, QuizNeeds } from './screens';

function Canvas({ bg, children, style }: { bg: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className='relative h-full w-full overflow-hidden' style={{ ...gaafRoot, background: bg, ...style }}>
      {children}
    </div>
  );
}

function Scaled({ scale, x, y, children, rotate = 0 }: { scale: number; x: number; y: number; children: ReactNode; rotate?: number }) {
  return (
    <div className='absolute origin-top-left' style={{ left: x, top: y, transform: `scale(${scale}) rotate(${rotate}deg)` }}>
      {children}
    </div>
  );
}

function Caption({ k, v, color = G.ink }: { k: string; v: string; color?: string }) {
  return (
    <div style={{ color }}>
      <p className='text-[15px] font-bold tracking-[-0.01em]'>{k}</p>
      <p className='mt-0.5 text-[13px] leading-snug opacity-75'>{v}</p>
    </div>
  );
}

function Cover() {
  return (
    <Canvas bg={G.cobalt}>
      {/* the slot of a front door, running behind everything */}
      <div className='absolute left-0 right-0 top-[452px] h-[56px]' style={{ background: G.cobaltDeep }} />
      <div className='absolute left-[150px] top-[250px]' style={{ color: G.paper }}>
        <p className='text-[20px] font-semibold uppercase tracking-[0.14em]' style={{ color: G.mint }}>
          Oral care, by letterbox
        </p>
        <p className='mt-1 text-[292px] font-extrabold leading-[0.8] tracking-[-0.06em]'>gaaf</p>
        <p className='mt-[78px] max-w-[520px] text-[26px] font-medium leading-[1.25]'>
          Tablets in a tin you keep. Refills that size themselves.
        </p>
      </div>
      <div className='absolute left-[690px] top-[612px] rotate-[-9deg]'>
        <TinSide width={230} lid={G.tomato} />
      </div>
      <div className='absolute left-[930px] top-[86px] rotate-[4deg]'>
        <Pouch width={150} tone={G.mint} />
      </div>
      <Scaled scale={0.86} x={1010} y={150}>
        <PhoneFrame finish='silver'>
          <RhythmScreen />
        </PhoneFrame>
      </Scaled>
    </Canvas>
  );
}

function Packaging() {
  const items: { node: ReactNode; k: string; v: string; w: number }[] = [
    { node: <Brush height={430} handle={G.cobalt} />, k: 'Brush', v: 'Aluminium handle, heads click off', w: 130 },
    { node: <TinSide width={250} lid={G.cobalt} />, k: 'Tin', v: '74 × 28 mm, keeps 62 tablets', w: 260 },
    { node: <TinTop size={210} lid={G.tomato} />, k: 'Lid colours', v: 'One per person in the house', w: 220 },
    { node: <Pouch width={175} tone={G.paper} />, k: 'Refill pouch', v: '0,8 cm flat, home compostable', w: 185 },
    { node: <Floss height={190} cap={G.tomato} />, k: 'Floss', v: '50 m corn fibre, glass vial', w: 120 },
    { node: <LetterboxBox width={360} />, k: 'Parcel', v: '38 × 26,5 × 3 cm, through the slot', w: 360 }
  ];
  return (
    <Canvas bg={G.mint}>
      <div className='absolute left-[80px] top-[70px] flex items-end justify-between' style={{ right: 80 }}>
        <div>
          <GaafWordmark size={40} />
          <p className='mt-6 text-[64px] font-extrabold leading-[0.92] tracking-[-0.05em]'>One kit, five parts,<br />no plastic.</p>
        </div>
        <p className='max-w-[360px] pb-2 text-[17px] leading-snug' style={{ color: G.ink2 }}>
          Everything is sized to the 3 cm we allow inside a letterbox parcel, so refills never need a doorbell.
        </p>
      </div>
      <div className='absolute bottom-[190px] left-[80px] right-[80px] h-[2px]' style={{ background: G.ink, opacity: 0.85 }} />
      <div className='absolute bottom-[192px] left-[80px] right-[80px] flex items-end justify-between'>
        {items.map((it) => (
          <div key={it.k} className='flex justify-center' style={{ width: it.w }}>
            {it.node}
          </div>
        ))}
      </div>
      <div className='absolute bottom-[80px] left-[80px] right-[80px] flex justify-between'>
        {items.map((it) => (
          <div key={it.k} style={{ width: it.w }}>
            <Caption k={it.k} v={it.v} />
          </div>
        ))}
      </div>
    </Canvas>
  );
}

function Letterbox() {
  const cm = 62; // px per centimetre in this drawing
  const layers = [
    { id: 'p1', k: 'Refill pouch, fresh mint', h: 0.8, c: G.mint },
    { id: 'p2', k: 'Refill pouch, fresh mint', h: 0.8, c: G.mint },
    { id: 'p3', k: 'Refill pouch, junior apple', h: 0.8, c: '#FFE9A8' },
    { id: 'heads', k: 'Brush heads, 3 in a paper sleeve', h: 0.6, c: '#FFFFFF' }
  ];
  const stack = layers.reduce((a, l) => a + l.h, 0);
  return (
    <Canvas bg={G.paper}>
      <div
        className='absolute inset-0 opacity-[0.55]'
        style={{
          backgroundImage: `linear-gradient(${G.line} 1px, transparent 1px), linear-gradient(90deg, ${G.line} 1px, transparent 1px)`,
          backgroundSize: '31px 31px'
        }}
      />
      <div className='absolute left-[80px] top-[70px]'>
        <p className='text-[15px] font-semibold uppercase tracking-[0.12em]' style={{ color: G.cobalt }}>
          Fig. 2 · the letterbox rule
        </p>
        <p className='mt-3 text-[60px] font-extrabold leading-[0.92] tracking-[-0.05em]'>3,2 cm fits a Dutch<br />letterbox. We pack to 3,0.</p>
      </div>

      {/* the door and its slot */}
      <div className='absolute right-[110px] top-[90px] h-[720px] w-[420px] rounded-[10px]' style={{ background: G.cobalt }}>
        <div className='absolute left-[40px] right-[40px] top-[40px] h-[240px] rounded-[6px]' style={{ boxShadow: `inset 0 0 0 3px ${G.cobaltDeep}` }}>
          <div className='absolute left-1/2 top-[64px] flex h-[96px] w-[150px] -translate-x-1/2 items-center justify-center rounded-[8px] text-[64px] font-extrabold tracking-[-0.04em]' style={{ background: '#D8B45A', color: G.ink }}>
            14
          </div>
        </div>
        <div className='absolute left-[40px] right-[40px] top-[310px] h-[360px] rounded-[6px]' style={{ boxShadow: `inset 0 0 0 3px ${G.cobaltDeep}` }} />
        <div className='absolute left-[70px] right-[70px] rounded-[8px] p-[10px]' style={{ top: 380, background: '#D8B45A' }}>
          <div className='relative overflow-hidden rounded-[3px]' style={{ height: 3.2 * cm * 0.55, background: G.ink }}>
            <div className='absolute left-[22px] right-[22px] flex items-center justify-center rounded-[2px] text-[22px] font-extrabold tracking-[-0.03em]' style={{ top: 0.1 * cm * 0.55, height: 3.0 * cm * 0.55, background: G.tomato, color: G.paper }}>
              gaaf
            </div>
          </div>
        </div>
        <div className='absolute left-[70px] top-[620px] w-[124px] rounded-[6px] px-2.5 py-2 text-[11px] font-bold leading-tight' style={{ background: '#E63A2E', color: '#fff' }}>
          NEE · no flyers
          <br />
          JA · gaaf parcels
        </div>
        <p className='absolute left-[70px] right-[60px] text-[14px] font-semibold leading-snug' style={{ top: 380 + 3.2 * cm * 0.55 + 34, color: G.mint }}>
          Brass slot, 3,2 cm high on most Dutch doors. The parcel clears it by 2 mm.
        </p>
      </div>

      {/* cross-section of the parcel */}
      <div className='absolute left-[80px] top-[400px]'>
        <p className='mb-4 text-[14px] font-semibold uppercase tracking-[0.1em]' style={{ color: G.ink2 }}>
          Cross-section, 3 people, every 4 weeks
        </p>
        <div className='flex items-end gap-6'>
          <div className='relative w-[520px] rounded-[6px] p-[8px]' style={{ background: G.tomato }}>
            {layers.map((l, i) => (
              <div
                key={l.id}
                className='flex items-center px-4 text-[14px] font-semibold'
                style={{ height: l.h * cm, background: l.c, borderTop: i ? `2px solid ${G.tomato}` : undefined, color: G.ink }}
              >
                {l.k}
                <span className='ml-auto tabular-nums opacity-70'>{l.h.toFixed(1).replace('.', ',')} cm</span>
              </div>
            ))}
          </div>
          <div className='relative' style={{ height: stack * cm + 16 }}>
            <div className='absolute bottom-0 top-0 w-[2px]' style={{ background: G.ink }} />
            <div className='absolute top-0 h-[2px] w-[18px] -translate-x-[8px]' style={{ background: G.ink }} />
            <div className='absolute bottom-0 h-[2px] w-[18px] -translate-x-[8px]' style={{ background: G.ink }} />
            <p className='absolute left-[22px] top-1/2 -translate-y-1/2 whitespace-nowrap text-[30px] font-extrabold tracking-[-0.03em]'>3,0 cm</p>
          </div>
        </div>
        <p className='mt-5 max-w-[520px] text-[15px] leading-snug' style={{ color: G.ink2 }}>
          The rhythm builder picks the longest interval that still fits this stack. Bigger households get parcels more often, never a box they have to collect.
        </p>
      </div>
    </Canvas>
  );
}

function DesktopOn({ bg, url, children, label }: { bg: string; url: string; children: ReactNode; label?: string }) {
  return (
    <Canvas bg={bg}>
      {label ? (
        <p className='absolute left-[64px] top-[34px] text-[14px] font-semibold uppercase tracking-[0.12em]' style={{ color: bg === G.cobalt ? G.mint : G.ink }}>
          {label}
        </p>
      ) : null}
      <Scaled scale={0.98} x={93} y={78}>
        <BrowserFrame url={url} width={1280} height={780}>
          {children}
        </BrowserFrame>
      </Scaled>
    </Canvas>
  );
}

function PhoneOn({ bg, children, note, noteColor = G.ink }: { bg: string; children: ReactNode; note: string; noteColor?: string }) {
  return (
    <Canvas bg={bg}>
      <Scaled scale={0.88} x={(720 - 412 * 0.88) / 2} y={46}>
        <PhoneFrame finish='graphite'>{children}</PhoneFrame>
      </Scaled>
      <p className='absolute bottom-[24px] left-0 right-0 text-center text-[15px] font-semibold' style={{ color: noteColor }}>
        {note}
      </p>
    </Canvas>
  );
}

function Quiz() {
  return (
    <Canvas bg={G.cobalt}>
      <div className='absolute left-[80px] top-[110px] w-[460px]' style={{ color: G.paper }}>
        <p className='text-[15px] font-semibold uppercase tracking-[0.12em]' style={{ color: G.mint }}>
          Onboarding
        </p>
        <p className='mt-4 text-[64px] font-extrabold leading-[0.92] tracking-[-0.05em]'>Three questions. The maths is ours.</p>
        <p className='mt-6 text-[19px] leading-[1.4] opacity-85'>
          Who brushes, how often, and what their mouth needs. Loes, the hygienist co-founder, wrote every hint.
        </p>
      </div>
      <Scaled scale={0.92} x={600} y={46}>
        <PhoneFrame finish='silver'>
          <QuizHousehold />
        </PhoneFrame>
      </Scaled>
      <Scaled scale={0.92} x={1000} y={46}>
        <PhoneFrame finish='silver'>
          <QuizNeeds />
        </PhoneFrame>
      </Scaled>
    </Canvas>
  );
}

export const scenes = defineScenes([
  { id: 'cover', width: 1440, height: 960, render: () => <Cover /> },
  { id: 'full-packaging', width: 1440, height: 900, render: () => <Packaging /> },
  { id: 'full-letterbox', width: 1440, height: 900, render: () => <Letterbox /> },
  {
    id: 'full-landing',
    width: 1440,
    height: 900,
    render: () => (
      <DesktopOn bg={G.tomato} url='gaaf.nl' label='Home page'>
        <LandingPage />
      </DesktopOn>
    )
  },
  {
    id: 'full-product',
    width: 1440,
    height: 900,
    render: () => (
      <DesktopOn bg={G.cobalt} url='gaaf.nl/shop/tabletten-fresh-mint' label='Product page'>
        <ProductPage />
      </DesktopOn>
    )
  },
  {
    id: 'pair-dashboard-a',
    width: 720,
    height: 900,
    render: () => (
      <PhoneOn bg={G.sand} note='Deliveries: skip one in a tap'>
        <DashboardScreen />
      </PhoneOn>
    )
  },
  {
    id: 'pair-dashboard-b',
    width: 720,
    height: 900,
    render: () => (
      <PhoneOn bg={G.tomato} note='Pause instead of cancel' noteColor='#FFFFFF'>
        <PauseScreen />
      </PhoneOn>
    )
  },
  { id: 'full-quiz', width: 1440, height: 900, render: () => <Quiz /> }
]);
