import { animate, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EASE_OUT, prefersReducedMotion } from "../../lib/motion";
import { navigation, site } from "../../data/site";
import { Container } from "../ui/Container";
import { MailLink } from "../ui/MailLink";
import { ThemeToggle } from "../ui/ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Hysteresis around the condense threshold. A single knife-edge at 24px
    // lets trackpad jitter and rubber-banding flip the flag every frame, which
    // restarts the 300ms chrome transitions and makes the bar visibly blink.
    let active = false;
    const onScroll = () => {
      const y = window.scrollY;
      const next = active ? y > 12 : y > 40;
      if (next === active) return;
      active = next;
      setCondensed(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation and on Escape.
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* First thing in the tab order: the nav is six links deep and the page
            body is the only reason anyone is here. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div
          className="relative border-b transition-[border-color] duration-300 ease-out"
          style={{ borderColor: condensed ? "var(--rule)" : "transparent" }}
        >
          {/* Frosted plate is a sibling of the progress bar, not its parent.
              ScrollProgress writes transform every frame; doing that inside a
              backdrop-filter element forces the browser to re-raster the blur
              continuously — that is the mid-scroll nav flicker. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-[background-color] duration-300 ease-out"
            style={{
              backgroundColor: condensed
                ? "color-mix(in srgb, var(--paper) 92%, transparent)"
                : "transparent",
              backdropFilter: condensed ? "blur(12px)" : "none",
              WebkitBackdropFilter: condensed ? "blur(12px)" : "none",
            }}
          />

          <ScrollProgress />

          <Container className="relative">
            <div
              className="flex items-center justify-between gap-6 transition-[height] duration-300 ease-out"
              style={{ height: condensed ? "3.5rem" : "4.5rem" }}
            >
              <Link
                to="/"
                className="group flex items-baseline gap-2.5 whitespace-nowrap"
              >
                <span className="text-[1rem] font-semibold tracking-[-0.02em]">
                  {site.name}
                </span>
                <span className="label hidden xl:inline">{' | my portfolio'}</span>
              </Link>

              <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
                {navigation.map((item) => (
                  <NavLink key={item.href} to={item.href} label={item.label} />
                ))}
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="press hidden rounded-full bg-ink px-4 py-2 text-[0.875rem] font-medium text-paper transition-colors duration-200 hover:bg-accent hover:text-accent-ink sm:inline-block"
                >
                  Get in touch
                </a>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  className="press grid size-9 place-items-center rounded-full border border-rule lg:hidden"
                >
                  <MenuGlyph open={menuOpen} />
                </button>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
    </>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group text-[1rem] text-ink-muted transition-colors duration-200 hover:text-ink"
    >
      <span className="link-wipe">{label}</span>
    </Link>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-4" aria-hidden="true">
      <span
        className="absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ease-out"
        style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}
      />
      <span
        className="absolute left-0 top-1.5 block h-px w-full bg-ink transition-opacity duration-150 ease-out"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="absolute bottom-0 left-0 block h-px w-full bg-ink transition-transform duration-200 ease-out"
        style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}
      />
    </span>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const items = el.querySelectorAll("[data-menu-item]");
    const animation = animate(items, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 420,
      ease: EASE_OUT,
      delay: stagger(45, { start: 60 }),
    });

    return () => void animation.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-40 flex flex-col justify-between bg-paper pt-24 pb-10 lg:hidden"
    >
      <Container>
        <nav className="flex flex-col">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              data-menu-item
              className="flex items-baseline gap-4 border-b border-rule py-5 text-3xl font-medium tracking-[-0.04em]"
            >
              <span className="label w-8 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Container>
        <div data-menu-item className="flex flex-col gap-3">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="press rounded-full bg-ink px-5 py-3.5 text-center text-[1rem] font-medium text-paper"
          >
            Get in touch on LinkedIn
          </a>
          <MailLink className="press rounded-sm border border-rule-strong px-5 py-3.5 text-center text-[1rem] font-medium">
            {site.email}
          </MailLink>
        </div>
      </Container>
    </div>
  );
}
