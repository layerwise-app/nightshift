import type { ReactNode } from 'react';

/**
 * Monochrome wordmarks for the client grid, drawn in `currentColor` with the
 * site's own three fonts so the grid reads as one set. All clients are
 * fictional.
 */

const display = { fontFamily: 'var(--ns-font-display)' };
const body = { fontFamily: 'var(--ns-font-body)' };
const mono = { fontFamily: 'var(--ns-font-mono)' };

const marks: Record<string, ReactNode> = {
  golfslag: (
    <>
      <g fill='none' stroke='currentColor' strokeWidth='3.4' strokeLinecap='round' strokeLinejoin='round'>
        <path d='M4 22l5-4 5 4 5-4 5 4 5-4 5 4' />
        <path d='M4 32l5-4 5 4 5-4 5 4 5-4 5 4' />
        <path d='M4 42l5-4 5 4 5-4 5 4 5-4 5 4' />
      </g>
      <text x='50' y='42' fontSize='27' fontWeight='900' letterSpacing='-0.4' style={display}>
        GOLFSLAG
      </text>
    </>
  ),
  okkerse: (
    <>
      <path d='M4 50V26a14 14 0 0 1 28 0v24z' fill='none' stroke='currentColor' strokeWidth='2.4' />
      <text x='18' y='42' fontSize='10.5' fontWeight='700' textAnchor='middle' style={body}>
        O&amp;D
      </text>
      <text x='44' y='34' fontSize='17.5' fontWeight='600' letterSpacing='-0.2' style={body}>
        Okkerse &amp; Dochters
      </text>
      <text x='44.5' y='48' fontSize='7.4' letterSpacing='2.4' style={mono}>
        SCHILDERS · 1971
      </text>
    </>
  ),
  dassen: (
    <>
      <text x='2' y='22' fontSize='8.4' letterSpacing='3.2' style={mono}>
        KLINIEK
      </text>
      <text x='0' y='50' fontSize='31' fontWeight='500' letterSpacing='-0.8' style={body}>
        Dassen
      </text>
      <circle cx='111' cy='44' r='3.4' fill='currentColor' />
    </>
  ),
  kamerstuk: (
    <>
      <path d='M4 22h16v8h-8v10H4z' fill='currentColor' />
      <text x='28' y='40' fontSize='19.5' fontWeight='700' letterSpacing='2.6' style={body}>
        KAMERSTUK
      </text>
    </>
  ),
  gaaf: (
    <text x='0' y='46' fontSize='46' fontWeight='900' letterSpacing='-2.6' style={display}>
      gaaf
    </text>
  ),
  ankerveld: (
    <>
      <rect x='3' y='14' width='34' height='34' rx='3' fill='currentColor' />
      <path d='M20 21l-10 21h6l1.6-4h4.8l1.6 4h6zM20 30l1.5 4h-3z' fill='var(--cell-bg, #0a0a0b)' fillRule='evenodd' />
      <text x='46' y='33' fontSize='17.5' fontWeight='650' letterSpacing='1.6' style={body}>
        ANKERVELD
      </text>
      <text x='46.5' y='46' fontSize='8' letterSpacing='3.4' style={mono}>
        GROEP
      </text>
    </>
  ),
  veerdienst: (
    <>
      <circle cx='19' cy='32' r='15' fill='none' stroke='currentColor' strokeWidth='2.6' />
      <path d='M6 35c4.3-3 8.7-3 13 0s8.7 3 13 0' fill='none' stroke='currentColor' strokeWidth='2.6' strokeLinecap='round' />
      <text x='44' y='31' fontSize='19' fontWeight='800' letterSpacing='-0.6' style={display}>
        Veerdienst
      </text>
      <text x='44.5' y='45' fontSize='8' letterSpacing='3' style={mono}>
        MAAS
      </text>
    </>
  ),
  spoorwerf: (
    <>
      <g stroke='currentColor' strokeWidth='2.2'>
        <path d='M2 19h150M2 27h150' />
        <path d='M10 15v16M30 15v16M50 15v16M70 15v16M90 15v16M110 15v16M130 15v16M150 15v16' strokeWidth='1.4' />
      </g>
      <text x='0' y='50' fontSize='14.5' fontWeight='700' letterSpacing='1.2' style={mono}>
        SPOORWERF
      </text>
      <text x='104' y='50' fontSize='14' fontStyle='italic' style={body}>
        bakkerij
      </text>
    </>
  ),
  kade: (
    <>
      <path d='M2 46a20 20 0 0 1 40 0z' fill='currentColor' />
      <path d='M22 26v20' stroke='var(--cell-bg, #0a0a0b)' strokeWidth='2' />
      <text x='52' y='36' fontSize='24' fontWeight='900' letterSpacing='-0.8' style={display}>
        de kade
      </text>
      <text x='52.5' y='48' fontSize='7.4' letterSpacing='2.8' style={mono}>
        THEATER · LOODS 4
      </text>
    </>
  ),
  lumen: (
    <>
      <circle cx='12' cy='32' r='9' fill='none' stroke='currentColor' strokeWidth='2.4' />
      <circle cx='36' cy='32' r='9' fill='none' stroke='currentColor' strokeWidth='2.4' />
      <path d='M21 31c1.5-2 4.5-2 6 0' fill='none' stroke='currentColor' strokeWidth='2.4' />
      <text x='54' y='42' fontSize='29' fontWeight='400' letterSpacing='-1.2' style={body}>
        lumen
      </text>
      <text x='136' y='42' fontSize='7.6' letterSpacing='2' style={mono}>
        OPTICIENS
      </text>
    </>
  ),
  fietsfabriek: (
    <>
      <g fill='none' stroke='currentColor' strokeWidth='2.4' strokeLinejoin='round'>
        <circle cx='11' cy='38' r='9' />
        <circle cx='43' cy='38' r='9' />
        <path d='M11 38l9-16h16l7 16M20 22l7 16 9-16' />
      </g>
      <text x='60' y='35' fontSize='12' fontWeight='700' letterSpacing='1.6' style={mono}>
        FIETSFABRIEK
      </text>
      <text x='60.5' y='47' fontSize='11' style={body}>
        Kralingen, sinds 1984
      </text>
    </>
  ),
  noordzee: (
    <>
      <g fill='none' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round'>
        <path d='M9 22a14 14 0 0 0 0 20' />
        <path d='M15 26a8 8 0 0 0 0 12' />
        <circle cx='22' cy='32' r='2.6' fill='currentColor' stroke='none' />
        <path d='M29 26a8 8 0 0 1 0 12' />
        <path d='M35 22a14 14 0 0 1 0 20' />
      </g>
      <text x='48' y='37' fontSize='22' fontWeight='900' letterSpacing='-0.7' style={display}>
        Noordzee
      </text>
      <text x='48.5' y='48.5' fontSize='7.6' letterSpacing='2.6' style={mono}>
        RADIO 98.6 FM
      </text>
    </>
  )
};

export function ClientMark({ mark, name }: { mark?: string; name: string }) {
  const art = mark ? marks[mark] : undefined;
  return (
    <svg
      viewBox='0 0 200 64'
      fill='currentColor'
      role='img'
      aria-label={name}
      className='h-auto w-full max-w-[200px] overflow-visible'
    >
      {art ?? (
        <text x='100' y='40' fontSize='20' fontWeight='800' textAnchor='middle' style={display}>
          {name}
        </text>
      )}
    </svg>
  );
}
