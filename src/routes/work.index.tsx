import { createFileRoute, Link } from '@tanstack/react-router';
import { SectionTitle } from '~/components/site/SectionTitle';
import { WorkCard } from '~/components/work/WorkCard';
import { caseStudies } from '~/content/work';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/work/')({
  head: () =>
    seo({
      title: `Work — ${portfolio.name}`,
      description: `Case studies from ${portfolio.name}: ticketing, rebrands, a surgeon’s practice, a furniture shop, an oral care brand and an industrial portal.`,
      path: '/work'
    }),
  component: WorkIndex
});

function WorkIndex() {
  const years = caseStudies.map((s) => s.year);
  return (
    <>
      <section aria-labelledby='work-title' className='frame'>
        <div className='frame-pad pb-12 pt-14 md:pb-16 md:pt-20'>
          <SectionTitle
            as='h1'
            id='work-title'
            label={`${caseStudies.length} projects · ${Math.min(...years)}–${Math.max(...years)}`}
          >
            work
          </SectionTitle>
          <p className='mt-8 max-w-[56ch] text-[18px] leading-relaxed text-ink-2'>
            Every project below shipped and is still running. Each case shows the brief, the constraint we had to work
            around, what we decided, and what happened after launch. Most have a live demo of the screen that mattered
            most.
          </p>
        </div>
        <div className='frame-pad grid gap-x-5 gap-y-14 border-t border-line pb-20 pt-10 md:grid-cols-2 md:gap-y-16 md:pt-12'>
          {caseStudies.map((study, i) => (
            <WorkCard
              key={study.slug}
              study={study}
              index={i}
              large
              priority={i < 2}
              sizes='(min-width: 768px) 46vw, 100vw'
            />
          ))}
        </div>
      </section>

      <section aria-labelledby='index-title' className='frame border-t border-line'>
        <div className='frame-pad pb-8 pt-16 md:pt-20'>
          <h2 id='index-title' className='font-display text-[clamp(36px,4vw,60px)] leading-[0.9] tracking-[-0.045em]'>
            <span aria-hidden='true' className='text-signal'>.</span>index
          </h2>
          <p className='label label-bracket mt-4 text-ink-3'>Every project, with the number we are proudest of</p>
        </div>
        <ol className='border-t border-line'>
          {caseStudies.map((study, i) => {
            const metric = study.outcome.metrics[0];
            return (
              <li key={study.slug} className='border-b border-line'>
                <Link
                  to='/work/$slug'
                  params={{ slug: study.slug }}
                  className='frame-pad group grid grid-cols-[36px_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-5 transition-colors hover:bg-[color-mix(in_oklab,var(--ns-text)_4%,transparent)] md:grid-cols-[56px_minmax(0,3fr)_minmax(0,2fr)_minmax(0,3fr)_64px_24px] md:py-6'
                >
                  <span className='label text-ink-3'>{String(i + 1).padStart(2, '0')}</span>
                  <span className='font-display text-[22px] leading-tight tracking-[-0.03em] md:text-[26px]'>
                    {study.client}
                  </span>
                  <span className='label text-ink-3 md:hidden'>{study.year}</span>
                  <span className='label col-start-2 text-ink-3 md:col-start-auto'>{study.sector}</span>
                  <span className='col-span-2 col-start-2 text-[15px] text-ink-2 md:col-span-1 md:col-start-auto'>
                    {metric ? (
                      <>
                        <span className='text-ink'>{metric.value}</span>{' '}
                        {metric.label.charAt(0).toLowerCase() + metric.label.slice(1)}
                      </>
                    ) : (
                      study.title
                    )}
                  </span>
                  <span className='label hidden text-ink-3 md:block'>{study.year}</span>
                  <span aria-hidden='true' className='hidden text-signal transition-transform group-hover:translate-x-1 md:block'>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <div className='h-16 md:h-24' />
      </section>
    </>
  );
}
