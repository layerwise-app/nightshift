/**
 * Sample data for Ankerveld Werkplaats, the client portal. Everything is
 * fictional. "Today" in every screen is Tuesday 24 October 2023, after the
 * 06:10 nightly sync.
 */

export type AssetStatus = 'ok' | 'due' | 'overdue';

export type Company = {
  id: string;
  name: string;
  short: string;
  trade: string;
  /** Last nightly sync from this company's ERP. */
  synced: string;
  stale?: boolean;
  openTickets: number;
};

export const companies: Company[] = [
  { id: 'hijs', name: 'Ankerveld Hijstechniek', short: 'Hijstechniek', trade: 'Cranes and lifting', synced: '06:10', openTickets: 8 },
  { id: 'pomp', name: 'Ankerveld Pompservice', short: 'Pompservice', trade: 'Pump maintenance', synced: '06:02', openTickets: 5 },
  { id: 'steiger', name: 'Ankerveld Steigerbouw', short: 'Steigerbouw', trade: 'Scaffolding', synced: '04:58', openTickets: 4 },
  { id: 'coat', name: 'Ankerveld Coatings', short: 'Coatings', trade: 'Marine coatings', synced: '05:52', openTickets: 3 },
  { id: 'staal', name: 'Ankerveld Staalbouw', short: 'Staalbouw', trade: 'Steel fabrication', synced: '05:40', openTickets: 2 },
  { id: 'keuring', name: 'Ankerveld Keuring', short: 'Keuring', trade: 'Inspection', synced: '06:15', openTickets: 1 },
  { id: 'touw', name: 'Ankerveld Touwtechniek', short: 'Touwtechniek', trade: 'Rope access', synced: 'Mon 23:10', stale: true, openTickets: 0 }
];

export type TimelineEntry = {
  date: string;
  title: string;
  detail: string;
  kind: 'sync' | 'service' | 'inspection' | 'certificate' | 'issue';
};

export type Asset = {
  id: string;
  name: string;
  type: 'Crane' | 'Hoist' | 'Pump' | 'Sling' | 'Scaffold' | 'Basket';
  company: string;
  location: string;
  status: AssetStatus;
  nextInspection: string;
  /** Days until (positive) or since (negative) the next inspection. */
  days: number;
  certificate: { id: string; validUntil: string; inspector: string };
  specs: [string, string][];
  history: TimelineEntry[];
};

export const assets: Asset[] = [
  {
    id: 'KR-0417',
    name: 'Harbour crane 64 t',
    type: 'Crane',
    company: 'Ankerveld Hijstechniek',
    location: 'Steiger 4, north end',
    status: 'due',
    nextInspection: '18 Nov 2023',
    days: 25,
    certificate: { id: 'KC-22-4471', validUntil: '18 Nov 2023', inspector: 'H. Brinkman' },
    specs: [
      ['Safe working load', '64 t at 12 m'],
      ['Outreach', '40 m'],
      ['Built', '2014'],
      ['Serial', 'AH-MHK-1408-22']
    ],
    history: [
      { date: '24 Oct, 06:10', title: 'Synced from Ankerveld Hijstechniek', detail: 'No changes since 23 Oct', kind: 'sync' },
      { date: '12 Sep 2023', title: 'Ticket ST-23-0881 closed', detail: 'Slewing ring greased, hoist rope 2 replaced', kind: 'service' },
      { date: '03 Jul 2023', title: 'Quarterly visual check', detail: 'Passed, 2 notes on rope wear', kind: 'inspection' },
      { date: '18 Nov 2022', title: 'Certificate KC-22-4471 issued', detail: 'Annual inspection, Arbobesluit 7.29', kind: 'certificate' }
    ]
  },
  {
    id: 'TK-1180',
    name: 'Electric chain hoist 5 t',
    type: 'Hoist',
    company: 'Ankerveld Hijstechniek',
    location: 'Pump house 2',
    status: 'overdue',
    nextInspection: '02 Oct 2023',
    days: -22,
    certificate: { id: 'KC-22-3982', validUntil: '02 Oct 2023', inspector: 'H. Brinkman' },
    specs: [
      ['Safe working load', '5 t'],
      ['Lift height', '9 m'],
      ['Built', '2019'],
      ['Serial', 'AH-TK5-1904-07']
    ],
    history: [
      { date: '24 Oct, 06:10', title: 'Synced from Ankerveld Hijstechniek', detail: 'Inspection visit booked for 26 Oct', kind: 'sync' },
      { date: '03 Oct 2023', title: 'Certificate expired', detail: 'Do not lift until re-inspected', kind: 'certificate' },
      { date: '14 Jun 2023', title: 'Ticket ST-23-0512 closed', detail: 'Brake pads replaced', kind: 'service' }
    ]
  },
  {
    id: 'HS-3307',
    name: 'Round sling set 10 t (12×)',
    type: 'Sling',
    company: 'Ankerveld Hijstechniek',
    location: 'Tool store B',
    status: 'overdue',
    nextInspection: '19 Oct 2023',
    days: -5,
    certificate: { id: 'KC-23-0219', validUntil: '19 Oct 2023', inspector: 'P. Dijkhuis' },
    specs: [
      ['Safe working load', '10 t each'],
      ['Length', '6 m'],
      ['Pieces', '12'],
      ['Batch', 'RS10-2209']
    ],
    history: [
      { date: '24 Oct, 06:10', title: 'Synced from Ankerveld Hijstechniek', detail: 'Collection planned 25 Oct', kind: 'sync' },
      { date: '19 Apr 2023', title: 'Half-year check', detail: '1 sling rejected, replaced', kind: 'inspection' }
    ]
  },
  {
    id: 'PM-2231',
    name: 'Centrifugal pump, jetty 2',
    type: 'Pump',
    company: 'Ankerveld Pompservice',
    location: 'Steiger 2, manifold',
    status: 'due',
    nextInspection: '07 Nov 2023',
    days: 14,
    certificate: { id: 'PS-23-1170', validUntil: '07 Nov 2023', inspector: 'M. Oudshoorn' },
    specs: [
      ['Flow', '420 m³/h'],
      ['Head', '68 m'],
      ['Built', '2017'],
      ['Seal', 'Double mechanical']
    ],
    history: [
      { date: '24 Oct, 06:02', title: 'Synced from Ankerveld Pompservice', detail: 'Vibration reading normal', kind: 'sync' },
      { date: '22 Aug 2023', title: 'Ticket PS-23-0644 closed', detail: 'Bearing housing refilled', kind: 'service' }
    ]
  },
  {
    id: 'HS-3312',
    name: 'Chain sling 4-leg 8 t',
    type: 'Sling',
    company: 'Ankerveld Hijstechniek',
    location: 'Tool store B',
    status: 'due',
    nextInspection: '21 Nov 2023',
    days: 28,
    certificate: { id: 'KC-23-0388', validUntil: '21 Nov 2023', inspector: 'P. Dijkhuis' },
    specs: [
      ['Safe working load', '8 t at 0–45°'],
      ['Grade', '10'],
      ['Leg length', '3 m'],
      ['Serial', 'CS8-4L-0311']
    ],
    history: [
      { date: '24 Oct, 06:10', title: 'Synced from Ankerveld Hijstechniek', detail: 'No changes since 23 Oct', kind: 'sync' },
      { date: '21 May 2023', title: 'Half-year check', detail: 'Passed', kind: 'inspection' }
    ]
  },
  {
    id: 'KR-0422',
    name: 'Gantry crane 40 t',
    type: 'Crane',
    company: 'Ankerveld Hijstechniek',
    location: 'Workshop hall',
    status: 'ok',
    nextInspection: '12 Mar 2024',
    days: 140,
    certificate: { id: 'KC-23-0802', validUntil: '12 Mar 2024', inspector: 'H. Brinkman' },
    specs: [
      ['Safe working load', '40 t'],
      ['Span', '22 m'],
      ['Built', '2011'],
      ['Serial', 'AH-PK40-1103-02']
    ],
    history: [
      { date: '24 Oct, 06:10', title: 'Synced from Ankerveld Hijstechniek', detail: 'No changes since 23 Oct', kind: 'sync' },
      { date: '12 Mar 2023', title: 'Certificate KC-23-0802 issued', detail: 'Annual inspection, passed', kind: 'certificate' }
    ]
  },
  {
    id: 'PM-2236',
    name: 'Firewater pump',
    type: 'Pump',
    company: 'Ankerveld Pompservice',
    location: 'Firewater house',
    status: 'ok',
    nextInspection: '15 Feb 2024',
    days: 114,
    certificate: { id: 'PS-23-0091', validUntil: '15 Feb 2024', inspector: 'M. Oudshoorn' },
    specs: [
      ['Flow', '900 m³/h'],
      ['Drive', 'Diesel, 310 kW'],
      ['Built', '2016'],
      ['Test run', 'Weekly, Mondays']
    ],
    history: [
      { date: '24 Oct, 06:02', title: 'Synced from Ankerveld Pompservice', detail: 'Weekly test run logged 23 Oct', kind: 'sync' }
    ]
  },
  {
    id: 'TK-1184',
    name: 'Electric chain hoist 5 t',
    type: 'Hoist',
    company: 'Ankerveld Hijstechniek',
    location: 'Pump house 3',
    status: 'ok',
    nextInspection: '30 Jan 2024',
    days: 98,
    certificate: { id: 'KC-23-0050', validUntil: '30 Jan 2024', inspector: 'H. Brinkman' },
    specs: [
      ['Safe working load', '5 t'],
      ['Lift height', '9 m'],
      ['Built', '2020'],
      ['Serial', 'AH-TK5-2001-11']
    ],
    history: [
      { date: '24 Oct, 06:10', title: 'Synced from Ankerveld Hijstechniek', detail: 'No changes since 23 Oct', kind: 'sync' }
    ]
  },
  {
    id: 'SC-4410',
    name: 'Scaffold, tank 17 shell',
    type: 'Scaffold',
    company: 'Ankerveld Steigerbouw',
    location: 'Tank pit C, tank 17',
    status: 'ok',
    nextInspection: '07 Nov 2023',
    days: 14,
    certificate: { id: 'SB-23-2214', validUntil: '07 Nov 2023', inspector: 'K. Verhagen' },
    specs: [
      ['Height', '21 m'],
      ['Load class', '3 (200 kg/m²)'],
      ['Erected', '10 Oct 2023'],
      ['Tag', 'Green, weekly check']
    ],
    history: [
      { date: '24 Oct, 04:58', title: 'Synced from Ankerveld Steigerbouw', detail: 'Weekly tag check due 31 Oct', kind: 'sync' }
    ]
  },
  {
    id: 'LV-5102',
    name: 'Personnel basket, 2 persons',
    type: 'Basket',
    company: 'Ankerveld Hijstechniek',
    location: 'Steiger 4',
    status: 'ok',
    nextInspection: '28 Feb 2024',
    days: 127,
    certificate: { id: 'KC-23-0611', validUntil: '28 Feb 2024', inspector: 'P. Dijkhuis' },
    specs: [
      ['Safe working load', '240 kg'],
      ['Persons', '2'],
      ['Built', '2021'],
      ['Serial', 'AH-PB2-2108-03']
    ],
    history: [
      { date: '24 Oct, 06:10', title: 'Synced from Ankerveld Hijstechniek', detail: 'No changes since 23 Oct', kind: 'sync' }
    ]
  }
];

export const certificates = [
  { id: 'KC-23-0802', asset: 'KR-0422 Gantry crane 40 t', type: 'Annual inspection', issued: '12 Mar 2023', valid: '12 Mar 2024', inspector: 'H. Brinkman', status: 'ok' as AssetStatus },
  { id: 'KC-22-4471', asset: 'KR-0417 Harbour crane 64 t', type: 'Annual inspection', issued: '18 Nov 2022', valid: '18 Nov 2023', inspector: 'H. Brinkman', status: 'due' as AssetStatus },
  { id: 'PS-23-1170', asset: 'PM-2231 Centrifugal pump', type: 'Pressure test', issued: '07 May 2023', valid: '07 Nov 2023', inspector: 'M. Oudshoorn', status: 'due' as AssetStatus },
  { id: 'KC-23-0388', asset: 'HS-3312 Chain sling 8 t', type: 'Half-year check', issued: '21 May 2023', valid: '21 Nov 2023', inspector: 'P. Dijkhuis', status: 'due' as AssetStatus },
  { id: 'KC-22-3982', asset: 'TK-1180 Chain hoist 5 t', type: 'Annual inspection', issued: '02 Oct 2022', valid: '02 Oct 2023', inspector: 'H. Brinkman', status: 'overdue' as AssetStatus },
  { id: 'KC-23-0219', asset: 'HS-3307 Round slings 10 t', type: 'Half-year check', issued: '19 Apr 2023', valid: '19 Oct 2023', inspector: 'P. Dijkhuis', status: 'overdue' as AssetStatus },
  { id: 'SB-23-2214', asset: 'SC-4410 Scaffold tank 17', type: 'Erection check', issued: '10 Oct 2023', valid: '07 Nov 2023', inspector: 'K. Verhagen', status: 'ok' as AssetStatus },
  { id: 'KC-23-0050', asset: 'TK-1184 Chain hoist 5 t', type: 'Annual inspection', issued: '30 Jan 2023', valid: '30 Jan 2024', inspector: 'H. Brinkman', status: 'ok' as AssetStatus },
  { id: 'KC-23-0611', asset: 'LV-5102 Personnel basket', type: 'Annual inspection', issued: '28 Feb 2023', valid: '28 Feb 2024', inspector: 'P. Dijkhuis', status: 'ok' as AssetStatus },
  { id: 'PS-23-0091', asset: 'PM-2236 Firewater pump', type: 'Annual service', issued: '15 Feb 2023', valid: '15 Feb 2024', inspector: 'M. Oudshoorn', status: 'ok' as AssetStatus },
  { id: 'TT-23-0140', asset: 'Anchor points tank 9 roof', type: 'Anchor test', issued: '04 Sep 2023', valid: '04 Sep 2024', inspector: 'L. Schouten', status: 'ok' as AssetStatus }
];

export type OrderStep = 'Quoted' | 'Ordered' | 'In production' | 'Shipped' | 'Delivered';
export const orderSteps: OrderStep[] = ['Quoted', 'Ordered', 'In production', 'Shipped', 'Delivered'];

export const orders = [
  { id: 'SO-23-3318', item: 'Pipe rack extension, jetty 2', company: 'Staalbouw', step: 'In production' as OrderStep, eta: '14 Nov 2023', value: '€ 186,400', synced: '05:40' },
  { id: 'SO-23-3290', item: 'Replacement hoist rope, KR-0417', company: 'Hijstechniek', step: 'Shipped' as OrderStep, eta: '26 Oct 2023', value: '€ 8,960', synced: '06:10' },
  { id: 'CO-23-0744', item: 'Tank 17 shell recoat, 1,400 m²', company: 'Coatings', step: 'Ordered' as OrderStep, eta: '04 Dec 2023', value: '€ 97,300', synced: '05:52' },
  { id: 'PS-23-0812', item: 'Spare seal kit ×4, PM-2231', company: 'Pompservice', step: 'Delivered' as OrderStep, eta: '19 Oct 2023', value: '€ 3,140', synced: '06:02' },
  { id: 'SB-23-1503', item: 'Scaffold hire, tank 17, 6 weeks', company: 'Steigerbouw', step: 'Delivered' as OrderStep, eta: '10 Oct 2023', value: '€ 41,280', synced: '04:58' },
  { id: 'SO-23-3341', item: 'Stair tower, firewater house', company: 'Staalbouw', step: 'Quoted' as OrderStep, eta: 'Awaiting approval', value: '€ 52,700', synced: '05:40' },
  { id: 'TT-23-0217', item: 'Rope access inspection, tank 9 roof', company: 'Touwtechniek', step: 'Ordered' as OrderStep, eta: '02 Nov 2023', value: '€ 6,480', synced: 'Mon 23:10' },
  { id: 'KE-23-0960', item: 'Annual lifting inspection, 38 items', company: 'Keuring', step: 'Ordered' as OrderStep, eta: '18 Nov 2023', value: '€ 16,420', synced: '06:15' }
];

export const tickets = [
  { id: 'ST-23-1031', title: 'Hoist rope wear above limit', asset: 'KR-0417', company: 'Hijstechniek', state: 'Parts shipped', age: '6 d' },
  { id: 'ST-23-1029', title: 'Re-inspection after expiry', asset: 'TK-1180', company: 'Hijstechniek', state: 'Visit 26 Oct', age: '8 d' },
  { id: 'PS-23-0871', title: 'Seal weeping at manifold', asset: 'PM-2231', company: 'Pompservice', state: 'Technician assigned', age: '2 d' },
  { id: 'SB-23-0420', title: 'Toe board missing, level 6', asset: 'SC-4410', company: 'Steigerbouw', state: 'Waiting on you', age: '1 d' },
  { id: 'CO-23-0301', title: 'Coating survey, tank 17', asset: 'Tank 17', company: 'Coatings', state: 'Report ready', age: '3 d' }
];
