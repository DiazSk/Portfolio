import { resumeData } from "../constants/resumeData";
import { mySocials } from "../constants";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

const Contact = () => {
  const { personal } = resumeData;
  const socialLinks = mySocials.filter((s) => s.name !== "Email");

  return (
    <footer
      id="contact"
      className="c-space relative overflow-hidden pt-28 pb-14"
      style={{ background: "var(--color-field)", color: "var(--color-field-ink)" }}
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr_2fr]">
          {/* Left — the ask */}
          <div>
            <h2
              className="text-display max-w-[13ch] uppercase"
              style={{
                color: "var(--color-field-ink)",
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              }}
            >
              Open to the right opportunity.
            </h2>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: "#2E1409" }}
            >
              Full-time Data Engineering roles starting December 2026.
            </p>
          </div>

          {/* Centre — wayfinding */}
          <div>
            <h3
              className="text-mono mb-4 text-xs uppercase"
              style={{ color: "#2E1409", letterSpacing: "0.1em" }}
            >
              Index
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="link-field text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — reach him */}
          <div>
            <h3
              className="text-mono mb-4 text-xs uppercase"
              style={{ color: "#2E1409", letterSpacing: "0.1em" }}
            >
              Contact
            </h3>
            <a
              href={`mailto:${personal.email}`}
              className="btn-on-field w-full justify-center"
            >
              {personal.email}
            </a>
            <ul className="mt-2.5 flex flex-col gap-2.5">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-field text-sm"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The name, set once, at the width of the page */}
        <div className="mt-24 overflow-hidden">
          <span
            className="text-display block w-full select-none leading-none"
            style={{
              color: "var(--color-field-ink)",
              opacity: 0.18,
              fontSize: "clamp(4rem, 19vw, 17rem)",
              letterSpacing: "-0.06em",
            }}
            aria-hidden="true"
          >
            Zaid Shaikh
          </span>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs"
          style={{
            borderColor: "rgba(10,10,9,0.22)",
            color: "#2E1409",
          }}
        >
          <span>Seattle, WA</span>
          <span className="tabular">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
