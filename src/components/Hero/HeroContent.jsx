import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import Stats from "./Stats";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <span className="cyber uppercase tracking-[6px] text-cyan-400">
        Welcome To My Portfolio
      </span>

      <h1 className="mt-5 text-6xl xl:text-7xl font-black leading-none">
        RAJAN
        <br />
        KUMAR
      </h1>

      <div className="mt-8 text-2xl xl:text-3xl text-cyan-400 font-semibold">

        {/* Full text for screen readers and print; the typewriter is visual only */}
        <span className="sr-only">
          Computer Science Undergraduate · Cybersecurity &amp; Applied AI/ML
        </span>
        <span className="hidden print:inline">
          Computer Science Undergraduate · Cybersecurity &amp; Applied AI/ML
        </span>
        <span aria-hidden="true" className="print:hidden">
          <TypeAnimation
            sequence={[
              "Computer Science Undergraduate · Cybersecurity & Applied AI/ML",
            ]}
            cursor={true}
            repeat={0}
          />
        </span>

      </div>

      <p className="mt-8 max-w-lg text-lg text-gray-400 leading-8">

        Building network threat detection systems and full-stack AI
        applications, with hands-on work across Python, React, Node.js
        and machine learning.

      </p>

      <div className="mt-12 flex gap-6">

        <a
          href="#projects"
          className="px-8 py-4 rounded-xl bg-cyan-400 text-black font-bold flex items-center gap-2 hover:scale-105 transition"
        >

          Explore

          <ArrowRight size={18} />

        </a>

        <a
          href="/resume.pdf"
          download="Rajan_Kumar_Resume.pdf"
          className="glass px-8 py-4 rounded-xl flex items-center gap-2"
        >

          Resume

          <Download size={18} />

        </a>

      </div>
      <Stats />

    </motion.div>
  );
}