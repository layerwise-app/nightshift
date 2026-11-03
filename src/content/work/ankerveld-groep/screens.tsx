import { useEffect, useState, type ReactNode } from 'react';
import { assets, certificates, companies, orderSteps, orders, tickets, type AssetStatus } from './data';
import { C, Icon, Mono, StatusBadge, Synced, Wordmark, font, mono } from './ui';

type Page = 'overview' | 'assets' | 'tickets' | 'certificates' | 'orders' | 'map';

const NAV: { id: Page; label: string; icon: Parameters<typeof Icon>[0]['name']; count?: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'assets', label: 'Assets', icon: 'box', count: '214' },
  { id: 'tickets', label: 'Service tickets', icon: 'ticket', count: '23' },
  { id: 'certificates', label: 'Certificates', icon: 'doc', count: '312' },
  { id: 'orders', label: 'Orders', icon: 'cart', count: '9' },
  { id: 'map', label: 'Site map', icon: 'map' }
];

/** The desktop portal: navy sidebar with per-company sync times, white top bar. */
export function PortalShell({
  active,
  width,
  height,
  children
}: {
  active: Page;
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <div className='flex overflow-hidden' style={{ ...font, width, height, background: C.concrete }}>
      <aside className='flex w-[236px] shrink-0 flex-col' style={{ background: C.navy, color: C.white }}>
        <div className='px-5 pb-5 pt-5'>
          <Wordmark tone='dark' size={15} />
        </div>
        <div className='mx-3 rounded-[6px] px-3 py-2.5' style={{ background: C.navy2 }}>
          <p style={{ fontFamily: mono, fontSize: 10.5, color: '#8FA6B8', letterSpacing: '0.08em' }}>CLIENT</p>
          <p className='mt-0.5 flex items-center justify-between text-[13.5px] font-semibold'>
            Terminal Botlek Noord
            <Icon name='chevron' size={14} style={{ transform: 'rotate(90deg)', color: '#8FA6B8' }} />
          </p>
          <p className='text-[12px]' style={{ color: '#9FB3C2' }}>
            3 sites · 214 assets
          </p>
        </div>
        <nav className='mt-4 px-3'>
          {NAV.map((item) => {
            const on = item.id === active;
            return (
              <div
                key={item.id}
                className='mb-0.5 flex h-10 items-center gap-3 rounded-[6px] px-3 text-[14px]'
                style={{ background: on ? C.navy3 : 'transparent', color: on ? C.white : '#B9C8D3', fontWeight: on ? 600 : 450 }}
              >
                <Icon name={item.icon} size={18} style={{ color: on ? C.amber : '#7F96A8' }} />
                <span className='flex-1'>{item.label}</span>
                {item.count ? <Mono style={{ fontSize: 11.5, color: '#8FA6B8' }}>{item.count}</Mono> : null}
              </div>
            );
          })}
        </nav>
        <div className='mt-auto px-5 pb-5'>
          <p style={{ fontFamily: mono, fontSize: 10.5, color: '#8FA6B8', letterSpacing: '0.08em' }}>DATA FROM</p>
          <ul className='mt-2 space-y-[7px]'>
            {companies.map((c) => (
              <li key={c.id} className='flex items-center justify-between text-[12.5px]'>
                <span className='flex items-center gap-2' style={{ color: '#D3DEE6' }}>
                  <span className='size-[7px] rounded-full' style={{ background: c.stale ? C.amber : '#5FB283' }} />
                  {c.short}
                </span>
                <Mono style={{ fontSize: 11, color: c.stale ? C.amber : '#8FA6B8' }}>{c.synced}</Mono>
              </li>
            ))}
          </ul>
          <div className='mt-5 flex items-center gap-3 border-t pt-4' style={{ borderColor: C.navy3 }}>
            <span className='flex size-9 items-center justify-center rounded-full text-[13px] font-semibold' style={{ background: C.amber, color: C.navy }}>
              RK
            </span>
            <span className='leading-tight'>
              <span className='block text-[13px] font-semibold'>Rianne Kloosterman</span>
              <span className='block text-[12px]' style={{ color: '#9FB3C2' }}>
                Site supervisor
              </span>
            </span>
          </div>
        </div>
      </aside>
      <div className='flex min-w-0 flex-1 flex-col'>
        <header className='flex h-[64px] shrink-0 items-center gap-4 border-b px-7' style={{ background: C.white, borderColor: C.line }}>
          <div className='flex h-10 flex-1 items-center gap-2.5 rounded-[6px] px-3.5 text-[14px]' style={{ background: C.concrete, color: C.steel, maxWidth: 460 }}>
            <Icon name='search' size={17} />
            Search assets, tickets, certificates…
            <Mono className='ml-auto' style={{ fontSize: 11, border: `1px solid ${C.line}`, borderRadius: 4, padding: '1px 6px' }}>
              /
            </Mono>
          </div>
          <div className='ml-auto flex items-center gap-1 rounded-[6px] p-1' style={{ background: C.concrete, fontFamily: mono, fontSize: 12 }}>
            {['EN', 'NL', 'DE'].map((l) => (
              <span key={l} className='rounded-[4px] px-2 py-1' style={{ background: l === 'EN' ? C.white : 'transparent', fontWeight: l === 'EN' ? 600 : 400, color: l === 'EN' ? C.navy : C.steel, boxShadow: l === 'EN' ? `0 1px 2px rgba(14,36,51,0.12)` : 'none' }}>
                {l}
              </span>
            ))}
          </div>
          <span className='relative flex size-10 items-center justify-center rounded-[6px]' style={{ color: C.navy }}>
            <Icon name='bell' size={20} />
            <span className='absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold' style={{ background: C.rust, color: C.white }}>
              6
            </span>
          </span>
          <span className='flex h-10 items-center gap-2 rounded-[6px] px-4 text-[14px] font-semibold' style={{ background: C.amber, color: C.amberInk }}>
            <Icon name='alert' size={17} stroke={2.1} />
            Report an issue
          </span>
        </header>
        <div className='min-h-0 flex-1 overflow-hidden px-7 py-6'>{children}</div>
      </div>
    </div>
  );
}

function Card({ title, aside, children, className, pad = true }: { title?: string; aside?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={`overflow-hidden rounded-[8px] ${className ?? ''}`} style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
      {title ? (
        <div className='flex items-center justify-between px-5 pb-3 pt-4'>
          <h3 className='text-[15px] font-semibold'>{title}</h3>
          {aside}
        </div>
      ) : null}
      <div className={pad ? 'px-5 pb-5' : ''}>{children}</div>
    </section>
  );
}

const th = 'px-3 py-2.5 text-left text-[11.5px] font-medium uppercase tracking-[0.06em]';

/* ------------------------------------------------------------- overview */

export function OverviewPage({ width = 1280, height = 800 }: { width?: number; height?: number }) {
  const kpis = [
    { label: 'Assets under contract', value: '214', note: '7 companies', tone: C.navy },
    { label: 'Inspections due ≤ 30 days', value: '17', note: 'next: KR-0417, 18 Nov', tone: '#9A7000' },
    { label: 'Overdue', value: '4', note: '2 lifting, 1 pump, 1 sling', tone: C.rust },
    { label: 'Open service tickets', value: '23', note: '6 waiting on you', tone: C.navy },
    { label: 'Orders in progress', value: '9', note: '€ 412,680 total', tone: C.navy }
  ];
  const due = assets.filter((a) => a.status !== 'ok').sort((a, b) => a.days - b.days);
  const maxTickets = Math.max(...companies.map((c) => c.openTickets));
  return (
    <PortalShell active='overview' width={width} height={height}>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-[27px] font-semibold leading-tight tracking-[-0.01em]'>Good morning, Rianne</h1>
          <p className='mt-1 text-[14px]' style={{ color: C.steel }}>
            Tuesday 24 October 2023 · Terminal Botlek Noord, Steiger 1–6
          </p>
        </div>
        <Synced time='06:15' from='6 of 7 companies up to date' />
      </div>

      <div className='mt-5 grid grid-cols-5 gap-3'>
        {kpis.map((k) => (
          <div key={k.label} className='rounded-[8px] px-4 py-3.5' style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
            <p className='text-[12.5px] leading-snug' style={{ color: C.steel }}>
              {k.label}
            </p>
            <p className='mt-1 text-[34px] font-semibold leading-none tabular-nums' style={{ color: k.tone }}>
              {k.value}
            </p>
            <p className='mt-2' style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>
              {k.note}
            </p>
          </div>
        ))}
      </div>

      <div className='mt-4 grid grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] gap-4'>
        <Card title='Inspections due in the next 30 days' aside={<span className='text-[13px] font-medium' style={{ color: C.navy3 }}>View all 17 →</span>} pad={false}>
          <table className='w-full text-[13.5px]'>
            <thead style={{ color: C.steel, background: C.concrete }}>
              <tr>
                <th className={`${th} pl-5`}>Asset</th>
                <th className={th}>Company</th>
                <th className={th}>Location</th>
                <th className={th}>Due</th>
                <th className={`${th} pr-5`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {due.map((a) => (
                <tr key={a.id} className='border-t' style={{ borderColor: C.line }}>
                  <td className='py-2.5 pl-5 pr-3'>
                    <Mono style={{ fontSize: 12, color: C.steel }}>{a.id}</Mono>
                    <span className='block font-semibold leading-snug'>{a.name}</span>
                  </td>
                  <td className='px-3' style={{ color: C.steel }}>
                    {a.company.replace('Ankerveld ', '')}
                  </td>
                  <td className='px-3' style={{ color: C.steel }}>
                    {a.location}
                  </td>
                  <td className='px-3'>
                    <Mono style={{ fontSize: 12.5 }}>{a.nextInspection}</Mono>
                  </td>
                  <td className='pr-5'>
                    <StatusBadge status={a.status} size='sm' label={a.days < 0 ? `${-a.days} d over` : `in ${a.days} d`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title='Open tickets by company' aside={<Mono style={{ fontSize: 11, color: C.steel }}>23 open</Mono>}>
          <ul className='space-y-3'>
            {companies.map((c) => (
              <li key={c.id}>
                <div className='flex items-center justify-between text-[13px]'>
                  <span className='font-medium'>{c.short}</span>
                  <span className='flex items-center gap-3'>
                    <Synced time={c.synced} stale={c.stale} />
                    <Mono style={{ fontSize: 13, fontWeight: 500, width: 16, textAlign: 'right' }}>{c.openTickets}</Mono>
                  </span>
                </div>
                <div className='mt-1.5 h-[7px] rounded-full' style={{ background: C.concrete }}>
                  <div className='h-full rounded-full' style={{ width: `${(c.openTickets / maxTickets) * 100}%`, background: c.stale ? C.amber : C.navy3 }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className='mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4'>
        <Card title='Latest from the service desks'>
          <ul>
            {tickets.slice(0, 3).map((tk) => (
              <li key={tk.id} className='flex items-center gap-3 border-t py-2.5 first:border-t-0 first:pt-0' style={{ borderColor: C.line }}>
                <Mono style={{ fontSize: 12, color: C.steel, width: 84 }}>{tk.id}</Mono>
                <span className='min-w-0 flex-1 truncate text-[13.5px] font-medium'>{tk.title}</span>
                <span className='rounded-[4px] px-2 py-0.5 text-[12px] font-semibold' style={{ background: tk.state === 'Waiting on you' ? C.dueBg : C.concrete, color: tk.state === 'Waiting on you' ? '#7A5A00' : C.navy }}>
                  {tk.state}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title='Certificates issued this month'>
          <ul>
            {certificates.slice(6, 9).map((c) => (
              <li key={c.id} className='flex items-center gap-3 border-t py-2.5 first:border-t-0 first:pt-0' style={{ borderColor: C.line }}>
                <Icon name='doc' size={17} style={{ color: C.steel }} />
                <Mono style={{ fontSize: 12, width: 86 }}>{c.id}</Mono>
                <span className='min-w-0 flex-1 truncate text-[13.5px]'>{c.asset}</span>
                <Icon name='download' size={17} style={{ color: C.navy3 }} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PortalShell>
  );
}

/* --------------------------------------------------------- certificates */

function CertificateDocument() {
  return (
    <div className='relative mx-auto h-[470px] w-[332px] overflow-hidden rounded-[2px] bg-white px-6 py-6 text-[9.5px] leading-snug' style={{ boxShadow: '0 1px 2px rgba(14,36,51,0.18), 0 18px 40px -18px rgba(14,36,51,0.35)', color: C.navy }}>
      <div className='flex items-start justify-between border-b pb-3' style={{ borderColor: C.navy }}>
        <div className='flex items-center gap-2'>
          <svg width='22' height='22' viewBox='0 0 32 32' aria-hidden='true'>
            <rect width='32' height='32' rx='3' fill={C.amber} />
            <path d='M16 5.5 25.5 26h-5.2l-1.6-3.8h-5.4L11.7 26H6.5L16 5.5Zm0 8.2-1.8 4.6h3.6L16 13.7Z' fill={C.navy} />
          </svg>
          <span>
            <span className='block text-[11px] font-semibold'>Ankerveld Keuring B.V.</span>
            <span className='block' style={{ color: C.steel }}>
              Theemsweg 210, 3197 KM Botlek
            </span>
          </span>
        </div>
        <Mono style={{ fontSize: 10, fontWeight: 500 }}>KC-22-4471</Mono>
      </div>
      <p className='mt-3 text-[13px] font-semibold leading-tight'>Keuringsrapport hijs- en hefmiddelen</p>
      <p style={{ color: C.steel }}>Inspection report, lifting equipment · Arbobesluit art. 7.29</p>
      <dl className='mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5'>
        {[
          ['Object', 'Harbour crane 64 t'],
          ['Asset ID', 'KR-0417'],
          ['Serial', 'AH-MHK-1408-22'],
          ['Location', 'Steiger 4, Botlek Noord'],
          ['Owner', 'Terminal Botlek Noord B.V.'],
          ['Inspected', '18 Nov 2022'],
          ['Valid until', '18 Nov 2023'],
          ['Load test', '70.4 t (110%)']
        ].map(([k, v]) => (
          <div key={k}>
            <dt style={{ color: C.steel }}>{k}</dt>
            <dd className='font-semibold'>{v}</dd>
          </div>
        ))}
      </dl>
      <div className='mt-3 border-t pt-2' style={{ borderColor: C.line }}>
        {[
          ['Structure and welds', 'Good'],
          ['Hoist ropes 1–4', 'Good, rope 2 note'],
          ['Brakes and limit switches', 'Good'],
          ['Load moment indicator', 'Calibrated'],
          ['Slewing ring', 'Good']
        ].map(([k, v]) => (
          <p key={k} className='flex justify-between border-b py-1' style={{ borderColor: C.concrete }}>
            <span>{k}</span>
            <span className='font-semibold'>{v}</span>
          </p>
        ))}
      </div>
      <div className='mt-3 flex items-end justify-between'>
        <div>
          <p className='text-[11px] font-semibold' style={{ color: C.green }}>
            Result: approved
          </p>
          <svg width='110' height='34' viewBox='0 0 110 34' fill='none' aria-hidden='true' className='mt-1'>
            <path d='M3 24c8-10 13-16 15-12s-6 14-2 12 10-15 14-13-2 12 2 11 8-9 12-8 1 7 5 6 9-6 14-6 7 3 12 2 9-3 12-4' stroke={C.navy} strokeWidth='1.3' strokeLinecap='round' />
          </svg>
          <p style={{ color: C.steel }}>H. Brinkman, inspector</p>
        </div>
        <div className='flex size-[68px] rotate-[-12deg] items-center justify-center rounded-full text-center text-[7.5px] font-semibold leading-tight' style={{ boxShadow: `inset 0 0 0 1.5px ${C.navy3}, inset 0 0 0 4px white, inset 0 0 0 5px ${C.navy3}`, color: C.navy3 }}>
          ANKERVELD
          <br />
          KEURING
          <br />
          GOEDGEKEURD
        </div>
      </div>
    </div>
  );
}

export function CertificatesPage({ width = 1280, height = 800 }: { width?: number; height?: number }) {
  const filters = ['All types', 'Lifting', 'Pressure', 'Scaffold', 'Rope access'];
  return (
    <PortalShell active='certificates' width={width} height={height}>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-[27px] font-semibold leading-tight'>Certificates</h1>
          <p className='mt-1 text-[14px]' style={{ color: C.steel }}>
            312 certificates across 7 companies · 3 expiring this month · 2 expired
          </p>
        </div>
        <div className='flex gap-2'>
          <span className='flex h-10 items-center gap-2 rounded-[6px] px-4 text-[14px] font-semibold' style={{ background: C.white, boxShadow: `inset 0 0 0 1.5px ${C.navy}` }}>
            Share with auditor
          </span>
          <span className='flex h-10 items-center gap-2 rounded-[6px] px-4 text-[14px] font-semibold' style={{ background: C.navy, color: C.white }}>
            <Icon name='download' size={17} />
            Export site vault (.zip)
          </span>
        </div>
      </div>
      <div className='mt-4 flex items-center gap-2'>
        {filters.map((f, i) => (
          <span key={f} className='rounded-full px-3.5 py-1.5 text-[13px] font-medium' style={{ background: i === 1 ? C.navy : C.white, color: i === 1 ? C.white : C.navy, boxShadow: i === 1 ? 'none' : `inset 0 0 0 1px ${C.line}` }}>
            {f}
          </span>
        ))}
        <span className='mx-2 h-5 w-px' style={{ background: C.line }} />
        {(['ok', 'due', 'overdue'] as AssetStatus[]).map((s) => (
          <StatusBadge key={s} status={s} size='sm' label={s === 'ok' ? 'Valid' : s === 'due' ? 'Expiring ≤ 30 d' : 'Expired'} />
        ))}
      </div>
      <div className='mt-4 grid grid-cols-[minmax(0,1fr)_380px] gap-4'>
        <Card pad={false}>
          <table className='w-full text-[13.5px]'>
            <thead style={{ color: C.steel, background: C.concrete }}>
              <tr>
                <th className={`${th} pl-5`}>Certificate</th>
                <th className={th}>Asset</th>
                <th className={th}>Type</th>
                <th className={th}>Valid until</th>
                <th className={`${th} pr-5`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) => {
                const selected = c.id === 'KC-22-4471';
                return (
                  <tr key={c.id} className='border-t' style={{ borderColor: C.line, background: selected ? '#EEF3F6' : undefined, boxShadow: selected ? `inset 4px 0 0 ${C.navy}` : undefined }}>
                    <td className='py-[9px] pl-5 pr-3'>
                      <Mono style={{ fontSize: 12.5, fontWeight: 500 }}>{c.id}</Mono>
                    </td>
                    <td className='px-3 font-medium'>{c.asset}</td>
                    <td className='px-3' style={{ color: C.steel }}>
                      {c.type}
                    </td>
                    <td className='px-3'>
                      <Mono style={{ fontSize: 12.5 }}>{c.valid}</Mono>
                    </td>
                    <td className='pr-5'>
                      <StatusBadge status={c.status} size='sm' label={c.status === 'ok' ? 'Valid' : c.status === 'due' ? 'Expiring' : 'Expired'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <div className='rounded-[8px] p-4' style={{ background: '#E4EAEE', boxShadow: `inset 0 0 0 1px ${C.line}` }}>
          <div className='mb-3 flex items-center justify-between'>
            <Mono style={{ fontSize: 12.5, fontWeight: 500 }}>KC-22-4471.pdf</Mono>
            <span className='flex items-center gap-1.5 text-[13px] font-semibold' style={{ color: C.navy3 }}>
              <Icon name='download' size={16} /> Download
            </span>
          </div>
          <CertificateDocument />
          <p className='mt-3 text-center'>
            <Synced time='06:15' from='Ankerveld Keuring' />
          </p>
        </div>
      </div>
    </PortalShell>
  );
}

/* --------------------------------------------------------------- asset */

function CraneDrawing() {
  const s = { stroke: C.navy, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <svg viewBox='0 0 420 300' className='h-full w-full' aria-hidden='true'>
      <rect width='420' height='300' fill='#E7EDF0' />
      {/* quay and water */}
      <rect x='0' y='246' width='420' height='54' fill={C.water} />
      {[262, 276, 290].map((y) => (
        <path key={y} d={`M10 ${y} h40 M80 ${y} h60 M170 ${y} h30 M230 ${y} h70 M330 ${y} h50`} stroke='#B7C8D2' strokeWidth='2' strokeLinecap='round' />
      ))}
      <rect x='0' y='232' width='300' height='16' fill='#C9D3D9' />
      <path d='M0 232h300v16' stroke={C.navy} strokeWidth='1.5' fill='none' />
      {/* undercarriage */}
      <path d='M70 232l18-34h96l18 34' {...s} />
      <path d='M88 198h96' {...s} />
      {[70, 108, 146, 184].map((x) => (
        <circle key={x} cx={x + 10} cy='226' r='6' {...s} />
      ))}
      {/* tower */}
      <rect x='112' y='86' width='48' height='112' {...s} />
      <path d='M112 110l48 24M160 110l-48 24M112 140l48 24M160 140l-48 24M112 170l48 24' stroke={C.navy} strokeWidth='1.2' />
      {/* cab */}
      <rect x='160' y='112' width='34' height='26' fill={C.amber} stroke={C.navy} strokeWidth='2' />
      <rect x='166' y='117' width='22' height='11' fill='#FFFFFF' stroke={C.navy} strokeWidth='1.2' />
      {/* machinery house */}
      <rect x='92' y='64' width='86' height='26' fill={C.amber} stroke={C.navy} strokeWidth='2' />
      <path d='M92 74h86' stroke={C.navy} strokeWidth='1.2' />
      {/* boom */}
      <path d='M150 72 L396 20' {...s} strokeWidth='3' />
      <path d='M160 86 L396 24' {...s} />
      {[180, 215, 250, 285, 320, 355].map((x, i) => (
        <path key={x} d={`M${x} ${72 - (x - 150) * 0.211} L${x + 17} ${86 - (x + 17 - 160) * 0.263 + (i % 2 ? 0 : 0)}`} stroke={C.navy} strokeWidth='1.1' />
      ))}
      {/* counter jib & ropes */}
      <path d='M92 70 L40 78 L40 96 L92 90' {...s} />
      <rect x='40' y='84' width='22' height='18' fill={C.steel} />
      <path d='M136 64 L136 30 L396 20 M136 30 L60 78' stroke={C.navy} strokeWidth='1.3' />
      {/* hook */}
      <path d='M380 24 V150' stroke={C.navy} strokeWidth='1.4' />
      <path d='M374 150h12v10h-12z' fill={C.navy} />
      <path d='M380 160v8a6 6 0 1 1-6 6' {...s} strokeWidth='2.4' />
      {/* labels */}
      <g style={{ fontFamily: mono, fontSize: 10 }} fill={C.navy}>
        <text x='206' y='60'>40 m</text>
        <path d='M150 50 L396 0' stroke={C.steel} strokeWidth='0.8' strokeDasharray='3 3' />
        <text x='300' y='140'>SWL 64 t @ 12 m</text>
        <text x='14' y='224'>KR-0417</text>
      </g>
    </svg>
  );
}

export function AssetPage({ width = 1280, height = 800 }: { width?: number; height?: number }) {
  const a = assets[0];
  return (
    <PortalShell active='assets' width={width} height={height}>
      <p className='text-[13px]' style={{ color: C.steel }}>
        Assets / Cranes / <Mono style={{ color: C.navy }}>KR-0417</Mono>
      </p>
      <div className='mt-2 flex items-start justify-between'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-[28px] font-semibold leading-tight'>{a.name}</h1>
            <StatusBadge status='due' size='lg' label='Inspection in 25 days' />
          </div>
          <p className='mt-1 text-[14px]' style={{ color: C.steel }}>
            <Mono>KR-0417</Mono> · {a.company} · {a.location}
          </p>
        </div>
        <Synced time='06:10' from='Ankerveld Hijstechniek' />
      </div>
      <div className='mt-5 grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-4'>
        <div className='space-y-4'>
          <div className='h-[300px] overflow-hidden rounded-[8px]' style={{ boxShadow: `inset 0 0 0 1px ${C.line}` }}>
            <CraneDrawing />
          </div>
          <Card title='Specifications'>
            <dl className='grid grid-cols-4 gap-3'>
              {[...a.specs, ['Rope set', '4 × 26 mm'], ['Operator', 'TBN shift crew'], ['Contract', 'AH-SLA-2021-14'], ['Hours', '18,240 h']].map(([k, v]) => (
                <div key={k}>
                  <dt className='text-[12px]' style={{ color: C.steel }}>
                    {k}
                  </dt>
                  <dd className='text-[14px] font-semibold leading-snug'>{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <Card title='Next inspection'>
              <p className='text-[24px] font-semibold leading-none'>18 Nov 2023</p>
              <p className='mt-2 text-[13px]' style={{ color: C.steel }}>
                Visit booked 16 Nov, 07:30
                <br />
                H. Brinkman, Ankerveld Keuring
              </p>
            </Card>
            <Card title='Certificate'>
              <Mono style={{ fontSize: 15, fontWeight: 500 }}>KC-22-4471</Mono>
              <p className='mt-1 text-[13px]' style={{ color: C.steel }}>
                Valid until 18 Nov 2023
              </p>
              <span className='mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold' style={{ color: C.navy3 }}>
                <Icon name='download' size={15} /> PDF, 412 kB
              </span>
            </Card>
          </div>
          <Card title='Open ticket' aside={<Mono style={{ fontSize: 11.5, color: C.steel }}>ST-23-1031</Mono>}>
            <p className='text-[14.5px] font-semibold'>Hoist rope wear above limit</p>
            <div className='mt-3 flex items-center'>
              {['Reported', 'Assessed', 'Parts shipped', 'Fitted', 'Closed'].map((s, i) => (
                <div key={s} className='flex flex-1 flex-col items-start'>
                  <div className='flex w-full items-center'>
                    <span className='size-3 shrink-0 rounded-full' style={{ background: i <= 2 ? C.navy : C.white, boxShadow: `inset 0 0 0 2px ${C.navy}` }} />
                    {i < 4 ? <span className='h-[2px] flex-1' style={{ background: i < 2 ? C.navy : C.line }} /> : null}
                  </div>
                  <span className='mt-1.5 text-[11.5px]' style={{ color: i === 2 ? C.navy : C.steel, fontWeight: i === 2 ? 600 : 400 }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
            <p className='mt-3 text-[13px]' style={{ color: C.steel }}>
              New rope ships 26 Oct with order SO-23-3290. Fitting planned 27 Oct, 06:00–10:00, crane out of use.
            </p>
          </Card>
          <Card title='History'>
            <ol>
              {a.history.map((h) => (
                <li key={h.title} className='flex gap-3 border-t py-2 first:border-t-0 first:pt-0' style={{ borderColor: C.line }}>
                  <Mono style={{ fontSize: 11.5, color: C.steel, width: 90, flexShrink: 0, paddingTop: 2 }}>{h.date}</Mono>
                  <span className='min-w-0'>
                    <span className='block text-[13.5px] font-semibold leading-snug'>{h.title}</span>
                    <span className='block text-[12.5px]' style={{ color: C.steel }}>
                      {h.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

/* -------------------------------------------------------------- orders */

export function OrdersPage({ width = 1280, height = 800 }: { width?: number; height?: number }) {
  return (
    <PortalShell active='orders' width={width} height={height}>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-[27px] font-semibold leading-tight'>Orders</h1>
          <p className='mt-1 text-[14px]' style={{ color: C.steel }}>
            Everything ordered from any Ankerveld company for Terminal Botlek Noord
          </p>
        </div>
        <div className='flex gap-3'>
          {[
            ['In progress', '9'],
            ['Open value', '€ 412,680'],
            ['Awaiting your approval', '1']
          ].map(([k, v]) => (
            <div key={k} className='rounded-[8px] px-4 py-2.5' style={{ background: k.startsWith('Awaiting') ? C.dueBg : C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
              <p className='text-[12px]' style={{ color: C.steel }}>
                {k}
              </p>
              <p className='text-[20px] font-semibold leading-tight tabular-nums'>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <Card pad={false} className='mt-5'>
        <table className='w-full text-[13.5px]'>
          <thead style={{ color: C.steel, background: C.concrete }}>
            <tr>
              <th className={`${th} pl-5`}>Order</th>
              <th className={th}>Company</th>
              <th className={`${th} w-[330px]`}>Progress</th>
              <th className={th}>Delivery</th>
              <th className={`${th} text-right`}>Value</th>
              <th className={`${th} pr-5`}>Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const idx = orderSteps.indexOf(o.step);
              const stale = o.synced.startsWith('Mon');
              return (
                <tr key={o.id} className='border-t' style={{ borderColor: C.line }}>
                  <td className='py-3 pl-5 pr-3'>
                    <Mono style={{ fontSize: 12, color: C.steel }}>{o.id}</Mono>
                    <span className='block font-semibold leading-snug'>{o.item}</span>
                  </td>
                  <td className='px-3' style={{ color: C.steel }}>
                    {o.company}
                  </td>
                  <td className='px-3'>
                    <div className='flex items-center'>
                      {orderSteps.map((s, i) => (
                        <div key={s} className='flex flex-1 items-center last:flex-none'>
                          <span
                            className='size-[11px] shrink-0 rounded-full'
                            style={{ background: i <= idx ? (o.step === 'Quoted' ? C.amber : C.navy) : C.white, boxShadow: `inset 0 0 0 2px ${i <= idx ? (o.step === 'Quoted' ? C.amber : C.navy) : C.line}` }}
                          />
                          {i < orderSteps.length - 1 ? <span className='h-[2px] flex-1' style={{ background: i < idx ? C.navy : C.line }} /> : null}
                        </div>
                      ))}
                    </div>
                    <span className='mt-1 block text-[12px] font-semibold' style={{ color: o.step === 'Quoted' ? '#7A5A00' : C.navy }}>
                      {o.step === 'Quoted' ? 'Quote waiting for your approval' : o.step}
                    </span>
                  </td>
                  <td className='px-3'>
                    <Mono style={{ fontSize: 12.5 }}>{o.eta}</Mono>
                  </td>
                  <td className='whitespace-nowrap px-3 text-right font-semibold tabular-nums'>{o.value}</td>
                  <td className='pr-5'>
                    <Synced time={o.synced} stale={stale} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </PortalShell>
  );
}

/* ----------------------------------------------------------- site map */

type MarkerState = AssetStatus | 'service';
const markerFill: Record<MarkerState, string> = { ok: C.green, due: C.amber, overdue: C.rust, service: '#3C7BB0' };

type FleetState = {
  markers: Record<string, MarkerState>;
  van: { x: number; y: number };
  feed: { id: string; text: string; time: string; tone: MarkerState }[];
  overdue: number;
  inService: number;
};

const baseFeed: FleetState['feed'] = [
  { id: 'ST-23-1031', text: 'Rope for KR-0417 shipped', time: '09:12', tone: 'due' },
  { id: 'SB-23-0420', text: 'Toe board missing, SC-4410', time: '08:55', tone: 'due' },
  { id: 'CO-23-0301', text: 'Coating survey tank 17 ready', time: '08:31', tone: 'ok' },
  { id: 'PS-23-0812', text: 'Seal kits delivered, store B', time: '07:58', tone: 'ok' }
];

const base: FleetState = {
  markers: { 'KR-0417': 'due', 'KR-0422': 'ok', 'TK-1180': 'overdue', 'TK-1184': 'ok', 'PM-2231': 'due', 'PM-2236': 'ok', 'HS-3307': 'overdue', 'SC-4410': 'ok', 'LV-5102': 'ok' },
  van: { x: 104, y: 120 },
  feed: baseFeed,
  overdue: 2,
  inService: 0
};

/** Eight states of a morning on site; the video loops through them. */
export const FLEET_STEPS: FleetState[] = (() => {
  const s0 = base;
  const s1: FleetState = { ...s0, van: { x: 250, y: 120 } };
  const s2: FleetState = {
    ...s1,
    van: { x: 386, y: 196 },
    markers: { ...s1.markers, 'TK-1180': 'service' },
    feed: [{ id: 'ST-23-1029', text: 'Technician on site, TK-1180', time: '09:44', tone: 'service' }, ...baseFeed],
    overdue: 1,
    inService: 1
  };
  const s3: FleetState = {
    ...s2,
    markers: { ...s2.markers, 'PM-2231': 'overdue' },
    feed: [{ id: 'ST-23-1042', text: 'Leak reported at PM-2231', time: '09:46', tone: 'overdue' }, ...s2.feed]
  };
  const s4: FleetState = {
    ...s3,
    markers: { ...s3.markers, 'TK-1180': 'ok' },
    feed: [{ id: 'KC-23-1190', text: 'TK-1180 passed, certificate issued', time: '09:49', tone: 'ok' }, ...s3.feed],
    overdue: 1,
    inService: 0
  };
  const s5: FleetState = { ...s4, van: { x: 386, y: 330 } };
  const s6: FleetState = {
    ...s5,
    van: { x: 300, y: 420 },
    markers: { ...s5.markers, 'PM-2231': 'service' },
    feed: [{ id: 'PS-23-0874', text: 'Pump technician at Steiger 2', time: '09:52', tone: 'service' }, ...s5.feed],
    inService: 1
  };
  const s7: FleetState = { ...s6, van: { x: 180, y: 300 } };
  return [s0, s1, s2, s3, s4, s5, s6, s7];
})();

const markerPos: Record<string, { x: number; y: number; label: 'l' | 'r' }> = {
  'KR-0417': { x: 560, y: 474, label: 'r' },
  'LV-5102': { x: 600, y: 440, label: 'r' },
  'KR-0422': { x: 104, y: 178, label: 'r' },
  'TK-1180': { x: 414, y: 214, label: 'r' },
  'TK-1184': { x: 520, y: 214, label: 'r' },
  'PM-2231': { x: 300, y: 474, label: 'l' },
  'PM-2236': { x: 700, y: 120, label: 'l' },
  'HS-3307': { x: 160, y: 236, label: 'r' },
  'SC-4410': { x: 660, y: 300, label: 'l' }
};

function SiteMap({ state, w = 820, h = 620 }: { state: FleetState; w?: number; h?: number }) {
  return (
    <svg viewBox='0 0 820 620' width={w} height={h} aria-hidden='true' style={{ display: 'block' }}>
      <rect width='820' height='620' fill='#EEF2F4' />
      {/* water: Botlek harbour */}
      <path d='M0 520 H820 V620 H0 Z' fill={C.water} />
      <path d='M0 520 C 200 512, 520 528, 820 516' stroke='#B7C8D2' strokeWidth='2' fill='none' />
      <text x='24' y='596' style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.12em' }} fill='#6F8796'>
        BOTLEKHAVEN
      </text>
      {/* jetties */}
      {[
        ['Steiger 1', 160],
        ['Steiger 2', 290],
        ['Steiger 3', 420],
        ['Steiger 4', 550],
        ['Steiger 5', 680]
      ].map(([label, x]) => (
        <g key={label as string}>
          <rect x={(x as number) - 14} y='470' width='28' height='118' fill='#C9D3D9' stroke='#9AAAB4' />
          <text x={(x as number) - 22} y='612' style={{ fontFamily: mono, fontSize: 10 }} fill='#6F8796'>
            {label}
          </text>
        </g>
      ))}
      {/* quay road */}
      <path d='M30 450 H790' stroke='#FFFFFF' strokeWidth='22' />
      <path d='M30 450 H790' stroke='#D7DEE3' strokeWidth='1' strokeDasharray='10 10' />
      {/* internal roads */}
      <path d='M104 120 H760 M250 120 V450 M386 120 V450 M610 120 V450' stroke='#FFFFFF' strokeWidth='16' fill='none' />
      {/* tank pits */}
      {[
        { x: 440, y: 260, label: 'Tank pit C' },
        { x: 640, y: 160, label: 'Tank pit D' }
      ].map((pit) => (
        <g key={pit.label}>
          <rect x={pit.x - 4} y={pit.y - 4} width='150' height='120' fill='none' stroke='#9AAAB4' strokeDasharray='4 4' />
          {[0, 1, 2].map((r) =>
            [0, 1].map((c) => <circle key={`${r}${c}`} cx={pit.x + 26 + r * 48} cy={pit.y + 28 + c * 56} r='21' fill='#FFFFFF' stroke='#9AAAB4' strokeWidth='1.5' />)
          )}
          <text x={pit.x} y={pit.y - 12} style={{ fontFamily: mono, fontSize: 10 }} fill='#6F8796'>
            {pit.label.toUpperCase()}
          </text>
        </g>
      ))}
      {/* buildings */}
      {[
        { x: 60, y: 150, w: 120, h: 60, label: 'Workshop hall' },
        { x: 140, y: 212, w: 70, h: 40, label: 'Tool store B' },
        { x: 396, y: 190, w: 34, h: 42, label: 'PH 2' },
        { x: 500, y: 190, w: 34, h: 42, label: 'PH 3' },
        { x: 700, y: 60, w: 80, h: 44, label: 'Firewater' },
        { x: 40, y: 40, w: 120, h: 52, label: 'Gate & office' }
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill='#DDE4E8' stroke='#9AAAB4' />
          <text x={b.x + 6} y={b.y + 14} style={{ fontFamily: mono, fontSize: 9.5 }} fill='#5B6E7C'>
            {b.label}
          </text>
        </g>
      ))}
      {/* markers */}
      {Object.entries(markerPos).map(([id, p]) => {
        const st = state.markers[id];
        const alert = st === 'overdue';
        return (
          <g key={id}>
            {alert ? <circle cx={p.x} cy={p.y} r='20' fill={markerFill[st]} opacity='0.18' /> : null}
            <circle cx={p.x} cy={p.y} r='11' fill={markerFill[st]} stroke='#FFFFFF' strokeWidth='3' style={{ transition: 'fill 500ms' }} />
            <g transform={`translate(${p.label === 'r' ? p.x + 16 : p.x - 16}, ${p.y + 4})`}>
              <text textAnchor={p.label === 'r' ? 'start' : 'end'} style={{ fontFamily: mono, fontSize: 11.5, fontWeight: 500 }} fill={C.navy} stroke='#EEF2F4' strokeWidth='4' paintOrder='stroke'>
                {id}
              </text>
            </g>
          </g>
        );
      })}
      {/* technician van */}
      <g style={{ transform: `translate(${state.van.x}px, ${state.van.y}px)`, transition: 'transform 1100ms cubic-bezier(0.45,0,0.2,1)' }}>
        <rect x='-17' y='-11' width='34' height='22' rx='4' fill={C.navy} />
        <rect x='5' y='-7' width='9' height='8' rx='1.5' fill={C.amber} />
        <text x='-12' y='4' style={{ fontFamily: mono, fontSize: 8.5, fontWeight: 600 }} fill='#FFFFFF'>
          V3
        </text>
      </g>
    </svg>
  );
}

const VISITS = [
  { from: 7.5, to: 9, label: 'KR-0422 check', who: 'V3' },
  { from: 9.6, to: 10.4, label: 'TK-1180', who: 'V3' },
  { from: 10.6, to: 12, label: 'PM-2231 seal', who: 'V3' },
  { from: 13, to: 14, label: 'HS-3307 pickup', who: 'Keuring' },
  { from: 14.5, to: 16.5, label: 'SC-4410 tag check', who: 'Steiger' }
];

function VisitStrip() {
  const start = 6;
  const end = 18;
  const pct = (h: number) => `${((h - start) / (end - start)) * 100}%`;
  return (
    <div className='rounded-[8px] px-4 pb-3 pt-3' style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
      <div className='flex items-center justify-between'>
        <h3 className='text-[14px] font-semibold'>Today on site</h3>
        <Mono style={{ fontSize: 11, color: C.steel }}>5 visits · 3 companies</Mono>
      </div>
      <div className='relative mt-3 h-[30px] rounded-[4px]' style={{ background: C.concrete }}>
        {VISITS.map((v) => (
          <span
            key={v.label}
            className='absolute top-[3px] flex h-[24px] items-center overflow-hidden whitespace-nowrap rounded-[3px] px-1.5 text-[10.5px] font-semibold'
            style={{ left: pct(v.from), width: `calc(${pct(v.to)} - ${pct(v.from)})`, background: v.who === 'V3' ? C.navy : C.navy3, color: C.white }}
          >
            {v.label}
          </span>
        ))}
        <span className='absolute -top-1 bottom-[-4px] w-[2px]' style={{ left: pct(9.7), background: C.amber }} />
      </div>
      <div className='mt-1.5 flex justify-between' style={{ fontFamily: mono, fontSize: 10.5, color: C.steel }}>
        {[6, 8, 10, 12, 14, 16, 18].map((h) => (
          <span key={h}>{String(h).padStart(2, '0')}:00</span>
        ))}
      </div>
    </div>
  );
}

export function FleetMapPage({ state = FLEET_STEPS[0], width = 1280, height = 800 }: { state?: FleetState; width?: number; height?: number }) {
  return (
    <PortalShell active='map' width={width} height={height}>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-[27px] font-semibold leading-tight'>Site map</h1>
          <p className='mt-1 text-[14px]' style={{ color: C.steel }}>
            Terminal Botlek Noord · 9 tracked assets · van V3 on site
          </p>
        </div>
        <div className='flex items-center gap-4 text-[13px]'>
          {(
            [
              ['ok', 'OK'],
              ['due', 'Due ≤ 30 d'],
              ['overdue', 'Overdue or fault'],
              ['service', 'Technician working']
            ] as [MarkerState, string][]
          ).map(([k, label]) => (
            <span key={k} className='flex items-center gap-2'>
              <span className='size-[10px] rounded-full' style={{ background: markerFill[k] }} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className='mt-4 grid grid-cols-[minmax(0,1fr)_300px] gap-4'>
        <div className='flex flex-col gap-3'>
          <div className='overflow-hidden rounded-[8px]' style={{ boxShadow: `inset 0 0 0 1px ${C.line}` }}>
            <SiteMap state={state} w={672} h={508} />
          </div>
          <VisitStrip />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='rounded-[8px] px-4 py-3' style={{ background: state.overdue ? C.rustBg : C.white, boxShadow: `inset 0 0 0 1px ${C.line}`, transition: 'background 500ms' }}>
              <p className='text-[12px]' style={{ color: C.steel }}>
                Overdue on site
              </p>
              <p className='text-[30px] font-semibold leading-none tabular-nums' style={{ color: C.rust }}>
                {state.overdue}
              </p>
            </div>
            <div className='rounded-[8px] px-4 py-3' style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
              <p className='text-[12px]' style={{ color: C.steel }}>
                Being worked on
              </p>
              <p className='text-[30px] font-semibold leading-none tabular-nums' style={{ color: '#3C7BB0' }}>
                {state.inService}
              </p>
            </div>
          </div>
          <div className='flex-1 overflow-hidden rounded-[8px]' style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
            <div className='flex items-center justify-between px-4 pb-2 pt-3.5'>
              <h3 className='text-[15px] font-semibold'>Live feed</h3>
              <span className='flex items-center gap-1.5' style={{ fontFamily: mono, fontSize: 11, color: C.green }}>
                <span className='size-[7px] rounded-full' style={{ background: C.green }} /> live
              </span>
            </div>
            <ul>
              {state.feed.slice(0, 6).map((f) => (
                <li key={f.id + f.time} className='flex gap-3 border-t px-4 py-2.5' style={{ borderColor: C.line, animation: 'ak-in 500ms ease-out' }}>
                  <span className='mt-[5px] size-[9px] shrink-0 rounded-full' style={{ background: markerFill[f.tone] }} />
                  <span className='min-w-0 flex-1'>
                    <span className='block text-[13.5px] font-medium leading-snug'>{f.text}</span>
                    <Mono style={{ fontSize: 11, color: C.steel }}>
                      {f.id} · {f.time}
                    </Mono>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{'@keyframes ak-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}'}</style>
    </PortalShell>
  );
}

/** The site map cycling through a morning, for the screen recording. */
export function AnimatedFleetMap({ width = 1280, height = 800 }: { width?: number; height?: number }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % FLEET_STEPS.length), 1250);
    return () => clearInterval(id);
  }, []);
  return <FleetMapPage state={FLEET_STEPS[step]} width={width} height={height} />;
}
