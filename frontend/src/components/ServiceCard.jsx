import React from "react";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

// Displays one service category. `compact` is used on the Home page
// summary grid; the full version (with item list) is used on Services.
export default function ServiceCard({ service, compact = false }) {
  return (
    <article id={compact ? undefined : service.id} className="panel panel--hover service-card">
      <h3>{service.title}</h3>
      <p>{service.summary}</p>

      {!compact && (
        <ul className="service-card__list">
          {service.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {!compact && service.note && <p className="service-card__note">{service.note}</p>}

      <Link to="/contact" className="service-card__link">
        Request this service
      </Link>
    </article>
  );
}
