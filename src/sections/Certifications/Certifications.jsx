import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Maximize2 } from "lucide-react";
import certificates from "../../data/certificates";
import Lightbox from "../../components/ui/Lightbox";

export default function Certifications() {
  const [openProof, setOpenProof] = useState(null);

  return (
    <section id="certifications" className="relative py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="cyber text-sm tracking-[0.3em] text-cyan-400 mb-3">
            CERTIFICATIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Training &amp; certifications
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Cards with an expand arrow open the certificate image; the Cisco entries are course completions without an uploaded certificate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {certificates.map((cert, i) => {
            const clickable = Boolean(cert.proof);
            return (
              <motion.button
                type="button"
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => clickable && setOpenProof(cert)}
                disabled={!clickable}
                className={`glass p-5 flex gap-4 items-start text-left w-full transition ${
                  clickable
                    ? "cursor-pointer hover:border-cyan-400/40 hover:-translate-y-0.5"
                    : "cursor-default"
                }`}
              >
                <Award size={20} className="text-cyan-400 mt-1 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-purple-400 text-xs mt-1">
                    {cert.issuer}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{cert.meta}</p>
                </div>
                {clickable && (
                  <Maximize2
                    size={15}
                    className="text-gray-400 shrink-0 mt-1"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <Lightbox
        src={openProof?.proof}
        alt={openProof?.name}
        onClose={() => setOpenProof(null)}
      />
    </section>
  );
}
