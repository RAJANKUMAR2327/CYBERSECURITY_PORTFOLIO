import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Code2, Link2 } from "lucide-react";
import socials from "../../data/socials";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass p-10 md:p-14 text-center max-w-2xl mx-auto"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            CONTACT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Let's build something meaningful.
          </h2>
          <p className="text-gray-400 mb-8">
            Open to cybersecurity and AI engineering roles — product,
            service, startup, or MNC. Anywhere.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href={`mailto:${socials.email}`}
              className="cyber-button px-6 py-3 rounded-full text-black font-semibold text-sm"
            >
              Email Me
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              <Link2 size={16} /> LinkedIn
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              <Code2 size={16} /> GitHub
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <Mail size={14} /> {socials.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} />{" "}
              <a href={`tel:${socials.phone.replace(/\s+/g, "")}`} className="hover:text-cyan-400 transition">
                {socials.phone}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> {socials.location}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
