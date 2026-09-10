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
      {/* Animated aurora backdrop; also the fallback when 3D is disabled */}
      <div className="bg-aurora">
        <div className="bg-aurora__blob bg-aurora__blob--1" />
        <div className="bg-aurora__blob bg-aurora__blob--2" />
        <div className="bg-aurora__blob bg-aurora__blob--3" />
      </div>

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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.7)_0%,rgba(9,9,11,0.38)_48%,rgba(9,9,11,0.08)_78%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent" />
    </div>
  );
}
