import type { ImageManifest, Img, VideoAsset } from '~/content/types';

// Every image and video that lives beside a case study. Vite turns each file
// into a hashed URL at build time.
const files = import.meta.glob(
  '/src/content/work/*/*.{webp,gif,jpg,png,mp4,webm}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

function missing(message: string, label: string): string {
  // While developing, show a labelled placeholder instead of crashing the
  // whole site; a production build fails so a missing file never ships.
  if (import.meta.env.DEV) {
    console.warn(message);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900"><rect width="1440" height="900" fill="#1a1a1d"/><text x="720" y="460" fill="#8a8a90" font-family="monospace" font-size="28" text-anchor="middle">missing: ${label}</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
  throw new Error(message);
}

function fileUrl(slug: string, file: string): string {
  const url = files[`/src/content/work/${slug}/${file}`];
  if (!url) {
    return missing(
      `Missing src/content/work/${slug}/${file}. Add it with: pnpm add-images ${slug} <source-file>`,
      `${slug}/${file}`
    );
  }
  return url;
}

/**
 * Returns a picker for a case study's images:
 *
 *   const img = imagesFor('my-project', images);
 *   img('cover', 'The home page on a phone')
 */
export function imagesFor<M extends ImageManifest>(slug: string, manifest: M) {
  return (name: keyof M & string, alt: string): Img => {
    const entry = manifest[name];
    if (!entry) {
      const src = missing(
        `No image "${name}" in src/content/work/${slug}/images.json`,
        `${slug}/${name}`
      );
      return { src, width: 1440, height: 900, blur: src, alt };
    }
    if (entry.format === 'gif') {
      return {
        src: fileUrl(slug, `${name}.gif`),
        width: entry.width,
        height: entry.height,
        blur: entry.blur,
        alt
      };
    }
    const sources = entry.widths.map((w) => ({
      w,
      url: fileUrl(slug, `${name}-${w}.webp`)
    }));
    const middle =
      sources.find((s) => s.w >= 1600) ?? sources[sources.length - 1];
    return {
      src: middle.url,
      srcSet: sources.map((s) => `${s.url} ${s.w}w`).join(', '),
      width: entry.width,
      height: entry.height,
      blur: entry.blur,
      alt
    };
  };
}

/** A video beside a case study: `<name>.mp4` and, if present, `<name>.webm`. */
export function videoFor(slug: string, name: string): VideoAsset {
  const webm = files[`/src/content/work/${slug}/${name}.webm`];
  return { mp4: fileUrl(slug, `${name}.mp4`), ...(webm ? { webm } : {}) };
}

/** The 1200×630 share image `pnpm add-images` writes for an image named `cover`. */
export function shareImageFor(slug: string): string | undefined {
  return files[`/src/content/work/${slug}/cover-og.jpg`];
}
