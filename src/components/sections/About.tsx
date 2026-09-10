"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { about } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";

export function About() {
  return (
    <Section id="about" index={about.index} heading={about.heading}>
      <div className="grid gap-12 md:grid-cols-[1fr_320px] md:gap-16">
        <div className="space-y-5">
          {about.paragraphs.map((p) => (
            <motion.p
              key={p.slice(0, 24)}
              variants={fadeUp}
              className="text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              {p}
            </motion.p>
          ))}

          <motion.dl
            variants={fadeUp}
            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--color-line)] pt-8"
          >
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  {f.label}
                </dt>
                <dd className="mt-1 text-sm text-zinc-200">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          variants={fadeUp}
          className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-xl border border-[var(--color-line)] bg-zinc-900"
        >
          <Image
            src={about.photo}
            alt="Subhankar Pal"
            fill
            sizes="320px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
        </motion.div>
      </div>
    </Section>
  );
}
