import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { findContentEntry } from "../../content";
import type { ContentEntry } from "../../content/types";
import { Badge } from "../ui/Badge";
import { FogReveal } from "../ui/FogReveal";

type CaseStudyPageProps = {
  kind: ContentEntry["kind"];
};

const accentBorders = {
  cyan: "border-cyan-300/30",
  violet: "border-violet-300/30",
  amber: "border-amber-300/30",
  rose: "border-rose-300/30",
} as const;

const kindLabels = {
  project: "Project",
  hackathon: "Hackathon",
} as const;

export function CaseStudyPage({ kind }: CaseStudyPageProps) {
  const { slug } = useParams();
  const entry = findContentEntry(kind, slug);

  if (!entry) {
    return <Navigate to="/404" replace />;
  }

  const { meta, Component } = entry;
  const backHref = kind === "project" ? "/#projects" : "/#hackathons";

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-6 lg:px-8">
      <FogReveal>
        <Link
          to={backHref}
          className="theme-surface inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground-soft transition hover:border-cyan-300/45 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          <ArrowLeft size={15} />
          Back
        </Link>
      </FogReveal>

      <section className="grid gap-8 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <FogReveal>
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone={meta.accent}>{kindLabels[kind]}</Badge>
              {meta.year ? <Badge>{meta.year}</Badge> : null}
              {meta.category ? <Badge>{meta.category}</Badge> : null}
              {meta.result ? <Badge tone="amber">{meta.result}</Badge> : null}
              {meta.role ? <Badge tone="violet">{meta.role}</Badge> : null}
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-normal text-foreground transition-colors duration-300 sm:text-6xl">
              {meta.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted transition-colors duration-300 sm:text-lg">
              {meta.summary}
            </p>

            {meta.links?.length ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {meta.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="theme-surface inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 font-mono text-xs font-semibold text-foreground transition hover:border-cyan-300/45 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    {link.label === "GitHub" ? (
                      <GitBranch size={16} />
                    ) : (
                      <ExternalLink size={16} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </FogReveal>

        <FogReveal delay={120}>
          <div
            className={`theme-surface overflow-hidden rounded-2xl border bg-surface shadow-[var(--shadow-elevated)] ${accentBorders[meta.accent]}`}
          >
            <img
              src={meta.cover}
              alt=""
              className="aspect-[5/3] w-full object-cover"
            />
          </div>
        </FogReveal>
      </section>

      <FogReveal delay={180}>
        <article className="case-study-content theme-surface mt-14 rounded-2xl border border-border bg-surface p-6 text-foreground-soft shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:p-8 lg:p-10">
          <Component />
        </article>
      </FogReveal>
    </main>
  );
}
