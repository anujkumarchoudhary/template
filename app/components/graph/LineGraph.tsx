"use client";

import { useState } from "react";

/* ================= TYPES ================= */
type MonthKey =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

type DataPoint = {
  name: MonthKey;
  value: number;
  x: number;
};

/* ================= DATA (you can change values) ================= */
const data: DataPoint[] = [
  { name: "Jan", value: 20, x: 80 },
  { name: "Feb", value: 35, x: 150 },
  { name: "Mar", value: 40, x: 220 },
  { name: "Apr", value: 55, x: 290 },
  { name: "May", value: 60, x: 360 },
  { name: "Jun", value: 70, x: 430 },
  { name: "Jul", value: 85, x: 500 },
  { name: "Aug", value: 90, x: 570 },
  { name: "Sep", value: 100, x: 640 },
  { name: "Oct", value: 110, x: 710 },
  { name: "Nov", value: 120, x: 780 },
  { name: "Dec", value: 130, x: 850 },
];

/* ================= COMPONENT ================= */
const LineGraph = () => {
  const [hovered, setHovered] = useState<MonthKey | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value));

  /* ===== SCALE FUNCTION ===== */
  const getY = (value: number) => {
    const chartHeight = 340;
    return 420 - (value / maxValue) * chartHeight;
  };

  /* ===== CREATE SMOOTH CURVE (BEZIER) ===== */
  const createSmoothPath = () => {
    let path = "";

    data.forEach((point, i) => {
      const x = point.x;
      const y = getY(point.value);

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prev = data[i - 1];
        const prevX = prev.x;
        const prevY = getY(prev.value);

        const cx1 = prevX + (x - prevX) / 2;
        const cy1 = prevY;
        const cx2 = prevX + (x - prevX) / 2;
        const cy2 = y;

        path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
      }
    });

    return path;
  };

  const pathD = createSmoothPath();

  return (
    <div className="w-full rounded-xl bg-white">
      <svg viewBox="0 0 920 500" width="100%" height="100%">
        {/* ===== DEFINITIONS ===== */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb9100" />
            <stop offset="100%" stopColor="#1b5a96" />
          </linearGradient>

          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb9100" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1b5a96" stopOpacity="0" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* TITLE */}
        <text x="60" y="30" fontSize="25" fontWeight="700">
          Performance Growth
        </text>

        {/* AXIS */}
        <line x1="60" y1="420" x2="900" y2="420" stroke="#e5e7eb" />
        <line x1="60" y1="60" x2="60" y2="420" stroke="#e5e7eb" />
        {/* ===== Y AXIS LABELS ===== */}
        <g fontSize="20" fill="#6b7280" textAnchor="end">
          {[0, 20, 40, 60, 80, 100].map((val) => {
            const y = getY(val);

            return (
              <g key={val}>
                {/* Label */}
                <text x="50" y={y + 4}>
                  {val}
                </text>

                {/* Optional grid line (recommended) */}
                <line x1="60" y1={y} x2="900" y2={y} stroke="#f1f5f9" />
              </g>
            );
          })}
        </g>

        {/* ===== AREA (UNDER LINE) ===== */}
        <path
          d={`${pathD} L ${data[data.length - 1].x} 420 L ${data[0].x} 420 Z`}
          fill="url(#areaGradient)"
        />

        {/* ===== LINE ===== */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          // filter="url(#glow)"
        />

        {/* ===== POINTS ===== */}
        {/* ===== POINTS + HOVER ZONE ===== */}
        {data.map((point, index) => {
          const y = getY(point.value);

          // width of hover zone (half distance to next point)
          const next = data[index + 1];
          const prev = data[index - 1];

          const left = prev ? (point.x + prev.x) / 2 : point.x - 35;
          const right = next ? (point.x + next.x) / 2 : point.x + 35;
          const width = right - left;

          return (
            <g
              key={point.name}
              onMouseEnter={() => setHovered(point.name)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* ===== HOVER AREA (invisible) ===== */}
              <rect
                x={left}
                y={60}
                width={width}
                height={360}
                fill="transparent"
                style={{ cursor: "pointer" }}
              />

              {/* ===== ACTIVE LINES ===== */}
              {hovered === point.name && (
                <>
                  {/* Vertical line */}
                  <line
                    x1={point.x}
                    y1={60}
                    x2={point.x}
                    y2={420}
                    stroke="#d1d5db"
                    strokeDasharray="4 4"
                  />

                  {/* Horizontal line */}
                  <line
                    x1={60}
                    y1={y}
                    x2={900}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeDasharray="4 4"
                  />
                </>
              )}

              {/* ===== POINT DOT ===== */}
              <circle
                cx={point.x}
                cy={y}
                r={hovered === point.name ? 6 : 5}
                fill="#fff"
                stroke="url(#lineGradient)"
                strokeWidth="2"
              />

              {/* MONTH LABEL */}
              <text x={point.x} y="450" textAnchor="middle">
                {point.name}
              </text>

              {/* ===== TOOLTIP ===== */}
              {hovered === point.name && (
                <foreignObject
                  x={point.x - 50}
                  y={y - 80}
                  width="120"
                  height="60"
                >
                  <div className="bg-black text-white text-xs rounded-md p-2 text-center shadow-xl">
                    <div>{point.name} 2026</div>
                    <div className="font-semibold">{point.value}</div>
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

export default LineGraph;
