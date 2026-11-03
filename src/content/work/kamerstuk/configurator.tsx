import { useState } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import {
  euro,
  FABRICS,
  Icon,
  K,
  sofaQuote,
  Sofa,
  Swatch,
  ui,
  WIDTHS,
  wide,
  WOODS,
  Wordmark
} from './shared';

export type ConfiguratorState = { wood: string; fabric: string; width: number };

const ring =
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-[#B4552F]';

function Legend({ title, value }: { title: string; value: string }) {
  return (
    <legend className='flex w-full items-baseline justify-between pb-3' style={ui}>
      <span style={{ ...wide(112, 700), fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', color: K.ink }}>{title}</span>
      <span style={{ fontSize: 13, color: K.ink2 }}>{value}</span>
    </legend>
  );
}

/**
 * The Bank Maas configurator on a phone. Wood, fabric and width redraw the
 * sofa and update the price and the workshop's real lead time.
 */
export function Configurator({
  initial = { wood: 'oak', fabric: 'duin', width: 210 },
  interactive = true,
  added: addedInitially = false
}: {
  initial?: ConfiguratorState;
  interactive?: boolean;
  added?: boolean;
}) {
  const [state, setState] = useState<ConfiguratorState>(initial);
  const [cart, setCart] = useState(addedInitially ? 1 : 0);
  const [added, setAdded] = useState(addedInitially);
  const q = sofaQuote(state.wood, state.fabric, state.width);
  const set = (patch: Partial<ConfiguratorState>) => {
    setState((s) => ({ ...s, ...patch }));
    setAdded(false);
  };
  const summary = `${state.width} cm · ${q.wood.short} · ${q.fabric.name}`;

  return (
    <div className='relative h-[844px] w-[390px] overflow-hidden' style={{ ...ui, background: K.paper, color: K.ink }}>
      <PhoneStatusBar tone='dark' time='14:12' className='relative z-20' />
      <div className='relative z-20 flex h-[50px] items-center justify-between px-4' style={{ background: K.paper }}>
        <button type='button' aria-label='Back to sofas' className='flex size-10 items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-[#B4552F]'>
          <Icon name='back' size={22} />
        </button>
        <Wordmark size={15} />
        <button type='button' aria-label={`Cart, ${cart} ${cart === 1 ? 'item' : 'items'}`} className='relative flex size-10 items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-[#B4552F]'>
          <Icon name='cart' size={22} />
          {cart > 0 ? (
            <span className='absolute right-0.5 top-0.5 flex size-[18px] items-center justify-center rounded-full text-[10.5px] font-semibold' style={{ background: K.terracotta, color: K.white }}>
              {cart}
            </span>
          ) : null}
        </button>
      </div>

      <div className='absolute inset-x-0 bottom-[92px] top-[94px] overflow-y-auto overscroll-contain'>
        <div className='sticky top-0 z-10 px-4 pb-3 pt-3' style={{ background: K.sand }}>
          <p className='text-[11.5px]' style={{ color: K.ink2 }}>
            Sofas <span style={{ color: K.ink3 }}>/</span> Bank Maas
          </p>
          <div className='flex h-[168px] items-end justify-center [&_polygon]:transition-[fill] [&_polygon]:duration-300 [&_rect]:transition-[fill] [&_rect]:duration-300'>
            <Sofa width={state.width} wood={q.wood.color} fabric={q.fabric.color} texture={q.fabric.texture} frameWidth={300} className='w-full' title={`Drawing of Bank Maas, ${summary}`} />
          </div>
          <div className='mx-auto -mt-1 flex items-center gap-2 text-[11px]' style={{ width: `${(state.width / 300) * 100}%`, color: K.ink2 }} aria-hidden='true'>
            <span className='h-[7px] w-px' style={{ background: K.ink2 }} />
            <span className='h-px flex-1' style={{ background: K.ink3 }} />
            <span className='tabular-nums'>{state.width} cm</span>
            <span className='h-px flex-1' style={{ background: K.ink3 }} />
            <span className='h-[7px] w-px' style={{ background: K.ink2 }} />
          </div>
          <p className='mt-3 flex items-center gap-1.5 text-[11px]' style={{ color: K.ink2 }}>
            <span className='size-[6px] rounded-full' style={{ background: K.terracotta }} />
            Drawn to order: this is the exact sofa on your order.
          </p>
        </div>

        <div className='px-4 pt-5'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <h2 style={{ ...wide(120, 780), fontSize: 28, lineHeight: 1 }}>Bank Maas</h2>
              <p className='mt-1.5 text-[13.5px]' style={{ color: K.ink2 }}>
                {q.width.seats}-seat sofa, {q.wood.short.toLowerCase()} base
              </p>
            </div>
            <p className='text-right tabular-nums' style={{ ...wide(110, 700), fontSize: 22 }} aria-hidden='true'>
              {euro(q.price)}
            </p>
          </div>

          <div className='mt-4 rounded-[10px] border p-3' style={{ borderColor: K.line, background: K.white }}>
            <div className='flex items-center justify-between text-[12.5px]'>
              <span>
                Made in <strong className='font-semibold'>Dordrecht</strong> by Werkplaats Van Rijn
              </span>
            </div>
            <div className='mt-2.5 flex items-center gap-[3px]' aria-hidden='true'>
              {Array.from({ length: 13 }, (_, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed week grid
                  key={i}
                  className='h-[14px] flex-1 rounded-[2px] transition-colors duration-300'
                  style={{ background: i < q.weeks ? K.terracotta : K.sand }}
                />
              ))}
            </div>
            <p className='mt-2 flex justify-between text-[12px]' style={{ color: K.ink2 }}>
              <span>
                Ready in <strong className='font-semibold' style={{ color: K.ink }}>{q.weeks} weeks</strong>
              </span>
              <span>from the workshop’s order book</span>
            </p>
          </div>

          <fieldset className='mt-6' disabled={!interactive}>
            <Legend title='Wood' value={q.wood.name} />
            <div className='grid grid-cols-4 gap-2'>
              {WOODS.map((w) => (
                <label key={w.id} className='flex cursor-pointer flex-col items-center gap-1.5 text-center'>
                  <input type='radio' name='wood' value={w.id} checked={state.wood === w.id} onChange={() => set({ wood: w.id })} className='peer sr-only' />
                  <span className={`rounded-full p-[3px] ${ring}`} style={{ boxShadow: state.wood === w.id ? `0 0 0 2px ${K.ink}` : `0 0 0 1px ${K.line}` }}>
                    <Swatch color={w.color} size={40} grain />
                  </span>
                  <span className='text-[11.5px] leading-tight'>{w.short}</span>
                  <span className='text-[10.5px] tabular-nums' style={{ color: K.ink3 }}>{w.surcharge ? `+${euro(w.surcharge)}` : 'incl.'}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className='mt-6' disabled={!interactive}>
            <Legend title='Fabric' value={q.fabric.name} />
            <div className='grid grid-cols-5 gap-1.5'>
              {FABRICS.map((f) => (
                <label key={f.id} className='flex cursor-pointer flex-col items-center gap-1.5 text-center'>
                  <input type='radio' name='fabric' value={f.id} checked={state.fabric === f.id} onChange={() => set({ fabric: f.id })} className='peer sr-only' />
                  <span className={`rounded-[8px] p-[3px] ${ring}`} style={{ boxShadow: state.fabric === f.id ? `0 0 0 2px ${K.ink}` : `0 0 0 1px ${K.line}` }}>
                    <span className='block overflow-hidden rounded-[5px]'>
                      <Swatch color={f.color} texture={f.texture} size={50} round={false} />
                    </span>
                  </span>
                  <span className='text-[10.5px] leading-tight'>{f.name.split(' ')[1]}</span>
                  <span className='text-[10px] tabular-nums' style={{ color: K.ink3 }}>{f.surcharge ? `+${euro(f.surcharge)}` : 'incl.'}</span>
                </label>
              ))}
            </div>
            <p className='mt-2.5 text-[11.5px]' style={{ color: K.ink2 }}>
              {q.fabric.material}, woven by {q.fabric.mill}.
            </p>
          </fieldset>

          <fieldset className='mt-6' disabled={!interactive}>
            <Legend title='Width' value={`${q.width.seats} seats`} />
            <div className='grid grid-cols-3 rounded-[10px] p-1' style={{ background: K.sand }}>
              {WIDTHS.map((w) => (
                <label key={w.cm} className='relative cursor-pointer'>
                  <input type='radio' name='width' value={w.cm} checked={state.width === w.cm} onChange={() => set({ width: w.cm })} className='peer sr-only' />
                  <span
                    className={`flex h-[44px] flex-col items-center justify-center rounded-[7px] transition-colors ${ring}`}
                    style={{ background: state.width === w.cm ? K.white : 'transparent', boxShadow: state.width === w.cm ? '0 1px 3px rgba(0,0,0,0.12)' : 'none' }}
                  >
                    <span className='text-[14px] font-semibold tabular-nums'>{w.cm} cm</span>
                    <span className='text-[10.5px] tabular-nums' style={{ color: K.ink3 }}>{euro(w.price)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <dl className='mt-6 grid grid-cols-2 gap-y-2 border-t pb-6 pt-4 text-[12.5px]' style={{ borderColor: K.line }}>
            <dt style={{ color: K.ink2 }}>W × D × H</dt>
            <dd className='text-right tabular-nums'>{state.width} × 92 × 76 cm</dd>
            <dt style={{ color: K.ink2 }}>Seat height</dt>
            <dd className='text-right'>44 cm</dd>
            <dt style={{ color: K.ink2 }}>Covers</dt>
            <dd className='text-right'>Removable, dry clean</dd>
            <dt style={{ color: K.ink2 }}>Frame guarantee</dt>
            <dd className='text-right'>10 years</dd>
          </dl>
        </div>
      </div>

      {added ? (
        <div role='status' className='absolute inset-x-3 bottom-[100px] z-30 flex items-center gap-3 rounded-[12px] px-3.5 py-3 text-[12.5px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]' style={{ background: K.ink, color: K.paper }}>
          <span className='flex size-7 shrink-0 items-center justify-center rounded-full' style={{ background: K.moss }}>
            <Icon name='check' size={16} color={K.paper} />
          </span>
          <span className='min-w-0 flex-1 leading-snug'>
            <strong className='font-semibold'>Bank Maas added.</strong> {summary}
          </span>
          <span className='shrink-0 underline underline-offset-2'>View cart</span>
        </div>
      ) : null}

      <div className='absolute inset-x-0 bottom-0 z-20 border-t px-4 pb-[26px] pt-3' style={{ borderColor: K.line, background: K.paper }}>
        <div className='flex items-center gap-3'>
          <div className='min-w-0 flex-1'>
            <p className='tabular-nums' style={{ ...wide(110, 720), fontSize: 20, lineHeight: 1.1 }}>{euro(q.price)}</p>
            <p className='truncate text-[11.5px]' style={{ color: K.ink2 }}>Delivered and assembled · {q.weeks} wks</p>
          </div>
          <button
            type='button'
            disabled={!interactive}
            onClick={() => {
              setCart((c) => c + 1);
              setAdded(true);
            }}
            className='flex h-[48px] shrink-0 items-center gap-2 rounded-full px-5 text-[14.5px] font-semibold outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D1C1A]'
            style={{ background: added ? K.moss : K.terracotta, color: K.white }}
          >
            {added ? <Icon name='check' size={18} color={K.white} /> : null}
            {added ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </div>

      <p className='sr-only' aria-live='polite'>
        Bank Maas, {summary}: {euro(q.price)}, ready in {q.weeks} weeks.
      </p>
    </div>
  );
}
