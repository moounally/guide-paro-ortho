"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, MeshDistortMaterial } from "@react-three/drei";

export function ToothScene() {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {/* Fallback procedural object to represent a tooth for now */}
          <group rotation={[0, Math.PI / 4, 0]}>
            {/* Crown */}
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[1.2, 1, 1.2]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                roughness={0.1} 
                metalness={0.1}
                envMapIntensity={1.5}
              />
            </mesh>
            {/* Root 1 */}
            <mesh position={[-0.3, -0.6, 0]}>
              <coneGeometry args={[0.3, 1.2, 16]} />
              <meshStandardMaterial color="#F8F6F0" roughness={0.6} />
            </mesh>
            {/* Root 2 */}
            <mesh position={[0.3, -0.6, 0]}>
              <coneGeometry args={[0.3, 1.2, 16]} />
              <meshStandardMaterial color="#F8F6F0" roughness={0.6} />
            </mesh>
            {/* Gum representation - Healthy by default */}
            <mesh position={[0, -0.1, 0]}>
              <torusGeometry args={[0.8, 0.2, 16, 32]} />
              <MeshDistortMaterial color="#0D6B3A" distort={0.2} speed={2} roughness={0.4} />
            </mesh>
          </group>
        </Float>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
