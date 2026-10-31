import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import seededRandom from "../../../utils/seededRandom";

export default function FloatingHexagons() {
  const group = useRef();

  // Deterministic positions (seeded), so they never reshuffle on re-render
  // and the render stays pure.
  const positions = useMemo(() => {
    const rand = seededRandom(7);
    return Array.from({ length: 10 }, () => [
      (rand() - 0.5) * 8,
      rand() * 5,
      (rand() - 0.5) * 8,
    ]);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;

    group.current.rotation.y += 0.001;
    group.current.position.y = Math.sin(clock.elapsedTime) * 0.15;
  });

  return (
    <group ref={group}>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <circleGeometry args={[0.08, 6]} />
          <meshBasicMaterial
            color="#00F5FF"
            transparent
            opacity={0.25}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}