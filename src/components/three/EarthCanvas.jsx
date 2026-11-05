import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import Scene from "./Scene";
import Loader from "./Loader";
import { LITE } from "../../utils/perf";

export default function EarthCanvas({
  selectedProject,
  setSelectedProject,
}) {
  return (
    <div className="relative w-[min(620px,90vw)] 3xl:w-[540px] aspect-square earth-glow touch-pan-y">
      <Canvas
        shadows={!LITE}
        dpr={LITE ? 1 : [1, 1.5]}
        gl={{
          antialias: !LITE,
          powerPreference: "high-performance",
          alpha: true,
        }}
        camera={{
          position: [0, 0, 3.5],
          fov: 40,
        }}
      >
        <Suspense fallback={<Loader />}>
          <Scene
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}