"use client";

import { useState } from "react";
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
  loading?: boolean
  textColor?: string;
  hoverTextColor?: string
  isFaq?: boolean;
  isExpanded?: boolean;
  isSpinAnimation?: boolean;
}

const CommonButton = ({
  isBorder,
  borderColor,
  isBackgroundColor,
  backgroundColor,
  isHover,
  hoverBackgroundColor,
  name,
  handleClick,
  className,
  loading,
  textColor,
  hoverTextColor,
  isFaq,
  isExpanded,
  isSpinAnimation
}: CommonButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${className} inline-flex rounded-full ${isBorder && `${borderColor ? "p-px" : "p-0.5"}`}`}
      style={{
        background: borderColor || "linear-gradient(90deg, #00FFC5, #2830F3)",
      }}
    >
      <button
        aria-label={name}
        disabled={loading}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group w-full relative px-8 py-2.5 overflow-hidden rounded-full flex items-center justify-center gap-3 ${loading ? "cursor-not-allowed" : "cursor-pointer"
          } transition-all duration-500 ease-out disabled:pointer-events-none`}
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
        {/* <p className={`${textColor} font-semibold transition-colors duration-500 ease-out ${hoverTextColor ?? "group-hover:text-white"} `}>
          {name}
        </p> */}

        {/* SPINNING Animation */}
        {isSpinAnimation && (
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[115%] h-[78%] animate-button-spin"
            style={{
              background: `radial-gradient(ellipse 50% 50% at 50% 50%,#00DFFF 0%,#35E4FA 20%,rgba(85, 231, 250, 0.85) 38%,rgba(150, 238, 248, 0.55) 58%,rgba(220, 244, 247, 0.25) 78%,transparent 100%)`,
              clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
            }}
          />
        )}

        <p
          className="z-10 font-semibold transition-colors duration-500 ease-out text-(--text-color) group-hover:text-(--hover-text-color)"
          style={
            {
              "--text-color": textColor,
              "--hover-text-color": hoverTextColor ?? "#FFFFFF",
            } as React.CSSProperties
          }
        >
          {name}
        </p>

        {/* Arrow Animation */}
        {isFaq ? <AppIcon size={22} name={isExpanded ? "MdKeyboardArrowUp" : "MdKeyboardArrowDown"} className={"group-hover:text-white z-10 transition-all duration-500 ease-out"} /> : <span className="relative w-3.5 h-3.5 overflow-hidden">

          {/* First Arrow */}
          {/* <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-500 ease-out group-hover:translate-x-5.5
              ${hoverTextColor ?? "group-hover:text-white"}
            `}
          > */}

          <span
            className="absolute z-10 left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out text-(--text-color) group-hover:translate-x-5.5 group-hover:text-(--hover-text-color)"
            style={
              {
                "--text-color": textColor,
                "--hover-text-color": hoverTextColor ?? "#FFFFFF",
              } as React.CSSProperties
            }
          >
            <AppIcon
              name={"ArrowFillRight"}
              size={11}
              className="transition-colors duration-500 ease-out"
            />
          </span>

          {/* Second Arrow */}
          {/* <span
            className={`absolute left-0 top-1/2 transition-transform duration-500 ease-out
              ${"-translate-y-1/2 -translate-x-5.5 group-hover:translate-x-0"}
              ${hoverTextColor ?? "group-hover:text-white"}
            `}
          > */}

          <span
            className="absolute z-10 left-0 top-1/2 -translate-y-1/2 -translate-x-5.5 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:text-(--hover-text-color)"
            style={
              {
                "--hover-text-color": hoverTextColor ?? "#FFFFFF",
              } as React.CSSProperties
            }
          >
            <AppIcon
              name={"ArrowFillRight"}
              size={11}
              className="transition-colors duration-500 ease-out"
            />
          </span>
        </span>}
      </button>
    </div>
  );
};

export default CommonButton;