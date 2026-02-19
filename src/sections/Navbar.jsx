import { useState } from "react";
import { motion } from "framer-motion";
import ShinyText from "../components/ShinyText";

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home">
          <ShinyText text="Home" disabled={false} speed={3} className="hover:text-white hover:scale-110 transition-all duration-300" />
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#chat">
          <ShinyText text="AI Chat" disabled={false} speed={3} className="hover:text-white hover:scale-110 transition-all duration-300" />
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#projects">
          <ShinyText text="Projects" disabled={false} speed={3} className="hover:text-white hover:scale-110 transition-all duration-300" />
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#skills">
          <ShinyText text="Skills" disabled={false} speed={3} className="hover:text-white hover:scale-110 transition-all duration-300" />
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">
          <ShinyText text="Contact" disabled={false} speed={3} className="hover:text-white hover:scale-110 transition-all duration-300" />
        </a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex min-h-[72px] items-center justify-between py-3 sm:py-2">
          <a
            href="/"
            className="text-2xl font-semibold tracking-tight text-white transition-colors"
          >
            Zaid
            <span className="ml-1 text-lavender">.</span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            >
              <img
                src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                className="h-6 w-6"
                alt="toggle"
              />
            </button>
          </div>

          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
