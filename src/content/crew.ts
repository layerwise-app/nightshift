/** The six people on the About page, and the names used in case study teams. */

export type CrewMember = {
  name: string;
  role: string;
  /** Two sentences, first person plural is fine. */
  bio: string;
  /** Earlier work, newest first. */
  before: string;
};

export const crew: CrewMember[] = [
  {
    name: 'Mees Verbaan',
    role: 'Co-founder, creative direction',
    bio: 'Draws the first sketch and signs off the last pixel. Spent six years designing shipping dashboards before he got tired of grey.',
    before: 'Product designer at a harbour logistics company, 2011–2017'
  },
  {
    name: 'Noor Aydın',
    role: 'Co-founder, brand design lead',
    bio: 'Runs identity work: logos, type, colour, and the rules that keep them alive after we leave. Collects paint chips.',
    before: 'Senior designer at a Rotterdam branding agency, 2012–2017'
  },
  {
    name: 'Joris Kwakman',
    role: 'Front-end lead',
    bio: 'Turns designs into fast, accessible front-ends and says no to the fifth animation. Maintains our component starter.',
    before: 'Developer at a public broadcaster, 2014–2019'
  },
  {
    name: 'Sanne de Vries',
    role: 'Product designer',
    bio: 'Designs the flows behind the screens: checkouts, booking steps, portals. Tests everything on her dad’s old phone.',
    before: 'UX designer at a Dutch bank’s mobile team, 2016–2020'
  },
  {
    name: 'Ilyas Bouzid',
    role: 'Developer',
    bio: 'Builds the back-ends, integrations, and the parts nobody sees until they break. Wrote our queue for festival ticket drops.',
    before: 'Backend engineer at a ticketing start-up, 2017–2021'
  },
  {
    name: 'Fenna Hoekstra',
    role: 'Writer and strategist',
    bio: 'Writes the copy, names things, and asks the awkward question in the kickoff. Works in Dutch and English.',
    before: 'Copywriter and editor at a design magazine, 2015–2021'
  }
];
