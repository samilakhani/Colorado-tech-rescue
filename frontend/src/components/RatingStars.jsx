import React from "react";

export default function RatingStars({ rating = 5, size = 16 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span className="rating-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars.map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={n <= rating ? "var(--ctr-flag-gold)" : "none"}
          stroke="var(--ctr-flag-gold)"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <polygon points="12 2 15 9 22 9.5 16.5 14.5 18 22 12 18 6 22 7.5 14.5 2 9.5 9 9 12 2" />
        </svg>
      ))}
    </span>
  );
}
