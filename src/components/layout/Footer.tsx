import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-sm tracking-widest text-[var(--color-fg)]">
              {site.name.toUpperCase()}
              <span className="text-[var(--color-accent)]">.</span>
            </p>
            <p className="mt-2 label">{site.role}</p>
            <p className="mt-1 label">{site.location}</p>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 label label--accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
              {site.status}
            </span>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-[var(--color-muted)] hover:text-[var(--color-fg)]"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--color-muted)] hover:text-[var(--color-fg)]"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-faint)] sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="font-mono">
            Built with Next.js · Canvas image-sequence · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
