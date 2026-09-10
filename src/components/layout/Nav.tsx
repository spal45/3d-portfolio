"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 py-3 backdrop-blur-md"
          : "border-b border-transparent py-6",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
        <a
          href="#hero"
          className="font-mono text-sm font-semibold tracking-widest text-[var(--color-fg)]"
        >
          {site.firstName.toUpperCase()}
          <span className="text-[var(--color-accent)]">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="label transition-colors hover:text-[var(--color-fg)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/20"
          >
            Let&apos;s Talk
          </a>
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center text-[var(--color-fg)] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)]/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {site.nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="py-3 font-mono text-sm text-[var(--color-fg)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={site.resumePath}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="py-3 font-mono text-sm text-[var(--color-accent)]"
              >
                Résumé ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
