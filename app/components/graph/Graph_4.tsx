// "use client";

// import { useEffect, useRef, useState } from "react";
// import data from "./data.json";
// // import { MonthType, GraphSummary } from "@/@core/types/graph.type";
// interface GraphProps {
//   onSummaryChange?: (summary: GraphSummary) => void;
// }

// const Graph_4 = ({ onSummaryChange }: GraphProps) => {
//   const [selectedMonth, setSelectedMonth] = useState<MonthType>();

//   const currentMonths: MonthType[] = data.googleRanking.map((item, index) => ({
//     name: item.name,
//     searchVolume: item.searchVolume,
//     x: 75 + index * 70,
//     bars: [
//       item.rankings["51Plus"],
//       item.rankings["21To50"],
//       item.rankings["11To20"],
//       item.rankings["4To10"],
//       item.rankings["1To3"],
//     ],
//   }));

//   const MAX_BAR_HEIGHT = 240;
//   // const FIXED_TOP_Y = 130;
//   const getBarTopY = (bars: number[]) => {
//     const total = bars.reduce(
//       (sum, value, i) => sum + (activeLegends[i] ? value : 0),
//       0
//     );

//     const barHeight = total * SCALE;

//     // 370 is your graph baseline
//     return 370 - barHeight;
//   };

//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const [activeLegends, setActiveLegends] = useState<boolean[]>([
//     true,
//     true,
//     true,
//     true,
//     true,
//   ]);

//   const toggleLegend = (index: number) => {
//     const newLegends = [...activeLegends];
//     newLegends[index] = !newLegends[index];
//     setActiveLegends(newLegends);
//   };

//   const legendsData = [
//     { label: "1-3", color: "#6B8E23", index: 4 },
//     { label: "4-10", color: "#A9C95F", index: 3 },
//     { label: "11-20", color: "#E8D58B", index: 2 },
//     { label: "21-50", color: "#F2B566", index: 1 },
//     { label: "51+", color: "#D76060", index: 0 },
//   ];

//   const colors = ["#D76060", "#F2B566", "#E8D58B", "#A9C95F", "#6B8E23"];

//   const isAnyLegendActive = activeLegends.some((isActive) => isActive);

//   // const yAxisMax = Math.max(3, Math.ceil(maxActiveValue / 3) * 3);
//   const yAxisMax = 60; // Fixed maximum
//   const SCALE = MAX_BAR_HEIGHT / yAxisMax;

//   const getTotal = (bars: number[]) =>
//     bars.reduce((sum, value, i) => sum + (activeLegends[i] ? value : 0), 0);

//   const targetTotalCount = selectedMonth
//     ? getTotal(selectedMonth.bars)
//     : getTotal(currentMonths[currentMonths.length - 1].bars);

//   const firstMonth = currentMonths[0];
//   const lastMonth = currentMonths[currentMonths.length - 1];

//   const overallSummary: GraphSummary = {
//     totalKeywords: getTotal(lastMonth.bars),
//     totalSearchVolume: currentMonths.reduce(
//       (sum, month) => sum + month.searchVolume,
//       0,
//     ),
//     changes: getTotal(lastMonth.bars) - getTotal(firstMonth.bars),
//   };
//   const first = data.googleRanking[0].rankings;
//   const last = data.googleRanking[data.googleRanking.length - 1].rankings;

//   const totalChanges =
//     last["51Plus"] -
//     first["51Plus"] +
//     (last["21To50"] - first["21To50"]) +
//     (last["11To20"] - first["11To20"]) +
//     (last["4To10"] - first["4To10"]) +
//     (last["1To3"] - first["1To3"]);

//   console.log(totalChanges, "totalChanges12312"); // 2

//   const activeMonth = selectedMonth ?? currentMonths[currentMonths.length - 1];

//   const currentIndex = currentMonths.findIndex(
//     (m) => m.name === activeMonth.name,
//   );

//   const previousMonth =
//     currentIndex > 0 ? currentMonths[currentIndex - 1] : activeMonth;

//   const previousTotalKeywords = getTotal(previousMonth.bars);

//   const graphSummary: GraphSummary = {
//     totalKeywords: targetTotalCount,
//     totalSearchVolume: activeMonth.searchVolume,
//     changes: targetTotalCount - previousTotalKeywords,
//   };



//   const TOOLTIP_WIDTH = 115;
//   const GRAPH_TOP = 130;
//   const GRAPH_BOTTOM = 465; // Y position of the X-axis

//   const getTooltipPosition = (
//     x: number,
//     barTopY: number,
//     tooltipHeight: number,
//   ) => {
//     let posX = x + 42;

//     // Always keep tooltip just above the hovered bar
//     let posY = barTopY - tooltipHeight - 6;

//     // Don't let it go above the chart
//     if (posY < GRAPH_TOP) {
//       posY = GRAPH_TOP;
//     }

//     // Don't let it touch the X-axis
//     const maxY = GRAPH_BOTTOM - tooltipHeight - 8;
//     if (posY > maxY) {
//       posY = maxY;
//     }

//     // Flip to left near the right edge
//     if (posX + TOOLTIP_WIDTH > 970) {
//       posX = x - TOOLTIP_WIDTH - 2;
//     }

//     return { x: posX, y: posY };
//   };


//   const renderTooltip = (
//     month: string,
//     bars: number[],
//     x: number,
//     topY: number,
//   ) => {
//     const visibleItems = legendsData.filter(
//       (item) => activeLegends[item.index],
//     );

//     const tooltipHeight = Math.max(
//       80,
//       50 + visibleItems.length * 22,
//     );

//     const pos = getTooltipPosition(
//       x,
//       topY,
//       tooltipHeight,
//     );

//     return (
//       <g key={month} className="pointer-events-none">
//         {/* Background */}
//         <rect
//           x={pos.x}
//           y={pos.y}
//           width={TOOLTIP_WIDTH}
//           height={tooltipHeight}
//           rx="5"
//           ry="5"
//           fill="#000000"
//           stroke="rgba(255,255,255,0.1)"
//         />

//         {/* Month */}
//         <text
//           x={pos.x + 10}
//           y={pos.y + 22}
//           fontSize="15"
//           fontWeight="600"
//           fill="#FFFFFF"
//         >
//           {month}
//         </text>

//         {/* Rows */}
//         {visibleItems.map((item, index) => {
//           const rowY = pos.y + 45 + index * 24;

//           return (
//             <g key={item.label}>
//               <circle
//                 cx={pos.x + 12}
//                 cy={rowY}
//                 r="5"
//                 fill={item.color}
//                 stroke="#FFFFFF"
//                 strokeWidth="1.5"
//               />

//               <text
//                 x={pos.x + 23}
//                 y={rowY + 4}
//                 fontSize="15"
//                 fontWeight="600"
//                 fill="#FFFFFF"
//               >
//                 {item.label}
//               </text>

//               <text
//                 x={pos.x + TOOLTIP_WIDTH - 10}
//                 y={rowY + 4}
//                 fontSize="15"
//                 fontWeight="600"
//                 fill="#FFFFFF"
//                 textAnchor="end"
//               >
//                 {bars[item.index]}
//               </text>
//             </g>
//           );
//         })}
//       </g>
//     );
//   };



//   useEffect(() => {
//     onSummaryChange?.(overallSummary);
//   }, [activeLegends, onSummaryChange]);

//   useEffect(() => {
//     if (!selectedMonth) {
//       setSelectedMonth(currentMonths[currentMonths.length - 1]);
//     }
//   }, []);

//   return (
//     <div className="w-full border border-[#0000000D] rounded-lg">
//       <svg
//         viewBox="0 0 995 430"
//         width="100%"
//         height="100%"
//         style={{ overflow: "visible" }}
//       >
//         <style>{`
//           .bar {
//             transition: height 0.3s ease, y 0.3s ease, fill 0.3s ease;
//           }
//         `}</style>

//         <g transform="translate(25,15)">
//           <g transform="translate(25,15)">
//             {/* Bar 1 */}
//             <rect
//               x="18"
//               y="36"
//               width="6"
//               height="10"
//               rx="1.5"
//               fill="#2A7FCD"
//             />

//             {/* Bar 2 */}
//             <rect
//               x="27"
//               y="30"
//               width="6"
//               height="16"
//               rx="1.5"
//               fill="#2A7FCD"
//             />

//             {/* Bar 3 */}
//             <rect
//               x="36"
//               y="23"
//               width="6"
//               height="23"
//               rx="1.5"
//               fill="#2A7FCD"
//             />
//           </g>

//           <text x="50" y="43" fontSize="18" fontWeight="400" fill="#555555">
//             Google Rankings
//           </text>
//         </g>

//         {/* Total Count */}
//         <text
//           fontSize={22}
//           x="970"
//           y="38"
//           textAnchor="end"
//           fill="#000000"
//           fontWeight={600}
//         >50
//           {/* {targetTotalCount} */}
//         </text>
//         <g transform="translate(380,75)">
//           {[
//             { label: "1-3", color: "#6B8E23", index: 4, x: 300 },
//             { label: "4-10", color: "#A9C95F", index: 3, x: 380 },
//             { label: "11-20", color: "#E8D58B", index: 2, x: 460 },
//             { label: "21-50", color: "#F2B566", index: 1, x: 540 },
//             { label: "51+", color: "#FF0000", index: 0, x: 640 },
//           ].map((item) => {
//             const isActive = activeLegends[item.index];

//             return (
//               <g
//                 key={item.label}
//                 onClick={() => toggleLegend(item.index)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <circle
//                   cx={item.x}
//                   cy="80"
//                   r="8"
//                   fill={isActive ? item.color : "#D1D5DB"}
//                 />

//                 <text
//                   x={item.x + 20}
//                   y="85"
//                   fontSize="16"
//                   fill={isActive ? "#555555" : "#AAAAAA"}
//                   fontWeight={isActive ? 600 : 400}
//                 >
//                   {item.label}
//                 </text>
//               </g>
//             );
//           })}
//         </g>

//         {isAnyLegendActive && (
//           <>
//             {/* Grid Lines */}
//             <line x1="60" y1="370" x2="970" y2="370" stroke="#0000001A" /> {/* 0 */}
//             <line x1="60" y1="330" x2="970" y2="330" stroke="#0000001A" /> {/* 10 */}
//             <line x1="60" y1="290" x2="970" y2="290" stroke="#0000001A" /> {/* 20 */}
//             <line x1="60" y1="250" x2="970" y2="250" stroke="#0000001A" /> {/* 30 */}
//             <line x1="60" y1="210" x2="970" y2="210" stroke="#0000001A" /> {/* 40 */}
//             <line x1="60" y1="170" x2="970" y2="170" stroke="#0000001A" /> {/* 50 */}
//             <line x1="60" y1="130" x2="970" y2="130" stroke="#0000001A" /> {/* 60 */}

//             {/* DYNAMIC Y LABELS */}
//             {/* Y Labels */}
//             <g fontSize="14" fontWeight="500" fill="#00000066">
//               <text x="30" y="374">0</text>
//               <text x="30" y="334">10</text>
//               <text x="30" y="294">20</text>
//               <text x="30" y="254">30</text>
//               <text x="30" y="214">40</text>
//               <text x="30" y="174">50</text>
//               <text x="30" y="134">60</text>
//             </g>

//             {/* BARS */}
//             {currentMonths.map((month) => {
//               return (
//                 <g
//                   key={month.name}
//                   className="cursor-pointer"
//                   onMouseEnter={() => {
//                     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//                     if (enterTimeoutRef.current)
//                       clearTimeout(enterTimeoutRef.current);
//                     enterTimeoutRef.current = setTimeout(() => {
//                       setSelectedMonth?.(month);
//                     }, 22);
//                   }}
//                 >
//                   {(() => {
//                     let baseY = 370;
//                     return month.bars.map((value, i) => {
//                       if (!activeLegends[i]) return null;

//                       const segmentHeight = value * SCALE;
//                       baseY -= segmentHeight;

//                       return (
//                         <rect
//                           key={i}
//                           className="bar"
//                           x={month.x}
//                           y={baseY}
//                           width="40"
//                           height={segmentHeight}
//                           fill={colors[i]}
//                         />
//                       );
//                     });
//                   })()}

//                   <text x={month.x} y="398" fill="#949494" fontSize="12">
//                     {month.name}
//                   </text>
//                 </g>
//               );
//             })}

//             {/* TOOLTIP */}
//             {selectedMonth &&
//               renderTooltip(
//                 selectedMonth.name,
//                 selectedMonth.bars,
//                 selectedMonth.x,
//                 getBarTopY(selectedMonth.bars)
//               )}
//           </>
//         )}
//       </svg>
//     </div>
//   );
// };

// export default Graph_4;
