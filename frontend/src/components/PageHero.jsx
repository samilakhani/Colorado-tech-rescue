import React from "react";
import MountainRidge from "./MountainRidge.jsx";
import "./PageHero.css";

// Compact hero banner used at the top of every inner page (Services,
// Gallery, Reviews, About, Contact) so each page still opens with the
// brand's dark/circuit treatment before dropping into content.
export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <MountainRidge fill="#f4f6f1" />
    </section>
  );
}
