import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      setProgress(Math.min(100, Math.max(0, nextProgress * 100)));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-1 bg-surface transition-colors duration-300"
    >
      <div
        data-scroll-progress-bar
        className="h-full rounded-r-full bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-500 shadow-[0_0_24px_rgba(34,211,238,0.55)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
