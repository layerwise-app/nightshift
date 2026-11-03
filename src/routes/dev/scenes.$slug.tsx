// Development only: shows a case study's still scenes (scenes.tsx) one at a
// time so `pnpm render-scenes <slug>` can capture them as images. Production
// answers 404, and no page links here.
import { createFileRoute, notFound } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { DemoStage } from '~/components/work/DemoStage';
import type { SceneDef } from '~/components/frames/scene';
import { getCaseStudy } from '~/content/work';

const sceneModules = import.meta.glob<{ scenes: SceneDef[] }>(
  '/src/content/work/*/scenes.tsx'
);

export const Route = createFileRoute('/dev/scenes/$slug')({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === 'string' ? search.id : undefined
  }),
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  head: () => ({ meta: [{ title: 'Scenes' }, { name: 'robots', content: 'noindex' }] }),
  component: ScenesPage
});

function ScenesPage() {
  const { slug } = Route.useParams();
  const { id } = Route.useSearch();
  const [scenes, setScenes] = useState<SceneDef[] | null>(null);

  useEffect(() => {
    const load = sceneModules[`/src/content/work/${slug}/scenes.tsx`];
    if (!load) return;
    load().then((m) => setScenes(m.scenes));
  }, [slug]);

  if (!scenes) return <p className='p-10'>Loading scenes…</p>;

  if (id === 'demo') {
    const study = getCaseStudy(slug);
    const demo = study?.blocks.find((b) => b.type === 'demo');
    return demo && demo.type === 'demo' ? (
      <div className='frame frame-pad py-10'>
        <DemoStage block={demo} />
      </div>
    ) : (
      <p className='p-10'>No demo block</p>
    );
  }

  const list = id ? scenes.filter((s) => s.id === id) : scenes;
  return (
    <div data-scene-ids={scenes.map((s) => s.id).join(',')} className='space-y-10 p-10'>
      {list.map((scene) => (
        <div key={scene.id}>
          {!id ? <p className='label mb-2 text-ink-3'>{scene.id} · {scene.width}×{scene.height}</p> : null}
          <div
            data-scene={scene.id}
            className='relative overflow-hidden'
            style={{ width: scene.width, height: scene.height }}
          >
            {scene.render()}
          </div>
        </div>
      ))}
    </div>
  );
}
