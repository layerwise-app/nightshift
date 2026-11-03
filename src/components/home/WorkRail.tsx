import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { SectionTitle } from '~/components/site/SectionTitle';
import { WorkCard } from '~/components/work/WorkCard';
import { caseStudies } from '~/content/work';

const PINNED = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/**
 * Selected work. On desktop the section pins and vertical scrolling slides a
 * rail of case cards sideways; each card turns slightly on its axis as it
 * passes the middle of the screen. Phones, tablets and reduced motion get a
 * plain grid that scrolls normally. The pinned height comes from CSS (card
 * width × count), so it is right before any script runs.
 */
export function WorkRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const years = caseStudies.map((s) => s.year);
  const range = `${Math.min(...years)}–${Math.max(...years)}`;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const media = window.matchMedia(PINNED);
    let frame = 0;
    let travel = 0;
    let top = 0;
    let active = false;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-rail-card]'));
    const tilted = cards.filter((card) => card.dataset.railCard === 'case');

    const measure = () => {
      const last = cards[cards.length - 1];
      const padEnd = Number.parseFloat(getComputedStyle(track).paddingRight) || 0;
      travel = last ? Math.max(0, last.offsetLeft + last.offsetWidth + padEnd - track.clientWidth) : 0;
      section.style.setProperty('--travel', `${travel}px`);
      top = section.getBoundingClientRect().top + window.scrollY;
    };

    const update = () => {
      frame = 0;
      if (!active) return;
      const progress = travel > 0 ? Math.min(1, Math.max(0, (window.scrollY - top) / travel)) : 0;
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      const mid = window.innerWidth / 2;
      let current = 0;
      tilted.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const offset = (rect.left + rect.width / 2 - mid) / mid; // -1 left edge … 1 right edge
        const clamped = Math.max(-1.4, Math.min(1.4, offset));
        card.style.transform = `perspective(1400px) rotateY(${clamped * -9}deg) rotateZ(${clamped * 0.9}deg) translateY(${Math.abs(clamped) * 10}px)`;
        if (rect.left < mid) current = i;
      });
      if (countRef.current) countRef.current.textContent = String(Math.min(current + 1, caseStudies.length)).padStart(2, '0');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const setMode = () => {
      active = media.matches;
      if (active) {
        measure();
        update();
      } else {
        track.style.transform = '';
        section.style.removeProperty('--travel');
        for (const card of cards) card.style.transform = '';
      }
    };
    setMode();

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) schedule();
    });
    io.observe(section);
    const onResize = () => {
      setMode();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    media.addEventListener('change', setMode);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      media.removeEventListener('change', setMode);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id='work'
      aria-labelledby='work-title'
      className='work-rail frame border-t border-line'
      style={{ '--n': caseStudies.length + 1 } as React.CSSProperties}
    >
      <div className='work-rail-sticky'>
        <div className='frame-pad pb-8 pt-20 md:pt-28 lg:pt-[clamp(32px,7vh,72px)] lg:pb-[clamp(20px,4vh,40px)]'>
          <SectionTitle
            id='work-title'
            label={`${caseStudies.length} selected cases · ${range}`}
            aside={
              <Link to='/work' className='btn btn-line h-10 text-[11px]'>
                All work →
              </Link>
            }
          >
            work
          </SectionTitle>
        </div>

        <div className='work-rail-viewport'>
          <div ref={trackRef} className='work-rail-track frame-pad'>
            {caseStudies.map((study, i) => (
              <div key={study.slug} data-rail-card='case' className='work-rail-card'>
                <WorkCard
                  study={study}
                  index={i}
                  sizes='(min-width: 1024px) 34vw, (min-width: 768px) 46vw, 100vw'
                />
              </div>
            ))}
            <div data-rail-card='end' className='work-rail-card work-rail-end'>
              <Link
                to='/work'
                className='flex aspect-[3/2] flex-col justify-between rounded-[4px] border border-line p-6 transition-colors hover:border-signal'
              >
                <span className='label text-ink-3'>Index</span>
                <span className='font-display text-[clamp(32px,3vw,46px)] leading-[0.95] tracking-[-0.04em]'>
                  Every project, with the numbers{' '}
                  <span className='text-signal'>→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden='true' className='work-rail-progress frame-pad hidden items-center gap-4 pb-[clamp(20px,4vh,36px)] pt-6'>
          <span className='label text-ink-3'>
            <span ref={countRef} className='text-ink'>01</span> / {String(caseStudies.length).padStart(2, '0')}
          </span>
          <span className='relative h-px flex-1 bg-line'>
            <span ref={barRef} className='absolute inset-0 origin-left bg-signal' style={{ transform: 'scaleX(0)' }} />
          </span>
          <span className='label text-ink-3'>Scroll</span>
        </div>
      </div>
    </section>
  );
}
