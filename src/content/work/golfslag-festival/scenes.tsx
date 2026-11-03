import type { CSSProperties, ReactNode } from 'react';
import { BrowserFrame, PhoneFrame } from '~/components/frames/frames';
import { defineScenes } from '~/components/frames/scene';
import { display, G, mono, WaveBand, Wordmark } from './brand';
import { QueueFilm } from './film';
import { Dashboard, LandingPage, QueueScreen, ResaleListScreen, ResaleSellScreen, ResaleSoldScreen, WalletScreen } from './screens';

function Phone({ children, x, y, scale, rotate = 0 }: { children: ReactNode; x: number; y: number; scale: number; rotate?: number }) {
  const style: CSSProperties = {
    left: x,
    top: y,
    transform: `scale(${scale}) rotate(${rotate}deg)`,
    transformOrigin: 'top left'
  };
  return (
    <div className='absolute' style={style}>
      <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}

function Tag({ n, children, color = G.ink }: { n: string; children: string; color?: string }) {
  return (
    <p className='text-[15px] font-semibold uppercase tracking-[0.08em]' style={{ fontFamily: mono, color }}>
      <span style={{ color: G.coralDeep }}>{n}</span> · {children}
    </p>
  );
}

export const scenes = defineScenes([
  {
    id: 'cover',
    width: 1440,
    height: 960,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ background: G.coral }}>
        <div className='absolute inset-x-0 bottom-[-8px]'>
          <WaveBand width={1440} rows={3} gap={26} amp={10} color={G.night} stroke={5} />
        </div>
        <div className='absolute left-[96px] top-[84px]'>
          <Wordmark size={34} color={G.night} mark={G.night} />
        </div>
        <p
          className='absolute right-[96px] top-[92px] text-[17px] font-semibold uppercase tracking-[0.1em]'
          style={{ fontFamily: mono, color: G.night }}
        >
          Ticketing platform · 2025
        </p>
        <div className='absolute left-[124px] top-[214px]' style={{ ...display, fontSize: 290, color: G.night, lineHeight: 0.8 }}>
          Golf
          <br />
          slag
        </div>
        <p className='absolute left-[132px] top-[700px] max-w-[520px] text-[26px] font-semibold leading-snug' style={{ color: G.night }}>
          A fair queue, tickets that scan without signal, resale at face value.
        </p>
        <Phone x={736} y={206} scale={0.66} rotate={-6}>
          <QueueScreen ahead={1906} progress={0.56} />
        </Phone>
        <Phone x={1010} y={176} scale={0.66} rotate={5}>
          <WalletScreen seed={41} refresh={18} />
        </Phone>
      </div>
    )
  },
  {
    id: 'full-landing',
    width: 1440,
    height: 900,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ background: G.night }}>
        <div className='absolute inset-x-0 top-[26px] opacity-60'>
          <WaveBand width={1440} rows={3} gap={20} amp={7} color={G.sea} stroke={3} />
        </div>
        <div className='absolute left-[120px] top-[96px]'>
          <BrowserFrame url='golfslag.nl' width={1200} height={860}>
            <LandingPage width={1200} />
          </BrowserFrame>
        </div>
      </div>
    )
  },
  {
    id: 'full-dashboard',
    width: 1440,
    height: 900,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ background: G.sand }}>
        <div className='absolute left-[100px] top-[64px]'>
          <BrowserFrame url='boxoffice.golfslag.nl/live' width={1240} height={800} tone='dark'>
            <Dashboard width={1240} />
          </BrowserFrame>
        </div>
      </div>
    )
  },
  {
    id: 'pair-queue-a',
    width: 720,
    height: 900,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ background: G.night }}>
        <div className='absolute inset-x-0 bottom-[-6px]'>
          <WaveBand width={720} rows={5} gap={22} amp={8} color={G.coral} stroke={4} />
        </div>
        <Phone x={179} y={66} scale={0.88}>
          <QueueScreen ahead={4218} progress={0.08} />
        </Phone>
      </div>
    )
  },
  {
    id: 'pair-wallet-b',
    width: 720,
    height: 900,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ background: G.coral }}>
        <div className='absolute inset-x-0 top-[-6px]'>
          <WaveBand width={720} rows={5} gap={22} amp={8} color={G.night} stroke={4} />
        </div>
        <Phone x={179} y={98} scale={0.88}>
          <WalletScreen seed={77} refresh={23} />
        </Phone>
      </div>
    )
  },
  {
    id: 'full-resale',
    width: 1440,
    height: 900,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ background: G.sand }}>
        {[
          { n: '01', t: 'Sold out? Join the list', x: 160, screen: <ResaleListScreen /> },
          { n: '02', t: 'Sell at what you paid', x: 560, screen: <ResaleSellScreen /> },
          { n: '03', t: 'Paid out in two days', x: 960, screen: <ResaleSoldScreen /> }
        ].map((p) => (
          <div key={p.n}>
            <div className='absolute top-[70px]' style={{ left: p.x }}>
              <Tag n={p.n}>{p.t}</Tag>
            </div>
            <Phone x={p.x} y={128} scale={0.78}>
              {p.screen}
            </Phone>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'queue-poster',
    width: 1440,
    height: 900,
    render: () => <QueueFilm t={420} />
  },
  {
    id: 'video-queue',
    width: 1440,
    height: 900,
    render: () => <QueueFilm />
  }
]);
