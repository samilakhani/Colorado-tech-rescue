import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faqItems } from "../data/faqItems.js";
import MountainRidge from "./MountainRidge.jsx";
import "./FAQ.css";

// Accessible accordion — one question open at a time. Content lives in
// src/data/faqItems.js so questions can be edited without touching this file.
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section id="faq" className="section section--dark faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Common questions</span>
          <h2>Frequently asked questions</h2>
          <p>
            Don't see your question here?{" "}
            <Link to="/contact" className="faq__contact-link">
              Ask us directly
            </Link>
            .
          </p>
        </div>

        <div className="faq__list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={item.question}>
                <h3 className="faq__question">
                  <button
                    id={buttonId}
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq__panel"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MountainRidge fill="#74b53a" />
    </section>
  );
}