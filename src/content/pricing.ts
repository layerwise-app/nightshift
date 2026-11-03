/** The pricing models in the white section on Home. The ⌘K answers quote them too. */

export type PricingModel = {
  id: 'project' | 'retainer' | 'sprint';
  name: string;
  /** One line under the name. */
  pitch: string;
  /** For which kind of client. */
  bestFor: string;
  price: string;
  priceNote: string;
  duration: string;
  team: string;
  includes: string[];
  /** Marked as the most common choice. */
  featured?: boolean;
};

export const pricingModels: PricingModel[] = [
  {
    id: 'project',
    name: 'Launch project',
    pitch: 'A fixed scope for a fixed price.',
    bestFor: 'New websites, rebrands, and product launches with a date on the calendar.',
    price: 'from €22,000',
    priceNote: 'Paid in three parts: 40% at kickoff, 40% at design sign-off, 20% at launch.',
    duration: '8–14 weeks',
    team: '3–4 of the crew',
    includes: [
      'A paid scoping week (€2,800, deducted from the project)',
      'A fixed quote before any design starts',
      'Two review rounds per milestone',
      'Launch night with us in the room, plus 30 days of aftercare'
    ],
    featured: true
  },
  {
    id: 'retainer',
    name: 'Shift retainer',
    pitch: 'A standing slot in our week.',
    bestFor: 'Teams that ship every month and want the same people every time.',
    price: '€9,600 / month',
    priceNote: '8 crew-days a month. Three months minimum, then month to month.',
    duration: 'Ongoing',
    team: '2 regulars, more when needed',
    includes: [
      'The same weekday, every week',
      'A shared board and a monthly planning call',
      'Unused days roll over for one month',
      'Design, front-end, and copy from the same people'
    ]
  },
  {
    id: 'sprint',
    name: 'Night sprint',
    pitch: 'One week, one question.',
    bestFor: 'Testing an idea, picking a brand direction, or unsticking a project.',
    price: '€7,400 fixed',
    priceNote: 'Half up front, half on the Friday.',
    duration: '5 days',
    team: '2 of the crew',
    includes: [
      'A kickoff workshop on Monday morning',
      'A clickable prototype or a direction deck by Friday',
      'A recorded walkthrough you can share inside your team',
      'The sprint fee is deducted if a project follows within 60 days'
    ]
  }
];
