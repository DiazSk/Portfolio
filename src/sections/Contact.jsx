import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../constants/resumeData";
import { mySocials } from "../constants";

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

const colVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Contact = () => {
  const { personal } = resumeData;
  const socialLinks = mySocials.filter((s) => s.name !== "Email");
  const sectionRef = useRef(null);
  const zaidInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="c-space relative overflow-hidden py-32 md:py-36"
      style={{ background: "#141414" }}
    >
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.55,
        }}
      />

      {/* ZAID watermark — stretched, centered, bottom-clipped, animates up on scroll */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="block text-center font-bold"
          initial={{ y: "100%", opacity: 0 }}
          animate={zaidInView ? { y: "15%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(9rem, 28vw, 24rem)",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.05)",
            lineHeight: 0.8,
          }}
        >
          ZAID
        </motion.span>
      </div>

      <div className="relative mx-auto max-w-7xl md:-translate-y-10">
        {/* 3-column editorial grid — staggered whileInView entrance */}
        <motion.div
          className="grid grid-cols-1 gap-16 md:-translate-y-8 md:grid-cols-[3fr_2fr_2fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >

          {/* Left — headline */}
          <motion.div className="flex items-start md:pt-0" variants={colVariant}>
            <h2
              className="font-semibold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Open to the<br />right opportunity.
            </h2>
          </motion.div>

          {/* Center — Quick links */}
          <motion.div variants={colVariant}>
            <p
              className="mb-5 text-xs font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              /Quick links
            </p>
            <div className="flex flex-wrap gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative overflow-hidden rounded border px-3 py-0.5 text-xs transition-colors duration-150"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    background: "#FAFAF9",
                  }}
                >
                  {/* Visible text — exits upward on hover */}
                  <span
                    className="block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                    style={{ color: "#111111" }}
                  >
                    {link.label}
                  </span>
                  {/* Duplicate — rises up from below on hover */}
                  <span
                    className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                    style={{ color: "#111111" }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact */}
          <motion.div variants={colVariant}>
            <p
              className="mb-5 text-xs font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              /Contact
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="block text-sm transition-all duration-150"
              style={{ color: "rgba(255,255,255,0.65)", textDecorationLine: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.textDecorationLine = "underline";
                e.currentTarget.style.textUnderlineOffset = "3px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                e.currentTarget.style.textDecorationLine = "none";
              }}
            >
              {personal.email}
            </a>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-all duration-150"
                  style={{ color: "rgba(255,255,255,0.35)", textDecorationLine: "none" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.textDecorationLine = "underline";
                    e.currentTarget.style.textUnderlineOffset = "3px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                    e.currentTarget.style.textDecorationLine = "none";
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
