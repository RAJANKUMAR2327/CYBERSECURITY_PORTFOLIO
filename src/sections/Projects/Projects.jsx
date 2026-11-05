import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, ChevronDown } from "lucide-react";
import projects from "../../data/projects";
import ArchitectureFlow from "../../components/ui/ArchitectureFlow";

function CaseStudyField({ label, children }) {
  return (
    <div className="mb-5">
      <p className="cyber text-xs tracking-widest text-cyan-400 mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

function ProjectCard({ project, index, open, onToggle }) {
  const hasCaseStudy = Boolean(
    project.whyItMatters || project.architecture || project.engineeringDecisions
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass p-6 flex flex-col"
    >
      <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-5 mb-5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs border border-cyan-500/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Expandable case study */}
      {hasCaseStudy && (
        <>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="tap flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition mb-2 self-start"
          >
            {open ? "Hide case study" : "View case study"}
            <ChevronDown
              size={15}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10 pt-5 mt-2"
            >
              {project.whyItMatters && (
                <CaseStudyField label="Why it matters">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.whyItMatters}
                  </p>
                </CaseStudyField>
              )}

              {project.aiClarification && (
                <CaseStudyField label="AI vs. engineering">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.aiClarification}
                  </p>
                </CaseStudyField>
              )}

              {project.architecture && (
                <CaseStudyField label="Architecture">
                  <ArchitectureFlow steps={project.architecture} />
                </CaseStudyField>
              )}

              {project.engineeringDecisions && (
                <CaseStudyField label="Engineering decisions">
                  <div className="space-y-3">
                    {project.engineeringDecisions.map((d) => (
                      <div key={d.q}>
                        <p className="text-white text-sm font-semibold">
                          {d.q}
                        </p>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                          {d.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </CaseStudyField>
              )}

              {project.whatILearned && (
                <CaseStudyField label="What I learned">
                  <ul className="space-y-1.5">
                    {project.whatILearned.map((item) => (
                      <li
                        key={item}
                        className="text-gray-300 text-sm flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CaseStudyField>
              )}

              {project.evaluationStatus && (
                <CaseStudyField label="Evaluation status">
                  <p className="text-amber-300/90 text-sm leading-relaxed italic">
                    {project.evaluationStatus}
                  </p>
                </CaseStudyField>
              )}

              {project.nextImprovements && (
                <CaseStudyField label="What I'd build next">
                  <ul className="space-y-1.5">
                    {project.nextImprovements.map((item) => (
                      <li
                        key={item}
                        className="text-gray-300 text-sm flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CaseStudyField>
              )}
            </motion.div>
          )}
        </>
      )}

      {(project.github || project.live) && (
      <div className="flex gap-4 pt-4 mt-auto border-t border-white/10">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="tap flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition"
          >
            <Code2 size={16} /> Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="tap flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(0); // CyberShield's case study open by default

  return (
    <section id="projects" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            PROJECTS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Featured work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start md:[&>*:last-child:nth-child(odd)]:col-span-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              open={openId === project.id}
              onToggle={() =>
                setOpenId(openId === project.id ? null : project.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
