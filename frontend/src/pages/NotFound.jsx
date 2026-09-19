import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="container">
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </span>
        <h1>This page took a wrong turn</h1>
        <p style={{ margin: "0 auto 24px" }}>
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
