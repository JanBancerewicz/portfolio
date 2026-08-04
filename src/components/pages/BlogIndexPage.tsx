import { Link } from "react-router-dom";
import { postEntries } from "../../content";
import { formatPostDate } from "../../lib/format";
import { CoverReveal } from "../motion/CoverReveal";
import { Reveal } from "../motion/Reveal";
import { CallToAction } from "../ui/CallToAction";
import { Container } from "../ui/Container";
import { PageIntro } from "../ui/PageIntro";

export function BlogIndexPage() {
  const [lead, ...rest] = postEntries;

  return (
    <main>
      <PageIntro
        eyebrow={`${postEntries.length} posts`}
        title={
          <>
            Notes from
            <br />
            <em>the build</em>.
          </>
        }
        lede="Short write-ups on LLMs, computer vision and evaluation — the things that took me longest to figure out. If one of them saves you an afternoon, it did its job."
      />

      <Container>
        {lead ? (
          <Link
            to={`/blog/${lead.meta.slug}`}
            className="group mt-16 grid gap-8 md:mt-24 md:grid-cols-12"
          >
            <div className="md:col-span-7">
              <CoverReveal
                src={lead.meta.cover}
                alt=""
                ratio="16 / 10"
                className="rounded-sm"
              />
            </div>

            <Reveal className="md:col-span-5 md:pt-2" delay={120}>
              <div className="label mb-3">
                Latest <span className="mx-1 text-rule-strong">/</span>{" "}
                {formatPostDate(lead.meta.date)}
                {lead.meta.readingTime ? (
                  <>
                    <span className="mx-1 text-rule-strong">/</span>
                    {lead.meta.readingTime}
                  </>
                ) : null}
              </div>
              <h2 className="flex items-start gap-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                <span className="link-wipe">{lead.meta.title}</span>
                <span className="mt-1.5 shrink-0 text-lg text-accent transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </h2>
              <p className="mt-4 max-w-md text-ink-muted">{lead.meta.summary}</p>
            </Reveal>
          </Link>
        ) : null}

        {rest.length ? (
          <Reveal
            className="mt-20 grid gap-x-8 gap-y-14 border-t border-rule pt-12 md:mt-28 md:grid-cols-2 lg:gap-x-12"
            stagger={70}
          >
            {rest.map((entry) => (
              <Link
                key={entry.meta.slug}
                to={`/blog/${entry.meta.slug}`}
                className="group block"
              >
                <div className="label mb-3">
                  {formatPostDate(entry.meta.date)}
                  <span className="mx-1.5 text-rule-strong">/</span>
                  {entry.meta.category}
                  {entry.meta.readingTime ? (
                    <>
                      <span className="mx-1.5 text-rule-strong">/</span>
                      {entry.meta.readingTime}
                    </>
                  ) : null}
                </div>
                <h3 className="flex items-start gap-2 text-2xl font-medium leading-tight tracking-[-0.035em]">
                  <span className="link-wipe">{entry.meta.title}</span>
                  <span className="shrink-0 text-base text-accent transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </h3>
                <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-ink-muted">
                  {entry.meta.summary}
                </p>
              </Link>
            ))}
          </Reveal>
        ) : null}
      </Container>

      <CallToAction
        headline="Rather talk than read?"
        body="I am always up for a conversation about LLMs, applied ML or getting a model into production. LinkedIn is the fastest way to reach me."
      />
    </main>
  );
}
