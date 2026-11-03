/**
 * The ⌘K "Ask the studio" panel answers from this list. There is no AI model:
 * typing filters these questions, and each answer is written here.
 * Answers can be plain paragraphs, or a function that reads live values like
 * the number of open slots.
 */

export type AskTopic = 'Pricing' | 'Process' | 'Availability' | 'Studio';

export type AskContext = {
  slotsOpen: number;
  slotsPerQuarter: number;
  /** Like `Q4 2026`. */
  quarter: string;
  nextStart: string;
  city: string;
};

export type AskLink = {
  label: string;
  to: '/' | '/work' | '/about' | '/contact';
  hash?: string;
};

export type AskEntry = {
  id: string;
  topic: AskTopic;
  question: string;
  /** Extra words people might type, so they still find this question. */
  keywords: string[];
  answer: string[] | ((ctx: AskContext) => string[]);
  link?: AskLink;
};

export const askTopics: AskTopic[] = ['Pricing', 'Process', 'Availability', 'Studio'];

export const askEntries: AskEntry[] = [
  {
    id: 'website-cost',
    topic: 'Pricing',
    question: 'How much does a website cost?',
    keywords: ['price', 'budget', 'quote', 'euro', 'expensive', 'rate', 'site'],
    answer: [
      'Most of our launch projects land between €22,000 and €60,000. A focused marketing site sits at the low end; a shop or a portal with logins sits higher.',
      'We never guess in an email. A paid scoping week (€2,800) ends with a fixed quote, and that fee comes off the project if you go ahead.'
    ],
    link: { label: 'See the pricing models', to: '/', hash: 'pricing' }
  },
  {
    id: 'fixed-price',
    topic: 'Pricing',
    question: 'Do you work for a fixed price?',
    keywords: ['hourly', 'hours', 'overrun', 'budget', 'estimate', 'scope'],
    answer: [
      'Yes. Launch projects and night sprints have a fixed price agreed before design starts. If we underestimated, that is our problem.',
      'If you change the scope halfway, we write a short change note with the cost before anyone does the extra work.'
    ]
  },
  {
    id: 'retainer',
    topic: 'Pricing',
    question: 'What does the shift retainer include?',
    keywords: ['subscription', 'monthly', 'ongoing', 'support', 'maintenance', 'days'],
    answer: [
      'Eight crew-days a month for €9,600, on the same weekday every week. You get the same two people, a shared board, and a planning call at the start of each month.',
      'Unused days roll over for one month. After the first three months you can stop with a month’s notice.'
    ],
    link: { label: 'Compare the models', to: '/', hash: 'pricing' }
  },
  {
    id: 'payment',
    topic: 'Pricing',
    question: 'How do payments work?',
    keywords: ['invoice', 'deposit', 'pay', 'terms', 'vat', 'btw'],
    answer: [
      'Launch projects are invoiced 40% at kickoff, 40% at design sign-off, and 20% at launch. Retainers are invoiced at the start of each month. Sprints are half up front, half on the Friday.',
      'Invoices are due in 14 days. Prices on this site exclude 21% Dutch VAT.'
    ]
  },
  {
    id: 'small-budget',
    topic: 'Pricing',
    question: 'Our budget is smaller. Can you still help?',
    keywords: ['cheap', 'startup', 'small', 'nonprofit', 'discount', 'low'],
    answer: [
      'Often, yes. A night sprint (€7,400) gets you a direction or a working prototype in one week, and many teams build on it themselves.',
      'Once a year we take on one cultural or non-profit project at cost. Tell us about yours in the contact form.'
    ],
    link: { label: 'Write to us', to: '/contact' }
  },
  {
    id: 'first-week',
    topic: 'Process',
    question: 'What happens in the first week?',
    keywords: ['kickoff', 'start', 'onboarding', 'scoping', 'workshop', 'begin'],
    answer: [
      'Monday is a half-day workshop at your office or ours. By Wednesday we have read everything you have and talked to two or three of your customers.',
      'On Friday you get a scope with the pages, the milestones, the people, and the fixed price. Nothing is designed before you agree to it.'
    ]
  },
  {
    id: 'who',
    topic: 'Process',
    question: 'Who will we work with?',
    keywords: ['team', 'people', 'designer', 'developer', 'contact', 'account manager'],
    answer: [
      'The people you meet in the first call are the people who do the work. A launch project has a lead designer, a front-end developer, and usually one more of the crew.',
      'There are no account managers. You get a shared channel with everyone on the project.'
    ],
    link: { label: 'Meet the crew', to: '/about' }
  },
  {
    id: 'timeline',
    topic: 'Process',
    question: 'How long does a project take?',
    keywords: ['duration', 'weeks', 'deadline', 'fast', 'timeline', 'rebrand', 'launch'],
    answer: [
      'A rebrand with a new website takes 10 to 14 weeks. A marketing site on an existing brand takes 8 to 10. A sprint takes exactly five days.',
      'If you have a hard date, like a festival opening or a trade fair, tell us first. We plan backwards from it.'
    ]
  },
  {
    id: 'copy',
    topic: 'Process',
    question: 'Do you write the copy?',
    keywords: ['content', 'text', 'writing', 'words', 'translation', 'dutch', 'english'],
    answer: [
      'Yes. One of the crew is a writer, and we write in English and Dutch. We would rather write the first draft than design around placeholder text.',
      'German and French translations go to a translator we have worked with for years, then come back to us for layout checks.'
    ]
  },
  {
    id: 'stack',
    topic: 'Process',
    question: 'Which tools and tech do you use?',
    keywords: ['stack', 'cms', 'react', 'shopify', 'webflow', 'framework', 'hosting', 'figma'],
    answer: [
      'We design in Figma and build most sites in React with a headless CMS your team can edit. Shops run on Shopify. We pick the boring, well-supported option unless there is a reason not to.',
      'You own the code, the accounts, and the files from day one.'
    ]
  },
  {
    id: 'in-house',
    topic: 'Process',
    question: 'Can you work with our own developers?',
    keywords: ['handoff', 'in-house', 'engineers', 'agency', 'collaborate', 'design system'],
    answer: [
      'Gladly. We often design and build the first version, then hand over a component library and a recorded walkthrough to your team.',
      'Or we only do design and stay on for weekly reviews while your developers build. Either way we agree on the split in the scoping week.'
    ]
  },
  {
    id: 'start',
    topic: 'Availability',
    question: 'When can you start?',
    keywords: ['available', 'free', 'capacity', 'book', 'slot', 'soon', 'schedule'],
    answer: (ctx) => [
      ctx.slotsOpen > 0
        ? `We have ${ctx.slotsOpen} of ${ctx.slotsPerQuarter} project slots open in ${ctx.quarter}. The earliest new start is ${ctx.nextStart}.`
        : `${ctx.quarter} is full. The earliest new start is ${ctx.nextStart}.`,
      'A night sprint can usually start within three weeks, because it only needs two of us for five days.'
    ],
    link: { label: 'Book a slot', to: '/contact' }
  },
  {
    id: 'how-many',
    topic: 'Availability',
    question: 'How many projects do you take at once?',
    keywords: ['capacity', 'busy', 'clients', 'focus', 'quarter', 'slots'],
    answer: (ctx) => [
      `${ctx.slotsPerQuarter} per quarter, never more. Each project gets a fixed part of the crew, so nobody is spread over five clients.`,
      'Retainer clients get their weekday on top of that, which is why we keep only three retainers.'
    ]
  },
  {
    id: 'abroad',
    topic: 'Availability',
    question: 'Do you work with clients outside the Netherlands?',
    keywords: ['international', 'remote', 'abroad', 'europe', 'germany', 'belgium', 'english', 'time zone'],
    answer: [
      'About a third of our clients are in Belgium, Germany, and the UK. We work in English and Dutch and overlap with most of Europe’s working day.',
      'For the kickoff workshop we come to you, or you come to Rotterdam and we show you the harbour.'
    ]
  },
  {
    id: 'visit',
    topic: 'Studio',
    question: 'Can we visit the studio?',
    keywords: ['office', 'address', 'meet', 'coffee', 'rotterdam', 'location', 'katendrecht'],
    answer: (ctx) => [
      `Yes. We are on the Katendrecht peninsula in ${ctx.city}, a ten-minute walk from Rijnhaven metro. Most first meetings happen at our big table with coffee from next door.`,
      'Send a message with two times that suit you and we will confirm one.'
    ],
    link: { label: 'Plan a visit', to: '/contact' }
  },
  {
    id: 'name',
    topic: 'Studio',
    question: 'Why are you called Nightshift?',
    keywords: ['name', 'night', 'hours', 'late', 'story', 'why'],
    answer: [
      'The two founders started the studio in the evenings, after their day jobs at a harbour logistics company. The name stuck after the day jobs didn’t.',
      'We work normal hours now. We still stay up for launch night.'
    ]
  }
];

export function answerText(entry: AskEntry, ctx: AskContext): string[] {
  return typeof entry.answer === 'function' ? entry.answer(ctx) : entry.answer;
}
