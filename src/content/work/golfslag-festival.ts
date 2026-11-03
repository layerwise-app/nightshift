import { defineCaseStudy } from '~/content/define';
import { imagesFor, videoFor } from '~/lib/images';
import images from './golfslag-festival/images.json';

const img = imagesFor('golfslag-festival', images);

export default defineCaseStudy({
  slug: 'golfslag-festival',
  order: 1,
  title: 'A fair queue for 31,000 people at ten o’clock',
  client: 'Golfslag Festival',
  year: 2025,
  sector: 'Festival ticketing',
  summary:
    'We built Golfslag’s own ticketing: a shuffled queue for the drop, group orders with split payment, tickets that scan without signal on the pier, and resale at face value. All three days sold out in 41 minutes, with no downtime.',
  role: ['Product design', 'Ticketing platform', 'Front-end', 'Wallet tickets'],
  team: [
    'Sanne de Vries, product design',
    'Ilyas Bouzid, queue and back-end',
    'Joris Kwakman, front-end',
    'Noor Aydın, ticket and wallet design',
    'Fenna Hoekstra, copy'
  ],
  accent: '#FF6A4D',
  cover: img(
    'cover',
    'Golfslag ticketing on two phones against coral: the fair queue showing 1,906 people ahead, and a weekend pass with its rotating code'
  ),
  problem: {
    brief:
      'Sell 48,000 tickets in one morning to fans instead of bots, then let 24,000 people a day through the gates of a pier with no reliable signal.',
    constraint:
      'In 2024 the drop ran through a large reseller. Its site went down at 10:02, and within the hour a third of the weekend passes were back on resale sites at up to four times the price. For 2025 Golfslag wanted a platform of its own. We had fourteen weeks until the drop, about 31,000 people would arrive in the first minute, and the gates stand on a concrete pier where mobile data drops out as soon as the crowd arrives.'
  },
  decisions: [
    {
      title: 'Shuffle everyone who arrives early',
      body: 'Anyone who opened the waiting room between 09:30 and 10:00 got a random place, so refreshing at 09:59:59 was worth nothing and nobody had to sit at a laptop from nine. After 10:00 the queue is first come, first served. The queue page shows your real position and a wait estimate based on how fast people are actually let through.'
    },
    {
      title: 'Four tickets per order, names on weekend passes',
      body: 'In the 2024 sales data, almost every genuine group was four people or fewer. A cap of four, with names on weekend passes that can be changed for free until two weeks before the festival, cut bulk buying without making friends queue separately.'
    },
    {
      title: 'Split the bill inside the order',
      body: 'One person reserves for the whole group, and each friend gets a link to pay their own share within 24 hours. Unpaid shares go back into the queue instead of becoming spare tickets for the resale market.'
    },
    {
      title: 'A ticket code that works in airplane mode',
      body: 'Each ticket generates a new code every 30 seconds from a key stored on the phone, so a screenshot is useless but no signal is needed. The gate scanners hold the day’s keys and sync with the box office once the pier’s own network is up.'
    }
  ],
  blocks: [
    {
      type: 'image',
      image: img(
        'full-landing',
        'The Golfslag website on desktop: the festival name in tall condensed type, the dates 27–29 June 2025, a countdown to the ticket drop, and the line-up for each day'
      ),
      caption:
        'The festival site counts down to the drop and explains the queue before anyone joins it. The line-up stays readable on the sand background at every size.'
    },
    {
      type: 'text',
      heading: 'Ten o’clock is a load test',
      body: [
        'The waiting room is a static page on the edge network. It never touches the ticket database, so 31,000 people can sit in it without slowing anything down. The queue lets people into checkout at a fixed rate, 860 a minute on drop day, which kept every checkout step under two seconds.',
        'We rehearsed the drop three times with synthetic traffic at twice the expected size. The third rehearsal found a slow inventory lock in the group orders, which we rewrote two weeks before the real thing.'
      ]
    },
    {
      type: 'video',
      video: videoFor('golfslag-festival', 'queue'),
      poster: img(
        'queue-poster',
        'Drop day on one phone: the queue counting down from 4,218 people ahead, next to the time 10:00:03'
      ),
      caption: 'Drop day on one phone: from joining the queue at 10:00:03 to two weekend passes in the wallet at 10:08.'
    },
    {
      type: 'demo',
      title: 'Pick your days',
      caption:
        'This is the screen people land on when the queue lets them in. Stock bars move live, sold-out days point to the official resale, and the total includes every fee before checkout.',
      hint: 'Add two weekend passes, turn on “Split with friends”, then open the sold-out Saturday.',
      background: '#12145A',
      load: () => import('./golfslag-festival/demo')
    },
    {
      type: 'pair',
      images: [
        img(
          'pair-queue-a',
          'The queue screen: 4,218 people ahead, a progress bar from joined at 10:00:03 to your turn around 10:06, and a note that refreshing won’t move you up'
        ),
        img(
          'pair-wallet-b',
          'A weekend pass in the Golfslag wallet: a large code that refreshes every 30 seconds, the ticket holder’s name, gate B, and a note that it works without signal'
        )
      ],
      caption:
        'Left: the queue is honest about your place and your wait. Right: the wallet ticket keeps the code large for gate scanners and says plainly that it works offline.'
    },
    {
      type: 'quote',
      quote:
        'Last year I spent drop day apologising on Instagram. This year I spent it watching a counter go up and answering two emails.',
      name: 'Roos Kalverda',
      role: 'Head of ticketing, Golfslag Festival'
    },
    {
      type: 'metrics',
      heading: 'Drop day, 4 March 2025',
      items: [
        { value: '31,402', label: 'people in the queue at 10:00' },
        { value: '6 min', label: 'median wait from joining to checkout' },
        { value: '2,480', label: 'tickets sold in the busiest minute', note: '10:02' },
        { value: '2,318', label: 'group orders split between friends' }
      ]
    },
    {
      type: 'image',
      image: img(
        'full-dashboard',
        'The organiser dashboard during the drop: 40,080 of 48,000 tickets sold, 9,812 people in the queue, a bar chart of tickets per minute, and stock per tier with Saturday sold out'
      ),
      caption:
        'The box office view Golfslag watched on drop day. Every number on it came from the same system the queue used, so the team never had to wonder whether the dashboard was lagging.'
    },
    {
      type: 'text',
      heading: 'Resale without the markup',
      body: [
        'The official resale opened in April. Sellers list at exactly what they paid, buyers pay the same €2.50 fee as on drop day, and the old code stops working the moment the ticket changes hands.',
        'People who missed out join a waiting list per day. When a ticket is listed, the first person on the list gets fifteen minutes to buy it, which made the scalper sites pointless: 2,904 Saturday tickets changed hands in the official resale, all at face value.'
      ]
    },
    {
      type: 'image',
      image: img(
        'full-resale',
        'Three phones showing the resale flow: a list of Saturday tickets at face value, a sell screen with the price fixed at €74,50, and a confirmation that the ticket sold'
      ),
      caption: 'Listing, selling, and getting paid. The price field is not a field: it is fixed at face value.'
    }
  ],
  outcome: {
    summary:
      'All three days sold out in 41 minutes, the queue never went down, and resale stayed at face value through the summer.',
    metrics: [
      { value: '41 min', label: 'to sell out all three days', note: '48,000 tickets' },
      { value: '0', label: 'minutes of downtime on drop day' },
      { value: '18,204', label: 'bot sessions held back in the queue' },
      { value: '2.4 s', label: 'median scan at the gate, without signal' }
    ]
  }
});
