"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Experience() {
  return (
    <Section
      id="experience"
      index={experience.index}
      heading={experience.heading}
    >
      <div className="space-y-14">
        {experience.roles.map((role) => (
          <motion.article
            key={role.company}
            variants={fadeUp}
            className="relative border-l border-[var(--color-line)] pl-6 md:pl-8"
          >
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />

            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="text-lg font-medium text-white">
                {role.role}{" "}
                <span className="text-zinc-500">· {role.company}</span>
              </h3>
              <span className="font-mono text-xs text-zinc-500">
                {role.period}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-zinc-600">
              {role.location}
            </p>
            <p className="mt-3 text-sm text-zinc-400 md:text-base">
              {role.summary}
            </p>

            <motion.ul
              variants={staggerContainer}
              className="mt-4 space-y-2"
            >
              {role.highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={fadeUp}
                  className="flex gap-3 text-sm text-zinc-400"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
