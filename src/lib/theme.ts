import type { CSSProperties } from 'react';
import { portfolio, type FontSpec } from '~/portfolio.config';

const { fonts, colors } = portfolio;

function face(spec: FontSpec, file: string, style: 'normal' | 'italic') {
  // `optional` keeps text in place: if the preloaded file is not ready in
  // time, the fallback stays for this page view instead of swapping later.
  return `@font-face{font-family:'${spec.family}';src:url('${file}') format('woff2');font-weight:${spec.weight};font-style:${style};font-display:optional;}`;
}

/** @font-face rules for the three fonts in `portfolio.config.ts`. */
export const fontFaceCss = (Object.values(fonts) as FontSpec[])
  .flatMap((spec) => [
    face(spec, spec.file, 'normal'),
    ...(spec.italicFile ? [face(spec, spec.italicFile, 'italic')] : [])
  ])
  .join('');

/** <link rel="preload"> tags so fonts arrive with the first paint. */
export const fontPreloads = (Object.values(fonts) as FontSpec[]).map((spec) => ({
  rel: 'preload',
  href: spec.file,
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous' as const
}));

const stack = (spec: FontSpec) => `'${spec.family}', ${spec.fallback}`;

/** CSS variables on <html>; `src/styles/app.css` builds everything from these. */
export const themeStyle = {
  '--ns-bg': colors.background,
  '--ns-surface': colors.surface,
  '--ns-text': colors.text,
  '--ns-signal': colors.signal,
  '--ns-on-signal': colors.onSignal,
  '--ns-paper': colors.paper,
  '--ns-on-paper': colors.onPaper,
  '--ns-font-display': stack(fonts.display),
  '--ns-font-body': stack(fonts.body),
  '--ns-font-mono': stack(fonts.mono)
} as CSSProperties;
