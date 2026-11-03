/** The studio's timeline on the About page. Newest first. */

export type Milestone = {
  year: string;
  title: string;
  detail: string;
};

export const experience: Milestone[] = [
  {
    year: '2026',
    title: 'Packaging, for the first time',
    detail: 'Designed Gaaf’s tins and letterbox parcels from scratch, and learned more about aluminium than we planned to.'
  },
  {
    year: '2025',
    title: 'A festival drop without a crash',
    detail: 'Golfslag’s fair queue held 31,000 people at 10:00 on drop day. Ilyas slept at the studio; it was not needed.'
  },
  {
    year: '2023',
    title: 'Six people, one table',
    detail: 'Fenna joined to write, which finished the crew. We stopped hiring and started turning work down instead.'
  },
  {
    year: '2021',
    title: 'Moved to the Deliplein',
    detail: 'Left the room above the ship chandler for a ground floor with a long table and a door to the square.'
  },
  {
    year: '2019',
    title: 'First retainer client',
    detail: 'A water taxi company asked for one day a week. They still have it, and that day became the shift retainer.'
  },
  {
    year: '2017',
    title: 'Nightshift starts',
    detail: 'Mees and Noor rent a desk in Katendrecht and take on work in the evenings, after their day jobs.'
  }
];
