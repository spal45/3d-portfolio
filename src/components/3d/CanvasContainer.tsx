"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./Scene";
import { usePerfProfile } from "./perf";

export default function CanvasContainer() {
  const perf = usePerfProfile();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-[100dvh] w-full"
    >
      {/* Always-present backdrop; also the fallback when 3D is disabled */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.12),transparent_50%)]" />

      {perf.enable3d && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={perf.dpr}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <Scene nodeCount={perf.nodeCount} />
          </Suspense>
        </Canvas>
      )}

      {/* Legibility wash above the scene, still behind page content */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.85)_0%,rgba(9,9,11,0.5)_45%,rgba(9,9,11,0.12)_72%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent" />
    </div>
  );
}
