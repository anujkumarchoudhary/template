"use client";

import { useEffect } from "react";

export default function HeroBanner() {
  useEffect(() => {
    const path = document.getElementById("graph-line") as SVGPathElement | null;

    if (path) {
      const length = path.getTotalLength();

      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 2.5s ease-in-out";
        path.style.strokeDashoffset = "0";
      }, 300);
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] text-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            We Don’t Just Market —
            <span className="text-[#FB9100]"> We Scale Brands 🚀</span>
          </h1>

          <p className="mt-5 text-gray-400 text-lg">
            Adaired helps you increase calls, rankings, and ROI with
            performance-driven digital marketing.
          </p>

          <button aria-label={`Get Started`} className="mt-8 bg-[#FB9100] hover:bg-[#ff9f1c] transition px-7 py-3 rounded-lg font-medium">
            Get Started
          </button>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center items-center">
          {/* Glow */}
          <div className="absolute w-[300px] h-[300px] bg-[#FB9100]/20 blur-3xl rounded-full"></div>

          {/* SVG */}
          <svg viewBox="0 0 500 300" className="relative z-10 w-full max-w-md">
            {/* Graph Line */}
            <path
              id="graph-line"
              d="M10 250 L120 180 L250 150 L400 60"
              stroke="#FB9100"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Dots */}
            <circle cx="120" cy="180" r="5" fill="#FB9100" />
            <circle cx="250" cy="150" r="5" fill="#FB9100" />
            <circle cx="400" cy="60" r="5" fill="#FB9100" />
          </svg>

          {/* Floating Cards */}
          <div className="absolute left-0 top-10 bg-white text-black px-4 py-2 rounded-lg shadow-lg animate-float">
            ⭐ 4.8 Rating
          </div>

          <div className="absolute right-0 bottom-10 bg-white text-black px-4 py-2 rounded-lg shadow-lg animate-float delay-200">
            📞 +120 Calls
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
}
