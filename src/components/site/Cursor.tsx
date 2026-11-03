import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], label, summary, select, [data-cursor]';
const TEXT_INPUT = 'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
const MAGNET_STRENGTH = 0.28;
const MAGNET_MAX = 10;

/**
 * A precise cursor for mice and trackpads: a dot exactly at the pointer and a
 * ring that wraps whatever you can click. Buttons marked `data-magnetic` lean
 * toward the pointer. Touch screens and keyboards never see any of it.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    const pointer = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100, w: 30, h: 30, r: 15 };
    const target = { x: -100, y: -100, w: 30, h: 30, r: 15 };
    let visible = false;
    let frame = 0;
    let magnet: HTMLElement | null = null;
    let hovering: Element | null = null;

    const setVisible = (value: boolean) => {
      if (visible === value) return;
      visible = value;
      dot.style.opacity = value ? '1' : '0';
      ring.style.opacity = value ? '1' : '0';
    };

    const releaseMagnet = () => {
      if (magnet) {
        magnet.style.transform = '';
        magnet = null;
      }
    };

    const loop = () => {
      frame = 0;
      const ease = reduced ? 1 : 0.32;
      ringPos.x += (target.x - ringPos.x) * ease;
      ringPos.y += (target.y - ringPos.y) * ease;
      ringPos.w += (target.w - ringPos.w) * ease;
      ringPos.h += (target.h - ringPos.h) * ease;
      ringPos.r += (target.r - ringPos.r) * ease;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x - ringPos.w / 2}px, ${ringPos.y - ringPos.h / 2}px, 0)`;
      ring.style.width = `${ringPos.w}px`;
      ring.style.height = `${ringPos.h}px`;
      ring.style.borderRadius = `${ringPos.r}px`;
      const settled =
        Math.abs(target.x - ringPos.x) < 0.1 &&
        Math.abs(target.y - ringPos.y) < 0.1 &&
        Math.abs(target.w - ringPos.w) < 0.1 &&
        Math.abs(target.h - ringPos.h) < 0.1;
      if (!settled) frame = requestAnimationFrame(loop);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const el = event.target instanceof Element ? event.target : null;

      if (el !== hovering) {
        hovering = el;
        const onLight = Boolean(el?.closest('[data-surface="light"]'));
        root.dataset.cursorSurface = onLight ? 'light' : 'dark';
        const typing = Boolean(el?.closest(TEXT_INPUT));
        root.dataset.cursorHidden = typing ? 'true' : 'false';
      }

      const magnetic = el?.closest<HTMLElement>('[data-magnetic]') ?? null;
      if (magnetic !== magnet) {
        releaseMagnet();
        magnet = magnetic;
      }

      const interactive = el?.closest(INTERACTIVE);
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (pointer.x - cx) * MAGNET_STRENGTH));
        const dy = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (pointer.y - cy) * MAGNET_STRENGTH));
        if (!reduced) magnet.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        const radius = Number.parseFloat(getComputedStyle(magnet).borderTopLeftRadius) || 0;
        target.x = cx + (reduced ? 0 : dx);
        target.y = cy + (reduced ? 0 : dy);
        target.w = rect.width + 10;
        target.h = rect.height + 10;
        target.r = Math.min(radius + 5, (rect.height + 10) / 2);
        root.dataset.cursorState = 'magnet';
      } else {
        target.x = pointer.x;
        target.y = pointer.y;
        const size = interactive ? 46 : 30;
        target.w = size;
        target.h = size;
        target.r = size / 2;
        root.dataset.cursorState = interactive ? 'link' : 'idle';
      }
      setVisible(true);
      schedule();
    };

    const onLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        setVisible(false);
        releaseMagnet();
      }
    };
    const onDown = () => root.setAttribute('data-cursor-down', 'true');
    const onUp = () => root.removeAttribute('data-cursor-down');
    const onScroll = () => {
      // The element under a still pointer changes while the page scrolls.
      if (magnet) {
        releaseMagnet();
        target.w = 30;
        target.h = 30;
        target.r = 15;
        target.x = pointer.x;
        target.y = pointer.y;
        root.dataset.cursorState = 'idle';
        schedule();
      }
      hovering = null;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      releaseMagnet();
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div aria-hidden='true' className='ns-cursor pointer-events-none fixed inset-0 z-[100] hidden'>
      <div ref={ringRef} className='ns-cursor-ring' />
      <div ref={dotRef} className='ns-cursor-dot' />
    </div>
  );
}
