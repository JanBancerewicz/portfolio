import type { ReactNode } from "react";
import { Reveal } from "../motion/Reveal";

type SectionHeaderProps = {
  /** Two-digit section number, e.g. "02". */
  index: string;
  title: string;
  /** Short standfirst under the title. */
  lede?: ReactNode;
  /** Optional right-hand slot — a link, a count, a filter. */
  aside?: ReactNode;
};

/**
 * The recurring editorial masthead: a numbered eyebrow, a hairline rule across
 * the full measure, then the title. Consistent on every section so the page
 * reads as one document.
 */
export function SectionHeader({ index, title, lede, aside }: SectionHeaderProps) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-4">
        <h2 className="section-eyebrow">
          <span className="section-eyebrow-index">{index}</span>
          <span className="mx-2 text-rule-strong">/</span>
          {title}
        </h2>
        {aside ? <div className="label shrink-0">{aside}</div> : null}
      </div>

      {lede ? (
        <p className="mt-6 max-w-2xl text-balance text-[1.375rem] leading-snug tracking-[-0.02em] text-ink md:mt-8 md:text-[1.875rem]">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
