import * as React from 'react';
import { motion } from 'framer-motion';

const MotionPath = ({
  id,
  d,
  fill,
}: {
  id: string;
  d: string;
  fill: string;
}) => {
  return (
    <motion.path
      id={id}
      d={d}
      fill={fill}
      whileHover={{
        scale: 1.05,
      }}
      cursor="pointer"
    ></motion.path>
  );
};
const TokenDistributionComponent = ({
  width,
  height,
  boxSize,
}: {
  width?: number;
  height?: number;
  boxSize?: number;
}) => (
  <svg
    width={boxSize ?? width ?? 753}
    height={boxSize ?? height ?? 753}
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="TokenDistributionChart" clipPath="url(#clip0_1_3)">
      <MotionPath
        id="referrer-50%"
        d="M415.923 24C512.838 28.2314 604.381 69.7075 671.464 139.781C738.548 209.855 775.996 303.117 776 400.125C776.004 497.133 738.565 590.399 671.487 660.478C604.409 730.558 512.871 772.042 415.956 776.282L409.373 625.826C467.522 623.282 522.446 598.391 562.692 556.344C602.939 514.296 625.403 458.337 625.4 400.132C625.397 341.927 602.929 285.969 562.679 243.925C522.428 201.881 467.503 176.996 409.354 174.457L415.923 24Z"
        fill="url(#paint0_linear_1_3)"
      ></MotionPath>

      <MotionPath
        id="level-20%"
        d="M383.11 776.285C309.277 773.068 238.024 748.192 178.231 704.76C118.438 661.327 72.7488 601.257 46.859 532.038L187.915 479.279C203.449 520.811 230.863 556.853 266.738 582.912C302.614 608.972 345.366 623.897 389.666 625.827L383.11 776.285Z"
        fill="#63B3ED"
      ></MotionPath>

      <MotionPath
        id="global-pool-10%"
        d="M36.7054 500.801C18.4405 434.971 18.4314 365.412 36.6791 299.577L181.807 339.803C170.859 379.304 170.864 421.039 181.823 460.537L36.7054 500.801Z"
        fill="#9F7AEA"
      ></MotionPath>

      <MotionPath
        id="weekly-pool-10%"
        d="M46.8245 268.338C70.7407 204.344 111.618 148.063 165.077 105.527L258.846 223.373C226.771 248.895 202.244 282.663 187.895 321.059L46.8245 268.338Z"
        fill="#FC8181"
      ></MotionPath>

      <MotionPath
        id="ibc-5%"
        d="M191.646 86.2163C215.413 70.4799 240.891 57.4934 267.588 47.5064L320.353 188.561C304.334 194.553 289.048 202.345 274.788 211.786L191.646 86.2163Z"
        fill="#68D391"
      ></MotionPath>
      <MotionPath
        id="dev-team-5%"
        d="M298.825 37.3515C326.291 29.7294 354.534 25.2512 383.012 24.0029L389.607 174.458C372.521 175.207 355.575 177.894 339.095 182.468L298.825 37.3515Z"
        fill="#DD6B20"
      ></MotionPath>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1_3"
        x1="592.677"
        y1="24"
        x2="592.677"
        y2="776.282"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#E53E3E" />
        <stop offset="0.354167" stop-color="#D69E2E" />
        <stop offset="1" stop-color="#38A169" />
      </linearGradient>
    </defs>
  </svg>
);
export default TokenDistributionComponent;
