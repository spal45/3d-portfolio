import { Mail, ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-line)] bg-[#09090b]/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-mono text-sm text-zinc-300">
            {site.name}
            <span className="text-[var(--color-accent)]">.</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Built with Next.js, React Three Fiber &amp; Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            <Mail size={18} />
          </a>
          <a
            href="#hero"
            aria-label="Back to top"
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--color-line)] py-4 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
