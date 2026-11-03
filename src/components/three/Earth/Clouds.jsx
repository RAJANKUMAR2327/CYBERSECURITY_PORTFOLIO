import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";

export default function Clouds() {
  const cloudRef = useRef();

  const cloudMap = useLoader(
    TextureLoader,
    "/textures/earth/earth_clouds.jpg"
  );

  useFrame((_, delta) => {
    if (cloudRef.current) {
      // Rotate slightly faster than the Earth (rad/s)
      cloudRef.current.rotation.y += 0.108 * delta;
    }
  });

  return (
    <mesh ref={cloudRef}>
      <sphereGeometry args={[1.07, 128, 128]} />

      <meshPhongMaterial
        map={cloudMap}
        transparent
        opacity={0.42}
        depthWrite={false}
        shininess={25}
      />
    </mesh>
  );
}