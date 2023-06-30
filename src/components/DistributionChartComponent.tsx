import { useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const MotionPath = ({
  id,
  d,
  fill,
}: {
  id?: string;
  d: string;
  fill: string;
}) => {
  return (
    <AnimatePresence>
      <motion.path
        id={id}
        d={d}
        fill={fill}
        initial={{
          scale: 1,
        }}
        whileHover={{
          scale: [1, 1.05],
        }}
        cursor="pointer"
      ></motion.path>
    </AnimatePresence>
  );
};
const DistributionChartComponent = ({
  width,
  height,
  boxSize,
}: {
  width?: number;
  height?: number;
  boxSize?: number;
}) => {
  return (
    <svg
      width={boxSize ?? width ?? 753}
      height={boxSize ?? height ?? 753}
      viewBox="0 0 605 605"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 2">
        <g id="glassCircle" filter="url(#filter0_d_108_14)">
          <path
            d="M527 302.5C527 426.488 426.488 527 302.5 527C178.512 527 78 426.488 78 302.5C78 178.512 178.512 78 302.5 78C426.488 78 527 178.512 527 302.5ZM167.8 302.5C167.8 376.893 228.107 437.2 302.5 437.2C376.893 437.2 437.2 376.893 437.2 302.5C437.2 228.107 376.893 167.8 302.5 167.8C228.107 167.8 167.8 228.107 167.8 302.5Z"
            fill={useColorModeValue('white', 'RGBA(255, 255, 255, 0.16)')}
          />
        </g>

        <g id="referral" filter="url(#filter1_d_108_14)">
          <MotionPath
            d="M324.041 127.185C325.425 116.365 335.353 108.617 345.98 111.073C388.298 120.854 426.416 144.375 454.196 178.239C486.17 217.215 502.028 266.944 498.522 317.236C495.016 367.527 472.411 414.574 435.337 448.737C403.127 478.419 362.115 496.423 318.849 500.237C307.984 501.195 299.227 492.144 299.358 481.237V481.237C299.49 470.33 308.471 461.723 319.309 460.494C352.471 456.732 383.779 442.535 408.57 419.69C438.229 392.359 456.313 354.722 459.118 314.488C461.923 274.255 449.236 234.472 423.657 203.291C402.275 177.227 373.24 158.822 340.921 150.496C330.358 147.775 322.658 138.005 324.041 127.185V127.185Z"
            fill="#F687B3"
          />
        </g>

        <g id="levels" filter="url(#filter2_d_108_14)">
          <MotionPath
            d="M291.648 480.918C290.982 491.806 281.588 500.192 270.821 498.443C241.389 493.66 213.332 482.259 188.81 464.996C164.289 447.734 144.092 425.166 129.663 399.072C124.385 389.526 129.112 377.854 139.137 373.555V373.555C149.161 369.256 160.669 373.979 166.185 383.39C177.569 402.814 193.014 419.65 211.548 432.697C230.082 445.745 251.141 454.607 273.266 458.772C283.986 460.79 292.314 470.031 291.648 480.918V480.918Z"
            fill="#76E4F7"
          />
        </g>
        <g id="global" filter="url(#filter3_d_108_14)">
          <MotionPath
            d="M136.555 367.2C126.372 371.109 114.844 366.039 111.971 355.516C104.517 328.212 103.018 299.618 107.578 271.684C109.335 260.919 120.269 254.672 130.805 257.495V257.495C141.341 260.318 147.462 271.148 145.974 281.953C143.249 301.749 144.305 321.887 149.084 341.289C151.693 351.88 146.738 363.291 136.555 367.2V367.2Z"
            fill="#F6AD55"
          />
        </g>
        <g id="weekly" filter="url(#filter4_d_108_14)">
          <MotionPath
            d="M133.934 247.099C123.59 243.638 117.921 232.393 122.397 222.447C134.013 196.636 151.044 173.619 172.331 154.965C180.534 147.776 192.945 149.911 199.279 158.791V158.791C205.613 167.671 203.447 179.921 195.426 187.313C180.732 200.854 168.737 217.064 160.083 235.076C155.36 244.907 144.278 250.56 133.934 247.099V247.099Z"
            fill="#FC8181"
          />
        </g>
        <g id="coreTeam" filter="url(#filter5_d_108_14)">
          <MotionPath
            d="M208.306 152.759C202.525 143.509 205.303 131.226 215.084 126.398C240.464 113.871 268.247 106.944 296.537 106.09C307.44 105.76 315.659 115.302 314.898 126.183V126.183C314.137 137.064 304.674 145.139 293.783 145.74C273.831 146.842 254.265 151.721 236.131 160.115C226.232 164.696 214.086 162.009 208.306 152.759V152.759Z"
            fill="#68D391"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_108_14"
          x={-0.0000305176}
          y={0}
          width={605}
          height={605}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={39} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_108_14"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_108_14"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_108_14"
          x={254.357}
          y={85.6166}
          width={249.644}
          height={439.69}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={-20} />
          <feGaussianBlur stdDeviation={12.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.964706 0 0 0 0 0.521569 0 0 0 0 0.976471 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_108_14"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_108_14"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_108_14"
          x={96.479}
          y={334.955}
          width={214.206}
          height={176.72}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={-6} dy={-12} />
          <feGaussianBlur stdDeviation={12.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.521569 0 0 0 0 0.921569 0 0 0 0 0.976471 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_108_14"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_108_14"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_108_14"
          x={99.9986}
          y={231.817}
          width={94.7729}
          height={161.697}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={20} />
          <feGaussianBlur stdDeviation={12.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.976471 0 0 0 0 0.764706 0 0 0 0 0.521569 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_108_14"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_108_14"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_108_14"
          x={105.851}
          y={132.647}
          width={132.118}
          height={147.474}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={10} dy={7} />
          <feGaussianBlur stdDeviation={12.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.976471 0 0 0 0 0.54902 0 0 0 0 0.521569 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_108_14"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_108_14"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_d_108_14"
          x={188.315}
          y={97.0813}
          width={159.632}
          height={106.222}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={8} dy={16} />
          <feGaussianBlur stdDeviation={12.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.521569 0 0 0 0 0.976471 0 0 0 0 0.537255 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_108_14"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_108_14"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default DistributionChartComponent;
