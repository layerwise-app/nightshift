import { defineCaseStudy } from '~/content/define';
import { imagesFor } from '~/lib/images';
import images from './okkerse-dochters/images.json';

const img = imagesFor('okkerse-dochters', images);

export default defineCaseStudy({
  slug: 'okkerse-dochters',
  order: 2,
  title: 'Repainting a family name, two vans at a time',
  client: 'Okkerse & Dochters',
  year: 2024,
  sector: 'Rebrand & website',
  summary:
    'A new identity and website for a Schiedam painting company now run by two sisters: a mark that fits on a brush handle and a van, a colour matcher in paint they stock, and quote requests their father reads in thirty seconds.',
  role: ['Brand identity', 'Van livery', 'Quote documents', 'Website', 'Colour matcher'],
  team: [
    'Noor Aydın, identity lead',
    'Mees Verbaan, creative direction',
    'Sanne de Vries, quote flow',
    'Joris Kwakman, front-end',
    'Fenna Hoekstra, copy and naming'
  ],
  accent: '#1F3B2D',
  cover: img(
    'cover',
    'The Okkerse & Dochters wordmark in cream on Schiedam green, beside a phone showing the colour matcher and two paint chips in harbour red and ochre'
  ),
  problem: {
    brief:
      'Make a 53-year-old painting company look like the firm you would trust with a listed canal house, without losing the name half of Schiedam already knows.',
    constraint:
      'The seven vans could only be re-liveried two a year, so the 1990s sticker and the new identity would share the road until 2027. The mark had to survive a brush handle, a van, a quote PDF and a phone screen. And Kees Okkerse, who founded the company in 1971, still answers the phone: every request from the website had to fit on one page he could read in thirty seconds.'
  },
  decisions: [
    {
      title: 'An arch small enough for a brush handle',
      body:
        'The mark is the arched window of a Schiedam canal house with O&D set inside it in Fraunces italic. It has no thin lines that fill up when burned into wood, so it reads at 14 mm on a brush and at thirty metres on a van. A line-only version exists for stamping and engraving.'
    },
    {
      title: 'A livery that shares the road with the old one',
      body:
        'The vans stay white. The new identity lives in a green band along the sill and a block of type on the sliding door, with the phone number in the same spot as on the old sticker, because regular customers look there. Parked side by side, a 2019 van and a 2024 van read as one company in transition.'
    },
    {
      title: 'Ten colours, all in stock, named after the town',
      body:
        'Customers froze in front of RAL fans with two thousand codes. With the painters we picked the ten colours they mix most, gave them names from Schiedam (Schiedams Groen, Jeneverkruik, Molenwiek) and codes from OD-101 to OD-190. The colour matcher offers only these, so every request arrives in paint that is already on the shelf.'
    },
    {
      title: 'One page Kees can read in thirty seconds',
      body:
        'The quote flow asks four questions. What it produces is a printed page in 25-point type: who, where, what, when, and a rough budget, with three boxes to tick. Photos and measurements go to page two, for Marieke and Lotte. We timed the first forty requests at the office desk.'
    }
  ],
  outcome: {
    summary:
      'Listed buildings went from an occasional job to almost a third of the order book, and the phone rings with the right kind of question.',
    metrics: [
      { value: '31%', label: 'of 2025 revenue from listed buildings', note: 'up from 9% in 2023' },
      { value: '2.4×', label: 'more quote requests through the website', note: 'Apr–Sep 2025 vs 2023' },
      { value: '28 s', label: 'median time for Kees to read a request', note: 'timed at the desk, n = 40' },
      { value: '4 of 7', label: 'vans re-liveried so far', note: 'the last three by spring 2027' }
    ]
  },
  blocks: [
    {
      type: 'text',
      heading: 'A sticker that outlived three vans',
      body: [
        'The old identity was a sign-shop job from 1996: italic capitals with a drop shadow, a clip-art brush and a rainbow swoosh. It was copied from van to van for almost thirty years. People remembered the phone number, not the company.',
        'Marieke and Lotte took over from their father in 2021. They were winning bids on canal houses and listed façades, then losing them when the client saw the van pull up. The rebrand had to make the work they already did visible, not invent a new company.'
      ]
    },
    {
      type: 'beforeAfter',
      before: img('before-identity', 'The 2023 van: red italic OKKERSE with a drop shadow, a clip-art brush, a rainbow swoosh and a yellow phone number'),
      after: img('after-identity', 'The same van in the 2024 livery: the Okkerse & Dochters wordmark, the arch mark and a green band along the sill'),
      labels: ['2023', '2024'],
      caption:
        'Same van, same place. The phone number stays where regulars expect it; everything around it changes.'
    },
    {
      type: 'image',
      image: img(
        'brand-sheet',
        'Brand guide page: the arch mark and wordmark on green, the construction of the arch, Fraunces and Figtree specimens, and the ten house colours with names and codes'
      ),
      caption:
        'Page four of the guide. Fraunces with its soft, slightly wonky italics carries the family name; Figtree does the quotes and forms with tabular figures.'
    },
    {
      type: 'demo',
      title: 'Try a colour on a Schiedam house',
      caption:
        'The colour matcher on okkerse.nl, exactly as it ships on phones. Pick the front door, the window frames or the living-room wall, choose one of the ten house colours and a finish, and the estimate updates for labour and two coats of paint.',
      hint: 'Tap the door in the drawing, choose Havenrood and gloss, then press Send to Okkerse.',
      background: '#4E6A63',
      finish: 'sand',
      load: () => import('./okkerse-dochters/demo')
    },
    {
      type: 'pair',
      images: [
        img('pair-matcher-a', 'The colour matcher with the living-room wall selected and painted Grachtwater, a grey-green'),
        img('pair-matcher-b', 'The request sheet that slides up from the colour matcher, listing each surface, colour and area with a rough budget')
      ],
      caption:
        'The matcher ends with the same summary the office prints, so the customer sees what Kees will see before they press send.'
    },
    {
      type: 'text',
      heading: 'Four questions, then a phone call',
      body: [
        'We replaced a contact form with eleven fields by four short steps: what needs painting, when, where, and a phone number. Monument owners get one extra line: Lotte comes to look first, for free, and handles the conversation with the municipality.',
        'Nothing in the flow asks for a budget. The estimate comes from the colour matcher or is left blank, because a guessed number in a form scared off exactly the clients the sisters wanted.'
      ]
    },
    {
      type: 'pair',
      images: [
        img('pair-quote-a', 'Quote request step two of four, in Dutch: a checklist of what needs painting, a monument question and three uploaded photos'),
        img('pair-quote-b', 'Confirmation screen in Dutch: the request as Kees receives it, and what happens today, within five working days, and two days later')
      ]
    },
    {
      type: 'image',
      image: img(
        'documents',
        'Two printed pages on green: the one-page request for Kees in large type with tick boxes, and the quote with line items and a 9% and 21% VAT split'
      ),
      caption:
        'Left: the page that comes off the office printer. Right: the quote that follows, with labour and materials split for the 9% and 21% VAT rates Dutch homeowners ask about.'
    },
    {
      type: 'quote',
      quote:
        'Our father read the first printed request, put his glasses on, took them off again, and called the customer. That was the whole test.',
      name: 'Marieke Okkerse',
      role: 'co-owner, Okkerse & Dochters'
    },
    {
      type: 'image',
      image: img(
        'website',
        'The okkerse.nl home page on desktop: the headline about paintwork that lasts a generation, a drawn canal house, and the ten-colour palette strip'
      )
    },
    {
      type: 'image',
      image: img(
        'livery',
        'The new van livery, Lotte Okkerse’s business card front and back, and a brush with the arch mark burned into its handle'
      ),
      caption: 'The same arch on a van, a card and a brush handle. Two vans are re-liveried each spring, when the fleet is serviced anyway.'
    }
  ]
});
