import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import seededRandom from "../../utils/seededRandom";

export default function ShootingStars() {
  const group = useRef();

  const stars = useMemo(() => {
    const rand = seededRandom(23);
    return [...Array(12)].map(() => ({
      x: rand() * 30 - 15,
      y: rand() * 15 - 7,
      z: -rand() * 30,
      speed: 0.05 + rand() * 0.08,
    }));
  }, []);

  useFrame(() => {
    if (!group.current) return;

    group.current.children.forEach((star, i) => {
      star.position.x += stars[i].speed;
      star.position.y -= stars[i].speed * 0.5;

      if (star.position.x > 15) {
        star.position.x = -15;
        star.position.y = Math.random() * 10 - 5;
      }
    });
  });

  return (
    <group ref={group}>
      {stars.map((s, i) => (
        <Sphere
          key={i}
          args={[0.03, 8, 8]}
          position={[s.x, s.y, s.z]}
        >
          <meshBasicMaterial
            color="#ffffff"
            toneMapped={false}
          />
        </Sphere>
      ))}
    </group>
  );
}