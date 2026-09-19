import React from "react";
import PageHero from "../components/PageHero.jsx";
import ContactBand from "../components/ContactBand.jsx";
import { business } from "../data/siteConfig.js";
import "./About.css";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A repair shop built around the Tri-Lakes community"
        description="Colorado Tech Rescue started with a simple idea: repair technology shouldn't feel confusing, overpriced, or rushed."
      />

      <section className="section">
        <div className="container about-grid">
          <div>
            <h2>Straightforward repairs, honest advice</h2>
            <p>
              We diagnose your device first and explain what's actually wrong before recommending
              any repair. If refurbishing your current computer makes more sense than replacing it,
              we'll tell you that too.
            </p>
            <p>
              Whether it's a laptop that won't turn on, a slow desktop full of old files, a custom
              gaming PC build, or a Wi-Fi problem that's been driving your whole house crazy, we
              treat every job — big or small — with the same attention.
            </p>
          </div>

          <ul className="about-values">
            <li>
              <h3>Local &amp; accessible</h3>
              <p>Based in the Tri-Lakes area, with in-shop and in-home options.</p>
            </li>
            <li>
              <h3>Clear communication</h3>
              <p>You'll know what's wrong, what it costs, and what your options are.</p>
            </li>
            <li>
              <h3>Repair-first mindset</h3>
              <p>We look for the most cost-effective fix before suggesting a replacement.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container about-area">
          <div className="section-head">
            <span className="eyebrow">Service Area</span>
            <h2>Where we work</h2>
            <p>Proudly serving {business.serviceArea}.</p>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
