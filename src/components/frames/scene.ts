import type { ReactNode } from 'react';

/**
 * A still composition for a case study: a fixed-size canvas of real screen
 * components in device frames. Each scene was rendered once to an image and
 * added with `pnpm add-images`; its `id` is the image name.
 */
export type SceneDef = {
  id: string;
  /** Size in CSS px. Images are rendered at 2880 px wide. */
  width: number;
  height: number;
  render: () => ReactNode;
};

export function defineScenes(scenes: SceneDef[]): SceneDef[] {
  return scenes;
}
