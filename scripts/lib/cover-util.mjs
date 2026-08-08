/**
 * Small SVG helpers for the cover generator.
 */

export function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function splitTitle(coverTitle) {
  const parts = String(coverTitle).trim().split(/\s+/);
  if (parts.length === 1) return { lead: "", accent: parts[0] ?? "" };
  return {
    lead: parts.slice(0, -1).join(" "),
    accent: parts[parts.length - 1],
  };
}

/**
 * Mute wallpaper channels via feColorMatrix.
 * Accepts: "" | "r"|"g"|"b" | combos "rg"|"rb"|"gb"|"rgb".
 * Applied only to the wallpaper layer.
 */
export function muteMatrix(spec) {
  const s = String(spec ?? "")
    .toLowerCase()
    .replace(/[^rgb]/g, "");
  if (!s) return null;

  const muteR = s.includes("r");
  const muteG = s.includes("g");
  const muteB = s.includes("b");

  const rr = muteR ? 0.62 : 1.0;
  const gg = muteG ? 0.62 : 1.0;
  const bb = muteB ? 0.62 : 1.0;
  const cross = 0.04;
  const bias = 0.05;

  return `${rr} ${cross} ${cross} 0 ${bias}  ${cross} ${gg} ${cross} 0 ${bias}  ${cross} ${cross} ${bb} 0 ${bias}  0 0 0 1 0`;
}
