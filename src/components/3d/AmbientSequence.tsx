"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { FrameCanvas } from "./FrameCanvas";
import { useAssets } from "@/components/system/AssetLoader";

/**
 * Full-viewport, faint version of the engine sequence that sits behind all
 * content and slowly rotates as the whole page scrolls.
 */
export function AmbientSequence() {
  const { ready } = useAssets();
  const { scrollYProgress } = useScroll();
  const progressRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // play the scene straight through across the whole page (cinematic clip,
    // not a seamless loop, so no wrap)
    progressRef.current = Math.min(1, Math.max(0, v));
  });

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.28]"
      style={{
        maskImage:
          "radial-gradient(circle at 50% 45%, #000 30%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 45%, #000 30%, transparent 80%)",
      }}
    >
      <FrameCanvas progressRef={progressRef} ease={5} />
    </div>
  );
}
