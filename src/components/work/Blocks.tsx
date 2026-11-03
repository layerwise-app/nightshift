import type { Block, Metric } from '~/content/types';
import { Picture } from '~/components/site/Picture';
import { cn } from '~/lib/utils';
import { BeforeAfter } from './BeforeAfter';
import { DemoStage } from './DemoStage';
import { VideoBlock } from './VideoBlock';

function Caption({ children }: { children?: string }) {
  if (!children) return null;
  return <p className='label mt-3 max-w-[70ch] text-ink-3 normal-case tracking-normal text-[12px] leading-relaxed'>{children}</p>;
}

export function MetricGrid({ items, className }: { items: Metric[]; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-2 border-t border-l border-line lg:grid-cols-4', className)}>
      {items.map((metric) => (
        <div key={metric.label} className='min-w-0 border-b border-r border-line p-4 sm:p-5 md:p-7'>
          <dt className='sr-only'>{metric.label}</dt>
          <dd>
            <span className='block whitespace-nowrap font-display text-[clamp(32px,5vw,76px)] leading-[0.9] tracking-[-0.045em]'>
              {metric.value}
            </span>
            <span className='mt-3 block text-[15px] leading-snug text-ink-2'>{metric.label}</span>
            {metric.note ? <span className='label mt-2 block text-ink-3'>{metric.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'demo':
      return (
        <div className='grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10'>
          <div className='lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start lg:py-6'>
            <p className='label label-bracket flex items-center gap-2 text-signal'>
              Live demo
            </p>
            <h3 className='mt-4 font-display text-[clamp(32px,3.4vw,52px)] leading-[0.95] tracking-[-0.04em]'>
              {block.title}
            </h3>
            <p className='mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-2'>{block.caption}</p>
            <p className='mt-6 flex max-w-[46ch] gap-3 border-t border-line pt-4 text-[15px] text-ink'>
              <span aria-hidden='true' className='label pt-[3px] text-signal'>Try</span>
              <span>{block.hint}</span>
            </p>
          </div>
          <div className='-mx-5 md:mx-0'>
            <DemoStage block={block} />
          </div>
        </div>
      );
    case 'image':
      return (
        <figure>
          <div className='overflow-hidden rounded-[6px]'>
            <Picture img={block.image} sizes='(min-width: 1024px) 88vw, 100vw' />
          </div>
          {block.caption ? <figcaption><Caption>{block.caption}</Caption></figcaption> : null}
        </figure>
      );
    case 'pair':
      return (
        <figure>
          <div className='grid gap-3 md:grid-cols-2 md:gap-4'>
            {block.images.map((img) => (
              <div key={img.src} className='overflow-hidden rounded-[6px]'>
                <Picture img={img} sizes='(min-width: 768px) 44vw, 100vw' />
              </div>
            ))}
          </div>
          {block.caption ? <figcaption><Caption>{block.caption}</Caption></figcaption> : null}
        </figure>
      );
    case 'video':
      return (
        <figure>
          <VideoBlock video={block.video} poster={block.poster} />
          {block.caption ? <figcaption><Caption>{block.caption}</Caption></figcaption> : null}
        </figure>
      );
    case 'text':
      return (
        <div className='grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10'>
          {block.heading ? (
            <h3 className='font-display text-[clamp(28px,2.8vw,42px)] leading-[0.98] tracking-[-0.035em]'>
              {block.heading}
            </h3>
          ) : (
            <span />
          )}
          <div className='prose-ns max-w-[62ch] text-[18px] leading-relaxed text-ink-2'>
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      );
    case 'quote':
      return (
        <figure className='border-l-2 border-signal pl-6 md:pl-10'>
          <blockquote className='font-display text-[clamp(28px,3.6vw,56px)] leading-[1.02] tracking-[-0.035em]'>
            <p>“{block.quote}”</p>
          </blockquote>
          <figcaption className='mt-6 text-[15px] text-ink-2'>
            <span className='text-ink'>{block.name}</span>, {block.role}
          </figcaption>
        </figure>
      );
    case 'beforeAfter':
      return (
        <figure>
          <BeforeAfter before={block.before} after={block.after} labels={block.labels} />
          {block.caption ? <figcaption><Caption>{block.caption}</Caption></figcaption> : null}
        </figure>
      );
    case 'metrics':
      return (
        <div>
          {block.heading ? (
            <h3 className='mb-6 font-display text-[clamp(28px,2.8vw,42px)] leading-[0.98] tracking-[-0.035em]'>
              {block.heading}
            </h3>
          ) : null}
          <MetricGrid items={block.items} />
        </div>
      );
  }
}
