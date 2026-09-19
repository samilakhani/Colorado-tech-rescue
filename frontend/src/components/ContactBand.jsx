import React from "react";
import { Link } from "react-router-dom";
import { business } from "../data/siteConfig.js";
import "./ContactBand.css";

// Full-width call-to-action band. Used near the bottom of every page
// so the path to reaching the shop is never more than a scroll away.
export default function ContactBand({
  title = "Ready to get your device fixed?",
  description = "Tell us what's going on and we'll follow up to schedule a time that works for you.",
}) {
  return (
    <section className="contact-band">
      <div className="container contact-band__inner">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="contact-band__actions">
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
          <a href={business.phoneHref} className="btn btn-outline">
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
