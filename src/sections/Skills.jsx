import { motion } from "framer-motion";
import { resumeData } from "../constants/resumeData";

const Skills = () => {
  return (
    <section id="skills" className="c-space py-12 md:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300">
            Expertise
          </div>
          <h2 className="text-heading">Skills & Technologies</h2>
          <p className="mt-3 text-neutral-400">
            Tools and technologies I use to build reliable data platforms.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumeData.skills.map((category, index) => (
            <motion.div
              key={category.category}
              className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-purple-400/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-300">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
