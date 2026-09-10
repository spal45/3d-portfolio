"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { AssetLoader } from "@/components/system/AssetLoader";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <AssetLoader>{children}</AssetLoader>
    </MotionConfig>
  );
}
