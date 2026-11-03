/**
 * The arithmetic behind Gaaf's self-sizing subscription: how many tablets a
 * household uses, how often refills should come, and whether the parcel still
 * fits through a Dutch letterbox (3.2 cm; we pack to 3.0 for margin).
 */

export type RhythmInput = {
  adults: number;
  kids: number;
  timesPerDay: 1 | 2 | 3;
  tablets: boolean;
  brushHeads: boolean;
  floss: boolean;
};

export const POUCH_TABLETS = 62;
const POUCH_CM = 0.8;
const HEADS_CM = 0.6;
const FLOSS_CM = 0.5;
const PACK_LIMIT_CM = 3.0;
const CADENCES = [8, 6, 4, 3, 2] as const;

const TABLET_PRICE = 0.075; // € per tablet, adult and junior
const HEAD_PRICE = 3.5; // € per brush head, swapped every 12 weeks
const FLOSS_PRICE = 4.95; // € per 50 m spool, about 8 weeks for one adult

/** First delivery for every new subscription in the demo. */
export const START = { year: 2026, month: 3, day: 12 };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function deliveryDate(weeksFromStart: number) {
  const d = new Date(Date.UTC(START.year, START.month - 1, START.day + weeksFromStart * 7));
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

export type Rhythm = {
  people: number;
  tabletsPerMonth: number;
  everyWeeks: number;
  pouches: number;
  heads: number;
  spools: number;
  thicknessCm: number;
  parcels: number;
  fits: boolean;
  perMonth: number;
  perDelivery: number;
  tin: 'Solo tin' | 'Family tin';
  dates: string[];
};

function parcelFor(input: RhythmInput, weeks: number) {
  const people = input.adults + input.kids;
  const tabletsNeeded = input.tablets ? people * input.timesPerDay * 7 * weeks : 0;
  const pouches = Math.ceil(tabletsNeeded / POUCH_TABLETS);
  const heads = input.brushHeads ? Math.ceil((people * weeks) / 12) : 0;
  const spools = input.floss ? Math.ceil((input.adults * weeks) / 8) : 0;
  // Round to millimetres so 2.4 + 0.6 compares as exactly 3.0.
  const thicknessCm =
    Math.round(
      (pouches * POUCH_CM + (heads > 0 ? HEADS_CM : 0) + (spools > 0 ? FLOSS_CM * Math.ceil(spools / 2) : 0)) * 10
    ) / 10;
  return { pouches, heads, spools, thicknessCm };
}

export function computeRhythm(input: RhythmInput): Rhythm {
  const people = input.adults + input.kids;
  let everyWeeks: number = CADENCES[CADENCES.length - 1];
  let parcel = parcelFor(input, everyWeeks);
  for (const weeks of CADENCES) {
    const candidate = parcelFor(input, weeks);
    if (candidate.thicknessCm <= PACK_LIMIT_CM) {
      everyWeeks = weeks;
      parcel = candidate;
      break;
    }
  }
  const parcels = Math.max(1, Math.ceil(parcel.thicknessCm / PACK_LIMIT_CM));
  const weeksPerMonth = 52 / 12;
  const tabletsPerMonth = input.tablets ? Math.round(people * input.timesPerDay * 30.4) : 0;
  const perMonth =
    tabletsPerMonth * TABLET_PRICE +
    (input.brushHeads ? (people * HEAD_PRICE * weeksPerMonth) / 12 : 0) +
    (input.floss ? (input.adults * FLOSS_PRICE * weeksPerMonth) / 8 : 0);
  const perDelivery =
    parcel.pouches * POUCH_TABLETS * TABLET_PRICE + parcel.heads * HEAD_PRICE + parcel.spools * FLOSS_PRICE;
  return {
    people,
    tabletsPerMonth,
    everyWeeks,
    ...parcel,
    parcels,
    fits: parcels === 1,
    perMonth,
    perDelivery,
    tin: people > 2 ? 'Family tin' : 'Solo tin',
    dates: [0, 1, 2].map((k) => deliveryDate(k * everyWeeks))
  };
}

export function euro(value: number) {
  const [whole, cents] = value.toFixed(2).split('.');
  return `€${whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${cents}`;
}
