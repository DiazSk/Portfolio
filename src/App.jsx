import React, { Suspense, lazy } from "react";
import Navbar from "./sections/Navbar";

const Hero = lazy(() => import("./sections/Hero"));
const Projects = lazy(() => import("./sections/Projects"));
const Skills = lazy(() => import("./sections/Skills"));
const AIResumeChat = lazy(() => import("./sections/AIResumeChat"));
const Contact = lazy(() => import("./sections/Contact"));

const SectionFallback = () => (
  <div className="c-space py-12 text-sm text-neutral-500">Loading section...</div>
);

const App = () => {
  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <Navbar />
        <Suspense fallback={<SectionFallback />}>
          <Hero />
          <AIResumeChat />
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
