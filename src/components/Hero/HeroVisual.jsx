import { lazy, Suspense, useEffect, useRef, useState } from "react";
import EarthErrorBoundary from "../three/EarthErrorBoundary";
import EarthFallback from "../three/EarthFallback";
import { hasWebGL } from "../../utils/webgl";
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
  // Load the 3D bundle only when (a) the browser supports WebGL, (b) the page
  // has painted and is idle, and (c) the globe is near the viewport. On phones
  // the globe sits below the fold, so most of the 330 KB is never fetched
  // until the visitor scrolls toward it.
  const webgl = hasWebGL();
  const rootRef = useRef(null);
  const [idle, setIdle] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const start = () => setIdle(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show3D = webgl && idle && near;

  return (
    <div
      ref={rootRef}
      className="relative flex justify-center items-center w-full min-h-[360px] sm:min-h-[500px] print:hidden"
    >
      
      {/* Neon Glow Behind Earth */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none earth-glow" />

      {/* Earth Canvas */}
      {!webgl ? (
        <EarthFallback />
      ) : (
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
          {show3D && (
            <EarthCanvas
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          )}
        </Suspense>
      </EarthErrorBoundary>
      )}

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
        className="hidden md:block top-0 lg:-top-6 left-10"
      />

      <FloatingCard
        icon={<BarChart3 className="text-green-400" />}
        title="Projects"
        value={`${projectCount} Featured`}
        className="hidden md:block bottom-10 left-0"
      />

      <FloatingCard
        icon={<Globe className="text-blue-400" />}
        title="Network"
        value="CCNA Trained"
        className="hidden md:block bottom-0 right-0"
      />
      
    </div>
  );
}