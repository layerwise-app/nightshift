import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useAsk } from '~/components/site/AskPanel';
import { SectionTitle } from '~/components/site/SectionTitle';
import {
  CONTACT_LIMITS,
  cleanContactInput,
  validateContact,
  type ContactErrors,
  type ContactField
} from '~/lib/contact';
import { sendContactMessage } from '~/lib/contact.functions';
import { quarterOf } from '~/lib/time';
import { cn } from '~/lib/utils';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: `Contact — ${portfolio.name}`,
      description: `Start a project with ${portfolio.name}. Tell us what you are making; we reply within one working day.`,
      path: '/contact'
    }),
  component: Contact
});

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string };

function Field({
  id,
  label,
  error,
  hint,
  children
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='border-b border-line py-5'>
      <div className='flex items-baseline justify-between gap-4'>
        <label htmlFor={id} className='label text-ink-2'>
          {label}
        </label>
        {hint ? <span className='label text-ink-3'>{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className='mt-2 text-[14px] text-[#ff8a7a]'>
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  'mt-2 block w-full bg-transparent text-[20px] leading-snug text-ink outline-none placeholder:text-ink-3 md:text-[22px] [&:focus-visible]:outline-none';

function Contact() {
  const send = useServerFn(sendContactMessage);
  const { openAsk } = useAsk();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
    website: `${uid}-website`
  };
  const { availability, location } = portfolio;
  const quarter = quarterOf(new Date(), location.timeZone);

  // Once the thank-you note has replaced the (taller) form, move focus to it
  // and bring it into view.
  useEffect(() => {
    if (status.kind !== 'sent') return;
    const box = statusRef.current;
    if (!box) return;
    box.focus({ preventScroll: true });
    const header = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
    if (box.getBoundingClientRect().top < header) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      box.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
    }
  }, [status.kind]);

  const focusFirstError = (next: ContactErrors) => {
    const first = (['name', 'email', 'message'] as ContactField[]).find((f) => next[f]);
    if (first) document.getElementById(ids[first])?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const input = cleanContactInput(Object.fromEntries(form));
    const local = validateContact(input);
    setErrors(local);
    if (Object.keys(local).length > 0) {
      focusFirstError(local);
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      const result = await send({ data: input });
      if (result.ok) {
        setStatus({ kind: 'sent' });
        formRef.current?.reset();
        setMessageLength(0);
      } else if (result.reason === 'invalid') {
        setErrors(result.errors);
        setStatus({ kind: 'idle' });
        focusFirstError(result.errors);
      } else if (result.reason === 'rate_limited') {
        setStatus({
          kind: 'error',
          message: `That is a lot of messages in a short time. Try again in ${result.retryAfterMinutes} minutes, or reach us through one of the links on this page.`
        });
      } else {
        setStatus({ kind: 'error', message: 'Something went wrong on our side and the message was not saved. Please try again in a minute.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'The message could not be sent. Check your connection and try again.' });
    }
  };

  const describedBy = (field: ContactField) => (errors[field] ? `${ids[field]}-error` : undefined);

  return (
    <section aria-labelledby='contact-title' className='frame'>
      <div className='frame-pad pb-12 pt-14 md:pb-16 md:pt-20'>
        <SectionTitle as='h1' id='contact-title' label={`We reply within one working day · ${location.city}`}>
          contact
        </SectionTitle>
        <p className='mt-10 max-w-[26ch] font-display text-[clamp(30px,3.8vw,58px)] leading-[0.98] tracking-[-0.04em]'>
          Tell us what you are making and when it has to be live.
        </p>
      </div>

      <div className='grid border-t border-line lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'>
        <div className='frame-pad border-b border-line pb-12 pt-4 lg:border-b-0 lg:border-r lg:pb-16'>
          {status.kind === 'sent' ? (
            <div
              ref={statusRef}
              tabIndex={-1}
              role='status'
              className='scroll-mt-[var(--header-h)] py-14 outline-none'
            >
              <p className='label label-bracket text-signal'>Message saved</p>
              <p className='mt-5 max-w-[22ch] font-display text-[clamp(32px,3.4vw,52px)] leading-[0.98] tracking-[-0.04em]'>
                Thank you. It is on the table now.
              </p>
              <p className='mt-5 max-w-[48ch] text-[17px] leading-relaxed text-ink-2'>
                One of the crew will reply within one working day, usually the person who would work on your project.
              </p>
              <button type='button' onClick={() => setStatus({ kind: 'idle' })} className='btn btn-line mt-8'>
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-privacy`}>
              <Field id={ids.name} label='Your name' error={errors.name}>
                <input
                  id={ids.name}
                  name='name'
                  autoComplete='name'
                  required
                  maxLength={CONTACT_LIMITS.name.max}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy('name')}
                  className={inputClass}
                  placeholder='Marieke Okkerse'
                />
              </Field>
              <Field id={ids.email} label='Email' error={errors.email}>
                <input
                  id={ids.email}
                  name='email'
                  type='email'
                  autoComplete='email'
                  inputMode='email'
                  required
                  maxLength={CONTACT_LIMITS.email.max}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy('email')}
                  className={inputClass}
                  placeholder='you@company.nl'
                />
              </Field>
              <Field
                id={ids.message}
                label='The project'
                error={errors.message}
                hint={`${messageLength} / ${CONTACT_LIMITS.message.max}`}
              >
                <textarea
                  id={ids.message}
                  name='message'
                  required
                  rows={6}
                  maxLength={CONTACT_LIMITS.message.max}
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={describedBy('message')}
                  className={cn(inputClass, 'resize-y text-[18px] md:text-[19px]')}
                  placeholder='What it is, who it is for, the date it has to be live, and a budget range if you have one.'
                />
              </Field>

              {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
              <div aria-hidden='true' className='absolute -left-[9999px] h-px w-px overflow-hidden'>
                <label htmlFor={ids.website}>Website</label>
                <input id={ids.website} name='website' type='text' tabIndex={-1} autoComplete='off' />
              </div>

              <div className='flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between'>
                <p id={`${uid}-privacy`} className='max-w-[42ch] text-[14px] leading-relaxed text-ink-3'>
                  We keep your message to reply to it, and nothing else. No newsletter, no tracking.
                </p>
                <button
                  type='submit'
                  data-magnetic
                  disabled={status.kind === 'sending'}
                  className='btn btn-signal shrink-0 disabled:opacity-60'
                >
                  {status.kind === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
              <div aria-live='polite' className='min-h-[1px]'>
                {status.kind === 'error' ? (
                  <p role='alert' className='mt-6 rounded-[6px] border border-[#ff8a7a]/40 px-4 py-3 text-[15px] text-[#ffb3a8]'>
                    {status.message}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </div>

        <aside aria-label='Other ways to reach us' className='flex flex-col'>
          <div className='frame-pad border-b border-line py-8'>
            <p className='label text-ink-3'>Availability</p>
            <p className='mt-3 text-[17px] leading-relaxed text-ink'>
              <span suppressHydrationWarning>{availability.slotsOpen} of {availability.slotsPerQuarter} project slots open in {quarter.long}.</span>{' '}
              Earliest new start: {availability.nextStart}.
            </p>
            <button type='button' onClick={() => openAsk('start')} className='label link-rule mt-4 text-ink-2 hover:text-ink'>
              How we schedule projects →
            </button>
          </div>
          <div className='frame-pad border-b border-line py-8'>
            <p className='label text-ink-3'>Elsewhere</p>
            <ul className='mt-3'>
              {portfolio.social.map((link) => (
                <li key={link.label} className='border-b border-line last:border-b-0'>
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center justify-between py-3 text-[18px] text-ink'
                  >
                    {link.label}
                    <span aria-hidden='true' className='text-ink-3 transition-colors group-hover:text-signal'>↗</span>
                    <span className='sr-only'> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='frame-pad py-8'>
            <p className='label text-ink-3'>Visit</p>
            <address className='mt-3 text-[17px] not-italic leading-relaxed text-ink-2'>
              {location.street}
              <br />
              {location.postalCode} {location.city}
              <br />
              Weekdays {String(availability.shift.from).padStart(2, '0')}:00–{availability.shift.to}:00, by appointment
            </address>
          </div>
        </aside>
      </div>
    </section>
  );
}
