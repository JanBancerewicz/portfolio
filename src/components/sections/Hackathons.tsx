import { ArrowUpRight, CalendarDays, Trophy, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { hackathonEntries } from "../../content";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { FogReveal } from "../ui/FogReveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Hackathons() {
  return (
    <section id="hackathons" className="scroll-mt-28 py-20 sm:py-24">
      <FogReveal>
        <SectionHeading
          eyebrow="Competitions"
          title="Hackathons & Competitions"
          description="A stronger section for fast builds, teamwork, prototypes and competition outcomes."
        />
      </FogReveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {hackathonEntries.map(({ meta: event }, index) => (
          <FogReveal key={event.title} delay={index * 100}>
            <Card className="flex min-h-[360px] flex-col p-0">
              <div className="relative h-40 overflow-hidden border-b border-border">
                <img
                  src={event.cover}
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-transparent to-transparent" />
                <div className="theme-surface absolute bottom-4 left-5 inline-flex size-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 font-mono text-xs text-accent backdrop-blur">
                  {index + 1}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="theme-surface inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 font-mono text-[11px] text-accent">
                        <CalendarDays size={13} />
                        {event.date ?? event.year}
                      </span>
                      <span className="theme-surface inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1.5 font-mono text-[11px] text-violet-700 dark:text-violet-100">
                        <UsersRound size={13} />
                        {event.role}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground transition-colors duration-300">
                      {event.title}
                    </h3>
                  </div>
                  {event.result ? (
                    <div className="theme-surface inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-2 font-mono text-xs text-amber-700 dark:text-amber-100">
                      <Trophy size={14} />
                      {event.result}
                    </div>
                  ) : null}
                </div>

                <p className="mt-3 flex-1 text-sm leading-7 text-muted transition-colors duration-300">
                  {event.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} tone={index % 2 === 0 ? "cyan" : "violet"}>
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link
                  to={`/hackathons/${event.slug}`}
                  className="mt-6 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-cyan-300 px-4 font-mono text-xs font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  Details
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </Card>
          </FogReveal>
        ))}
      </div>
    </section>
  );
}
