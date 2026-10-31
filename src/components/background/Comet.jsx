import { Sphere, Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Comet() {
  const comet = useRef();

  useFrame(({ clock }) => {
    if (!comet.current) return;

    const t = clock.elapsedTime * 0.2;

    comet.current.position.set(
      Math.cos(t) * 8,
      Math.sin(t * 2) * 3,
      -6
    );
  });

  return (
    <Trail
      width={2}
      length={10}
      color="#00F5FF"
      attenuation={(t) => t}
    >
      <Sphere ref={comet} args={[0.08, 16, 16]}>
        <meshBasicMaterial
          color="#00F5FF"
          toneMapped={false}
        />
      </Sphere>
    </Trail>
  );
}