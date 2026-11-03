import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { PHONE, PhoneFrame } from '~/components/frames/frames';
import type { Block } from '~/content/types';

type DemoBlock = Extract<Block, { type: 'demo' }>;

// One lazy component per loader, so re-renders never re-import.
const cache = new WeakMap<DemoBlock['load'], LazyExoticComponent<ComponentType>>();
function lazyDemo(load: DemoBlock['load']) {
  let component = cache.get(load);
  if (!component) {
    component = lazy(load);
    cache.set(load, component);
  }
  return component;
}

/**
 * The live demo: the project's real screen component inside a phone drawn in
 * code. The phone scales in fixed steps set in CSS (`--s`), so its size is
 * known before any JavaScript runs and nothing moves when the demo mounts.
 * The screen itself renders on the server too.
 */
export function DemoStage({ block }: { block: DemoBlock }) {
  const Demo = lazyDemo(block.load);
  return (
    <div
      className='demo-stage relative flex w-full items-center justify-center overflow-hidden rounded-[6px] px-4 py-10 md:py-14'
      style={{ background: block.background }}
    >
      <div
        className='relative'
        style={{
          width: `calc(${PHONE.width}px * var(--s))`,
          height: `calc(${PHONE.height}px * var(--s))`
        }}
      >
        <div
          className='absolute left-0 top-0 origin-top-left'
          style={{ transform: 'scale(var(--s))' }}
        >
          <PhoneFrame finish={block.finish}>
            <Suspense fallback={<div className='h-full w-full bg-black' />}>
              <Demo />
            </Suspense>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
