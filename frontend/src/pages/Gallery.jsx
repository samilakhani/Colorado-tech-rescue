import React, { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import GalleryCard from "../components/GalleryCard.jsx";
import ContactBand from "../components/ContactBand.jsx";
import { galleryItems } from "../data/galleryItems.js";
import "./Gallery.css";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(galleryItems.map((i) => i.category)));
    return ["All", ...unique];
  }, []);

  const visibleItems =
    activeCategory === "All" ? galleryItems : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <>
      <PageHero
        eyebrow="Recent Work"
        title="A look at repairs we've completed"
        description="A sample of recent laptop, tablet, and custom PC work. Ask us for more examples related to your specific device."
      />

      <section className="section">
        <div className="container">
          <div className="gallery-filters" role="tablist" aria-label="Filter gallery by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`gallery-filters__btn ${activeCategory === cat ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-3">
            {visibleItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        title="Have a similar repair?"
        description="Send us a few details and, if it's helpful, a photo of the issue."
      />
    </>
  );
}