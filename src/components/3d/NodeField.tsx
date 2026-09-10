"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type NodeFieldState = {
  /** 0..1 — overall visibility of the node cloud */
  nodes: number;
  /** 0..1 — visibility of the connecting lines */
  lines: number;
  /** multiplier on the cloud radius */
  spread: number;
};

export function NodeField({
  count,
  stateRef,
}: {
  count: number;
  stateRef: RefObject<{ node: NodeFieldState }>;
}) {
  const group = useRef<THREE.Group>(null);
  const pointsMat = useRef<THREE.PointsMaterial>(null);
  const linesMat = useRef<THREE.LineBasicMaterial>(null);

  const { positions, lineGeometry } = useMemo(() => {
    // deterministic PRNG so node layout is stable across renders / SSR
    let seed = 0x9e3779b9 ^ count;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const positions = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      // uniform direction on the unit sphere from two random numbers
      const u = rand() * 2 - 1;
      const phi = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const v = new THREE.Vector3(
        r * Math.cos(phi),
        r * Math.sin(phi),
        u,
      ).multiplyScalar(1.6 + rand() * 1.4);
      pts.push(v);
      positions.set([v.x, v.y, v.z], i * 3);
    }

    const linePos: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const near = pts
        .map((p, j) => ({ j, d: p.distanceTo(pts[i]) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      for (const { j } of near) {
        linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePos, 3),
    );

    return { positions, lineGeometry };
  }, [count]);

  useFrame((_, delta) => {
    const node = stateRef.current?.node;
    if (!node) return;
    const d = Math.min(delta, 0.1);

    if (group.current) {
      group.current.rotation.y += d * 0.06;
      const s = THREE.MathUtils.damp(
        group.current.scale.x || 0.001,
        Math.max(node.spread, 0.001),
        3,
        d,
      );
      group.current.scale.setScalar(s);
    }
    if (pointsMat.current) {
      pointsMat.current.opacity = THREE.MathUtils.damp(
        pointsMat.current.opacity,
        node.nodes,
        4,
        d,
      );
    }
    if (linesMat.current) {
      linesMat.current.opacity = THREE.MathUtils.damp(
        linesMat.current.opacity,
        node.lines * 0.5,
        4,
        d,
      );
    }
  });

  if (count === 0) return null;

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMat}
          size={0.045}
          color="#c7d2fe"
          transparent
          opacity={0}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          ref={linesMat}
          color="#6366f1"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
