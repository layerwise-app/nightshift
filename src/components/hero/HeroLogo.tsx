import { useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import { portfolio } from '~/portfolio.config';

/** A rendered frame of the same scene, shown before WebGL starts and when it can't. */
export const LOGO_STILL = {
  src: '/images/logo-scene-1600.webp',
  srcSet: '/images/logo-scene-800.webp 800w, /images/logo-scene-1600.webp 1600w',
  width: 1600,
  height: 1600
};

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * The large 3D logo. The still renders on the server, so the hero is complete
 * before any JavaScript runs. On capable devices Three.js loads afterwards and
 * takes over; it pauses whenever the hero is off screen or the tab is hidden.
 * With reduced motion the still stays: it is the finished state.
 */
export function HeroLogo({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!webglAvailable()) return;

    let disposed = false;
    let frame = 0;
    let visible = false;
    let cleanup = () => {};
    const input = { pointer: { x: 0, y: 0 }, scroll: 0 };
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    import('./logo-scene').then(({ createLogoScene }) => {
      if (disposed) return;
      let scene: ReturnType<typeof createLogoScene>;
      try {
        scene = createLogoScene(canvas, { signal: portfolio.colors.signal });
      } catch {
        return; // Keep the still if the context can't be created.
      }

      const size = () => {
        const rect = wrap.getBoundingClientRect();
        scene.resize(Math.max(1, rect.width), Math.max(1, rect.height));
      };
      size();

      const readScroll = () => {
        const rect = wrap.getBoundingClientRect();
        const travelled = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
        input.scroll = travelled;
      };
      readScroll();

      let first = true;
      const loop = (time: number) => {
        frame = 0;
        if (!visible || document.hidden) return;
        scene.frame(input, time);
        if (first) {
          first = false;
          setLive(true);
        }
        frame = requestAnimationFrame(loop);
      };
      const start = () => {
        if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
      };

      const onPointer = (event: PointerEvent) => {
        input.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        input.pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      };
      const onScroll = () => readScroll();
      const onVisibility = () => start();

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          start();
        },
        { rootMargin: '80px' }
      );
      io.observe(wrap);
      const ro = new ResizeObserver(size);
      ro.observe(wrap);
      if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);

      cleanup = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
        scene.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden [container-type:size]', className)}>
      <img
        src={LOGO_STILL.src}
        srcSet={LOGO_STILL.srcSet}
        sizes='(min-width: 1024px) 50vw, 100vw'
        width={LOGO_STILL.width}
        height={LOGO_STILL.height}
        alt=''
        fetchPriority='high'
        decoding='async'
        className={cn(
          'absolute left-1/2 top-1/2 size-[min(100cqw,100cqh)] max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700',
          live ? 'opacity-0' : 'opacity-100'
        )}
      />
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-700',
          live ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
