import type { ReactNode } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import {
  Armchair,
  Bed,
  Chair,
  CoffeeTable,
  euro,
  FABRICS,
  Icon,
  K,
  LeadChip,
  shade,
  Sideboard,
  Sofa,
  sofaQuote,
  Stool,
  Swatch,
  Table,
  type Texture,
  ui,
  WIDTHS,
  wide,
  WOODS,
  Wordmark,
  WORKSHOPS
} from './shared';

/* ------------------------------------------------------------- desktop */

function Page({ width, height, children, bg = K.paper }: { width: number; height: number; children: ReactNode; bg?: string }) {
  return (
    <div className='relative overflow-hidden' style={{ ...ui, width, height, background: bg, color: K.ink }}>
      {children}
    </div>
  );
}

const NAV = ['Collection', 'Materials', 'Workshops', 'Showroom', 'Journal'];

export function DesktopNav({ active, cart = 0 }: { active?: string; cart?: number }) {
  return (
    <div className='flex h-[66px] items-center border-b px-10' style={{ borderColor: K.line, background: K.paper }}>
      <Wordmark size={19} />
      <nav className='ml-14 flex gap-8 text-[14px]'>
        {NAV.map((item) => (
          <span key={item} className='relative py-1' style={{ color: item === active ? K.ink : K.ink2, fontWeight: item === active ? 600 : 450 }}>
            {item}
            {item === active ? <span className='absolute inset-x-0 -bottom-[3px] h-[2px]' style={{ background: K.terracotta }} /> : null}
          </span>
        ))}
      </nav>
      <div className='ml-auto flex items-center gap-6 text-[13px]' style={{ color: K.ink2 }}>
        <span className='flex items-center gap-2'>
          <span className='size-[7px] rounded-full' style={{ background: K.moss }} />
          Nieuwe Binnenweg 212 · open today 10–18
        </span>
        <Icon name='search' size={19} color={K.ink} />
        <span className='relative'>
          <Icon name='cart' size={21} color={K.ink} />
          {cart ? (
            <span className='absolute -right-2 -top-1.5 flex size-[17px] items-center justify-center rounded-full text-[10px] font-semibold' style={{ background: K.terracotta, color: K.white }}>
              {cart}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}

type Product = { name: string; type: string; from: number; workshop: string; city: string; weeks: number; draw: ReactNode; tone?: string };

export const PRODUCTS: Product[] = [
  { name: 'Bank Maas', type: 'Sofa, 2–3 seats', from: 2890, workshop: 'Werkplaats Van Rijn', city: 'Dordrecht', weeks: 7, draw: <Sofa width={210} wood={WOODS[0].color} fabric={FABRICS[0].color} texture='boucle' className='w-[86%]' /> },
  { name: 'Tafel Delfshaven', type: 'Dining table', from: 2150, workshop: 'Houtatelier Brink', city: 'Zwolle', weeks: 6, draw: <Table length={200} wood={WOODS[1].color} className='w-[84%]' /> },
  { name: 'Stoel Kralingen', type: 'Dining chair', from: 545, workshop: 'Stoelmakerij De Kruk', city: 'Tilburg', weeks: 5, draw: <Chair wood={WOODS[0].color} seat={FABRICS[1].color} texture='linen' className='h-[78%]' /> },
  { name: 'Kast Veerhaven', type: 'Sideboard, 4 doors', from: 2680, workshop: 'Kastenmakers Oost', city: 'Enschede', weeks: 9, draw: <Sideboard wood={WOODS[2].color} className='w-[84%]' /> },
  { name: 'Fauteuil Schie', type: 'Armchair', from: 1460, workshop: 'Stoffeerderij Bos', city: 'Gouda', weeks: 6, draw: <Armchair wood={WOODS[0].color} fabric={FABRICS[2].color} texture='cord' className='h-[72%]' /> },
  { name: 'Kruk Kop van Zuid', type: 'Stool, 46 or 66 cm', from: 265, workshop: 'Draaierij Mol', city: 'Deventer', weeks: 3, draw: <Stool wood={WOODS[3].color} className='h-[64%]' /> },
  { name: 'Bed Noordereiland', type: 'Bed, 140–180 cm', from: 1940, workshop: 'Werkplaats Noordkade', city: 'Veghel', weeks: 8, draw: <Bed wood={WOODS[0].color} linen={FABRICS[4].color} className='w-[82%]' /> },
  { name: 'Salontafel Rijnhaven', type: 'Coffee table', from: 890, workshop: 'Atelier Veenstra', city: 'Leeuwarden', weeks: 5, draw: <CoffeeTable wood={WOODS[2].color} className='w-[74%]' /> }
];

function ProductCard({ p, height = 250 }: { p: Product; height?: number }) {
  return (
    <div>
      <div className='relative flex items-end justify-center overflow-hidden rounded-[4px] pb-4' style={{ height, background: K.sand }}>
        {p.draw}
        <span className='absolute right-3 top-3'>
          <Icon name='heart' size={18} color={K.ink2} />
        </span>
      </div>
      <div className='mt-3 flex items-start justify-between gap-2'>
        <div>
          <p style={{ ...wide(114, 700), fontSize: 16 }}>{p.name}</p>
          <p className='mt-0.5 text-[13px]' style={{ color: K.ink2 }}>{p.type}</p>
        </div>
        <p className='text-[14px] tabular-nums'>from {euro(p.from)}</p>
      </div>
      <div className='mt-2.5 flex items-center justify-between'>
        <LeadChip weeks={p.weeks} />
        <span className='text-[12px]' style={{ color: K.ink3 }}>{p.workshop}, {p.city}</span>
      </div>
    </div>
  );
}

export function CollectionPage({ width = 1280, height = 758 }: { width?: number; height?: number }) {
  const chips = [['All', 34], ['Sofas', 6], ['Chairs', 8], ['Tables', 7], ['Storage', 5], ['Beds', 3], ['Small pieces', 5]] as const;
  return (
    <Page width={width} height={height}>
      <DesktopNav active='Collection' cart={2} />
      <div className='px-10 pt-7'>
        <div className='flex items-end justify-between gap-10'>
          <h1 style={{ ...wide(125, 820), fontSize: 52, lineHeight: 0.92 }}>Collection</h1>
          <p className='max-w-[520px] text-[14px] leading-relaxed' style={{ color: K.ink2 }}>
            34 pieces from nine Dutch workshops. Each one is made after you order it, and every lead time on this page comes from the workshop’s own order book.
          </p>
        </div>
        <div className='mt-6 flex items-center justify-between border-y py-3' style={{ borderColor: K.line }}>
          <div className='flex gap-2'>
            {chips.map(([label, n], i) => (
              <span key={label} className='rounded-full px-3.5 py-1.5 text-[13px]' style={{ background: i === 0 ? K.ink : 'transparent', color: i === 0 ? K.paper : K.ink, border: `1px solid ${i === 0 ? K.ink : K.line}` }}>
                {label} <span style={{ opacity: 0.55 }}>{n}</span>
              </span>
            ))}
          </div>
          <div className='flex gap-6 text-[13px]' style={{ color: K.ink2 }}>
            <span>Ready within <strong style={{ color: K.ink }} className='font-semibold'>any time</strong> ▾</span>
            <span>Wood <strong style={{ color: K.ink }} className='font-semibold'>all</strong> ▾</span>
            <span>Sort <strong style={{ color: K.ink }} className='font-semibold'>workshop</strong> ▾</span>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-4 gap-x-6 gap-y-6'>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} p={p} height={158} />
          ))}
        </div>
      </div>
    </Page>
  );
}

function Dim({ label, vertical }: { label: string; vertical?: boolean }) {
  return vertical ? (
    <div className='flex h-full flex-col items-center gap-2 text-[12px]' style={{ color: K.ink2 }}>
      <span className='h-px w-[7px]' style={{ background: K.ink2 }} />
      <span className='w-px flex-1' style={{ background: K.ink3 }} />
      <span className='tabular-nums [writing-mode:vertical-rl]'>{label}</span>
      <span className='w-px flex-1' style={{ background: K.ink3 }} />
      <span className='h-px w-[7px]' style={{ background: K.ink2 }} />
    </div>
  ) : (
    <div className='flex w-full items-center gap-2 text-[12px]' style={{ color: K.ink2 }}>
      <span className='h-[7px] w-px' style={{ background: K.ink2 }} />
      <span className='h-px flex-1' style={{ background: K.ink3 }} />
      <span className='tabular-nums'>{label}</span>
      <span className='h-px flex-1' style={{ background: K.ink3 }} />
      <span className='h-[7px] w-px' style={{ background: K.ink2 }} />
    </div>
  );
}

function OptionRow({ title, value, children }: { title: string; value: string; children: ReactNode }) {
  return (
    <div className='border-t pt-4' style={{ borderColor: K.line }}>
      <div className='mb-3 flex justify-between text-[13px]'>
        <span style={{ ...wide(112, 700), fontSize: 12.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{title}</span>
        <span style={{ color: K.ink2 }}>{value}</span>
      </div>
      {children}
    </div>
  );
}

export function ProductPage({ width = 1280, height = 758, wood = 'walnut', fabric = 'mos', cm = 240 }: { width?: number; height?: number; wood?: string; fabric?: string; cm?: number }) {
  const q = sofaQuote(wood, fabric, cm);
  return (
    <Page width={width} height={height}>
      <DesktopNav active='Collection' cart={1} />
      <div className='flex gap-10 px-10 pt-7'>
        <div className='min-w-0 flex-1'>
          <div className='relative rounded-[4px] px-10 pb-8 pt-6' style={{ background: K.sand, height: 486 }}>
            <div className='flex items-center justify-between text-[12.5px]' style={{ color: K.ink2 }}>
              <span className='flex gap-1 rounded-full p-1' style={{ background: K.sand2 }}>
                <span className='rounded-full px-3 py-1' style={{ background: K.white, color: K.ink }}>Three-quarter</span>
                <span className='px-3 py-1'>Front</span>
                <span className='px-3 py-1'>In a 4 × 5 m room</span>
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='size-[6px] rounded-full' style={{ background: K.terracotta }} />
                Drawn to order from 38 parts, redrawn with every choice
              </span>
            </div>
            <div className='mt-2 flex h-[360px] items-end gap-4'>
              <div className='flex flex-1 flex-col items-center'>
                <Sofa width={q.width.cm} wood={q.wood.color} fabric={q.fabric.color} texture={q.fabric.texture} frameWidth={300} className='w-full' />
                <div style={{ width: `${(q.width.cm / 300) * 100}%` }}>
                  <Dim label={`${q.width.cm} cm`} />
                </div>
              </div>
              <div className='h-[150px] pb-6'>
                <Dim vertical label='76 cm' />
              </div>
            </div>
          </div>
          <div className='mt-4 grid grid-cols-4 gap-4'>
            {[
              { t: q.wood.name, s: q.wood.origin, sw: <Swatch color={q.wood.color} size={86} round={false} grain /> },
              { t: q.fabric.name, s: `${q.fabric.material}, ${q.fabric.mill}`, sw: <Swatch color={q.fabric.color} texture={q.fabric.texture} size={86} round={false} /> },
              { t: 'Webbed seat', s: 'Jute webbing, pocket springs, wool top', sw: <Swatch color='#C9B48E' texture='canvas' size={86} round={false} /> },
              { t: 'Removable covers', s: 'Zipped, dry clean or replace', sw: <Swatch color={shade(q.fabric.color, 0.1)} texture={q.fabric.texture} size={86} round={false} /> }
            ].map((tile) => (
              <div key={tile.t} className='flex items-center gap-3 rounded-[4px] border p-2.5' style={{ borderColor: K.line, background: K.white }}>
                <span className='overflow-hidden rounded-[3px]'>{tile.sw}</span>
                <span className='min-w-0'>
                  <span className='block text-[13px] font-semibold leading-tight'>{tile.t}</span>
                  <span className='mt-1 block text-[11.5px] leading-snug' style={{ color: K.ink2 }}>{tile.s}</span>
                </span>
              </div>
            ))}
          </div>
          {height >= 820 ? (
            <div className='mt-5 grid grid-cols-4 border-t' style={{ borderColor: K.line }}>
              {[
                ['Pay 30% now', 'The rest when the workshop says it’s ready.'],
                ['Change your mind', 'Free until the frame is cut, usually in week 2.'],
                ['Our own van', 'Two people deliver, assemble, and take the packaging.'],
                ['10-year frame guarantee', 'Covers replaced by the same workshop.']
              ].map(([t, d], i) => (
                <div key={t} className='py-4 pr-4' style={{ paddingLeft: i ? 16 : 0, borderLeft: i ? `1px solid ${K.line}` : undefined }}>
                  <p className='text-[13px] font-semibold'>{t}</p>
                  <p className='mt-1 text-[12px] leading-snug' style={{ color: K.ink2 }}>{d}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className='w-[440px] shrink-0'>
          <p className='text-[12.5px]' style={{ color: K.ink2 }}>Collection / Sofas</p>
          <h1 className='mt-2' style={{ ...wide(125, 820), fontSize: 52, lineHeight: 0.95 }}>Bank Maas</h1>
          <div className='mt-3 flex items-baseline justify-between'>
            <p className='text-[15px]' style={{ color: K.ink2 }}>{q.width.seats}-seat sofa on a solid {q.wood.short.toLowerCase()} base</p>
            <p className='tabular-nums' style={{ ...wide(110, 720), fontSize: 26 }}>{euro(q.price)}</p>
          </div>
          <div className='mt-5 rounded-[6px] border p-3.5' style={{ borderColor: K.line, background: K.white }}>
            <p className='text-[13px]'>Made in <strong className='font-semibold'>Dordrecht</strong> by Werkplaats Van Rijn, six makers since 1987</p>
            <div className='mt-2.5 flex gap-[3px]'>
              {Array.from({ length: 14 }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed week grid
                <span key={i} className='h-[12px] flex-1 rounded-[2px]' style={{ background: i < q.weeks ? K.terracotta : K.sand }} />
              ))}
            </div>
            <p className='mt-2 flex justify-between text-[12.5px]' style={{ color: K.ink2 }}>
              <span>Ready in <strong style={{ color: K.ink }}>{q.weeks} weeks</strong></span>
              <span>Walnut adds 2 weeks</span>
            </p>
          </div>
          <div className='mt-5 space-y-4'>
            <OptionRow title='Wood' value={q.wood.name}>
              <div className='flex gap-3'>
                {WOODS.map((w) => (
                  <span key={w.id} className='flex flex-col items-center gap-1'>
                    <span className='rounded-full p-[3px]' style={{ boxShadow: w.id === wood ? `0 0 0 2px ${K.ink}` : `0 0 0 1px ${K.line}` }}>
                      <Swatch color={w.color} size={34} grain />
                    </span>
                    <span className='text-[11px]' style={{ color: K.ink3 }}>{w.surcharge ? `+${euro(w.surcharge)}` : 'incl.'}</span>
                  </span>
                ))}
              </div>
            </OptionRow>
            <OptionRow title='Fabric' value={`${q.fabric.name} +${euro(q.fabric.surcharge)}`}>
              <div className='flex gap-2.5'>
                {FABRICS.map((f) => (
                  <span key={f.id} className='rounded-[7px] p-[3px]' style={{ boxShadow: f.id === fabric ? `0 0 0 2px ${K.ink}` : `0 0 0 1px ${K.line}` }}>
                    <span className='block overflow-hidden rounded-[4px]'>
                      <Swatch color={f.color} texture={f.texture} size={40} round={false} />
                    </span>
                  </span>
                ))}
              </div>
            </OptionRow>
            <OptionRow title='Width' value={`${q.width.seats} seats`}>
              <div className='grid grid-cols-3 gap-1 rounded-[8px] p-1' style={{ background: K.sand }}>
                {WIDTHS.map((w) => (
                  <span key={w.cm} className='rounded-[6px] py-2 text-center text-[13px] font-semibold tabular-nums' style={{ background: w.cm === cm ? K.white : 'transparent' }}>
                    {w.cm} cm
                  </span>
                ))}
              </div>
            </OptionRow>
          </div>
          <div className='mt-5 flex gap-2'>
            <span className='flex h-[48px] flex-1 items-center justify-center rounded-full text-[14.5px] font-semibold' style={{ background: K.terracotta, color: K.white }}>
              Add to cart · {euro(q.price)}
            </span>
            <span className='flex h-[48px] items-center justify-center rounded-full border px-5 text-[14px]' style={{ borderColor: K.ink }}>
              Sit on it first
            </span>
          </div>
          <p className='mt-3 flex items-center gap-2 text-[12.5px]' style={{ color: K.ink2 }}>
            <Icon name='truck' size={16} color={K.ink2} /> Delivered and assembled by our own van, Tue and Fri in Rotterdam
          </p>
        </div>
      </div>
    </Page>
  );
}

const MORE_FABRICS: { name: string; material: string; color: string; texture: Texture; surcharge: number; mill: string }[] = [
  ...FABRICS.map((f) => ({ name: f.name, material: f.material, color: f.color, texture: f.texture, surcharge: f.surcharge, mill: f.mill })),
  { name: 'Velvet Nacht', material: 'Cotton velvet', color: '#2E3344', texture: 'canvas', surcharge: 290, mill: 'Weverij Noord, Groningen' },
  { name: 'Felt Roest', material: 'Boiled wool', color: '#94492D', texture: 'boucle', surcharge: 260, mill: 'De Ploeg, Tilburg' },
  { name: 'Linen Zand', material: 'Washed linen', color: '#CDB892', texture: 'linen', surcharge: 120, mill: 'Linnenhuis, Twente' }
];

export function MaterialsPage({ width = 1280, height = 758 }: { width?: number; height?: number }) {
  const tray = [MORE_FABRICS[2], MORE_FABRICS[5], WOODS[2]];
  return (
    <Page width={width} height={height}>
      <DesktopNav active='Materials' cart={1} />
      <div className='flex gap-10 px-10 pt-9'>
        <div className='min-w-0 flex-1'>
          <h1 style={{ ...wide(125, 820), fontSize: 50, lineHeight: 0.92 }}>Materials</h1>
          <p className='mt-3 max-w-[560px] text-[15px] leading-relaxed' style={{ color: K.ink2 }}>
            Order up to six free samples. They come in a reused envelope within three working days, and every piece in the collection can be made in any of them.
          </p>
          <p className='mt-6 text-[12.5px] font-semibold uppercase tracking-[0.06em]' style={wide(112, 700)}>Wood · 4</p>
          <div className='mt-3 grid grid-cols-4 gap-4'>
            {WOODS.map((w) => (
              <div key={w.id}>
                <div className='overflow-hidden rounded-[4px]'>
                  <svg viewBox='0 0 200 96' className='block w-full' aria-hidden='true'>
                    <rect width='200' height='96' fill={w.color} />
                    <g fill='none' stroke={shade(w.color, -0.2)} strokeWidth='0.9' opacity='0.75'>
                      <path d='M-5 18C40 10 80 26 205 14' />
                      <path d='M-5 34C50 30 110 44 205 32' />
                      <path d='M-5 52C30 46 90 64 205 50' />
                      <path d='M-5 70C60 66 120 80 205 66' />
                      <path d='M-5 90C40 84 100 98 205 88' />
                      <path d='M-5 104C50 100 120 108 205 102' />
                    </g>
                  </svg>
                </div>
                <p className='mt-2.5 text-[14px] font-semibold'>{w.name}</p>
                <p className='text-[12.5px]' style={{ color: K.ink2 }}>{w.origin}</p>
                <p className='mt-1 text-[12.5px] tabular-nums'>{w.surcharge ? `+${euro(w.surcharge)} on a sofa` : 'Included'}{w.weeks ? `, +${w.weeks} wk` : ''}</p>
              </div>
            ))}
          </div>
          <p className='mt-6 text-[12.5px] font-semibold uppercase tracking-[0.06em]' style={wide(112, 700)}>Fabric · 8</p>
          <div className='mt-3 grid grid-cols-8 gap-3'>
            {MORE_FABRICS.map((f) => (
              <div key={f.name}>
                <div className='overflow-hidden rounded-[4px] [&>svg]:!h-auto [&>svg]:!w-full'>
                  <Swatch color={f.color} texture={f.texture} size={90} round={false} />
                </div>
                <p className='mt-2 text-[13px] font-semibold leading-tight'>{f.name.split(' ')[1]}</p>
                <p className='whitespace-nowrap text-[11px] leading-snug' style={{ color: K.ink2 }}>{f.material.replace('Wide-wale corduroy', 'Corduroy')}</p>
                <p className='mt-0.5 text-[11px] tabular-nums' style={{ color: K.ink3 }}>{f.surcharge ? `+${euro(f.surcharge)}` : 'Included'}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className='w-[260px] shrink-0 self-start rounded-[6px] border p-5' style={{ borderColor: K.line, background: K.white }}>
          <p style={{ ...wide(118, 760), fontSize: 18 }}>Your samples</p>
          <p className='mt-1 text-[12.5px]' style={{ color: K.ink2 }}>3 of 6 chosen</p>
          <div className='mt-4 space-y-3'>
            {tray.map((t) => (
              <div key={t.name} className='flex items-center gap-3'>
                <span className='overflow-hidden rounded-[3px]'>
                  <Swatch color={t.color} texture={'texture' in t ? t.texture : undefined} grain={!('texture' in t)} size={40} round={false} />
                </span>
                <span className='text-[13px] leading-tight'>{t.name}</span>
              </div>
            ))}
            {[0, 1, 2].map((i) => (
              <div key={i} className='flex items-center gap-3 text-[12.5px]' style={{ color: K.ink3 }}>
                <span className='size-10 rounded-[3px] border border-dashed' style={{ borderColor: K.line }} />
                Empty slot
              </div>
            ))}
          </div>
          <span className='mt-5 flex h-[42px] items-center justify-center rounded-full text-[13.5px] font-semibold' style={{ background: K.ink, color: K.paper }}>
            Send my samples
          </span>
          <p className='mt-2.5 text-center text-[11.5px]' style={{ color: K.ink2 }}>Free, arrives in 3 working days</p>
        </aside>
      </div>
    </Page>
  );
}

function WorkshopIllustration() {
  const wood = WOODS[0].color;
  return (
    <svg viewBox='0 0 520 360' className='block h-full w-full' aria-hidden='true'>
      <rect width='520' height='360' fill='#DDD3C2' />
      <rect x='0' y='262' width='520' height='98' fill='#C9BCA6' />
      {/* window onto the river */}
      <rect x='300' y='34' width='180' height='150' fill='#9FB2A6' />
      <rect x='300' y='134' width='180' height='50' fill='#6F8A80' />
      <path d='M300 128h180' stroke='#7C978C' strokeWidth='2' />
      <rect x='330' y='112' width='90' height='14' fill='#3D4A45' />
      <rect x='350' y='100' width='30' height='12' fill='#3D4A45' />
      <path d='M390 34v150M300 108h180' stroke={K.ink} strokeWidth='5' />
      <rect x='296' y='30' width='188' height='158' fill='none' stroke={K.ink} strokeWidth='6' />
      {/* pegboard with clamps */}
      <rect x='40' y='40' width='210' height='120' fill='#E8DFCF' />
      {Array.from({ length: 24 }, (_, i) => i).map((i) => (
        <circle key={`peg-${i}`} cx={58 + (i % 6) * 35} cy={58 + Math.floor(i / 6) * 28} r='2' fill='#B9AC95' />
      ))}
      <g stroke={K.ink} strokeWidth='4' fill='none'>
        <path d='M70 60v64M70 60h22M70 124h22' />
        <path d='M120 60v76M120 60h22M120 136h22' />
      </g>
      <path d='M170 66l40 0 0 10-40 0z' fill={K.terracotta} />
      <path d='M190 76v50' stroke={K.ink} strokeWidth='3' />
      {/* lamp */}
      <path d='M150 0v40' stroke={K.ink} strokeWidth='2' />
      <path d='M126 58h48l-10-18h-28z' fill={K.ink} />
      {/* trestles and frame */}
      <g fill={K.ink}>
        <path d='M90 300l14-80h8l14 80h-8l-10-60-10 60z' />
        <path d='M370 300l14-80h8l14 80h-8l-10-60-10 60z' />
      </g>
      <rect x='70' y='214' width='360' height='10' fill={shade(wood, -0.15)} />
      <g fill={wood}>
        <rect x='80' y='170' width='340' height='14' />
        <rect x='80' y='184' width='14' height='30' />
        <rect x='406' y='184' width='14' height='30' />
        <rect x='80' y='120' width='14' height='50' />
        <rect x='406' y='120' width='14' height='50' />
        <rect x='80' y='112' width='340' height='12' />
      </g>
      <g stroke='#B89F7E' strokeWidth='5'>
        <path d='M110 184v28M150 184v28M190 184v28M230 184v28M270 184v28M310 184v28M350 184v28M390 184v28' />
      </g>
      <g stroke={K.terracotta} strokeWidth='4' opacity='0.9'>
        <path d='M96 140h308M96 156h308' />
      </g>
      {/* fabric roll */}
      <rect x='450' y='238' width='40' height='70' rx='20' fill={FABRICS[2].color} />
      <ellipse cx='470' cy='240' rx='20' ry='8' fill={shade(FABRICS[2].color, 0.15)} />
    </svg>
  );
}

export function WorkshopPage({ width = 1280, height = 758 }: { width?: number; height?: number }) {
  const ws = WORKSHOPS[0];
  const book = [38, 41, 40, 36, 41, 33, 28, 24, 18, 12, 9, 4];
  return (
    <Page width={width} height={height}>
      <DesktopNav active='Workshops' />
      <div className='grid grid-cols-[1fr_520px] gap-10 px-10 pt-9'>
        <div>
          <p className='text-[12.5px]' style={{ color: K.ink2 }}>Workshops / 1 of 9</p>
          <h1 className='mt-2' style={{ ...wide(125, 820), fontSize: 46, lineHeight: 0.96 }}>
            {ws.name},<br />
            {ws.city}
          </h1>
          <p className='mt-5 max-w-[520px] text-[15.5px] leading-relaxed' style={{ color: K.ink2 }}>
            Six makers at one long bench on the Oude Maas. Every Bank Maas frame is cut, glued, and webbed here, then upholstered by hand before it goes on our van.
          </p>
          <dl className='mt-7 grid grid-cols-4 border-y' style={{ borderColor: K.line }}>
            {[
              ['Since', String(ws.since)],
              ['Makers', String(ws.makers)],
              ['Frames a month', '41'],
              ['Lead time now', `${ws.weeks} wks`]
            ].map(([k, v], i) => (
              <div key={k} className='py-4' style={{ borderLeft: i ? `1px solid ${K.line}` : undefined, paddingLeft: i ? 16 : 0 }}>
                <dt className='text-[12px]' style={{ color: K.ink2 }}>{k}</dt>
                <dd className='mt-1 tabular-nums' style={{ ...wide(115, 740), fontSize: 26 }}>{v}</dd>
              </div>
            ))}
          </dl>
          <div className='mt-7'>
            <div className='flex items-baseline justify-between'>
              <p style={{ ...wide(115, 740), fontSize: 17 }}>Order book, next 12 weeks</p>
              <p className='text-[12px]' style={{ color: K.ink2 }}>Updated by the workshop every Monday · capacity 42 frames</p>
            </div>
            <div className='mt-4 flex h-[120px] items-end gap-2'>
              {book.map((v, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: week index
                <div key={i} className='flex flex-1 flex-col items-center gap-1.5'>
                  <span className='w-full rounded-t-[2px]' style={{ height: (v / 42) * 100, background: v > 35 ? K.terracotta : K.oak }} />
                  <span className='text-[10.5px] tabular-nums' style={{ color: K.ink3 }}>wk {12 + i}</span>
                </div>
              ))}
            </div>
            <p className='mt-3 flex items-center gap-4 text-[12px]' style={{ color: K.ink2 }}>
              <span className='flex items-center gap-1.5'><span className='size-2.5 rounded-[2px]' style={{ background: K.terracotta }} /> Nearly full</span>
              <span className='flex items-center gap-1.5'><span className='size-2.5 rounded-[2px]' style={{ background: K.oak }} /> Room for new orders</span>
              <span>A sofa ordered today starts in week 18.</span>
            </p>
          </div>
        </div>
        <div>
          <div className='overflow-hidden rounded-[4px]' style={{ height: 360 }}>
            <WorkshopIllustration />
          </div>
          <p className='mt-5 text-[12.5px] font-semibold uppercase tracking-[0.06em]' style={wide(112, 700)}>Made here</p>
          <div className='mt-3 grid grid-cols-3 gap-3'>
            {[
              { n: 'Bank Maas', d: <Sofa width={210} wood={WOODS[0].color} fabric={FABRICS[0].color} texture='boucle' className='w-[88%]' /> },
              { n: 'Bank Haringvliet', d: <Sofa width={240} wood={WOODS[3].color} fabric={FABRICS[3].color} texture='herringbone' className='w-[90%]' /> },
              { n: 'Fauteuil Brielle', d: <Armchair wood={WOODS[1].color} fabric={FABRICS[1].color} texture='linen' className='h-[70%]' /> }
            ].map((m) => (
              <div key={m.n}>
                <div className='flex h-[110px] items-end justify-center rounded-[4px] pb-2' style={{ background: K.sand }}>{m.d}</div>
                <p className='mt-1.5 text-[12.5px] font-semibold'>{m.n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

function StreetMap() {
  return (
    <svg viewBox='0 0 560 420' className='block h-full w-full' aria-hidden='true'>
      <rect width='560' height='420' fill='#E9E3D7' />
      <g fill='#DCD3C3'>
        <rect x='20' y='20' width='150' height='130' />
        <rect x='200' y='20' width='170' height='130' />
        <rect x='400' y='20' width='140' height='130' />
        <rect x='20' y='210' width='150' height='190' />
        <rect x='200' y='210' width='170' height='90' />
        <rect x='200' y='326' width='170' height='74' />
        <rect x='400' y='210' width='140' height='190' />
      </g>
      <rect x='420' y='230' width='100' height='70' fill='#C9D2BE' />
      <g stroke='#FBFAF6' strokeLinecap='round'>
        <path d='M0 180H560' strokeWidth='34' />
        <path d='M185 0V420' strokeWidth='22' />
        <path d='M385 0V420' strokeWidth='18' />
        <path d='M200 313H370' strokeWidth='10' />
      </g>
      <path d='M0 180H560' stroke={K.terracotta} strokeWidth='2' strokeDasharray='6 6' opacity='0.6' />
      <g fontFamily="'Archivo Variable', sans-serif" fontSize='11' fill={K.ink2}>
        <text x='30' y='176'>Nieuwe Binnenweg</text>
        <text x='190' y='120' transform='rotate(90 190 120)'>’s-Gravendijkwal</text>
        <text x='390' y='250' transform='rotate(90 390 250)'>Henegouwerlaan</text>
        <text x='430' y='272'>Park</text>
        <text x='30' y='204' fill={K.terracotta}>Tram 4</text>
      </g>
      <g transform='translate(300 180)'>
        <circle r='26' fill={K.terracotta} opacity='0.18' />
        <path d='M0 6s-14-12-14-22a14 14 0 0 1 28 0C14-6 0 6 0 6z' transform='translate(0 -8)' fill={K.ink} />
        <circle cy='-24' r='5' fill={K.paper} />
      </g>
      <rect x='252' y='120' width='96' height='26' rx='13' fill={K.ink} />
      <text x='300' y='137' textAnchor='middle' fontFamily="'Archivo Variable', sans-serif" fontSize='11.5' fontWeight='600' fill={K.paper}>Kamerstuk, 212</text>
    </svg>
  );
}

export function ShowroomPage({ width = 1280, height = 758 }: { width?: number; height?: number }) {
  const days = [['Thu', 13], ['Fri', 14], ['Sat', 15], ['Mon', 17], ['Tue', 18], ['Wed', 19], ['Thu', 20]] as const;
  const slots = ['10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  const taken = new Set(['10:00', '11:00', '11:30', '14:00', '15:30']);
  return (
    <Page width={width} height={height}>
      <DesktopNav active='Showroom' cart={1} />
      <div className='grid grid-cols-[1fr_460px] gap-10 px-10 pt-9'>
        <div>
          <h1 style={{ ...wide(125, 820), fontSize: 58, lineHeight: 0.92 }}>Sit on it first</h1>
          <p className='mt-4 max-w-[560px] text-[15px] leading-relaxed' style={{ color: K.ink2 }}>
            Eleven pieces on the floor at Nieuwe Binnenweg 212. Book half an hour and we put the fabrics you’re considering on the sofa before you arrive.
          </p>
          <div className='mt-6 overflow-hidden rounded-[4px]' style={{ height: 420 }}>
            <StreetMap />
          </div>
        </div>
        <div className='rounded-[6px] border p-6' style={{ borderColor: K.line, background: K.white }}>
          <p style={{ ...wide(118, 760), fontSize: 20 }}>Book a visit</p>
          <p className='mt-1 text-[12.5px]' style={{ color: K.ink2 }}>March 2025 · 30 minutes · free</p>
          <div className='mt-4 grid grid-cols-7 gap-1.5'>
            {days.map(([d, n]) => (
              <span key={n} className='flex flex-col items-center rounded-[6px] py-2 text-[12px]' style={{ background: n === 15 ? K.ink : K.paper, color: n === 15 ? K.paper : K.ink }}>
                <span style={{ opacity: 0.6 }}>{d}</span>
                <span className='mt-0.5 text-[16px] font-semibold tabular-nums'>{n}</span>
              </span>
            ))}
          </div>
          <div className='mt-4 grid grid-cols-4 gap-1.5'>
            {slots.map((s) => (
              <span
                key={s}
                className='rounded-[6px] border py-1.5 text-center text-[12.5px] tabular-nums'
                style={{
                  borderColor: s === '13:30' ? K.terracotta : K.line,
                  background: s === '13:30' ? K.terracotta : 'transparent',
                  color: s === '13:30' ? K.white : taken.has(s) ? K.ink3 : K.ink,
                  textDecoration: taken.has(s) ? 'line-through' : 'none'
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <p className='mt-5 text-[12.5px] font-semibold uppercase tracking-[0.06em]' style={wide(112, 700)}>Have these ready</p>
          <div className='mt-2.5 space-y-2'>
            {[
              { n: 'Bank Maas, 240 cm', s: 'On the floor in Bouclé Duin', on: true, d: <Sofa width={240} wood={WOODS[2].color} fabric={FABRICS[0].color} texture='boucle' className='w-full' /> },
              { n: 'Corduroy Mos, Herringbone Lood', s: 'Fabric drapes on the sofa', on: true, d: <Swatch color={FABRICS[2].color} texture='cord' size={40} round={false} /> },
              { n: 'Stoel Kralingen', s: 'Two chairs at the big table', on: false, d: <Chair wood={WOODS[0].color} seat={FABRICS[1].color} texture='linen' className='h-full' /> }
            ].map((r) => (
              <div key={r.n} className='flex items-center gap-3 rounded-[6px] border p-2' style={{ borderColor: K.line }}>
                <span className='flex h-10 w-14 items-center justify-center overflow-hidden rounded-[3px]' style={{ background: K.sand }}>{r.d}</span>
                <span className='min-w-0 flex-1'>
                  <span className='block text-[13px] font-semibold leading-tight'>{r.n}</span>
                  <span className='block text-[11.5px]' style={{ color: K.ink2 }}>{r.s}</span>
                </span>
                <span className='flex size-5 items-center justify-center rounded-[4px] border' style={{ borderColor: r.on ? K.ink : K.line, background: r.on ? K.ink : 'transparent' }}>
                  {r.on ? <Icon name='check' size={14} color={K.paper} /> : null}
                </span>
              </div>
            ))}
          </div>
          <span className='mt-5 flex h-[46px] items-center justify-center rounded-full text-[14px] font-semibold' style={{ background: K.terracotta, color: K.white }}>
            Book Saturday 15 March, 13:30
          </span>
        </div>
      </div>
    </Page>
  );
}

/* ------------------------------------------------- the old PDF catalogue */

const SERIF = "Georgia, 'Times New Roman', Times, serif";

export function CataloguePDF({ width = 1440, height = 900 }: { width?: number; height?: number }) {
  const muted = (c: string) => shade(c, 0.28);
  return (
    <div className='relative overflow-hidden' style={{ width, height, background: '#525659', fontFamily: 'system-ui, Arial, sans-serif' }}>
      <div className='flex h-[42px] items-center gap-4 px-4 text-[12.5px]' style={{ background: '#323639', color: '#E8EAED' }}>
        <span className='flex gap-[5px]'>
          {[0, 1, 2].map((i) => <span key={i} className='size-[3px] rounded-full bg-[#E8EAED]' />)}
        </span>
        <span className='opacity-90'>Kamerstuk_Collectie_2022_v7_DEFINITIEF.pdf</span>
        <span className='mx-auto flex items-center gap-3 opacity-90'>
          <span className='rounded-[3px] bg-[#1f2124] px-2 py-0.5 tabular-nums'>23</span> / 64
          <span className='mx-2 h-4 w-px bg-white/20' />
          <span>–</span>
          <span className='rounded-[3px] bg-[#1f2124] px-2 py-0.5'>100%</span>
          <span>+</span>
        </span>
        <span className='opacity-70'>14.8 MB</span>
      </div>
      <div className='absolute bottom-0 left-0 top-[42px] w-[150px] space-y-4 overflow-hidden px-6 pt-5' style={{ background: '#3c4043' }}>
        {[21, 22, 23, 24, 25].map((n) => (
          <div key={n} className='text-center text-[11px] text-[#bdc1c6]'>
            <div className='mx-auto h-[120px] w-[86px] bg-white p-1.5' style={{ outline: n === 23 ? '3px solid #8ab4f8' : undefined }}>
              <div className='h-2 w-10 bg-[#c9c3b5]' />
              <div className='mt-2 h-10 w-full' style={{ background: n % 2 ? '#cfc6b8' : '#d8d1c4' }} />
              <div className='mt-1.5 space-y-1'>
                {[0, 1, 2, 3].map((l) => <div key={l} className='h-[2px] bg-[#d0d0d0]' />)}
              </div>
            </div>
            <span className='mt-1 block'>{n}</span>
          </div>
        ))}
      </div>
      <div className='absolute left-[150px] right-0 top-[42px] bottom-0 flex justify-center overflow-hidden pt-6'>
        <div className='w-[640px] bg-white px-12 pt-10 shadow-[0_2px_8px_rgba(0,0,0,0.4)]' style={{ fontFamily: SERIF, color: '#2a2a2a', height: 905 }}>
          <div className='flex items-end justify-between border-b-2 border-[#2a2a2a] pb-1.5'>
            <span className='text-[22px] font-bold tracking-[0.12em]'>KAMERSTUK</span>
            <span className='text-[11px] italic'>Meubelen op maat — Collectie 2022</span>
          </div>
          <p className='mt-5 text-[20px] font-bold'>Banken</p>
          <p className='mt-1 text-[10.5px] leading-[1.45]'>
            Alle banken worden met de hand gemaakt in Nederland. Verkrijgbaar in diverse houtsoorten en stoffen. Zie voor de stoffen het stalenboek (blz. 51 t/m 58). Prijzen en levertijden op aanvraag.
          </p>
          <div className='mt-4 grid grid-cols-2 gap-4'>
            {[
              { n: 'Bank MAAS', s: '2,5-zits', d: <Sofa width={210} wood={muted(WOODS[0].color)} fabric={muted(FABRICS[3].color)} className='w-full' /> },
              { n: 'Bank HARINGVLIET', s: '3-zits', d: <Sofa width={240} wood={muted(WOODS[2].color)} fabric={muted(FABRICS[0].color)} className='w-full' /> },
              { n: 'Fauteuil SCHIE', s: '1-zits', d: <Armchair wood={muted(WOODS[0].color)} fabric={muted(FABRICS[1].color)} className='h-full' /> },
              { n: 'Hocker MAAS', s: 'bij Bank Maas', d: <Stool wood={muted(WOODS[0].color)} className='h-full' /> }
            ].map((p) => (
              <div key={p.n}>
                <div className='flex h-[128px] items-end justify-center border border-[#bbb] bg-[#e9e6e0] p-2'>{p.d}</div>
                <p className='mt-1.5 text-[12px] font-bold'>{p.n} <span className='font-normal italic'>{p.s}</span></p>
                <p className='text-[9.5px] leading-[1.4]'>Art.nr. KS-{p.n.length * 37}-B · Houtsoort: eiken, essen, noten (meerprijs) · Stof: naar keuze</p>
              </div>
            ))}
          </div>
          <table className='mt-5 w-full border-collapse text-[9.5px]'>
            <thead>
              <tr className='bg-[#e4e0d8]'>
                {['Model', 'Breedte', 'Diepte', 'Hoogte', 'Zithoogte', 'Prijs'].map((h) => (
                  <th key={h} className='border border-[#aaa] px-1.5 py-1 text-left font-bold'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Maas 2-zits', '180', '92', '76', '44', 'op aanvraag'],
                ['Maas 2,5-zits', '210', '92', '76', '44', 'op aanvraag'],
                ['Maas 3-zits', '240', '92', '76', '44', 'op aanvraag'],
                ['Haringvliet 3-zits', '240', '96', '82', '43', 'op aanvraag'],
                ['Schie', '78', '76', '84', '42', 'op aanvraag']
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((c, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: table cells
                    <td key={i} className='border border-[#aaa] px-1.5 py-[3px]'>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className='mt-4 border border-[#2a2a2a] p-2 text-center text-[10.5px] leading-[1.5]'>
            <strong>Levertijd in overleg.</strong> Bel voor prijzen en beschikbaarheid: <strong>010 – 214 38 70</strong>
            <br />
            (dinsdag t/m zaterdag, 10.00 – 17.00 uur) of kom langs in de winkel, Nieuwe Binnenweg 212.
          </p>
          <p className='mt-3 text-right text-[9px] italic'>Wijzigingen en drukfouten voorbehouden. — 23</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- phones */

function PhoneHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className='flex h-[54px] items-center gap-2 border-b px-3' style={{ borderColor: K.line }}>
      <span className='flex size-9 items-center justify-center'><Icon name='back' size={22} /></span>
      <div className='min-w-0 flex-1'>
        <p style={{ ...wide(116, 760), fontSize: 17, lineHeight: 1.1 }}>{title}</p>
        {sub ? <p className='text-[11.5px]' style={{ color: K.ink2 }}>{sub}</p> : null}
      </div>
      <Wordmark size={12} />
    </div>
  );
}

export function CartScreen() {
  const sofa = sofaQuote('walnut', 'mos', 210);
  const items = [
    { n: 'Bank Maas', s: '210 cm · Walnut · Corduroy Mos', p: sofa.price, q: 1, w: sofa.weeks, ws: 'Werkplaats Van Rijn, Dordrecht', d: <Sofa width={210} wood={WOODS[2].color} fabric={FABRICS[2].color} texture='cord' className='w-full' /> },
    { n: 'Stoel Kralingen', s: 'Oak · Linen Klei seat', p: 545, q: 4, w: 5, ws: 'Stoelmakerij De Kruk, Tilburg', d: <Chair wood={WOODS[0].color} seat={FABRICS[1].color} texture='linen' className='h-[88%]' /> }
  ];
  const subtotal = items.reduce((t, i) => t + i.p * i.q, 0);
  return (
    <div className='relative h-[844px] w-[390px] overflow-hidden' style={{ ...ui, background: K.paper, color: K.ink }}>
      <PhoneStatusBar tone='dark' time='14:16' />
      <PhoneHeader title='Cart' sub='2 pieces from 2 workshops' />
      <div className='space-y-3 px-4 pt-4'>
        {items.map((i) => (
          <div key={i.n} className='flex gap-3 rounded-[10px] border p-3' style={{ borderColor: K.line, background: K.white }}>
            <span className='flex h-[78px] w-[92px] shrink-0 items-end justify-center rounded-[6px] p-1.5' style={{ background: K.sand }}>{i.d}</span>
            <div className='min-w-0 flex-1'>
              <div className='flex justify-between gap-2'>
                <p style={{ ...wide(114, 720), fontSize: 15 }}>{i.n}</p>
                <p className='text-[13.5px] font-semibold tabular-nums'>{euro(i.p * i.q)}</p>
              </div>
              <p className='mt-0.5 text-[11.5px] leading-snug' style={{ color: K.ink2 }}>{i.s}{i.q > 1 ? ` · ${i.q} × ${euro(i.p)}` : ''}</p>
              <p className='mt-2 text-[11px] leading-snug' style={{ color: K.ink2 }}>
                <span className='mr-1 inline-block size-[6px] rounded-full align-middle' style={{ background: K.moss }} />
                Ready in {i.w} weeks · {i.ws}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='mx-4 mt-4 rounded-[10px] p-3.5' style={{ background: K.sand }}>
        <p className='text-[12.5px] font-semibold'>One delivery, in week 24</p>
        <p className='mt-1 text-[11.5px] leading-snug' style={{ color: K.ink2 }}>
          The chairs are ready first. We hold them in our depot in Schiedam and bring everything on one trip.
        </p>
        <div className='mt-3 grid grid-cols-2 rounded-[8px] p-1 text-[12px]' style={{ background: K.sand2 }}>
          <span className='rounded-[6px] py-1.5 text-center font-semibold' style={{ background: K.white }}>Together</span>
          <span className='py-1.5 text-center' style={{ color: K.ink2 }}>Chairs first, +€45</span>
        </div>
      </div>
      <dl className='mx-4 mt-4 space-y-2 text-[13px]'>
        <div className='flex justify-between'><dt style={{ color: K.ink2 }}>Subtotal</dt><dd className='tabular-nums'>{euro(subtotal)}</dd></div>
        <div className='flex justify-between'><dt style={{ color: K.ink2 }}>Delivery and assembly, Rotterdam</dt><dd>Included</dd></div>
        <div className='flex items-center justify-between'>
          <dt className='flex items-center gap-2' style={{ color: K.ink2 }}>
            <span className='flex size-4 items-center justify-center rounded-[3px]' style={{ background: K.ink }}><Icon name='check' size={12} color={K.paper} /></span>
            Take back our old sofa
          </dt>
          <dd className='tabular-nums'>€45</dd>
        </div>
        <div className='flex justify-between border-t pt-3' style={{ borderColor: K.line }}>
          <dt style={{ ...wide(114, 740), fontSize: 15 }}>Total</dt>
          <dd className='tabular-nums' style={{ ...wide(110, 740), fontSize: 17 }}>{euro(subtotal + 45)}</dd>
        </div>
      </dl>
      <div className='absolute inset-x-0 bottom-0 border-t px-4 pb-[26px] pt-3' style={{ borderColor: K.line, background: K.paper }}>
        <span className='flex h-[50px] items-center justify-center rounded-full text-[15px] font-semibold' style={{ background: K.terracotta, color: K.white }}>
          Choose a delivery day
        </span>
        <p className='mt-2 text-center text-[11px]' style={{ color: K.ink2 }}>Pay 30% now, the rest when it’s ready</p>
      </div>
    </div>
  );
}

export function DeliveryScreen() {
  // June 2025 starts on a Sunday; the week starts on Monday.
  const blanks = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const open = new Set([10, 17, 20, 24, 27]);
  const full = new Set([13]);
  const selected = 10;
  return (
    <div className='relative h-[844px] w-[390px] overflow-hidden' style={{ ...ui, background: K.paper, color: K.ink }}>
      <PhoneStatusBar tone='dark' time='14:18' />
      <PhoneHeader title='Delivery day' sub='Step 2 of 3' />
      <div className='px-4 pt-4'>
        <div className='flex items-start gap-3 rounded-[10px] p-3' style={{ background: K.ink, color: K.paper }}>
          <span className='mt-0.5'><Icon name='truck' size={20} color={K.paper} /></span>
          <p className='text-[12px] leading-snug'>
            Everything is ready in <strong>week 24</strong>. Van 2 drives Rotterdam and Schiedam on <strong>Tuesdays and Fridays</strong>, so those are your days.
          </p>
        </div>
        <div className='mt-5 flex items-baseline justify-between'>
          <p style={{ ...wide(116, 760), fontSize: 18 }}>June 2025</p>
          <span className='flex gap-4' style={{ color: K.ink2 }}><Icon name='back' size={18} /><Icon name='chev' size={18} /></span>
        </div>
        <div className='mt-3 grid grid-cols-7 gap-y-1 text-center text-[11px]' style={{ color: K.ink3 }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d}>{d[0]}</span>)}
        </div>
        <div className='mt-1.5 grid grid-cols-7 gap-1'>
          {blanks.map((b) => <span key={b} />)}
          {days.map((n) => {
            const isOpen = open.has(n);
            const isFull = full.has(n);
            const isSel = n === selected;
            return (
              <span
                key={n}
                className='flex h-[38px] flex-col items-center justify-center rounded-[8px] text-[13px] tabular-nums'
                style={{
                  background: isSel ? K.terracotta : isOpen ? K.white : 'transparent',
                  border: isOpen && !isSel ? `1px solid ${K.line}` : '1px solid transparent',
                  color: isSel ? K.white : isOpen ? K.ink : K.ink3,
                  fontWeight: isOpen || isSel ? 600 : 400,
                  textDecoration: isFull ? 'line-through' : 'none'
                }}
              >
                {n}
                {isFull ? <span className='text-[8.5px] font-normal no-underline'>full</span> : null}
              </span>
            );
          })}
        </div>
        <p className='mt-5 text-[12.5px] font-semibold uppercase tracking-[0.05em]' style={wide(112, 700)}>Tuesday 10 June</p>
        <div className='mt-2.5 space-y-2'>
          {[
            { t: '08:00 – 12:00', s: '2 of 5 stops left', on: true },
            { t: '12:00 – 16:00', s: 'Full', off: true },
            { t: '16:00 – 19:00', s: '1 stop left' }
          ].map((slot) => (
            <div key={slot.t} className='flex items-center justify-between rounded-[10px] border px-3.5 py-3' style={{ borderColor: slot.on ? K.ink : K.line, background: slot.on ? K.white : 'transparent', opacity: slot.off ? 0.5 : 1 }}>
              <span className='text-[14px] font-semibold tabular-nums'>{slot.t}</span>
              <span className='flex items-center gap-2 text-[12px]' style={{ color: K.ink2 }}>
                {slot.s}
                <span className='flex size-[18px] items-center justify-center rounded-full border' style={{ borderColor: slot.on ? K.ink : K.line, background: slot.on ? K.ink : 'transparent' }}>
                  {slot.on ? <span className='size-[7px] rounded-full' style={{ background: K.paper }} /> : null}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className='mt-4 flex gap-2.5 rounded-[10px] border p-3 text-[12px] leading-snug' style={{ borderColor: K.line }}>
          <Icon name='pin' size={18} color={K.ink2} />
          <span>
            <strong className='font-semibold'>Mathenesserlaan 301, Rotterdam</strong>
            <br />
            <span style={{ color: K.ink2 }}>3rd floor, no lift. Two of us carry it up; stairs above the 2nd floor are €35.</span>
          </span>
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 border-t px-4 pb-[26px] pt-3' style={{ borderColor: K.line, background: K.paper }}>
        <span className='flex h-[50px] items-center justify-center rounded-full text-[14.5px] font-semibold' style={{ background: K.terracotta, color: K.white }}>
          Confirm Tue 10 June, 08:00–12:00
        </span>
      </div>
    </div>
  );
}

/** Eight of Bank Maas's sixty combinations, as a spec sheet. */
export function RenderSheet({ width = 1440, height = 900 }: { width?: number; height?: number }) {
  const combos: [string, string, number][] = [
    ['oak', 'duin', 180],
    ['walnut', 'mos', 210],
    ['black', 'kalk', 240],
    ['ash', 'klei', 210],
    ['oak', 'lood', 240],
    ['walnut', 'duin', 180],
    ['ash', 'mos', 240],
    ['black', 'klei', 210]
  ];
  return (
    <div className='relative overflow-hidden px-[70px] pt-[58px]' style={{ ...ui, width, height, background: K.paper, color: K.ink }}>
      <div className='flex items-end justify-between'>
        <p style={{ ...wide(125, 820), fontSize: 46, lineHeight: 0.95 }}>
          Bank Maas,
          <br />8 of its 60 versions
        </p>
        <p className='max-w-[420px] text-[15px] leading-relaxed' style={{ color: K.ink2 }}>
          Each drawing is built from the same 38 parts: frame, legs, cushions, and the fabric laid over them. None of these sofas has been photographed. Most have not been made yet.
        </p>
      </div>
      <div className='mt-10 grid grid-cols-4 gap-x-6 gap-y-8'>
        {combos.map(([w, f, cm]) => {
          const q = sofaQuote(w, f, cm);
          return (
            <div key={`${w}${f}${cm}`} className='border-t pt-3' style={{ borderColor: K.ink }}>
              <div className='flex h-[204px] items-end justify-center rounded-[3px] pb-3' style={{ background: K.sand }}>
                <Sofa width={cm} wood={q.wood.color} fabric={q.fabric.color} texture={q.fabric.texture} frameWidth={290} className='w-[96%]' />
              </div>
              <div className='mt-2.5 flex justify-between text-[12.5px]'>
                <span className='font-semibold tabular-nums'>{cm} cm · {q.wood.short}</span>
                <span className='tabular-nums'>{euro(q.price)}</span>
              </div>
              <div className='mt-0.5 flex justify-between text-[12px]' style={{ color: K.ink2 }}>
                <span>{q.fabric.name}</span>
                <span>{q.weeks} wks</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
