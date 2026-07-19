import { useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let points: Point[] = [];
    const mouse = { x: -9999, y: -9999 };
    const isLight = theme === "light";
    const lineAlphaScale = isLight ? 0.14 : 0.22;
    const pointAlpha = isLight ? 0.38 : 0.54;
    const lineRgb = isLight ? "8, 145, 178" : "34, 211, 238";
    const accentRgb = isLight ? "217, 119, 6" : "251, 191, 36";
    const nodeRgb = isLight ? "8, 145, 178" : "34, 211, 238";

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(
        80,
        Math.max(26, Math.floor((window.innerWidth * window.innerHeight) / 18000)),
      );

      points = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      points.forEach((point, index) => {
        if (!mediaQuery.matches) {
          point.x += point.vx;
          point.y += point.vy;
        }

        if (point.x < -20 || point.x > window.innerWidth + 20) point.vx *= -1;
        if (point.y < -20 || point.y > window.innerHeight + 20) point.vy *= -1;

        const mx = mouse.x - point.x;
        const my = mouse.y - point.y;
        const mouseDistance = Math.hypot(mx, my);

        if (!mediaQuery.matches && mouseDistance < 180) {
          point.x -= mx * 0.0018;
          point.y -= my * 0.0018;
        }

        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);

          if (distance < 145) {
            const alpha = (1 - distance / 145) * lineAlphaScale;
            context.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }

        context.fillStyle =
          index % 5 === 0
            ? `rgba(${accentRgb}, ${pointAlpha * 0.9})`
            : `rgba(${nodeRgb}, ${pointAlpha})`;
        context.beginPath();
        context.arc(point.x, point.y, index % 5 === 0 ? 1.7 : 1.25, 0, Math.PI * 2);
        context.fill();
      });

      if (!mediaQuery.matches) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{ opacity: "var(--network-opacity)" }}
    />
  );
}
