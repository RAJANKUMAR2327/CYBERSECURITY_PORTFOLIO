
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import Scene from "./Scene";
import Loader from "./Loader";
import { LITE } from "../../utils/perf";

function EarthFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm text-cyan-400">
        Loading 3D Earth...
      </span>
    </div>
  );
}

export default function EarthCanvas({
  selectedProject,
  setSelectedProject,
}) {
  const [webglError, setWebglError] = useState(false);

  if (webglError) {
    return (
      <div
        className="relative flex aspect-square w-[min(620px,90vw)] items-center justify-center rounded-xl border border-white/10 bg-black/20 p-6 text-center"
        role="alert"
      >
        <p className="text-sm text-gray-400">
          3D Earth visualization is unavailable on this device.
          Please try another browser or enable WebGL.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[620px] aspect-square earth-glow touch-pan-y">
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
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (event) => {
              event.preventDefault();
              setWebglError(true);
            }
          );
        }}
      >
        <Suspense fallback={<Loader />}>
          <Scene
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </Suspense>
      </Canvas>

      <Suspense fallback={<EarthFallback />}>
        {/* Scene loading is handled inside Canvas */}
      </Suspense>
    </div>
  );
}
