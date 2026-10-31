import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Satellite() {
  const group = useRef();
  
  


  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.elapsedTime * 0.35;
    const glow = group.current.children[group.current.children.length - 1];
    if (glow) {
      const s = 1 + Math.sin(clock.elapsedTime * 8) * 0.25;
      glow.scale.set(s, s, s);}
    group.current.position.x = Math.cos(t) * 1.85;
    group.current.position.z = Math.sin(t) * 1.85;
    group.current.position.y = Math.sin(t * 2) * 0.22;

    group.current.lookAt(0, 0, 0);

    group.current.rotation.z += 0.01;
  });

  return (
    <group ref={group}>
      {/* Main Body */}
      <mesh>
        <boxGeometry args={[0.12, 0.12, 0.18]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* Left Solar Panel */}
      <mesh position={[-0.22, 0, 0]}>
        <boxGeometry args={[0.18, 0.02, 0.12]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Right Solar Panel */}
      <mesh position={[0.22, 0, 0]}>
        <boxGeometry args={[0.18, 0.02, 0.12]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.18]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Dish */}
      <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.04, 32]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Engine Glow */}
      <mesh position={[0, 0, -0.12]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial
          color="#00F5FF"
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}