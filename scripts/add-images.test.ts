import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const run = promisify(execFile);
const script = path.resolve(__dirname, 'add-images.mjs');

let root: string;
let sources: string;
const slug = 'test-project';
const out = () => path.join(root, 'src', 'content', 'work', slug);

async function addImages(...args: string[]) {
  return run(process.execPath, [script, slug, ...args], { env: { ...process.env, ADD_IMAGES_ROOT: root } });
}

beforeAll(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'add-images-root-'));
  sources = await fs.mkdtemp(path.join(os.tmpdir(), 'add-images-src-'));
  const pixels = { width: 3200, height: 2000, channels: 3 as const, background: '#d4ff3a' };
  await sharp({ create: pixels }).png().toFile(path.join(sources, 'Cover Shot.png'));
  await sharp({ create: { ...pixels, width: 1200, height: 900 } }).jpeg().toFile(path.join(sources, 'small.jpg'));
  await sharp({ create: { ...pixels, width: 40, height: 30 } }).gif().toFile(path.join(sources, 'loop.gif'));
  await fs.writeFile(path.join(sources, 'mark.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
});

afterAll(async () => {
  await fs.rm(root, { recursive: true, force: true });
  await fs.rm(sources, { recursive: true, force: true });
});

describe('scripts/add-images', () => {
  it('writes 800, 1600 and 2880 px WebPs, a share image and the manifest', async () => {
    await addImages(path.join(sources, 'Cover Shot.png'), '--name', 'cover');
    const files = await fs.readdir(out());
    expect(files).toEqual(expect.arrayContaining(['cover-800.webp', 'cover-1600.webp', 'cover-2880.webp', 'cover-og.jpg', 'images.json']));
    const manifest = JSON.parse(await fs.readFile(path.join(out(), 'images.json'), 'utf8'));
    expect(manifest.cover).toMatchObject({ width: 3200, height: 2000, widths: [800, 1600, 2880], format: 'webp' });
    expect(manifest.cover.blur).toMatch(/^data:image\/webp;base64,/);
    expect((await sharp(path.join(out(), 'cover-2880.webp')).metadata()).width).toBe(2880);
    expect(await sharp(path.join(out(), 'cover-og.jpg')).metadata()).toMatchObject({ width: 1200, height: 630 });
  });

  it('never upscales a small source', async () => {
    await addImages(path.join(sources, 'small.jpg'));
    const manifest = JSON.parse(await fs.readFile(path.join(out(), 'images.json'), 'utf8'));
    expect(manifest.small.widths).toEqual([800, 1200]);
  });

  it('copies GIFs untouched', async () => {
    await addImages(path.join(sources, 'loop.gif'));
    const [original, copy] = await Promise.all([
      fs.readFile(path.join(sources, 'loop.gif')),
      fs.readFile(path.join(out(), 'loop.gif'))
    ]);
    expect(copy.equals(original)).toBe(true);
    const manifest = JSON.parse(await fs.readFile(path.join(out(), 'images.json'), 'utf8'));
    expect(manifest.loop).toMatchObject({ format: 'gif', width: 40, height: 30 });
  });

  it('rejects SVG files', async () => {
    await expect(addImages(path.join(sources, 'mark.svg'))).rejects.toMatchObject({ code: 1 });
    expect(await fs.readdir(out())).not.toContain('mark-800.webp');
  });
});
