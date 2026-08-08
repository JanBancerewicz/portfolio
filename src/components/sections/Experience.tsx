import {
  experience,
  formatPeriod,
  monthsOf,
  totalMonths,
  type Experience as Entry,
} from "../../data/experience";
import { Reveal } from "../motion/Reveal";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { TagRow } from "./Work";

/**
 * The one section on this page whose content is a genuine sequence.
 *
 * Everywhere else the `01 / 02 / 03` numbering is a deliberate exception —
 * those sections are a set, not an order. Here time is the actual structure, so
 * it gets the device that says so: a spine with a node per role, newest first,
 * the current one marked in accent and the finished one in rule.
 */
export function Experience() {
  if (!experience.length) return null;

  return (
    <section id="experience" className="scroll-mt-24 pt-28 md:pt-40">
      <Container>
        <SectionHeader
          index="03"
          title="Internships & commercial experience"
          lede={
            <>
              Over a year of commercial experience in software
              engineering and high-throughput production systems,
              gained alongside studying Computer Science.
            </>
          }
          aside={
            <>
              {experience.length} companies
              <span className="mx-2 text-rule-strong">/</span>
              {totalMonths()} months
            </>
          }
        />

        <ol className="relative border-l border-rule pl-6 md:pl-10">
          {experience.map((entry, index) => (
            <Role key={entry.company} entry={entry} current={index === 0} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Role({ entry, current }: { entry: Entry; current: boolean }) {
  const months = monthsOf(entry);

  return (
    <li className="relative pb-14 last:pb-0 md:pb-20">
      {/*
        The node is centred on the spine, and the offset has to walk back over
        the list's padding as well as its border — the item's box starts inside
        both. So: padding (24px, 40px from md) + half the dot (5px) + the rule
        (1px), less half the rule to land on its centre.
      */}
      <span
        aria-hidden="true"
        className={`absolute -left-[29.5px] top-1.5 size-2.5 rounded-full ring-4 ring-paper md:-left-[45.5px] ${
          current ? "bg-accent" : "bg-rule-strong"
        }`}
      />

      <Reveal className="grid gap-x-8 gap-y-6 md:grid-cols-12" y={16}>
        <div className="md:col-span-4">
          <LogoPlate entry={entry} />

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="label text-ink">{formatPeriod(entry)}</span>
            {current ? (
              <span className="label flex items-center gap-1.5 text-accent-text">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative size-1.5 rounded-full bg-accent" />
                </span>
                Current
              </span>
            ) : null}
          </div>

          <p className="label mt-1.5">
            {months} months
            <span className="mx-2 text-rule-strong"></span>
            {/* {entry.location} */}
          </p>
        </div>

        <div className="md:col-span-8">
          <h3 className="text-[1.375rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.625rem]">
            {entry.role}
          </h3>

          <ul className="mt-4 space-y-2.5">
            {entry.points.map((point) => (
              <li
                key={point}
                className="relative pl-5 text-[1rem] leading-relaxed text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.7em] size-1 rounded-full bg-rule-strong"
                />
                {point}
              </li>
            ))}
          </ul>

          <TagRow tags={entry.stack} className="mt-5" />
        </div>
      </Reveal>
    </li>
  );
}

/**
 * A plate carrying the company's name, lit from a source that moves when you
 * point at it — so the mark's shadow swings the other way. The light is one
 * animated custom property; everything else is derived from it, which is why
 * the sheen and the shadow stay physically consistent instead of being two
 * unrelated effects that happen to fire together.
 */
function LogoPlate({ entry }: { entry: Entry }) {
  const mark = entry.logo ? (
    <img
      src={entry.logo}
      alt={entry.company}
      className="logo-mark max-h-14 max-w-full w-auto object-contain"
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span
      className="logo-mark text-center text-[1.25rem] leading-none tracking-[-0.03em] md:text-[1.375rem]"
      title={entry.company}
    >
      <span className="font-semibold text-ink">{entry.wordmark.lead}</span>{" "}
      <span className="font-light text-ink-muted">{entry.wordmark.tail}</span>
    </span>
  );

  const plateClass =
    "logo-plate grid h-24 place-items-center rounded-sm border border-rule bg-paper-raised px-5 md:h-28";

  if (!entry.href) {
    return <div className={plateClass}>{mark}</div>;
  }

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer noopener"
      className={plateClass}
    >
      {mark}
    </a>
  );
}
