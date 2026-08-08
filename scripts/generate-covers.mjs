/**
 * Cover art generator — thin CLI over shared editorial presets.
 *
 * Outputs (same recipe, different canvas):
 *   cover.svg            standard 1200×800   (blog + project)
 *   cover-featured.svg   featured 1600×800   (project extras → #work lead)
 *   cover-wide.svg       wide 1350×555       (blog → /blog ladder rows)
 *   poster.svg           900×1600            (project rail)
 *
 * Config: scripts/lib/cover-targets.mjs — not MDX. See HELPERS.md.
 *
 *   node scripts/generate-covers.mjs
 *   npm run covers
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRESETS } from "./lib/cover-canvas.mjs";
import { editorialCover, editorialPoster } from "./lib/cover-editorial.mjs";
import { blogTargets, projectTargets } from "./lib/cover-targets.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Declare every file a target should emit. Variants differ only by preset /
 * mark — one renderer, no per-section forks.
 *
 * @param {"project" | "blog"} kind
 * @param {{ extras?: string[] }} entry
 */
function jobsFor(kind, entry) {
  const extras = new Set(entry.extras ?? []);

  if (kind === "project") {
    /** @type {Array<{ file: string, render: () => string, note: string }>} */
    const jobs = [
      {
        file: PRESETS.standard.file,
        note: `project ${PRESETS.standard.width}×${PRESETS.standard.height}`,
        render: () =>
          editorialCover(entry, root, { mark: "project", preset: "standard" }),
      },
      {
        file: PRESETS.poster.file,
        note: `poster ${PRESETS.poster.width}×${PRESETS.poster.height}`,
        render: () => editorialPoster(entry, root),
      },
    ];
    if (extras.has("featured")) {
      jobs.push({
        file: PRESETS.featured.file,
        note: `featured ${PRESETS.featured.width}×${PRESETS.featured.height}`,
        render: () =>
          editorialCover(entry, root, { mark: "project", preset: "featured" }),
      });
    }
    return jobs;
  }

  return [
    {
      file: PRESETS.standard.file,
      note: `blog ${PRESETS.standard.width}×${PRESETS.standard.height}`,
      render: () => editorialCover(entry, root, { preset: "standard" }),
    },
    {
      file: PRESETS.wide.file,
      note: `wide ${PRESETS.wide.width}×${PRESETS.wide.height}`,
      render: () => editorialCover(entry, root, { preset: "wide" }),
    },
  ];
}

function writeEntry(kind, entry) {
  const outDir = join(root, entry.dir);
  mkdirSync(outDir, { recursive: true });

  for (const job of jobsFor(kind, entry)) {
    writeFileSync(join(outDir, job.file), job.render(), "utf8");
    console.log(`wrote ${entry.dir}/${job.file} (${entry.bg}, ${job.note})`);
  }
}

for (const entry of projectTargets) writeEntry("project", entry);
for (const entry of blogTargets) writeEntry("blog", entry);
