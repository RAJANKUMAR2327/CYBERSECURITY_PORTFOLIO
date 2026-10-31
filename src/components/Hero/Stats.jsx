import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projectCount, certificationCount, internshipCount } from "../../data/counts";

const stats = [
  {
    number: projectCount,
    suffix: "",
    title: "Featured Projects",
  },
  {
    number: certificationCount,
    suffix: "",
    title: "Certifications",
  },
  {
    number: internshipCount,
    suffix: "",
    title: "Internships",
  },
  {
    number: 3,
    suffix: "",
    title: "Core Domains",
  },
];

// Small self-contained count-up animation, built directly on framer-motion
// (already a proven dependency here) instead of a third-party counter
// package, to avoid trusting an unverified export shape.
function Counter({ to, duration = 1.5 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, to, duration, count, rounded]);

  return <span ref={ref}>{display}</span>;
}

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-5 mt-14">

      {stats.map((item, index) => (

        <motion.div
          key={index}
          whileHover={{
            y: -6,
            scale: 1.03,
          }}
          className="glass p-5 rounded-2xl"
        >

          <h2 className="text-3xl font-bold text-cyan-400">
            <Counter to={item.number} duration={1.5} />
            {item.suffix}
          </h2>

          <p className="text-gray-400 mt-2">
            {item.title}
          </p>

        </motion.div>

      ))}

    </div>
  );
}
