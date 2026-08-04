import { useTheme } from "../../theme/ThemeProvider";

/**
 * Sun/moon crossfade. Both glyphs are always mounted and swap with opacity and
 * a small rotation — a transition, not a keyframe, so rapid toggling retargets
 * smoothly instead of restarting.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`press relative grid size-9 place-items-center rounded-full border border-rule text-ink transition-colors duration-200 hover:border-rule-strong ${className}`}
    >
      <span className="relative block size-4">
        <SunIcon
          className="absolute inset-0 transition-[opacity,transform] duration-200 ease-out"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-45deg) scale(0.8)" : "none",
          }}
        />
        <MoonIcon
          className="absolute inset-0 transition-[opacity,transform] duration-200 ease-out"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? "none" : "rotate(45deg) scale(0.8)",
          }}
        />
      </span>
    </button>
  );
}

type IconProps = { className?: string; style?: React.CSSProperties };

function SunIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1" />
    </svg>
  );
}

function MoonIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" />
    </svg>
  );
}
