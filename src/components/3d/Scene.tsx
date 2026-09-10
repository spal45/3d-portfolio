"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { getScrollState } from "@/lib/useScrollProgress";
import { NodeField, type NodeFieldState } from "./NodeField";

type SectionTarget = NodeFieldState & {
  shapeScale: number;
  shapePos: [number, number, number];
  distort: number;
  camZ: number;
};

// index matches SECTION_IDS: hero, about, skills, experience, projects, contact
const TARGETS: SectionTarget[] = [
  { shapeScale: 1.5, shapePos: [2.4, 0.1, 0], distort: 0.38, camZ: 5.0, nodes: 0.0, lines: 0.0, spread: 0.6 },
  { shapeScale: 1.1, shapePos: [2.7, -0.2, -0.5], distort: 0.24, camZ: 5.4, nodes: 0.18, lines: 0.0, spread: 0.8 },
  { shapeScale: 0.5, shapePos: [2.2, 0, -1], distort: 0.15, camZ: 6.0, nodes: 0.95, lines: 0.12, spread: 1.15 },
  { shapeScale: 0.4, shapePos: [2.3, 0, -1], distort: 0.15, camZ: 6.4, nodes: 0.8, lines: 0.9, spread: 1.0 },
  { shapeScale: 0.8, shapePos: [2.6, -0.1, -0.5], distort: 0.3, camZ: 5.6, nodes: 0.35, lines: 0.35, spread: 0.85 },
  { shapeScale: 1.05, shapePos: [3.0, 0.1, -0.5], distort: 0.32, camZ: 5.2, nodes: 0.08, lines: 0.04, spread: 0.7 },
];

type AnimState = {
  shapeScale: number;
  distort: number;
  camZ: number;
  node: NodeFieldState;
  shapePos: THREE.Vector3;
  pointer: THREE.Vector2;
};

function initialState(): AnimState {
  return {
    shapeScale: TARGETS[0].shapeScale,
    distort: TARGETS[0].distort,
    camZ: TARGETS[0].camZ,
    node: { nodes: 0, lines: 0, spread: TARGETS[0].spread },
    shapePos: new THREE.Vector3(...TARGETS[0].shapePos),
    pointer: new THREE.Vector2(0, 0),
  };
}

export function Scene({ nodeCount }: { nodeCount: number }) {
  const shape = useRef<THREE.Mesh>(null);
  const anim = useRef<AnimState>(initialState());

  useFrame((st, delta) => {
    const s = anim.current;
    const d = Math.min(delta, 0.1);
    const { section, velocity } = getScrollState();
    const t = TARGETS[Math.min(section, TARGETS.length - 1)];
    const k = 3;
    const damp = THREE.MathUtils.damp;

    s.shapeScale = damp(s.shapeScale, t.shapeScale, k, d);
    s.distort = damp(s.distort, t.distort, k, d);
    s.camZ = damp(s.camZ, t.camZ, k, d);
    s.node.nodes = damp(s.node.nodes, t.nodes, k, d);
    s.node.lines = damp(s.node.lines, t.lines, k, d);
    s.node.spread = damp(s.node.spread, t.spread, k, d);

    // pull the shape toward centre on narrow / portrait viewports
    const narrow = st.size.width < 900;
    const targetX = narrow ? t.shapePos[0] * 0.15 : t.shapePos[0];
    const targetY = narrow ? t.shapePos[1] - 0.4 : t.shapePos[1];
    s.shapePos.x = damp(s.shapePos.x, targetX, k, d);
    s.shapePos.y = damp(s.shapePos.y, targetY, k, d);
    s.shapePos.z = damp(s.shapePos.z, t.shapePos[2], k, d);

    s.pointer.x = damp(s.pointer.x, st.pointer.x * 0.3, 2, d);
    s.pointer.y = damp(s.pointer.y, st.pointer.y * 0.3, 2, d);

    if (shape.current) {
      shape.current.scale.setScalar(s.shapeScale);
      shape.current.position.set(
        s.shapePos.x + s.pointer.x,
        s.shapePos.y + s.pointer.y,
        s.shapePos.z,
      );
      shape.current.rotation.x += d * 0.15;
      shape.current.rotation.y += d * 0.2;

      const mat = shape.current.material as { distort?: number } | undefined;
      if (mat && typeof mat.distort === "number") {
        mat.distort = s.distort + Math.min(Math.abs(velocity) * 0.004, 0.15);
      }
    }

    st.camera.position.z = s.camZ;
    st.camera.position.x = -s.pointer.x * 0.5;
    st.camera.position.y = -s.pointer.y * 0.5;
    st.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 7]} intensity={1.4} />
      <pointLight position={[-6, -4, -4]} color="#a855f7" intensity={2.2} />
      <pointLight position={[6, 4, 2]} color="#6366f1" intensity={1.2} />

      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh ref={shape}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshDistortMaterial
            color="#4f46e5"
            emissive="#312e81"
            emissiveIntensity={0.12}
            distort={0.38}
            speed={1.8}
            roughness={0.28}
            metalness={0.55}
          />
        </mesh>
      </Float>

      <NodeField count={nodeCount} stateRef={anim} />
    </>
  );
}
