import * as THREE from "three";

export default function Atmosphere() {
  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[1.05, 128, 128]} />

      <meshBasicMaterial
        color="#00BFFF"
        transparent
        opacity={0.12}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}