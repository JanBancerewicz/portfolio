export function Footer() {
  return (
    <footer className="px-5 pb-10 pt-16 sm:px-6 lg:px-8">
      <div className="theme-surface mx-auto flex max-w-7xl flex-col justify-between gap-4 rounded-3xl border border-border bg-surface px-5 py-5 font-mono text-xs text-subtle backdrop-blur-xl sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Janusz Kowalski</p>
        <p className="text-subtle">Vite / React / TypeScript / Tailwind</p>
      </div>
    </footer>
  );
}
