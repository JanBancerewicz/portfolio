type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  return (
    <div className={`mb-10 flex max-w-3xl flex-col ${alignment}`}>
      <div className="theme-surface mb-4 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-normal text-foreground transition-colors duration-300 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-muted transition-colors duration-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
