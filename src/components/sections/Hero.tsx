import { Link } from "react-router-dom";
import { site, stats } from "../../data/site";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Ticker } from "../motion/Ticker";
import { Container } from "../ui/Container";
import { HeroMosaic } from "../ui/HeroMosaic";

/**
 * Shared by both halves of the headline so the split across two elements is
 * invisible. Sized so the last line clears the plate's column.
 */
const HEADLINE = "display text-[clamp(2.5rem,7.6vw,6.75rem)]";

export function Hero() {
  return (
    <section className="pt-32 md:pt-40">
      <Container>
        <Reveal
          className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4"
          duration={520}
        >
          <span className="label">
            {site.name} <span className="mx-1 text-rule-strong">/</span>{" "}
            {site.role}
          </span>
          {site.availability.open ? (
            <span className="label flex items-center gap-2 text-ink">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              {site.availability.label}
            </span>
          ) : null}
        </Reveal>

        {/* The headline breaks after its second line so the short last line
            leaves a gap on the right. The plate fills it, spanning down beside
            the standfirst — no dead space on either side. */}
        <SplitLines
          className={`${HEADLINE} mt-10 md:mt-14`}
          delay={120}
        >
          I build software that
          <br />
          survives contact with
        </SplitLines>

        <div className="mt-2 grid gap-x-8 gap-y-8 md:grid-cols-12">
          <SplitLines
            as="p"
            className={`${HEADLINE} md:col-span-7 md:row-start-1`}
            delay={300}
          >
            <em>real data</em>.
          </SplitLines>

          {/* Row 1 on mobile puts the plate directly under the headline;
              on desktop it spans both rows of the right-hand column. */}
          <Reveal
            className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:self-center"
            delay={560}
            duration={700}
            y={24}
          >
            <HeroMosaic />
          </Reveal>

          <div className="md:col-span-7 md:row-start-2 md:pt-6">
            <Reveal delay={520} duration={620}>
              <p className="max-w-md text-[1.125rem] leading-relaxed text-ink-muted">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              delay={620}
              duration={620}
            >
              <Link
                to="/#work"
                className="press group inline-flex items-center justify-between gap-8 rounded-full bg-ink px-6 py-3.5 text-[1rem] font-medium text-paper transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
              >
                See the work
                <span className="transition-transform duration-200 ease-out group-hover:translate-y-0.5">
                  ↓
                </span>
              </Link>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="press group inline-flex items-center justify-between gap-8 rounded-full border border-rule-strong px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 hover:border-ink"
              >
                Get in touch
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal
          className="mt-16 grid grid-cols-2 border-t border-rule md:mt-24 md:grid-cols-4"
          stagger={70}
          delay={760}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-rule px-0 py-6 pr-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0"
            >
              <div className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">
                <Ticker value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="label mt-2">{stat.label}</div>
            </div>
          ))}
          <div className="border-b border-rule py-6 md:border-b-0 md:px-6">
            <div className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">
              PL
            </div>
            <div className="label mt-2">{site.location}</div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
