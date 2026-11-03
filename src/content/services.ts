/** What the studio does. Shown on Home and About. */

export type Service = {
  name: string;
  summary: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    name: 'Brand identity',
    summary: 'Names, logos, type and colour, plus the rules that keep them working after we leave.',
    deliverables: ['Naming', 'Logo and wordmark', 'Type and colour system', 'Packaging', 'Livery and signage', 'Guidelines']
  },
  {
    name: 'Websites',
    summary: 'Marketing sites and shops that load fast and that your own team can edit on a Tuesday afternoon.',
    deliverables: ['Sitemap and copy', 'Design', 'Headless CMS', 'Shopify', 'SEO and analytics']
  },
  {
    name: 'Product design',
    summary: 'The flows behind the screens people use every week: checkouts, bookings, portals, dashboards.',
    deliverables: ['Customer interviews', 'Flows and prototypes', 'Design systems', 'Usability tests']
  },
  {
    name: 'Front-end and build',
    summary: 'React front-ends and integrations, with accessibility and performance treated as part of the job.',
    deliverables: ['React and TypeScript', 'Integrations and APIs', 'Accessibility audits', 'Performance budgets']
  },
  {
    name: 'Launch and aftercare',
    summary: 'Launch night with us in the room, then thirty days of fixes, and a retainer if you want one.',
    deliverables: ['Launch plan', 'Monitoring', 'Team training', 'Shift retainer']
  }
];
