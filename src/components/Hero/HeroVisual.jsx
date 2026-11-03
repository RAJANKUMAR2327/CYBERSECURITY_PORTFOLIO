import { lazy, Suspense } from "react";
import EarthErrorBoundary from "../three/EarthErrorBoundary";
import FloatingCard from "./FloatingCard";
import { projectCount, detectorCount } from "../../data/counts";
import projects from "../../data/projects";

// Three.js is the bulk of the bundle; load it after the first paint.
const EarthCanvas = lazy(() => import("../three/EarthCanvas"));
import {
  ShieldCheck,
  BarChart3,
  Globe,
} from "lucide-react";

export default function HeroVisual({
  selectedProject,
  setSelectedProject,
}) {
  return (
    <div className="relative flex justify-center items-center w-full min-h-[500px]">
      
      {/* Neon Glow Behind Earth */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none earth-glow" />

      {/* Earth Canvas */}
      <EarthErrorBoundary>
        <Suspense
          fallback={
            <div
              className="w-[min(620px,90vw)] aspect-square flex items-center justify-center text-sm text-gray-400"
              role="status"
            >
              Loading 3D scene…
            </div>
          }
        >
          <EarthCanvas
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </Suspense>
      </EarthErrorBoundary>

      {/* Keyboard / screen-reader alternative to the 3D hotspots */}
      <div className="sr-only focus-within:not-sr-only absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-2 p-2 glass">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() =>
              setSelectedProject(selectedProject === p.id ? null : p.id)
            }
            className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-xs"
          >
            {p.title.split(" — ")[0]}
          </button>
        ))}
      </div>

      {/* Floating Cards */}
      <FloatingCard
        icon={<ShieldCheck className="text-cyan-400" />}
        title="Threat Detection"
        value={`${detectorCount} Rule Detectors`}
        className="-top-6 left-10"
      />

      <FloatingCard
        icon={<BarChart3 className="text-green-400" />}
        title="Projects"
        value={`${projectCount} Featured`}
        className="bottom-10 left-0"
      />

      <FloatingCard
        icon={<Globe className="text-blue-400" />}
        title="Network"
        value="CCNA Trained"
        className="bottom-0 right-0"
      />
      
    </div>
  );
}