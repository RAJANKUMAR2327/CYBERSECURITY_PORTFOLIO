import Background from "./components/background/Background";
import Navbar from "./components/layout/Navbar";

import Hero from "./sections/Hero/Hero";
import AtAGlance from "./sections/AtAGlance/AtAGlance";
import About from "./sections/About/About";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";
import Certifications from "./sections/Certifications/Certifications";
import Experience from "./sections/Experience/Experience";
import Education from "./sections/Education/Education";
import Contact from "./sections/Contact/Contact";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="relative min-h-svh bg-[#030712] text-white overflow-x-hidden">

      {/* Animated Background */}
      <Background />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <AtAGlance />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
