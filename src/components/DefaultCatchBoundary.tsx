import { Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });

  console.error(error);

  return (
    <section className='frame'>
      <div className='frame-pad flex min-h-[70svh] flex-col justify-center py-24'>
        <p className='label label-bracket text-ink-3'>Something broke</p>
        <h1 className='mt-6 font-display text-[clamp(48px,8vw,120px)] leading-[0.88]'>
          <span aria-hidden='true' className='text-signal'>.</span>error
        </h1>
        <p className='mt-6 max-w-[52ch] text-[17px] text-ink-2'>
          This page hit an error while loading. Try again, and if it keeps happening, tell us through the contact page.
        </p>
        <div className='mt-10 flex flex-wrap gap-3'>
          <button type='button' onClick={() => router.invalidate()} className='btn btn-signal'>
            Try again
          </button>
          {isRoot ? (
            <Link to='/' className='btn btn-line'>Home</Link>
          ) : (
            <Link
              to='/'
              className='btn btn-line'
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
            >
              Go back
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
