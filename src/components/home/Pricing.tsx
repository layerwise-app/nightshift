import { Link } from '@tanstack/react-router';
import { useAsk } from '~/components/site/AskPanel';
import { SectionTitle } from '~/components/site/SectionTitle';
import { pricingModels } from '~/content/pricing';
import { cn } from '~/lib/utils';

const rows = [
  { key: 'bestFor', label: 'Best for' },
  { key: 'duration', label: 'Takes' },
  { key: 'team', label: 'Crew' }
] as const;

/** The one white section: pricing models laid out like a spec sheet. */
export function Pricing() {
  const { openAsk } = useAsk();
  return (
    <section id='pricing' aria-labelledby='pricing-title' data-surface='light' className='scroll-mt-[var(--header-h)]'>
      <div className='frame'>
        <div className='frame-pad pb-10 pt-20 md:pb-14 md:pt-28'>
          <SectionTitle
            id='pricing-title'
            label='Three ways to work with us · prices exclude 21% VAT'
          >
            pricing
          </SectionTitle>
        </div>

        <div className='grid border-t md:grid-cols-3'>
          {pricingModels.map((model, i) => (
            <article
              key={model.id}
              aria-labelledby={`price-${model.id}`}
              className={cn('flex flex-col border-b md:border-b-0', i > 0 && 'md:border-l')}
            >
              <div className='frame-pad flex min-h-[44px] items-center border-b py-3'>
                {model.featured ? (
                  <span className='label rounded-[3px] bg-signal px-2 py-1 text-on-signal'>Most chosen</span>
                ) : (
                  <span className='label text-paper-2'>{String(i + 1).padStart(2, '0')}</span>
                )}
              </div>
              <div className='frame-pad pb-8 pt-8'>
                <h3 id={`price-${model.id}`} className='font-display text-[clamp(32px,3vw,46px)] leading-[0.95] tracking-[-0.04em]'>
                  {model.name}
                </h3>
                <p className='mt-3 text-[17px] text-paper-2'>{model.pitch}</p>
                <p className='mt-8 font-display text-[clamp(34px,3.4vw,54px)] leading-none tracking-[-0.045em]'>
                  {model.price}
                </p>
                <p className='mt-3 max-w-[36ch] text-[14.5px] leading-relaxed text-paper-2'>{model.priceNote}</p>
              </div>
              <dl className='border-t'>
                {rows.map((row) => (
                  <div key={row.key} className='frame-pad grid grid-cols-[88px_minmax(0,1fr)] gap-4 border-b py-3.5'>
                    <dt className='label pt-[3px] text-paper-2'>{row.label}</dt>
                    <dd className='text-[15px] leading-snug'>{model[row.key]}</dd>
                  </div>
                ))}
              </dl>
              <div className='frame-pad flex-1 pb-10 pt-6'>
                <p className='label text-paper-2'>Includes</p>
                <ul className='mt-4 space-y-2.5'>
                  {model.includes.map((item) => (
                    <li key={item} className='flex gap-3 text-[15px] leading-snug'>
                      <span aria-hidden='true' className='mt-[7px] size-[6px] shrink-0 rounded-full bg-on-paper' />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className='frame-pad flex flex-col gap-6 border-t py-10 md:flex-row md:items-center md:justify-between md:py-12'>
          <p className='max-w-[44ch] font-display text-[clamp(24px,2.2vw,32px)] leading-[1.05] tracking-[-0.03em]'>
            Not sure which one fits? The crew has written down the answers to what most people ask first.
          </p>
          <div className='flex flex-wrap gap-3'>
            <button type='button' onClick={() => openAsk('website-cost')} data-magnetic className='btn btn-line'>
              Ask the studio <span className='text-paper-2'>⌘K</span>
            </button>
            <Link to='/contact' data-magnetic className='btn btn-ink'>
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
