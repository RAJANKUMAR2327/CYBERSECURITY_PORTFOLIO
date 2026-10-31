import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Earth() {
  const [
    colorMap,
    normalMap,
    specularMap,
  ] = useLoader(TextureLoader, [
    "/textures/earth/earth_day.jpg",
    "/textures/earth/earth_normal.jpg",
    "/textures/earth/earth_specular.jpg",
  ]);

  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[1.05, 128, 128]} />

      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}

        metalnessMap={specularMap}

        metalness={0.35}

        roughness={0.65}

        normalScale={[1.2, 1.2]}
      />
    </mesh>
  );
}