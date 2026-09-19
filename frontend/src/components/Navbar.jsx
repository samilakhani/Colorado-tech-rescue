import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks, business } from "../data/siteConfig.js";
import logo from "../assets/logo-emblem.png";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu automatically if the viewport is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="Colorado Tech Rescue" />
          <span className="navbar__brand-text">
            Colorado <strong>Tech Rescue</strong>
          </span>
        </Link>

        <nav className={`navbar__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "navbar__link" + (isActive ? " is-active" : "")}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary navbar__cta" onClick={() => setOpen(false)}>
            Contact Us
          </Link>
          <a href={business.phoneHref} className="navbar__phone-mobile">
            Call {business.phone}
          </a>
        </nav>

        <div className="navbar__actions">
          <a href={business.phoneHref} className="navbar__phone">
            {business.phone}
          </a>
          <Link to="/contact" className="btn btn-primary navbar__cta-desktop">
            Contact Us
          </Link>
          <button
            className={`navbar__toggle ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
