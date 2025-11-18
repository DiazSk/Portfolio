import { mySocials } from "../constants";
import ShinyText from "../components/ShinyText";
import FloatingDock from "../components/FloatingDock";

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const dockItems = [
    { 
      icon: (
        <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ), 
      label: 'Home', 
      onClick: () => scrollToSection('home') 
    },
    { 
      icon: (
        <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ), 
      label: 'About', 
      onClick: () => scrollToSection('about') 
    },
    { 
      icon: (
        <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      label: 'Projects', 
      onClick: () => scrollToSection('work') 
    },
    { 
      icon: (
        <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      label: 'Contact', 
      onClick: () => scrollToSection('contact') 
    },
    { 
      icon: 'assets/socials/github.svg', 
      label: 'GitHub', 
      onClick: () => window.open('https://github.com/DiazSk', '_blank') 
    },
  ];

  return (
    <>
      <FloatingDock 
        items={dockItems}
        magnification={70}
        distance={140}
        baseSize={48}
      />
      <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
        <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
        <div className="flex gap-2">
          <ShinyText text="Terms & Conditions" speed={4} className="text-sm" />
          <p>|</p>
          <ShinyText text="Privacy Policy" speed={4} className="text-sm" />
        </div>
        <div className="flex gap-3">
          {mySocials.map((social, index) => (
            <a href={social.href} key={index}>
              <img src={social.icon} className="w-5 h-5" alt={social.name} />
            </a>
          ))}
        </div>
        <ShinyText text="© 2025 Zaid. All rights reserved." speed={5} className="text-sm" />
      </section>
    </>
  );
};

export default Footer;
