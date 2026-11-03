import type { ReactNode } from 'react';
import { BrowserFrame, PhoneFrame } from '~/components/frames/frames';
import { defineScenes } from '~/components/frames/scene';
import { Configurator } from './configurator';
import {
  CartScreen,
  CataloguePDF,
  CollectionPage,
  DeliveryScreen,
  MaterialsPage,
  ProductPage,
  RenderSheet,
  ShowroomPage,
  WorkshopPage
} from './screens';
import { FABRICS, K, shade, Sofa, sofaQuote, Swatch, ui, wide, WOODS, Wordmark } from './shared';

function Phone({ children, scale, left, top }: { children: ReactNode; scale: number; left: number; top: number }) {
  return (
    <div className='absolute origin-top-left' style={{ left, top, transform: `scale(${scale})` }}>
      <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}

function SampleCard({ name, n, color, texture, rotate, left, top, grain }: { name: string; n: number; color: string; texture?: 'boucle' | 'linen' | 'cord' | 'herringbone' | 'canvas'; rotate: number; left: number; top: number; grain?: boolean }) {
  return (
    <div
      className='absolute w-[200px] rounded-[4px] p-3 shadow-[0_24px_40px_-18px_rgba(0,0,0,0.45)]'
      style={{ ...ui, left, top, transform: `rotate(${rotate}deg)`, background: K.white, color: K.ink }}
    >
      <div className='flex items-center justify-between'>
        <Wordmark size={10} />
        <span className='size-3 rounded-full' style={{ background: K.oak, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.35)' }} />
      </div>
      <div className='mt-3 overflow-hidden rounded-[2px]'>
        <Swatch color={color} texture={texture} grain={grain} size={176} round={false} />
      </div>
      <p className='mt-2.5 text-[14px] font-semibold'>{name}</p>
      <p className='text-[11px]' style={{ color: K.ink2 }}>Sample {n} · keep it, it’s yours</p>
    </div>
  );
}

const combos: [string, string, number][] = [
  ['oak', 'duin', 180],
  ['walnut', 'mos', 210],
  ['black', 'klei', 240]
];

export const scenes = defineScenes([
  {
    id: 'cover',
    width: 1440,
    height: 960,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ ...ui, background: K.sand, color: K.ink }}>
        <div className='absolute bottom-0 right-0 top-0 w-[560px]' style={{ background: K.terracotta }} />
        <div className='absolute left-[96px] top-[150px]'>
          <Wordmark size={22} />
          <p className='mt-12' style={{ ...wide(125, 830), fontSize: 82, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            Every sofa,
            <br />
            drawn before
            <br />
            it’s made.
          </p>
        </div>
        <div className='absolute left-[96px] top-[520px] flex w-[770px] items-end gap-5'>
          {combos.map(([w, f, cm]) => {
            const q = sofaQuote(w, f, cm);
            return (
              <div key={w} className='flex-1'>
                <div className='flex h-[180px] items-end'>
                  <Sofa width={cm} wood={q.wood.color} fabric={q.fabric.color} texture={q.fabric.texture} frameWidth={300} className='w-full' />
                </div>
                <div className='mt-2 border-t pt-2 text-[14px]' style={{ borderColor: K.ink }}>
                  <p className='font-semibold tabular-nums'>{cm} cm · {q.wood.short}</p>
                  <p style={{ color: K.ink2 }}>{q.fabric.name} · {q.weeks} wks</p>
                </div>
              </div>
            );
          })}
        </div>
        <Phone scale={0.84} left={1000} top={118}>
          <Configurator initial={{ wood: 'walnut', fabric: 'mos', width: 210 }} interactive={false} />
        </Phone>
      </div>
    )
  },
  {
    id: 'full-collection',
    width: 1440,
    height: 900,
    render: () => (
      <div className='relative h-full w-full' style={{ background: K.ink }}>
        <BrowserFrame url='kamerstuk.nl/collection' width={1280} height={758} style={{ position: 'absolute', left: 80, top: 50 }}>
          <CollectionPage />
        </BrowserFrame>
      </div>
    )
  },
  {
    id: 'full-renders',
    width: 1440,
    height: 900,
    render: () => <RenderSheet />
  },
  {
    id: 'full-materials',
    width: 1440,
    height: 900,
    render: () => (
      <div className='relative h-full w-full overflow-hidden' style={{ background: K.oak }}>
        <BrowserFrame url='kamerstuk.nl/materials' width={1140} height={720} style={{ position: 'absolute', left: 260, top: 90 }}>
          <MaterialsPage width={1140} height={720} />
        </BrowserFrame>
        <SampleCard name='Corduroy Mos' n={14} color={FABRICS[2].color} texture='cord' rotate={-6} left={34} top={150} />
        <SampleCard name='Walnut' n={3} color={WOODS[2].color} grain rotate={3.5} left={58} top={486} />
      </div>
    )
  },
  {
    id: 'full-workshop',
    width: 1440,
    height: 900,
    render: () => (
      <div className='relative h-full w-full' style={{ background: K.moss }}>
        <BrowserFrame url='kamerstuk.nl/workshops/van-rijn' width={1280} height={758} style={{ position: 'absolute', left: 80, top: 50 }}>
          <WorkshopPage />
        </BrowserFrame>
      </div>
    )
  },
  {
    id: 'full-showroom',
    width: 1440,
    height: 900,
    render: () => (
      <div className='relative h-full w-full' style={{ background: K.terracotta }}>
        <BrowserFrame url='kamerstuk.nl/showroom' width={1280} height={758} style={{ position: 'absolute', left: 80, top: 50 }}>
          <ShowroomPage />
        </BrowserFrame>
      </div>
    )
  },
  {
    id: 'pair-cart-a',
    width: 720,
    height: 900,
    render: () => (
      <div className='relative h-full w-full' style={{ background: K.terracotta }}>
        <Phone scale={0.92} left={(720 - 412 * 0.92) / 2} top={(900 - 866 * 0.92) / 2}>
          <CartScreen />
        </Phone>
      </div>
    )
  },
  {
    id: 'pair-cart-b',
    width: 720,
    height: 900,
    render: () => (
      <div className='relative h-full w-full' style={{ background: shade(K.moss, -0.08) }}>
        <Phone scale={0.92} left={(720 - 412 * 0.92) / 2} top={(900 - 866 * 0.92) / 2}>
          <DeliveryScreen />
        </Phone>
      </div>
    )
  },
  {
    id: 'before-catalogue',
    width: 1440,
    height: 900,
    render: () => <CataloguePDF />
  },
  {
    id: 'after-product',
    width: 1440,
    height: 900,
    render: () => (
      <BrowserFrame url='kamerstuk.nl/sofas/bank-maas' width={1440} height={858} style={{ borderRadius: 0, boxShadow: 'none' }}>
        <ProductPage width={1440} height={858} />
      </BrowserFrame>
    )
  }
]);
