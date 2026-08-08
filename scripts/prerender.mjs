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

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const dist = join(root, "dist");
const ssrDist = join(root, "dist-ssr");

const template = readFileSync(join(dist, "index.html"), "utf8");
const { render, routes, metaFor } = await import(
  pathToFileURL(join(ssrDist, "entry-server.js")).href
);

const MARKER = '<div id="root"></div>';
if (!template.includes(MARKER)) {
  throw new Error(`prerender: could not find ${MARKER} in dist/index.html`);
}

/**
 * Content Security Policy, delivered as a `<meta>`.
 *
 * GitHub Pages serves files and sets no response headers, so a meta tag is the
 * only channel available — which rules out `frame-ancestors` and HSTS, but not
 * the parts that matter for a static site: nothing may load or connect
 * anywhere we did not name, and no script may run unless it is a build output
 * or one of the inline blocks hashed below.
 *
 * The hashes are computed from the built HTML rather than written by hand, so
 * the policy cannot go stale when the theme bootstrap in `index.html` changes
 * or Vite adds an inline block of its own.
 */
function cspFor(html) {
  const inline = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map(([, body]) => `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);

  return [
    "default-src 'none'",
    `script-src 'self' ${inline.join(" ")}`.trim(),
    // Element `style` attributes are what components write for transforms and
    // aspect ratios; those need 'unsafe-inline' and cannot be hashed.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    // `data:` covers the tech icons Vite inlines under its 4kB threshold.
    "img-src 'self' data:",
    "connect-src 'self'",
    "manifest-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
    "object-src 'none'",
    "frame-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/**
 * Both policies have to be parsed before anything they govern, so they go
 * directly after `<meta charset>` rather than at the end of the head.
 */
function withSecurityMeta(html) {
  const anchor = '<meta charset="UTF-8" />';
  const meta = [
    `<meta http-equiv="Content-Security-Policy" content="${cspFor(html)}" />`,
    // Outbound clicks (LinkedIn, ORCID, papers) leak the origin, never the path.
    '<meta name="referrer" content="strict-origin-when-cross-origin" />',
  ].join("\n    ");

  return html.replace(anchor, `${anchor}\n    ${meta}`);
}

/**
 * Where the site will actually be served from. Needed for canonical URLs and
 * absolute OG image paths — both are ignored by crawlers when relative.
 */
const SITE_URL = (process.env.SITE_URL ?? "https://janbancerewicz.github.io/portfolio")
  .replace(/\/+$/, "");

// Built asset paths already carry the base path, so they resolve against the
// origin rather than against SITE_URL — otherwise `/portfolio/` lands twice.
const ORIGIN = new URL(SITE_URL).origin;

const escape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absolute = (path) => {
  if (!path) return null;
  if (/^https?:/.test(path)) return path;
  // A `data:` URI cannot be an og:image — emit nothing rather than something broken.
  if (path.startsWith("data:")) return null;
  return `${ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
};

/**
 * Rewrites the shared head with this route's own metadata. Without it every
 * page ships the template's title and description, so search results cannot
 * tell twelve pages apart and no article can rank on its own title.
 */
function withHead(html, route, meta) {
  const canonical = `${SITE_URL}${route === "/" ? "/" : `${route}/`}`;
  const image = absolute(meta.image);

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:type"[^>]*\/>/,
      `<meta property="og:type" content="${meta.type}" />`,
    )
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${escape(meta.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escape(meta.description)}" />`,
    );

  const extra = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    image ? `<meta property="og:image" content="${image}" />` : "",
    image ? `<meta name="twitter:image" content="${image}" />` : "",
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    meta.published
      ? `<meta property="article:published_time" content="${meta.published}" />`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return out.replace("</head>", `  ${extra}\n  </head>`);
}

for (const route of routes) {
  const html = withSecurityMeta(
    withHead(
      template.replace(MARKER, `<div id="root">${render(route)}</div>`),
      route,
      metaFor(route),
    ),
  );
  const outDir = route === "/" ? dist : join(dist, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  console.log(`prerendered ${route}`);
}

// A sitemap and a robots.txt are the two files a crawler looks for first.
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => {
      const loc = `${SITE_URL}${route === "/" ? "/" : `${route}/`}`;
      const meta = metaFor(route);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${meta.published ?? today}</lastmod>\n  </url>`;
    })
    .join("\n")}\n</urlset>\n`,
  "utf8",
);

writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "utf8",
);
console.log("wrote sitemap.xml + robots.txt");

// GitHub Pages serves 404.html for anything unmatched. Render the not-found
// route into it rather than copying the homepage, so the static markup matches
// what React hydrates to.
writeFileSync(
  join(dist, "404.html"),
  withSecurityMeta(
    template.replace(MARKER, `<div id="root">${render("/__not-found__")}</div>`),
  ),
  "utf8",
);

// Stop GitHub Pages running the output through Jekyll (which drops _-prefixed
// files, among other surprises).
writeFileSync(join(dist, ".nojekyll"), "", "utf8");

rmSync(ssrDist, { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes`);
