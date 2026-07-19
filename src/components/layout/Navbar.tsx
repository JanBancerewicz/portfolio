import { FileText, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "Hackathons", href: "/#hackathons" },
  { label: "Certs", href: "/#certificates" },
  { label: "Resume", href: "/#resume" },
  { label: "Links", href: "/#links" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className="theme-surface mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-border bg-navbar px-3 py-2 shadow-[var(--shadow-navbar)] backdrop-blur-2xl"
      >
        <a
          href="/#home"
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 font-mono text-sm font-semibold tracking-normal text-foreground transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-xs text-white shadow-[0_0_30px_rgba(34,211,238,0.35)]">
            JK
          </span>
          <span className="hidden sm:inline">portfolio.dev</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 font-mono text-xs text-muted transition hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            aria-label="Download resume"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-soft transition hover:border-cyan-300/45 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <FileText size={16} />
          </a>
          <a
            href="/#links"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 font-mono text-xs font-semibold text-slate-950 shadow-[0_12px_38px_rgba(34,211,238,0.24)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <MessageCircle size={15} />
            Links
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-cyan-300/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="theme-surface mx-auto mt-3 max-w-5xl rounded-3xl border border-border bg-navbar-solid p-3 shadow-[var(--shadow-navbar)] backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 font-mono text-sm text-foreground-soft transition hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
