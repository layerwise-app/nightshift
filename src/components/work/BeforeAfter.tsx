import { useId, useState } from 'react';
import type { Img } from '~/content/types';
import { Picture } from '~/components/site/Picture';

/**
 * Two images stacked; a slider (a real range input, so it works with arrow
 * keys and screen readers) wipes between them.
 */
export function BeforeAfter({
  before,
  after,
  labels = ['Before', 'After']
}: {
  before: Img;
  after: Img;
  labels?: [string, string];
}) {
  const [value, setValue] = useState(50);
  const id = useId();
  return (
    <div className='relative select-none overflow-hidden rounded-[6px] bg-surface'>
      <Picture img={after} sizes='(min-width: 1024px) 80vw, 100vw' />
      <div
        className='absolute inset-0'
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Picture img={before} sizes='(min-width: 1024px) 80vw, 100vw' cover />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-y-0 w-px bg-signal'
        style={{ left: `${value}%` }}
      >
        <span className='absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-signal text-[15px] font-bold text-on-signal shadow-[0_6px_20px_rgba(0,0,0,0.35)]'>
          ↔
        </span>
      </div>
      <span className='label pointer-events-none absolute left-3 top-3 rounded-[3px] bg-bg/85 px-2 py-1 text-ink'>
        {labels[0]}
      </span>
      <span className='label pointer-events-none absolute right-3 top-3 rounded-[3px] bg-bg/85 px-2 py-1 text-ink'>
        {labels[1]}
      </span>
      <label htmlFor={id} className='sr-only'>
        Drag to compare {labels[0].toLowerCase()} and {labels[1].toLowerCase()}
      </label>
      <input
        id={id}
        type='range'
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        data-cursor
        className='absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-0'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 rounded-[6px] ring-2 ring-signal opacity-0 [input:focus-visible~&]:opacity-100'
      />
    </div>
  );
}
