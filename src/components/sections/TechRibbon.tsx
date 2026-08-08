import { marqueeTech } from "../../data/technologies";
import { TechIcon } from "../ui/TechIcon";

/**
 * Full-bleed technology ribbon. Constant motion, so it is `linear` and driven
 * by a CSS animation — off the main thread, and it keeps running smoothly while
 * the rest of the page is still loading. Pauses on hover so names are readable.
 */
export function TechRibbon() {
  const row = [...marqueeTech, ...marqueeTech];

  return (
    <section
      aria-label="Technologies"
      className="marquee marquee-mask mt-24 select-none overflow-hidden border-y border-rule py-5 md:mt-24"
    >
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: "64s" }}>
        {row.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="tech-mark-active flex shrink-0 items-center gap-2 pr-10 text-[1.375rem] tracking-[-0.03em] text-ink-muted md:text-[1.625rem]"
            aria-hidden={index >= marqueeTech.length}
          >
            <span aria-hidden="true">
              <TechIcon label={tech} className="text-ink" />
            </span>
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
