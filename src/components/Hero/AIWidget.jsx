import { Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  projectCount,
  verifiedCertificateCount,
  internshipCount,
  trainingCount,
} from "../../data/counts";

export default function AIWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -10, 0],
      }}
      transition={{
        duration: 0.8,
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="glass w-72 p-5"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Bot className="text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold">Quick Facts</h3>
            <p className="text-xs text-gray-400">Portfolio snapshot</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 my-4" />

      {/* Logs */}
      <div className="space-y-2 text-sm text-gray-200">
        <p>✓ {projectCount} featured projects</p>
        <p>✓ {verifiedCertificateCount} verified certificates</p>
        <p>
          ✓ {internshipCount} internship + {trainingCount} project training
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-5 text-cyan-400">
        <Sparkles size={16} />
        <span className="text-sm">Open to work</span>
      </div>
    </motion.div>
  );
}