import { motion } from "framer-motion";

export default function GlowBlobs() {
  return (
    <>
      {/* Main Cyan Blob */}
      <motion.div
        animate={{
          x: [0, 180, 0],
          y: [0, -120, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-48
          -left-48
          w-[700px]
          h-[700px]
          rounded-full
          bg-cyan-400/15
          blur-[180px]
        "
      />

      {/* Purple Blob */}
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-40
          -right-40
          w-[650px]
          h-[650px]
          rounded-full
          bg-purple-500/15
          blur-[200px]
        "
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          opacity: [0.05, 0.18, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[900px]
          h-[900px]
          rounded-full
          bg-cyan-400/10
          blur-[260px]
        "
      />

      {/* Accent Glow */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
          x: [0, 60, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-20
          right-32
          w-[300px]
          h-[300px]
          rounded-full
          bg-emerald-400/10
          blur-[130px]
        "
      />
    </>
  );
}