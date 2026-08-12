import {
  useRef,
  type ComponentPropsWithoutRef,
  type ComponentType,
} from "react";
import { Link, useParams } from "react-router-dom";
import { findPost, findProject, postEntries, projectEntries } from "../../content";
import type { ContentKind, ContentLink, MdxComponents } from "../../content/types";
import { formatPostDate } from "../../lib/format";
import { ArticleTocNav, useArticleToc } from "../mdx/ArticleToc";
import { Glossary } from "../mdx/Glossary";
import { Term } from "../mdx/Term";
import { CoverReveal } from "../motion/CoverReveal";
import { Reveal } from "../motion/Reveal";
import { CallToAction } from "../ui/CallToAction";
import { Container } from "../ui/Container";
import { PageIntro } from "../ui/PageIntro";
import { NotFoundPage } from "./NotFoundPage";

const mdxComponents = {
  Term: Term as ComponentType<Record<string, unknown>>,
  table: ((props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  )) as ComponentType<Record<string, unknown>>,
} satisfies MdxComponents;

/** Shared reading layout for both project case studies and blog posts. */
export function ArticlePage({ kind }: { kind: ContentKind }) {
  const { slug } = useParams();
  const entry = kind === "project" ? findProject(slug) : findPost(slug);
  const contentRef = useRef<HTMLDivElement>(null);
  const toc = useArticleToc(contentRef, `${kind}:${slug ?? ""}`);

  if (!entry) return <NotFoundPage />;

  const { meta, Component, glossary } = entry;
  const siblings = kind === "project" ? projectEntries : postEntries;
  const position = siblings.findIndex((item) => item.meta.slug === meta.slug);
  const previous =
    siblings.length > 1
      ? (siblings[position - 1] ?? siblings[siblings.length - 1])
      : null;
  const next =
    siblings.length > 1 ? (siblings[position + 1] ?? siblings[0]) : null;
  const basePath = kind === "project" ? "/projects" : "/blog";
  const projectLinks = kind === "project" ? meta.links : undefined;
  const postLinks = kind === "post" ? meta.links : undefined;

  return (
    <div>
      <PageIntro
        eyebrow={kind === "project" ? "Case study" : "Post"}
        title={meta.title}
        lede={meta.summary}
        action={
          projectLinks?.length ? (
            <>
              {projectLinks.map((link) => (
                <ProjectLinkButton key={link.label} link={link} />
              ))}
            </>
          ) : undefined
        }
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

        {postLinks?.length ? (
          <Reveal className="mt-8 flex flex-wrap gap-3" stagger={50}>
            {postLinks.map((link) => (
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

        <div
          className={`article-reading mt-16 md:mt-24${toc.items.length > 0 ? " article-reading--with-toc" : ""}`}
        >
          <ArticleTocNav toc={toc} />
          <Reveal delay={80}>
            <div ref={contentRef} className="prose-editorial">
              <Glossary entries={glossary} />
              <Component components={mdxComponents} />
            </div>
          </Reveal>
        </div>

        {projectLinks?.length ? (
          <Reveal className="mt-16 flex flex-wrap items-center gap-3 md:mt-20">
            {projectLinks.map((link) => (
              <ProjectLinkButton key={`footer-${link.label}`} link={link} />
            ))}
          </Reveal>
        ) : null}

        {previous || next ? (
          <Reveal
            className={`border-t border-rule-strong pt-4 ${
              projectLinks?.length
                ? "mt-10 md:mt-12"
                : "mt-24 md:mt-32"
            }`}
          >
            <nav
              aria-label={kind === "project" ? "More projects" : "More posts"}
              className="grid gap-10 py-6 md:grid-cols-2 md:gap-12"
            >
              {previous ? (
                <Link
                  to={`${basePath}/${previous.meta.slug}`}
                  className="group flex min-w-0 flex-col items-start gap-2 text-left"
                >
                  <span className="label">Previous</span>
                  <span className="flex min-w-0 items-start gap-3 text-[clamp(1.25rem,2.8vw,2rem)] font-medium leading-[1.15] tracking-[-0.04em]">
                    <span className="shrink-0 text-accent transition-transform duration-300 ease-out group-hover:-translate-x-1">
                      ←
                    </span>
                    <span className="link-wipe text-balance">{previous.meta.title}</span>
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  to={`${basePath}/${next.meta.slug}`}
                  className="group flex min-w-0 flex-col items-end gap-2 text-right md:justify-self-end"
                >
                  <span className="label">Next</span>
                  <span className="flex min-w-0 items-start justify-end gap-3 text-[clamp(1.25rem,2.8vw,2rem)] font-medium leading-[1.15] tracking-[-0.04em]">
                    <span className="link-wipe text-balance">{next.meta.title}</span>
                    <span className="shrink-0 text-accent transition-transform duration-300 ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              ) : null}
            </nav>
          </Reveal>
        ) : null}
      </Container>

      <CallToAction />
    </div>
  );
}

function ProjectLinkButton({ link }: { link: ContentLink }) {
  if (link.label === "GitHub") {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        className="press project-github-btn group inline-flex items-center gap-3 rounded-sm px-6 py-3.5 text-[1.0625rem] font-semibold tracking-[-0.02em] md:gap-3.5 md:px-7 md:py-4 md:text-[1.125rem]"
      >
        <GitHubIcon className="size-5 shrink-0 md:size-6" />
        <span>GitHub</span>
        <span
          aria-hidden="true"
          className="text-[0.9375rem] opacity-80 transition-transform duration-200 ease-out group-hover:translate-x-0.5 md:text-[1rem]"
        >
          ↗
        </span>
      </a>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className="press group inline-flex items-center gap-3 rounded-sm border border-rule-strong bg-paper-raised px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 hover:border-ink md:px-7 md:py-4 md:text-[1.0625rem]"
    >
      {link.label}
      <span className="text-accent transition-transform duration-200 ease-out group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
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
