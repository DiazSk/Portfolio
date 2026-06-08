import { resumeData } from "../constants/resumeData";
import { mySocials } from "../constants";

const Contact = () => {
  const { personal } = resumeData;

  return (
    <section id="contact" className="c-space py-20">
      <div className="mx-auto max-w-7xl">
        <hr className="section-rule" />

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          {/* Left */}
          <div>
            <p className="text-eyebrow mb-3">Contact</p>
            <h2 className="text-heading mb-2">Let&apos;s connect.</h2>
            <p className="text-sm" style={{ color: "var(--color-ink-secondary)" }}>
              Open to Data Engineering internships, co-ops, and full-time roles.<br />
              Summer &amp; Fall 2026 · Seattle, WA · Remote
            </p>
          </div>

          {/* Right - links */}
          <div className="flex flex-wrap gap-3">
            {mySocials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <img src={social.icon} className="h-4 w-4" style={{ filter: "invert(1) brightness(0)" }} alt={social.name} />
                <span>
                  {social.name === "Email" ? personal.email : social.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
            © 2026 Zaid Shaikh
          </p>
          <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
            Built with React · Deployed on Vercel
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
