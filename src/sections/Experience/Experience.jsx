import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import experience from "../../data/experience";
import Lightbox from "../../components/ui/Lightbox";

export default function Experience() {
  const [openProof, setOpenProof] = useState(null);

  return (
    <section id="experience" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            EXPERIENCE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Internships &amp; training
          </h2>
        </motion.div>

        <div className="space-y-6 max-w-3xl">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-6 border-l-2 border-cyan-400/50"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <span className="cyber text-xs text-gray-400">
                  {exp.period}
                </span>
              </div>
              <p className="text-purple-400 text-sm mb-3">{exp.org}</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {exp.description}
              </p>

              {exp.proof && (
                <button
                  onClick={() => setOpenProof(exp)}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition"
                >
                  <Maximize2 size={13} />
                  View Certificate
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        src={openProof?.proof}
        alt={openProof?.role}
        onClose={() => setOpenProof(null)}
      />
    </section>
  );
}
