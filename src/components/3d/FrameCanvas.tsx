"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useAssets } from "@/components/system/AssetLoader";
import { SEQUENCE } from "@/lib/sequence";
import { cn } from "@/lib/cn";

type FrameCanvasProps = {
  /** ref holding the target scrub position, 0..1 */
  progressRef: RefObject<number>;
  className?: string;
  /** how hard the drawn frame is eased toward the target (higher = snappier) */
  ease?: number;
  fit?: "cover" | "contain";
};

export function FrameCanvas({
  progressRef,
  className,
  ease = 8,
  fit = "cover",
}: FrameCanvasProps) {
  const { frames } = useAssets();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let current = progressRef.current ?? 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    };
    resize();
    window.addEventListener("resize", resize);

    const pickFrame = (p: number) => {
      const idx = Math.max(
        0,
        Math.min(SEQUENCE.count - 1, Math.round(p * (SEQUENCE.count - 1))),
      );
      for (let d = 0; d < SEQUENCE.count; d++) {
        if (frames[idx + d]) return frames[idx + d];
        if (frames[idx - d]) return frames[idx - d];
      }
      return undefined;
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const target = progressRef.current ?? 0;
      current += (target - current) * Math.min(1, ease * dt);

      const frame = pickFrame(current);
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      if (frame) {
        const iw = "width" in frame ? frame.width : SEQUENCE.width;
        const ih = "height" in frame ? frame.height : SEQUENCE.height;
        const scale =
          fit === "cover"
            ? Math.max(cw / iw, ch / ih)
            : Math.min(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [frames, ease, fit, progressRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block h-full w-full", className)}
    />
  );
}
