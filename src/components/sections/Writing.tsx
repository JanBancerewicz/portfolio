import { Link } from "react-router-dom";
import { postEntries } from "../../content";
import { formatPostDate } from "../../lib/format";
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

        <Reveal className="border-t border-rule" stagger={70}>
          {posts.map((entry) => (
            <Link
              key={entry.meta.slug}
              to={`/blog/${entry.meta.slug}`}
              className="group grid items-baseline gap-2 border-b border-rule py-6 md:grid-cols-12 md:gap-8 md:py-8"
            >
              <div className="label md:col-span-2">
                {formatPostDate(entry.meta.date)}
              </div>

              <div className="md:col-span-7">
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

              <div className="label md:col-span-3 md:text-right">
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
