export type Project = {
  title: string;
  year: string;
  category: string;
  description: string;
  tags: string[];
  accent: "cyan" | "violet" | "amber" | "rose";
  links: Array<{
    label: "GitHub" | "Demo";
    href: string;
  }>;
};

export const projects: Project[] = [
  {
    title: "Realtime Dashboard",
    year: "2026",
    category: "Realtime systems",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae sem at velit aliquet tincidunt.",
    tags: ["TypeScript", "React", "WebSocket"],
    accent: "cyan",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
  {
    title: "Signal Processing Lab",
    year: "2025",
    category: "AI / data",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tags: ["Python", "AI", "Signal Processing"],
    accent: "violet",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
  {
    title: "Android Utility App",
    year: "2025",
    category: "Mobile",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tags: ["Android", "Java", "REST"],
    accent: "amber",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
  {
    title: "Developer Toolkit",
    year: "2024",
    category: "Tooling",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    tags: ["Docker", "CLI", "Automation"],
    accent: "rose",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
];
