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

  /* No overflow-hidden on the footer. It made the footer its own scrollport,
     so every view() timeline inside resolved against the footer rather than
     the viewport, and no reveal in this section ever ran. The field band and
     the wordmark each clip themselves. */
  return (
    <footer id="contact" className="relative">
      {/* ── Upper: the ask, on the ground ──────────────────────── */}
      <div
        className="c-space border-t pt-24 pb-20"
        style={{ borderColor: "var(--color-border-strong)" }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr_2fr]">
            {/* Left — the ask */}
            <div>
              {/* overflow-clip, not hidden: the mask has to clip without
                  becoming a scrollport, or the headline's own view() timeline
                  resolves against this box instead of the viewport and the
                  rise never runs. */}
              <div className="overflow-clip pb-[0.06em]">
                <h2
                  className="rise-in text-display max-w-[13ch] uppercase"
                  style={{
                    color: "var(--color-ink)",
                    /* The documented Headline step. This carried a bespoke
                       clamp(2.75rem, 7vw, 5.5rem) — a fourth display size
                       for what is a section head, which the Two-Step Scale
                       Rule exists to prevent. */
                    fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                  }}
                >
                  Open to the right opportunity.
                </h2>
              </div>
              <p
                className="on-scroll mt-6 max-w-sm text-base leading-relaxed"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                Full-time Data Engineering roles starting December 2026.
              </p>
            </div>

            {/* Centre — wayfinding */}
            <div className="on-scroll r1">
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
            <div className="on-scroll r2">
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
          {/* Sized in cqw, not vw: the hairline's width is the container's,
              which stops growing at max-w-7xl while vw keeps going. Past
              ~1294px the two scales crossed, the line overshot by a pixel
              and wrapped — so on a full-screen MacBook the name broke into
              two short lines. One container unit drives both now, and nowrap
              makes a wrap impossible rather than unlikely.
              Optical sizing is off because it is a second scale: Bricolage's
              opsz axis widens the face below ~120px (5.22 em-widths instead
              of 5.00), so one multiplier cannot be flush at both ends while
              it is on. Pinned, the ratio is 5.002 at every size and
              19.98cqw lands under a pixel inside the hairline. Above 120px
              this renders exactly what auto already chose. */}
          <div className="overflow-clip" style={{ containerType: "inline-size" }}>
            <span
              className="rise-in text-display block w-full select-none leading-none"
              style={{
                color: "var(--color-field-ink)",
                fontSize: "19.98cqw",
                fontVariationSettings: '"wdth" 100',
                fontOpticalSizing: "none",
                letterSpacing: "-0.012em",
                whiteSpace: "nowrap",
              }}
              aria-hidden="true"
            >
              Zaid Shaikh
            </span>
          </div>
        </div>

        <div className="c-space mx-auto w-full max-w-7xl">
          <div
            className="on-scroll r1 mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-xs"
            style={{ borderColor: "var(--color-field-ink-secondary)", color: "var(--color-field-ink-secondary)" }}
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
