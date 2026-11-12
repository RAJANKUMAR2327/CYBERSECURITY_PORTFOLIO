import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import LeftPanel from "../../components/Hero/LeftPanel";
import HeroContent from "../../components/Hero/HeroContent";
import HeroVisual from "../../components/Hero/HeroVisual";
import RightPanel from "../../components/Hero/RightPanel";
import ProjectPopup from "../../components/Hero/ProjectPopup";
import ProjectCard3D from "../../components/ui/ProjectCard3D";

export default function Hero() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject === null) return;
    const onKey = (e) => e.key === "Escape" && setSelectedProject(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject]);

  return (
    <section
      id="home"
      className="relative min-h-svh overflow-hidden pt-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] max-h-full -z-20">
        <div className="absolute left-1/2 top-[420px] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute right-20 top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-[160px]" />
        <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      <div className="container-custom h-full">
        <div className="grid min-h-[85svh] grid-cols-12 items-center gap-6 3xl:gap-10">

          {/* Left Panel (Col 2) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden 3xl:block 3xl:col-span-2"
          >
            <LeftPanel />
          </motion.div>

          {/* Hero Content (Col 4 on 2xl, Col 5 on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-5 3xl:col-span-4"
          >
            <HeroContent />
          </motion.div>

          {/* Earth / Hero Visual (Col 4 on 2xl, Col 7 on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="col-span-12 lg:col-span-7 3xl:col-span-4 flex justify-center items-center"
          >
            <div className="relative flex items-center justify-center">
              <HeroVisual
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
              <ProjectCard3D
                selectedProject={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            </div>
          </motion.div>

          {/* AI Panel / Right Panel (Col 2) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden 3xl:block 3xl:col-span-2"
          >
            <RightPanel />
          </motion.div>

        </div>
      </div>

      {/* Project Detail Overlay */}
      <ProjectPopup
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </section>
  );
}