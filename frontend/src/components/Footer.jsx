import React from "react";
import { Link } from "react-router-dom";
import { business, navLinks, serviceCategories } from "../data/siteConfig.js";
import logo from "../assets/logo-emblem.png";
import MountainRidge from "./MountainRidge.jsx";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <MountainRidge fill="#0b0e0c" />
      <div className="footer__body">
        <div className="container footer__grid">
          <div className="footer__col footer__brand">
            <img src={logo} alt="Colorado Tech Rescue" />
            <p>
              Local computer, laptop, and electronics repair serving {business.serviceArea}.
            </p>
            <a href={business.phoneHref} className="footer__phone">
              {business.phone}
            </a>
          </div>

          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {serviceCategories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/services#${cat.id}`}>{cat.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Hours</h4>
            <ul className="footer__hours">
              {business.hours.map((h) => (
                <li key={h.days}>
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
            <a href={`mailto:${business.email}`} className="footer__email">
              {business.email}
            </a>
          </div>
        </div>

        <div className="container footer__bottom">
          <span>© {year} Colorado Tech Rescue. All rights reserved.</span>
          <span>Proudly serving the Tri-Lakes area, Colorado.</span>
        </div>
      </div>
    </footer>
  );
}
