import { createFileRoute, Link } from '@tanstack/react-router';
import { Services } from '~/components/home/Services';
import { SectionTitle } from '~/components/site/SectionTitle';
import { experience } from '~/content/about';
import { clients } from '~/content/clients';
import { crew } from '~/content/crew';
import { caseStudies } from '~/content/work';
import { organizationJsonLd } from '~/lib/structured-data';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: `About — ${portfolio.name}`,
      description: `${portfolio.crewSize} people in ${portfolio.location.neighbourhood}, ${portfolio.location.city}: who we are, what we do, who we have worked for, and our studio CV.`,
      path: '/about',
      jsonLd: organizationJsonLd()
    }),
  component: About
});

const WORDS = ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
const countWord = (n: number) => WORDS[n] ?? String(n);

function About() {
  const { location, availability } = portfolio;
  const caseFor = (name: string) => caseStudies.find((study) => study.client === name);
  const withCase = clients.filter((client) => caseFor(client.name)).length;
  const facts = [
    { k: 'Founded', v: String(portfolio.founded) },
    { k: 'Crew', v: String(portfolio.crewSize).padStart(2, '0') },
    { k: 'Projects a quarter', v: String(availability.slotsPerQuarter) },
    { k: 'Base', v: location.neighbourhood }
  ];

  return (
    <>
      <section aria-labelledby='about-title' className='frame'>
        <div className='frame-pad pb-12 pt-14 md:pb-16 md:pt-20'>
          <SectionTitle as='h1' id='about-title' label={`${portfolio.role} · ${location.city}`}>
            about
          </SectionTitle>
          <p className='mt-10 max-w-[24ch] font-display text-[clamp(32px,4.2vw,64px)] leading-[0.98] tracking-[-0.04em]'>
            A small studio on purpose, on a peninsula in the Maas.
          </p>
        </div>
        <dl className='grid grid-cols-2 border-t border-line lg:grid-cols-4'>
          {facts.map((fact, i) => (
            <div
              key={fact.k}
              className={`frame-pad border-line py-6 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className='label text-ink-3'>{fact.k}</dt>
              <dd className='mt-2 font-display text-[clamp(26px,3.2vw,48px)] leading-none tracking-[-0.04em] [overflow-wrap:anywhere]'>
                {fact.v}
              </dd>
            </div>
          ))}
        </dl>
        <div className='grid border-t border-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'>
          <div className='frame-pad border-b border-line py-10 lg:border-b-0 lg:border-r lg:py-14'>
            <p className='label label-bracket text-ink-3'>The studio</p>
          </div>
          <div className='frame-pad prose-ns max-w-[68ch] py-10 text-[18px] leading-relaxed text-ink-2 lg:py-14'>
            {portfolio.bio.long.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <Services />

      <section aria-labelledby='crew-title' className='frame border-t border-line'>
        <div className='frame-pad pb-10 pt-20 md:pb-14 md:pt-28'>
          <SectionTitle id='crew-title' label='Who does the work, and where they worked before'>
            crew
          </SectionTitle>
        </div>
        <ul className='grid border-t border-line md:grid-cols-2 lg:grid-cols-3'>
          {crew.map((member) => (
            <li key={member.name} className='frame-pad flex flex-col border-b border-r border-line py-8'>
              <p className='font-display text-[28px] leading-none tracking-[-0.035em]'>{member.name}</p>
              <p className='label mt-3 text-signal'>{member.role}</p>
              <p className='mt-5 text-[16px] leading-relaxed text-ink-2'>{member.bio}</p>
              <p className='label mt-auto pt-6 text-ink-3'>Before: {member.before}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby='experience-title' className='frame border-t border-line'>
        <div className='frame-pad pb-10 pt-20 md:pb-14 md:pt-28'>
          <SectionTitle id='experience-title' label={`Nine years, newest first`}>
            experience
          </SectionTitle>
        </div>
        <ol className='border-t border-line'>
          {experience.map((item) => (
            <li
              key={item.year + item.title}
              className='frame-pad grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-[120px_minmax(0,4fr)_minmax(0,6fr)] md:py-8'
            >
              <span className='font-display text-[22px] tracking-[-0.03em] text-signal md:text-[26px]'>{item.year}</span>
              <h3 className='font-display text-[24px] leading-[1.05] tracking-[-0.03em] md:text-[28px]'>{item.title}</h3>
              <p className='max-w-[56ch] text-[16px] leading-relaxed text-ink-2'>{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby='selected-title' className='frame border-t border-line'>
        <div className='grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'>
          <div className='frame-pad border-b border-line py-14 lg:border-b-0 lg:border-r lg:py-20'>
            <h2 id='selected-title' className='font-display text-[clamp(40px,5vw,76px)] leading-[0.88] tracking-[-0.045em]'>
              <span aria-hidden='true' className='text-signal'>.</span>selected clients
            </h2>
            <p className='mt-6 max-w-[40ch] text-[16px] leading-relaxed text-ink-2'>
              A cross-section of the last nine years.{' '}
              {withCase === 1 ? 'One of them has' : `${countWord(withCase)} of them have`} a full case study, marked ↗.
            </p>
            <Link to='/work' className='btn btn-line mt-8 h-10 text-[11px]'>
              Read the case studies →
            </Link>
          </div>
          <ul className='grid sm:grid-cols-2'>
            {clients.map((client, i) => {
              const study = caseFor(client.name);
              const row = 'frame-pad flex items-baseline justify-between gap-4 py-4';
              const content = (
                <>
                  <span className='text-[16px] text-ink'>
                    {client.name}
                    {study ? (
                      <span aria-hidden='true' className='ml-1.5 text-signal'>
                        ↗
                      </span>
                    ) : null}
                  </span>
                  <span className='label shrink-0 text-ink-3'>{client.sector}</span>
                </>
              );
              return (
                <li key={client.name} className={`flex border-b border-line ${i % 2 === 0 ? 'sm:border-r' : ''}`}>
                  {study ? (
                    <Link
                      to='/work/$slug'
                      params={{ slug: study.slug }}
                      className={`${row} w-full transition-colors hover:bg-surface`}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className={`${row} w-full`}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby='cv-title' className='frame border-t border-line'>
        <div className='frame-pad flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20'>
          <div>
            <p className='label label-bracket text-ink-3'>PDF · 2 pages · A4</p>
            <h2 id='cv-title' className='mt-5 font-display text-[clamp(34px,4vw,60px)] leading-[0.92] tracking-[-0.045em]'>
              The studio CV, for your procurement folder.
            </h2>
            <p className='mt-5 max-w-[52ch] text-[16px] leading-relaxed text-ink-2'>
              The crew, the services, selected clients and the timeline on two printable pages, with our address and
              company details.
            </p>
          </div>
          <a href={portfolio.cvFile} download data-magnetic className='btn btn-signal shrink-0'>
            Download the CV
          </a>
        </div>
      </section>
    </>
  );
}
