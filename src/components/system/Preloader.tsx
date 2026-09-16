"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAssets } from "./AssetLoader";
import { site } from "@/content/site";

export function Preloader() {
  const { progress, ready } = useAssets();
  const [hidden, setHidden] = useState(false);
  const [displayPct, setDisplayPct] = useState(0);

  // ease the counter toward the real progress so it never stutters backwards
  useEffect(() => {
    let raf = 0;
    const target = ready ? 100 : Math.min(96, Math.round(progress * 100));
    const step = () => {
      setDisplayPct((p) => {
        if (p >= target) return p;
        const next = p + Math.max(1, Math.round((target - p) * 0.08));
        return Math.min(next, target);
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [progress, ready]);

  useEffect(() => {
    document.body.dataset.loading = hidden ? "false" : "true";
    return () => {
      document.body.dataset.loading = "false";
    };
  }, [hidden]);

  useEffect(() => {
    if (ready && displayPct >= 100) {
      const t = setTimeout(() => setHidden(true), 450);
      return () => clearTimeout(t);
    }
  }, [ready, displayPct]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-[var(--color-bg)] px-6 py-8 md:px-12 md:py-12"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="flex items-start justify-between">
            <span className="label">
              {site.name}{" "}
              <span className="text-[var(--color-faint)]">{"//"}</span> Portfolio
            </span>
            <span className="font-mono text-4xl tabular-nums text-[var(--color-fg)] md:text-6xl">
              {displayPct}
              <span className="text-[var(--color-faint)]">%</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="h-px w-full max-w-3xl bg-[var(--color-line)]">
              <motion.div
                className="h-px bg-[var(--color-accent)]"
                style={{ width: `${displayPct}%` }}
              />
            </div>
            <motion.p
              className="label label--accent"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              Initializing engine...
            </motion.p>
          </div>

          <div className="flex items-end justify-between">
            <span className="label">{site.role}</span>
            <span className="label hidden sm:inline">{site.location}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
