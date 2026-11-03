import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            ABOUT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
            Cybersecurity × AI Engineering
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a final-year Computer Science undergraduate building a
            foundation across networks, cryptography, and applied AI/ML.
            I completed a security-focused project training analyzing a real
            industrial malware case, and an AI/ML internship covering the
            full pipeline from data handling to NLP. I'm CCNA-trained
            across networking, switching/routing, and enterprise security.
          </p>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Outside coursework, I build things — a network threat detection
            system, a full-stack AI-powered community platform, and a
            real-time emergency response network. Looking for a
            cybersecurity or AI engineering role where I can keep building
            and learning fast.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
