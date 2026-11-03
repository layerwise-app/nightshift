import { logoPath } from '~/lib/logo-shape';
import { cn } from '~/lib/utils';
import { portfolio } from '~/portfolio.config';

const path = logoPath();

/** The N on its own, drawn in `currentColor`. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox='12 14 76 72'
      className={cn('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
    >
      <path d={path} fill='currentColor' />
    </svg>
  );
}

/** The N and the lowercase wordmark. */
export function Lockup({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className='h-[20px] w-[21px] text-signal md:h-[22px] md:w-[23px]' />
      <span className='font-display text-[19px] leading-none tracking-[-0.04em] md:text-[21px]'>
        {portfolio.wordmark}
      </span>
    </span>
  );
}
