import { ArrowUpRight, ExternalLink, GitBranch, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { projectEntries } from "../../content";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { FogReveal } from "../ui/FogReveal";
import { SectionHeading } from "../ui/SectionHeading";

const accentClasses = {
  cyan: {
    surface: "from-cyan-300/20 via-blue-400/10 to-transparent",
    border: "border-cyan-300/25",
    badge: "cyan",
  },
  violet: {
    surface: "from-violet-300/20 via-blue-500/10 to-transparent",
    border: "border-violet-300/25",
    badge: "violet",
  },
  amber: {
    surface: "from-amber-300/20 via-orange-500/10 to-transparent",
    border: "border-amber-300/25",
    badge: "amber",
  },
  rose: {
    surface: "from-rose-300/20 via-fuchsia-500/10 to-transparent",
    border: "border-rose-300/25",
    badge: "rose",
  },
} as const;

export function PinnedProjects() {
  return (
    <section id="projects" className="scroll-mt-28 py-20 sm:py-24">
      <FogReveal>
        <SectionHeading
          eyebrow="Pinned"
          title="Pinned Projects"
          description="A scaffolded project wall with room for real repos, demos, case studies and stack notes later."
        />
      </FogReveal>

      <div className="grid gap-5 lg:grid-cols-4">
        {projectEntries.map(({ meta: project }, index) => {
          const accent = accentClasses[project.accent];

          return (
            <FogReveal key={project.title} delay={index * 110}>
              <Card className="flex min-h-[320px] flex-col p-0 lg:col-span-2">
                <div
                  className={`relative h-40 overflow-hidden border-b border-border bg-gradient-to-br ${accent.surface}`}
                >
                  <img
                    src={project.cover}
                    alt=""
                    className="h-full w-full object-cover opacity-90 mix-blend-normal dark:opacity-85 dark:mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/78 via-transparent to-transparent" />
                  {project.category ? (
                    <div
                      className={`theme-surface absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border ${accent.border} bg-surface-inset px-3 py-1.5 font-mono text-[11px] text-foreground-soft backdrop-blur`}
                    >
                      <Layers3 size={13} />
                      {project.category}
                    </div>
                  ) : null}
                  <span className="absolute bottom-4 right-5 font-mono text-5xl font-semibold text-foreground/10">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-subtle">{project.year}</p>
                      <h3 className="mt-2 text-xl font-semibold text-foreground transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="mt-1 text-subtle transition group-hover:text-accent"
                    />
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-7 text-muted transition-colors duration-300">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} tone={accent.badge}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cyan-300 px-4 font-mono text-xs font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    >
                      Details
                      <ArrowUpRight size={16} />
                    </Link>
                    {(project.links ?? []).map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-label={`${project.title} ${link.label}`}
                        className="theme-surface mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 font-mono text-xs text-foreground-soft transition hover:border-cyan-300/45 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                      >
                        {link.label === "GitHub" ? (
                          <GitBranch size={17} />
                        ) : (
                          <ExternalLink size={17} />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </FogReveal>
          );
        })}
      </div>
    </section>
  );
}
