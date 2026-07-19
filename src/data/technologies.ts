export type TechnologyItem = {
  name: string;
  group: string;
  tone: "cyan" | "violet" | "amber" | "rose";
};

export const technologies: TechnologyItem[] = [
  { name: "TypeScript", group: "Language", tone: "cyan" },
  { name: "React", group: "Frontend", tone: "cyan" },
  { name: "Vite", group: "Tooling", tone: "violet" },
  { name: "Tailwind CSS", group: "Styling", tone: "cyan" },
  { name: "Python", group: "Language", tone: "amber" },
  { name: "Java", group: "Language", tone: "rose" },
  { name: "Android", group: "Mobile", tone: "amber" },
  { name: "WebSocket", group: "Realtime", tone: "violet" },
  { name: "Signal Processing", group: "Data", tone: "cyan" },
  { name: "AI", group: "Systems", tone: "violet" },
  { name: "Docker", group: "DevOps", tone: "cyan" },
  { name: "Git", group: "Workflow", tone: "rose" },
  { name: "REST", group: "Backend", tone: "amber" },
  { name: "Node.js", group: "Runtime", tone: "violet" },
  { name: "SQL", group: "Data", tone: "cyan" },
  { name: "Linux", group: "Tools", tone: "amber" },
];
