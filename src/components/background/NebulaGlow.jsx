import { Sphere } from "@react-three/drei";

export default function NebulaGlow() {
  return (
    <>
      <Sphere args={[12, 32, 32]} position={[0, 0, -10]}>
        <meshBasicMaterial
          color="#001133"
          transparent
          opacity={0.18}
          depthWrite={false}
          toneMapped={false}
        />
      </Sphere>

      <Sphere args={[8, 32, 32]} position={[6, 3, -8]}>
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.08}
          depthWrite={false}
          toneMapped={false}
        />
      </Sphere>

      <Sphere args={[7, 32, 32]} position={[-5, -2, -7]}>
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.08}
          depthWrite={false}
          toneMapped={false}
        />
      </Sphere>
    </>
  );
}