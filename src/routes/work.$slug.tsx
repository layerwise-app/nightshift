import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Picture } from '~/components/site/Picture';
import { CaseBlock, MetricGrid } from '~/components/work/Blocks';
import { caseStudies, getCaseStudy, nextCaseStudy } from '~/content/work';
import { shareImageFor } from '~/lib/images';
import { caseStudyJsonLd } from '~/lib/structured-data';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    if (!getCaseStudy(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const study = loaderData ? getCaseStudy(loaderData.slug) : undefined;
    if (!study) return seo({ title: `Not found — ${portfolio.name}`, noindex: true });
    return seo({
      title: `${study.client}: ${study.title} — ${portfolio.shortName}`,
      description: study.summary,
      path: `/work/${study.slug}`,
      image: shareImageFor(study.slug) ?? study.cover.src,
      imageAlt: study.cover.alt,
      type: 'article',
      jsonLd: caseStudyJsonLd(study)
    });
  },
  component: CaseStudyPage
});

function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className='label flex items-center gap-3 text-ink-3'>
      <span className='text-signal'>{n}</span>
      <span aria-hidden='true' className='h-px w-6 bg-line-strong' />
      {children}
    </p>
  );
}

function CaseStudyPage() {
  const { slug } = Route.useLoaderData();
  const study = getCaseStudy(slug);
  if (!study) return null;
  const next = nextCaseStudy(slug);
  const index = caseStudies.findIndex((s) => s.slug === slug) + 1;

  const meta = [
    { k: 'Client', v: study.client },
    { k: 'Year', v: String(study.year) },
    { k: 'Sector', v: study.sector },
    { k: 'Role', v: study.role.join(', ') },
    { k: 'Team', v: study.team.join(', ') }
  ];

  return (
    <article>
      <header className='frame'>
        <div className='frame-pad pb-10 pt-8 md:pb-14 md:pt-12'>
          <nav aria-label='Breadcrumb' className='label text-ink-3'>
            <Link to='/work' className='hover:text-ink'>
              ← Work
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-ink'>
              {String(index).padStart(2, '0')} of {String(caseStudies.length).padStart(2, '0')}
            </span>
          </nav>
          <p className='label label-bracket mt-10 text-ink-3 md:mt-16'>
            {study.client} · {study.year}
          </p>
          <h1 className='mt-5 max-w-[16ch] font-display text-[clamp(44px,7.4vw,124px)] leading-[0.88]'>
            {study.title}
          </h1>
          <p className='mt-7 max-w-[52ch] text-[18px] leading-relaxed text-ink-2 md:text-[20px]'>
            {study.summary}
          </p>
        </div>
        <dl className='grid border-t border-line sm:grid-cols-2 lg:grid-cols-[1fr_0.6fr_1fr_1.4fr_1.6fr]'>
          {meta.map((item, i) => (
            <div
              key={item.k}
              className={`frame-pad border-b border-line py-5 lg:border-b-0 ${i > 0 ? 'lg:border-l' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''}`}
            >
              <dt className='label text-ink-3'>{item.k}</dt>
              <dd className='mt-2 text-[15px] leading-snug text-ink'>{item.v}</dd>
            </div>
          ))}
        </dl>
        <div className='border-t border-line p-2 md:p-3'>
          <Picture img={study.cover} sizes='100vw' priority className='rounded-[4px]' />
        </div>
      </header>

      <section aria-labelledby='problem' className='frame border-t border-line'>
        <h2 id='problem' className='sr-only'>The problem</h2>
        <div className='grid lg:grid-cols-2'>
          <div className='frame-pad border-b border-line py-12 md:py-16 lg:border-b-0 lg:border-r'>
            <Label n='01'>The brief</Label>
            <p className='mt-6 max-w-[34ch] font-display text-[clamp(26px,2.5vw,38px)] leading-[1.06] tracking-[-0.03em]'>
              {study.problem.brief}
            </p>
          </div>
          <div className='frame-pad py-12 md:py-16'>
            <Label n='02'>The constraint</Label>
            <p className='mt-6 max-w-[52ch] text-[18px] leading-relaxed text-ink-2'>{study.problem.constraint}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby='decisions' className='frame border-t border-line'>
        <div className='frame-pad py-12 md:py-16'>
          <Label n='03'>Decisions</Label>
          <h2 id='decisions' className='sr-only'>Decisions</h2>
          <ol className='mt-8 border-t border-line'>
            {study.decisions.map((decision, i) => (
              <li
                key={decision.title}
                className='grid gap-3 border-b border-line py-7 md:grid-cols-[80px_minmax(0,5fr)_minmax(0,7fr)] md:gap-8 md:py-9'
              >
                <span className='label pt-2 text-ink-3'>{String(i + 1).padStart(2, '0')}</span>
                <h3 className='font-display text-[clamp(24px,2.3vw,34px)] leading-[1.02] tracking-[-0.03em]'>
                  {decision.title}
                </h3>
                <p className='max-w-[60ch] text-[17px] leading-relaxed text-ink-2'>{decision.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label='The work' className='frame border-t border-line'>
        <div className='frame-pad space-y-16 py-14 md:space-y-24 md:py-20'>
          {study.blocks.map((block, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: blocks are a fixed list from the content file
            <CaseBlock key={i} block={block} />
          ))}
        </div>
      </section>

      <section aria-labelledby='outcome' className='frame border-t border-line'>
        <div className='frame-pad py-12 md:py-16'>
          <Label n='04'>Outcome</Label>
          <h2 id='outcome' className='mt-6 max-w-[30ch] font-display text-[clamp(28px,3.2vw,48px)] leading-[1.02] tracking-[-0.035em]'>
            {study.outcome.summary}
          </h2>
          <MetricGrid items={study.outcome.metrics} className='mt-10' />
        </div>
      </section>

      <nav aria-label='Next project' className='frame border-t border-line'>
        <Link
          to='/work/$slug'
          params={{ slug: next.slug }}
          className='group grid items-center gap-6 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:py-14 frame-pad'
        >
          <div>
            <p className='label label-bracket text-ink-3'>Next project</p>
            <p className='mt-4 font-display text-[clamp(40px,6vw,96px)] leading-[0.9]'>
              <span aria-hidden='true' className='text-signal'>.</span>
              {next.client.toLowerCase()}
            </p>
            <p className='mt-4 max-w-[44ch] text-[16px] text-ink-2'>{next.title}</p>
          </div>
          <div className='overflow-hidden rounded-[4px]'>
            <Picture
              img={next.cover}
              sizes='(min-width: 768px) 420px, 100vw'
              className='transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]'
            />
          </div>
        </Link>
      </nav>
    </article>
  );
}
