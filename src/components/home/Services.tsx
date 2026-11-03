import { SectionTitle } from '~/components/site/SectionTitle';
import { services } from '~/content/services';

/** A typographic index of what the studio does: no cards, no icons. */
export function Services() {
  return (
    <section aria-labelledby='services-title' className='frame border-t border-line'>
      <div className='frame-pad pb-10 pt-20 md:pb-14 md:pt-28'>
        <SectionTitle id='services-title' label='Design, words and code from one table'>
          services
        </SectionTitle>
      </div>
      <ol className='border-t border-line'>
        {services.map((service, i) => (
          <li
            key={service.name}
            className='frame-pad grid gap-x-8 gap-y-3 border-b border-line py-7 md:grid-cols-[56px_minmax(0,5fr)_minmax(0,6fr)] md:py-9 lg:grid-cols-[72px_minmax(0,4fr)_minmax(0,4fr)_minmax(0,3fr)]'
          >
            <span className='label pt-[0.9em] text-signal'>{String(i + 1).padStart(2, '0')}</span>
            <h3 className='font-display text-[clamp(32px,3.6vw,56px)] leading-[0.95] tracking-[-0.04em]'>
              {service.name}
            </h3>
            <p className='max-w-[44ch] pt-1 text-[17px] leading-relaxed text-ink-2 md:col-start-3 lg:col-start-auto'>
              {service.summary}
            </p>
            <ul className='flex flex-wrap gap-x-1 gap-y-1.5 pt-1.5 md:col-start-3 lg:col-start-auto lg:flex-col lg:gap-1'>
              {service.deliverables.map((item, k) => (
                <li key={item} className='label text-ink-3'>
                  {item}
                  {k < service.deliverables.length - 1 ? <span aria-hidden='true' className='lg:hidden'> ·</span> : null}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
