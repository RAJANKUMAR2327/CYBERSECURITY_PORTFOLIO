import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function AlertBeacon() {
  const beacon = useRef();

  useFrame(({ clock }) => {
    if (!beacon.current) return;

    beacon.current.material.emissiveIntensity =
      2 + Math.sin(clock.elapsedTime * 8);

    beacon.current.position.y =
      1.45 + Math.sin(clock.elapsedTime * 3) * 0.05;
  });

  return (
    <Sphere
      ref={beacon}
      args={[0.06, 32, 32]}
      position={[0, 1.45, 0]}
    >
      <meshStandardMaterial
        color="#FF3B3B"
        emissive="#FF3B3B"
        emissiveIntensity={2}
      />
    </Sphere>
  );
}