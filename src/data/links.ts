import { FileText, GitBranch, Mail, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProfileLink = {
  label: string;
  caption: string;
  href: string;
  icon: LucideIcon;
};

export const links: ProfileLink[] = [
  {
    label: "GitHub",
    caption: "github.com/JanBancerewicz",
    href: "https://github.com/JanBancerewicz",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    caption: "linkedin.com/in/jan-bancerewicz",
    href: "https://www.linkedin.com/in/jan-bancerewicz/",
    icon: UserRound,
  },
  {
    label: "Email",
    caption: "hello@example.com",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
  {
    label: "CV",
    caption: "/resume.pdf",
    href: "/resume.pdf",
    icon: FileText,
  },
];
