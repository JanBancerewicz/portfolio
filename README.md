# Portfolio — Jan Bancerewicz

Editorial one-page portfolio with a project archive and a blog, statically
generated and deployed to GitHub Pages.

React 19 · TypeScript · Vite · Tailwind CSS v4 · MDX · Anime.js v4

## Commands

```bash
npm run dev
```

```bash
npm run build
```

`build` runs four steps: typecheck, client bundle, SSR bundle, then
`scripts/prerender.mjs`, which renders every route to HTML.

```bash
npm run covers
```

Regenerates the placeholder art: `cover.svg` for every entry, plus a dark
vertical `poster.svg` for each project's reel.

```bash
npm run icons
```

Bakes the brand marks the site uses out of `simple-icons` and into
`src/data/techIcons.ts`, so nothing from that package ships to the browser. Add
a label to the `MAP` in `scripts/generate-tech-icons.mjs` and re-run to support
a new technology; anything unmapped renders as a monogram chip.

```bash
npm run hero
```

Rebuilds the hero plate from `my_assets/target_hero.png` — the crop, the
delivered WebP, and the triangle colour table. Change `CROP` or `COLS` in
`scripts/generate-hero-mosaic.mjs` and re-run; re-measure
`src/data/detections.ts` afterwards, since those boxes are fractions of the
crop.

## Routing on GitHub Pages

GitHub Pages serves files, not routes — it 404s on any path without a physical
file. The prerender step writes each route as its own directory:

```
dist/index.html
dist/projects/index.html
dist/projects/qwen-vl-angiography/index.html
dist/blog/what-comments-do-to-a-model/index.html
dist/404.html
dist/.nojekyll
```

So `/blog/what-comments-do-to-a-model/` survives a hard refresh, with no hash
routing and no redirect hack. The HTML is fully rendered, so crawlers and link
previews see real content; React hydrates it on load.

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. It
sets `BASE_PATH` automatically: `/` for a repo named `<user>.github.io`,
`/<repo>/` for anything else. Enable it once under **Settings → Pages → Source →
GitHub Actions**.

## Where to edit content

| What | Where |
| --- | --- |
| Name, tagline, email, links, availability, stats | `src/data/site.ts` |
| Nav items | `src/data/site.ts` (`navigation`) |
| Tech stack table + marquee | `src/data/technologies.ts` |
| Hackathons | `src/data/hackathons.ts` |
| Certificates (grouped by issuer) | `src/data/certificates.ts` |
| Hero detection boxes, traits, "developer" label | `src/data/detections.ts` |
| Project case studies | `src/content/projects/<slug>/index.mdx` |
| Blog posts | `src/content/blog/<slug>/index.mdx` |
| CV PDF | `public/resume.pdf` |

Everything currently reading `PLACEHOLDER` is meant to be replaced. Nothing else
needs touching — routes, listings and the prerender manifest are all derived
from the MDX files, so adding a folder with an `index.mdx` and a `cover.svg` is
enough to publish a new project or post.

### Adding a project

One folder, one document, no registry to update:

```
src/content/projects/my-project/
  index.mdx     ← meta + the case study itself
  cover.svg     ← 3:2, used on the homepage and the article header
  poster.svg    ← 9:16, the reel's still frame
  reel.mp4      ← optional, see below
```

`meta` drives everything. `tags` become the stack icons on the reel;
`reelCaption` is the short-style line under the title (falls back to `summary`);
`featured: true` pulls the entry into the homepage showcase.

**Reels.** The rail is built for ~8s vertical clips — muted, autoplaying,
looping, no controls, so nothing breaks the immersion. Drop an `.mp4` beside
`index.mdx`, import it, and set `reel`. Until then the poster shows in its
place, so the rail never looks unfinished. Under `prefers-reduced-motion` the
poster is used regardless — an unpausable looping video is exactly the motion
that setting exists to suppress.

### Adding a post

Same shape, minus the reel: `src/content/blog/my-post/index.mdx` plus a
`cover.svg`. `date` (`YYYY-MM-DD`) orders the list and the newest post is
automatically the featured one on `/blog`.

### The contact terminal

The contact section carries a small shell instead of a booking widget — an
interactive link tree. Every route out of the page (email, LinkedIn, ORCID,
GitHub, CV, and the two index pages) is a command, and the same set is one click
away in the chip row underneath for anyone who would rather not type.

Commands live in one `commands` record in `src/components/ui/Terminal.tsx`;
adding one is a single entry, and setting `suggest: true` also puts it in the
chip row. `help` is generated from that record, so it cannot drift. External
links open in a new tab with `rel="noreferrer noopener"`; `projects` and `blog`
navigate through React Router rather than reloading.

It is dark in both themes on purpose — a terminal that follows the page into a
light palette stops reading as a terminal.

## Motion

Animation is built on [Anime.js v4](https://animejs.com) and follows the
design-engineering standards vendored in `.claude/skills/` (from
[emilkowalski/skills](https://github.com/emilkowalski/skills)):

- Custom easing curves — `cubic-bezier(0.23, 1, 0.32, 1)` for entrances,
  `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement. Never `ease-in`.
- UI feedback under 300ms; only editorial reveals run longer.
- Only `transform`, `opacity` and `clip-path` are animated.
- Hover motion is gated behind `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion` keeps the fades and drops every positional move.

The reusable pieces live in `src/components/motion/`:

| Component | Job |
| --- | --- |
| `Reveal` | Scroll-triggered fade/rise, optionally staggering its children |
| `SplitLines` | Headline lines sliding up from behind a clipping mask |
| `CoverReveal` | Cover image wiping in via `clip-path` while it settles from an over-scale |
| `Ticker` | Number counting up when the stat enters the viewport |

### The project rail

`/projects` is a horizontal shelf of vertical reels — pick-your-level rather
than a list. It has two modes, chosen by input device rather than width alone:

**Pinned (mouse/trackpad).** The section is made taller than the viewport by
exactly the rail's travel, and its contents are `position: sticky`. Ordinary
page scrolling therefore holds the shelf in place and moves it sideways
instead. No wheel interception and no `preventDefault`, which matters: it
engages wherever the pointer happens to be rather than only over the rail, and
scrollbars and keyboard paging keep working. The arrows and "back to start"
scroll the *page*, because the page is what drives the rail.

**Swipe (touch).** Native horizontal overflow with snap points. A finger
already does the right thing here, and pinning a tall section on a phone fights
the dynamic viewport for no gain.

Card sizing lives in `.reel-card`: driven by height so a card always fits a
pinned viewport alongside the controls, but bounded by viewport width too —
otherwise a tall phone produces a card wider than the screen and the next one
stops peeking. The 9:13 frame is a crop of the 9:16 reel, which `object-cover`
handles.

The rail is the **last thing on the page**: no contact block after it, and
`App` withholds the footer for this route via `ROUTES_WITHOUT_FOOTER`. Because
the pinned section is exactly as tall as the rail's travel, the document ends
the moment the shelf does — a fast flick lands on the final reel instead of
shooting past it. If you ever add something below the rail, that property is
gone.

Two things this component must not regain: a persistent `will-change` on any
ancestor, and a `<Reveal>` wrapper. Both leave a transform on an ancestor,
which creates a containing block and breaks the sticky positioning the pinned
mode depends on.

`<Contact>` is still shared rather than copied — the homepage and any future
index page render the same component with a different section number. It is
simply not used on `/projects`, because nothing may follow the rail.

### The hero plate

`HeroMosaic` is a canvas, not a video. The low-poly artwork is re-cut into a
grid of triangles that flip in a diagonal wave from the bottom-left, each one
starting as a greyscale ghost mixed toward the page colour — so the portrait
grows out of the paper instead of out of a grey box — and landing on its real
colour halfway through the flip. It hands over to the full-resolution WebP at
the end, which is what stays on screen. Because the ghost is derived from the
theme's tokens at runtime, the intro looks right in both light and dark.

Only the triangles inside the wave are drawn per frame; everything behind and
ahead of it is a single clipped `drawImage`.

Pointing at the plate runs a mock object detector over it: a scan sweep, then
staggered bounding boxes with COCO-style labels. It is pure CSS off one
`data-detect` attribute — hover toggles fast and often, and transitions
retarget mid-flight where a JS timeline or keyframes would restart. Touch
devices tap to toggle instead.

The pre-animation hidden state is scoped to `html.js` and released by a failsafe
in `index.html`, so prerendered content stays readable if the bundle never boots.
