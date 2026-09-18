import { useState } from "react";

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li"><a className="nav-link" href="#home">Home</a></li>
      <li className="nav-li"><a className="nav-link" href="#about">About</a></li>
      <li className="nav-li"><a className="nav-link" href="#projects">Projects</a></li>
      <li className="nav-li"><a className="nav-link" href="#skills">Skills</a></li>
      <li className="nav-li"><a className="nav-link" href="#contact">Contact</a></li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-20 w-full border-b"
      style={{
        /* Opaque, not the old 72% translucent ground: over the hero's field
           region a translucent dark bar turns muddy brown. A solid chrome bar
           reads as deliberate and keeps contrast fixed on every section. */
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="c-space mx-auto max-w-7xl">
        <div className="flex min-h-[64px] items-center justify-between">
          <a
            href="/"
            className="text-xl font-semibold tracking-tight transition-opacity hover:opacity-70"
            style={{ color: "var(--color-ink)" }}
          >
            Zaid<span style={{ color: "var(--color-ink-muted)" }}>.</span>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-5 transition-all duration-200"
              style={{
                background: "var(--color-ink)",
                transform: isOpen ? "translateY(4px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-200"
              style={{
                background: "var(--color-ink)",
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-200"
              style={{
                background: "var(--color-ink)",
                transform: isOpen ? "translateY(-4px) rotate(-45deg)" : "none",
              }}
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="mobile-menu border-t sm:hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          <nav className="c-space py-4">
            <Navigation />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
