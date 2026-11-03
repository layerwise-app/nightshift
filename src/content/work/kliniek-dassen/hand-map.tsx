import { useRef, useState } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { C, Icon, SANS, serif, Wordmark } from './brand';
import { HandDrawing, ZONES, zoneById, type ZoneId } from './hand';

const HAND_W = 252;
const HAND_H = (HAND_W * 344) / 300;
const FOCUS = 'outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#E9A26B]';

/**
 * "Where does it hurt?" — the hand map from the practice site, on a phone.
 * Every area is a real button on the drawing and again in a plain list, and
 * the result opens in a sheet you close with a button, never a drag.
 */
export function HandMapScreen({
  initialZone = null,
  initialOpen = initialZone !== null
}: {
  initialZone?: ZoneId | null;
  /** Start with the result sheet open (true when an area is given). */
  initialOpen?: boolean;
}) {
  const [zoneId, setZoneId] = useState<ZoneId | null>(initialZone);
  const [open, setOpen] = useState(initialOpen);
  // The sheet keeps showing the last area while it slides away.
  const [shownId, setShownId] = useState<ZoneId | null>(initialZone);
  const [showReferral, setShowReferral] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const zone = shownId ? zoneById(shownId) : null;

  const choose = (id: ZoneId, button: HTMLButtonElement) => {
    opener.current = button;
    setZoneId(id);
    setShownId(id);
    setOpen(true);
    setShowReferral(false);
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  };
  const close = () => {
    setOpen(false);
    setZoneId(null);
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  };

  return (
    <div className='relative h-full w-full overflow-hidden' style={{ background: C.chalk, color: C.ink, fontFamily: SANS }}>
      <PhoneStatusBar tone='dark' time='08:42' />
      <div className='flex h-[52px] items-center justify-between px-5'>
        <Wordmark size={17} />
        <span className='flex overflow-hidden rounded-full text-[12px] font-semibold' style={{ border: `1px solid ${C.line}` }}>
          <span className='px-2.5 py-1' style={{ color: C.muted }}>NL</span>
          <span className='px-2.5 py-1' style={{ background: C.ink, color: C.chalk }}>EN</span>
        </span>
      </div>

      <div inert={open} className='absolute inset-x-0 bottom-0 top-[96px] overflow-y-auto overscroll-contain px-5 pb-8'>
        <p className='mt-3 text-[12px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.sageDeep }}>
          Hand map · right hand, palm side
        </p>
        <h1 className='mt-2' style={serif(36, 440)}>Where does it hurt?</h1>
        <p className='mt-2 text-[15px] leading-[1.45]' style={{ color: C.inkSoft }}>
          Tap the area that hurts. You will see what it often is, and what usually helps.
        </p>

        <div className='relative mx-auto mt-3' style={{ width: HAND_W, height: HAND_H }}>
          <HandDrawing selected={zoneId} width={HAND_W} />
          {ZONES.map((z) => {
            const active = z.id === zoneId;
            return (
              <button
                key={z.id}
                type='button'
                aria-label={z.label}
                aria-pressed={active}
                onClick={(e) => choose(z.id, e.currentTarget)}
                className={`absolute flex size-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${FOCUS}`}
                style={{ left: (z.x / 300) * HAND_W, top: (z.y / 344) * HAND_H }}
              >
                <span
                  className='flex size-[30px] items-center justify-center rounded-full'
                  style={{
                    background: active ? C.apricot : C.paper,
                    border: `2px solid ${C.ink}`,
                    boxShadow: '0 2px 6px rgba(18,52,59,0.18)'
                  }}
                >
                  <span className='size-[8px] rounded-full' style={{ background: C.ink }} />
                </span>
              </button>
            );
          })}
        </div>

        <p className='mt-4 text-[13px] font-semibold' style={{ color: C.muted }}>Or choose from the list</p>
        <ul className='mt-2 overflow-hidden rounded-[16px]' style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          {ZONES.map((z, i) => (
            <li key={z.id} style={{ borderTop: i ? `1px solid ${C.line}` : undefined }}>
              <button
                type='button'
                onClick={(e) => choose(z.id, e.currentTarget)}
                className={`flex h-[52px] w-full items-center justify-between px-4 text-left text-[16px] font-medium ${FOCUS}`}
              >
                {z.label}
                <Icon name='chev' size={18} color={C.muted} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className='sr-only' aria-live='polite'>
        {open && zone ? `${zone.label}: ${zone.conditions.length} common causes shown.` : ''}
      </p>

      {/* scrim: a tap outside closes the sheet; keyboard users use "Change area" */}
      <div
        aria-hidden='true'
        onClick={close}
        className='absolute inset-0 transition-opacity duration-300'
        style={{ background: 'rgba(18,52,59,0.32)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />

      <section
        aria-label='What it often is'
        inert={!open}
        className='absolute inset-x-0 bottom-0 flex h-[704px] flex-col rounded-t-[28px] transition-transform duration-300 ease-out'
        style={{
          background: C.paper,
          boxShadow: '0 -12px 40px rgba(18,52,59,0.18)',
          transform: open ? 'translateY(0)' : 'translateY(104%)'
        }}
      >
        {zone ? (
          <>
            <div className='flex items-start gap-3 px-5 pt-5'>
              <div className='shrink-0 rounded-[14px] p-1' style={{ background: C.sageSoft }}>
                <HandDrawing selected={zone.id} width={58} />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='text-[12px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.sageDeep }}>
                  {zone.label} · {zone.conditions.length} common causes
                </p>
                <h2 ref={headingRef} tabIndex={-1} className='mt-1.5 outline-none' style={serif(25, 460, { lineHeight: 1.08 })}>
                  {zone.heading}
                </h2>
              </div>
            </div>
            <div className='px-5 pt-3'>
              <button
                type='button'
                onClick={close}
                className={`inline-flex h-[44px] items-center gap-2 rounded-full px-4 text-[14px] font-semibold ${FOCUS}`}
                style={{ border: `1px solid ${C.lineStrong}` }}
              >
                <Icon name='close' size={16} /> Change area
              </button>
            </div>

            <ol className='mt-3 min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-5 pb-3'>
              {zone.conditions.map((c) => (
                <li key={c.name} className='rounded-[16px] p-4' style={{ background: C.chalk }}>
                  <div className='flex items-baseline justify-between gap-3'>
                    <h3 className='text-[17px] font-semibold leading-snug'>{c.name}</h3>
                    <span className='shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold' style={{ background: C.sageSoft, color: C.ink }}>
                      {c.recovery}
                    </span>
                  </div>
                  <p className='mt-1.5 text-[14.5px] leading-[1.45]' style={{ color: C.inkSoft }}>{c.feels}</p>
                  <p className='mt-2 text-[14px] leading-[1.45]'>
                    <span className='font-semibold'>Often helps: </span>
                    {c.helps}
                  </p>
                </li>
              ))}
            </ol>

            <div className='px-5 pb-6 pt-3' style={{ borderTop: `1px solid ${C.line}` }}>
              <p className='flex items-center gap-2 text-[14px]'>
                <Icon name='clock' size={18} color={C.sageDeep} />
                <span>
                  First consult: <strong>about {zone.waitWeeks} weeks</strong>
                </span>
                <span className='ml-auto text-[12px]' style={{ color: C.muted }}>updated Mon 3 Nov</span>
              </p>
              <button
                type='button'
                aria-expanded={showReferral}
                onClick={() => setShowReferral((v) => !v)}
                className={`mt-3 flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[16px] font-semibold ${FOCUS}`}
                style={{ background: C.apricot, color: C.ink }}
              >
                Ask your GP for a referral <Icon name={showReferral ? 'close' : 'arrow'} size={18} />
              </button>
              {showReferral ? (
                <p className='mt-3 rounded-[12px] p-3 text-[13.5px] leading-[1.45]' style={{ background: C.apricotSoft }}>
                  Your GP (huisarts) can upload the referral at kliniekdassen.nl/verwijzen. We text you within two working days to pick a time.
                </p>
              ) : null}
              <p className='mt-3 flex gap-2 text-[12.5px] leading-[1.4]' style={{ color: C.muted }}>
                <Icon name='info' size={16} color={C.muted} />
                This is not a diagnosis. Your GP or one of our surgeons will look at your hand.
              </p>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
