/**
 * Generates deterministic placeholder cover art for projects and blog posts.
 *
 * Each slug seeds a small PRNG, which picks one of a handful of editorial
 * compositions drawn only from the site palette. Swap any generated file for a
 * real screenshot whenever you have one — nothing else needs to change.
 *
 *   node scripts/generate-covers.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

let PAPER = "#e6eaed";
let INK = "#10161c";
const ACCENT = "#0073ff";

/** Vertical posters are drawn dark, so overlaid white reel text reads cleanly. */
const POSTER_PAPER = "#0f141b";
const POSTER_INK = "#e2e7ec";

const W = 1200;
const H = 800;

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
  // Concentric arcs cropped by the frame.
  (rand) => {
    const cx = 240 + rand() * 200;
    const cy = H - 120;
    let out = "";
    for (let i = 1; i <= 11; i += 1) {
      const r = i * 78;
      const stroke = i % 4 === 0 ? ACCENT : INK;
      const width = i % 4 === 0 ? 10 : 1.5;
      out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${width}" opacity="${i % 4 === 0 ? 1 : 0.5}"/>`;
    }
    return out;
  },

  // Diagonal rule field with one accent band.
  (rand) => {
    const accentIndex = 4 + Math.floor(rand() * 14);
    let out = "";
    for (let i = 0; i < 26; i += 1) {
      const x = -400 + i * 84;
      const isAccent = i === accentIndex;
      out += `<path d="M${x} ${H + 40} L${x + 520} -40" fill="none" stroke="${isAccent ? ACCENT : INK}" stroke-width="${isAccent ? 46 : 2}" opacity="${isAccent ? 1 : 0.42}"/>`;
    }
    return out;
  },

  // Dot matrix with a solid accent disc punched through it.
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
    out += `<circle cx="${cx}" cy="${cy}" r="180" fill="${ACCENT}"/>`;
    return out;
  },

  // Stacked waveform — reads as signal / audio work.
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
      out += `<path d="${d}" fill="none" stroke="${isAccent ? ACCENT : INK}" stroke-width="${isAccent ? 6 : 2}" opacity="${isAccent ? 1 : 0.4}"/>`;
    }
    return out;
  },

  // Nested frames, Bauhaus-ish.
  (rand) => {
    let out = "";
    const accentStep = 1 + Math.floor(rand() * 4);
    for (let i = 0; i < 8; i += 1) {
      const inset = 60 + i * 46;
      out += `<rect x="${inset}" y="${inset * 0.62}" width="${W - inset * 2}" height="${H - inset * 1.24}" fill="none" stroke="${i === accentStep ? ACCENT : INK}" stroke-width="${i === accentStep ? 14 : 2}" opacity="${i === accentStep ? 1 : 0.4}"/>`;
    }
    out += `<rect x="${W - 320}" y="${H - 260}" width="220" height="160" fill="${ACCENT}"/>`;
    return out;
  },

  // Column grid with variable-height bars.
  (rand) => {
    let out = "";
    const accentCol = Math.floor(rand() * 14);
    for (let i = 0; i < 14; i += 1) {
      const h = 90 + rand() * 520;
      const x = 60 + i * 79;
      out += `<rect x="${x}" y="${H - 60 - h}" width="52" height="${h}" fill="${i === accentCol ? ACCENT : INK}" opacity="${i === accentCol ? 1 : 0.32}"/>`;
    }
    return out;
  },
];

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

/**
 * 9:16 companion, used as the poster frame of a project's reel until a real
 * vertical video exists. The landscape composition is drawn at full size and
 * cropped by the viewBox, so a poster and its cover stay visibly related.
 */
function poster(slug, label, compositionIndex) {
  const rand = seeded(slug);
  const composition = compositions[compositionIndex % compositions.length];
  const pw = 900;
  const ph = 1600;
  const scale = ph / H;
  const offset = (W * scale - pw) / 2;

  // Swap the palette for the duration of the draw: the compositions read the
  // module-level colours, and a poster needs the dark treatment.
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
 * The composition index is assigned explicitly rather than drawn from the seed,
 * so no two neighbouring covers land on the same design.
 * 0 arcs · 1 diagonals · 2 dot matrix · 3 waveform · 4 nested frames · 5 columns
 */
const targets = [
  ["src/content/projects/hrv-mobile-ml", "hrv-mobile-ml", 3],
  ["src/content/projects/core-llm-comments", "core-llm-comments", 2],
  ["src/content/projects/qwen-vl-angiography", "qwen-vl-angiography", 0],
  ["src/content/projects/shelf-vision-pipeline", "shelf-vision-pipeline", 5],
  ["src/content/projects/jetson-yolo-boat", "jetson-yolo-boat", 1],
  ["src/content/projects/pricepoint", "pricepoint", 4],
  ["src/content/blog/what-comments-do-to-a-model", "post-comments", 2],
  ["src/content/blog/what-a-hackathon-actually-teaches-you", "post-hackathon", 1],
  ["src/content/blog/beating-a-baseline-honestly", "post-baseline", 4],
];

for (const [dir, slug, composition] of targets) {
  const outDir = join(root, dir);
  mkdirSync(outDir, { recursive: true });

  writeFileSync(
    join(outDir, "cover.svg"),
    cover(slug, `${slug} placeholder cover`, composition),
    "utf8",
  );
  console.log(`wrote ${dir}/cover.svg`);

  // Projects also get a vertical poster for their reel on the carousel.
  if (dir.includes("/projects/")) {
    writeFileSync(
      join(outDir, "poster.svg"),
      poster(slug, `${slug} placeholder poster`, composition),
      "utf8",
    );
    console.log(`wrote ${dir}/poster.svg`);
  }
}
