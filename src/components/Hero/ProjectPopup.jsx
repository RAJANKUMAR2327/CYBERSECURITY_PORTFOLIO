import { motion, AnimatePresence } from "framer-motion";
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
          className="glass fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(420px,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto p-6 z-50 xl:hidden"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}