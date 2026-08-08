/**
 * Shared palette / type for cover SVGs.
 */

export const INK = "#10161c";
export const PAPER_FROST = "#f3f6fa";
export const FROST_COOL = "#e8eef8";

/** Altari-style accent ids — corner wash + last title word + pill text. */
export const ACCENTS = {
  blue: "#2f6fd4",
  purple: "#6b4fd8",
  orange: "#c65d2e",
  mint: "#1a9a88",
  gold: "#b8860b",
  red: "#c43c4a",
};

export const ACCENT_IDS = Object.keys(ACCENTS);

export const FONT =
  "'Inter Tight', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif";

export function resolveAccent(accentId = "blue") {
  const id = String(accentId).toLowerCase();
  if (!ACCENTS[id]) {
    throw new Error(
      `Unknown accent "${accentId}". Use one of: ${ACCENT_IDS.join(", ")}`,
    );
  }
  return { id, color: ACCENTS[id] };
}
