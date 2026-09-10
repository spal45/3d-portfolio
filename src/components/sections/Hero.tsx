"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { hero, site } from "@/content/site";
import { FrameCanvas } from "@/components/3d/FrameCanvas";
import { useAssets } from "@/components/system/AssetLoader";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const { ready } = useAssets();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -70]);
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.9, 1, 0.5],
  );
  const hudOpacity = useTransform(scrollYProgress, [0.45, 0.7, 1], [0, 1, 0.7]);

  return (
    <section id="hero" ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* engine sequence */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: ready ? canvasOpacity : 0 }}
        >
          <FrameCanvas progressRef={progressRef} ease={10} />
        </motion.div>

        {/* fallback + legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(5,5,5,0.75)_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-transparent to-transparent" />

        {/* copy */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative mx-auto w-full max-w-6xl px-6 md:px-10"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-accent)]" />
            <span className="label label--accent rise" style={{ animationDelay: "0.1s" }}>
              {hero.kicker}
            </span>
          </div>

          <h1
            className="rise mt-4 text-[13vw] font-semibold leading-[0.92] tracking-tight md:text-[8.5rem]"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="block">Hello, I&apos;m</span>
            <span className="outline-text block">{site.firstName}.</span>
          </h1>

          <div className="mt-10 grid max-w-3xl gap-8 sm:grid-cols-2">
            <div className="rise" style={{ animationDelay: "0.4s" }}>
              <p className="label">{hero.specializationLabel}</p>
              <p className="mt-2 font-mono text-sm text-[var(--color-fg)]">
                {hero.specialization.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>
            <div className="rise" style={{ animationDelay: "0.5s" }}>
              <p className="label">{hero.focusLabel}</p>
              <p className="mt-2 font-mono text-sm text-[var(--color-fg)]">
                {hero.focus}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
                {hero.focusSub}
              </p>
            </div>
          </div>
        </motion.div>

        {/* HUD corner readout that appears as the engine is revealed */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute bottom-8 left-6 flex items-center gap-3 md:left-10"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
          <span className="label label--accent">Engine online</span>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.span
            className="label"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {hero.scrollCue}
          </motion.span>
        </div>

        <div className="absolute bottom-8 right-6 hidden font-mono text-xs text-[var(--color-faint)] md:block md:right-10">
          {site.location}
        </div>
      </div>
    </section>
  );
}
