import { motion } from "framer-motion";

export default function FloatingCard({
  icon,
  title,
  value,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`glass absolute p-5 rounded-2xl w-56 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-cyan-400/20"> {icon}</div>

        <div>
          <h3 className="text-white font-semibold">
            {title}
          </h3>

          <p className="text-cyan-400 text-sm">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}