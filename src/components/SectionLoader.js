import React from "react";

function SectionLoader({ label = "Loading", className = "" }) {
  return (
    <div
      className={`section-preloader ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label}
    />
  );
}

export default SectionLoader;
