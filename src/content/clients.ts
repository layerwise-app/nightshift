/**
 * Selected clients for the logo grid on Home and the list on About.
 * `mark` picks a wordmark drawn in `src/components/home/ClientMarks.tsx`;
 * a client without a mark is shown as a typeset wordmark of its name.
 */

export type Client = {
  name: string;
  sector: string;
  mark?: string;
};

export const clients: Client[] = [
  { name: 'Golfslag Festival', sector: 'Festival', mark: 'golfslag' },
  { name: 'Okkerse & Dochters', sector: 'Painters', mark: 'okkerse' },
  { name: 'Kliniek Dassen', sector: 'Hand surgery', mark: 'dassen' },
  { name: 'Kamerstuk', sector: 'Furniture', mark: 'kamerstuk' },
  { name: 'Gaaf', sector: 'Oral care', mark: 'gaaf' },
  { name: 'Ankerveld Groep', sector: 'Industry', mark: 'ankerveld' },
  { name: 'Veerdienst Maas', sector: 'Water taxi', mark: 'veerdienst' },
  { name: 'Spoorwerf Bakkerij', sector: 'Bakery', mark: 'spoorwerf' },
  { name: 'Theater De Kade', sector: 'Theatre', mark: 'kade' },
  { name: 'Lumen Opticiens', sector: 'Optician', mark: 'lumen' },
  { name: 'Fietsfabriek Kralingen', sector: 'Bicycles', mark: 'fietsfabriek' },
  { name: 'Noordzee Radio', sector: 'Radio', mark: 'noordzee' }
];
