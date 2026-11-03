import type { CSSProperties, ReactNode } from 'react';
import { BROWSER_BAR, BrowserFrame, PHONE, PhoneFrame } from '~/components/frames/frames';
import { defineScenes } from '~/components/frames/scene';
import { C, SANS, serif } from './brand';
import { ConditionPage, HomePage, OldSite, TeamPage, WaitTimesPage } from './desktop-screens';
import { HandMapScreen } from './hand-map';
import { DayOfScreen, PrepChecklistScreen, ReferralDoneScreen, ReferralUploadScreen } from './phone-screens';

/** Still compositions for the Kliniek Dassen case study. Each id is an image name. */

function Place({ x, y, scale = 1, children, style }: { x: number; y: number; scale?: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className='absolute left-0 top-0 origin-top-left' style={{ transform: `translate(${x}px, ${y}px) scale(${scale})`, ...style }}>
      {children}
    </div>
  );
}

function Field({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div className='absolute inset-0 overflow-hidden' style={{ background: bg, fontFamily: SANS, color: C.ink }}>
      {children}
    </div>
  );
}

const PAGE_H = 760;
const browserY = (900 - (PAGE_H + BROWSER_BAR)) / 2;

function Desktop({ children, url = 'kliniekdassen.nl' }: { children: ReactNode; url?: string }) {
  return (
    <Place x={80} y={browserY}>
      <BrowserFrame url={url} width={1280} height={PAGE_H}>
        {children}
      </BrowserFrame>
    </Place>
  );
}

function Phone({ x, y, scale, children }: { x: number; y: number; scale: number; children: ReactNode }) {
  return (
    <Place x={x} y={y} scale={scale}>
      <PhoneFrame finish='silver'>{children}</PhoneFrame>
    </Place>
  );
}

function centeredPhone(width: number, height: number, scale: number) {
  return { x: (width - PHONE.width * scale) / 2, y: (height - PHONE.height * scale) / 2 };
}

export const scenes = defineScenes([
  {
    id: 'cover',
    width: 1440,
    height: 960,
    render: () => (
      <Field bg={C.chalk}>
        <div className='absolute bottom-0 right-0 top-0' style={{ left: 830, background: C.sage }} />
        <div className='absolute' style={{ left: 830, top: 0, width: 610, height: 960 }}>
          <svg width='610' height='960' viewBox='0 0 610 960' aria-hidden='true'>
            <circle cx='520' cy='150' r='230' fill='none' stroke={C.chalk} strokeOpacity='0.5' strokeWidth='2' />
            <circle cx='520' cy='150' r='150' fill='none' stroke={C.chalk} strokeOpacity='0.5' strokeWidth='2' />
          </svg>
        </div>
        <Place x={690} y={436} scale={0.5}>
          <BrowserFrame url='kliniekdassen.nl/carpal-tunnel' width={1280} height={PAGE_H}>
            <ConditionPage />
          </BrowserFrame>
        </Place>
        <Phone x={1000} y={172} scale={0.725}>
          <HandMapScreen initialZone='palm' initialOpen={false} />
        </Phone>
        <div className='absolute' style={{ left: 150, top: 232, width: 600 }}>
          <p className='text-[19px] font-semibold uppercase tracking-[0.12em]' style={{ color: C.sageDeep }}>
            Kliniek Dassen · Rotterdam
          </p>
          <h2 className='mt-6' style={serif(118, 380, { lineHeight: 0.92, letterSpacing: '-0.03em' })}>
            Where does
            <br />
            it <em style={{ fontStyle: 'italic', fontWeight: 340 }}>hurt?</em>
          </h2>
          <p className='mt-8 max-w-[440px] text-[23px] leading-[1.4]' style={{ color: C.inkSoft }}>
            A hand surgery website in plain words, with GP referrals that arrive by upload instead of fax.
          </p>
        </div>
      </Field>
    )
  },
  {
    id: 'condition-page',
    width: 1440,
    height: 900,
    render: () => (
      <Field bg={C.ink}>
        <Desktop url='kliniekdassen.nl/conditions/carpal-tunnel'>
          <ConditionPage />
        </Desktop>
      </Field>
    )
  },
  {
    id: 'referral-upload',
    width: 720,
    height: 900,
    render: () => {
      const p = centeredPhone(720, 900, 0.93);
      return (
        <Field bg={C.sage}>
          <Phone x={p.x} y={p.y} scale={0.93}>
            <ReferralUploadScreen />
          </Phone>
        </Field>
      );
    }
  },
  {
    id: 'referral-done',
    width: 720,
    height: 900,
    render: () => {
      const p = centeredPhone(720, 900, 0.93);
      return (
        <Field bg={C.apricot}>
          <Phone x={p.x} y={p.y} scale={0.93}>
            <ReferralDoneScreen />
          </Phone>
        </Field>
      );
    }
  },
  {
    id: 'team-page',
    width: 1440,
    height: 900,
    render: () => (
      <Field bg={C.sageSoft}>
        <Desktop url='kliniekdassen.nl/team'>
          <TeamPage />
        </Desktop>
      </Field>
    )
  },
  {
    id: 'operation-prep',
    width: 1440,
    height: 900,
    render: () => (
      <Field bg={C.ink}>
        <div className='absolute' style={{ left: 110, top: 250, width: 430, color: C.chalk }}>
          <p className='text-[17px] font-semibold uppercase tracking-[0.12em]' style={{ color: C.apricot }}>Your operation</p>
          <h2 className='mt-5' style={serif(64, 380, { color: C.chalk, lineHeight: 0.98 })}>
            A week before, and the morning itself.
          </h2>
          <p className='mt-6 text-[20px] leading-[1.45]' style={{ color: C.sageSoft }}>
            The checklist arrives by text seven days ahead. Patients tick it off with one thumb.
          </p>
        </div>
        <Phone x={610} y={(900 - PHONE.height * 0.9) / 2} scale={0.9}>
          <PrepChecklistScreen />
        </Phone>
        <Phone x={1010} y={(900 - PHONE.height * 0.9) / 2 + 36} scale={0.9}>
          <DayOfScreen />
        </Phone>
      </Field>
    )
  },
  {
    id: 'wait-times',
    width: 1440,
    height: 900,
    render: () => (
      <Field bg={C.apricotSoft}>
        <Desktop url='kliniekdassen.nl/waiting-times'>
          <WaitTimesPage />
        </Desktop>
      </Field>
    )
  },
  {
    id: 'site-before',
    width: 1440,
    height: 900,
    render: () => (
      <Field bg='#D9DEE2'>
        <Desktop url='www.kliniekdassen.nl/index.php?page=home'>
          <OldSite />
        </Desktop>
      </Field>
    )
  },
  {
    id: 'site-after',
    width: 1440,
    height: 900,
    render: () => (
      <Field bg='#D9DEE2'>
        <Desktop url='kliniekdassen.nl'>
          <HomePage />
        </Desktop>
      </Field>
    )
  }
]);
