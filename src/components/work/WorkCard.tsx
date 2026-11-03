import { Link } from '@tanstack/react-router';
import { Picture } from '~/components/site/Picture';
import type { CaseStudy } from '~/content/types';
import { cn } from '~/lib/utils';

type WorkCardProps = {
  study: CaseStudy;
  index: number;
  sizes: string;
  className?: string;
  /** Larger type for the Work index. */
  large?: boolean;
  priority?: boolean;
};

export function WorkCard({ study, index, sizes, className, large, priority }: WorkCardProps) {
  return (
    <Link
      to='/work/$slug'
      params={{ slug: study.slug }}
      className={cn('group/card block rounded-[6px] outline-offset-4', className)}
    >
      <div className='relative overflow-hidden rounded-[4px] bg-surface'>
        <Picture
          img={study.cover}
          sizes={sizes}
          priority={priority}
          className='transition-transform duration-700 ease-out-quart group-hover/card:scale-[1.035]'
        />
        <span
          aria-hidden='true'
          className='absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-bg/90 text-[17px] text-ink transition-[background-color,color] duration-300 group-hover/card:bg-signal group-hover/card:text-on-signal'
        >
          ↗
        </span>
      </div>
      <div className='flex items-start gap-4 pt-4'>
        <span className='label pt-[5px] text-ink-3'>{String(index + 1).padStart(2, '0')}</span>
        <div className='min-w-0 flex-1'>
          <div className='flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4'>
            <h3
              className={cn(
                'font-display leading-[0.98] tracking-[-0.035em]',
                large ? 'text-[clamp(26px,2.6vw,38px)]' : 'text-[24px]'
              )}
            >
              {study.client}
            </h3>
            <p className='label text-ink-3'>
              {study.sector} · {study.year}
            </p>
          </div>
          <p className={cn('mt-2 text-ink-2', large ? 'max-w-[52ch] text-[16px]' : 'text-[15px] leading-snug')}>
            {study.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
