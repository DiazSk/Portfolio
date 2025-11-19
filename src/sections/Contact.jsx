import { useState } from "react";
import Alert from "../components/Alert";
import GalaxyBackground from "../components/GalaxyBackground";
import Magnet from "../components/Magnet";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" });
        showAlertMessage("success", "Message sent! I'll get back to you soon.");
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showAlertMessage("danger", `Error sending message. Email me directly at zaid07sk@gmail.com`);
    }
  };

  return (
    <section id="contact" className="relative flex items-center justify-center min-h-screen overflow-hidden c-space">
      {/* Galaxy Background - Behind Contact Section Only */}
      <div className="absolute inset-0 w-full h-full">
        <GalaxyBackground
          mouseRepulsion={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={200}
        />
      </div>

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md p-8 mx-auto border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Let&apos;s Talk
            </span>
          </h2>
          <p className="font-normal text-neutral-300">
            Looking for a Data Engineer for Summer 2026 internships or co-op positions?
            I build production-grade data pipelines with proven impact. Let's discuss how
            I can contribute to your team!
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label text-neutral-200">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus bg-white/5 text-white"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="field-label text-neutral-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus bg-white/5 text-white"
              placeholder="john.doe@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="field-label text-neutral-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="field-input field-input-focus bg-white/5 text-white"
              placeholder="Tell me about your Data Engineering opportunities..."
              value={formData.message}
              onChange={handleChange}
              required
              maxLength="1000"
            />
            <p className="mt-1 text-xs text-neutral-500">
              {formData.message.length}/1000 characters
            </p>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <Magnet strength={0.3} className="flex-1">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-6 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-white transition-all duration-300 shadow-lg shadow-purple-500/30 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </Magnet>

            <Magnet strength={0.3}>
              <a
                href="mailto:zaid07sk@gmail.com"
                className="px-6 py-4 text-lg text-center rounded-lg bg-navy/80 hover:bg-storm text-white flex items-center justify-center transition-colors duration-300 border border-white/10 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Direct Email
              </a>
            </Magnet>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 w-full">
          <p className="text-center text-sm text-neutral-400 mb-3">Or connect via:</p>
          <div className="flex justify-center gap-6">
            <Magnet strength={0.2}>
              <a
                href="https://linkedin.com/in/zaidshaikhscientist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </Magnet>
            <Magnet strength={0.2}>
              <a
                href="https://github.com/DiazSk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-purple-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
