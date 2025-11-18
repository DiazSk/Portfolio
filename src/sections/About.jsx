import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import PipelineFlow from "../components/PipelineFlow";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightCard from "../components/SpotlightCard";
import Magnet from "../components/Magnet";

const About = () => {
  const grid2Container = useRef();
  
  return (
    <section className="c-space section-spacing" id="about">
      <ScrollReveal direction="up">
        <h2 className="text-heading">About Me</h2>
      </ScrollReveal>
      
      {/* Data Pipeline Flow Visualization */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mt-8 mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            End-to-End Data Pipeline Architecture
          </h3>
          <PipelineFlow />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 - Personal Introduction */}
        <ScrollReveal direction="left" delay={0.1} className="grid-1">
          <SpotlightCard className="h-full">
            <div className="flex items-end grid-default-color h-full relative overflow-hidden">
              <img
                src="assets/coding-pov.png"
                alt="Coding"
                className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] opacity-50"
              />
              <div className="z-10 p-6">
                <p className="headtext text-white font-bold mb-3">Hi, I&apos;m Zaid</p>
                <p className="subtext text-gray-300">
                  MS Computer Science student at Northeastern University (4.0 GPA) specializing in Data Engineering. 
                  Built production pipelines processing 66K+ records with Airflow, Kafka, Flink, and dbt. Achieved 
                  67% query optimization and 96.3% test pass rate. Oracle Cloud Infrastructure Data Science Professional certified.
                </p>
              </div>
              <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            </div>
          </SpotlightCard>
        </ScrollReveal>
        
        {/* Grid 2 - Data Engineering Concepts */}
        <ScrollReveal direction="up" delay={0.2} className="grid-2">
          <SpotlightCard className="h-full">
            <div className="grid-default-color h-full">
              <div
                ref={grid2Container}
                className="flex items-center justify-center w-full h-full relative"
              >
                <p className="flex items-end text-5xl text-gray-500 font-bold z-0">
                  DATA ENGINEER
                </p>
                <Card
                  style={{ rotate: "75deg", top: "30%", left: "20%" }}
                  text="Apache Airflow"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                  text="Apache Kafka"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
                  text="Apache Flink"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                  text="dbt + SQL"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "20deg", top: "10%", left: "38%" }}
                  text="Terraform IaC"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "30deg", top: "70%", left: "70%" }}
                  image="assets/logos/python.svg"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-45deg", top: "70%", left: "25%" }}
                  image="assets/logos/postgresql.svg"
                  containerRef={grid2Container}
                />
                <Card
                  style={{ rotate: "-45deg", top: "5%", left: "10%" }}
                  image="assets/logos/aws.svg"
                  containerRef={grid2Container}
                />
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
        
        {/* Grid 3 - Location/Time Zone */}
        <ScrollReveal direction="right" delay={0.3} className="grid-3">
          <SpotlightCard className="h-full">
            <div className="grid-black-color h-full p-6 relative overflow-hidden">
              <div className="z-10 w-[50%]">
                <p className="headtext text-white font-bold mb-3">Location</p>
                <p className="subtext text-gray-300">
                  Based in Seattle, WA (Northeastern University campus). 
                  Open to remote internships and co-ops nationwide. 
                  Targeting Summer 2026 Data Engineering internships.
                </p>
              </div>
              <figure className="absolute left-[30%] top-[10%]">
                <Globe />
              </figure>
            </div>
          </SpotlightCard>
        </ScrollReveal>
        
        {/* Grid 4 - Contact CTA */}
        <ScrollReveal direction="up" delay={0.4} className="grid-4">
          <SpotlightCard className="h-full">
            <div className="grid-special-color h-full">
              <div className="flex flex-col items-center justify-center gap-4 size-full p-6">
                <p className="text-center headtext text-white font-bold">
                  Looking for a Data Engineer?
                </p>
                <p className="text-center text-sm text-gray-400">
                  Summer 2026 Internship • Available for Co-op
                </p>
                <Magnet strength={0.4}>
                  <CopyEmailButton />
                </Magnet>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
        
        {/* Grid 5 - Tech Stack */}
        <ScrollReveal direction="left" delay={0.5} className="grid-5">
          <SpotlightCard className="h-full">
            <div className="grid-default-color h-full p-6 relative overflow-hidden">
              <div className="z-10 w-[50%]">
                <p className="headText text-white font-bold mb-3">Tech Stack</p>
                <p className="subtext text-gray-300">
                  Specialized in building production-grade data pipelines with Airflow orchestration, 
                  stream processing with Kafka/Flink, and infrastructure as code with Terraform. 
                  Strong SQL optimization and dimensional modeling expertise.
                </p>
              </div>
              <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
                <Frameworks />
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
