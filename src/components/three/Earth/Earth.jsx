import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { LITE } from "../../../utils/perf";

const SEG = LITE ? 48 : 128;

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
      <sphereGeometry args={[1.05, SEG, SEG]} />

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