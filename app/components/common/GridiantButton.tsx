import React from "react";
import AppImage from "../AppImage";
import Link from "next/link";

const GridiantButton = ({ href }: any) => {
  return (
    <>
      <style jsx>{`
        @keyframes border-spin {
          100% {
            transform: rotate(360deg);
          }
        }

        .border-spin {
          animation: border-spin 4s linear infinite;
        }
      `}</style>

      <Link
        aria-label="Let's Connect"
        href={href}
        className="relative hidden sm:flex items-center justify-center rounded-full overflow-hidden p-[1px] cursor-pointer"
      >
        {/* Animated Border */}
        <span className="absolute inset-0 rounded-full border-spin bg-[conic-gradient(#4F23E7,#0069FF,#00FFC5,#4F23E7)] scale-[1.001]" />

        {/* Inner Content */}
        <span className="relative z-10 flex items-center gap-4 rounded-full px-6 py-3 bg-black scale-[0.992]">
          <AppImage
            name={"helloWhite"}
            alt="button hand"
            width={21}
            height={22}
            className="aspect-[21/22] w-[clamp(11px,2vw,22px)] h-auto animate-wave"
          />

          <p className="uppercase font-[15px] font-medium text-white">
            Let’s Connect
          </p>
        </span>
      </Link>
    </>
  );
};

export default GridiantButton;
