import React, { useEffect, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import RatingStars from "../components/RatingStars.jsx";
import ContactBand from "../components/ContactBand.jsx";
import "./Reviews.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`${API_URL}/content/reviews`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setReviews(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What local customers say about us"
        description="Real feedback from customers in Monument, Palmer Lake, and Colorado Springs."
      />

      <section className="section">
        <div className="container">
          {reviews && (
            <div className="reviews-summary panel">
              <div>
                <span className="reviews-summary__score">{reviews.googleRating}</span>
                <RatingStars rating={Math.round(reviews.googleRating)} size={20} />
              </div>
              <p>Based on {reviews.googleReviewCount}+ Google reviews</p>
              <div className="reviews-summary__actions">
                <a href={reviews.googleBusinessUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                  View Google Profile
                </a>
                <a href={reviews.leaveReviewUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Leave Us a Review
                </a>
              </div>
            </div>
          )}

          {status === "loading" && <p>Loading reviews…</p>}
          {status === "error" && <p>We couldn't load reviews right now — please check back shortly.</p>}

          {reviews && (
            <div className="grid grid-3 reviews-grid">
              {reviews.testimonials.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactBand />
    </>
  );
}
