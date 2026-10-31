import { Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function OrbitRing() {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.002;
  });

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <Torus
        ref={ref}
        args={[1.9, 0.004, 16, 200]}
      >
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.45}
          toneMapped={false}
        />
      </Torus>
    </group>
  );
}