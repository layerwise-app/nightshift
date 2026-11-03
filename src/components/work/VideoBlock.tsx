import { useEffect, useRef, useState } from 'react';
import type { Img, VideoAsset } from '~/content/types';

/**
 * A muted, looping screen recording. It plays only while on screen, stays on
 * its poster with reduced motion, and always has a visible play/pause button.
 */
export function VideoBlock({ video, poster }: { video: VideoAsset; poster: Img }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setUserPaused(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [userPaused]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setUserPaused(false);
      el.play().catch(() => {});
    } else {
      setUserPaused(true);
      el.pause();
    }
  };

  return (
    <div className='relative overflow-hidden rounded-[6px] bg-surface'>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload='none'
        poster={poster.src}
        width={poster.width}
        height={poster.height}
        aria-label={poster.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className='h-auto w-full bg-cover'
        style={{ aspectRatio: `${poster.width} / ${poster.height}`, backgroundImage: `url("${poster.blur}")` }}
      >
        {video.webm ? <source src={video.webm} type='video/webm' /> : null}
        <source src={video.mp4} type='video/mp4' />
      </video>
      <button
        type='button'
        onClick={toggle}
        className='label absolute bottom-3 left-3 flex h-9 items-center gap-2 rounded-full bg-bg/85 px-3.5 text-ink'
      >
        <span aria-hidden='true' className='text-signal'>{playing ? '❚❚' : '▶'}</span>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
