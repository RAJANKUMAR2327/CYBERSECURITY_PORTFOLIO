import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const positions = [
  [0.72, 0.25, 0.62],
  [-0.75, 0.38, 0.48],
  [0.42, -0.62, 0.82],
  [-0.58, -0.52, -0.72],
  [0.18, 0.82, -0.42],
  [-0.22, 0.92, 0.12],
  [0.92, -0.18, -0.18],
];

function Node({ position, color, speed }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;

    if (ref.current) {
      const s = 1 + Math.sin(t) * 0.35;

      ref.current.scale.set(s, s, s);

      ref.current.material.emissiveIntensity =
        1.5 + Math.sin(t) * 0.8;
    }
  });

  return (
    <Sphere
      ref={ref}
      args={[0.025, 20, 20]}
      position={position}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </Sphere>
  );
}

export default function Nodes() {
  return (
    <>
      {positions.map((position, index) => (
        <Node
          key={index}
          position={position}
          speed={1 + index * 0.15}
          color={index % 2 ? "#00F5FF" : "#7C3AED"}
        />
      ))}
    </>
  );
}