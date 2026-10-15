'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PresentationControls, PerformanceMonitor } from '@react-three/drei';
import { useRef, useMemo, useState, memo } from 'react';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

export type CategoryKey = 'fastfood' | 'pizza' | 'bbq' | 'desi' | 'dessert';

interface SceneProps {
  scrollProgress: MotionValue<number>;
  activeCategory: CategoryKey;
}

/* ------------------------------------------------------------------ */
// Shared low-poly geometries & materials (reduces GPU memory)
/* ------------------------------------------------------------------ */

const CYLINDER_LOW = new THREE.CylinderGeometry(1, 1, 1, 16);
const SPHERE_LOW = new THREE.SphereGeometry(1, 24, 24);
const BOX_LOW = new THREE.BoxGeometry(1, 1, 1);
const TORUS_LOW = new THREE.TorusGeometry(1, 0.25, 8, 32);

const MAT_BUN = new THREE.MeshStandardMaterial({ color: '#d9952e', roughness: 0.7 });
const MAT_PATTY = new THREE.MeshStandardMaterial({ color: '#5c2c18', roughness: 0.85 });
const MAT_CHEESE = new THREE.MeshStandardMaterial({ color: '#fab026', roughness: 0.5, metalness: 0.1 });
const MAT_LETTUCE = new THREE.MeshStandardMaterial({ color: '#6ca338', roughness: 0.95 });
const MAT_BUN_TOP = new THREE.MeshStandardMaterial({ color: '#e8a339', roughness: 0.6 });

const MAT_CRUST = new THREE.MeshStandardMaterial({ color: '#eebb55', roughness: 0.8 });
const MAT_SAUCE = new THREE.MeshStandardMaterial({ color: '#c13a21', roughness: 0.7 });
const MAT_CHEESE_PIZZA = new THREE.MeshStandardMaterial({ color: '#f7d37e', roughness: 0.5 });
const MAT_TOPPING_GREEN = new THREE.MeshStandardMaterial({ color: '#3e6e2e', roughness: 0.7 });
const MAT_TOPPING_RED = new THREE.MeshStandardMaterial({ color: '#8b2b1d', roughness: 0.7 });

const MAT_PLATTER = new THREE.MeshStandardMaterial({ color: '#fab026', roughness: 0.4, metalness: 0.25 });
const MAT_PLATTER_RIM = new THREE.MeshStandardMaterial({ color: '#d9961f', roughness: 0.5, metalness: 0.3 });
const MAT_CHICKEN = new THREE.MeshStandardMaterial({ color: '#8c4b24', roughness: 0.75 });
const MAT_GARNISH = new THREE.MeshStandardMaterial({ color: '#4a7c2e', roughness: 0.95 });

const MAT_DESSERT = new THREE.MeshStandardMaterial({ color: '#c4762e', roughness: 0.7 });
const MAT_DESSERT_TOP = new THREE.MeshStandardMaterial({ color: '#f3e6c8', roughness: 0.5 });

const MAT_BRAND_SHAPE = new THREE.MeshStandardMaterial({
  color: '#fab026',
  emissive: '#fab026',
  emissiveIntensity: 0.25,
  roughness: 0.5,
  metalness: 0.2,
  transparent: true,
  opacity: 0.4,
});

/* ------------------------------------------------------------------ */
// Placeholder food meshes – swap for real GLTFs later
/* ------------------------------------------------------------------ */

function BurgerMesh() {
  return (
    <group>
      <mesh geometry={CYLINDER_LOW} material={MAT_BUN} scale={[1.1, 0.35, 1.05]} position={[0, -0.5, 0]} />
      <mesh geometry={CYLINDER_LOW} material={MAT_LETTUCE} scale={[1.15, 0.08, 1.15]} position={[0, -0.22, 0]} />
      <mesh geometry={CYLINDER_LOW} material={MAT_PATTY} scale={[1.05, 0.25, 1.05]} position={[0, -0.05, 0]} />
      <mesh geometry={BOX_LOW} material={MAT_CHEESE} scale={[1.9, 0.08, 1.9]} position={[0, 0.12, 0]} rotation={[0, Math.PI / 8, 0]} />
      <mesh geometry={SPHERE_LOW} material={MAT_BUN_TOP} scale={[1.05, 0.85, 1.05]} position={[0, 0.25, 0]} />
    </group>
  );
}

function PizzaMesh() {
  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      <mesh geometry={CYLINDER_LOW} material={MAT_CRUST} scale={[1.35, 0.12, 1.35]} />
      <mesh geometry={CYLINDER_LOW} material={MAT_SAUCE} scale={[1.2, 0.06, 1.2]} position={[0, 0.06, 0]} />
      <mesh geometry={CYLINDER_LOW} material={MAT_CHEESE_PIZZA} scale={[1.18, 0.04, 1.18]} position={[0, 0.1, 0]} />
      {[
        [0.4, 0.18, 0.4],
        [-0.5, 0.18, 0.2],
        [0.1, 0.18, -0.55],
        [0.55, 0.18, -0.2],
        [-0.25, 0.18, 0.55],
      ].map((pos, i) => (
        <mesh
          key={i}
          geometry={SPHERE_LOW}
          material={i % 2 === 0 ? MAT_TOPPING_GREEN : MAT_TOPPING_RED}
          scale={[0.14, 0.14, 0.14]}
          position={pos as [number, number, number]}
        />
      ))}
    </group>
  );
}

function PlatterMesh() {
  return (
    <group>
      <mesh geometry={CYLINDER_LOW} material={MAT_PLATTER} scale={[2.2, 0.25, 2]} position={[0, -0.15, 0]} />
      <mesh geometry={TORUS_LOW} material={MAT_PLATTER_RIM} scale={[2.1, 2.1, 1]} position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]} />
      {[
        [-0.9, 0.15, 0.4],
        [0, 0.18, 0.7],
        [0.9, 0.15, 0.35],
        [-0.5, 0.2, -0.55],
        [0.55, 0.2, -0.55],
      ].map((pos, i) => (
        <mesh
          key={i}
          geometry={BOX_LOW}
          material={MAT_CHICKEN}
          scale={[0.55, 0.35, 0.75]}
          position={pos as [number, number, number]}
          rotation={[0.2, i, 0]}
        />
      ))}
      {[
        [-0.3, 0.22, 0.1],
        [0.35, 0.22, -0.2],
      ].map((pos, i) => (
        <mesh
          key={i}
          geometry={SPHERE_LOW}
          material={MAT_GARNISH}
          scale={[0.12, 0.12, 0.12]}
          position={pos as [number, number, number]}
        />
      ))}
    </group>
  );
}

function DessertMesh() {
  return (
    <group>
      <mesh geometry={SPHERE_LOW} material={MAT_DESSERT} scale={[0.55, 0.55, 0.55]} />
      <mesh geometry={SPHERE_LOW} material={MAT_DESSERT_TOP} scale={[0.2, 0.2, 0.2]} position={[0, 0.45, 0]} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
// Category-specific floating accent items using instancing
/* ------------------------------------------------------------------ */

const ITEM_COLORS: Record<CategoryKey, string[]> = {
  fastfood: ['#c13a21', '#3e6e2e', '#fab026', '#d9952e'],
  pizza: ['#c13a21', '#f7d37e', '#3e6e2e', '#8b2b1d'],
  bbq: ['#5c2c18', '#8c4b24', '#d9961f', '#2e4a1f'],
  desi: ['#d9961f', '#8c4b24', '#3e6e2e', '#f4e4bc'],
  dessert: ['#c4762e', '#f3e6c8', '#e89ac7', '#ffe082'],
};

function MenuItems({ activeCategory }: { activeCategory: CategoryKey }) {
  const colors = ITEM_COLORS[activeCategory];
  const positions = useMemo(
    () => [
      [-2.8, -2, -1],
      [-1.4, -2.6, -1.5],
      [1.4, -2.5, -1.2],
      [2.8, -1.9, -0.8],
    ],
    []
  );

  return (
    <group position={[0, -2, 0]}>
      {colors.map((color, i) => (
        <Float key={`${activeCategory}-${i}`} speed={2 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={positions[i] as [number, number, number]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={color} roughness={0.5} emissive={color} emissiveIntensity={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
// Focal object
/* ------------------------------------------------------------------ */

const FocalObject = memo(function FocalObject({
  activeCategory,
  scrollProgress,
}: {
  activeCategory: CategoryKey;
  scrollProgress: MotionValue<number>;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = scrollProgress.get();
    const targetScale = 1.15 - p * 0.35;
    const lerpFactor = 1 - Math.exp(-8 * delta);
    const s = THREE.MathUtils.lerp(ref.current.scale.x, targetScale, lerpFactor);
    ref.current.scale.set(s, s, s);
    ref.current.rotation.y += delta * 0.4;
  });

  const isPizza = activeCategory === 'pizza';

  return (
    <group ref={ref} position={[0, 0.2, 0]}>
      {isPizza ? <PizzaMesh /> : <BurgerMesh />}
    </group>
  );
});

/* ------------------------------------------------------------------ */
// Background abstract shapes (fewer + simpler)
/* ------------------------------------------------------------------ */

const BackgroundShapes = memo(function BackgroundShapes() {
  const shapes = useMemo(
    () => [
      { pos: [-4, 3, -6], scale: 0.8 },
      { pos: [4.5, 2, -7], scale: 0.6 },
      { pos: [-3.5, -3, -5], scale: 0.7 },
      { pos: [3.5, -2.5, -5.5], scale: 0.9 },
      { pos: [0, 4, -8], scale: 1 },
      { pos: [0, -4.5, -6], scale: 0.6 },
    ],
    []
  );

  return (
    <group>
      {shapes.map((shape, i) => (
        <Float key={i} speed={0.8 + i * 0.15} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh geometry={SPHERE_LOW} material={MAT_BRAND_SHAPE} scale={shape.scale} position={shape.pos as [number, number, number]} />
        </Float>
      ))}
    </group>
  );
});

/* ------------------------------------------------------------------ */
// Main scene content
/* ------------------------------------------------------------------ */

const SceneContent = memo(function SceneContent({ scrollProgress, activeCategory }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const p = scrollProgress.get();
    const targetY = p * 8;
    const targetX = (p - 0.5) * 1.2;
    const lerpFactor = 1 - Math.exp(-6 * delta);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, lerpFactor);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpFactor);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-6, 4, 4]} intensity={0.9} color="#fab026" />

      <BackgroundShapes />

      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <PresentationControls
          global={false}
          snap
          speed={1.5}
          zoom={0.75}
          polar={[-0.5, 0.5]}
          azimuth={[-0.75, 0.75]}
        >
          <FocalObject activeCategory={activeCategory} scrollProgress={scrollProgress} />
        </PresentationControls>
      </Float>

      <group position={[0, -8, 0]}>
        <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.45}>
          <PlatterMesh />
        </Float>
      </group>

      <MenuItems activeCategory={activeCategory} />
    </group>
  );
});

/* ------------------------------------------------------------------ */
// Exported Scene
/* ------------------------------------------------------------------ */

export default function Scene({ scrollProgress, activeCategory }: SceneProps) {
  const [dpr, setDpr] = useState(1.25);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        dpr={dpr}
        frameloop="always"
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="h-full w-full"
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.25)}
          flipflops={3}
          onFallback={() => setDpr(1)}
        />
        <SceneContent scrollProgress={scrollProgress} activeCategory={activeCategory} />
      </Canvas>
    </div>
  );
}
