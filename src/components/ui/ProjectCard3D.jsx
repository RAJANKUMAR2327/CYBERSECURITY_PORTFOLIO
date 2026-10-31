import { motion, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import projects from "../../data/projects";

export default function ProjectCard3D({ selectedProject }) {
  if (selectedProject === null || selectedProject === undefined) return null;

  const project = projects[selectedProject];
  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.title}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 80 }}
        transition={{ duration: 0.5 }}
        className="
          hidden xl:block
          absolute
          right-10
          top-1/2
          -translate-y-1/2
          w-[360px]
          rounded-3xl
          border
          border-cyan-400/40
          bg-white/5
          backdrop-blur-2xl
          p-7
          shadow-[0_0_50px_rgba(0,245,255,.25)]
        "
      >
        <h2 className="text-2xl font-bold text-cyan-300">
          {project.title}
        </h2>

        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((item) => (
            <span
              key={item}
              className="
                px-3
                py-1
                rounded-full
                bg-cyan-500/10
                border
                border-cyan-500/30
                text-cyan-300
                text-sm
              "
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-cyan-500
                text-black
                font-semibold
              "
            >
              <Code2 size={18} />
              GitHub
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                border
                border-cyan-400
                text-cyan-300
              "
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
