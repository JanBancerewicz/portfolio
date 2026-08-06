import { Link } from "react-router-dom";
import { navigation, site } from "../../data/site";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-rule pb-10 pt-10 md:mt-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-3">
            <p className="text-[1rem] font-medium">{site.name}</p>
            <p className="label mt-1.5">
              {site.role} <span className="mx-1 text-rule-strong"></span>{" "}
              {/* {site.location} */}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-7">
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

          <div className="flex items-center gap-3 md:col-span-2 md:justify-end">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="press grid size-9 place-items-center rounded-full text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              <LinkedInIcon className="size-[1.125rem]" />
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="press grid size-9 place-items-center rounded-full text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              <GitHubIcon className="size-[1.125rem]" />
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

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}
