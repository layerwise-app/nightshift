import type { ReactNode } from 'react';
import { BrowserFrame, PhoneFrame } from '~/components/frames/frames';
import { defineScenes } from '~/components/frames/scene';
import { SupervisorApp } from './demo';
import { AnimatedFleetMap, AssetPage, CertificatesPage, FleetMapPage, OrdersPage, OverviewPage } from './screens';
import { C, mono, sans } from './ui';

const URL = 'werkplaats.ankerveld.nl';

function Field({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div className='absolute inset-0 overflow-hidden' style={{ background: bg, fontFamily: sans }}>
      {children}
    </div>
  );
}

function Desktop({ bg, tone = 'light', page }: { bg: string; tone?: 'light' | 'dark'; page: ReactNode }) {
  return (
    <Field bg={bg}>
      <div className='absolute' style={{ left: 80, top: 64 }}>
        <BrowserFrame url={URL} width={1280} height={800} tone={tone}>
          {page}
        </BrowserFrame>
      </div>
    </Field>
  );
}

function Phone({ bg, children, caption }: { bg: string; children: ReactNode; caption?: string }) {
  return (
    <Field bg={bg}>
      <div className='absolute origin-top-left' style={{ left: 168, top: 40, transform: 'scale(0.93)' }}>
        <PhoneFrame>{children}</PhoneFrame>
      </div>
      {caption ? (
        <p className='absolute bottom-[18px] left-0 right-0 text-center' style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.1em', color: bg === C.amber ? C.navy : '#9FB3C2' }}>
          {caption}
        </p>
      ) : null}
    </Field>
  );
}

export const scenes = defineScenes([
  {
    id: 'cover',
    width: 1440,
    height: 960,
    render: () => (
      <Field bg={C.navy}>
        <div className='absolute inset-y-0 right-0' style={{ width: 400, background: C.amber }} />
        <div className='absolute' style={{ left: 120, top: 92, fontFamily: mono, fontSize: 14, letterSpacing: '0.14em', color: '#9FB3C2' }}>
          ANKERVELD WERKPLAATS · 7 COMPANIES · 1 PORTAL
        </div>
        <div className='absolute origin-top-left' style={{ left: 120, top: 170, transform: 'scale(0.78)' }}>
          <BrowserFrame url={URL} width={1280} height={800}>
            <OverviewPage />
          </BrowserFrame>
        </div>
        <div className='absolute origin-top-left' style={{ left: 984, top: 132, transform: 'scale(0.8)' }}>
          <PhoneFrame>
            <SupervisorApp />
          </PhoneFrame>
        </div>
      </Field>
    )
  },
  {
    id: 'full-overview',
    width: 1440,
    height: 900,
    render: () => <Desktop bg='#D5DDE2' page={<OverviewPage />} />
  },
  {
    id: 'full-certificates',
    width: 1440,
    height: 900,
    render: () => <Desktop bg={C.navy} tone='dark' page={<CertificatesPage />} />
  },
  {
    id: 'full-asset',
    width: 1440,
    height: 900,
    render: () => <Desktop bg={C.amber} page={<AssetPage />} />
  },
  {
    id: 'full-orders',
    width: 1440,
    height: 900,
    render: () => <Desktop bg={C.navy2} tone='dark' page={<OrdersPage />} />
  },
  {
    id: 'pair-phones-a',
    width: 720,
    height: 900,
    render: () => (
      <Phone bg={C.amber} caption='ASSET LIST · 10 ASSETS, STEIGER 1–6'>
        <SupervisorApp />
      </Phone>
    )
  },
  {
    id: 'pair-phones-b',
    width: 720,
    height: 900,
    render: () => (
      <Phone bg={C.navy} caption='REPORTING A FAULT · TWO TAPS AND SEND'>
        <SupervisorApp initialAssetId='TK-1180' initialReport={{ type: 'damage', stop: true }} />
      </Phone>
    )
  },
  {
    id: 'fleet-poster',
    width: 1440,
    height: 900,
    render: () => <Desktop bg={C.navy3} tone='dark' page={<FleetMapPage />} />
  },
  {
    id: 'video-fleet',
    width: 1440,
    height: 900,
    render: () => <Desktop bg={C.navy3} tone='dark' page={<AnimatedFleetMap />} />
  }
]);
