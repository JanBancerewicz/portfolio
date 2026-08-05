import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ContentEntry } from "../../content/types";
import { site } from "../../data/site";
import { prefersReducedMotion } from "../../lib/motion";
import { TechIconRow } from "./TechIcon";

/**
 * Horizontal project rail — a level-select shelf of vertical reels.
 *
 * Two modes, picked from the input device rather than from the width alone:
 *
 * **Pinned (mouse/trackpad).** The section is made taller than the viewport by
 * exactly the rail's travel, and its contents are `position: sticky`. Ordinary
 * page scrolling therefore holds the shelf in place and moves it sideways
 * instead — no wheel interception, no `preventDefault`, and it engages wherever
 * the pointer happens to be rather than only over the rail. Scrollbars, keyboard
 * paging and momentum all keep working, and once the shelf is exhausted the page
 * simply carries on into the contact section.
 *
 * **Swipe (touch).** Native horizontal overflow with snap points. A finger
 * already does the right thing here; pinning a tall section on a phone fights
 * the dynamic viewport for no gain.
 */
export function ProjectRail({ entries }: { entries: ContentEntry[] }) {
  const [pinned, setPinned] = useState(false);

  // Resolved after mount so the prerendered markup stays device-agnostic.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const sync = () => setPinned(query.matches && !prefersReducedMotion());
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return pinned ? (
    <PinnedRail entries={entries} />
  ) : (
    <SwipeRail entries={entries} />
  );
}

/* -------------------------------------------------------------------------- */
/* Pinned                                                                      */
/* -------------------------------------------------------------------------- */

function PinnedRail({ entries }: { entries: ContentEntry[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return;

    let frame = 0;
    let lastActive = -1;

    /** Prefer the sticky pane's real height over innerHeight — zoom and
     *  `svh`/`dvh` disagree with `window.innerHeight`, and that mismatch
     *  made progress never quite reach 1 (so Back to start never appeared). */
    const viewportHeight = () => sticky.clientHeight || window.innerHeight;

    /** Rail travel drives the section's extra height one-for-one. */
    const layout = () => {
      const travel = Math.max(0, track.scrollWidth - window.innerWidth);
      travelRef.current = travel;
      section.style.height = `${viewportHeight() + travel}px`;
      render();
    };

    const render = () => {
      frame = 0;

      const travel = travelRef.current;
      const view = viewportHeight();
      const distance = Math.max(0, section.offsetHeight - view);
      const scrolled = -section.getBoundingClientRect().top;
      const progress =
        distance > 0 ? Math.min(1, Math.max(0, scrolled / distance)) : 0;

      track.style.transform = `translate3d(${-(progress * travel).toFixed(2)}px, 0, 0)`;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(0.06, progress)})`;
      }

      // Pixel slack: zoom leaves fractional tops that never hit 0.999 exactly.
      setAtStart(distance <= 0 || progress <= 0.001);
      setAtEnd(distance > 0 && scrolled >= distance - 2);

      const index = Math.min(
        entries.length - 1,
        Math.round(progress * (entries.length - 1)),
      );
      if (index !== lastActive && readoutRef.current) {
        lastActive = index;
        readoutRef.current.textContent = String(index + 1).padStart(2, "0");
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(render);
    };

    layout();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", layout);

    // Card widths depend on viewport height, so the track can change size
    // without a resize event (fonts loading, images decoding, browser zoom).
    const observer = new ResizeObserver(layout);
    observer.observe(track);
    observer.observe(sticky);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", layout);
      observer.disconnect();
      section.style.height = "";
    };
  }, [entries.length]);

  /** Controls move the page, because the page is what drives the rail. */
  const scrollToProgress = (progress: number) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section) return;
    const view = sticky?.clientHeight || window.innerHeight;
    const distance = Math.max(0, section.offsetHeight - view);
    const top = section.offsetTop + distance * Math.min(1, Math.max(0, progress));
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const step = (direction: 1 | -1) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section) return;
    const view = sticky?.clientHeight || window.innerHeight;
    const distance = Math.max(0, section.offsetHeight - view);
    if (distance <= 0) return;
    const current = Math.min(
      1,
      Math.max(0, (-section.getBoundingClientRect().top) / distance),
    );
    const stops = Math.max(1, entries.length - 1);
    const index = Math.round(current * stops);
    scrollToProgress((index + direction) / stops);
  };

  return (
    <div ref={sectionRef} className="relative">
      {/*
        Start-aligned (not centered): the projects masthead sits above this
        shelf, so vertical centering left a large empty band under the lede.
        Top padding clears the fixed header once the shelf pins to the viewport.
        Overflow is clipped on the track only — clipping the whole pane hid
        Back to start whenever cards + chrome exceeded the zoomed viewport.
      */}
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-svh flex-col justify-start pt-16 md:pt-20"
      >
        {/* Clip the track alone so sideways travel cannot spill; keep controls
            packed under the cards (not flexed to the bottom of the pane). */}
        <div className="shrink-0 overflow-x-hidden">
          <div
            ref={trackRef}
            className="rail-gutter flex w-max gap-[1.8rem] will-change-transform"
          >
            {entries.map((entry, index) => (
              <ReelCard key={entry.meta.slug} entry={entry} index={index + 1} />
            ))}
          </div>
        </div>

        <RailControls
          total={entries.length}
          readoutRef={readoutRef}
          progressRef={progressRef}
          atStart={atStart}
          atEnd={atEnd}
          onPrevious={() => step(-1)}
          onNext={() => step(1)}
          onBackToStart={() => scrollToProgress(0)}
          hint={
            <>
              Looking for more? Check my repositories on{" "}
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-baseline gap-2.5"
              >
                <span>GitHub</span>
                <span className="text-[1rem] font-normal normal-case tracking-normal text-ink-muted transition-colors duration-200 group-hover:text-ink">
                  <span className="link-wipe">JanBancerewicz</span>
                </span>
              </a>
            </>
          }
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Swipe                                                                       */
/* -------------------------------------------------------------------------- */

function SwipeRail({ entries }: { entries: ContentEntry[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    let lastActive = -1;

    const measure = () => {
      frame = 0;

      const max = rail.scrollWidth - rail.clientWidth;
      const left = rail.scrollLeft;
      const progress = max > 0 ? left / max : 0;

      setAtStart(left <= 2);
      setAtEnd(max <= 2 || left >= max - 2);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(0.06, progress)})`;
      }

      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-rail-card]"),
      );
      if (!cards.length) return;

      const middle = left + rail.clientWidth / 2;
      let index = 0;
      let shortest = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
        if (distance < shortest) {
          shortest = distance;
          index = i;
        }
      });

      if (index !== lastActive && readoutRef.current) {
        lastActive = index;
        readoutRef.current.textContent = String(index + 1).padStart(2, "0");
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    rail.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-rail-card]"),
    );
    const stride =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : rail.clientWidth * 0.8;
    rail.scrollBy({
      left: stride * direction,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="rail rail-gutter flex gap-[1.8rem] overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Project reels, swipe sideways"
      >
        {entries.map((entry, index) => (
          <ReelCard key={entry.meta.slug} entry={entry} index={index + 1} />
        ))}
      </div>

      <RailControls
        total={entries.length}
        readoutRef={readoutRef}
        progressRef={progressRef}
        atStart={atStart}
        atEnd={atEnd}
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
        onBackToStart={() =>
          railRef.current?.scrollTo({
            left: 0,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          })
        }
        hint="Swipe sideways through the reels"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared chrome                                                               */
/* -------------------------------------------------------------------------- */

function RailControls({
  total,
  readoutRef,
  progressRef,
  atStart,
  atEnd,
  onPrevious,
  onNext,
  onBackToStart,
  hint,
}: {
  total: number;
  readoutRef: React.RefObject<HTMLSpanElement | null>;
  progressRef: React.RefObject<HTMLDivElement | null>;
  atStart: boolean;
  atEnd: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onBackToStart: () => void;
  hint: React.ReactNode;
}) {
  return (
    <div className="rail-gutter mt-4 shrink-0">
      <div className="flex items-center gap-5">
        <span className="label shrink-0 tabular-nums" data-rail-readout>
          <span ref={readoutRef}>01</span>
          <span className="mx-1 text-rule-strong">/</span>
          {String(total).padStart(2, "0")}
        </span>

        <div className="relative h-px flex-1 overflow-hidden bg-rule">
          <div
            ref={progressRef}
            className="absolute inset-0 origin-left bg-accent"
            style={{ transform: "scaleX(0.06)" }}
          />
        </div>

        <div className="flex shrink-0 gap-2">
          <RailButton label="Previous project" disabled={atStart} onClick={onPrevious}>
            ←
          </RailButton>
          <RailButton label="Next project" disabled={atEnd} onClick={onNext}>
            →
          </RailButton>
        </div>
      </div>

      <div className="mt-4 flex min-h-8 items-center justify-between gap-4">
        <p className="label min-w-0">{hint}</p>

        {/* Raised only once there is nothing left to the right. */}
        <button
          type="button"
          onClick={onBackToStart}
          tabIndex={atEnd ? 0 : -1}
          aria-hidden={!atEnd}
          data-rail-restart
          className="press inline-flex shrink-0 items-center gap-2.5 rounded-full bg-ink px-4 py-2 text-[0.875rem] font-medium text-paper transition-[opacity,transform,background-color,color] duration-300 ease-out hover:bg-accent hover:text-accent-ink"
          style={{
            opacity: atEnd ? 1 : 0,
            transform: atEnd ? "none" : "translateY(6px)",
            pointerEvents: atEnd ? "auto" : "none",
          }}
        >
          <span aria-hidden="true">↺</span>
          Back to start
        </button>
      </div>
    </div>
  );
}

function RailButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="press grid size-9 place-items-center rounded-full border border-rule text-ink transition-[color,border-color,opacity] duration-200 hover:border-ink disabled:pointer-events-none disabled:opacity-30"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

const ReelCard = memo(function ReelCard({
  entry,
  index,
}: {
  entry: ContentEntry;
  index: number;
}) {
  const { meta } = entry;
  const [motionOk, setMotionOk] = useState(false);

  // Autoplaying video is motion the user cannot pause by design, so it is
  // gated behind the reduced-motion check and the poster stands in.
  useEffect(() => setMotionOk(!prefersReducedMotion()), []);

  const still = meta.poster ?? meta.cover;

  return (
    <Link
      to={`/projects/${meta.slug}`}
      data-rail-card
      // Sizing lives in `.reel-card` — see index.css.
      className="reel-card group relative block shrink-0"
    >
      <div className="relative size-full overflow-hidden rounded-sm border border-rule bg-paper-sunken">
        {meta.reel && motionOk ? (
          <video
            className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            src={meta.reel}
            poster={still}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <img
            src={still}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* Scrim: the caption has to stay legible over any frame, including a
            bright one once real footage lands here. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-45% to-black/5" />

        <span className="absolute left-4 top-3 font-mono text-[2.25rem] font-medium leading-none text-white/85">
          {String(index).padStart(2, "0")}
        </span>

        <span className="label absolute right-4 top-4 text-white/70">
          {meta.date}
        </span>

        <div className="absolute inset-x-4 bottom-4 text-white">
          <h3 className="text-[1.3125rem] font-medium leading-tight tracking-[-0.03em]">
            {meta.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[0.875rem] leading-snug text-white/75">
            {meta.reelCaption ?? meta.summary}
          </p>

          <TechIconRow labels={meta.tags} className="mt-3.5 text-white/85" max={4} />

          <span className="label mt-3.5 flex items-center gap-2 text-white/70 transition-colors duration-200 group-hover:text-white">
            Explore project
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
});
