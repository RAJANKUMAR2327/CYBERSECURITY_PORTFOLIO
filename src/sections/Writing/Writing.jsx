import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import writing from "../../data/writing";

export default function Writing() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="writing" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            WRITING
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Security notes from the projects
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-2xl">
            Short write-ups of design decisions, each tied to the file or
            document in the project that backs it up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {writing.map((post, i) => {
            const open = openId === post.id;
            const panelId = `post-${post.id}`;
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass p-6"
              >
                <p className="flex items-center gap-2 text-xs text-purple-400 mb-2">
                  <BookOpen size={14} aria-hidden="true" /> {post.project}
                </p>
                <h3 className="text-white font-semibold text-lg leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-2">
                  {post.summary}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : post.id)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="tap mt-4 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition"
                >
                  {open ? "Close" : "Read the note"}
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>

                {open && (
                  <div id={panelId} className="mt-4 space-y-4">
                    {post.body.map((para, k) => (
                      <p
                        key={k}
                        className="text-gray-300 text-sm leading-7"
                      >
                        {para}
                      </p>
                    ))}
                    <p className="text-xs text-gray-400 border-t border-white/10 pt-3">
                      Source in the project: {post.source}
                    </p>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
