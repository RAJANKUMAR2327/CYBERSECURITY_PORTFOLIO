import socials from "../../data/socials";

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/10">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Rajan Kumar. Built with intent, not
          templates.
        </p>
        <div className="flex gap-6 text-gray-400 text-sm">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="tap py-1 inline-block hover:text-cyan-400 transition"
          >
            GitHub
          </a>
          <a
            href={socials.devPortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="tap py-1 inline-block hover:text-cyan-400 transition"
          >
            Dev Portfolio
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="tap py-1 inline-block hover:text-cyan-400 transition"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="tap py-1 inline-block hover:text-cyan-400 transition"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
