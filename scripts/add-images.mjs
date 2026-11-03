#!/usr/bin/env node
// Adds images to a case study.
//
//   pnpm add-images <slug> <file> [more files…]
//   pnpm add-images <slug> <file> --name cover
//
// For each source image it writes, into src/content/work/<slug>/:
//   <name>-800.webp, <name>-1600.webp, <name>-2880.webp
//     (never upscaled: a source narrower than 2880 px tops out at its own width)
//   an entry in images.json with the dimensions, the widths, and a tiny blurred
//   placeholder
//   cover-og.jpg (1200×630) when the image is named "cover", for link previews
//
// GIFs are copied untouched as <name>.gif. SVG files are rejected.
// The image name is the file name in lowercase kebab-case, unless --name is set.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const WIDTHS = [800, 1600, 2880];
const ACCEPTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.gif']);
// ADD_IMAGES_ROOT lets the tests write somewhere temporary.
const root = process.env.ADD_IMAGES_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fail(message) {
  console.error(`add-images: ${message}`);
  process.exit(1);
}

function toName(file) {
  return path
    .basename(file, path.extname(file))
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function blurPlaceholder(input) {
  const buffer = await sharp(input, { animated: false })
    .rotate()
    .resize(24, 24, { fit: 'inside' })
    .blur(1.2)
    .webp({ quality: 45 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

async function removeOldVersions(dir, name) {
  const entries = await fs.readdir(dir);
  const pattern = new RegExp(`^${name}(-\\d+\\.webp|\\.gif)$`);
  await Promise.all(
    entries.filter((f) => pattern.test(f)).map((f) => fs.rm(path.join(dir, f)))
  );
}

async function addImage(source, dir, name) {
  const ext = path.extname(source).toLowerCase();
  if (ext === '.svg') {
    fail(`${source} is an SVG. Export it as PNG or JPG first; SVG is not accepted.`);
  }
  if (!ACCEPTED.has(ext)) {
    fail(`${source} has an unsupported type (${ext || 'none'}). Use JPG, PNG, WebP, AVIF, TIFF, or GIF.`);
  }
  await fs.access(source).catch(() => fail(`${source} does not exist.`));
  await removeOldVersions(dir, name);

  if (ext === '.gif') {
    const meta = await sharp(source, { animated: true }).metadata();
    await fs.copyFile(source, path.join(dir, `${name}.gif`));
    const height = meta.pageHeight ?? meta.height;
    return {
      width: meta.width,
      height,
      widths: [meta.width],
      format: 'gif',
      blur: await blurPlaceholder(source)
    };
  }

  const image = sharp(source).rotate();
  const meta = await image.metadata();
  const oriented = meta.orientation && meta.orientation >= 5;
  const width = oriented ? meta.height : meta.width;
  const height = oriented ? meta.width : meta.height;

  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, width)))];
  for (const w of widths) {
    await sharp(source)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5, smartSubsample: true })
      .toFile(path.join(dir, `${name}-${w}.webp`));
  }

  if (name === 'cover') {
    await sharp(source)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .flatten({ background: '#0a0a0b' })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(dir, 'cover-og.jpg'));
  }

  return {
    width,
    height,
    widths,
    format: 'webp',
    blur: await blurPlaceholder(source)
  };
}

async function main() {
  const args = process.argv.slice(2);
  const nameIndex = args.indexOf('--name');
  let forcedName;
  if (nameIndex !== -1) {
    forcedName = args[nameIndex + 1];
    if (!forcedName) fail('--name needs a value, like --name cover.');
    args.splice(nameIndex, 2);
  }
  const [slug, ...sources] = args;
  if (!slug || sources.length === 0) {
    fail('usage: pnpm add-images <slug> <file> [more files…] [--name <name>]');
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(`"${slug}" is not a valid slug. Use lowercase letters, digits, and dashes.`);
  }
  if (forcedName && sources.length > 1) {
    fail('--name works with one file at a time.');
  }

  const dir = path.join(root, 'src', 'content', 'work', slug);
  await fs.mkdir(dir, { recursive: true });
  const manifestPath = path.join(dir, 'images.json');
  const manifest = JSON.parse(
    await fs.readFile(manifestPath, 'utf8').catch(() => '{}')
  );

  for (const source of sources) {
    const name = forcedName ? toName(forcedName) : toName(source);
    if (!name) fail(`Could not make an image name from ${source}. Pass --name.`);
    const entry = await addImage(path.resolve(source), dir, name);
    manifest[name] = entry;
    const sizes = entry.format === 'gif' ? 'gif, untouched' : entry.widths.map((w) => `${w}w`).join(' ');
    console.log(`  ${slug}/${name}  ${entry.width}×${entry.height}  (${sizes})`);
  }

  const sorted = Object.fromEntries(
    Object.keys(manifest)
      .sort()
      .map((key) => [key, manifest[key]])
  );
  await fs.writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`Updated src/content/work/${slug}/images.json`);
}

main().catch((error) => fail(error.message));
