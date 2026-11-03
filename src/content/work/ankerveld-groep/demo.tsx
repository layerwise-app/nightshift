import { useEffect, useMemo, useRef, useState } from 'react';
import { PhoneStatusBar } from '~/components/frames/frames';
import { assets as baseAssets, type Asset, type AssetStatus, type TimelineEntry } from './data';
import { C, Icon, Mono, StatusBadge, Synced, Wordmark, focusRing, font, mono, statusMeta } from './ui';

type Lang = 'en' | 'nl' | 'de';
type Filter = 'all' | AssetStatus;
type IssueType = 'damage' | 'notWorking' | 'leak' | 'check';

const T = {
  en: {
    site: 'Terminal Botlek Noord',
    underContract: 'assets under contract',
    all: 'All',
    due: 'Due ≤ 30 days',
    overdue: 'Overdue',
    ok: 'OK',
    inDays: (d: number) => `in ${d} d`,
    overDays: (d: number) => `${d} d over`,
    certificate: 'Certificate',
    validUntil: 'Valid until',
    inspector: 'Inspector',
    download: 'Download certificate',
    downloaded: (id: string) => `${id}.pdf saved to Files`,
    specs: 'Specifications',
    location: 'Location',
    history: 'History',
    report: 'Report an issue',
    back: 'Assets',
    whatsWrong: 'What’s wrong?',
    damage: 'Damage',
    notWorking: 'Not working',
    leak: 'Leak',
    check: 'Needs a check',
    canUse: 'Can it still be used?',
    keep: 'Keep using',
    stop: 'Stop using',
    note: 'Note (optional)',
    send: (c: string) => `Send to ${c.replace('Ankerveld ', '')}`,
    cancel: 'Cancel',
    ticketCreated: (id: string) => `Ticket ${id} created`,
    bannerOverdue: 'Inspection overdue. Do not lift.',
    bannerDue: (d: number, date: string) => `Inspection due in ${d} days, ${date}`,
    bannerOk: (date: string) => `Certified until ${date}`,
    outOfUse: (t: string) => `Out of use since ${t}. Ticket sent.`,
    showing: (n: number) => `Showing ${n} assets`,
    issueReported: 'Issue reported',
    reportedBy: 'R. Kloosterman',
    language: 'Language'
  },
  nl: {
    site: 'Terminal Botlek Noord',
    underContract: 'objecten onder contract',
    all: 'Alles',
    due: 'Binnen 30 dagen',
    overdue: 'Verlopen',
    ok: 'In orde',
    inDays: (d: number) => `over ${d} d`,
    overDays: (d: number) => `${d} d te laat`,
    certificate: 'Certificaat',
    validUntil: 'Geldig tot',
    inspector: 'Keurmeester',
    download: 'Certificaat downloaden',
    downloaded: (id: string) => `${id}.pdf opgeslagen in Bestanden`,
    specs: 'Specificaties',
    location: 'Locatie',
    history: 'Historie',
    report: 'Probleem melden',
    back: 'Objecten',
    whatsWrong: 'Wat is er aan de hand?',
    damage: 'Schade',
    notWorking: 'Werkt niet',
    leak: 'Lekkage',
    check: 'Moet gekeurd',
    canUse: 'Kan het nog gebruikt worden?',
    keep: 'Blijft in gebruik',
    stop: 'Buiten gebruik',
    note: 'Opmerking (optioneel)',
    send: (c: string) => `Naar ${c.replace('Ankerveld ', '')}`,
    cancel: 'Annuleren',
    ticketCreated: (id: string) => `Melding ${id} aangemaakt`,
    bannerOverdue: 'Keuring verlopen. Niet hijsen.',
    bannerDue: (d: number, date: string) => `Keuring over ${d} dagen, ${date}`,
    bannerOk: (date: string) => `Gekeurd tot ${date}`,
    outOfUse: (t: string) => `Buiten gebruik sinds ${t}. Melding verstuurd.`,
    showing: (n: number) => `${n} objecten`,
    issueReported: 'Probleem gemeld',
    reportedBy: 'R. Kloosterman',
    language: 'Taal'
  },
  de: {
    site: 'Terminal Botlek Noord',
    underContract: 'Objekte unter Vertrag',
    all: 'Alle',
    due: 'In 30 Tagen',
    overdue: 'Überfällig',
    ok: 'In Ordnung',
    inDays: (d: number) => `in ${d} T`,
    overDays: (d: number) => `${d} T über`,
    certificate: 'Zertifikat',
    validUntil: 'Gültig bis',
    inspector: 'Prüfer',
    download: 'Zertifikat herunterladen',
    downloaded: (id: string) => `${id}.pdf in Dateien gespeichert`,
    specs: 'Technische Daten',
    location: 'Standort',
    history: 'Verlauf',
    report: 'Problem melden',
    back: 'Objekte',
    whatsWrong: 'Was ist das Problem?',
    damage: 'Schaden',
    notWorking: 'Ausgefallen',
    leak: 'Leckage',
    check: 'Prüfung nötig',
    canUse: 'Weiter benutzbar?',
    keep: 'Weiter benutzen',
    stop: 'Außer Betrieb',
    note: 'Notiz (optional)',
    send: (c: string) => `An ${c.replace('Ankerveld ', '')}`,
    cancel: 'Abbrechen',
    ticketCreated: (id: string) => `Meldung ${id} erstellt`,
    bannerOverdue: 'Prüfung überfällig. Nicht heben.',
    bannerDue: (d: number, date: string) => `Prüfung in ${d} Tagen, ${date}`,
    bannerOk: (date: string) => `Geprüft bis ${date}`,
    outOfUse: (t: string) => `Außer Betrieb seit ${t}. Meldung gesendet.`,
    showing: (n: number) => `${n} Objekte`,
    issueReported: 'Problem gemeldet',
    reportedBy: 'R. Kloosterman',
    language: 'Sprache'
  }
} as const;

const LANGS: Lang[] = ['en', 'nl', 'de'];
const ISSUE_TYPES: IssueType[] = ['damage', 'notWorking', 'leak', 'check'];
const REPORT_TIMES = ['09:42', '09:47', '09:53', '10:01', '10:06', '10:12'];

type AssetState = Asset & { outOfUse?: string };

export type SupervisorAppProps = {
  initialAssetId?: string;
  initialFilter?: Filter;
  initialReport?: { type: IssueType; stop: boolean };
  initialLang?: Lang;
};

/**
 * Ankerveld Werkplaats on a site supervisor's rugged phone: every asset under
 * contract at one terminal, its inspection status and certificate, and a
 * glove-sized way to report a problem.
 */
export function SupervisorApp({ initialAssetId, initialFilter = 'all', initialReport, initialLang = 'en' }: SupervisorAppProps) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [items, setItems] = useState<AssetState[]>(() => baseAssets.map((a) => ({ ...a, history: [...a.history] })));
  const [openId, setOpenId] = useState<string | undefined>(initialAssetId);
  const [reporting, setReporting] = useState(Boolean(initialReport));
  const [announce, setAnnounce] = useState('');
  const [ticketNo, setTicketNo] = useState(1042);
  const t = T[lang];

  const counts = useMemo(
    () => ({
      all: items.length,
      due: items.filter((a) => a.status === 'due').length,
      overdue: items.filter((a) => a.status === 'overdue').length,
      ok: items.filter((a) => a.status === 'ok').length
    }),
    [items]
  );
  const visible = filter === 'all' ? items : items.filter((a) => a.status === filter);
  const open = items.find((a) => a.id === openId);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const lastRowRef = useRef<string | undefined>(undefined);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollerRef.current?.scrollTo({ top: 0 });
    if (openId) backRef.current?.focus();
    else if (lastRowRef.current) {
      document.getElementById(`ak-row-${lastRowRef.current}`)?.focus();
    }
  }, [openId]);

  const chooseFilter = (next: Filter) => {
    setFilter(next);
    const n = next === 'all' ? counts.all : counts[next];
    setAnnounce(T[lang].showing(n));
  };

  const submitReport = (type: IssueType, stop: boolean, note: string) => {
    if (!open) return;
    const id = `ST-23-${ticketNo}`;
    const time = REPORT_TIMES[(ticketNo - 1042) % REPORT_TIMES.length];
    const entry: TimelineEntry = {
      date: `24 Oct, ${time}`,
      title: `${t.issueReported}: ${t[type]}`,
      detail: `${stop ? t.stop : t.keep} · ${id} → ${open.company}${note ? ` · “${note}”` : ''}`,
      kind: 'issue'
    };
    setItems((prev) =>
      prev.map((a) => (a.id === open.id ? { ...a, history: [entry, ...a.history], outOfUse: stop ? time : a.outOfUse } : a))
    );
    setTicketNo((n) => n + 1);
    setReporting(false);
    setAnnounce(t.ticketCreated(id));
  };

  return (
    <div className='relative flex h-full w-full flex-col overflow-hidden' style={{ ...font, background: C.concrete }}>
      <div style={{ background: C.navy }}>
        <PhoneStatusBar tone='light' time='09:41' />
        <div className='flex items-center justify-between px-4 pb-3 pt-1'>
          <Wordmark tone='dark' size={15} />
          <button
            type='button'
            onClick={() => setLang(LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length])}
            aria-label={`${t.language}: ${lang.toUpperCase()}. Switch language`}
            className={`flex h-11 items-center gap-2 rounded-[6px] px-3 ${focusRing}`}
            style={{ background: C.navy2, color: C.white }}
          >
            <Icon name='globe' size={18} />
            <span className='flex gap-1' style={{ fontFamily: mono, fontSize: 13 }}>
              {LANGS.map((l) => (
                <span key={l} style={{ color: l === lang ? C.amber : '#7F96A8', fontWeight: l === lang ? 600 : 400 }}>
                  {l.toUpperCase()}
                </span>
              ))}
            </span>
          </button>
        </div>
        {!open ? (
          <div className='px-4 pb-4'>
            <p className='text-[21px] font-semibold leading-tight' style={{ color: C.white }}>
              {t.site}
            </p>
            <p className='mt-1 flex items-center justify-between text-[13px]' style={{ color: '#B9C8D3' }}>
              <span>
                {counts.all} {t.underContract}
              </span>
              <Synced time='06:10' tone='dark' />
            </p>
          </div>
        ) : null}
      </div>

      <div ref={scrollerRef} className='min-h-0 flex-1 overflow-y-auto overscroll-contain'>
        {!open ? (
          <div className='px-4 pb-8 pt-4'>
            <fieldset>
              <legend className='sr-only'>Filter assets</legend>
              <div className='grid grid-cols-2 gap-2'>
              {(['all', 'due', 'overdue', 'ok'] as Filter[]).map((f) => {
                const active = filter === f;
                const tone = f === 'all' ? C.navy : statusMeta[f as AssetStatus].dot;
                return (
                  <button
                    key={f}
                    type='button'
                    aria-pressed={active}
                    onClick={() => chooseFilter(f)}
                    className={`flex min-h-[62px] items-center justify-between rounded-[8px] px-3.5 text-left ${focusRing}`}
                    style={{
                      background: active ? C.navy : C.white,
                      color: active ? C.white : C.navy,
                      boxShadow: active ? 'none' : `inset 0 0 0 1.5px ${C.line}`
                    }}
                  >
                    <span className='flex items-center gap-2 text-[15px] font-medium leading-tight'>
                      <span className='inline-block size-[10px] shrink-0 rounded-full' style={{ background: active && f === 'all' ? C.amber : tone }} />
                      {t[f]}
                    </span>
                    <span className='text-[24px] font-semibold tabular-nums' style={{ fontFamily: mono }}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
              </div>
            </fieldset>

            <ul className='mt-4 space-y-2'>
              {visible.map((a) => {
                const m = statusMeta[a.status];
                return (
                  <li key={a.id}>
                    <button
                      id={`ak-row-${a.id}`}
                      type='button'
                      onClick={() => {
                        lastRowRef.current = a.id;
                        setOpenId(a.id);
                      }}
                      className={`relative flex min-h-[78px] w-full items-center gap-3 overflow-hidden rounded-[8px] py-3 pl-5 pr-3 text-left ${focusRing}`}
                      style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}
                    >
                      <span className='absolute inset-y-0 left-0 w-[6px]' style={{ background: m.dot }} />
                      <span className='min-w-0 flex-1'>
                        <Mono style={{ fontSize: 13, fontWeight: 500, color: C.steel }}>{a.id}</Mono>
                        <span className='mt-0.5 block truncate text-[16.5px] font-semibold leading-snug'>{a.name}</span>
                        <span className='mt-0.5 block truncate text-[13px]' style={{ color: C.steel }}>
                          {a.outOfUse ? <span style={{ color: C.rust, fontWeight: 600 }}>{t.stop} · </span> : null}
                          {a.location}
                        </span>
                      </span>
                      <span className='shrink-0 text-right'>
                        <span className='block text-[13px] font-semibold' style={{ color: m.fg }}>
                          {a.days < 0 ? t.overDays(-a.days) : t.inDays(a.days)}
                        </span>
                        <Mono style={{ fontSize: 12, color: C.steel }}>{a.nextInspection}</Mono>
                      </span>
                      <Icon name='chevron' size={20} style={{ color: C.steel, flexShrink: 0 }} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <AssetDetail
            asset={open}
            t={t}
            backRef={backRef}
            onBack={() => setOpenId(undefined)}
            onReport={() => setReporting(true)}
            onAnnounce={setAnnounce}
          />
        )}
      </div>

      {open && reporting ? (
        <ReportSheet
          asset={open}
          t={t}
          initial={initialReport}
          onCancel={() => setReporting(false)}
          onSubmit={submitReport}
        />
      ) : null}

      <p className='sr-only' aria-live='polite'>
        {announce}
      </p>
      {announce && !reporting ? <Toast key={announce} text={announce} onDone={() => setAnnounce('')} /> : null}
    </div>
  );
}

function Toast({ text, onDone }: { text: string; onDone: () => void }) {
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    const id = setTimeout(() => done.current(), 2600);
    return () => clearTimeout(id);
  }, []);
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-x-4 bottom-6 flex items-center gap-2 rounded-[8px] px-4 py-3 text-[14.5px] font-medium shadow-[0_12px_30px_-8px_rgba(14,36,51,0.5)]'
      style={{ background: C.navy, color: C.white }}
    >
      <Icon name='check' size={18} style={{ color: C.amber }} />
      {text}
    </div>
  );
}

type Dict = (typeof T)[Lang];

function AssetDetail({
  asset,
  t,
  backRef,
  onBack,
  onReport,
  onAnnounce
}: {
  asset: AssetState;
  t: Dict;
  backRef: React.RefObject<HTMLButtonElement | null>;
  onBack: () => void;
  onReport: () => void;
  onAnnounce: (text: string) => void;
}) {
  const [downloaded, setDownloaded] = useState(false);
  const banner = asset.outOfUse
    ? { text: t.outOfUse(asset.outOfUse), bg: C.rust, fg: C.white }
    : asset.status === 'overdue'
      ? { text: t.bannerOverdue, bg: C.rust, fg: C.white }
      : asset.status === 'due'
        ? { text: t.bannerDue(asset.days, asset.nextInspection), bg: C.amber, fg: C.amberInk }
        : { text: t.bannerOk(asset.nextInspection), bg: C.green, fg: C.white };

  return (
    <div className='pb-8'>
      <div className='px-4 pt-3' style={{ background: C.navy }}>
        <button
          ref={backRef}
          type='button'
          onClick={onBack}
          className={`-ml-2 flex h-12 items-center gap-1 rounded-[6px] pl-1 pr-3 text-[16px] font-medium ${focusRing}`}
          style={{ color: C.white }}
        >
          <Icon name='back' size={22} />
          {t.back}
        </button>
        <div className='pb-5 pt-1'>
          <Mono style={{ fontSize: 14, color: '#9FB3C2', fontWeight: 500 }}>{asset.id}</Mono>
          <h2 className='mt-1 text-[25px] font-semibold leading-[1.1]' style={{ color: C.white }}>
            {asset.name}
          </h2>
          <p className='mt-1.5 text-[13.5px]' style={{ color: '#B9C8D3' }}>
            {asset.company} · {asset.location}
          </p>
        </div>
      </div>
      <div className='flex items-start gap-3 px-4 py-3.5' style={{ background: banner.bg, color: banner.fg }}>
        <Icon name={asset.status === 'ok' && !asset.outOfUse ? 'check' : 'alert'} size={22} stroke={2.2} style={{ flexShrink: 0, marginTop: 1 }} />
        <p className='text-[16px] font-semibold leading-snug'>{banner.text}</p>
      </div>

      <div className='space-y-3 px-4 pt-4'>
        <section className='rounded-[8px] p-4' style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
          <div className='flex items-center justify-between'>
            <h3 className='text-[13px] font-semibold uppercase tracking-[0.06em]' style={{ color: C.steel }}>
              {t.certificate}
            </h3>
            <StatusBadge status={asset.status} size='sm' label={asset.status === 'ok' ? t.ok : asset.status === 'due' ? t.due : t.overdue} />
          </div>
          <Mono className='mt-2 block' style={{ fontSize: 18, fontWeight: 500 }}>
            {asset.certificate.id}
          </Mono>
          <dl className='mt-2 grid grid-cols-2 gap-2 text-[13.5px]'>
            <div>
              <dt style={{ color: C.steel }}>{t.validUntil}</dt>
              <dd className='font-semibold'>{asset.certificate.validUntil}</dd>
            </div>
            <div>
              <dt style={{ color: C.steel }}>{t.inspector}</dt>
              <dd className='font-semibold'>{asset.certificate.inspector}</dd>
            </div>
          </dl>
          <button
            type='button'
            onClick={() => {
              setDownloaded(true);
              onAnnounce(t.downloaded(asset.certificate.id));
            }}
            className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15.5px] font-semibold ${focusRing}`}
            style={{ background: downloaded ? C.greenBg : C.concrete, color: downloaded ? C.green : C.navy, boxShadow: `inset 0 0 0 1.5px ${downloaded ? C.green : C.navy}` }}
          >
            <Icon name={downloaded ? 'check' : 'download'} size={19} stroke={2} />
            {downloaded ? `${asset.certificate.id}.pdf` : t.download}
          </button>
        </section>

        <button
          type='button'
          onClick={onReport}
          className={`flex h-[60px] w-full items-center justify-center gap-2.5 rounded-[8px] text-[17px] font-semibold ${focusRing}`}
          style={{ background: C.amber, color: C.amberInk }}
        >
          <Icon name='alert' size={22} stroke={2.2} />
          {t.report}
        </button>

        <section className='rounded-[8px] p-4' style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
          <h3 className='text-[13px] font-semibold uppercase tracking-[0.06em]' style={{ color: C.steel }}>
            {t.specs}
          </h3>
          <dl className='mt-2 grid grid-cols-2 gap-x-3 gap-y-2.5'>
            {asset.specs.map(([k, v]) => (
              <div key={k}>
                <dt className='text-[12.5px]' style={{ color: C.steel }}>
                  {k}
                </dt>
                <dd className='text-[14.5px] font-semibold leading-snug'>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className='rounded-[8px] p-4' style={{ background: C.white, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
          <div className='flex items-center justify-between'>
            <h3 className='text-[13px] font-semibold uppercase tracking-[0.06em]' style={{ color: C.steel }}>
              {t.history}
            </h3>
          </div>
          <ol className='mt-3'>
            {asset.history.map((h, i) => (
              <li key={`${h.date}-${h.title}`} className='relative flex gap-3 pb-4 last:pb-0'>
                {i < asset.history.length - 1 ? (
                  <span className='absolute bottom-0 left-[9px] top-[22px] w-px' style={{ background: C.line }} />
                ) : null}
                <span
                  className='relative mt-[3px] flex size-[19px] shrink-0 items-center justify-center rounded-full'
                  style={{
                    background: h.kind === 'issue' ? C.rust : h.kind === 'sync' ? C.concrete : C.navy,
                    boxShadow: h.kind === 'sync' ? `inset 0 0 0 1.5px ${C.steel}` : 'none'
                  }}
                >
                  {h.kind === 'issue' ? <span className='size-[5px] rounded-full bg-white' /> : null}
                </span>
                <span className='min-w-0'>
                  <Mono style={{ fontSize: 11.5, color: C.steel }}>{h.date}</Mono>
                  <span className='block text-[14.5px] font-semibold leading-snug'>{h.title}</span>
                  <span className='block text-[13px] leading-snug' style={{ color: C.steel }}>
                    {h.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>
        <p className='px-1'>
          <Synced time={asset.history.find((h) => h.kind === 'sync')?.date.split(', ')[1] ?? '06:10'} from={asset.company} />
        </p>
      </div>
    </div>
  );
}

function ReportSheet({
  asset,
  t,
  initial,
  onCancel,
  onSubmit
}: {
  asset: AssetState;
  t: Dict;
  initial?: { type: IssueType; stop: boolean };
  onCancel: () => void;
  onSubmit: (type: IssueType, stop: boolean, note: string) => void;
}) {
  const [type, setType] = useState<IssueType | undefined>(initial?.type);
  const [stop, setStop] = useState(initial?.stop ?? false);
  const [note, setNote] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className='absolute inset-0 z-20 flex flex-col justify-end' style={{ background: 'rgba(14,36,51,0.55)' }}>
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='ak-report-title'
        className='rounded-t-[16px] px-4 pb-7 pt-3'
        style={{ background: C.concrete }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel();
        }}
      >
        <span className='mx-auto mb-3 block h-[5px] w-10 rounded-full' style={{ background: C.line }} />
        <h2 id='ak-report-title' ref={headingRef} tabIndex={-1} className='text-[21px] font-semibold leading-tight outline-none'>
          {t.report}
        </h2>
        <p className='mt-0.5 text-[13.5px]' style={{ color: C.steel }}>
          <Mono style={{ fontWeight: 500 }}>{asset.id}</Mono> · {asset.name}
        </p>

        <fieldset className='mt-4'>
          <legend className='text-[14px] font-semibold'>{t.whatsWrong}</legend>
          <div className='mt-2 grid grid-cols-2 gap-2'>
            {ISSUE_TYPES.map((k) => {
              const checked = type === k;
              return (
                <label
                  key={k}
                  className='relative flex h-[58px] cursor-pointer items-center gap-2 rounded-[8px] px-3.5 text-[16px] font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#F2B705]'
                  style={{
                    background: checked ? C.navy : C.white,
                    color: checked ? C.white : C.navy,
                    boxShadow: checked ? 'none' : `inset 0 0 0 1.5px ${C.line}`
                  }}
                >
                  <input type='radio' name='ak-issue' value={k} checked={checked} onChange={() => setType(k)} className='sr-only' />
                  <span
                    aria-hidden='true'
                    className='flex size-[20px] shrink-0 items-center justify-center rounded-full'
                    style={{ boxShadow: `inset 0 0 0 2px ${checked ? C.amber : C.steel}` }}
                  >
                    {checked ? <span className='size-[10px] rounded-full' style={{ background: C.amber }} /> : null}
                  </span>
                  {t[k]}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className='mt-4'>
          <legend className='text-[14px] font-semibold'>{t.canUse}</legend>
          <div className='mt-2 grid grid-cols-2 gap-2'>
            {[false, true].map((s) => {
              const checked = stop === s;
              return (
                <label
                  key={String(s)}
                  className='relative flex h-[58px] cursor-pointer items-center justify-center rounded-[8px] px-3 text-[16px] font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#F2B705]'
                  style={{
                    background: checked ? (s ? C.rust : C.green) : C.white,
                    color: checked ? C.white : C.navy,
                    boxShadow: checked ? 'none' : `inset 0 0 0 1.5px ${C.line}`
                  }}
                >
                  <input type='radio' name='ak-use' checked={checked} onChange={() => setStop(s)} className='sr-only' />
                  {s ? t.stop : t.keep}
                </label>
              );
            })}
          </div>
        </fieldset>

        <label htmlFor='ak-note' className='mt-4 block text-[14px] font-semibold'>
          {t.note}
        </label>
        <input
          id='ak-note'
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 80))}
          className={`mt-2 h-12 w-full rounded-[8px] px-3.5 text-[16px] ${focusRing}`}
          style={{ background: C.white, boxShadow: `inset 0 0 0 1.5px ${C.line}`, color: C.navy }}
        />

        <div className='mt-5 grid grid-cols-[1fr_2fr] gap-2'>
          <button
            type='button'
            onClick={onCancel}
            className={`h-[58px] rounded-[8px] text-[16px] font-semibold ${focusRing}`}
            style={{ background: C.white, color: C.navy, boxShadow: `inset 0 0 0 1.5px ${C.line}` }}
          >
            {t.cancel}
          </button>
          <button
            type='button'
            disabled={!type}
            onClick={() => type && onSubmit(type, stop, note.trim())}
            className={`h-[58px] rounded-[8px] text-[16px] font-semibold disabled:opacity-45 ${focusRing}`}
            style={{ background: C.amber, color: C.amberInk }}
          >
            {t.send(asset.company)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AnkerveldDemo() {
  return <SupervisorApp />;
}
