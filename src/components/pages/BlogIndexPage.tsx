import { Link } from "react-router-dom";
import { postEntries } from "../../content";
import type { ContentEntry } from "../../content/types";
import { formatPostDate } from "../../lib/format";
import { CoverReveal } from "../motion/CoverReveal";
import { Reveal } from "../motion/Reveal";
import { CallToAction } from "../ui/CallToAction";
import { Container } from "../ui/Container";
import { PageIntro } from "../ui/PageIntro";

export function BlogIndexPage() {
  const [lead, ...rest] = postEntries;

  return (
    <div>
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
                ratio="3 / 2"
                className="rounded-sm"
              />
            </div>

            <Reveal className="md:col-span-5 md:pt-2" delay={120}>
              <PostMeta
                date={lead.meta.date}
                category={lead.meta.category}
                readingTime={lead.meta.readingTime}
                prefix="Latest"
              />
              <h2 className="mt-3 flex items-start gap-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.04em]">
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
          <div className="mt-16 border-t border-rule md:mt-24">
            {rest.map((entry, index) => (
              <PostRow
                key={entry.meta.slug}
                entry={entry}
                // Ladder: text|image, then image|text, …
                textFirst={index % 2 === 0}
              />
            ))}
          </div>
        ) : null}
      </Container>

      <CallToAction
        headline="Rather talk than read?"
        body="I am always up for a conversation about LLMs, applied ML or getting a model into production. LinkedIn is the fastest way to reach me."
      />
    </div>
  );
}

function PostRow({
  entry,
  textFirst,
}: {
  entry: ContentEntry;
  textFirst: boolean;
}) {
  const { meta } = entry;

  return (
    <Link
      to={`/blog/${meta.slug}`}
      className="group grid items-center gap-6 border-b border-rule py-10 md:grid-cols-12 md:gap-10 md:py-12"
    >
      <div className={`${textFirst ? "order-1" : "order-2"} md:col-span-7`}>
        <Reveal delay={40}>
          <PostMeta
            date={meta.date}
            category={meta.category}
            readingTime={meta.readingTime}
          />
          <h3 className="mt-2.5 flex items-start gap-2 text-2xl font-medium leading-tight tracking-[-0.035em] md:text-[1.75rem]">
            <span className="link-wipe">{meta.title}</span>
            <span className="mt-1 shrink-0 text-base text-accent transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </h3>
          <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-ink-muted">
            {meta.summary}
          </p>
        </Reveal>
      </div>

      <div className={`${textFirst ? "order-2" : "order-1"} md:col-span-5`}>
        <CoverReveal
          src={meta.coverWide ?? meta.cover}
          alt=""
          ratio="1350 / 555"
          className="rounded-sm"
        />
      </div>
    </Link>
  );
}

function PostMeta({
  date,
  category,
  readingTime,
  prefix,
}: {
  date: string;
  category: string;
  readingTime?: string;
  prefix?: string;
}) {
  return (
    <div className="label">
      {prefix ? (
        <>
          {prefix}
          <span className="mx-1.5 text-rule-strong">/</span>
        </>
      ) : null}
      {formatPostDate(date)}
      <span className="mx-1.5 text-rule-strong">/</span>
      {category}
      {readingTime ? (
        <>
          <span className="mx-1.5 text-rule-strong">/</span>
          {readingTime}
        </>
      ) : null}
    </div>
  );
}
