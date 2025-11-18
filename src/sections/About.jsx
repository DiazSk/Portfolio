import { useRef } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import PipelineFlow from "../components/PipelineFlow";
import Magnet from "../components/Magnet";

const About = () => {
  const grid2Container = useRef();
  
  return (
    <section className="c-space section-spacing" id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-heading">About Me</h2>
      </motion.div>
      
      {/* Data Pipeline Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 mb-12"
      >
        <h3 className="text-2xl font-semibold text-white mb-4">
          End-to-End Data Pipeline Architecture
        </h3>
        <PipelineFlow />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 - Personal Introduction */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-end grid-default-color grid-1"
        >
          <img
            src="assets/coding-pov.png"
            alt="Coding"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I&apos;m Zaid</p>
            <p className="subtext">
              MS Computer Science student at Northeastern University (4.0 GPA) specializing in Data Engineering. 
              Built production pipelines processing 66K+ records with Airflow, Kafka, Flink, and dbt. Achieved 
              67% query optimization and 96.3% test pass rate. Oracle Cloud Infrastructure Data Science Professional certified.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </motion.div>
        
        {/* Grid 2 - Data Engineering Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid-default-color grid-2"
        >
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
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
        </motion.div>
        
        {/* Grid 3 - Location/Time Zone */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid-black-color grid-3"
        >
          <div className="z-10 w-[50%]">
            <p className="headtext">Location</p>
            <p className="subtext">
              Based in Seattle, WA (Northeastern University campus). 
              Open to remote internships and co-ops nationwide. 
              Targeting Summer 2026 Data Engineering internships.
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </motion.div>
        
        {/* Grid 4 - Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid-special-color grid-4"
        >
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Looking for a Data Engineer?
            </p>
            <p className="text-center text-sm text-neutral-400">
              Summer 2026 Internship • Available for Co-op
            </p>
            <Magnet strength={0.4}>
              <CopyEmailButton />
            </Magnet>
          </div>
        </motion.div>
        
        {/* Grid 5 - Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid-default-color grid-5"
        >
          <div className="z-10 w-[50%]">
            <p className="headText">Tech Stack</p>
            <p className="subtext">
              Specialized in building production-grade data pipelines with Airflow orchestration, 
              stream processing with Kafka/Flink, and infrastructure as code with Terraform. 
              Strong SQL optimization and dimensional modeling expertise.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
