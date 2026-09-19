import React from "react";
import RatingStars from "./RatingStars.jsx";
import "./TestimonialCard.css";

export default function TestimonialCard({ testimonial }) {
  return (
    <article className="panel panel--hover testimonial-card">
      <RatingStars rating={testimonial.rating} />
      <p className="testimonial-card__text">"{testimonial.text}"</p>
      <div className="testimonial-card__meta">
        <span className="testimonial-card__name">{testimonial.name}</span>
        <span className="testimonial-card__location">{testimonial.location}</span>
      </div>
    </article>
  );
}
