import { Link } from '@tanstack/react-router';
import { SectionTitle } from '~/components/site/SectionTitle';
import { crew } from '~/content/crew';
import { portfolio } from '~/portfolio.config';

export function StudioStrip() {
  return (
    <section aria-labelledby='studio-title' className='frame'>
      <div className='frame-pad pb-10 pt-20 md:pb-14 md:pt-28'>
        <SectionTitle
          id='studio-title'
          label={`${portfolio.location.neighbourhood}, ${portfolio.location.city} · since ${portfolio.founded}`}
          aside={
            <Link to='/about' className='btn btn-line h-10 text-[11px]'>
              About the studio →
            </Link>
          }
        >
          crew
        </SectionTitle>
      </div>
      <div className='grid border-t border-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'>
        <p className='frame-pad border-b border-line py-10 font-display text-[clamp(28px,3vw,46px)] leading-[1.02] tracking-[-0.035em] lg:border-b-0 lg:border-r lg:py-14'>
          Six people at one long table. The person you meet in the first call is the person who does the work.
        </p>
        <ul className='grid sm:grid-cols-2'>
          {crew.map((member, i) => (
            <li
              key={member.name}
              className={`frame-pad border-b border-line py-6 ${i % 2 === 0 ? 'sm:border-r' : ''} ${i >= crew.length - 2 ? 'sm:border-b-0' : ''} ${i === crew.length - 1 ? 'border-b-0' : ''}`}
            >
              <p className='text-[18px] font-semibold leading-tight'>{member.name}</p>
              <p className='label mt-2 text-ink-3'>{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
