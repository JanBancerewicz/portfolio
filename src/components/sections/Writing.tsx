import { Link } from "react-router-dom";
import { postEntries } from "../../content";
import { formatPostDate } from "../../lib/format";
import { CoverReveal } from "../motion/CoverReveal";
import { Reveal } from "../motion/Reveal";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

export function Writing() {
  const posts = postEntries.slice(0, 3);
  if (!posts.length) return null;

  return (
    <section id="writing" className="scroll-mt-24 pt-28 md:pt-40">
      <Container>
        <SectionHeader
          index="05"
          title="Writing"
          lede={
            <>
              Notes on the technical topics that might interest you.
            </>
          }
          aside={
            <Link to="/blog" className="link-wipe text-ink">
              All posts ↗
            </Link>
          }
        />

        <Reveal className="border-t border-rule" stagger={45}>
          {posts.map((entry, index) => (
            <Link
              key={entry.meta.slug}
              to={`/blog/${entry.meta.slug}`}
              className="group grid items-start gap-3 border-b border-rule py-6 md:grid-cols-[7rem_minmax(15rem,17.5rem)_minmax(0,1fr)_auto] md:gap-x-5 md:gap-y-3 md:py-8"
            >
              <div className="label md:pr-1 md:pt-1">
                {formatPostDate(entry.meta.date)}
              </div>

              <div className="w-full max-w-[15rem] md:max-w-none">
                <CoverReveal
                  src={entry.meta.cover}
                  alt=""
                  ratio="3 / 2"
                  from="left"
                  duration={520}
                  delay={index * 50}
                  className="rounded-sm"
                />
              </div>

              <div>
                <h3 className="flex items-start gap-2 text-xl font-medium tracking-[-0.03em] md:text-[1.625rem]">
                  <span className="link-wipe">{entry.meta.title}</span>
                  <span className="mt-1 shrink-0 text-sm text-accent transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </h3>
                <p className="mt-2 max-w-xl text-[1rem] leading-relaxed text-ink-muted">
                  {entry.meta.summary}
                </p>
              </div>

              <div className="label md:pt-1 md:pl-4 md:text-right">
                {entry.meta.category}
                {entry.meta.readingTime ? (
                  <>
                    <span className="mx-1.5 text-rule-strong">/</span>
                    {entry.meta.readingTime}
                  </>
                ) : null}
              </div>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
