import { motion } from "framer-motion";
import {
  internshipCount,
  trainingCount,
  flagshipProject,
} from "../../data/counts";

const items = [
  { label: "Focus", value: "Cybersecurity · Full-Stack · Applied AI/ML" },
  { label: "Core stack", value: "Python · React · Node.js · MongoDB" },
  { label: "Flagship project", value: flagshipProject },
  { label: "Experience", value: `${internshipCount} internship · ${trainingCount} project training` },
  { label: "Education", value: "B.Tech Computer Science, 2027" },
];

export default function AtAGlance() {
  return (
    <section className="relative py-12 border-b border-white/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="glass px-6 py-6 md:px-10 md:py-8"
        >
          <p className="cyber text-xs tracking-[0.3em] text-cyan-400 mb-6">
            AT A GLANCE
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {items.map((item) => (
              <div key={item.label}>
                <p className="cyber text-xs tracking-wider text-gray-400 uppercase mb-1.5">
                  {item.label}
                </p>
                <p className="text-white text-sm font-medium leading-snug">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
