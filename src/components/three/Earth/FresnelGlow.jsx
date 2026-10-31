import * as THREE from "three";

export default function FresnelGlow() {
  return (
    <mesh scale={1.14}>
      <sphereGeometry args={[1.05, 128, 128]} />

      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}