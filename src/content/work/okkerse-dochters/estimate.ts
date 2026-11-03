import type { Surface } from './brand';

export type Finish = 'matt' | 'satin' | 'gloss';

export type SurfaceChoice = { colour: string; finish: Finish; area: number };

export const surfaceInfo: Record<Surface, { label: string; nl: string; labour: [number, number]; defaultArea: number }> = {
  door: { label: 'Front door', nl: 'Voordeur', labour: [68, 92], defaultArea: 2.2 },
  frames: { label: 'Window frames', nl: 'Kozijnen', labour: [36, 52], defaultArea: 7.5 },
  wall: { label: 'Living-room wall', nl: 'Woonkamermuur', labour: [11, 17], defaultArea: 18 }
};

export const finishInfo: Record<Finish, { label: string; coverage: number; perLitre: number; labourFactor: number }> = {
  matt: { label: 'Matt', coverage: 10, perLitre: 24, labourFactor: 1 },
  satin: { label: 'Satin', coverage: 12, perLitre: 31, labourFactor: 1.04 },
  gloss: { label: 'Gloss', coverage: 13, perLitre: 34, labourFactor: 1.1 }
};

const COATS = 2;

/** Litres for two coats, rounded up to the nearest quarter litre. */
export function litres(choice: SurfaceChoice): number {
  if (choice.area <= 0) return 0;
  const raw = (choice.area * COATS) / finishInfo[choice.finish].coverage;
  return Math.ceil(raw * 4) / 4;
}

/** Low and high estimate in euros, labour plus paint, rounded to tens. */
export function estimate(surface: Surface, choice: SurfaceChoice): [number, number] {
  const f = finishInfo[choice.finish];
  const paint = litres(choice) * f.perLitre;
  const [lo, hi] = surfaceInfo[surface].labour;
  const round = (n: number) => Math.round(n / 10) * 10;
  return [round(lo * f.labourFactor * choice.area + paint), round(hi * f.labourFactor * choice.area + paint)];
}

/** `1,240` — formatted by hand so server and browser always agree. */
export function euros(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatArea(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

export function formatLitres(n: number): string {
  return n % 1 === 0 ? `${n}` : n.toFixed(2).replace(/0$/, '');
}
