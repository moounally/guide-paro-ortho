"use client";

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// 🦠 Particules de plaque dentaire luxueuses et animées
function PlaqueParticles({ active }: { active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  const [positions] = useState(() => {
    const pos = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
       const theta = Math.random() * Math.PI * 2;
       const r = 0.68 + Math.random() * 0.18;
       const y = 0.35 + Math.random() * 0.25;
       pos[i*3] = Math.cos(theta) * r;
       pos[i*3+1] = y;
       pos[i*3+2] = Math.sin(theta) * r;
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
       pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
       pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (materialRef.current) {
       const targetOpacity = active ? 0.7 : 0.0;
       materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, delta * 3);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={positions.length / 3} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.04} color="#facc15" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// 🦷 A stylized Tooth Model built with primitives
function StylizedTooth({ color = "#ffffff", isAligner = false }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* Crown */}
      <RoundedBox args={[1.4, 1.2, 1.4]} position={[0, 1, 0]} radius={0.3} smoothness={4} castShadow>
        <meshPhysicalMaterial color={color} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} metalness={0.05} />
      </RoundedBox>
      
      {/* Root 1 */}
      <mesh position={[-0.35, -0.2, 0]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.3, 0.1, 1.5, 32]} />
        <meshPhysicalMaterial color={color} roughness={0.25} clearcoat={0.5} clearcoatRoughness={0.2} />
      </mesh>
      
      {/* Root 2 */}
      <mesh position={[0.35, -0.2, 0]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.3, 0.1, 1.5, 32]} />
        <meshPhysicalMaterial color={color} roughness={0.25} clearcoat={0.5} clearcoatRoughness={0.2} />
      </mesh>
      
      {/* Optional Aligner Shell representing transparent aligners */}
      {isAligner && (
        <RoundedBox args={[1.45, 1.25, 1.45]} position={[0, 1, 0]} radius={0.32} smoothness={4}>
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.95} 
            opacity={1} 
            transparent
            roughness={0.05} 
            ior={1.5} 
            thickness={0.1} 
          />
        </RoundedBox>
      )}
      
      {/* Optional Multi-attaches (Brackets & Archwire) */}
      {!isAligner && (
        <group>
          {/* Main Bracket */}
          <mesh position={[0, 1, 0.72]} castShadow>
            <boxGeometry args={[0.3, 0.25, 0.08]} />
            <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Archwire */}
          <mesh position={[0, 1, 0.76]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1.4, 16]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Ligature (O-ring) */}
          <mesh position={[0, 1, 0.74]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.16, 0.03, 16, 32]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 🩸 Gums that wrap realistically around the tooth
function Gums({ state = 'healthy' }) {
  const isHealthy = state === 'healthy';
  
  // Transition targets for inflammation
  const targetColor = useMemo(() => new THREE.Color(isHealthy ? "#ffb6c1" : "#dc2626"), [isHealthy]);
  const targetScale = isHealthy ? 1 : 1.05; // Swelling when inflamed
  
  const materialRef1 = useRef<THREE.MeshStandardMaterial>(null);
  const materialRef2 = useRef<THREE.MeshStandardMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (materialRef1.current) materialRef1.current.color.lerp(targetColor, delta * 3);
    if (materialRef2.current) materialRef2.current.color.lerp(targetColor, delta * 3);
    
    if (groupRef.current) {
      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 4);
      groupRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Gum (Alveolar Bone + Attached Gingiva) - Enveloppe les racines */}
      <RoundedBox args={[1.7, 1.5, 1.7]} position={[0, -0.35, 0]} radius={0.4} smoothness={4} receiveShadow>
        <meshStandardMaterial ref={materialRef1} roughness={0.5} metalness={0.05} />
      </RoundedBox>
      
      {/* Gingival Margin (Free Gingiva) - Bague épousant la couronne */}
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <torusGeometry args={[0.7, 0.16, 32, 100]} />
        <meshStandardMaterial ref={materialRef2} roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  );
}

interface ToothSceneProps {
  state?: 'healthy' | 'inflamed';
  isAligner?: boolean;
}

export function ToothScene({ state = 'healthy', isAligner = true }: ToothSceneProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-sky-50 to-white relative rounded-2xl overflow-hidden shadow-inner border border-sapphire-100/50">
      <Canvas camera={{ position: [0, 2.5, 6.5], fov: 35 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-10, 5, -5]} intensity={0.6} />
        <Environment preset="city" />
        
        <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1.0}>
          <StylizedTooth isAligner={isAligner} />
          <Gums state={state} />
          <PlaqueParticles active={state === 'inflamed'} />
        </Float>
        
        <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={12} blur={2.5} far={4} color="#041E4D" />
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 4} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
