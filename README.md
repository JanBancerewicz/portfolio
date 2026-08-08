# Portfolio — Jan Bancerewicz

An editorial one-page portfolio with a project archive and a blog. Written as a
React app, shipped as a folder of static HTML files, hosted on GitHub Pages.

**React 19 · TypeScript · Vite · Tailwind CSS v4 · MDX · Anime.js v4**

---

## The shape of the thing

Three constraints drove every architectural decision:

1. **The host serves files, not routes.** GitHub Pages has no server, no
   rewrite rules and no response headers. Anything that needs a runtime is off
   the table.
2. **A crawler and a link preview must see real content.** A portfolio that
   renders to an empty `<div id="root">` does not get indexed and does not
   produce a card when someone pastes it into Slack.
3. **It has to feel designed.** Motion, a canvas hero, a horizontal project
   shelf — none of which may cost the first paint.

The answer is *prerender everything, hydrate afterwards*. The build renders each
route to real HTML with React's SSR renderer, writes it as its own directory,
and the client bundle attaches to that markup instead of replacing it.

```
npm run build
  │
  ├─ tsc -b                                  typecheck
  ├─ vite build                              client bundle → dist/
  ├─ vite build --ssr src/entry-server.tsx   SSR bundle    → dist-ssr/
  └─ node scripts/prerender.mjs              HTML + sitemap + robots + 404
```

`scripts/prerender.mjs` asks `entry-server.tsx` for the route list — which is
itself derived from the MDX files on disk — renders each one, rewrites its
`<head>` with per-route metadata, injects the security policy, and writes:

```
dist/index.html
dist/projects/index.html
dist/projects/qwen-vl-angiography/index.html
dist/blog/what-comments-do-to-a-model/index.html
dist/404.html            ← the not-found route, prerendered too
dist/sitemap.xml
dist/robots.txt
dist/.nojekyll
```

So `/blog/what-comments-do-to-a-model/` survives a hard refresh — no hash
routing, no redirect hack, no 404-as-index trick.

### Decisions worth knowing about

**Per-route `<head>`, rewritten at build time.** Every prerendered page used to
carry the one title baked into `index.html`, so twelve pages looked identical to
a crawler. `src/lib/seo.ts` owns the metadata; the prerender step asks it for
each route and rewrites the title, description, canonical, OG and Twitter tags
per file.

**Covers stay real files.** `vite.config.ts` overrides `assetsInlineLimit` so
`cover.svg` and `poster.svg` are never inlined as `data:` URIs — an `og:image`
needs a fetchable URL, and a data URI silently breaks link previews. The 38 tech
icons *are* inlined, which is what the threshold is for.

**Theme before first paint.** A small inline script in `index.html` reads
`localStorage` and stamps `data-theme` on `<html>` before the bundle loads, so
there is no flash of the wrong palette. `ThemeProvider` syncs React's copy after
mount rather than owning the value.

**A failsafe for a bundle that never boots.** The pre-animation hidden state is
scoped to `html.js`. If nothing sets `data-booted` within 4s, the class is
dropped and the prerendered content stays readable.

**Base path resolved in CI.** `.github/workflows/deploy.yml` sets `BASE_PATH` to
`/` for a repo named `<user>.github.io` and `/<repo>/` for anything else. The
router basename and `site.links.cv` both read `import.meta.env.BASE_URL`, so the
same source works either way.

---

## How the data is split

Content lives in exactly three places, and the split is by *who edits it and how
often*, not by type.

### `src/data/` — structured facts, hand-edited

Plain TypeScript modules, each a typed array or record. No CMS, no fetch, no
runtime cost: they compile straight into the bundle and the prerendered HTML.

| Module | Holds | Notes |
| --- | --- | --- |
| `site.ts` | Name, role, tagline, location, availability, links, nav, hero stats | The single source of truth for identity |
| `technologies.ts` | The stack, grouped | `marqueeTech` is the same list flattened for the ribbon — derived, never duplicated |
| `experience.ts` | Internships, newest first | Company logos imported as modules from `src/assets/logos/` |
| `hackathons.ts` | Competitions | `editions` lets one row count as more than one entry, so the headline total cannot drift from the list |
| `certificates.ts` | Certifications, grouped by issuer | Section total is summed from the groups |
| `detections.ts` | Bounding boxes for the hero's mock detector | Fractions of the hero crop — re-measure if the crop changes |
| `techIcons.ts` | Brand SVG paths | **Generated** by `npm run icons`; nothing from `simple-icons` ships to the browser |
| `conceptIcons.ts` | Line diagrams for techniques with no logo | Hand-drawn — a method is not a product, and the glyph says so |
| `heroMosaic.ts` | Base64 triangle colour table | **Generated** by `npm run hero` |

Rule of thumb: if a component needs a number that a data module already implies,
it derives it (`certificateGroups.reduce(…)`, `hackathons.reduce(…)`) rather
than restating it. The hero `stats` in `site.ts` are the one deliberate
exception — they cover work that is not all published here.

### `src/content/` — long-form, one folder per entry

```
src/content/projects/my-project/
  index.mdx     ← `export const meta` + the case study itself
  cover.svg     ← 3:2, homepage card and article header
  poster.svg    ← 9:16, the reel's still frame
  reel.mp4      ← optional
```

`src/content/index.ts` picks these up with `import.meta.glob(…, { eager: true })`
and turns them into sorted `ContentEntry[]`. **There is no registry to update.**
Adding a folder with an `index.mdx` gives you: a card on the homepage (if
`featured`), a row on the index page, a route, a prerendered HTML file, a
sitemap entry, and per-route `<head>` metadata. `src/content/types.ts` is the
contract every `meta` block satisfies.

Blog posts are the same shape minus the reel, with `date` as `YYYY-MM-DD`
instead of `YYYY`. The newest post is automatically the featured one on `/blog`.

### `src/lib/` — pure logic, no JSX

`seo.ts` (per-route metadata), `format.ts` (date formatting), `motion.ts`
(easing curves and media-query guards), `mailto.ts` (address obfuscation).

### Components, by role

```
components/
  layout/    Header, Footer, ScrollProgress     — present on every route
  pages/     Home, ProjectsIndex, BlogIndex, Article, NotFound
  sections/  Hero, Work, Hackathons, Experience, Certificates,
             Writing, Stack, TechRibbon, Contact
  motion/    Reveal, SplitLines, CoverReveal, Ticker
  ui/        Container, SectionHeader, PageIntro, TechIcon, MailLink,
             CallToAction, Terminal, ProjectRail, HeroMosaic, ContourField,
             ThemeToggle
```

`sections/` are page-specific compositions; `ui/` and `motion/` are reusable and
know nothing about the content. `Contact` is shared rather than copied — the
homepage and any future index page render the same component with a different
section number.

---

## Libraries, and why each one

| | Why |
| --- | --- |
| **React 19** | `renderToString` + `hydrateRoot` is the whole prerender strategy. |
| **React Router 7** | `BrowserRouter` on the client, `StaticRouter` in the SSR bundle, same tree. Real URLs, which the static-file layout depends on. |
| **Vite 8** | Two builds (client + SSR) from one config, and `import.meta.glob` is what makes the content directory self-registering. |
| **Tailwind CSS v4** | Via `@tailwindcss/vite`. Design tokens are CSS custom properties in `index.css`, so both themes are one variable swap and the canvas components can read the palette at runtime. |
| **MDX** (`@mdx-js/rollup`) | Articles are components. Prose stays markdown, but a case study can drop in a chart or a comparison table without a shortcode system. |
| **Anime.js v4** | Its `onScroll()` autoplay driver replaces hand-rolled IntersectionObserver bookkeeping in every reveal, and it can animate a plain JS object — which is how the `clip-path` wipe stays cheap. |
| **sharp**, **simple-icons** | Build-time only. Neither ships to the browser: they generate `heroMosaic.ts` and `techIcons.ts`. |

No state manager, no data-fetching library, no component library, no icon
runtime. There is no server and no mutable state — the whole app is a pure
function of files on disk.

### Responsive strategy

Tailwind's breakpoints do the layout, but two components branch on **input
capability rather than width**, which is the part worth copying:

- `ProjectRail` picks its mode from `(min-width: 768px) and (pointer: fine)`.
  With a mouse it is a *pinned* shelf: the section is made taller than the
  viewport by exactly the rail's travel and its contents are `position: sticky`,
  so ordinary page scrolling moves the shelf sideways. No wheel interception, no
  `preventDefault` — scrollbars and keyboard paging keep working. On touch it is
  native horizontal overflow with snap points, because a finger already does the
  right thing and pinning a tall section on a phone fights the dynamic viewport.
- `HeroMosaic` gates its hover interaction behind `(hover: hover) and
  (pointer: fine)` and falls back to tap-to-toggle.

Card sizing lives in `.reel-card` and is driven by height so a card always fits
a pinned viewport, but bounded by viewport width too — otherwise a tall phone
produces a card wider than the screen.

`prefers-reduced-motion` is honoured everywhere: fades survive, every positional
move is dropped, and the project reels fall back to their poster stills.

---

## Motion

Curves and durations follow the design-engineering standards vendored in
`.claude/skills/` (from [emilkowalski/skills](https://github.com/emilkowalski/skills)):

- `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, `cubic-bezier(0.77, 0, 0.175, 1)`
  for on-screen movement. Never `ease-in`.
- UI feedback under 300ms; only editorial reveals run longer.
- Only `transform`, `opacity` and `clip-path` are animated.

| Component | Job |
| --- | --- |
| `Reveal` | Scroll-triggered fade/rise, optionally staggering its children |
| `SplitLines` | Headline lines sliding up from behind a clipping mask |
| `CoverReveal` | Cover wiping in via `clip-path` while the image settles from an over-scale |
| `Ticker` | Number counting up when the stat enters the viewport |

**The hero plate** (`HeroMosaic`) is a canvas, not a video. The low-poly artwork
is re-cut into triangles that flip in a diagonal wave, each starting as a
greyscale ghost mixed toward the page colour — so the portrait grows out of the
paper rather than out of a grey box — then hands over to the full-resolution
WebP. Because the ghost is derived from the theme's tokens at runtime, the intro
looks right in both palettes. Pointing at it runs a mock object detector: a scan
sweep, then staggered COCO-style boxes, driven entirely by CSS off one
`data-detect` attribute, because hover toggles fast and transitions retarget
mid-flight where a keyframe animation would restart.

**The contact terminal** is a link tree you can type at. Commands live in one
`commands` record in `Terminal.tsx`; `help` is generated from that record so it
cannot drift, and `suggest: true` also puts a command in the chip row. It stays
dark in both themes on purpose — a terminal that follows the page into a light
palette stops reading as a terminal.

Two things `ProjectRail` must never regain: a persistent `will-change` on any
ancestor, and a `<Reveal>` wrapper. Both leave a transform on an ancestor, which
creates a containing block and breaks the sticky positioning.

---

## Security notes

A static site has a small attack surface, but not an empty one.

**The email address is never in a scrapable artefact.** It is stored in
`site.ts` as base64 of its own reversal, decoded only by `src/lib/mailto.ts`,
and only in the browser after mount or inside an event handler. `useEmail()`
returns `null` during prerender and on the first client render, so no
prerendered file and no `grep` over the JS bundle yields an address. Links go to
Gmail's compose window rather than the `mailto:` protocol — which also means
they work for visitors with no mail client registered. This stops bulk
harvesting, not a determined human; that is the intended trade.

**A Content Security Policy is generated at build time.** GitHub Pages sets no
response headers, so the policy ships as a `<meta>` injected by the prerender
step. It is `default-src 'none'` with an explicit allowlist, and the hash for
the inline theme script is computed from the built HTML rather than written by
hand, so it cannot go stale. `frame-ancestors` and HSTS are unavailable over
`<meta>` — that is a hosting limitation, not an oversight.

**Every outbound link carries `rel="noreferrer noopener"`**, and
`<meta name="referrer" content="strict-origin-when-cross-origin">` keeps paths
out of referrer headers site-wide.

**Known trade-off:** fonts load from Google Fonts, which exposes visitor IPs to
a third party. Self-hosting the three families under `public/fonts/` would
remove that and one round-trip with it.

---

## Commands

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run covers
```

Regenerates the placeholder art: `cover.svg` for every entry, plus a dark
vertical `poster.svg` for each project's reel.

```bash
npm run icons
```

Bakes the brand marks the site uses out of `simple-icons` into
`src/data/techIcons.ts`. Add a label to the `MAP` in
`scripts/generate-tech-icons.mjs` and re-run; anything unmapped renders as a
monogram chip.

```bash
npm run hero
```

Rebuilds the hero plate from `my_assets/target_hero.png` — the crop, the
delivered WebP, and the triangle colour table. Re-measure `src/data/detections.ts`
afterwards, since those boxes are fractions of the crop.

---

## Where to edit content

| What | Where |
| --- | --- |
| Name, tagline, links, availability, hero stats | `src/data/site.ts` |
| Nav items | `src/data/site.ts` (`navigation`) |
| Email address | `src/data/site.ts` (`emailObfuscated` — regeneration command is in the comment) |
| Tech stack table + marquee | `src/data/technologies.ts` |
| Hackathons / certificates / experience | `src/data/*.ts` |
| Hero detection boxes | `src/data/detections.ts` |
| Project case studies | `src/content/projects/<slug>/index.mdx` |
| Blog posts | `src/content/blog/<slug>/index.mdx` |
| CV PDF | `public/resume.pdf` |
| Terminal commands | `src/components/ui/Terminal.tsx` |

Anything still reading `PLACEHOLDER` is meant to be replaced.

## Deploying

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

**One-time setup (required):** open the GitHub repo → **Settings → Pages →
Build and deployment → Source → GitHub Actions**, then save. Until that is set,
every deploy fails at `configure-pages` with two errors
(`Get Pages site failed` + `HttpError: Not Found`) even though `npm run build`
succeeds.

After the first green run the site is at
`https://janbancerewicz.github.io/portfolio/`. Nested routes
(`/projects/...`, `/blog/...`) work because the build prerenders each path to
a real `index.html` and CI sets `BASE_PATH=/portfolio/` for asset + router
URLs. Locally `BASE_PATH` defaults to `/`, so `http://localhost:5173/projects/...`
keeps working without changes.

`SITE_URL` is derived in CI from the owner/repo name (canonicals, `og:image`,
sitemap). Override it only if you put a custom domain in front.
