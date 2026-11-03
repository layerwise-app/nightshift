import type { ComponentType } from 'react';

/** One entry in a case study's `images.json`, written by `pnpm add-images`. */
export type ImageManifestEntry = {
  width: number;
  height: number;
  /** Pixel widths of the generated versions, smallest first. */
  widths: number[];
  /** `webp` (resized versions) or `gif` (copied untouched). */
  format: string;
  /** A tiny blurred preview as a data URL, shown while the image loads. */
  blur: string;
};

export type ImageManifest = Record<string, ImageManifestEntry>;

/** An image ready for <Picture>. */
export type Img = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  blur: string;
  alt: string;
};

export type VideoAsset = {
  mp4: string;
  webm?: string;
};

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

/** A demo module default-exports a component that fills its stage. */
export type DemoModule = { default: ComponentType };

export type Block =
  /**
   * Mounts a project's real phone screen so visitors can use it. `load`
   * imports a module whose default export is a 390 × 844 screen component;
   * the page draws the phone around it.
   */
  | {
      type: 'demo';
      title: string;
      caption: string;
      /** One short line telling visitors what to try. */
      hint: string;
      /** Color of the panel behind the phone. */
      background: string;
      finish?: 'graphite' | 'silver' | 'sand';
      load: () => Promise<DemoModule>;
    }
  | { type: 'image'; image: Img; caption?: string }
  | { type: 'pair'; images: [Img, Img]; caption?: string }
  | { type: 'video'; video: VideoAsset; poster: Img; caption?: string }
  | { type: 'text'; heading?: string; body: string[] }
  | { type: 'quote'; quote: string; name: string; role: string }
  | {
      type: 'beforeAfter';
      before: Img;
      after: Img;
      caption?: string;
      labels?: [string, string];
    }
  | { type: 'metrics'; heading?: string; items: Metric[] };

export type CaseStudy = {
  /** URL segment: `/work/<slug>`. Must match the file name. */
  slug: string;
  /** Lower numbers come first on Home and Work. */
  order: number;
  /** The headline on the case study page. */
  title: string;
  client: string;
  year: number;
  /** Short sector line, like `Festival ticketing`. */
  sector: string;
  /** One or two sentences for cards, search results, and link previews. */
  summary: string;
  /** What the studio did. */
  role: string[];
  /** Who worked on it, like `Noor Aydın, design lead`. */
  team: string[];
  /** The project's own brand color, used for small accents on its cards. */
  accent: string;
  cover: Img;
  problem: {
    brief: string;
    constraint: string;
  };
  decisions: { title: string; body: string }[];
  outcome: {
    summary: string;
    metrics: Metric[];
  };
  blocks: Block[];
};
