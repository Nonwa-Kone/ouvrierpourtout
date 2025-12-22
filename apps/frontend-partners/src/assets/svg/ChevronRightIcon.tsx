import React from "react";

interface iChevronLeftIcon {
  width?: number | string;
  height?: number | string;
}

export const ChevronLeftIcon: React.FC<iChevronLeftIcon> = ({
  width = 16,
  height = 16,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4.5L6 8.5L10 12.5"
        stroke="#8896AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
