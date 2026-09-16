"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { SEQUENCE, framePath } from "@/lib/sequence";

type Frame = HTMLImageElement | ImageBitmap;

type AssetState = {
  progress: number; // 0..1
  ready: boolean;
  frames: Frame[];
};

const AssetContext = createContext<AssetState>({
  progress: 0,
  ready: false,
  frames: [],
});

export function useAssets() {
  return useContext(AssetContext);
}

export function AssetLoader({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    let cancelled = false;
    const frames: Frame[] = new Array(SEQUENCE.count);
    let done = 0;

    const bump = () => {
      done += 1;
      if (!cancelled) setProgress(done / SEQUENCE.count);
    };

    async function loadOne(i: number) {
      try {
        const res = await fetch(framePath(i));
        const blob = await res.blob();
        if ("createImageBitmap" in window) {
          frames[i] = await createImageBitmap(blob);
        } else {
          const img = new Image();
          img.src = URL.createObjectURL(blob);
          await img.decode();
          frames[i] = img;
        }
      } catch {
        // leave slot empty; the canvas will fall back to the nearest frame
      } finally {
        bump();
      }
    }

    // small concurrency pool
    const queue = Array.from({ length: SEQUENCE.count }, (_, i) => i);
    const workers = Array.from({ length: 8 }, async () => {
      while (queue.length && !cancelled) {
        const i = queue.shift();
        if (i === undefined) break;
        await loadOne(i);
      }
    });

    Promise.all(workers).then(() => {
      if (cancelled) return;
      setFrames(frames);
      setReady(true);
    });

    return () => {
      cancelled = true;
      frames.forEach((f) => {
        if (f && "close" in f) f.close();
      });
    };
  }, []);

  return (
    <AssetContext.Provider value={{ progress, ready, frames }}>
      {children}
    </AssetContext.Provider>
  );
}
