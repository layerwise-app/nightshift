<a href="https://layerwise.app"><picture><source media="(prefers-color-scheme: dark)" srcset="https://layerwise.app/powered-by-dark.png"><img src="https://layerwise.app/powered-by.png" alt="Powered by Layerwise" width="174" height="28"></picture></a>

# Nightshift

A dark portfolio template for a small web and brand studio, or a freelancer
who wants their site to feel like one. It ships as **Nightshift Studio**, a
fictional crew of six in Rotterdam, with six sample case studies whose screens
are real React components. See the live demo at
[nightshift.layerwise.site](https://nightshift.layerwise.site/).

Visitors land on Home, with a 3D logo that follows the pointer, readouts on
the screen edges (scroll, local time, open slots), a pinned rail of case
cards, a client grid, a full-white pricing section and a ⌘K **Ask the
studio** panel that answers from a written Q&A list. From there they can
browse Work, read a page per case study (each sample has a working phone demo),
learn about the crew on About and download the studio CV, and send a message
from Contact (saved to the database, and emailed to you if you want).

Nightshift was built with [Layerwise](https://layerwise.app); open it in
Layerwise to make your own version.

Built with TanStack Start, React, Tailwind CSS and Three.js on Cloudflare
Workers, with a D1 database through Drizzle. There are no accounts, CMS,
payments or AI model.

## Commands

```bash
pnpm dev                     # start the dev server (Layerwise runs it for you)
pnpm check-types             # TypeScript
pnpm lint                    # Biome
pnpm test                    # Vitest: content, contact form, ⌘K search, time, add-images
pnpm build                   # type check and production build

pnpm add-images <slug> <file…> [--name <name>]   # add images to a case study
pnpm render-scenes <slug> [scene-id…]            # render a sample's stills from React
pnpm render-scenes --logo                        # re-capture the 3D logo still

pnpm db:generate --name <change>   # after editing src/db/schema.ts
pnpm db:migrate                    # apply migrations to the local database
```

## Where things live

| What                                   | Where                                         |
| -------------------------------------- | --------------------------------------------- |
| Name, bio, address, socials, email     | `src/portfolio.config.ts`                     |
| Fonts and colours                      | `src/portfolio.config.ts`, files in `public/fonts/` |
| Case studies                           | `src/content/work/<slug>.ts`                  |
| Their images, videos, demo and screens | `src/content/work/<slug>/`                    |
| Services, pricing, crew, clients       | `src/content/services.ts`, `pricing.ts`, `crew.ts`, `clients.ts` |
| About timeline                         | `src/content/about.ts`                        |
| ⌘K questions and answers               | `src/content/ask.ts`                          |
| Client logos on Home                   | `src/components/home/ClientMarks.tsx`         |
| Contact form rules                     | `src/lib/contact.ts`                          |
| Studio CV                              | `public/nightshift-studio-cv.pdf` (path set in `cvFile`) |
| Default link preview image             | `public/og-image.jpg` (1200 × 630)            |
| Logo, favicons, app name on phones     | `public/logo.svg`, `public/logo.png`, `public/favicon*`, `public/*-icon*.png`, `public/android-chrome-*.png`, `public/site.webmanifest` |

## Make it yours

Start in `src/portfolio.config.ts`. Everything on the site that names the
studio reads from it: the header, footer, page titles, structured data, the
CV link, the contact page and the ⌘K answers.

- `availability` drives the edge readouts, the hero, Contact and ⌘K. Set
  `slotsOpen` to `0` and every place says the quarter is full.
- `availability.shift` is the local hours you answer messages. The clock on
  the screen edge says “On shift” inside them on weekdays.
- `ownerEmail` is where contact messages are emailed. Empty means they are
  only saved (see [Contact form](#contact-form)).
- `social` links appear on Contact and in the footer.

Then go through the files in `src/content/`. Each one is plain typed data with
a comment at the top.

## Add a project

A project is one file and one folder with the same name, the **slug**. The
slug becomes the URL: `src/content/work/harbour-light.ts` is
`/work/harbour-light`.

1. **Add the images.** Pass your screenshots or exports to `add-images`. Name
   one of them `cover`: it is the card image on Home and Work, the top of the
   case study, and (as `cover-og.jpg`) the link preview.

   ```bash
   pnpm add-images harbour-light ~/Desktop/home.png --name cover
   pnpm add-images harbour-light ~/Desktop/booking-flow.png ~/Desktop/menu.jpg
   ```

   This creates `src/content/work/harbour-light/` with three WebP sizes of
   each image (800, 1600 and 2880 px wide, never upscaled) and `images.json`,
   which records each image's size and a tiny blurred preview so the page
   never jumps while images load. Without `--name`, the name is the file name in
   kebab-case (`booking-flow`, `menu`). Run it again with the same name to
   replace an image. JPG, PNG, WebP, AVIF and TIFF are converted; GIFs are
   copied untouched; SVG is refused (export it as PNG first). Use images at
   least 2880 px wide for sharp results on large screens.

2. **Write the case study.** Copy an existing file such as
   `src/content/work/gaaf.ts` to `src/content/work/harbour-light.ts` and
   change:

   - the two lines at the top that point to the folder:

     ```ts
     import images from './harbour-light/images.json';
     const img = imagesFor('harbour-light', images);
     ```

   | Field         | What to write                                                       |
   | ------------- | ------------------------------------------------------------------- |
   | `slug`        | The file name without `.ts`                                         |
   | `order`       | Position on Home and Work, lowest first. The samples use 1–6; any number works, and ties put the newest first |
   | `title`       | The headline of the case study                                      |
   | `client`, `year`, `sector` | Shown on cards, like `'Harbour Light'`, `2026`, `'Restaurant bookings'` |
   | `summary`     | One or two sentences for cards, search results and link previews    |
   | `role`        | What you did, as a list: `['Identity', 'Website']`                  |
   | `team`        | `'Name, what they did'`. Names come from `src/content/crew.ts`      |
   | `accent`      | The client's brand colour as `#rrggbb`                              |
   | `cover`       | `img('cover', 'What the cover shows, for people who cannot see it')` |
   | `problem`     | `{ brief, constraint }`: what was asked, and what made it hard      |
   | `decisions`   | `[{ title, body }]`, three or more                                  |
   | `outcome`     | `{ summary, metrics: [{ value: '41 min', label: 'to sell out', note? }] }` |
   | `blocks`      | The body of the page, in order (see [Block types](#block-types))    |

   Delete the sample's `demo` block unless you write a demo of your own (see
   below). `img('name', 'alt text')` only accepts names that exist in
   `images.json`, so a typo is a type error.

3. **Check it.** The project now shows on Home (rail), Work (grid and index),
   in the sitemap, and in the “next project” loop; the dev server picks it up
   without a restart. Run `pnpm check-types` and
   `pnpm test`; the content tests check the fields, the alt text and the
   share image.

To remove a project, delete its file and its folder.

Clients without a case study can still go in `src/content/clients.ts`. If a
client's `name` matches a case study's `client`, About links to it.

### Block types

| Block         | Shape                                                                 |
| ------------- | --------------------------------------------------------------------- |
| `text`        | `{ type: 'text', heading?, body: string[] }`                          |
| `image`       | `{ type: 'image', image: img('name', 'alt'), caption? }`              |
| `pair`        | `{ type: 'pair', images: [img(…), img(…)], caption? }`                |
| `video`       | `{ type: 'video', video: videoFor(slug, 'name'), poster: img(…), caption? }` |
| `quote`       | `{ type: 'quote', quote, name, role }`                                |
| `beforeAfter` | `{ type: 'beforeAfter', before: img(…), after: img(…), labels?, caption? }` |
| `metrics`     | `{ type: 'metrics', heading?, items: [{ value, label, note? }] }`     |
| `demo`        | `{ type: 'demo', title, caption, hint, background, finish?, load }`   |

`before` and `after` should be the same size.

### Swap a demo for an image or a video

A `demo` block mounts a working phone screen: `load: () => import('./<slug>/demo')`,
where `demo.tsx` default-exports a component drawn at 390 × 844. To show a
picture instead, replace the block:

```ts
{ type: 'image', image: img('booking-flow', 'The booking flow on a phone'), caption: 'Optional' }
```

For a video, put `queue.mp4` (and, if you have it, `queue.webm`) in the
project folder, add a poster image with `add-images`, and import `videoFor`
next to `imagesFor` from `~/lib/images`:

```ts
{ type: 'video', video: videoFor('harbour-light', 'queue'), poster: img('queue-poster', 'What the video shows') }
```

Videos play muted and looped while in view, stop when scrolled away, and show
the poster with a play button when the visitor prefers reduced motion. Keep
them short and under a few MB. Then delete `demo.tsx` if nothing else uses it.

### Replace the sample work

1. Add your own projects as above.
2. Delete each sample's file and folder, for example
   `src/content/work/gaaf.ts` and `src/content/work/gaaf/`.
3. Remove the sample clients from `src/content/clients.ts` and their marks
   from `src/components/home/ClientMarks.tsx` (a client without a `mark` is
   shown as its name set in type).
4. Remove the `@fontsource` packages the samples used (listed under
   [Fonts](#fonts-and-licences)) with `pnpm remove`.

The samples' stills are rendered from their `scenes.tsx`: compositions of the
real screen components in device frames. After changing a sample screen, run
`pnpm render-scenes <slug>` (or name scene ids to render only those) with the
dev server running. It opens `/dev/scenes/<slug>`, a page that only exists in
development, captures each scene at 2880 px in Chrome and passes the images
to `add-images`. Scenes whose id starts with `video-` are animations to record
yourself.

## Change fonts

The three faces are set in `fonts` in `src/portfolio.config.ts`:

- `display`: headings, section titles, numbers. A bold, rounded face suits
  the logo.
- `body`: running text.
- `mono`: the `[ bracketed ]` labels, buttons and readouts.

To change one, put a variable `.woff2` file in `public/fonts/`, along with its
licence, and update `family`, `file`, `weight` (the range the file covers,
like `'200 1000'`), `italicFile` if there is one, and `fallback`. The fonts are
preloaded and use `font-display: optional`, so text never waits and never
reflows. Pick a fallback with similar widths.

## Change colours

Set `colors` in `src/portfolio.config.ts`. They become CSS variables (`--ns-*`)
on every page. `signal` is the one hot colour: section dots, progress bars,
the main button and the 3D logo. `onSignal` is text placed on it. Keep body
text at 4.5:1 contrast or more against `background`, and `onPaper` against
`paper`.

The 3D logo reads the signal colour itself. Three things are images and need
updating by hand when the colour changes:

- the logo still, shown with reduced motion, without WebGL and before the
  scene starts: `pnpm render-scenes --logo` re-captures it from the live scene;
- `public/og-image.jpg`, the default link preview;
- the logo and favicons in `public/`.

The shape of the logo is in `src/lib/logo-shape.ts`. The 3D scene, the header
mark and the footer mark all draw from it.

## Contact form

Messages are validated on the server (`src/lib/contact.ts`), saved to the
`contact_messages` table, and, when `ownerEmail` is set, emailed to you with
the visitor's address as reply-to. Read saved messages under Database in
Layerwise.

- A hidden `website` field catches bots: messages that fill it are dropped
  without telling them.
- Each sender (a hash of IP address and browser, never stored in plain text)
  can send 3 messages per 15 minutes. Change `RATE_LIMIT` to adjust.
- Locally, email lands in Email → Local in Layerwise. The published site
  sends from the project's address.

## ⌘K Ask the studio

`src/content/ask.ts` holds the questions, grouped by topic, each with
`keywords` people might type, an answer of one or more paragraphs, and an
optional link. Answers can read live values (open slots, the quarter, the
next start date). Search matches words in the question, keywords, topic and
answer; nothing is generated. Open it with ⌘K or Ctrl+K, the header button, or
the Ask button on phones.

## Search and sharing

Every public page sets its title, description, canonical URL and share image
with `seo()`. A case study uses its cover (`cover-og.jpg`) as its link preview
and describes itself as a `CreativeWork`; Home and About describe the studio
as an `Organization`. `/sitemap.xml` lists the pages in `sitemapPaths`
(`src/lib/site.ts`) plus every case study. After connecting a custom domain,
set `site.url` to it.

## Motion and access

- Animations only move things with a purpose and pause off screen. The 3D
  scene stops when it scrolls away or the tab is hidden.
- With reduced motion, the logo is a still, the rail is a grid, videos wait
  for a click, and nothing slides.
- Phones and tablets scroll normally: no pinned rail, no custom cursor, and
  nothing that needs hover.
- Everything works by keyboard with a visible focus ring; the custom cursor is
  only for mice and trackpads.

## Fonts and licences

All fonts are open-licensed and served from this site, not from a font CDN.

| Font                | Used for                      | Licence  | Source                             |
| ------------------- | ----------------------------- | -------- | ---------------------------------- |
| Nunito              | Display                       | SIL OFL 1.1 | `public/fonts/`, licence alongside |
| Instrument Sans     | Body                          | SIL OFL 1.1 | `public/fonts/`, licence alongside |
| Martian Mono        | Labels and readouts           | SIL OFL 1.1 | `public/fonts/`, licence alongside |
| Bricolage Grotesque | Sample: Golfslag Festival     | SIL OFL 1.1 | `@fontsource-variable/bricolage-grotesque` |
| Fraunces, Figtree   | Sample: Okkerse & Dochters    | SIL OFL 1.1 | `@fontsource-variable/fraunces`, `/figtree` |
| Newsreader, Figtree | Sample: Kliniek Dassen        | SIL OFL 1.1 | `@fontsource-variable/newsreader`, `/figtree` |
| Archivo             | Sample: Kamerstuk             | SIL OFL 1.1 | `@fontsource-variable/archivo` |
| Outfit              | Sample: Gaaf                  | SIL OFL 1.1 | `@fontsource-variable/outfit` |
| IBM Plex Sans, Mono | Sample: Ankerveld Groep       | SIL OFL 1.1 | `@fontsource-variable/ibm-plex-sans`, `@fontsource/ibm-plex-mono` |

All studios, people, clients, quotes and numbers in the sample content are
fictional.
