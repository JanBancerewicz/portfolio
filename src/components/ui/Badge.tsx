import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "cyan" | "violet" | "amber" | "rose" | "accent";
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  const tones = {
    default: "border-border bg-surface text-foreground-soft",
    cyan: "border-cyan-400/35 bg-cyan-400/10 text-accent",
    violet: "border-violet-400/35 bg-violet-400/10 text-violet-700 dark:text-violet-100",
    amber: "border-amber-400/35 bg-amber-400/10 text-amber-700 dark:text-amber-100",
    rose: "border-rose-400/35 bg-rose-400/10 text-rose-700 dark:text-rose-100",
    accent: "border-cyan-400/35 bg-cyan-400/10 text-accent",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[11px] leading-none shadow-[inset_0_1px_0_var(--badge-inset)] transition-[background-color,border-color,color] duration-300 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
