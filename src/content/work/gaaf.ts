import { defineCaseStudy } from '~/content/define';
import { imagesFor } from '~/lib/images';
import images from './gaaf/images.json';

const img = imagesFor('gaaf', images);

export default defineCaseStudy({
  slug: 'gaaf',
  order: 5,
  title: 'A toothpaste subscription that does the maths',
  client: 'Gaaf',
  year: 2026,
  sector: 'DTC brand & shop',
  summary:
    'Identity, letterbox-sized packaging and a self-sizing subscription shop for a new oral care brand selling toothpaste tablets in refillable tins.',
  role: ['Identity', 'Packaging system', 'Subscription shop on Shopify', 'Copy in Dutch and English'],
  team: [
    'Noor Aydın, identity and packaging',
    'Sanne de Vries, subscription flows',
    'Joris Kwakman, Shopify front-end',
    'Fenna Hoekstra, naming and copy',
    'Mees Verbaan, creative direction'
  ],
  accent: '#1F3FD1',
  cover: img(
    'cover',
    'The lowercase gaaf wordmark on cobalt blue, next to a tin with a tomato-red lid and a phone showing the refill rhythm builder.'
  ),
  problem: {
    brief:
      'Two founders, a tablet supplier in Ghent and a name. By March 2026 Gaaf needed a brand, packaging and a shop ready for its first thousand subscriptions.',
    constraint:
      'Nobody knows how many toothpaste tablets they use. A fixed “every 30 days” plan would leave families short and fill single people’s drawers with pouches. And every parcel had to be plastic-free and slip through a Dutch letterbox: 3.2 cm at most, or the courier rings, nobody is home, and the refill waits a week at a pickup point.'
  },
  decisions: [
    {
      title: 'Let the subscription size itself',
      body: 'Customers never pick a plan. They say who brushes and how often; the shop works out the tablets per month and picks the longest delivery interval whose parcel still fits the slot. A single adult gets a parcel every eight weeks, a family of four every three.'
    },
    {
      title: 'Design the tin around the letterbox, not the shelf',
      body: 'The tin is 28 mm tall and a refill pouch lies 8 mm flat, so three pouches and a sleeve of brush heads stack to exactly 3.0 cm. Every mock-up was tested in the brass slot of a co-founder’s front door in Delfshaven before it went to the printer.'
    },
    {
      title: 'One lid colour per person',
      body: 'In the pilot, families mixed up whose tablets were whose, and junior tablets carry less fluoride. Each person now picks a lid colour during onboarding and their pouches carry a matching stripe, so the bathroom drawer sorts itself.'
    },
    {
      title: 'Make skipping easier than cancelling',
      body: 'The account opens on the next parcel, with Skip as its first button and Pause one tap further. People who are still stocked up skip a delivery instead of leaving, and keep their household settings.'
    }
  ],
  blocks: [
    {
      type: 'text',
      heading: 'A brand that explains itself on the doormat',
      body: [
        'The mark is a tin lid seen from above, with a smile pressed into the metal. The wordmark is set in a heavy geometric sans, tightened until “gaaf” reads at the size of a pouch label and at the size of a parcel.',
        'Three flat colours, cobalt, tomato and mint, print cleanly in two inks on recycled card. Nothing on the packaging is laminated, so the whole parcel goes in the paper bin and the pouch in the green one.'
      ]
    },
    {
      type: 'image',
      image: img(
        'full-packaging',
        'The Gaaf kit lined up on mint green: an aluminium brush, a tin with a cobalt lid, a tomato lid seen from above, a refill pouch of 62 tablets, a floss vial and the flat red letterbox parcel, each labelled with its size.'
      ),
      caption: 'Five parts and a parcel. Every size was worked back from the 3 cm we allow inside the letterbox.'
    },
    {
      type: 'image',
      image: img(
        'full-letterbox',
        'Technical drawing on squared paper: a cross-section of a parcel with three refill pouches of 0.8 cm and a sleeve of brush heads of 0.6 cm, stacking to 3.0 cm, next to a blue front door whose brass letterbox slot is 3.2 cm high with the parcel sliding through.'
      ),
      caption: 'The letterbox rule, drawn for the supplier. Bigger households get parcels more often, never a box they have to collect.'
    },
    {
      type: 'demo',
      title: 'The rhythm builder',
      caption:
        'This step replaced plans and price tiers. Each change recalculates the tablets per month, the delivery interval, the next three dates and the parcel thickness against the 3.2 cm slot.',
      hint: 'Take the kid off and the parcel can wait six weeks. Set kids to five and it no longer fits one slot.',
      background: '#1F3FD1',
      finish: 'silver',
      load: () => import('./gaaf/demo')
    },
    {
      type: 'pair',
      images: [
        img(
          'pair-dashboard-a',
          'Phone showing the Gaaf account: the next parcel on Thursday 23 April with its contents, a parcel thickness of 3.0 of 3.2 cm, and Skip, Move date and Edit buttons above a list of later deliveries.'
        ),
        img(
          'pair-dashboard-b',
          'Phone showing a sheet titled “Going away, or still stocked up?” with options to skip one parcel, pause for six weeks or pause until restarted, and a note that about 38 tablets are left.'
        )
      ],
      caption: 'The account opens on the next parcel. Pausing keeps the household, the lid colours and the rhythm.'
    },
    {
      type: 'quote',
      quote:
        'I used to spend half my appointments explaining how much toothpaste to use. Now the shop does that, and the refill lands on the mat before the tin is empty.',
      name: 'Loes Baarda',
      role: 'co-founder of Gaaf and dental hygienist'
    },
    {
      type: 'image',
      image: img(
        'full-landing',
        'The Gaaf home page in a browser: the headline “Toothpaste that turns up before you run out.”, a tomato “Find your rhythm” button, and a cobalt panel with refill pouches, a brush and a tomato tin lid.'
      )
    },
    {
      type: 'metrics',
      heading: 'The first 90 days',
      items: [
        { value: '4,180', label: 'households on a rhythm' },
        { value: '91%', label: 'kept the interval the builder suggested' },
        { value: '0', label: 'parcels returned for not fitting the letterbox', note: 'of 9,600 sent' },
        { value: '€19.80', label: 'average monthly subscription' }
      ]
    },
    {
      type: 'image',
      image: img(
        'full-product',
        'The product page for fresh mint toothpaste tablets: a mint panel with a cobalt tin lid, two tins and a pouch, and on the right flavour choices, three sizes with prices from €4.65, and a cobalt switch to add the product to a six-week rhythm.'
      ),
      caption: 'Product pages show the thickness each item adds to the parcel, next to the price.'
    },
    {
      type: 'image',
      image: img(
        'full-quiz',
        'Two phones on cobalt: onboarding step one, where each person in the household gets a tin with their own lid colour, and step three, asking about sensitive teeth, braces or bleeding gums, with a tip from the hygienist co-founder.'
      ),
      caption: 'Onboarding is three questions. The hygienist co-founder wrote every hint, and bleeding gums send people to a practice, not to the shop.'
    }
  ],
  outcome: {
    summary:
      'Gaaf launched on 12 March 2026 with 1,100 pre-orders. Three months later it sends about 3,400 letterbox parcels a month, and most support email asks for more lid colours.',
    metrics: [
      { value: '11 wk', label: 'from the first workshop to launch' },
      { value: '2.1%', label: 'monthly churn, against the 7% the founders planned for' },
      { value: '−64%', label: '“when is my refill?” emails compared with the fixed-plan pilot' },
      { value: '100%', label: 'plastic-free parcels, tape included' }
    ]
  }
});
