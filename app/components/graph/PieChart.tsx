"use client";

import { useState } from "react";

/* ================= TYPES ================= */
type PieItem = {
  name: string;
  value: number;
  color: string;
};

/* ================= DATA ================= */
const data: PieItem[] = [
  { name: "SEO", value: 35, color: "#4ade80" },
  { name: "PPC", value: 25, color: "#60a5fa" },
  { name: "SMM", value: 20, color: "#fbbf24" },
  { name: "Content", value: 15, color: "#f87171" },
  { name: "Others", value: 5, color: "#a78bfa" },
];

/* ================= UTILS ================= */
const getCoordinates = (
  cx: number,
  cy: number,
  radius: number,
  angle: number,
) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

/* ================= COLOR HELPER ================= */
const lighten = (color: string, amount = 0.4) => {
  const c = color.replace("#", "");
  const num = parseInt(c, 16);

  let r = (num >> 16) + 255 * amount;
  let g = ((num >> 8) & 0x00ff) + 255 * amount;
  let b = (num & 0x0000ff) + 255 * amount;

  r = Math.min(255, Math.floor(r));
  g = Math.min(255, Math.floor(g));
  b = Math.min(255, Math.floor(b));

  return `rgb(${r}, ${g}, ${b})`;
};

/* ================= COMPONENT ================= */
const PieChart = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const cx = 250;
  const cy = 200;
  const radius = 120;

  let startAngle = 0;

  return (
    <div className="w-full rounded-xl p-4">
      <svg viewBox="0 0 500 340" width="100%" height="100%">
        {/* ===== GRADIENT DEFINITIONS ===== */}
        <defs>
          {data.map((item, i) => (
            <linearGradient
              key={i}
              id={`grad-${i}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor={lighten(item.color, 0.4)} />
              <stop offset="100%" stopColor={item.color} />
            </linearGradient>
          ))}
        </defs>

        <text x="20" y="10" fontSize="20" fontWeight="700">
          Traffic Distribution
        </text>

        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 360;
          const endAngle = startAngle + sliceAngle;

          const start = getCoordinates(cx, cy, radius, startAngle);
          const end = getCoordinates(cx, cy, radius, endAngle);

          const largeArcFlag = sliceAngle > 180 ? 1 : 0;

          const pathData = `
            M ${cx} ${cy}
            L ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
            Z
          `;

          const midAngle = startAngle + sliceAngle / 2;
          const labelPos = getCoordinates(cx, cy, radius + 25, midAngle);

          const percent = Math.round((item.value / total) * 100);

          const isActive = hovered === index;

          startAngle = endAngle;

          return (
            <g
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* SLICE */}
              <path
                d={pathData}
                fill={`url(#grad-${index})`} // ✅ GRADIENT HERE
                opacity={isActive ? 1 : 0.9}
                transform={
                  isActive
                    ? `translate(${Math.cos((midAngle * Math.PI) / 180) * 8},
                                 ${Math.sin((midAngle * Math.PI) / 180) * 8})`
                    : ""
                }
                style={{ transition: "all 0.25s ease" }}
              />

              {/* LABEL */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                fontSize="15"
                fontWeight={600}
                fill="#374151"
              >
                {item.name}
              </text>

              {/* TOOLTIP */}
              {isActive && (
                <foreignObject x={cx - 70} y={cy - 30} width="140" height="70">
                  <div className="bg-black text-white text-xs rounded-md p-2 text-center shadow-xl">
                    <div>{item.name}</div>
                    <div className="font-semibold">
                      {item.value} ({percent}%)
                    </div>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PieChart;




// "use client";

// import React, { useState } from "react";

// /* ================= TYPES ================= */
// type PieItem = {
//   name: string;
//   value: number;
//   color: string;
// };

// /* ================= DATA ================= */
// const data: PieItem[] = [
//   { name: "SEO", value: 35, color: "#4ade80" },
//   { name: "PPC", value: 25, color: "#60a5fa" },
//   { name: "SMM", value: 20, color: "#fbbf24" },
//   { name: "Content", value: 15, color: "#f87171" },
//   { name: "Others", value: 5, color: "#a78bfa" },
// ];

// /* ================= UTILS ================= */
// const getCoordinates = (
//   cx: number,
//   cy: number,
//   radius: number,
//   angle: number,
// ) => {
//   const rad = (angle * Math.PI) / 180;
//   return {
//     x: cx + radius * Math.cos(rad),
//     y: cy + radius * Math.sin(rad),
//   };
// };

// /* ================= COMPONENT ================= */
// const PieChart = () => {
//   const [hovered, setHovered] = useState<number | null>(null);

//   const total = data.reduce((sum, item) => sum + item.value, 0);

//   const cx = 250;
//   const cy = 200;
//   const radius = 120;

//   let startAngle = 0;

//   return (
//     <div className="w-full bg-white rounded-xl p-4">
//       <svg viewBox="0 0 500 400" width="100%" height="100%">
//         <text x="20" y="30" fontSize="20" fontWeight="700">
//           Traffic Distribution
//         </text>

//         {data.map((item, index) => {
//           const sliceAngle = (item.value / total) * 360;
//           const endAngle = startAngle + sliceAngle;

//           const start = getCoordinates(cx, cy, radius, startAngle);
//           const end = getCoordinates(cx, cy, radius, endAngle);

//           const largeArcFlag = sliceAngle > 180 ? 1 : 0;

//           const pathData = `
//             M ${cx} ${cy}
//             L ${start.x} ${start.y}
//             A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
//             Z
//           `;

//           const midAngle = startAngle + sliceAngle / 2;
//           const labelPos = getCoordinates(cx, cy, radius + 25, midAngle);

//           const percent = Math.round((item.value / total) * 100);

//           const isActive = hovered === index;

//           startAngle = endAngle;

//           return (
//             <g
//               key={index}
//               onMouseEnter={() => setHovered(index)}
//               onMouseLeave={() => setHovered(null)}
//               style={{ cursor: "pointer" }}
//             >
//               {/* SLICE */}
//               <path
//                 d={pathData}
//                 fill={item.color}
//                 opacity={isActive ? 1 : 0.85}
//                 transform={
//                   isActive
//                     ? `translate(${Math.cos((midAngle * Math.PI) / 180) * 8},
//                                  ${Math.sin((midAngle * Math.PI) / 180) * 8})`
//                     : ""
//                 }
//                 style={{ transition: "all 0.2s ease" }}
//               />

//               {/* LABEL */}
//               <text
//                 x={labelPos.x}
//                 y={labelPos.y}
//                 textAnchor="middle"
//                 fontSize="12"
//                 fill="#374151"
//               >
//                 {item.name}
//               </text>

//               {/* TOOLTIP */}
//               {isActive && (
//                 <foreignObject x={cx - 70} y={cy - 30} width="140" height="70">
//                   <div className="bg-black text-white text-xs rounded-md p-2 text-center shadow-xl">
//                     <div>{item.name}</div>
//                     <div className="font-semibold">
//                       {item.value} ({percent}%)
//                     </div>
//                   </div>
//                 </foreignObject>
//               )}
//             </g>
//           );
//         })}
//       </svg>
//     </div>
//   );
// };

// export default PieChart;