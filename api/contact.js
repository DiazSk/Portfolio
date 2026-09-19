/*
 * Contact notification. One email, to Zaid, when someone writes in.
 *
 * There is no auto-reply. There used to be, and it was three problems in one:
 * it went to whatever address the caller supplied, which made this endpoint an
 * open relay for mailing strangers from Zaid's domain; it repeated the "80GB"
 * figure PRODUCT.md retracted on 2026-09-17; and it promised response times
 * ("Job Opportunities: Within 24 hours") that nothing here can keep. Removing
 * it deleted all three at once. A portfolio contact form owes no one a receipt.
 *
 * The markup is HTML email, so it is tables and inline styles rather than the
 * stylesheet the site uses — see the Transactional Email section in DESIGN.md
 * for what the medium costs and what is substituted.
 *
 * Nothing calls this yet: the site is `mailto:` and a copy-email button. It is
 * written to be correct on the day the form lands, which PRODUCT.md records as
 * a planned capability.
 */
import { Resend } from "resend";

/* Lazily constructed: `new Resend(undefined)` throws, and building it at module
   scope would make this file unimportable without the key — including from its
   own test. */
let client;
const mailer = () => (client ??= new Resend(process.env.RESEND_API_KEY));

/* An env var and not a literal: this repo is public, and the address that
   actually receives mail today is a personal one that should not be sitting in
   it for scrapers. Set CONTACT_TO in .env.local and in the Vercel project.

   The default is the address the site publishes, which is where this should
   point once a domain is verified — see FROM below for why it cannot today. */
const TO = process.env.CONTACT_TO ?? "shaikh.zaid@northeastern.edu";

/* Resend's sandbox sender, and a hard limit rather than a detail: it delivers
   ONLY to the address the Resend account is registered under. That address is
   not the one the site publishes, so with no domain verified this handler
   returns 403 for the published address — verified 2026-09-19, with a live
   key. Verifying a domain at resend.com/domains and changing FROM to it is the
   prerequisite for mailing anyone else, CONTACT_TO is the stopgap until then,
   and changing FROM before that breaks sending outright. */
const FROM = "Portfolio <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 200, message: 5000 };

/* The DESIGN.md frontmatter, as literals — email has no custom properties.
   The two hairlines are the site's 8% and 16% white pre-composited over the
   ground, because Outlook's Word engine drops rgba(). */
const C = {
  surface: "#08090A",
  ink: "#F7F8F8",
  inkSecondary: "#B4B9C2",
  inkMuted: "#8A8F98",
  field: "#FF3B14",
  fieldInk: "#0A0A09",
  fieldInkSecondary: "#2E1409",
  hairline: "#1C1D1E",
  hairlineStrong: "#303031",
};

/* Gmail and Outlook strip webfonts, so the condensed axis that defines this
   system cannot load. Arial Narrow is the honest fallback — genuinely
   condensed and present on Windows and macOS. Apple Mail gets the real face. */
const F = {
  display: "'Bricolage Grotesque','Arial Narrow','Helvetica Neue',Arial,sans-serif",
  body: "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  mono: "'Azeret Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
};

const LABEL = `font-family:${F.mono};font-size:12px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;`;

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Returns the reason it is invalid, or null. Deliberately not a schema
   library: three fields do not earn a dependency. */
export function validate({ name, email, message }) {
  for (const [field, value] of Object.entries({ name, email, message })) {
    if (typeof value !== "string" || !value.trim()) return `Missing ${field}`;
    if (value.length > LIMITS[field]) return `${field} exceeds ${LIMITS[field]} characters`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Invalid email";
  return null;
}

/*
 * The site's own silhouettes, ported: a full-bleed field band carrying a micro
 * label and one poster line, ruled rows for the metadata, a left-ruled log for
 * the message, and a square primary button. Values arrive escaped.
 */
export function notificationTemplate({ name, email, message, receivedAt }) {
  const rule = (label, value) => `
          <tr>
            <td valign="top" width="104" style="width:104px;padding:16px 0;border-bottom:1px solid ${C.hairlineStrong};${LABEL}color:${C.inkMuted};">${label}</td>
            <td valign="top" style="padding:16px 0;border-bottom:1px solid ${C.hairlineStrong};font-family:${F.body};font-size:14px;line-height:1.5;color:${C.ink};">${value}</td>
          </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<!-- The design is dark on purpose. Declaring the scheme stops Gmail, Apple
     Mail and Outlook from "helpfully" inverting it. -->
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>New contact</title>
</head>
<body style="margin:0;padding:0;background:${C.surface};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.surface};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;">

        <tr>
          <td bgcolor="${C.field}" style="background:${C.field};padding:32px;">
            <p style="margin:0 0 22px;${LABEL}color:${C.fieldInkSecondary};">New contact</p>
            <p style="margin:0;font-family:${F.display};font-size:44px;font-weight:800;line-height:0.9;letter-spacing:-0.02em;text-transform:uppercase;color:${C.fieldInk};">${name}</p>
          </td>
        </tr>

        <tr>
          <td style="background:${C.surface};padding:8px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rule("Email", `<a href="mailto:${email}" style="color:${C.ink};text-decoration:none;">${email}</a>`)}${rule("Received", receivedAt)}
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:${C.surface};padding:32px 32px 28px;">
            <p style="margin:0 0 16px;${LABEL}color:${C.inkMuted};">Message</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:2px 0 2px 16px;border-left:1px solid ${C.hairlineStrong};font-family:${F.body};font-size:16px;line-height:1.625;color:${C.inkSecondary};">${message}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:${C.surface};padding:0 32px 36px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${C.field}" style="background:${C.field};">
                  <a href="mailto:${email}" style="display:inline-block;padding:14px 24px;font-family:${F.display};font-size:16px;font-weight:800;letter-spacing:0.005em;text-transform:uppercase;color:${C.fieldInk};text-decoration:none;">Reply</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:${C.surface};border-top:1px solid ${C.hairline};padding:22px 32px 0;">
            <p style="margin:0;font-family:${F.mono};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:${C.inkMuted};">Sent by the contact form at zaid-data.vercel.app</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};

  const invalid = validate({ name, email, message });
  if (invalid) return res.status(400).json({ error: invalid });

  /* Escape first, then turn newlines into breaks — the other order would let a
     crafted message smuggle markup through the entity pass. */
  const safe = {
    name: escapeHtml(name.trim()),
    email: escapeHtml(email.trim()),
    message: escapeHtml(message.trim()).replace(/\n/g, "<br>"),
    receivedAt: new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  try {
    await mailer().emails.send({
      from: FROM,
      to: [TO],
      reply_to: email.trim(),
      /* Newlines out of the subject: a header is one line by definition. */
      subject: `Portfolio contact — ${name.trim().replace(/\s+/g, " ")}`,
      html: notificationTemplate(safe),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    /* Logged in full, returned as nothing: the previous version handed the
       caller `error.message` straight from Resend. */
    console.error("Resend send failed:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
