import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export function NotFound({ children }: { children?: ReactNode }) {
  return (
    <section className='frame'>
      <div className='frame-pad flex min-h-[70svh] flex-col justify-center py-24'>
        <p className='label label-bracket text-ink-3'>404 · Nothing on this shift</p>
        <h1 className='mt-6 font-display text-[clamp(56px,10vw,160px)] leading-[0.86]'>
          <span aria-hidden='true' className='text-signal'>.</span>lost
        </h1>
        <div className='mt-6 max-w-[46ch] text-[17px] text-ink-2'>
          {children || <p>This page does not exist, or it moved. The work and the crew are one click away.</p>}
        </div>
        <div className='mt-10 flex flex-wrap gap-3'>
          <Link to='/' data-magnetic className='btn btn-signal'>Back to the start</Link>
          <Link to='/work' className='btn btn-line'>See the work</Link>
        </div>
      </div>
    </section>
  );
}
