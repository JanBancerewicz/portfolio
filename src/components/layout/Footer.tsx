import { Link } from "react-router-dom";
import { navigation, site } from "../../data/site";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-rule pb-10 pt-10 md:mt-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[1rem] font-medium">{site.name}</p>
            <p className="label mt-1.5">
              {site.role} <span className="mx-1 text-rule-strong">/</span>{" "}
              {site.location}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[1rem] text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                <span className="link-wipe">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-3 md:justify-end">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[1rem] text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              <span className="link-wipe">LinkedIn</span>
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[1rem] text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              <span className="link-wipe">GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-rule pt-4">
          <span className="label">
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="label">Built with React, Vite & Anime.js</span>
        </div>
      </Container>
    </footer>
  );
}
