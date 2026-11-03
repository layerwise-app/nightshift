import { defineCaseStudy } from '~/content/define';
import { imagesFor } from '~/lib/images';
import images from './kamerstuk/images.json';

const img = imagesFor('kamerstuk', images);

export default defineCaseStudy({
  slug: 'kamerstuk',
  order: 4,
  title: 'Every sofa, drawn before it’s made',
  client: 'Kamerstuk',
  year: 2024,
  sector: 'Furniture e-commerce',
  summary:
    'An online store for a Rotterdam shop that sells made-to-order furniture from nine Dutch workshops. Every wood, fabric and size is drawn live, priced in the open, and given the real lead time of the workshop that builds it.',
  role: ['Product design', 'Illustration system', 'Front-end', 'Shopify build', 'Copy'],
  team: [
    'Sanne de Vries, product design',
    'Noor Aydın, illustration and type',
    'Joris Kwakman, front-end',
    'Ilyas Bouzid, workshop integrations',
    'Fenna Hoekstra, copy'
  ],
  accent: '#B4552F',
  cover: img(
    'cover',
    'Kamerstuk cover: three versions of the Bank Maas sofa drawn in oak, walnut and black oak, next to a phone showing the sofa configurator'
  ),
  problem: {
    brief:
      'Kamerstuk sold through a 64-page PDF and the phone. The owners wanted customers to choose, price and order a piece online without a sales call.',
    constraint:
      'Every piece is built after the order by one of nine small workshops, each with its own lead time and its own order book. Price depends on wood, fabric and size: about 3,200 combinations across the range, and no budget to photograph even a tenth of them. The shop on the Nieuwe Binnenweg fits eleven pieces.'
  },
  decisions: [
    {
      title: 'Draw the furniture instead of photographing it',
      body: 'Each piece is drawn from its real parts: frame, legs, cushions, and the fabric laid over them. The drawing redraws with every choice, so the picture is always the exact piece on the order. Photography went to the showroom and the workshops, where it tells the truth.'
    },
    {
      title: 'Show the workshop’s lead time, not “in stock”',
      body: 'Every Monday each workshop fills in a one-page form with how many frames it can take. The product page turns that into “made in Dordrecht, ready in 9 weeks”, and adds the extra week walnut or bouclé really costs.'
    },
    {
      title: 'Put every surcharge next to its swatch',
      body: 'Walnut is +€380 and herringbone wool is +€310, and the page says so before you pick them. Nobody should discover a price in the cart that the shop already knew.'
    },
    {
      title: 'Only offer delivery days the van can keep',
      body: 'Kamerstuk delivers with two vans on fixed days per region. Checkout shows only those days after your pieces are ready, holds early pieces in the Schiedam depot, and brings everything on one trip.'
    }
  ],
  outcome: {
    summary:
      'Twelve months after launch, more than half of Kamerstuk’s revenue is ordered online, and Saturday phone calls about prices have nearly stopped.',
    metrics: [
      { value: '58%', label: 'of revenue ordered online in the first year', note: 'from 0%' },
      { value: '−71%', label: 'phone calls asking for a price or lead time' },
      { value: '3,214', label: 'combinations drawn, none photographed' },
      { value: '1 in 3', label: 'online orders follows a showroom visit booked on the site' }
    ]
  },
  blocks: [
    {
      type: 'text',
      heading: 'A catalogue that couldn’t keep up',
      body: [
        'The 2022 catalogue was page after page of “prijs op aanvraag” and “levertijd in overleg”: price on request, lead time to be discussed. Every order started with a phone call, and every call ended with someone looking up a surcharge in a spreadsheet.',
        'Drag the slider to compare page 23 of that PDF with the product page that replaced it.'
      ]
    },
    {
      type: 'beforeAfter',
      before: img('before-catalogue', 'Page 23 of the old Kamerstuk PDF catalogue: sofa drawings, a dimension table, and “prijs op aanvraag” in every price cell'),
      after: img('after-product', 'The new Bank Maas product page: a large drawing of the sofa in walnut and green corduroy, option swatches with surcharges, and a ready-in-10-weeks lead time card'),
      labels: ['2022 catalogue', '2024 product page'],
      caption: 'Same sofa, same shop. The new page answers the three questions the phone used to: what it costs, who makes it, and when it’s ready.'
    },
    {
      type: 'image',
      image: img('full-collection', 'The Kamerstuk collection page: eight drawn pieces in a grid, each with a price, a workshop name, and a ready-in-weeks label'),
      caption: 'The collection sorts by workshop by default, so you see who makes what before you see what it costs.'
    },
    {
      type: 'demo',
      title: 'The configurator',
      caption:
        'This is the component that runs on every product page. Change the wood, the fabric or the width, and the drawing, the price, and the workshop’s lead time change together.',
      hint: 'Pick walnut and 240 cm, then add it to the cart: the price and the ready date move with you.',
      background: '#E4DDD0',
      load: () => import('./kamerstuk/demo')
    },
    {
      type: 'image',
      image: img('full-renders', 'A spec sheet of eight Bank Maas sofas in different woods, fabrics and widths, each with its price and lead time'),
      caption: 'Eight of Bank Maas’s sixty versions. Each is assembled from the same 38 drawn parts, so a new fabric is one swatch and a colour, not a photo shoot.'
    },
    {
      type: 'text',
      heading: 'Lead times you can plan a move around',
      body: [
        'The workshops update their order books themselves, on a form short enough to fill in on a phone at the bench. Van Rijn in Dordrecht builds 41 frames a month; when its next four weeks fill up, every sofa page on the site shows the later start the same afternoon.',
        'Each workshop has its own page, with the makers, the bench, and the weeks ahead.'
      ]
    },
    {
      type: 'image',
      image: img('full-workshop', 'The workshop page for Werkplaats Van Rijn in Dordrecht: an illustration of the bench with a sofa frame on trestles, workshop stats, and a bar chart of its order book for the next twelve weeks')
    },
    {
      type: 'pair',
      images: [
        img('pair-cart-a', 'Phone cart with a walnut and corduroy Bank Maas and four Stoel Kralingen chairs, delivered together in week 24'),
        img('pair-cart-b', 'Phone delivery step showing June 2025 with only Tuesdays and Fridays open, one full day crossed out, and three time windows')
      ],
      caption: 'Pieces from two workshops arrive on one trip. Checkout only offers the days a van actually drives to your postcode.'
    },
    {
      type: 'quote',
      quote:
        'We used to spend Saturdays on the phone reading out walnut surcharges. Now people walk in knowing exactly which sofa they want, and sit on it to be sure.',
      name: 'Lotte Hamer',
      role: 'co-owner, Kamerstuk'
    },
    {
      type: 'image',
      image: img('full-materials', 'The materials page with four wood samples and eight fabric swatches, a sample tray with three chosen, and two printed sample cards beside the browser'),
      caption: 'Free samples go out in reused envelopes within three working days. The tray holds six, because nobody decides between twelve.'
    },
    {
      type: 'image',
      image: img('full-showroom', 'The showroom booking page: a drawn street map of the Nieuwe Binnenweg with the shop pinned, and a booking card with Saturday 15 March at 13:30 selected'),
      caption: 'Booking a visit tells the shop which fabrics to drape over the sofa before you arrive.'
    }
  ]
});
