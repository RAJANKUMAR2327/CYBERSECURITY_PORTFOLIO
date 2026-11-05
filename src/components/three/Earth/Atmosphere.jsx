import * as THREE from "three";
import { LITE } from "../../../utils/perf";

const SEG = LITE ? 48 : 128;

export default function Atmosphere() {
  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[1.05, SEG, SEG]} />

      <meshBasicMaterial
        color="#00BFFF"
        transparent
        opacity={0.12}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}