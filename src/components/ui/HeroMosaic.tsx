import { animate, onScroll, utils } from "animejs";
import { useEffect, useRef, useState } from "react";
import portrait from "../../assets/hero-portrait.webp";
import {
  detections,
  personClass,
  personTraits,
  type Detection,
} from "../../data/detections";
import {
  MOSAIC_ASPECT,
  MOSAIC_COLOURS,
  MOSAIC_COLS,
  MOSAIC_ROWS,
} from "../../data/heroMosaic";
import { EASE_IN_OUT, canHover, prefersReducedMotion } from "../../lib/motion";

/** Width of the travelling wave, in normalised diagonal units. */
const BAND = 0.16;
const REVEAL_DURATION = 2400;

/** Decode the packed RGB table once per session, not once per mount. */
let colourTable: Uint8Array | null = null;
function colours() {
  if (colourTable) return colourTable;
  const binary = atob(MOSAIC_COLOURS);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  colourTable = bytes;
  return bytes;
}

type RGB = [number, number, number];

function readVar(name: string): RGB {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const hex = raw.replace("#", "");
  if (hex.length !== 6) return [0, 0, 0];
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

/**
 * Hero plate: a low-poly self-portrait that assembles itself out of triangles,
 * then runs a mock object detector when you point at it.
 *
 * The source artwork is already low-poly, so the intro re-cuts it into a grid
 * of triangles and flips them in a diagonal wave from the bottom-left corner.
 * Each triangle starts as a desaturated ghost mixed toward the page colour — so
 * the portrait grows out of the paper rather than out of a grey box — and lands
 * on its real colour halfway through its flip. The wave hands over to the
 * full-resolution image at the end, which is what stays on screen.
 *
 * Rendering trick: only the ~15% of triangles inside the wave are drawn
 * individually. Everything behind the wave is one `drawImage` of the finished
 * portrait, and everything ahead of it is one `drawImage` of a pre-rendered
 * ghost, both clipped to the half-plane the wave defines. That keeps a
 * 6,500-triangle mosaic inside a frame budget.
 */
export function HeroMosaic({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    // Re-bound as non-null constants: the helpers below are hoisted function
    // declarations, which do not see the narrowing from the guards above.
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = context;

    const rgb = colours();
    const image = new Image();
    let imageReady = false;

    let width = 0;
    let height = 0;
    let dpr = 1;

    /** Pre-rendered monochrome mosaic, rebuilt on resize or theme change. */
    let ghost: HTMLCanvasElement | null = null;

    let wavefront = -BAND;
    let done = false;

    function triangle(col: number, row: number, t: number) {
      const w = width / MOSAIC_COLS;
      const h = height / MOSAIC_ROWS;
      const x = col * w;
      const y = row * h;
      const flip = (col + row) % 2 === 0;

      const points: number[] = flip
        ? t === 0
          ? [x, y, x + w, y, x, y + h]
          : [x + w, y, x + w, y + h, x, y + h]
        : t === 0
          ? [x, y, x + w, y, x + w, y + h]
          : [x, y, x + w, y + h, x, y + h];

      return { points, index: ((row * MOSAIC_COLS + col) * 2 + t) * 3 };
    }

    function fillTriangle(
      target: CanvasRenderingContext2D,
      points: number[],
      style: string,
      squash = 1,
    ) {
      const [ax, ay, bx, by, cx, cy] = points;

      target.fillStyle = style;
      target.beginPath();

      if (squash === 1) {
        target.moveTo(ax, ay);
        target.lineTo(bx, by);
        target.lineTo(cx, cy);
      } else {
        // Squash toward the centroid on the y axis — the read of a facet
        // turning edge-on to the viewer.
        const my = (ay + by + cy) / 3;
        target.moveTo(ax, my + (ay - my) * squash);
        target.lineTo(bx, my + (by - my) * squash);
        target.lineTo(cx, my + (cy - my) * squash);
      }

      target.closePath();
      target.fill();
    }

    /** Ghost colour: greyscale, pulled most of the way to the page colour. */
    function ghostStyle(index: number, paper: RGB, ink: RGB) {
      const luminance =
        (0.299 * rgb[index] + 0.587 * rgb[index + 1] + 0.114 * rgb[index + 2]) /
        255;
      const mix = 0.1 + (1 - luminance) * 0.24;
      return `rgb(${Math.round(paper[0] + (ink[0] - paper[0]) * mix)},${Math.round(
        paper[1] + (ink[1] - paper[1]) * mix,
      )},${Math.round(paper[2] + (ink[2] - paper[2]) * mix)})`;
    }

    function buildGhost() {
      const paper = readVar("--paper");
      const ink = readVar("--ink");

      const layer = document.createElement("canvas");
      layer.width = canvas.width;
      layer.height = canvas.height;
      const g = layer.getContext("2d");
      if (!g) return null;

      g.scale(dpr, dpr);

      for (let row = 0; row < MOSAIC_ROWS; row += 1) {
        for (let col = 0; col < MOSAIC_COLS; col += 1) {
          for (let t = 0; t < 2; t += 1) {
            const { points, index } = triangle(col, row, t);
            fillTriangle(g, points, ghostStyle(index, paper, ink));
          }
        }
      }

      return layer;
    }

    /**
     * Clip to one side of the wave. The boundary `x/W - y/H = 2u - 1` is a
     * straight line; the ragged edge the eye actually sees comes from the
     * individually drawn triangles painted over it.
     */
    function clipToWave(side: "behind" | "ahead", u: number) {
      const k = 2 * u - 1;
      const xTop = width * k;
      const xBottom = width * (k + 1);

      ctx.beginPath();
      if (side === "behind") {
        ctx.moveTo(-width, 0);
        ctx.lineTo(xTop, 0);
        ctx.lineTo(xBottom, height);
        ctx.lineTo(-width, height);
      } else {
        ctx.moveTo(xTop, 0);
        ctx.lineTo(width * 2, 0);
        ctx.lineTo(width * 2, height);
        ctx.lineTo(xBottom, height);
      }
      ctx.closePath();
      ctx.clip();
    }

    function drawPortrait() {
      if (!imageReady) return;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
    }

    function drawReveal() {
      ctx.clearRect(0, 0, width, height);

      // Behind the wave: the finished portrait.
      ctx.save();
      clipToWave("behind", wavefront - BAND);
      if (imageReady) ctx.drawImage(image, 0, 0, width, height);
      ctx.restore();

      // Ahead of the wave: the monochrome ghost.
      if (ghost) {
        ctx.save();
        clipToWave("ahead", wavefront);
        ctx.drawImage(ghost, 0, 0, width, height);
        ctx.restore();
      }

      // The wave itself, triangle by triangle.
      const paper = readVar("--paper");
      const ink = readVar("--ink");

      for (let row = 0; row < MOSAIC_ROWS; row += 1) {
        const ny = MOSAIC_ROWS > 1 ? row / (MOSAIC_ROWS - 1) : 0;

        // u = (nx + 1 - ny) / 2, so the column range covering the wave for this
        // row follows directly from the wavefront.
        const colFor = (u: number) => (2 * u - 1 + ny) * (MOSAIC_COLS - 1);
        const from = Math.max(0, Math.floor(colFor(wavefront - BAND)));
        const to = Math.min(MOSAIC_COLS - 1, Math.ceil(colFor(wavefront)));

        for (let col = from; col <= to; col += 1) {
          const nx = MOSAIC_COLS > 1 ? col / (MOSAIC_COLS - 1) : 0;
          const u = (nx + 1 - ny) / 2;
          const p = utils.clamp((wavefront - u) / BAND, 0, 1);
          if (p <= 0 || p >= 1) continue;

          const squash = Math.abs(Math.cos(p * Math.PI));

          for (let t = 0; t < 2; t += 1) {
            const { points, index } = triangle(col, row, t);
            const style =
              p < 0.5
                ? ghostStyle(index, paper, ink)
                : `rgb(${rgb[index]},${rgb[index + 1]},${rgb[index + 2]})`;
            fillTriangle(ctx, points, style, squash);
          }
        }
      }
    }

    function resize() {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.width / MOSAIC_ASPECT;

      // Only the backing store is set here. The displayed size stays owned by
      // CSS (`w-full` + `aspect-ratio`), so a late resize callback costs a
      // moment of resampling rather than a visibly wrong-sized element.
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (done) {
        drawPortrait();
        return;
      }

      ghost = buildGhost();
      drawReveal();
    }

    function finish() {
      done = true;
      ghost = null;
      drawPortrait();
      setRevealed(true);
    }

    const observer = new ResizeObserver(resize);
    let reveal: ReturnType<typeof animate> | undefined;

    image.onload = () => {
      imageReady = true;
      resize();
      observer.observe(wrap);

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      reveal = animate(
        { w: -BAND },
        {
          w: 1 + BAND,
          duration: REVEAL_DURATION,
          delay: 450,
          ease: EASE_IN_OUT,
          onUpdate: (self) => {
            wavefront = (self.targets[0] as { w: number }).w;
            drawReveal();
          },
          onComplete: finish,
          autoplay: onScroll({
            target: wrap,
            enter: "bottom-=64 top",
            repeat: false,
          }),
        },
      );
    };

    image.src = portrait;

    // Theme swaps only affect the ghost, which stops existing once revealed.
    const themeWatcher = new MutationObserver(() => {
      if (done || !imageReady) return;
      ghost = buildGhost();
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
      themeWatcher.disconnect();
      reveal?.revert();
      image.onload = null;
    };
  }, []);

  const active = revealed && detecting;

  return (
    <figure className={`group relative m-0 ${className}`}>
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-sm border border-rule"
        onPointerEnter={(event) => {
          if (event.pointerType === "touch" || !canHover()) return;
          setDetecting(true);
        }}
        onPointerLeave={() => setDetecting(false)}
        // Touch has no hover, so a tap runs the detector instead.
        onClick={() => {
          if (canHover()) return;
          setDetecting((on) => !on);
        }}
      >
        <canvas
          ref={canvasRef}
          className="block w-full"
          style={{ aspectRatio: MOSAIC_ASPECT }}
          role="img"
          aria-label="Low-poly illustrated portrait of Jan Bancerewicz in Monaco"
        />
        <DetectionLayer active={active} />
      </div>

      <figcaption className="label mt-3 flex items-baseline justify-between gap-4">
        <span>Nice '26</span>
        <span
          className="transition-colors duration-200"
          style={{ color: active ? "var(--accent)" : undefined }}
        >
          {active
            ? `${detections.length} objects detected`
            : "Hover: run detection"}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Mock detector read-out. Driven entirely by CSS transitions off a single
 * `data-active` attribute rather than a JS timeline: hover is toggled rapidly,
 * and transitions retarget mid-flight where keyframes would restart from zero.
 * Entry staggers box by box; exit is quick and unstaggered.
 */
function DetectionLayer({ active }: { active: boolean }) {
  return (
    <div
      className="detect-layer"
      data-detect={active ? "on" : undefined}
      aria-hidden="true"
    >
      <div className="detect-scan" />

      {detections.map((detection, index) => (
        <DetectionBox
          key={detection.id}
          detection={detection}
          delay={140 + index * 70}
        />
      ))}
    </div>
  );
}

function DetectionBox({
  detection,
  delay,
}: {
  detection: Detection;
  delay: number;
}) {
  const { label, confidence, x, y, w, h, primary, tag = "top-left" } = detection;

  return (
    <div
      className={`detect-box ${primary ? "detect-box--primary" : ""}`}
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: `${w * 100}%`,
        height: `${h * 100}%`,
        ["--detect-delay" as string]: `${delay}ms`,
      }}
    >
      <span className="detect-corner detect-corner--tl" />
      <span className="detect-corner detect-corner--tr" />
      <span className="detect-corner detect-corner--bl" />
      <span className="detect-corner detect-corner--br" />

      <span className={`detect-tag detect-tag--${tag}`}>
        {primary ? `${label} · ${personClass}` : label}{" "}
        <span className="detect-score">{confidence.toFixed(2)}</span>
      </span>

      {primary ? (
        <span className="detect-traits">
          {personTraits.map((trait, index) => (
            <span
              key={trait}
              className="detect-trait"
              style={{
                ["--detect-delay" as string]: `${delay + 180 + index * 55}ms`,
              }}
            >
              {trait}
            </span>
          ))}
        </span>
      ) : null}
    </div>
  );
}
