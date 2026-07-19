import { Cpu, Sparkles } from "lucide-react";
import { technologies } from "../../data/technologies";
import { FogReveal } from "../ui/FogReveal";
import { SectionHeading } from "../ui/SectionHeading";

const marqueeItems = [...technologies, ...technologies];

const toneClasses = {
  cyan: "border-cyan-300/25 bg-cyan-300/10 text-accent",
  violet: "border-violet-300/25 bg-violet-300/10 text-violet-700 dark:text-violet-100",
  amber: "border-amber-300/25 bg-amber-300/10 text-amber-700 dark:text-amber-100",
  rose: "border-rose-300/25 bg-rose-300/10 text-rose-700 dark:text-rose-100",
};

export function TechMarquee() {
  return (
    <section id="stack" className="scroll-mt-28 py-16 sm:py-20">
      <FogReveal>
        <SectionHeading
          eyebrow="Stack"
          title="Technology Rail"
          description="A long horizontal placeholder rail for tools, languages and frameworks that will be replaced with the real stack later."
        />
      </FogReveal>

      <FogReveal delay={120}>
        <div className="theme-surface relative overflow-hidden rounded-[2rem] border border-border bg-surface py-5 shadow-[var(--shadow-elevated)] backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
          />

          <div className="marquee-track flex w-max gap-3 px-5">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className={`theme-surface inline-flex min-w-max items-center gap-3 rounded-full border px-4 py-3 font-mono text-xs ${toneClasses[item.tone]}`}
              >
                {index % 5 === 0 ? <Sparkles size={15} /> : <Cpu size={15} />}
                <span className="font-semibold">{item.name}</span>
                <span className="text-subtle">/ {item.group}</span>
              </div>
            ))}
          </div>
        </div>
      </FogReveal>
    </section>
  );
}
