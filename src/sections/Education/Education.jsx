import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Maximize2 } from "lucide-react";
import education from "../../data/education";
import Lightbox from "../../components/ui/Lightbox";

export default function Education() {
  const [openProof, setOpenProof] = useState(null);

  return (
    <section id="education" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            EDUCATION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Academic background
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Marksheets open as images with personal identifiers (roll and
            registration numbers, parents&apos; names, date of birth) redacted.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-6 flex gap-4 items-start border-l-2 border-cyan-400/50"
            >
              <GraduationCap
                size={22}
                className="text-cyan-400 mt-1 shrink-0"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-white font-semibold">{item.degree}</h3>
                  {item.period && (
                    <span className="cyber text-xs text-gray-400">
                      {item.period}
                    </span>
                  )}
                </div>
                {item.institution && (
                  <p className="text-purple-400 text-sm mt-1">
                    {item.institution}
                    {item.affiliation && ` · ${item.affiliation}`}
                  </p>
                )}
                <p className="text-gray-300 text-sm mt-1">{item.score}</p>

                {item.proof && (
                  <button
                    type="button"
                    onClick={() => setOpenProof(item)}
                    className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <Maximize2 size={13} />
                    View marksheet
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        src={openProof?.proof}
        alt={openProof ? `${openProof.degree} marksheet` : undefined}
        onClose={() => setOpenProof(null)}
      />
    </section>
  );
}
