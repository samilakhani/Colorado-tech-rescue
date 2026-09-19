import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { business, serviceCategories } from "../data/siteConfig.js";
import ServiceCard from "../components/ServiceCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import RatingStars from "../components/RatingStars.jsx";
import ContactBand from "../components/ContactBand.jsx";
import MountainRidge from "../components/MountainRidge.jsx";
import heroArt from "../assets/logo-hero.png";
import "./Home.css";
import FAQ from "../components/FAQ.jsx";
import { galleryItems } from "../data/galleryItems.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Home() {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/content/reviews`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setReviews(data))
      .catch(() => setReviews(null));
  }, []);

  return (
    <>
      {/* HERO ------------------------------------------------------- */}
      <section className="home-hero section--dark">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <span className="eyebrow">Monument · Palmer Lake · Colorado Springs</span>
            <h1>Local computer, laptop &amp; electronics repair you can trust</h1>
            <p>
              Computer repair, laptop repair, phone &amp; tablet repair, hardware upgrades, data
              recovery, custom PCs, refurbishment, and in-home tech support — all from a technician
              based right here in the Tri-Lakes area.
            </p>
            <div className="home-hero__actions">
              <Link to="/contact" className="btn btn-primary">
                Request an Appointment
              </Link>
              <a href={business.phoneHref} className="btn btn-outline">
                Call or Text {business.phone}
              </a>
            </div>
            <div className="home-hero__trust">
              <RatingStars rating={5} />
              <span>Rated by real local customers</span>
            </div>
          </div>
          <div className="home-hero__art">
            <img src={heroArt} alt="Colorado Tech Rescue mountain and circuit emblem" />
          </div>
        </div>
        <MountainRidge fill="#f4f6f1" />
      </section>

      {/* INTRO STRIP -------------------------------------------------- */}
      <section className="section intro-strip">
        <div className="container intro-strip__grid">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>A repair shop that explains what's actually wrong — in plain English</h2>
            <p>
              Colorado Tech Rescue is a locally owned repair shop serving Monument, Palmer Lake, and
              the surrounding Tri-Lakes communities. We diagnose the real problem first, walk you
              through your options, and only recommend the repair that actually makes sense for your
              device and your budget.
            </p>
          </div>
          <ul className="intro-strip__facts">
            <li>
              <strong>In-shop &amp; in-home</strong>
              <span>Drop it off, or we come to you</span>
            </li>
            <li>
              <strong>Straightforward pricing</strong>
              <span>No surprise fees on diagnostics</span>
            </li>
            <li>
              <strong>Locally owned</strong>
              <span>Based right here in the Tri-Lakes area</span>
            </li>
          </ul>
        </div>
        <MountainRidge fill="#0b0e0c" />
      </section>

      {/* SERVICES OVERVIEW --------------------------------------------- */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we fix</span>
            <h2>Services built around how people actually use their tech</h2>
            <p>
              From a cracked laptop screen to a full custom build, here's what we handle most
              often. Browse the full list on the Services page.
            </p>
          </div>
          <div className="grid grid-3">
            {serviceCategories.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div>
          <div className="home-services__more">
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
        <MountainRidge fill="#f4f6f1" />
      </section>

      {/* SERVICE AREA ---------------------------------------------------- */}
      <section className="section service-area">
        <div className="container service-area__grid">
          <div>
            <span className="eyebrow">Where we work</span>
            <h2>Proudly serving the Tri-Lakes area</h2>
            <p>
              We regularly work with customers throughout {business.serviceArea}. Not sure if
              you're in range? Reach out and ask — for many repairs, a home visit isn't required
              at all.
            </p>
            <Link to="/contact" className="service-area__link">
              Check availability for your area →
            </Link>
          </div>
          <ul className="service-area__list">
            <li>Monument, CO</li>
            <li>Palmer Lake, CO</li>
            <li>North Colorado Springs</li>
            <li>Tri-Lakes area</li>
            <li>Surrounding communities</li>
          </ul>
        </div>
        <MountainRidge fill="#0b0e0c" />
      </section>
            {/* GALLERY PREVIEW ---------------------------------------------- */}
      <section className="section home-gallery-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">See the work</span>
            <h2>Recent repairs, before &amp; after</h2>
            <p>A few examples of devices we've brought back to life.</p>
          </div>
          <div className="grid grid-3">
            {galleryItems.slice(0, 3).map((item) => (
              <Link to="/gallery" key={item.id} className="home-gallery-preview__item panel">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="home-services__more">
            <Link to="/gallery" className="btn btn-outline">
              See More Recent Work
            </Link>
          </div>
        </div>
      </section>

      <FAQ />

      {/* REVIEWS PREVIEW --------------------------------------------------- */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Trusted locally</span>
            <h2>What customers are saying</h2>
            {reviews && (
              <p>
                Rated {reviews.googleRating} out of 5 from {reviews.googleReviewCount}+ Google
                reviews.
              </p>
            )}
          </div>
          <div className="grid grid-3">
            {(reviews?.testimonials || []).slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
          <div className="home-services__more">
            <Link to="/reviews" className="btn btn-outline">
              Read More Reviews
            </Link>
          </div>
        </div>
        <MountainRidge fill="#74b53a" />
      </section>

      <ContactBand />
    </>
  );
}
