import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

type SectionTitleProps = {
  /** Lowercase word after the dot, like `work`. */
  children: string;
  /** Mono label under the title, shown in square brackets. */
  label?: ReactNode;
  /** Right-aligned slot, usually a link. */
  aside?: ReactNode;
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
};

/** `.work`, `.services` and friends: a signal dot, then the word. */
export function SectionTitle({
  children,
  label,
  aside,
  as: Tag = 'h2',
  id,
  className
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className='min-w-0'>
        <Tag
          id={id}
          className='font-display text-[clamp(52px,8.2vw,124px)] leading-[0.86]'
        >
          <span aria-hidden='true' className='text-signal'>
            .
          </span>
          {children}
        </Tag>
        {label ? (
          <p className='label label-bracket mt-4 text-ink-3 [[data-surface=light]_&]:text-paper-2'>
            {label}
          </p>
        ) : null}
      </div>
      {aside ? <div className='shrink-0 md:pb-2'>{aside}</div> : null}
    </div>
  );
}
