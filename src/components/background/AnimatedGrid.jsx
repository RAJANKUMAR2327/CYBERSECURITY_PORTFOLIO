import { motion } from "framer-motion";

export default function AnimatedGrid() {
  return (
    <>
      {/* Moving Grid */}
      <motion.div
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,245,255,.08), transparent 70%)",
        }}
      />

      {/* Top Glow */}
      <div className="absolute -top-60 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      {/* Bottom Purple Glow */}
      <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[160px]" />
    </>
  );
}