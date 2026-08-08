import { conceptIcons } from "../../data/conceptIcons";
import { techIcons } from "../../data/techIcons";

/**
 * A mark for a stack label, resolved in three steps:
 *
 * 1. **Brand logo** — solid, from the `simple-icons` subset baked into
 *    `techIcons.ts`.
 * 2. **Concept glyph** — a stroked line diagram from `conceptIcons.ts`, for
 *    techniques that have no logo because they are not products (LoRA,
 *    quantization, RAG…), plus the handful of vendors `simple-icons` omits.
 * 3. **Monogram** — a two-letter chip, so an unmapped label degrades to
 *    something deliberate rather than a gap.
 *
 * Solid for products, drawn for methods: the distinction is real, so the
 * rendering says it out loud. Marks stay monochrome at rest and take their
 * brand colour on hover (the ribbon opts out via `.tech-mark-active` for
 * always-on brand colour), which keeps a row of them reading as one texture
 * rather than a bag of clashing logos.
 */
export function TechIcon({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const brand = techIcons[label];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={brand.title}
        className={`size-6 shrink-0 transition-colors duration-200 ${className}`}
        style={{ ["--brand" as string]: brand.hex }}
      >
        <title>{brand.title}</title>
        <path d={brand.path} fill="currentColor" />
      </svg>
    );
  }

  const concept = conceptIcons[label];
  if (concept) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={concept.title}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`size-6 shrink-0 ${className}`}
      >
        <title>{concept.title}</title>
        {concept.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }

  return (
    <span
      title={label}
      aria-label={label}
      className={`grid size-6 shrink-0 place-items-center rounded-[5px] border border-current/25 font-mono text-[9px] font-medium uppercase leading-none tracking-tight ${className}`}
    >
      {monogram(label)}
    </span>
  );
}

/** "Signal Processing" → "SP", "BLE" → "BL", "CLI" → "CL". */
function monogram(label: string) {
  const words = label.split(/[\s/.]+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return label.slice(0, 2).toUpperCase();
}

export function TechIconRow({
  labels,
  className = "",
  max = 5,
}: {
  labels: string[];
  className?: string;
  max?: number;
}) {
  const shown = labels.slice(0, max);
  const rest = labels.length - shown.length;

  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {shown.map((label) => (
        <li key={label} className="tech-mark" title={label}>
          <TechIcon label={label} />
        </li>
      ))}
      {rest > 0 ? (
        <li className="label text-current opacity-70">+{rest}</li>
      ) : null}
    </ul>
  );
}
