"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const viewport = { once: true, margin: "-12% 0px -12% 0px" } as const;

export function Section({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-28 md:px-10 md:py-40",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5 }}
        className="mb-14 flex items-center gap-3 md:mb-20"
      >
        <span className="h-px w-10 bg-[var(--color-accent)]" />
        <span className="label label--accent">{label}</span>
      </motion.div>
      {children}
    </section>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  const M =
    as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  return (
    <M
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </M>
  );
}

export function Headline({
  lines,
  className,
}: {
  lines: string | readonly string[];
  className?: string;
}) {
  const arr = typeof lines === "string" ? [lines] : lines;
  return (
    <Reveal
      className={cn(
        "text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl",
        className,
      )}
    >
      {arr.map((l, i) => (
        <span key={l} className="block">
          {i > 0 ? <span className="outline-text">{l}</span> : l}
        </span>
      ))}
    </Reveal>
  );
}
