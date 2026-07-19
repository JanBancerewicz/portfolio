export type Hackathon = {
  name: string;
  date: string;
  result: string;
  role: string;
  description: string;
  tags: string[];
};

export const hackathons: Hackathon[] = [
  {
    name: "Hackathon Placeholder 01",
    date: "Month 2026",
    result: "Result placeholder",
    role: "Frontend / pitch",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae lectus non justo efficitur volutpat.",
    tags: ["frontend", "AI", "result placeholder"],
  },
  {
    name: "Competition Placeholder 02",
    date: "Month 2025",
    result: "Finalist",
    role: "Backend / team lead",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.",
    tags: ["backend", "team lead", "finalist"],
  },
  {
    name: "Hackathon Placeholder 03",
    date: "Month 2025",
    result: "Demo shipped",
    role: "Mobile prototype",
    description:
      "Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.",
    tags: ["mobile", "prototype", "demo"],
  },
  {
    name: "Competition Placeholder 04",
    date: "Month 2024",
    result: "Award placeholder",
    role: "Data / research",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.",
    tags: ["data", "research", "award placeholder"],
  },
];
