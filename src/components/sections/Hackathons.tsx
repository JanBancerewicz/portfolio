import { hackathons } from "../../data/hackathons";
import { Reveal } from "../motion/Reveal";
import { ContourField } from "../ui/ContourField";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

export function Hackathons() {
  const wins = hackathons.filter((entry) => entry.win).length;
  const comps = hackathons.reduce((n, entry) => n + (entry.editions ?? 1), 0);

  return (
    <section
      id="hackathons"
      className="relative isolate mt-24 scroll-mt-24 pb-20 pt-24 md:mt-32 md:pb-28 md:pt-32"
    >
      {/* Edge-to-edge tonal band: this section reads as its own chapter. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-paper-sunken" />
      <ContourField seed={11} levels={14} intensity={0.04} />
      <Container>
        <SectionHeader
          index="02"
          title="Hackathons & competitions"
          lede={
            <>
              How I enjoy spending my weekends: <br/>a complex problem, something impactful to build <br/>and zero time for overthinking.
            </>
          }
          aside={
            <>
              {comps} programming challenges
              <br />
              {wins} podium {wins === 1 ? "finish" : "finishes"}
            </>
          }
        />

        <Reveal className="border-t border-rule" stagger={70}>
          {hackathons.map((entry) => (
            <article
              key={entry.name}
              className="group relative grid gap-4 border-b border-rule py-7 md:grid-cols-12 md:gap-8 md:py-9"
            >
              {/* Accent rule wiping in from the left on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              <div className="label md:col-span-2 md:pt-1.5">{entry.date}</div>

              <div className="md:col-span-6">
                <h3 className="flex items-start gap-2 text-xl font-medium tracking-[-0.03em] md:text-[1.625rem]">
                  {entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/link flex items-start gap-2"
                    >
                      <span className="link-wipe">{entry.name}</span>
                      <span className="mt-1 shrink-0 text-sm text-accent transition-transform duration-300 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                        ↗
                      </span>
                    </a>
                  ) : (
                    entry.name
                  )}
                </h3>
                <p className="label mt-1.5">{entry.organiser}</p>
                <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-ink-muted">
                  {entry.what}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <li
                      key={tag}
                      className="label rounded-full border border-rule px-2.5 py-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4 md:pt-1 md:text-right">
                <div
                  className={`text-lg font-medium tracking-[-0.02em] md:text-xl ${
                    entry.highlight ? "text-accent-text" : "text-ink"
                  }`}
                >
                  {entry.result}
                </div>
                <div className="label mt-1.5">{entry.role}</div>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
