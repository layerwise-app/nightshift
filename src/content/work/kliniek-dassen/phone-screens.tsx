import type { ReactNode } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { C, Icon, SANS, serif, Wordmark } from './brand';

function Screen({ children, bg = C.chalk }: { children: ReactNode; bg?: string }) {
  return (
    <div className='relative h-full w-full overflow-hidden' style={{ background: bg, color: C.ink, fontFamily: SANS }}>
      {children}
    </div>
  );
}

function AppBar({ title, step }: { title: string; step?: string }) {
  return (
    <div className='flex h-[52px] items-center justify-between px-5' style={{ borderBottom: `1px solid ${C.line}` }}>
      <span className='flex items-center gap-2 text-[15px] font-semibold'>
        <svg width='20' height='20' viewBox='0 0 20 20' aria-hidden='true'>
          <path d='M12.5 4.5L7 10l5.5 5.5' fill='none' stroke={C.ink} strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        {title}
      </span>
      {step ? <span className='text-[13px] font-medium' style={{ color: C.muted }}>{step}</span> : <Wordmark size={14} />}
    </div>
  );
}

/** Referral step 2 of 3: the letter is attached, the details are filled in. */
export function ReferralUploadScreen() {
  return (
    <Screen>
      <PhoneStatusBar tone='dark' time='10:14' />
      <AppBar title='Upload a referral' step='Step 2 of 3' />
      <div className='px-5'>
        <div className='mt-4 flex gap-1.5'>
          {[1, 1, 0].map((on, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed three-step progress bar
            <span key={i} className='h-[5px] flex-1 rounded-full' style={{ background: on ? C.ink : C.line }} />
          ))}
        </div>
        <h1 className='mt-5' style={serif(30, 440)}>Add your GP’s letter</h1>
        <p className='mt-1.5 text-[15px] leading-[1.45]' style={{ color: C.inkSoft }}>
          A photo is fine. We only use it to plan your first visit.
        </p>

        <div className='mt-4 rounded-[18px] p-4' style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          <div className='flex items-center gap-3'>
            <span className='flex size-[46px] items-center justify-center rounded-[12px]' style={{ background: C.sageSoft }}>
              <Icon name='doc' size={24} color={C.ink} />
            </span>
            <span className='min-w-0 flex-1'>
              <span className='block truncate text-[15px] font-semibold'>verwijzing-huisarts-prins.pdf</span>
              <span className='block text-[13px]' style={{ color: C.muted }}>412 KB · 2 pages</span>
            </span>
            <span className='flex size-[30px] items-center justify-center rounded-full' style={{ background: C.sageDeep }}>
              <Icon name='check' size={18} color='#fff' />
            </span>
          </div>
          <div className='mt-3 h-[5px] overflow-hidden rounded-full' style={{ background: C.sageSoft }}>
            <div className='h-full w-full rounded-full' style={{ background: C.sageDeep }} />
          </div>
          <p className='mt-2 text-[13px] font-medium' style={{ color: C.sageDeep }}>Uploaded and readable</p>
        </div>

        <div className='mt-3 grid grid-cols-2 gap-2.5'>
          {[
            { icon: 'camera' as const, label: 'Take a photo' },
            { icon: 'upload' as const, label: 'Add another file' }
          ].map((b) => (
            <span key={b.label} className='flex h-[56px] items-center justify-center gap-2 rounded-[14px] text-[15px] font-semibold' style={{ border: `1px solid ${C.lineStrong}` }}>
              <Icon name={b.icon} size={20} /> {b.label}
            </span>
          ))}
        </div>

        <div className='mt-4 space-y-2.5'>
          {[
            { k: 'Full name', v: 'Hendrik Prins' },
            { k: 'Date of birth', v: '14 – 02 – 1958' },
            { k: 'Mobile number, for our text', v: '06 41 83 20 57' }
          ].map((f) => (
            <div key={f.k} className='block'>
              <span className='text-[13px] font-semibold' style={{ color: C.inkSoft }}>{f.k}</span>
              <span className='mt-1 flex h-[50px] items-center rounded-[14px] px-4 text-[17px]' style={{ background: C.paper, border: `1px solid ${C.line}` }}>
                {f.v}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 px-5 pb-7 pt-3.5' style={{ background: C.chalk, borderTop: `1px solid ${C.line}` }}>
        <span className='flex h-[56px] w-full items-center justify-center gap-2 rounded-full text-[17px] font-semibold' style={{ background: C.ink, color: C.chalk }}>
          Send referral <Icon name='arrow' size={20} color={C.chalk} />
        </span>
        <p className='mt-2.5 text-center text-[12.5px]' style={{ color: C.muted }}>Sent encrypted to our intake team. No fax needed.</p>
      </div>
    </Screen>
  );
}

/** Referral step 3: received, with a reference and what happens next. */
export function ReferralDoneScreen() {
  const steps = [
    { t: 'We read your referral', d: 'A surgeon decides who you should see. Within 2 working days.', done: true },
    { t: 'We text you a link', d: 'Pick a time that suits you, or call us if you prefer.', done: false },
    { t: 'Your first consult', d: 'Currently in about 4 weeks, at Kralingse Plaslaan 112.', done: false }
  ];
  return (
    <Screen>
      <PhoneStatusBar tone='dark' time='10:16' />
      <AppBar title='Referral sent' step='Step 3 of 3' />
      <div className='px-5'>
        <div className='mt-5 flex size-[52px] items-center justify-center rounded-full' style={{ background: C.sage }}>
          <Icon name='check' size={28} color={C.ink} />
        </div>
        <h1 className='mt-4' style={serif(31, 440)}>We have your referral, Hendrik.</h1>
        <p className='mt-2 text-[15.5px] leading-[1.45]' style={{ color: C.inkSoft }}>
          Nothing else to do right now. Keep this number in case you call us.
        </p>
        <div className='mt-4 flex items-center justify-between rounded-[18px] px-5 py-3.5' style={{ background: C.paper, border: `1px dashed ${C.lineStrong}` }}>
          <span>
            <span className='block text-[12px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.muted }}>Reference</span>
            <span className='mt-0.5 block text-[24px] font-semibold tabular-nums tracking-[0.02em]'>KD-25-04817</span>
          </span>
          <span className='text-right text-[13px]' style={{ color: C.muted }}>
            Tue 4 Nov
            <br />
            10:16
          </span>
        </div>

        <h2 className='mt-6 text-[13px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.sageDeep }}>What happens next</h2>
        <ol className='mt-3'>
          {steps.map((s, i) => (
            <li key={s.t} className='relative flex gap-4 pb-4'>
              {i < steps.length - 1 ? <span className='absolute left-[15px] top-[32px] h-[calc(100%-28px)] w-[2px]' style={{ background: C.line }} /> : null}
              <span
                className='relative flex size-[32px] shrink-0 items-center justify-center rounded-full text-[14px] font-semibold'
                style={{ background: s.done ? C.ink : C.paper, color: s.done ? C.chalk : C.ink, border: `1.5px solid ${C.ink}` }}
              >
                {i + 1}
              </span>
              <span>
                <span className='block text-[16.5px] font-semibold leading-snug'>{s.t}</span>
                <span className='mt-1 block text-[14.5px] leading-[1.45]' style={{ color: C.inkSoft }}>{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className='absolute inset-x-0 bottom-0 px-5 pb-7 pt-3' style={{ background: C.chalk }}>
        <span className='flex h-[54px] w-full items-center justify-center rounded-full text-[17px] font-semibold' style={{ border: `1.5px solid ${C.ink}` }}>
          Prepare for your first visit
        </span>
      </div>
    </Screen>
  );
}

/** The pre-op checklist that arrives a week before surgery. */
export function PrepChecklistScreen() {
  const items = [
    { t: 'Remove rings from both hands', d: 'Tonight. Fingers swell after the operation.', done: true },
    { t: 'Arrange a lift home', d: 'No driving or cycling for 24 hours.', done: true },
    { t: 'Eat a normal breakfast', d: 'You get a local anaesthetic, so no fasting.', done: false },
    { t: 'Bring a list of your medicines', d: 'Including blood thinners and dosages.', done: false },
    { t: 'Wear a loose, short-sleeved top', d: 'The bandage will be thick.', done: false }
  ];
  return (
    <Screen>
      <PhoneStatusBar tone='dark' time='19:02' />
      <AppBar title='Your operation' />
      <div className='px-5'>
        <div className='mt-4 rounded-[20px] p-5' style={{ background: C.ink, color: C.chalk }}>
          <p className='text-[12px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.sage }}>Carpal tunnel release · right hand</p>
          <p className='mt-2' style={serif(30, 420, { color: C.chalk })}>Thursday 15 May, 08:30</p>
          <p className='mt-2 flex items-center gap-2 text-[14px]' style={{ color: C.sageSoft }}>
            <Icon name='pin' size={16} color={C.sage} /> Treatment room 2 · Dr. Imke Dassen
          </p>
        </div>

        <div className='mt-6 flex items-baseline justify-between'>
          <h1 style={serif(24, 460)}>Before you come</h1>
          <span className='text-[14px] font-semibold' style={{ color: C.sageDeep }}>2 of 5 done</span>
        </div>
        <ul className='mt-3 overflow-hidden rounded-[18px]' style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          {items.map((it, i) => (
            <li key={it.t} className='flex gap-3.5 px-4 py-3.5' style={{ borderTop: i ? `1px solid ${C.line}` : undefined }}>
              <span
                className='mt-0.5 flex size-[28px] shrink-0 items-center justify-center rounded-[9px]'
                style={{ background: it.done ? C.sageDeep : 'transparent', border: `2px solid ${it.done ? C.sageDeep : C.lineStrong}` }}
              >
                {it.done ? <Icon name='check' size={18} color='#fff' /> : null}
              </span>
              <span>
                <span className='block text-[16px] font-semibold leading-snug' style={{ textDecoration: it.done ? 'line-through' : undefined, textDecorationColor: C.lineStrong, color: it.done ? C.muted : C.ink }}>
                  {it.t}
                </span>
                <span className='mt-0.5 block text-[14px] leading-[1.4]' style={{ color: C.muted }}>{it.d}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className='mt-4 flex gap-2.5 rounded-[14px] p-3.5 text-[13.5px] leading-[1.45]' style={{ background: C.apricotSoft }}>
          <Icon name='phone' size={18} />
          <span>Questions before Thursday? Call the nurse line, 010 452 18 60, weekdays 08:00–17:00.</span>
        </p>
      </div>
    </Screen>
  );
}

/** The morning of the operation, hour by hour. */
export function DayOfScreen() {
  const times = [
    { at: '08:15', t: 'Arrive at reception', d: 'Ground floor. Your companion can wait in the garden room.' },
    { at: '08:30', t: 'Your surgeon checks your hand', d: 'and marks the spot with a pen.' },
    { at: '08:45', t: 'Local anaesthetic', d: 'One small injection in the palm. You stay awake.' },
    { at: '09:00', t: 'The operation', d: 'About 15 minutes. You will feel pressure, not pain.' },
    { at: '09:30', t: 'Coffee, then home', d: 'With your arm in a sling and a printed care sheet.' }
  ];
  return (
    <Screen>
      <PhoneStatusBar tone='dark' time='07:21' />
      <AppBar title='On the day' />
      <div className='px-5'>
        <p className='mt-5 text-[12px] font-semibold uppercase tracking-[0.08em]' style={{ color: C.sageDeep }}>Thursday 15 May</p>
        <h1 className='mt-2' style={serif(32, 440)}>You will be home before ten.</h1>
        <ol className='mt-6'>
          {times.map((t, i) => (
            <li key={t.at} className='grid grid-cols-[56px_1fr] gap-3 pb-4'>
              <span className='pt-0.5 text-[15px] font-semibold tabular-nums' style={{ color: i === 0 ? C.ink : C.muted }}>{t.at}</span>
              <span className='rounded-[16px] px-4 py-3' style={{ background: i === 0 ? C.apricotSoft : C.paper, border: `1px solid ${i === 0 ? 'transparent' : C.line}` }}>
                <span className='block text-[16px] font-semibold leading-snug'>{t.t}</span>
                <span className='mt-0.5 block text-[14px] leading-[1.4]' style={{ color: C.inkSoft }}>{t.d}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className='mt-1 rounded-[16px] p-4' style={{ background: C.sageSoft }}>
          <p className='text-[15px] font-semibold'>The first 48 hours</p>
          <p className='mt-1 text-[14px] leading-[1.45]' style={{ color: C.inkSoft }}>Keep your hand above your heart. Stitches come out on day 12, at hand therapy.</p>
        </div>
      </div>
    </Screen>
  );
}
