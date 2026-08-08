/**
 * Named canvas sizes for editorial covers / posters.
 *
 * UI slots should use matching CSS aspect-ratio (see Work / BlogIndexPage).
 */

export const PRESETS = {
  /** Default blog + project horizontal. */
  standard: { width: 1200, height: 800, file: "cover.svg" },
  /** Homepage #work lead — LeadProject `2 / 1`. */
  featured: { width: 1600, height: 800, file: "cover-featured.svg" },
  /** Blog index ladder rows — BlogIndexPage `1350 / 555` (~7:3). */
  wide: { width: 1350, height: 555, file: "cover-wide.svg" },
  /** Project rail posters — 9:16. */
  poster: { width: 900, height: 1600, file: "poster.svg" },
};

/** Layout metrics scaled from the standard 1200×800 editorial. */
export function layoutFor(width, height) {
  const sy = height / PRESETS.standard.height;
  const sx = width / PRESETS.standard.width;
  const s = Math.min(1, Math.max(0.62, Math.min(sx, sy) * 1.05));

  return {
    titleSize: Math.round(138 * s),
    labelSize: Math.round(33 * s),
    titleYLead: Math.round(200 * sy),
    titleYSolo: Math.round(260 * sy),
    titleX: Math.round(48 * Math.min(1, sx)),
    labelInset: Math.round(72 * Math.min(1, Math.max(0.65, s))),
  };
}
