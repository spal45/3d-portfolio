"use client";

import { pitch } from "@/content/site";
import { Section, Reveal } from "@/components/ui/Section";

export function Pitch() {
  return (
    <Section id="pitch" label={pitch.label}>
      <Reveal className="font-mono text-sm text-[var(--color-accent)]">
        {pitch.greeting}
      </Reveal>
      <Reveal
        delay={0.05}
        className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl"
      >
        {pitch.headline}
      </Reveal>
      <Reveal
        delay={0.1}
        className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg"
      >
        {pitch.lead}
      </Reveal>

      <div className="mt-16 grid gap-10 border-t border-[var(--color-line)] pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
        <Reveal>
          <p className="font-mono text-sm text-[var(--color-fg)]">{pitch.role}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
            {pitch.bio}
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-20 label">{pitch.cardsLabel}</Reveal>
      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {pitch.cards.map((card, i) => (
          <Reveal
            key={card.title}
            as="article"
            delay={(i % 3) * 0.05}
            className="bg-[var(--color-bg)] p-6 transition-colors hover:bg-[var(--color-surface)]"
          >
            <span className="font-mono text-xs text-[var(--color-faint)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-base font-medium text-[var(--color-fg)]">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {card.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
