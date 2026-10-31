import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function DataStream() {
  const ref = useRef();
  // Fixed endpoints — created once, not every frame
  const start = useRef(new THREE.Vector3(-0.6, 0.55, 0.75));
  const end = useRef(new THREE.Vector3(0.75, 0.25, 0.55));

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.25) % 1;
    ref.current.position.lerpVectors(start.current, end.current, t);
  });

  return (
    <Sphere ref={ref} args={[0.03, 8, 8]}>
      <meshBasicMaterial
        color="#00F5FF"
        toneMapped={false}
      />
    </Sphere>
  );
}