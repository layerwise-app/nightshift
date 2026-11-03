/**
 * Everything about the studio that the site shows in more than one place.
 * Edit this file to rename the studio, move it, change its colors or fonts,
 * or update how many project slots are open.
 *
 * Case studies live in `src/content/work/`, and the answers in the ⌘K panel
 * live in `src/content/ask.ts`.
 */

export type FontSpec = {
  /** CSS family name, used in `font-family`. */
  family: string;
  /** A `.woff2` file in `public/fonts/`. */
  file: string;
  /** Weight range of a variable font, like `'200 1000'`, or a single weight. */
  weight: string;
  /** Optional italic file in `public/fonts/`. */
  italicFile?: string;
  /** System fonts used while the file loads or if it fails. */
  fallback: string;
};

export type SocialLink = { label: string; url: string };

export const portfolio = {
  name: 'Nightshift Studio',
  shortName: 'Nightshift',
  /** Lowercase wordmark shown next to the logo. */
  wordmark: 'nightshift',
  role: 'Web & brand studio',
  tagline: 'We build brands and websites that hold up in daylight.',
  location: {
    city: 'Rotterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    neighbourhood: 'Katendrecht',
    street: 'Deliplein 14',
    postalCode: '3072 AV',
    /** IANA time zone for the local clock on the screen edge. */
    timeZone: 'Europe/Amsterdam',
    /** Short code shown next to the clock. */
    clockLabel: 'RTM'
  },
  founded: 2017,
  crewSize: 6,
  bio: {
    short:
      'Nightshift is a six-person web and brand studio in Rotterdam. We take four projects a quarter and carry each one from first sketch to launch night.',
    long: [
      'Nightshift started in 2017 as two people renting a desk above a ship chandler in Katendrecht. We are six now, still on the same peninsula, and still a little allergic to growth for its own sake.',
      'We design identities and build the websites and product screens they end up living in. The same people who draw the logo write the front-end, so nothing gets lost between the deck and the browser.',
      'We work in shifts: short, focused stretches with one client at the centre of the table. Most of our clients come back for a second one.'
    ]
  },
  /**
   * Where contact form messages are emailed. Leave empty to only save them to
   * the database (they are always saved).
   */
  ownerEmail: '',
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'Dribbble', url: 'https://dribbble.com/' },
    { label: 'GitHub', url: 'https://github.com/' }
  ] satisfies SocialLink[],
  availability: {
    /** Projects the crew can take each quarter. */
    slotsPerQuarter: 4,
    /** Slots still open this quarter. Shown on the screen edge and in ⌘K. */
    slotsOpen: 2,
    /** The earliest start for a new project. */
    nextStart: 'January 2027',
    /** Local hours the studio answers messages, 24h clock. */
    shift: { from: 10, to: 19 }
  },
  /** A PDF in `public/`. */
  cvFile: '/nightshift-studio-cv.pdf',
  fonts: {
    display: {
      family: 'Nunito',
      file: '/fonts/nunito-wght.woff2',
      weight: '200 1000',
      fallback: 'ui-rounded, "Arial Rounded MT Bold", "Helvetica Neue", Arial, sans-serif'
    },
    body: {
      family: 'Instrument Sans',
      file: '/fonts/instrument-sans-wght.woff2',
      italicFile: '/fonts/instrument-sans-wght-italic.woff2',
      weight: '400 700',
      fallback: '"Helvetica Neue", Arial, system-ui, sans-serif'
    },
    mono: {
      family: 'Martian Mono',
      file: '/fonts/martian-mono-wght.woff2',
      weight: '100 800',
      fallback: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace'
    }
  } satisfies Record<'display' | 'body' | 'mono', FontSpec>,
  colors: {
    /** Page background. Keep it near-black. */
    background: '#0A0A0B',
    /** Raised panels: the ⌘K panel, inputs, cards. */
    surface: '#131315',
    /** Main text on the background. */
    text: '#F2F2EC',
    /** The one hot signal color: dots, progress, the 3D logo. */
    signal: '#D4FF3A',
    /** Text placed on the signal color. */
    onSignal: '#0A0A0B',
    /** The full-white pricing section. */
    paper: '#FFFFFF',
    /** Text on the paper section. */
    onPaper: '#0A0A0B'
  }
} as const;

export type Portfolio = typeof portfolio;
