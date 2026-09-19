import React from "react";
import "./GalleryCard.css";

export default function GalleryCard({ item }) {
  return (
    <article className="panel gallery-card">
      <div className="gallery-card__thumb">
        <img src={item.image} alt={item.title} loading="lazy" />
        {item.beforeAfter && <span className="tag gallery-card__tag">Before / After</span>}
      </div>
      <span className="gallery-card__category">{item.category}</span>
      <h3>{item.title}</h3>
      {item.description && <p className="gallery-card__desc">{item.description}</p>}
    </article>
  );
}
