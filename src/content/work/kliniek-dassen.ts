import { defineCaseStudy } from '~/content/define';
import { imagesFor } from '~/lib/images';
import images from './kliniek-dassen/images.json';

const img = imagesFor('kliniek-dassen', images);

export default defineCaseStudy({
  slug: 'kliniek-dassen',
  order: 3,
  title: 'A hand clinic website you can use with one hand',
  client: 'Kliniek Dassen',
  year: 2025,
  sector: 'Healthcare website',
  summary:
    'A calmer website for a Rotterdam hand and wrist surgery practice: plain-language condition pages a surgeon signs off, honest wait times, and GP referrals that arrive by upload instead of fax.',
  role: ['Content strategy', 'UX and UI design', 'Illustration', 'Front-end', 'Referral intake'],
  team: [
    'Sanne de Vries, product design',
    'Fenna Hoekstra, writing',
    'Mees Verbaan, illustration',
    'Joris Kwakman, front-end',
    'Ilyas Bouzid, referral intake'
  ],
  accent: '#12343B',
  cover: img(
    'cover',
    'The Kliniek Dassen hand map on a phone, tapping the palm, in front of the carpal tunnel page on a laptop, under the words “Where does it hurt?”'
  ),
  problem: {
    brief:
      'Patients arrived at their first consult anxious and carrying forum printouts, and about one in eight GP referrals sent by fax never reached the right surgeon.',
    constraint:
      'Dutch rules for medical advertising rule out patient before-and-after photos, promised outcomes, and prices dressed up as offers. Many visitors are over sixty, or have just one usable hand, so every step had to work one-handed with large targets and no drag gestures. And no condition page could go live without a surgeon’s signature.'
  },
  decisions: [
    {
      title: 'One template for every condition',
      body: 'Each page answers the same five questions in the same order: what it is, what you might feel, what often helps, what an operation involves, and how recovery usually goes. The surgeons review faster because they know where everything is, and patients can compare pages. The reviewing surgeon and the date sit under every title.'
    },
    {
      title: 'Point at it instead of naming it',
      body: 'Most people do not know what their condition is called, so the home page starts with a drawing of a hand. Tap the area that hurts and you get the two or three usual causes in plain words. Every area is also a plain list button, and the result opens with a button and closes with one, never with a swipe.'
    },
    {
      title: 'Publish the wait times, including the long ones',
      body: 'Three in ten phone calls were people asking how long they would wait. The waiting times page now reads the agenda every Monday morning and shows each wait next to last month’s, so a longer queue shows up here before it shows up at the desk.'
    },
    {
      title: 'Replace the fax with an upload',
      body: 'GPs and patients upload the referral letter, a photo is fine, and it lands in the intake queue with a reference number. The patient gets a text within two working days with a link to pick a time. We built the intake screen for the front desk too, so nobody retypes a letter.'
    }
  ],
  outcome: {
    summary: 'Calls to the front desk dropped by a third, and referrals stopped going missing.',
    metrics: [
      { value: '−34%', label: 'phone calls to the front desk', note: 'first six months' },
      { value: '0', label: 'referrals lost since the upload replaced the fax', note: 'was about 1 in 8' },
      { value: '71%', label: 'of referrals now arrive through the upload', note: 'the rest via Zorgmail' },
      { value: '23', label: 'condition pages written, each signed by a surgeon' }
    ]
  },
  blocks: [
    {
      type: 'text',
      heading: 'Written by us, signed by a surgeon',
      body: [
        'Fenna drafted every condition page from an interview with one of the surgeons, then read it aloud to someone who had never heard of the condition. Anything that needed explaining twice was rewritten.',
        'Recovery is shown as a typical timeline, never as a promise, and every timeline ends with the same sentence: everyone heals at their own pace.'
      ]
    },
    {
      type: 'image',
      image: img(
        'condition-page',
        'The carpal tunnel syndrome page on a laptop: plain-language sections, a card with three treatments, and a dark band with the recovery timeline from day 0 to week 12.'
      ),
      caption: 'Condition pages follow one template. The recovery timeline is the part patients asked about most.'
    },
    {
      type: 'demo',
      title: 'Where does it hurt?',
      caption:
        'The hand map from the home page. Every area is a large button on the drawing and again in a list below it, and the answer opens in a sheet with the usual causes, what tends to help, and today’s wait for a first consult.',
      hint: 'Tap the palm or the base of the thumb, then ask about a referral.',
      background: '#B9CFC4',
      finish: 'silver',
      load: () => import('./kliniek-dassen/demo')
    },
    {
      type: 'pair',
      images: [
        img(
          'referral-upload',
          'Step two of the referral upload on a phone: the GP’s letter attached as a PDF and marked readable, with name, date of birth and mobile number filled in.'
        ),
        img(
          'referral-done',
          'The confirmation screen on a phone: reference number KD-25-04817 and three numbered steps for what happens next.'
        )
      ],
      caption: 'The referral upload replaced a fax number and a Word form. The reference number is the same one the front desk sees.'
    },
    {
      type: 'quote',
      quote:
        'We used to start every first consult by undoing what someone had read on a forum. Now patients come in having read our page, and we start with their hand.',
      name: 'Dr. Imke Dassen',
      role: 'hand surgeon and founder, Kliniek Dassen'
    },
    {
      type: 'image',
      image: img(
        'team-page',
        'The team page with five line-drawn portraits: three surgeons and two hand therapists, each with their focus and consulting days.'
      ),
      caption: 'No photos of patients, and no photos of the team either: line portraits that match the hand drawings, with what each person actually does.'
    },
    {
      type: 'beforeAfter',
      before: img(
        'site-before',
        'The old practice website from 2013: a blue header, a long row of links, a yellow notice bar, a fax number for referrals and a visitor counter.'
      ),
      after: img(
        'site-after',
        'The new home page: “Hand and wrist care, explained plainly”, the hand map on a sage panel, and the current wait for a first consult.'
      ),
      labels: ['2013', '2025'],
      caption: 'The old home page sent referrals to a fax and the wait times to a PDF from 2013.'
    },
    {
      type: 'image',
      image: img(
        'operation-prep',
        'Two phones on dark teal: a pre-op checklist for a carpal tunnel release on Thursday 15 May, and the morning of the operation from 08:15 arrival to 09:30 going home.'
      ),
      caption: 'A week before surgery a text links to the checklist. Each item says why, because people follow instructions they understand.'
    },
    {
      type: 'text',
      heading: 'Honest about waiting',
      body: [
        'The practice was nervous about publishing an eleven-week wait for thumb base surgery. We showed them the call log: people rang because they could not find the number, not because it was long.',
        'The page now updates itself every Monday at 07:30. The triage line for urgent cases sits right beside it.'
      ]
    },
    {
      type: 'image',
      image: img(
        'wait-times',
        'The waiting times page: six appointment types with bars in weeks, last month’s wait marked on each bar, and a box explaining the urgent triage line.'
      )
    }
  ]
});
