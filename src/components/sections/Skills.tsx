"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Skills() {
  return (
    <Section id="skills" index={skills.index} heading={skills.heading}>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group) => (
          <motion.div
            key={group.label}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-line)] bg-white/[0.02] p-5"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              {group.label}
            </h3>
            <motion.ul
              variants={staggerContainer}
              className="mt-4 flex flex-wrap gap-2"
            >
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
