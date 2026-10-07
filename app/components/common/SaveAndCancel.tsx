"use client";
import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
export interface ISaveAndCancel {
  name: string;
  className?: string;
  is2ndButton?: boolean;
  isIcon?: boolean;
  isPlus?: boolean;
  isBgWhite?: boolean;
  is2BgWhite?: boolean;
  is2Icon?: boolean;
  button2Name?: string;
  isFullWidth?: boolean;
  buttonWidth?: string;
  handleClick?: () => void;
  handleClick2?: () => void;
  isBorder?: boolean;
  isHoverBgBlue?: boolean;
  isBold?: boolean;
}
const SaveAndCancel = ({
  name,
  className,
  is2ndButton,
  isIcon,
  isPlus,
  isBgWhite,
  is2BgWhite,
  is2Icon,
  button2Name,
  isFullWidth,
  buttonWidth = "",
  handleClick,
  handleClick2,
  isBorder,
  isHoverBgBlue,
  isBold,
}: ISaveAndCancel) => {
  const [isHover, setIsHover] = useState(false);
  const widthClass = isFullWidth ? "w-full" : buttonWidth;

  return (
    <div className={`${className} flex gap-2 lg:gap-4`}>
      <button
        aria-label={name}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleClick}
        className={`px-[2rem] ${isBold && "font-semibold"} ${isBorder ? "border-[1px] border-black" : "border-[1px] border-transparent"} ${isHover && "border-[1px] border-transparent"} flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[60px] py-[0.75rem] font-montserrat text-[15px] lg:text-[18px] font-medium transition-all duration-300 ease-out active:scale-95  ${
          isBgWhite
            ? isHover
              ? isHoverBgBlue
                ? "border border-primary bg-primary text-white"
                : "border border-primary bg-primary text-white"
              : "border border-[#FFFFFF] bg-white text-[#111111]"
            : isHover
              ? "bg-primary text-white"
              : "bg-primary text-white"
        } `}
      >
        {isPlus && <BsPlus size={25} className={``} />}
        {name}
        {isIcon && (
          <IoIosArrowRoundForward
            size={25}
            className={`${isHover ? "rotate-[360deg] transition-all duration-300 ease-out active:scale-95" : "rotate-[310deg]"}`}
          />
        )}
      </button>
      {is2ndButton && (
        <button
          aria-label={button2Name}
          onClick={handleClick2}
          className={`${widthClass} group flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[60px] py-[0.75rem] font-montserrat  text-[14px] lg:text-[18px] font-medium transition-all duration-300 ease-out active:scale-95 ${buttonWidth} ${
            is2BgWhite
              ? "outline bg-white text-[#111111] hover:bg-[#1A5A96s] hover:text-whitse hover:outline-noasne"
              : "bg-primary text-white hover:bg-[#1A5A96]"
          } `}
        >
          {button2Name}

          {is2Icon && (
            <IoIosArrowRoundForward
              size={25}
              className="rotate-[310deg] transition-transform duration-300 group-hover:rotate-[360deg]"
            />
          )}
        </button>
      )}
    </div>
  );
};

export default SaveAndCancel;
