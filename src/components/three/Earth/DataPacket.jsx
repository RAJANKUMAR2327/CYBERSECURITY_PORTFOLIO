import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const routes = [
  {
    start: new THREE.Vector3(-0.75, 0.35, 0.62),
    mid: new THREE.Vector3(0, 2.1, 0),
    end: new THREE.Vector3(0.82, 0.25, 0.72),
    color: "#00F5FF",
  },
  {
    start: new THREE.Vector3(0.62, -0.55, 0.72),
    mid: new THREE.Vector3(0, -2.0, 0),
    end: new THREE.Vector3(-0.82, -0.22, -0.52),
    color: "#7C3AED",
  },
  {
    start: new THREE.Vector3(0.12, 0.82, -0.52),
    mid: new THREE.Vector3(0, 2.25, 0),
    end: new THREE.Vector3(-0.32, -0.82, 0.92),
    color: "#00FFD5",
  },
];

function Packet({ route, speed }) {
  const ref = useRef();
  // Reused across frames instead of allocating new Vector3s every frame
  const posA = useRef(new THREE.Vector3());
  const posB = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = (clock.elapsedTime * speed) % 1;

    posA.current.lerpVectors(route.start, route.mid, t);
    posB.current.lerpVectors(route.mid, route.end, t);
    posA.current.lerp(posB.current, t);

    ref.current.position.copy(posA.current);
  });

  return (
    <Sphere ref={ref} args={[0.03, 8, 8]}>
      <meshBasicMaterial color={route.color} toneMapped={false} />
    </Sphere>
  );
}

export default function DataPackets() {
  return (
    <>
      {routes.map((route, i) => (
        <Packet
          key={i}
          route={route}
          speed={0.18 + i * 0.05}
        />
      ))}
    </>
  );
}