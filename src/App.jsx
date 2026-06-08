import React, { Suspense, lazy } from "react";
import Navbar from "./sections/Navbar";

const Hero = lazy(() => import("./sections/Hero"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Skills = lazy(() => import("./sections/Skills"));
const Contact = lazy(() => import("./sections/Contact"));

const SectionFallback = () => (
  <div className="c-space py-12 text-sm" style={{ color: "var(--color-ink-muted)" }}>
    Loading…
  </div>
);

const App = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <Suspense fallback={<SectionFallback />}>
          <Hero />
          <About />
          <Projects />
          <Skills />
        </Suspense>
      </div>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  );
};

export default App;
