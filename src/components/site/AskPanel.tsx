import { Link } from '@tanstack/react-router';
import { Command } from 'cmdk';
import { Dialog } from 'radix-ui';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import {
  answerText,
  askEntries,
  askTopics,
  type AskContext,
  type AskEntry
} from '~/content/ask';
import { searchAsk } from '~/lib/ask-search';
import { quarterOf } from '~/lib/time';
import { cn } from '~/lib/utils';
import { portfolio } from '~/portfolio.config';

type AskState = {
  open: boolean;
  openAsk: (questionId?: string) => void;
  setOpen: (open: boolean) => void;
};

const AskStateContext = createContext<AskState | null>(null);

export function useAsk(): AskState {
  const ctx = useContext(AskStateContext);
  if (!ctx) throw new Error('useAsk must be used inside <AskProvider>');
  return ctx;
}

function useAskContext(): AskContext {
  return useMemo(
    () => ({
      slotsOpen: portfolio.availability.slotsOpen,
      slotsPerQuarter: portfolio.availability.slotsPerQuarter,
      quarter: quarterOf(new Date(), portfolio.location.timeZone).long,
      nextStart: portfolio.availability.nextStart,
      city: portfolio.location.city
    }),
    []
  );
}

export function AskProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState<string | undefined>();

  const openAsk = useCallback((questionId?: string) => {
    setInitial(questionId);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setInitial(undefined);
        setOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const state = useMemo(() => ({ open, openAsk, setOpen }), [open, openAsk]);

  return (
    <AskStateContext.Provider value={state}>
      {children}
      <AskDialog open={open} onOpenChange={setOpen} initialId={initial} />
    </AskStateContext.Provider>
  );
}

function AskDialog({
  open,
  onOpenChange,
  initialId
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialId?: string;
}) {
  const ctx = useAskContext();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string>(askEntries[0].id);
  // On small screens the list and the answer take turns.
  const [reading, setReading] = useState(false);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(initialId ?? askEntries[0].id);
      setReading(Boolean(initialId));
    }
  }, [open, initialId]);

  const results = useMemo(
    () => searchAsk(query, askEntries, (e) => answerText(e, ctx)),
    [query, ctx]
  );

  useEffect(() => {
    if (results.length > 0 && !results.some((r) => r.id === active)) {
      setActive(results[0].id);
    }
  }, [results, active]);

  const current =
    askEntries.find((entry) => entry.id === active) ?? askEntries[0];
  const grouped = query.trim().length === 0;

  const renderItem = (entry: AskEntry) => (
    <Command.Item
      key={entry.id}
      value={entry.id}
      onSelect={() => {
        setActive(entry.id);
        setReading(true);
      }}
      className='group/item relative flex cursor-pointer items-start gap-3 rounded-[6px] px-3 py-2.5 text-[15px] leading-snug text-ink-2 outline-none data-[selected=true]:bg-[color-mix(in_oklab,var(--ns-text)_7%,transparent)] data-[selected=true]:text-ink'
    >
      <span
        aria-hidden='true'
        className='mt-[7px] size-1.5 shrink-0 rounded-full bg-line-strong group-data-[selected=true]/item:bg-signal'
      />
      <span className='min-w-0 flex-1'>{entry.question}</span>
      {!grouped ? (
        <span className='label mt-0.5 shrink-0 text-ink-3'>{entry.topic}</span>
      ) : null}
    </Command.Item>
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-[80] bg-[color-mix(in_oklab,var(--ns-bg)_72%,transparent)] data-[state=open]:animate-in data-[state=open]:fade-in-0' />
        <Dialog.Content
          aria-describedby={undefined}
          className='fixed z-[81] inset-x-3 top-[max(12px,env(safe-area-inset-top))] bottom-[max(12px,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-auto md:left-1/2 md:top-[12vh] md:w-[min(920px,calc(100vw-96px))] md:-translate-x-1/2 overflow-hidden rounded-[12px] border border-line-strong bg-surface text-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 md:h-[min(560px,76vh)]'
        >
          <Dialog.Title className='sr-only'>Ask the studio</Dialog.Title>
    <Command
      label='Ask the studio'
      shouldFilter={false}
      value={active}
      onValueChange={(value) => value && setActive(value)}
      loop
      className='flex h-full flex-col'
    >
      <div className='flex items-center gap-3 border-b border-line px-4 md:px-5'>
        <span className='label shrink-0 text-signal'>Ask</span>
        <Command.Input
          value={query}
          onValueChange={(value) => {
            setQuery(value);
            setReading(false);
          }}
          placeholder='Pricing, process, availability…'
          className='h-14 min-w-0 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-ink-3'
        />
        <button
          type='button'
          onClick={() => onOpenChange(false)}
          aria-label='Close'
          className='label shrink-0 rounded-[4px] border border-line px-2 py-1 text-ink-3 hover:text-ink'
        >
          <span className='[@media(hover:hover)_and_(pointer:fine)]:hidden'>Close</span>
          <span className='hidden [@media(hover:hover)_and_(pointer:fine)]:inline'>Esc</span>
        </button>
      </div>

      <div className='grid min-h-0 flex-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'>
        <Command.List
          className={cn(
            'min-h-0 overflow-y-auto overscroll-contain p-2 md:border-r md:border-line',
            reading ? 'hidden md:block' : 'block'
          )}
        >
          <Command.Empty className='px-3 py-6 text-[15px] text-ink-2'>
            No written answer for that yet.{' '}
            <Link
              to='/contact'
              onClick={() => onOpenChange(false)}
              className='link-rule text-ink'
            >
              Ask us directly
            </Link>
            .
          </Command.Empty>
          {grouped
            ? askTopics.map((topic) => (
                <Command.Group
                  key={topic}
                  heading={topic}
                  className='[&_[cmdk-group-heading]]:label mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-ink-3'
                >
                  {results
                    .filter((entry) => entry.topic === topic)
                    .map(renderItem)}
                </Command.Group>
              ))
            : results.map(renderItem)}
        </Command.List>

        <div
          className={cn(
            'min-h-0 overflow-y-auto p-5 md:p-7',
            reading ? 'block' : 'hidden md:block'
          )}
        >
          <button
            type='button'
            onClick={() => setReading(false)}
            className='label mb-5 text-ink-3 hover:text-ink md:hidden'
          >
            ← All questions
          </button>
          <div aria-live='polite'>
            <p className='label label-bracket text-ink-3'>{current.topic}</p>
            <h2 className='mt-3 font-display text-[28px] leading-[1.02] tracking-[-0.035em] md:text-[32px]'>
              {current.question}
            </h2>
            <div className='mt-5 space-y-3 text-[15.5px] leading-relaxed text-ink-2'>
              {answerText(current, ctx).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {current.link ? (
              <Link
                to={current.link.to}
                hash={current.link.hash}
                onClick={() => onOpenChange(false)}
                className='btn btn-line mt-7 h-10 text-[11px]'
              >
                {current.link.label} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between gap-4 border-t border-line px-4 py-2.5 md:px-5'>
        <p className='label hidden text-ink-3 md:block'>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd> browse <Kbd>↵</Kbd> read <Kbd>esc</Kbd> close
        </p>
        <p className='label text-ink-3'>
          {askEntries.length} answers by the crew · no AI model
        </p>
      </div>
    </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className='mr-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[3px] border border-line px-1 font-mono text-[10px] text-ink-2'>
      {children}
    </kbd>
  );
}
