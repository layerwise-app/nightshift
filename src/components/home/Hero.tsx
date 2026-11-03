import { Link } from '@tanstack/react-router';
import { HeroLogo } from '~/components/hero/HeroLogo';
import { portfolio } from '~/portfolio.config';

export function Hero() {
  const { location, crewSize, founded, availability } = portfolio;
  return (
    <section aria-labelledby='hero-title' className='frame'>
      <div className='grid lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-2'>
        <div className='relative border-b border-line lg:border-b-0 lg:border-r'>
          <p className='label label-bracket absolute left-5 top-5 z-10 text-ink-3 md:left-8 md:top-7'>
            Studio / {location.city}
          </p>
          <p className='label absolute bottom-5 left-5 z-10 hidden text-ink-3 md:left-8 md:bottom-7 md:block'>
            Fig. 01 — the N, folded once, lit through the blinds
          </p>
          <HeroLogo className='h-[min(92vw,520px)] w-full md:h-[min(70vw,620px)] lg:absolute lg:inset-0 lg:h-full' />
        </div>

        <div className='flex flex-col justify-between'>
          <div className='frame-pad pb-10 pt-10 md:pt-14 lg:pt-[clamp(56px,10vh,120px)]'>
            <p className='label flex items-center gap-3 text-ink-3'>
              <span aria-hidden='true' className='h-px w-10 bg-signal' />
              {portfolio.role} — {location.city}
            </p>
            <h1
              id='hero-title'
              className='mt-7 font-display text-[clamp(44px,5.3vw,96px)] leading-[0.9]'
            >
              We build brands and websites that hold up in{' '}
              <span className='text-signal'>daylight.</span>
            </h1>
            <p className='mt-8 max-w-[40ch] text-[17px] leading-relaxed text-ink-2 md:text-[18px]'>
              {portfolio.bio.short}
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <Link to='/contact' data-magnetic className='btn btn-signal'>
                Start a project
              </Link>
              <Link to='/work' data-magnetic className='btn btn-line'>
                See the work
              </Link>
            </div>
          </div>

          <dl className='grid grid-cols-3 border-t border-line'>
            {[
              { k: 'Crew', v: String(crewSize).padStart(2, '0') },
              { k: 'Since', v: String(founded) },
              { k: 'Slots open', v: `${availability.slotsOpen}/${availability.slotsPerQuarter}` }
            ].map((item, i) => (
              <div
                key={item.k}
                className={`frame-pad py-5 md:py-6 ${i > 0 ? 'border-l border-line' : ''}`}
              >
                <dt className='label text-ink-3'>{item.k}</dt>
                <dd className='mt-2 font-display text-[clamp(30px,3.2vw,48px)] leading-none tracking-[-0.04em]'>
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
