import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function EnergyRing({
  radius,
  tube,
  color,
  speed,
  y = 0,
}) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += speed;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[0, y, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <torusGeometry args={[radius, tube, 32, 250]} />

      <meshBasicMaterial
        color={color}
        toneMapped={false}
      />
    </mesh>
  );
}