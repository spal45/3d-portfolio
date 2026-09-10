"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";

export function Projects() {
  return (
    <Section id="projects" index={projects.index} heading={projects.heading}>
      <div className="space-y-20">
        {projects.items.map((project, i) => (
          <motion.article
            key={project.name}
            variants={fadeUp}
            className="grid gap-8 md:grid-cols-2 md:gap-12"
          >
            <div
              className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--color-line)] bg-zinc-900 ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
                {project.kind}
              </p>
              <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-white md:text-2xl">
                {project.name}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name}`}
                    className="text-zinc-500 transition-colors hover:text-white"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </h3>

              <p className="mt-3 text-sm text-zinc-400">{project.problem}</p>

              <ul className="mt-4 space-y-2">
                {project.contributions.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-zinc-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {c}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
