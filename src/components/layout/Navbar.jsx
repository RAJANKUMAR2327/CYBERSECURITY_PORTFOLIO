import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Writing",
  "Certifications",
  "Experience",
  "Education",
  "Contact",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-[max(1rem,env(safe-area-inset-top))] sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <nav
        aria-label="Primary"
        className="
        glass
        border
        border-white/10
        rounded-full
        px-8
        py-4
        flex
        items-center
        justify-between
      "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="
            w-11
            h-11
            rounded-full
            bg-cyan-400
            flex
            items-center
            justify-center
            font-bold
            text-black
          "
          >
            RK
          </div>

          <span className="cyber text-lg tracking-widest">CYBER</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-4 xl:gap-6 2xl:gap-10 text-sm xl:text-base">
          {links.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="tap 
                text-gray-300
                hover:text-cyan-400
                transition
                duration-300
                relative
                group
              "
              >
                {item}
                <span
                  className="
                  absolute
                  left-0
                  -bottom-2
                  h-[2px]
                  w-0
                  bg-cyan-400
                  group-hover:w-full
                  transition-all
                  duration-300
                "
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Resume */}
        <a
          href="/resume.pdf"
          download="Rajan_Kumar_Resume.pdf"
          className="
          hidden
          lg:block
          px-6
          py-3
          rounded-full
          bg-cyan-400
          text-black
          font-semibold
          hover:scale-105
          transition
        "
        >
          Resume
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2 -mr-2 tap"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass border border-white/10 rounded-3xl mt-3 p-6 lg:hidden max-h-[calc(100svh-8.5rem)] overflow-y-auto"
          >
            <ul className="flex flex-col gap-1">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-gray-200 hover:text-cyan-400 transition text-lg"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/resume.pdf"
              download="Rajan_Kumar_Resume.pdf"
              onClick={() => setOpen(false)}
              className="mt-4 block text-center px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
