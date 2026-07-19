import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type FogRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function FogReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: FogRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`fog-reveal ${isVisible ? "fog-reveal-visible" : ""} ${className}`}
      style={{ "--fog-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
