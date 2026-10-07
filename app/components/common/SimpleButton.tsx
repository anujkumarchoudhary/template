"use client";

import React, { useState } from "react";
import AppIcon from "../AppIcon";
export interface CommonButtonProps {
  isBorder?: boolean;
  borderColor?: string;
  isBackgroundColor?: boolean;
  backgroundColor?: string;
  isHover?: boolean;
  hoverBackgroundColor?: string;
  name: string;
  handleClick?: () => void;
  className?: string;
}

const SimpleButton = ({
  isBorder,
  borderColor,
  isBackgroundColor,
  backgroundColor,
  isHover,
  hoverBackgroundColor,
  name,
  handleClick,
  className,
}: CommonButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${className} w-fit inline-flex rounded-full ${
        isBorder ? "p-px" : ""
      }`}
      style={{
        background:
          isBorder && !(isHover && isHovered) ? "#000000" : "transparent",
      }}
    >
      <button
        aria-label={name}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative px-8 py-2.5 overflow-hidden rounded-full flex items-center justify-center gap-3 cursor-pointer transition-all duration-500 ease-out`}
        style={{
          background:
            isHover && isHovered
              ? hoverBackgroundColor ||
                "linear-gradient(90deg, #00FFC5 0%, #2830F3 100%)"
              : isBackgroundColor
                ? backgroundColor || "#FFFFFF"
                : "#FFFFFF",
          color: isBackgroundColor ? "#FFFFFF" : "#000000",
        }}
      >
        <p className="font-semibold transition-colors duration-500 ease-out group-hover:text-white">
          {name}
        </p>

        {/* Arrow Animation */}
        <span className="relative w-3.5 h-3.5 overflow-hidden">
          {/* First Arrow */}
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2
      transition-all duration-500 ease-out
      group-hover:translate-x-5.5 group-hover:text-white"
          >
            <AppIcon
              name="ArrowFillRight"
              size={11}
              className="transition-colors duration-500 ease-out"
            />
          </span>

          {/* Second Arrow */}
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2
      -translate-x-5.5
      transition-all duration-500 ease-out
      group-hover:translate-x-0 group-hover:text-white"
          >
            <AppIcon
              name="ArrowFillRight"
              size={11}
              className="transition-colors duration-500 ease-out"
            />
          </span>
        </span>
      </button>
    </div>
  );
};

export default SimpleButton;
