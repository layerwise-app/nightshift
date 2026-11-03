import { C } from './brand';

/** The five areas on the hand map, and what usually causes pain there. */
export type ZoneId = 'fingers' | 'thumb' | 'palm' | 'wrist-thumb' | 'wrist-little';

export type Condition = {
  name: string;
  feels: string;
  helps: string;
  recovery: string;
};

export type Zone = {
  id: ZoneId;
  label: string;
  /** Short heading shown when the area is chosen. */
  heading: string;
  /** Hotspot center in the hand drawing's 300 × 340 view box. */
  x: number;
  y: number;
  waitWeeks: number;
  conditions: Condition[];
};

export const ZONES: Zone[] = [
  {
    id: 'fingers',
    label: 'Fingers',
    heading: 'A finger that catches, bends, or aches',
    x: 158,
    y: 100,
    waitWeeks: 4,
    conditions: [
      {
        name: 'Trigger finger',
        feels: 'A finger clicks or locks when you bend it, often worst in the morning.',
        helps: 'A splint or an injection first. If it keeps locking, a small release operation.',
        recovery: '2–4 weeks'
      },
      {
        name: 'Dupuytren’s disease',
        feels: 'A firm cord in the palm slowly pulls one or two fingers into a bend.',
        helps: 'Nothing while you can still lay your hand flat. Later a needle treatment or an operation.',
        recovery: '4–8 weeks'
      },
      {
        name: 'Finger joint wear',
        feels: 'Stiff, thick finger joints that ache when you grip or open jars.',
        helps: 'Hand therapy, a small splint, and sometimes an injection.',
        recovery: 'Varies'
      }
    ]
  },
  {
    id: 'thumb',
    label: 'Thumb base',
    heading: 'Pain where the thumb meets the hand',
    x: 236,
    y: 236,
    waitWeeks: 5,
    conditions: [
      {
        name: 'Thumb base arthritis',
        feels: 'A deep ache at the base of the thumb when you turn a key or pinch.',
        helps: 'A thumb splint and hand therapy first. An operation only when those stop helping.',
        recovery: '8–12 weeks after surgery'
      },
      {
        name: 'Trigger thumb',
        feels: 'The thumb catches or snaps when you bend the top joint.',
        helps: 'An injection, or a short release operation under local anaesthetic.',
        recovery: '2–4 weeks'
      }
    ]
  },
  {
    id: 'palm',
    label: 'Palm',
    heading: 'Tingling, numbness, or a lump in the palm',
    x: 150,
    y: 222,
    waitWeeks: 4,
    conditions: [
      {
        name: 'Carpal tunnel syndrome',
        feels: 'Tingling in the thumb, index and middle finger, often waking you at night.',
        helps: 'A night splint or an injection. If that is not enough, a 15-minute release operation.',
        recovery: '2–6 weeks'
      },
      {
        name: 'Dupuytren’s disease',
        feels: 'A painless lump or cord in the palm, usually below the ring finger.',
        helps: 'Watching it is fine until a finger starts to bend.',
        recovery: '4–8 weeks after treatment'
      },
      {
        name: 'Tendon sheath cyst',
        feels: 'A small, firm pea-sized lump at the base of a finger.',
        helps: 'Often it goes by itself. It can be drained or removed.',
        recovery: '1–2 weeks'
      }
    ]
  },
  {
    id: 'wrist-thumb',
    label: 'Wrist, thumb side',
    heading: 'Pain on the thumb side of the wrist',
    x: 196,
    y: 316,
    waitWeeks: 4,
    conditions: [
      {
        name: 'De Quervain’s tendinitis',
        feels: 'Sharp pain on the thumb side when you lift a kettle or a child.',
        helps: 'Rest, a splint with a thumb piece, and often an injection.',
        recovery: '3–6 weeks'
      },
      {
        name: 'Wrist ganglion',
        feels: 'A soft, round lump that comes and goes, sometimes aching.',
        helps: 'Usually no treatment. It can be drained or removed if it bothers you.',
        recovery: '2–4 weeks after removal'
      },
      {
        name: 'Scaphoid injury after a fall',
        feels: 'Pain in the hollow below the thumb after you landed on your hand.',
        helps: 'This needs an X-ray first. Go to your GP or the emergency department.',
        recovery: '6–12 weeks'
      }
    ]
  },
  {
    id: 'wrist-little',
    label: 'Wrist, little-finger side',
    heading: 'Pain on the little-finger side of the wrist',
    x: 116,
    y: 316,
    waitWeeks: 6,
    conditions: [
      {
        name: 'TFCC injury',
        feels: 'Pain when you turn a door handle, lean on your hand, or carry a pan.',
        helps: 'A wrist splint and hand therapy. Sometimes a keyhole operation.',
        recovery: '6–12 weeks'
      },
      {
        name: 'Tendon irritation (ECU)',
        feels: 'A sore, sometimes clicking tendon at the back of the wrist.',
        helps: 'Rest, a splint, and therapy exercises.',
        recovery: '4–6 weeks'
      }
    ]
  }
];

export const zoneById = (id: ZoneId) => ZONES.find((z) => z.id === id) ?? ZONES[0];

/**
 * A right hand, palm side, drawn as a single line with creases. Thumb on the
 * right, as you see your own right palm.
 */
export const HAND_OUTLINE =
  'M112 344 C108 318 99 300 97 280 C93 252 86 224 86 198 L86 117 A12.5 12.5 0 0 1 111 117 L111 168 Q112.5 175 114 168 L114 70 A14 14 0 0 1 142 70 L142 147 Q143.5 154 145 147 L145 56.5 A14.5 14.5 0 0 1 174 56.5 L174 149 Q175.5 156 177 149 L177 75.5 A13.5 13.5 0 0 1 204 75.5 L204 168 C205 192 211 207 222 206 C230 205 236 192 242 177 L249 158 A15 15 0 0 1 277 168 C273 196 266 226 252 250 C238 274 212 292 206 344';

export function HandDrawing({ selected, highlight = C.apricot, stroke = C.ink, width = 300 }: { selected?: ZoneId | null; highlight?: string; stroke?: string; width?: number }) {
  const s = { fill: 'none', stroke, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const thin = { ...s, strokeWidth: 1.6, strokeOpacity: 0.55 };
  const zone = selected ? zoneById(selected) : null;
  return (
    <svg width={width} height={(width * 344) / 300} viewBox='0 0 300 344' aria-hidden='true'>
      {zone ? <circle cx={zone.x} cy={zone.y} r={zone.id === 'fingers' ? 62 : 38} fill={highlight} fillOpacity={0.32} /> : null}
      <path d={HAND_OUTLINE} fill={C.paper} fillOpacity={0.55} stroke='none' />
      <path d={HAND_OUTLINE} {...s} />
      {/* finger joint creases */}
      <path d='M90 140h17M90 162h17' {...thin} />
      <path d='M118 92h20M118 120h20M118 142h19' {...thin} />
      <path d='M149 78h21M149 108h21M150 136h20' {...thin} />
      <path d='M181 96h19M181 124h19M181 150h18' {...thin} />
      <path d='M245 178l22 7M236 208l20 6' {...thin} />
      {/* palm lines */}
      <path d='M94 196c26 6 60 4 100-10' {...thin} />
      <path d='M98 222c30 2 58-4 92-24' {...thin} />
      <path d='M206 212c-26 18-36 46-30 80' {...thin} />
      {/* wrist creases */}
      <path d='M104 296c30 6 70 6 102-1M106 310c30 5 66 5 98-1' {...thin} />
    </svg>
  );
}
