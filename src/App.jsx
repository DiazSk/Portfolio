import { useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

/* Sections are imported eagerly on purpose. Lazy-splitting them cost ~20kB of
   a 300kB bundle and broke deep links: #projects could not resolve on load
   because the section had not mounted yet. */
const App = () => {
  /* A hash in the URL resolves before layout settles, so the browser lands
     short of the target. Re-run the jump once after first paint. */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl">
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </>
  );
};

export default App;
