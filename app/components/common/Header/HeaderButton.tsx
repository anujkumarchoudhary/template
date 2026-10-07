"use client";

import { useState } from "react";

import GetQuoteModal from "../../popup/GetEnquiryModal";

import Image from "next/image";
import buttonHand from "../../../../public/assets/header/buttonHand.png";
import buttonHandDark from "../../../../public/assets/header/buttonHandDark.svg";
import { useSelector } from "react-redux";

const HeaderButton = () => {
  const [open, setOpen] = useState(false);
  const isDark = useSelector((state: any) => state.ui.isDark);

  const ButtonContent = (
    <div>
      <button
        aria-label="Request a Quote"
        onClick={() => setOpen(true)}
        className={`hidden sm:flex items-center gap-4 rounded-full cursor-pointer px-6 py-3 active:scale-95 border border-white/20 from-white/10 to-white/0 backdrop-blur-md duration-300 ${isDark ? "bg-transparent" : "bg-white"}`}
      >
        <Image
          src={isDark ? buttonHand : buttonHandDark}
          alt="button hand"
          width={21}
          height={22}
          className="aspect-[21/22] w-[clamp(11px,2vw,22px)] h-auto"
        />

        <p className={`uppercase font-[15px] font-medium ${isDark ? "text-white" : " bg-gradient-to-r from-[#00FFC5] to-[#2830F3] bg-clip-text text-transparent"}`}>
          Request a Quote
        </p>
      </button>

      <GetQuoteModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
  return (
    <div>
      {isDark ? (
        ButtonContent
      ) : (
        <div className="p-[1px] rounded-full bg-gradient-to-r from-[#00FFC5] to-[#2830F3] inline-block">
          {ButtonContent}
        </div>
      )}

      <GetQuoteModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default HeaderButton;
