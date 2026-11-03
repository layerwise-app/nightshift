#!/usr/bin/env node
// Renders a case study's still scenes (src/content/work/<slug>/scenes.tsx) to
// images and hands them to scripts/add-images.mjs.
//
//   pnpm render-scenes <slug> [scene-id…]
//   pnpm render-scenes --logo
//
// Needs the dev server running: it opens /dev/scenes/<slug> (a page that only
// exists in development), captures each scene at 2880 px wide in Chrome, and
// writes the usual 800/1600/2880 WebPs, blur placeholders and images.json.
// Scenes whose id starts with "video-" are animations; record those yourself.
//
// --logo captures the 3D logo on Home instead and writes the still that shows
// before WebGL starts, with reduced motion, and without WebGL:
// public/images/logo-scene-1600.webp and -800.webp. Run it after changing the
// signal color or the logo shape.
//
// The dev server address comes from --url, then BASE_URL, then the Layerwise
// dev server log, then http://localhost:5173.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WIDTH = 2880;
const HIDE = `header, footer, [data-readouts], .ns-cursor-dot, .ns-cursor-ring { display: none !important; }
main { padding-top: 0 !important; } body { padding-bottom: 0 !important; }`;

function fail(message) {
  console.error(`render-scenes: ${message}`);
  process.exit(1);
}

function baseUrl(args) {
  const flag = args.indexOf('--url');
  if (flag !== -1) {
    const value = args[flag + 1];
    args.splice(flag, 2);
    if (!value) fail('--url needs a value');
    return value;
  }
  if (process.env.BASE_URL) return process.env.BASE_URL;
  try {
    const log = fs.readFileSync(path.join(root, '.layerwise', 'dev-server.log'), 'utf8');
    const match = log.match(/Local:\s+(https?:\/\/\S+?)\/?\s/);
    if (match) return match[1];
  } catch {}
  return 'http://localhost:5173';
}

async function launch() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    fail('Playwright is missing. Run pnpm install.');
  }
  try {
    return await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    try {
      return await chromium.launch({ headless: true });
    } catch {
      fail('No browser found. Install Google Chrome, or run pnpm exec playwright install chromium.');
    }
  }
}

async function renderLogo(browser, base) {
  const sharp = (await import('sharp')).default;
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: 90_000 });
  // The canvas fades in once the scene has drawn its first frame.
  await page.waitForSelector('canvas.opacity-100', { timeout: 30_000 }).catch(() => fail('the 3D logo did not start; WebGL may be unavailable in this browser'));
  await page.addStyleTag({ content: HIDE });
  await page.evaluate(() => {
    const wrap = document.querySelector('canvas').parentElement;
    const background = getComputedStyle(document.body).backgroundColor;
    wrap.style.cssText = `position:fixed;left:0;top:0;width:800px;height:800px;z-index:9999;background:${background}`;
  });
  await page.waitForTimeout(2500);
  const shot = await page.screenshot({ clip: { x: 0, y: 0, width: 800, height: 800 } });
  const dir = path.join(root, 'public', 'images');
  await sharp(shot).resize(1600).webp({ quality: 86 }).toFile(path.join(dir, 'logo-scene-1600.webp'));
  await sharp(shot).resize(800).webp({ quality: 84 }).toFile(path.join(dir, 'logo-scene-800.webp'));
  await context.close();
  console.log('Updated public/images/logo-scene-1600.webp and logo-scene-800.webp');
}

const args = process.argv.slice(2);
const base = baseUrl(args).replace(/\/$/, '');

if (args.includes('--logo')) {
  const browser = await launch();
  try {
    await renderLogo(browser, base);
  } finally {
    await browser.close();
  }
  process.exit(0);
}

const [slug, ...only] = args;
if (!slug || slug.startsWith('-')) fail('usage: pnpm render-scenes <slug> [scene-id…]');
if (!fs.existsSync(path.join(root, 'src', 'content', 'work', slug, 'scenes.tsx'))) {
  fail(`src/content/work/${slug}/scenes.tsx does not exist`);
}

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `scenes-${slug}-`));
const browser = await launch();
const errors = [];

try {
  const list = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const response = await list.goto(`${base}/dev/scenes/${slug}`, { waitUntil: 'networkidle', timeout: 90_000 }).catch(() => null);
  if (!response?.ok()) fail(`could not open ${base}/dev/scenes/${slug}. Is the dev server running?`);
  await list.waitForSelector('[data-scene-ids]', { timeout: 60_000 });
  const scenes = await list.$$eval('[data-scene]', (els) =>
    els.map((el) => ({ id: el.dataset.scene, width: el.offsetWidth, height: el.offsetHeight }))
  );
  const unknown = only.filter((id) => !scenes.some((s) => s.id === id));
  if (unknown.length) fail(`no scene named ${unknown.join(', ')} in ${slug}`);

  const files = [];
  for (const scene of scenes) {
    if (only.length ? !only.includes(scene.id) : scene.id.startsWith('video-')) continue;
    const context = await browser.newContext({
      viewport: { width: scene.width + 80, height: scene.height + 80 },
      deviceScaleFactor: WIDTH / scene.width
    });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(`${scene.id}: ${error.message}`));
    await page.goto(`${base}/dev/scenes/${slug}?id=${encodeURIComponent(scene.id)}`, { waitUntil: 'networkidle', timeout: 90_000 });
    await page.addStyleTag({ content: HIDE });
    const target = page.locator(`[data-scene="${scene.id}"]`);
    await target.waitFor({ timeout: 60_000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    });
    await page.waitForTimeout(500);
    const file = path.join(outDir, `${scene.id}.png`);
    await target.screenshot({ path: file, animations: 'disabled' });
    files.push(file);
    console.log(`rendered ${scene.id} (${scene.width}×${scene.height})`);
    await context.close();
  }

  if (errors.length) fail(`the page reported errors:\n${errors.join('\n')}`);
  if (!files.length) fail('nothing to render');
  execFileSync(process.execPath, [path.join(root, 'scripts', 'add-images.mjs'), slug, ...files], { stdio: 'inherit' });
} finally {
  await browser.close();
  fs.rmSync(outDir, { recursive: true, force: true });
}
