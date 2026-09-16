"use client";

import { whyHire, education } from "@/content/site";
import { Section, Reveal, Headline } from "@/components/ui/Section";

export function WhyHire() {
  return (
    <Section id="why" label={whyHire.label}>
      <Headline lines={whyHire.headline} />

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-x-16">
        {whyHire.points.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.06}>
            <p className="font-mono text-sm text-[var(--color-fg)]">{p.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {p.body}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 border-t border-[var(--color-line)] pt-12">
        <p className="label">{education.label}</p>
        <div className="mt-6 space-y-6">
          {education.items.map((e) => (
            <Reveal key={e.degree}>
              <p className="text-base font-medium text-[var(--color-fg)]">
                {e.degree}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{e.school}</p>
              <p className="mt-0.5 font-mono text-xs text-[var(--color-faint)]">
                {e.meta}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
