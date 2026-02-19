import { resumeData } from "../constants/resumeData";
import { mySocials } from "../constants";
import ShinyText from "../components/ShinyText";

const Contact = () => {
  const { personal } = resumeData;

  const labelByName = {
    Email: personal.email,
    LinkedIn: "LinkedIn Profile",
    GitHub: "GitHub Profile",
  };

  return (
    <section id="contact" className="relative overflow-hidden c-space py-16 md:py-20">
      <div className="relative z-10 w-full text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Let&apos;s Connect
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
          Interested in data engineering internships, co-op opportunities, or collaboration? I'd love to hear from you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {mySocials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-neutral-200 transition-all hover:border-purple-400/40 hover:text-white"
            >
              <img src={social.icon} className="h-4 w-4" alt={social.name} />
              <span>{labelByName[social.name]}</span>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-royal px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-lavender hover:shadow-lg hover:shadow-royal/25"
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-400">
            <ShinyText text="Built with ❤️ by Zaid Shaikh" speed={4} className="text-sm" />
            <ShinyText text="Powered by AI · 2026" speed={5} className="text-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
