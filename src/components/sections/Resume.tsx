import { ArrowUpRight, Download, FileText, ScrollText } from "lucide-react";
import { Card } from "../ui/Card";
import { FogReveal } from "../ui/FogReveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Resume() {
  return (
    <section id="resume" className="scroll-mt-28 py-20 sm:py-24">
      <FogReveal>
        <SectionHeading
          eyebrow="CV"
          title="Resume"
          description="A clean placeholder for the downloadable resume and future summary highlights."
        />
      </FogReveal>

      <FogReveal delay={120}>
        <Card className="grid gap-8 p-6 lg:grid-cols-[1fr_360px] lg:p-8">
          <div>
            <div className="theme-surface mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-accent">
              <ScrollText size={22} />
            </div>
            <h3 className="max-w-2xl text-2xl font-semibold text-foreground transition-colors duration-300">
              Resume placeholder for education, experience and selected work.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted transition-colors duration-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Replace this
              area with a compact CV summary and a real PDF when ready.
            </p>
            <a
              href="/resume.pdf"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 dark:bg-white"
            >
              <Download size={17} />
              Download resume
            </a>
          </div>

          <div className="grid gap-3">
            {[
              ["Education", "Computer science"],
              ["Experience", "Placeholder timeline"],
              ["Focus", "Software / hackathons"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="theme-surface flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface-inset px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="theme-surface inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-accent">
                    <FileText size={16} />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground-soft transition-colors duration-300">
                      {value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-subtle" />
              </div>
            ))}
          </div>
        </Card>
      </FogReveal>
    </section>
  );
}
