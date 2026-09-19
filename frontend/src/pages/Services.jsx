import React from "react";
import PageHero from "../components/PageHero.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import ContactBand from "../components/ContactBand.jsx";
import { serviceCategories } from "../data/siteConfig.js";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Repair, upgrade, and support services"
        description="Every service below is available for both drop-off and, where practical, in-home visits. Not seeing what you need? Reach out — most tech problems fall under one of these anyway."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3 services-grid">
            {serviceCategories.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        title="Not sure which service you need?"
        description="Describe the problem on the contact page and we'll point you in the right direction."
      />
    </>
  );
}
