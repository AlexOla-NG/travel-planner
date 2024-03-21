/* eslint-disable max-len */
import React from "react";

/**
 * SVG for the loader button
 * @param {*} props passed Props
 * @return {React.Component} React component
 */
const SVG = (props) => (
  <svg height="25px" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100" width="25px" {...props}>
    <switch>
      <circle cx="50" cy="50" fill="none" r="35" stroke="#fff" strokeDasharray="164.93361431346415 56.97787143782138" strokeWidth="10" transform="rotate(108 50 50)">
        <animateTransform attributeName="transform" begin="0s" calcMode="linear" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0 50 50;360 50 50" />
      </circle>
      <foreignObject>
        <p className="no-svg-fallback">Loading...</p>
      </foreignObject>
    </switch>
  </svg>
);

export default SVG;
/* eslint-enable max-len */
