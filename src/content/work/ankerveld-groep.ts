import { defineCaseStudy } from '~/content/define';
import { imagesFor, videoFor } from '~/lib/images';
import images from './ankerveld-groep/images.json';

const img = imagesFor('ankerveld-groep', images);

export default defineCaseStudy({
  slug: 'ankerveld-groep',
  order: 6,
  title: 'Seven companies behind one front door',
  client: 'Ankerveld Groep',
  year: 2023,
  sector: 'B2B client portal',
  summary:
    'Ankerveld Werkplaats gives terminal operators and refineries one place to see every crane, pump and scaffold the group maintains for them, with the inspection certificate one tap away.',
  role: ['Service design', 'Product design', 'Design system', 'Front-end', 'ERP integration'],
  team: [
    'Sanne de Vries, product design lead',
    'Mees Verbaan, creative direction',
    'Ilyas Bouzid, integrations',
    'Joris Kwakman, front-end',
    'Fenna Hoekstra, copy in three languages'
  ],
  accent: '#F2B705',
  cover: img(
    'cover',
    'Ankerveld Werkplaats on a laptop and a phone: the overview with 214 assets under contract, 17 inspections due and 4 overdue, next to the supervisor’s asset list'
  ),
  problem: {
    brief:
      'Clients of Ankerveld’s seven companies had seven ways to reach them: three portals, two shared inboxes, a phone line and one fax. Give them one place for assets, tickets, certificates and orders.',
    constraint:
      'The seven ERP systems stay. Replacing them was a five-year programme nobody wanted to wait for, so the portal reads them through a nightly sync and has to be honest about how old every number is. And the people checking a crane before a lift stand on a jetty in work gloves, often in the rain, holding a rugged phone two generations old. They read Dutch, English or German.'
  },
  decisions: [
    {
      title: 'Every number says how fresh it is',
      body: 'Each ERP syncs at a different time, and one of them sometimes doesn’t. Instead of pretending to be live, every count, status and date carries its source and its sync time. In the second week after launch the rope access company’s sync slipped overnight; supervisors saw “sync delayed” in amber and called the desk instead of trusting a stale green.'
    },
    {
      title: 'Organised by asset, not by company',
      body: 'Clients don’t care which subsidiary services a hoist. We merged seven catalogues into one register keyed on the ID painted on the equipment, so KR-0417 means the same thing to the crane driver, the inspector and the invoice. The company is a column, not a door.'
    },
    {
      title: 'Built for gloves and daylight',
      body: 'Every target on the phone is at least 56 px tall, statuses are written out as well as coloured, and contrast holds in direct sun. We tested on Steiger 4 in October with work gloves and a five-year-old Android, and moved the report button twice.'
    },
    {
      title: 'The certificate is one tap from the asset',
      body: 'When the labour inspectorate asks for the certificate of the sling on the hook, there is no time to search an inbox. The current PDF sits on the asset itself, and a share link gives an auditor read-only access to a whole site’s vault for 14 days.'
    }
  ],
  blocks: [
    {
      type: 'text',
      heading: 'One register on top of seven ledgers',
      body: [
        'Werkplaats never writes to the ERPs. A sync service reads each one at night, maps its asset IDs, ticket states and order lines onto one shared model, and stamps every record with where and when it came from.',
        'That model became the design brief. A ticket at the pump company and a ticket at the scaffolders now move through the same five states, even though their back offices still call them nine different things.'
      ]
    },
    {
      type: 'image',
      image: img(
        'full-overview',
        'The overview for Terminal Botlek Noord: five counts, a table of inspections due in the next 30 days, and open tickets per company, each with its last sync time'
      ),
      caption: 'The overview. The sidebar lists all seven companies with the time of their last sync; Touwtechniek is late, so it shows in amber everywhere its numbers appear.'
    },
    {
      type: 'demo',
      title: 'The supervisor’s phone',
      caption:
        'This is the screen a site supervisor opens before a lift: every asset under contract at the terminal, sorted by what needs attention, with the certificate and a two-tap fault report on each one.',
      hint: 'Filter to Overdue, open TK-1180, report it out of use, then switch the language to NL or DE.',
      background: '#0E2433',
      finish: 'graphite',
      load: () => import('./ankerveld-groep/demo')
    },
    {
      type: 'pair',
      images: [
        img('pair-phones-a', 'The asset list on a phone: four large filter buttons with counts and ten assets, each with a coloured status edge and its inspection date'),
        img('pair-phones-b', 'Reporting a fault on hoist TK-1180: large buttons for Damage, Not working, Leak and Needs a check, then Keep using or Stop using')
      ],
      caption: 'List and report. No typing is needed to send a fault; the note field is optional because nobody types well in gloves.'
    },
    {
      type: 'video',
      video: videoFor('ankerveld-groep', 'fleet'),
      poster: img(
        'fleet-poster',
        'The site map of Terminal Botlek Noord with nine assets marked by status, a technician van on the internal road, and a live feed of tickets'
      ),
      caption: 'The site map during a morning: van V3 re-inspects hoist TK-1180, a leak comes in from pump PM-2231, and the feed and counts follow.'
    },
    {
      type: 'quote',
      quote:
        'To our clients we were seven companies with seven phone numbers. Werkplaats made us one, without asking any of the seven to change how they run their books.',
      name: 'Marco Veenstra',
      role: 'Director of client services, Ankerveld Groep'
    },
    {
      type: 'image',
      image: img(
        'full-certificates',
        'The certificate vault: a table of lifting, pressure and scaffold certificates with their expiry status, and a preview of inspection report KC-22-4471 for harbour crane KR-0417'
      ),
      caption: 'The certificate vault, filtered to lifting equipment. The preview is the real PDF from Ankerveld Keuring, not a summary of it.'
    },
    {
      type: 'text',
      heading: 'Three languages, one set of words',
      body: [
        'Terminal crews in Botlek are Dutch, Polish, German and Portuguese; the portal ships in Dutch, English and German, and the crews pick. We wrote the interface copy in all three at the same time, keeping labels short enough to fit a glove-sized button in German.',
        'Asset names stay as the source company writes them, so “Harbour crane 64 t” on the screen matches the plate on the crane.'
      ]
    },
    {
      type: 'image',
      image: img(
        'full-asset',
        'The page for harbour crane KR-0417: a line drawing of the crane with its 40 m outreach, specifications, the next inspection on 18 November, the certificate, an open ticket for rope wear, and its history'
      ),
      caption: 'One asset, everything about it: specs, the booked inspection, the certificate, the open ticket and its history.'
    },
    {
      type: 'image',
      image: img(
        'full-orders',
        'The orders page: eight orders from five Ankerveld companies with a five-step progress bar each, delivery dates, values and the sync time of every row'
      ),
      caption: 'Orders across all companies. A quote waiting for the client’s approval is the only thing coloured amber on the page.'
    }
  ],
  outcome: {
    summary:
      'Six months after launch, 41 client sites open Werkplaats every working day, and the fax machine in Botlek went to the recycling yard.',
    metrics: [
      { value: '41', label: 'client sites using it every working day', note: 'April 2024' },
      { value: '7→1', label: 'portals, inboxes and phone lines replaced by one address' },
      { value: '96%', label: 'lifting certificates found in under a minute', note: 'was 58% in the baseline audit' },
      { value: '−38%', label: 'phone calls to the service desks', note: 'first quarter after launch' }
    ]
  }
});
