/**
 * Generates cover art for projects and blog posts.
 *
 * Projects: deterministic abstract compositions (+ vertical poster.svg).
 * Blog: Altari-style editorial covers — wallpaper + channel mute + frost +
 *       short title / category / tag. Config lives in `blogTargets` below
 *       (not in MDX). See HELPERS.md for how to add a post cover.
 *
 *   node scripts/generate-covers.mjs
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, extname, isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { wallpaper, WALLPAPER_IDS } from "./lib/cover-wallpapers.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

let PAPER = "#e6eaed";
let INK = "#10161c";
/** Cool blue-white — avoids the warm muddy grey frost. */
const PAPER_FROST = "#f3f6fa";
const FROST_COOL = "#e8eef8";

/**
 * Altari-style accent ids — darker variants of their card washes.
 * Drives corner gradient overlay + last title word + category/tag color.
 */
const ACCENTS = {
  blue: "#2f6fd4",
  purple: "#6b4fd8",
  orange: "#c65d2e",
  mint: "#1a9a88",
  gold: "#b8860b",
  red: "#c43c4a",
};
const ACCENT_IDS = Object.keys(ACCENTS);

/** Vertical posters are drawn dark, so overlaid white reel text reads cleanly. */
const POSTER_PAPER = "#0f141b";
const POSTER_INK = "#e2e7ec";

const W = 1200;
const H = 800;

const FONT =
  "'Inter Tight', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif";

/** Deterministic 32-bit PRNG so a slug always renders the same cover. */
function seeded(slug) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

const compositions = [
  (rand) => {
    const cx = 240 + rand() * 200;
    const cy = H - 120;
    let out = "";
    for (let i = 1; i <= 11; i += 1) {
      const r = i * 78;
      const stroke = i % 4 === 0 ? ACCENTS.blue : INK;
      const width = i % 4 === 0 ? 10 : 1.5;
      out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${width}" opacity="${i % 4 === 0 ? 1 : 0.5}"/>`;
    }
    return out;
  },
  (rand) => {
    const accentIndex = 4 + Math.floor(rand() * 14);
    let out = "";
    for (let i = 0; i < 26; i += 1) {
      const x = -400 + i * 84;
      const isAccent = i === accentIndex;
      out += `<path d="M${x} ${H + 40} L${x + 520} -40" fill="none" stroke="${isAccent ? ACCENTS.blue : INK}" stroke-width="${isAccent ? 46 : 2}" opacity="${isAccent ? 1 : 0.42}"/>`;
    }
    return out;
  },
  (rand) => {
    let out = "";
    for (let row = 0; row < 13; row += 1) {
      for (let col = 0; col < 20; col += 1) {
        const x = 60 + col * 58;
        const y = 60 + row * 58;
        out += `<circle cx="${x}" cy="${y}" r="4" fill="${INK}" opacity="0.42"/>`;
      }
    }
    const cx = 320 + rand() * 520;
    const cy = 260 + rand() * 260;
    out += `<circle cx="${cx}" cy="${cy}" r="180" fill="${ACCENTS.blue}"/>`;
    return out;
  },
  (rand) => {
    let out = "";
    for (let line = 0; line < 5; line += 1) {
      const baseline = 170 + line * 120;
      const amp = 28 + rand() * 70;
      const freq = 3 + rand() * 5;
      const phase = rand() * Math.PI * 2;
      let d = `M0 ${baseline}`;
      for (let x = 0; x <= W; x += 12) {
        const y =
          baseline + Math.sin((x / W) * freq * Math.PI * 2 + phase) * amp;
        d += ` L${x} ${y.toFixed(1)}`;
      }
      const isAccent = line === 2;
      out += `<path d="${d}" fill="none" stroke="${isAccent ? ACCENTS.blue : INK}" stroke-width="${isAccent ? 6 : 2}" opacity="${isAccent ? 1 : 0.4}"/>`;
    }
    return out;
  },
  (rand) => {
    let out = "";
    const accentStep = 1 + Math.floor(rand() * 4);
    for (let i = 0; i < 8; i += 1) {
      const inset = 60 + i * 46;
      out += `<rect x="${inset}" y="${inset * 0.62}" width="${W - inset * 2}" height="${H - inset * 1.24}" fill="none" stroke="${i === accentStep ? ACCENTS.blue : INK}" stroke-width="${i === accentStep ? 14 : 2}" opacity="${i === accentStep ? 1 : 0.4}"/>`;
    }
    out += `<rect x="${W - 320}" y="${H - 260}" width="220" height="160" fill="${ACCENTS.blue}"/>`;
    return out;
  },
  (rand) => {
    let out = "";
    const accentCol = Math.floor(rand() * 14);
    for (let i = 0; i < 14; i += 1) {
      const h = 90 + rand() * 520;
      const x = 60 + i * 79;
      out += `<rect x="${x}" y="${H - 60 - h}" width="52" height="${h}" fill="${i === accentCol ? ACCENTS.blue : INK}" opacity="${i === accentCol ? 1 : 0.32}"/>`;
    }
    return out;
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitTitle(coverTitle) {
  const parts = String(coverTitle).trim().split(/\s+/);
  if (parts.length === 1) return { lead: "", accent: parts[0] ?? "" };
  return {
    lead: parts.slice(0, -1).join(" "),
    accent: parts[parts.length - 1],
  };
}

/**
 * Mute wallpaper channels via feColorMatrix.
 * Accepts: "" (no mute), "r"|"g"|"b", or combos "rg"|"rb"|"gb"|"rgb".
 * Stronger than before — only applied to the wallpaper <g>, never accent/text.
 */
function muteMatrix(spec) {
  const s = String(spec ?? "")
    .toLowerCase()
    .replace(/[^rgb]/g, "");
  if (!s) return null;

  const muteR = s.includes("r");
  const muteG = s.includes("g");
  const muteB = s.includes("b");

  // Muted channel: crush (~0.42). Others stay near identity. Light bias = lift.
  const rr = muteR ? 0.62 : 1.0;
  const gg = muteG ? 0.62 : 1.0;
  const bb = muteB ? 0.62 : 1.0;
  const cross = 0.04;
  const bias = 0.05;

  return `${rr} ${cross} ${cross} 0 ${bias}  ${cross} ${gg} ${cross} 0 ${bias}  ${cross} ${cross} ${bb} 0 ${bias}  0 0 0 1 0`;
}

function resolveBackground(bg, outDir) {
  const isAsset =
    typeof bg === "string" &&
    (bg.includes("/") || /\.(svg|png|jpe?g|webp)$/i.test(bg));

  if (!isAsset) {
    if (!WALLPAPER_IDS.includes(bg)) {
      throw new Error(
        `Unknown bg "${bg}". Use an id (${WALLPAPER_IDS.join(", ")}) or a path.`,
      );
    }
    return wallpaper(bg, { w: W, h: H });
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
  // Prefer embedding so cover.svg stays portable relative to outDir.
  void relative(outDir, abs);
  return `<image href="data:${mime};base64,${b64}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>`;
}

function resolveAccent(accentId = "blue") {
  const id = String(accentId).toLowerCase();
  if (!ACCENTS[id]) {
    throw new Error(
      `Unknown accent "${accentId}". Use one of: ${ACCENT_IDS.join(", ")}`,
    );
  }
  return { id, color: ACCENTS[id] };
}

/**
 * Light accent wash: strong top-left, weaker other corners.
 * accent → transparent radial at each corner.
 */
function accentCornerWash(color) {
  return `
    <radialGradient id="accentTL" cx="0%" cy="0%" r="85%" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.85"/>
      <stop offset="35%" stop-color="${color}" stop-opacity="0.50"/>
      <stop offset="70%" stop-color="${color}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="accentTR" cx="100%" cy="0%" r="75%" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.65"/>
      <stop offset="40%" stop-color="${color}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="accentBL" cx="0%" cy="100%" r="70%" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.60"/>
      <stop offset="40%" stop-color="${color}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="accentBR" cx="100%" cy="100%" r="65%" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.50"/>
      <stop offset="45%" stop-color="${color}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`;
}

/**
 * Editorial copy — treatment is always emitted with the text itself.
 *
 * label: foreignObject + CSS `background` (white pill hugs content).
 *        `corner: "tl"|"br"` locks inset from that canvas corner.
 * title: SVG <text>, thin white stroke only (no fog). Last word = accent color.
 */
function editorialText({
  x,
  y,
  fontSize,
  fontWeight = 700,
  letterSpacing = "0",
  anchor = "start",
  content,
  fill = INK,
  accentColor,
  variant = "label",
  accentLineBreak = false,
  /** "tl" | "br" — fixed inset from that corner (labels only). */
  corner,
}) {
  const isTitle = variant === "title";

  if (isTitle) {
    const { lead, accent } =
      typeof content === "string" ? splitTitle(content) : content;
    const dy = Math.round(fontSize * 1.02);
    const markup =
      lead && accentLineBreak
        ? `<tspan x="${x}" dy="0" fill="${INK}">${escapeXml(lead)}</tspan>` +
          `<tspan x="${x}" dy="${dy}" fill="${accentColor}">${escapeXml(accent)}</tspan>`
        : lead
          ? `<tspan fill="${INK}">${escapeXml(lead)} </tspan><tspan fill="${accentColor}">${escapeXml(accent)}</tspan>`
          : `<tspan fill="${accentColor}">${escapeXml(accent)}</tspan>`;
    const strokeW = Math.max(1.5, Math.round(fontSize * 0.08));
    const baseline = y + Math.round(fontSize * 0.85);
    return `<text x="${x}" y="${baseline}" font-family="${FONT}" font-size="${fontSize}"
        font-weight="${fontWeight}" letter-spacing="${letterSpacing}"
        paint-order="stroke fill"
        stroke="#ffffff" stroke-width="${strokeW}" stroke-linejoin="round" stroke-linecap="round">${markup}</text>`;
  }

  const LABEL_INSET = 72;
  const color = fill;
  const padY = Math.round(fontSize * 0.42);
  const padX = Math.round(fontSize * 0.72);
  const pillH = Math.ceil(fontSize * 1.1 + padY * 2);
  const foH = pillH + 2;
  const foW = W - LABEL_INSET * 2;
  const foX = LABEL_INSET;
  // TL: top of FO = inset. BR: bottom of FO = H - inset (fixed corner).
  const isBr = corner === "br" || anchor === "end";
  const foY = isBr ? H - LABEL_INSET - foH : LABEL_INSET;
  const justify = isBr ? "flex-end" : "flex-start";
  const align = isBr ? "flex-end" : "flex-start";
  const inner = escapeXml(
    typeof content === "string" ? content : String(content),
  );

  return `<foreignObject x="${foX}" y="${foY}" width="${foW}" height="${foH}">
  <div xmlns="http://www.w3.org/1999/xhtml"
       style="display:flex;justify-content:${justify};align-items:${align};width:100%;height:100%;margin:0;padding:0;">
    <div style="display:inline-block;box-sizing:border-box;
      background:#ffffff;border-radius:999px;padding:${padY}px ${padX}px;
      font-family:${FONT};font-size:${fontSize}px;font-weight:${fontWeight};
      letter-spacing:${letterSpacing};color:${color};line-height:1.1;
      white-space:nowrap;">${inner}</div>
  </div>
</foreignObject>`;
}

function blogCover(entry) {
  const {
    coverTitle,
    category,
    tag,
    bg,
    muteChannel = "",
    accent: accentId = "blue",
    dir,
  } = entry;
  const { color: accentColor } = resolveAccent(accentId);
  const outDir = join(root, dir);
  const art = resolveBackground(bg, outDir);
  const label = escapeXml(coverTitle);
  const { lead, accent } = splitTitle(coverTitle);
  const muteValues = muteMatrix(muteChannel);

  // Previous base sizes: title 92, labels 22 → scaled.
  const titleSize = Math.round(92 * 1.5); // 138
  const labelSize = Math.round(22 * 1.5); // 33
  // Vertical start of the title block (nudge this to move the title up/down).
  const titleY = lead ? 200 : 260;

  const muteFilterDef = muteValues
    ? `<filter id="mute" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="${muteValues}"/>
    </filter>`
    : "";
  const wallpaperLayer = muteValues
    ? `<g filter="url(#mute)">${art}</g>`
    : `<g>${art}</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
  <defs>
    ${muteFilterDef}
    ${accentCornerWash(accentColor)}
    <linearGradient id="frost" x1="0" y1="0" x2="0.15" y2="1">
      <stop offset="0%" stop-color="${PAPER_FROST}" stop-opacity="0.18"/>
      <stop offset="55%" stop-color="${FROST_COOL}" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="${PAPER_FROST}" stop-opacity="0.3"/>
    </linearGradient>
  </defs>
  ${wallpaperLayer}
  <rect width="${W}" height="${H}" fill="url(#frost)"/>
  <rect width="${W}" height="${H}" fill="url(#accentTL)"/>
  <rect width="${W}" height="${H}" fill="url(#accentTR)"/>
  <rect width="${W}" height="${H}" fill="url(#accentBL)"/>
  <rect width="${W}" height="${H}" fill="url(#accentBR)"/>

  ${editorialText({
    fontSize: labelSize,
    letterSpacing: "0.12em",
    content: String(category).toUpperCase(),
    fill: accentColor,
    variant: "label",
    corner: "tl",
  })}

  ${editorialText({
    x: 48,
    y: titleY,
    fontSize: titleSize,
    letterSpacing: "-0.045em",
    content: { lead, accent },
    accentColor,
    variant: "title",
    accentLineBreak: true,
  })}

  ${editorialText({
    fontSize: labelSize,
    letterSpacing: "0.14em",
    content: String(tag).toUpperCase(),
    fill: accentColor,
    variant: "label",
    corner: "br",
  })}
</svg>
`;
}

function cover(slug, label, compositionIndex) {
  const rand = seeded(slug);
  const composition = compositions[compositionIndex % compositions.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <g>${composition(rand)}</g>
  <rect width="${W}" height="${H}" fill="none" stroke="${INK}" stroke-width="2" opacity="0.12"/>
</svg>
`;
}

function poster(slug, label, compositionIndex) {
  const rand = seeded(slug);
  const composition = compositions[compositionIndex % compositions.length];
  const pw = 900;
  const ph = 1600;
  const scale = ph / H;
  const offset = (W * scale - pw) / 2;

  const light = { paper: PAPER, ink: INK };
  PAPER = POSTER_PAPER;
  INK = POSTER_INK;
  const art = composition(rand);
  PAPER = light.paper;
  INK = light.ink;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pw} ${ph}" role="img" aria-label="${label}">
  <rect width="${pw}" height="${ph}" fill="${POSTER_PAPER}"/>
  <g transform="translate(${-offset.toFixed(1)} 0) scale(${scale.toFixed(4)})">${art}</g>
</svg>
`;
}

/**
 * Project covers — composition index assigned explicitly.
 * 0 arcs · 1 diagonals · 2 dot matrix · 3 waveform · 4 nested frames · 5 columns
 */
const projectTargets = [
  ["src/content/projects/hrv-mobile-ml", "hrv-mobile-ml", 3],
  ["src/content/projects/core-llm-comments", "core-llm-comments", 2],
  ["src/content/projects/qwen-vl-angiography", "qwen-vl-angiography", 0],
  ["src/content/projects/shelf-vision-pipeline", "shelf-vision-pipeline", 5],
  ["src/content/projects/jetson-yolo-boat", "jetson-yolo-boat", 1],
  ["src/content/projects/pricepoint", "pricepoint", 4],
];

/**
 * Blog editorial covers — source of truth for coverTitle / tag / bg.
 * MDX still only imports ./cover.svg; regenerate after editing this table.
 *
 * muteChannel: "" | "r"|"g"|"b" | combos "rg"|"rb"|"gb"|"rgb"
 *   — mutes only the wallpaper, not accent wash or text.
 */
const blogTargets = [
  {
    dir: "src/content/blog/reduce-claude-code-token-usage",
    coverTitle: "Cut Token Cost",
    category: "LLM tooling",
    tag: "CACHE",
    bg: "tokens",
    muteChannel: "bg",
    accent: "orange",
  },
  {
    dir: "src/content/blog/what-comments-do-to-a-model",
    coverTitle: "What Comments Do",
    category: "LLM interpretability",
    tag: "PROBE",
    bg: "neural",
    muteChannel: "r",
    accent: "purple",
  },
  {
    dir: "src/content/blog/beating-a-baseline-honestly",
    coverTitle: "Beat the Baseline",
    category: "Machine learning",
    tag: "EVAL",
    bg: "signal",
    muteChannel: "g",
    accent: "mint",
  },
  {
    dir: "src/content/blog/what-a-hackathon-actually-teaches-you",
    coverTitle: "What Not to Build",
    category: "Notes",
    tag: "BUILD",
    bg: "cogwheel",
    muteChannel: "gbr",
    accent: "blue",
  },
];

for (const [dir, slug, composition] of projectTargets) {
  const outDir = join(root, dir);
  mkdirSync(outDir, { recursive: true });

  writeFileSync(
    join(outDir, "cover.svg"),
    cover(slug, `${slug} placeholder cover`, composition),
    "utf8",
  );
  console.log(`wrote ${dir}/cover.svg`);

  writeFileSync(
    join(outDir, "poster.svg"),
    poster(slug, `${slug} placeholder poster`, composition),
    "utf8",
  );
  console.log(`wrote ${dir}/poster.svg`);
}

for (const entry of blogTargets) {
  const outDir = join(root, entry.dir);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "cover.svg"), blogCover(entry), "utf8");
  console.log(`wrote ${entry.dir}/cover.svg (${entry.bg})`);
}
