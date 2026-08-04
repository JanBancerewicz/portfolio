import { techIcons } from "../../data/techIcons";

/**
 * Brand mark for a stack label, falling back to a monogram chip for anything
 * without a logo (BLE, REST, Signal Processing…). Marks sit monochrome at rest
 * and take their brand colour on hover, so a row of them reads as one texture
 * rather than a bag of clashing logos.
 */
export function TechIcon({ label, className = "" }: { label: string; className?: string }) {
  const icon = techIcons[label];

  if (!icon) {
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

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      className={`size-6 shrink-0 transition-colors duration-200 ${className}`}
      style={{ ["--brand" as string]: icon.hex }}
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
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
