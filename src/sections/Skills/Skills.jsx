import { motion } from "framer-motion";
import skills from "../../data/skills";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            SKILLS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            What I'm working with
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {groups.map(([category, items], i) => (
            <motion.div
              key={category}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="glass p-6"
            >
              <h3 className="cyber text-sm tracking-wider text-purple-400 mb-4">
                {category.toUpperCase()}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-gray-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
