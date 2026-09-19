import React from "react";

// A literal echo of the brand mark's mountain skyline, used to seam
// dark and light sections together instead of a generic wave/blob divider.
// `flip` mirrors it vertically so it can sit at the top or bottom of a section.
export default function MountainRidge({ fill = "#0b0e0c", flip = false }) {
  return (
    <svg
      className="ridge-divider"
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M0,60 L0,34 L90,10 L150,30 L230,4 L300,26 L360,16 L420,32 L500,2 L560,22 L640,8 L700,28 L780,14 L860,34 L940,6 L1020,24 L1090,12 L1200,30 L1200,60 Z"
        fill={fill}
      />
    </svg>
  );
}
