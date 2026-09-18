import { resumeData } from "../constants/resumeData";
import { mySocials } from "../constants";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

/*
 * The close mirrors the hero: content on the dark ground, then a full-bleed
 * field band. Stack sits directly above and is already a field surface, so
 * running the whole footer on field made the two merge into one orange mass.
 * The dark upper half separates them and keeps the regions legible as regions.
 */
const Contact = () => {
  const { personal } = resumeData;
  const socialLinks = mySocials.filter((s) => s.name !== "Email");

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* ── Upper: the ask, on the ground ──────────────────────── */}
      <div
        className="c-space border-t pt-24 pb-20"
        style={{ borderColor: "var(--color-border-strong)" }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr_2fr]">
            {/* Left — the ask */}
            <div>
              <h2
                className="text-display max-w-[13ch] uppercase"
                style={{
                  color: "var(--color-ink)",
                  fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                }}
              >
                Open to the right opportunity.
              </h2>
              <p
                className="mt-6 max-w-sm text-base leading-relaxed"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                Full-time Data Engineering roles starting December 2026.
              </p>
            </div>

            {/* Centre — wayfinding */}
            <div>
              <h3
                className="text-mono mb-4 text-xs uppercase"
                style={{ color: "var(--color-ink-muted)", letterSpacing: "0.1em" }}
              >
                Index
              </h3>
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="link-void text-sm">
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
                style={{ color: "var(--color-ink-muted)", letterSpacing: "0.1em" }}
              >
                Contact
              </h3>
              <a
                href={`mailto:${personal.email}`}
                className="btn-primary w-full justify-center"
              >
                {personal.email}
              </a>
              <ul className="mt-3 flex flex-col gap-2.5">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-void link-void-dim text-sm"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── The close: full-bleed field, the name set once ─────── */}
      <div className="field-band pt-14 pb-8">
        {/* The name leads the band; the meta row sits under it.
            Widened to wdth 100 with near-neutral tracking — at 245px the
            condensed axis plus -0.06em was overlapping glyphs. */}
        {/* Same container as the meta row below, so the name's edges line up
            with the hairline rather than bleeding past it. */}
        <div className="c-space mx-auto w-full max-w-7xl">
          <div className="overflow-hidden">
            <span
              className="text-display block w-full select-none leading-none"
              style={{
                color: "var(--color-field-ink)",
                /* Tuned so the name's inked width matches the container, so
                   both ends sit flush with the hairline below it. */
                fontSize: "clamp(3.25rem, 17.8vw, 14.4rem)",
                fontVariationSettings: '"wdth" 100',
                letterSpacing: "-0.012em",
              }}
              aria-hidden="true"
            >
              Zaid Shaikh
            </span>
          </div>
        </div>

        <div className="c-space mx-auto w-full max-w-7xl">
          <div
            className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-xs"
            style={{ borderColor: "#2E1409", color: "#2E1409" }}
          >
            <span>Seattle, WA</span>
            <span className="tabular">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
