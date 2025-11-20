import { useState } from "react";
import { mySocials } from "../constants";
import ShinyText from "../components/ShinyText";

const Footer = () => {
  return (
    <>
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
