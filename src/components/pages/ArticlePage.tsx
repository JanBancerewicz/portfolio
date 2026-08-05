import { Link, useParams } from "react-router-dom";
import { findPost, findProject, postEntries, projectEntries } from "../../content";
import type { ContentKind } from "../../content/types";
import { formatPostDate } from "../../lib/format";
import { CoverReveal } from "../motion/CoverReveal";
import { Reveal } from "../motion/Reveal";
import { CallToAction } from "../ui/CallToAction";
import { Container } from "../ui/Container";
import { PageIntro } from "../ui/PageIntro";
import { NotFoundPage } from "./NotFoundPage";

/** Shared reading layout for both project case studies and blog posts. */
export function ArticlePage({ kind }: { kind: ContentKind }) {
  const { slug } = useParams();
  const entry = kind === "project" ? findProject(slug) : findPost(slug);

  if (!entry) return <NotFoundPage />;

  const { meta, Component } = entry;
  const siblings = kind === "project" ? projectEntries : postEntries;
  const position = siblings.findIndex((item) => item.meta.slug === meta.slug);
  const next = siblings[position + 1] ?? siblings[0];
  const basePath = kind === "project" ? "/projects" : "/blog";

  return (
    <div>
      <PageIntro
        eyebrow={kind === "project" ? "Case study" : "Post"}
        title={meta.title}
        lede={meta.summary}
        meta={
          <dl className="grid gap-x-8 gap-y-5 border-t border-rule pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <MetaItem
              label={kind === "project" ? "Year" : "Published"}
              value={kind === "project" ? meta.date : formatPostDate(meta.date)}
            />
            <MetaItem label="Category" value={meta.category} />
            {meta.role ? <MetaItem label="Role" value={meta.role} /> : null}
            {meta.readingTime ? (
              <MetaItem label="Reading time" value={meta.readingTime} />
            ) : null}
            <MetaItem label="Stack" value={meta.tags.join(", ")} />
          </dl>
        }
      />

      <Container>
        <div className="mt-14 md:mt-20">
          <CoverReveal
            src={meta.cover}
            alt={`${meta.title} cover`}
            ratio="16 / 9"
            className="rounded-sm"
          />
        </div>

        {meta.links?.length ? (
          <Reveal className="mt-8 flex flex-wrap gap-3" stagger={50}>
            {meta.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="press group inline-flex items-center gap-3 rounded-sm border border-rule-strong px-5 py-2.5 text-[0.9375rem] font-medium transition-colors duration-200 hover:border-ink"
              >
                {link.label}
                <span className="text-accent transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </Reveal>
        ) : null}

        <Reveal className="prose-editorial mt-16 max-w-3xl md:mt-24" delay={80}>
          <Component />
        </Reveal>

        {next && next.meta.slug !== meta.slug ? (
          <Reveal className="mt-24 border-t border-rule-strong pt-4 md:mt-32">
            <Link
              to={`${basePath}/${next.meta.slug}`}
              className="group flex flex-wrap items-baseline justify-between gap-4 py-6"
            >
              <span className="label">Next</span>
              <span className="flex items-baseline gap-3 text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium tracking-[-0.04em]">
                <span className="link-wipe">{next.meta.title}</span>
                <span className="text-accent transition-transform duration-300 ease-out group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ) : null}
      </Container>

      <CallToAction />
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-1.5 text-[1rem] text-ink-muted">{value}</dd>
    </div>
  );
}
