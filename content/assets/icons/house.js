import React from "react";

const House = ({
  style = {},
  fill = "#000",
  width = "36",
  className = "",
  ariaHidden = true,
  viewBox = "0 0 144 142",
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    aria-hidden={ariaHidden}
    fill={fill}
    className={`svg-icon ${className || ""}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="124" y="81" width="20" height="20" fill="black" />
    <rect x="124" y="102" width="20" height="20" fill="black" />
    <rect x="41" y="20" width="20" height="20" fill="black" />
    <rect x="83" y="20" width="20" height="20" fill="black" />
    <rect x="62" y="122" width="20" height="20" fill="black" />
    <rect x="124" y="60" width="20" height="20" fill="black" />
    <rect y="81" width="20" height="20" fill="black" />
    <rect y="102" width="20" height="20" fill="black" />
    <rect x="62" width="20" height="20" fill="black" />
    <rect x="41" y="122" width="20" height="20" fill="black" />
    <rect x="104" y="122" width="20" height="20" fill="black" />
    <rect x="104" y="40" width="20" height="20" fill="black" />
    <rect x="83" y="122" width="20" height="20" fill="black" />
    <rect x="20" y="40" width="20" height="20" fill="black" />
    <rect x="20" y="122" width="20" height="20" fill="black" />
    <rect y="60" width="20" height="20" fill="black" />
  </svg>
);

export default House;
