import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top of the page on every route change so navigating
// between pages doesn't leave the visitor stranded halfway down.
// If the URL includes a hash (e.g. "/#faq"), it scrolls to that section
// instead, waiting a moment for the page's content to render first.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      // Small delay so the target page has mounted before we try to find the element
      const timeoutId = setTimeout(scrollToTarget, 80);
      return () => clearTimeout(timeoutId);
    }

    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);

  return null;
}