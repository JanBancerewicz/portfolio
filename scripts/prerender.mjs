/**
 * Static site generation for GitHub Pages.
 *
 * GitHub Pages serves files, not routes — it 404s on any path that has no
 * physical file. This step renders every route to HTML and writes it as
 * `<route>/index.html`, so `/blog/some-post/` is a real directory on disk and
 * works on a hard refresh, with no hash routing and no redirect hack.
 *
 * Run via `npm run build`, after the client and SSR bundles are built.
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const dist = join(root, "dist");
const ssrDist = join(root, "dist-ssr");

const template = readFileSync(join(dist, "index.html"), "utf8");
const { render, routes } = await import(
  pathToFileURL(join(ssrDist, "entry-server.js")).href
);

const MARKER = '<div id="root"></div>';
if (!template.includes(MARKER)) {
  throw new Error(`prerender: could not find ${MARKER} in dist/index.html`);
}

for (const route of routes) {
  const html = template.replace(MARKER, `<div id="root">${render(route)}</div>`);
  const outDir = route === "/" ? dist : join(dist, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  console.log(`prerendered ${route}`);
}

// GitHub Pages serves 404.html for anything unmatched. Render the not-found
// route into it rather than copying the homepage, so the static markup matches
// what React hydrates to.
writeFileSync(
  join(dist, "404.html"),
  template.replace(MARKER, `<div id="root">${render("/__not-found__")}</div>`),
  "utf8",
);

// Stop GitHub Pages running the output through Jekyll (which drops _-prefixed
// files, among other surprises).
writeFileSync(join(dist, ".nojekyll"), "", "utf8");

rmSync(ssrDist, { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes`);
