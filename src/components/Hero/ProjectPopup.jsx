import { motion, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import projects from "../../data/projects";

export default function ProjectPopup({
  selectedProject,
  setSelectedProject,
}) {
  return (
    <AnimatePresence>
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-label={projects[selectedProject].title}
          className="glass fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[min(420px,calc(100vw-2rem))] max-h-[70dvh] overflow-y-auto p-6 z-50 xl:hidden"
        >
          <button
            type="button"
            aria-label="Close project details"
            className="absolute top-3 right-4 text-xl"
            onClick={() => setSelectedProject(null)}
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-cyan-400">
            {projects[selectedProject].title}
          </h2>

          <p className="mt-3 text-gray-300">
            {projects[selectedProject].description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {projects[selectedProject].tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-6 text-sm">
            {projects[selectedProject].github && (
              <a
                href={projects[selectedProject].github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-300"
              >
                <Code2 size={16} /> Code
              </a>
            )}
            {projects[selectedProject].live && (
              <a
                href={projects[selectedProject].live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-300"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}