import { Sphere } from "@react-three/drei";

export default function Nebula() {
  return (
    <>
      <Sphere args={[45, 64, 64]} position={[0, 0, -40]}>
        <meshBasicMaterial
          color="#0B1F52"
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </Sphere>

      <Sphere args={[38, 64, 64]} position={[18, 10, -30]}>
        <meshBasicMaterial
          color="#4C1D95"
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </Sphere>

      <Sphere args={[28, 64, 64]} position={[-20, -12, -25]}>
        <meshBasicMaterial
          color="#0891B2"
          transparent
          opacity={0.10}
          toneMapped={false}
        />
      </Sphere>
    </>
  );
}