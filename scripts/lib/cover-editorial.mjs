/**
 * Editorial cover + vertical poster renderers.
 *
 * One layout recipe; canvas size comes from PRESETS (standard / featured / wide).
 */

import { join } from "node:path";
import { layoutFor, PRESETS } from "./cover-canvas.mjs";
import { resolveBackground } from "./cover-background.mjs";
import {
  FONT,
  FROST_COOL,
  INK,
  PAPER_FROST,
  resolveAccent,
} from "./cover-theme.mjs";
import { escapeXml, muteMatrix, splitTitle } from "./cover-util.mjs";

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
 * label: foreignObject white pill, pinned TL/BR.
 * title: SVG text, thin white stroke; last word = accent.
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
  corner,
  canvasW,
  canvasH,
  labelInset,
}) {
  if (variant === "title") {
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

  const padY = Math.round(fontSize * 0.42);
  const padX = Math.round(fontSize * 0.72);
  const pillH = Math.ceil(fontSize * 1.1 + padY * 2);
  const foH = pillH + 2;
  const foW = canvasW - labelInset * 2;
  const foX = labelInset;
  const isBr = corner === "br" || anchor === "end";
  const foY = isBr ? canvasH - labelInset - foH : labelInset;
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
      letter-spacing:${letterSpacing};color:${fill};line-height:1.1;
      white-space:nowrap;">${inner}</div>
  </div>
</foreignObject>`;
}

/** Rectangular-tooth outline cog, anchored top-right (project mark). */
function projectOutlineCog(canvasW) {
  const cx = canvasW - 40;
  const cy = 20;
  const teeth = 12;
  const tipR = 310;
  const rootR = 195;
  const step = (Math.PI * 2) / teeth;
  const tooth = 0.48;
  const pts = [];
  const polar = (ang, r) => [
    (cx + Math.cos(ang) * r).toFixed(1),
    (cy + Math.sin(ang) * r).toFixed(1),
  ];
  for (let i = 0; i < teeth; i += 1) {
    const a0 = i * step - Math.PI / 2;
    const a1 = a0 + step * tooth;
    pts.push(polar(a0, rootR).join(","));
    pts.push(polar(a0, tipR).join(","));
    pts.push(polar(a1, tipR).join(","));
    pts.push(polar(a1, rootR).join(","));
  }
  const d = `M${pts[0]} L${pts.slice(1).join(" L")} Z`;
  return `<g>
  <path d="${d}" fill="none" stroke="#ffffff" stroke-width="12" stroke-linejoin="miter" opacity="0.55"/>
  <path d="${d}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="miter" opacity="0.78"/>
  <circle cx="${cx}" cy="${cy}" r="96" fill="none" stroke="#ffffff" stroke-width="11" opacity="0.55"/>
  <circle cx="${cx}" cy="${cy}" r="96" fill="none" stroke="${INK}" stroke-width="6" opacity="0.78"/>
  <circle cx="${cx}" cy="${cy}" r="36" fill="none" stroke="#ffffff" stroke-width="9" opacity="0.55"/>
  <circle cx="${cx}" cy="${cy}" r="36" fill="none" stroke="${INK}" stroke-width="5" opacity="0.78"/>
</g>`;
}

/**
 * @param {object} entry
 * @param {string} root
 * @param {{ mark?: null | "project", preset?: keyof typeof PRESETS }} [options]
 */
export function editorialCover(
  entry,
  root,
  { mark = null, preset = "standard" } = {},
) {
  const canvas = PRESETS[preset];
  if (!canvas || preset === "poster") {
    throw new Error(
      `editorialCover preset must be standard|featured|wide (got "${preset}")`,
    );
  }

  const { width, height } = canvas;
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
  const art = resolveBackground(bg, outDir, root, { w: width, h: height });
  const label = escapeXml(coverTitle);
  const { lead, accent } = splitTitle(coverTitle);
  const muteValues = muteMatrix(muteChannel);
  const layout = layoutFor(width, height);
  const titleY = lead ? layout.titleYLead : layout.titleYSolo;

  const muteFilterDef = muteValues
    ? `<filter id="mute" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="${muteValues}"/>
    </filter>`
    : "";
  const wallpaperLayer = muteValues
    ? `<g filter="url(#mute)">${art}</g>`
    : `<g>${art}</g>`;
  const projectMark = mark === "project" ? projectOutlineCog(width) : "";

  const textOpts = {
    canvasW: width,
    canvasH: height,
    labelInset: layout.labelInset,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
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
  <rect width="${width}" height="${height}" fill="url(#frost)"/>
  <rect width="${width}" height="${height}" fill="url(#accentTL)"/>
  <rect width="${width}" height="${height}" fill="url(#accentTR)"/>
  <rect width="${width}" height="${height}" fill="url(#accentBL)"/>
  <rect width="${width}" height="${height}" fill="url(#accentBR)"/>
  ${projectMark}

  ${editorialText({
    ...textOpts,
    fontSize: layout.labelSize,
    letterSpacing: "0.12em",
    content: String(category).toUpperCase(),
    fill: accentColor,
    variant: "label",
    corner: "tl",
  })}

  ${editorialText({
    ...textOpts,
    x: layout.titleX,
    y: titleY,
    fontSize: layout.titleSize,
    letterSpacing: "-0.045em",
    content: { lead, accent },
    accentColor,
    variant: "title",
    accentLineBreak: true,
  })}

  ${editorialText({
    ...textOpts,
    fontSize: layout.labelSize,
    letterSpacing: "0.14em",
    content: String(tag).toUpperCase(),
    fill: accentColor,
    variant: "label",
    corner: "br",
  })}
</svg>
`;
}

/**
 * Vertical project poster: wallpaper cover-cropped to 9:16, dark frost,
 * category + tag stacked TR. No title (UI supplies index + name).
 */
export function editorialPoster(entry, root) {
  const { width: PW, height: PH } = PRESETS.poster;
  const { width: W, height: H } = PRESETS.standard;
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
  const art = resolveBackground(bg, outDir, root, { w: W, h: H });
  const label = escapeXml(coverTitle);
  const muteValues = muteMatrix(muteChannel);

  const scale = Math.max(PW / W, PH / H);
  const scaledW = W * scale;
  const scaledH = H * scale;
  const ox = PW - scaledW + scaledW * 0.08;
  const oy = (PH - scaledH) / 2;

  const muteFilterDef = muteValues
    ? `<filter id="mute" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="${muteValues}"/>
    </filter>`
    : "";
  const wallpaperInner = muteValues
    ? `<g filter="url(#mute)">${art}</g>`
    : `<g>${art}</g>`;

  const labelSize = Math.round(22 * 1.35);
  const padY = Math.round(labelSize * 0.42);
  const padX = Math.round(labelSize * 0.72);
  const pillH = Math.ceil(labelSize * 1.1 + padY * 2);
  const gap = 12;
  const stackH = pillH * 2 + gap;
  const inset = 48;
  const foW = PW - inset * 2;

  const pill = (text) => `<div style="display:inline-block;box-sizing:border-box;
      background:rgba(8,12,18,0.72);border-radius:999px;padding:${padY}px ${padX}px;
      font-family:${FONT};font-size:${labelSize}px;font-weight:700;
      letter-spacing:0.12em;color:#f4f7fa;line-height:1.1;white-space:nowrap;">${escapeXml(String(text).toUpperCase())}</div>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PW} ${PH}" role="img" aria-label="${label}">
  <defs>
    ${muteFilterDef}
    ${accentCornerWash(accentColor)}
    <linearGradient id="darkFrost" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#060a10" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#0a121c" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#05080c" stop-opacity="0.62"/>
    </linearGradient>
  </defs>
  <g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${scale.toFixed(5)})">
    ${wallpaperInner}
  </g>
  <rect width="${PW}" height="${PH}" fill="url(#darkFrost)"/>
  <rect width="${PW}" height="${PH}" fill="url(#accentTL)"/>
  <rect width="${PW}" height="${PH}" fill="url(#accentTR)"/>
  <rect width="${PW}" height="${PH}" fill="url(#accentBL)"/>
  <rect width="${PW}" height="${PH}" fill="url(#accentBR)"/>

  <foreignObject x="${inset}" y="${inset}" width="${foW}" height="${stackH + 4}">
  <div xmlns="http://www.w3.org/1999/xhtml"
       style="display:flex;flex-direction:column;align-items:flex-end;gap:${gap}px;width:100%;margin:0;padding:0;">
    ${pill(category)}
    ${pill(tag)}
  </div>
</foreignObject>
</svg>
`;
}
