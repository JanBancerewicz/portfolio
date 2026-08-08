/**
 * Resolve a wallpaper id or asset path into SVG markup for the cover canvas.
 */

import { existsSync, readFileSync } from "node:fs";
import { extname, isAbsolute, join, relative } from "node:path";
import { PRESETS } from "./cover-canvas.mjs";
import { wallpaper, WALLPAPER_IDS } from "./cover-wallpapers.mjs";

/**
 * @param {string} bg — wallpaper id or repo-relative / absolute asset path
 * @param {string} outDir — content folder (for relative path bookkeeping)
 * @param {string} root — repo root
 * @param {{ w?: number, h?: number }} [size]
 */
export function resolveBackground(
  bg,
  outDir,
  root,
  { w = PRESETS.standard.width, h = PRESETS.standard.height } = {},
) {
  const isAsset =
    typeof bg === "string" &&
    (bg.includes("/") || /\.(svg|png|jpe?g|webp)$/i.test(bg));

  if (!isAsset) {
    if (!WALLPAPER_IDS.includes(bg)) {
      throw new Error(
        `Unknown bg "${bg}". Use an id (${WALLPAPER_IDS.join(", ")}) or a path.`,
      );
    }
    return wallpaper(bg, { w, h });
  }

  const abs = isAbsolute(bg) ? bg : join(root, bg);
  if (!existsSync(abs)) {
    throw new Error(`Background asset not found: ${bg} (resolved ${abs})`);
  }

  const ext = extname(abs).toLowerCase();
  if (ext === ".svg") {
    const raw = readFileSync(abs, "utf8");
    const inner = raw
      .replace(/<\?xml[^>]*>/i, "")
      .replace(/<!DOCTYPE[^>]*>/i, "")
      .replace(/<svg[^>]*>/i, "")
      .replace(/<\/svg>\s*$/i, "");
    return `<g>${inner}</g>`;
  }

  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";
  const b64 = readFileSync(abs).toString("base64");
  void relative(outDir, abs);
  return `<image href="data:${mime};base64,${b64}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/>`;
}
