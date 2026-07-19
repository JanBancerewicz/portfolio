import { ArrowDownRight, ArrowRight, Download } from "lucide-react";
import { skills } from "../../data/skills";
import { Badge } from "../ui/Badge";
import { FogReveal } from "../ui/FogReveal";
import { HeroPortrait } from "../ui/HeroPortrait";

const roles = [
  "software developer",
  "computer science student",
  "hackathon enthusiast",
];

export function Hero() {
  return (
    <section
      id="home"
      className="grid min-h-screen scroll-mt-28 items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-36"
    >
      <div className="max-w-3xl">
        <FogReveal>
          <div className="theme-surface mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 font-mono text-xs text-accent shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.95)]" />
            available for placeholder opportunities
          </div>
        </FogReveal>

        <FogReveal delay={90}>
          <p className="mb-4 font-mono text-sm text-accent-soft transition-colors duration-300">
            $ whoami
          </p>
        </FogReveal>

        <FogReveal delay={160}>
          <h1 className="hero-title text-balance max-w-4xl text-5xl font-semibold leading-[0.95] text-foreground transition-colors duration-300 sm:text-7xl lg:text-8xl">
            Janusz Kowalski
          </h1>
        </FogReveal>

        <div className="mt-6 flex flex-col gap-2 font-mono text-base text-foreground-soft transition-colors duration-300 sm:text-lg">
          {roles.map((role, index) => (
            <FogReveal key={role} delay={260 + index * 110}>
              <span className="flex items-center gap-2">
                <ArrowDownRight size={17} className="text-cyan-500 dark:text-cyan-300" />
                <span className={role === roles[0] ? "caret" : undefined}>
                  {role}
                </span>
              </span>
            </FogReveal>
          ))}
        </div>

        <FogReveal delay={520}>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted transition-colors duration-300 sm:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            ultricies velit vitae sem posuere, sed porttitor lorem tincidunt.
          </p>
        </FogReveal>

        <FogReveal delay={650}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-mono text-sm font-semibold text-slate-950 shadow-[0_18px_55px_rgba(34,211,238,0.26)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              View projects
              <ArrowRight size={17} />
            </a>
            <a
              href="/resume.pdf"
              className="theme-surface inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-mono text-sm font-semibold text-foreground backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-violet-300/45 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 dark:hover:text-violet-100"
            >
              <Download size={17} />
              Download resume
            </a>
          </div>
        </FogReveal>

        <FogReveal delay={780}>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {skills.map((skill, index) => (
              <Badge
                key={skill}
                tone={index % 4 === 0 ? "cyan" : index % 4 === 1 ? "violet" : "default"}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </FogReveal>
      </div>

      <FogReveal
        className="relative flex w-full max-w-md items-center justify-center py-4 lg:ml-auto lg:max-w-lg"
        delay={320}
      >
        <HeroPortrait />
      </FogReveal>
    </section>
  );
}
