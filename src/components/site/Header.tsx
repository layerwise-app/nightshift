import { Link } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
import { useAsk } from './AskPanel';
import { Lockup } from './Logo';

const nav = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
] as const;

export function Header() {
  const { openAsk } = useAsk();
  return (
    <header className='fixed inset-x-0 top-0 z-[70] h-[var(--header-h)] border-b border-line bg-bg'>
      <a
        href='#main'
        className='sr-only-focusable label absolute left-3 top-3 z-10 rounded-[4px] bg-signal px-3 py-2 text-on-signal'
      >
        Skip to content
      </a>
      <div className='frame flex h-full items-stretch'>
        <Link
          to='/'
          aria-label='Nightshift Studio, home'
          className='flex items-center border-r border-line pl-3.5 pr-3 md:pl-6 md:pr-6'
        >
          <Lockup />
        </Link>
        <nav aria-label='Main' className='flex flex-1 items-stretch'>
          <ul className='flex items-stretch'>
            {nav.map((item) => (
              <li key={item.to} className='flex'>
                <Link
                  to={item.to}
                  className='group/nav flex items-center gap-1.5 px-2.5 text-[14px] text-ink-2 transition-colors hover:text-ink md:px-5 md:text-[15px]'
                  activeProps={{ 'aria-current': 'page', className: 'text-ink' }}
                  activeOptions={{ exact: false }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden='true'
                        className={cn(
                          'size-[5px] shrink-0 rounded-full bg-signal',
                          isActive ? 'block' : 'hidden md:block md:opacity-0'
                        )}
                      />
                      {item.label}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='hidden items-center gap-2 border-l border-line pl-4 pr-3 lg:flex'>
          <button
            type='button'
            onClick={() => openAsk()}
            className='btn btn-line h-9 gap-2 px-4 text-[11px]'
            aria-keyshortcuts='Meta+K Control+K'
          >
            Ask the studio
            <kbd className='rounded-[3px] border border-line px-1.5 py-[1px] font-mono text-[10px] text-ink-3'>
              ⌘K
            </kbd>
          </button>
          <Link
            to='/contact'
            data-magnetic
            className='btn btn-signal h-9 px-4 text-[11px]'
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}
