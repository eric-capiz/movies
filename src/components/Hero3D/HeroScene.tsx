import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import SceneErrorBoundary from "./ErrorBoundary";

const GOLD = "#c9a96a";
const GOLD_BRIGHT = "#e8c98a";
const VOID = "#0a0e1a";

/* Poster layout: arc across the frame, deeper toward center */
const LAYOUT: Array<{ x: number; y: number; z: number; ry: number; speed: number }> = [
  { x: -4.4, y: 0.25, z: -2.2, ry: 0.28, speed: 1.1 },
  { x: -2.2, y: -0.15, z: -3.6, ry: 0.14, speed: 1.4 },
  { x: 0, y: 0.3, z: -4.8, ry: 0, speed: 0.9 },
  { x: 2.2, y: -0.1, z: -3.4, ry: -0.14, speed: 1.25 },
  { x: 4.4, y: 0.25, z: -2.0, ry: -0.28, speed: 1.05 },
];

const POSTER_W = 1.56;
const POSTER_H = 2.34;

function GoldFrame() {
  return (
    <mesh position={[0, 0, -0.02]}>
      <planeGeometry args={[POSTER_W + 0.1, POSTER_H + 0.1]} />
      <meshStandardMaterial color={GOLD} metalness={0.65} roughness={0.32} />
    </mesh>
  );
}

function PosterPanel({ url, slot }: { url: string; slot: number }) {
  const texture = useTexture(url);
  const layout = LAYOUT[slot % LAYOUT.length];

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  return (
    <Float
      speed={layout.speed}
      rotationIntensity={0.35}
      floatIntensity={0.65}
      position={[layout.x, layout.y, layout.z]}
      rotation={[0, layout.ry, 0]}
    >
      <GoldFrame />
      <mesh>
        <planeGeometry args={[POSTER_W, POSTER_H]} />
        <meshStandardMaterial map={texture} metalness={0.08} roughness={0.62} />
      </mesh>
    </Float>
  );
}

/** Texture-less fallback: dark panels with gold frames, same layout. */
function PanelField({ count }: { count: number }) {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const layout = LAYOUT[i % LAYOUT.length];
        return (
          <Float
            key={i}
            speed={layout.speed}
            rotationIntensity={0.35}
            floatIntensity={0.65}
            position={[layout.x, layout.y, layout.z]}
            rotation={[0, layout.ry, 0]}
          >
            <GoldFrame />
            <mesh>
              <planeGeometry args={[POSTER_W, POSTER_H]} />
              <meshStandardMaterial color="#141a2a" metalness={0.2} roughness={0.7} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function PosterField({ posters }: { posters: string[] }) {
  const urls = useMemo(() => posters.slice(0, 5), [posters]);
  if (urls.length === 0) return <PanelField count={5} />;
  return (
    <group>
      {urls.map((url, i) => (
        <PosterPanel key={url} url={url} slot={i} />
      ))}
    </group>
  );
}

/** Slow cinematic camera drift tied to pointer position. */
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, -4), []);

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-2.2 * delta);
    target.set(pointer.x * 0.7, 0.3 + pointer.y * 0.35, 6.5);
    camera.position.lerp(target, k);
    camera.lookAt(lookAt);
  });
  return null;
}

function Scene({ posters }: { posters: string[] }) {
  return (
    <>
      <fog attach="fog" args={[VOID, 8, 18]} />
      <ambientLight intensity={0.35} />
      {/* warm gold key light */}
      <pointLight position={[4, 3, 4]} intensity={50} distance={26} color={GOLD_BRIGHT} />
      {/* softer gold fill from the left */}
      <pointLight position={[-5, 0, 3]} intensity={18} distance={20} color={GOLD} />
      {/* faint cool rim for depth, kept dim so gold dominates */}
      <pointLight position={[0, -2, -6]} intensity={6} distance={18} color="#3a4a6b" />
      <SceneErrorBoundary fallback={<PanelField count={Math.min(5, Math.max(posters.length, 1))} />}>
        <Suspense fallback={null}>
          <PosterField posters={posters} />
        </Suspense>
      </SceneErrorBoundary>
      <CameraRig />
    </>
  );
}

interface HeroSceneProps {
  posters: string[];
}

/** Lazy-loaded R3F canvas. Keep this component code-split. */
const HeroScene = ({ posters }: HeroSceneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.3, 6.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene posters={posters} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
