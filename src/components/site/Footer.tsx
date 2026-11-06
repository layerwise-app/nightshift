import { Link, useRouterState } from '@tanstack/react-router';
import { portfolio } from '~/portfolio.config';
import { LogoMark } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  const { location } = portfolio;
  // The contact page is the call to action, so the footer does not repeat it there.
  const onContact = useRouterState({ select: (s) => s.location.pathname === '/contact' });
  return (
    <footer className='border-t border-line'>
      <div className='frame'>
        {onContact ? null : (
          <div className='frame-pad pb-14 pt-20 md:pb-20 md:pt-28'>
            <p className='label label-bracket text-ink-3'>Next shift starts {portfolio.availability.nextStart}</p>
            <Link
              to='/contact'
              data-magnetic
              className='group mt-6 inline-flex max-w-full items-end gap-4 rounded-[6px] font-display text-[clamp(56px,11vw,184px)] leading-[0.84]'
            >
              <span className='min-w-0'>
                <span aria-hidden='true' className='text-signal'>.</span>start a shift
              </span>
              <span
                aria-hidden='true'
                className='mb-[0.12em] hidden text-[0.42em] leading-none text-signal transition-transform duration-500 ease-out-quart group-hover:translate-x-3 sm:inline'
              >
                →
              </span>
            </Link>
          </div>
        )}

        <div className={`grid border-line sm:grid-cols-2 lg:grid-cols-4 ${onContact ? '' : 'border-t'}`}>
          <div className='frame-pad border-b border-line py-8 sm:border-r lg:border-b-0'>
            <p className='label text-ink-3'>Studio</p>
            <address className='mt-3 text-[15px] not-italic leading-relaxed text-ink-2'>
              {portfolio.name}
              <br />
              {location.street}
              <br />
              {location.postalCode} {location.city}, {location.neighbourhood}
            </address>
          </div>
          <div className='frame-pad border-b border-line py-8 lg:border-b-0 lg:border-r'>
            <p className='label text-ink-3'>Pages</p>
            <ul className='mt-3 space-y-1.5 text-[15px]'>
              <li><Link to='/work' className='link-rule text-ink-2 hover:text-ink'>Work</Link></li>
              <li><Link to='/about' className='link-rule text-ink-2 hover:text-ink'>About</Link></li>
              <li><Link to='/contact' className='link-rule text-ink-2 hover:text-ink'>Contact</Link></li>
              <li><a href={portfolio.cvFile} className='link-rule text-ink-2 hover:text-ink' download>Studio CV (PDF)</a></li>
            </ul>
          </div>
          <div className='frame-pad border-b border-line py-8 sm:border-b-0 sm:border-r'>
            <p className='label text-ink-3'>Elsewhere</p>
            <ul className='mt-3 space-y-1.5 text-[15px]'>
              {portfolio.social.map((link) => (
                <li key={link.label}>
                  <a href={link.url} target='_blank' rel='noopener noreferrer' className='link-rule text-ink-2 hover:text-ink'>
                    {link.label} <span aria-hidden='true'>↗</span>
                    <span className='sr-only'> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='frame-pad flex flex-col justify-between gap-8 py-8'>
            <LogoMark className='h-9 w-9 text-signal' />
            <p className='label text-ink-3'>
              © {year} {portfolio.name}
              <br />
              Crew of {portfolio.crewSize}, {location.city}
            </p>
            <a
              href='https://layerwise.app'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex w-fit rounded-[6px] opacity-80 transition-opacity hover:opacity-100'
            >
              <img
                src='https://layerwise.app/powered-by-dark.png'
                alt='Powered by Layerwise'
                width={174}
                height={28}
                loading='lazy'
                className='block h-[28px] w-[174px]'
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
