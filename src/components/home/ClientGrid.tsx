import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionTitle } from '~/components/site/SectionTitle';
import { clients } from '~/content/clients';
import { cn } from '~/lib/utils';
import { ClientMark } from './ClientMarks';

/**
 * Client wordmarks in a grid of hairline cells. On a mouse, the cell under the
 * pointer lights up in the signal color and the light spreads to its
 * neighbours one ring at a time, then drains back toward where the pointer
 * left. On touch the
 * marks simply sit at full legibility; nothing is hidden behind hover.
 */
export function ClientGrid() {
  const gridRef = useRef<HTMLUListElement>(null);
  const [columns, setColumns] = useState(4);
  const [origin, setOrigin] = useState<number | null>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const read = () => {
      const count = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      setColumns(count || 1);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  const onEnterCell = useCallback((index: number, pointerType: string) => {
    if (pointerType !== 'mouse') return;
    setOrigin(index);
    setLit(true);
  }, []);

  const distance = (i: number) => {
    if (origin === null) return 0;
    const ax = i % columns;
    const ay = Math.floor(i / columns);
    const bx = origin % columns;
    const by = Math.floor(origin / columns);
    return Math.max(Math.abs(ax - bx), Math.abs(ay - by));
  };

  return (
    <section aria-labelledby='clients-title' className='frame border-t border-line'>
      <div className='frame-pad pb-10 pt-20 md:pb-14 md:pt-28'>
        <SectionTitle id='clients-title' label='People we have worked for, in Rotterdam and further'>
          clients
        </SectionTitle>
      </div>
      <ul
        ref={gridRef}
        onPointerLeave={() => setLit(false)}
        className='grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-4'
      >
        {clients.map((client, i) => {
          const d = distance(i);
          const level = lit ? Math.max(0, 3 - d) : 0; // 3 = the cell itself
          return (
            <li
              key={client.name}
              onPointerEnter={(event) => onEnterCell(i, event.pointerType)}
              data-level={level}
              className={cn(
                'client-cell relative flex aspect-[5/3] flex-col items-center justify-center border-b border-r border-line px-6 md:px-10',
                (i + 1) % columns === 0 && 'border-r-0'
              )}
              style={{ '--d': lit ? d : 3 - d } as React.CSSProperties}
            >
              <span className='client-mark w-full max-w-[184px]'>
                <ClientMark mark={client.mark} name={client.name} />
              </span>
              <span className='label absolute bottom-3 left-4 text-ink-3'>{client.sector}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
