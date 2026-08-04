import { animate, onScroll } from "animejs";
import { useEffect, useRef } from "react";
import { EASE_IN_OUT, prefersReducedMotion } from "../../lib/motion";

type CoverRevealProps = {
  src: string;
  alt: string;
  className?: string;
  /** Aspect ratio of the frame, e.g. "3 / 2". */
  ratio?: string;
  delay?: number;
};

/**
 * Image that wipes into view from the bottom edge using `clip-path`, while the
 * image itself settles back from a slight over-scale — so the frame and its
 * contents move at different rates instead of arriving as one flat block.
 *
 * `clip-path` is driven through a numeric proxy rather than tweened as a
 * string, and both properties are composited, so this stays cheap with several
 * covers on screen.
 */
export function CoverReveal({
  src,
  alt,
  className = "",
  ratio = "3 / 2",
  delay = 0,
}: CoverRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;

    if (prefersReducedMotion()) {
      frame.style.opacity = "0";
      const fade = animate(frame, {
        opacity: [0, 1],
        duration: 240,
        ease: "linear",
        autoplay: onScroll({
          target: frame,
          enter: "bottom-=48 top",
          repeat: false,
        }),
      });
      return () => void fade.revert();
    }

    frame.style.clipPath = "inset(0 0 100% 0)";

    const state = { cut: 100 };
    const wipe = animate(state, {
      cut: 0,
      duration: 900,
      delay,
      ease: EASE_IN_OUT,
      onUpdate: () => {
        frame.style.clipPath = `inset(0 0 ${state.cut}% 0)`;
      },
      autoplay: onScroll({
        target: frame,
        enter: "bottom-=64 top",
        repeat: false,
      }),
    });

    const settle = animate(image, {
      scale: [1.12, 1],
      duration: 1200,
      delay,
      ease: EASE_IN_OUT,
      autoplay: onScroll({
        target: frame,
        enter: "bottom-=64 top",
        repeat: false,
      }),
    });

    return () => {
      wipe.revert();
      settle.revert();
      frame.style.clipPath = "";
    };
  }, [delay]);

  return (
    <div
      ref={frameRef}
      className={`relative overflow-hidden bg-paper-sunken ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* Hover scale lives on the wrapper so it never fights the inline
          transform Anime.js writes onto the image itself. */}
      <div className="size-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.035]">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
