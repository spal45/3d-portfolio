"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  index: string;
  heading: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  heading,
  children,
  className,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(
        "relative mx-auto flex min-h-screen w-full max-w-5xl scroll-mt-24 flex-col justify-center px-6 py-24 md:px-8",
        className,
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div
        variants={fadeUp}
        className="mb-10 flex items-baseline gap-4 md:mb-14"
      >
        <span className="font-mono text-sm text-[var(--color-accent)]">
          {index}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {heading}
        </h2>
        <span className="h-px flex-1 translate-y-[-2px] bg-[var(--color-line)]" />
      </motion.div>
      {children}
    </motion.section>
  );
}
