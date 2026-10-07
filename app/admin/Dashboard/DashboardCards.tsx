"use client";

import { useEffect, useState } from "react";

import {
  Users,
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

/* ================= COUNT UP ================= */
const CountUp = ({ value }: { value: string }) => {
  const [display, setDisplay] = useState(0);

  const numericValue = Number(value.replace(/[^0-9]/g, ""));

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = numericValue / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplay(numericValue);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [numericValue]);

  return <>{display.toLocaleString()}</>;
};

/* ================= SPARKLINE ================= */
const Sparkline = ({ data, color }: any) => {
  const width = 100;
  const height = 40;
  const padding = 8;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const getX = (i: number) =>
    padding + (i / (data.length - 1)) * (width - padding * 2);

  const getY = (value: number) =>
    height -
    padding -
    ((value - min) / (max - min || 1)) * (height - padding * 2);

  const points = data.map((d: number, i: number) => ({
    x: getX(i),
    y: getY(d),
  }));

  const pathD = points
    .map((p: any, i: any) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <svg viewBox="0 0 100 40" className="w-full h-10">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* AREA */}
      <path
        d={`${pathD} L ${points[points.length - 1].x} 40 L ${points[0].x} 40 Z`}
        fill={`url(#grad-${color})`}
      />

      {/* LINE (ANIMATED) */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        className="animate-draw"
      />

      <style>{`
        .animate-draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 1s ease forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
};

/* ================= MAIN ================= */
export default function DashboardCards() {
  const stats = [
    {
      title: "Users",
      value: "1245",
      prefix: "",
      change: "+12%",
      up: true,
      icon: <Users size={20} />,
      color: "#1b5a96",
      bg: "from-blue-50 to-blue-100",
      data: [10, 20, 15, 25, 30, 40, 35],
    },
    {
      title: "Orders",
      value: "320",
      prefix: "",
      change: "+8%",
      up: true,
      icon: <ShoppingCart size={20} />,
      color: "#9333ea",
      bg: "from-purple-50 to-purple-100",
      data: [5, 15, 10, 20, 18, 25, 30],
    },
    {
      title: "Subscriptions",
      value: "89",
      prefix: "",
      change: "-3%",
      up: false,
      icon: <CreditCard size={20} />,
      color: "#16a34a",
      bg: "from-green-50 to-green-100",
      data: [20, 25, 22, 18, 17, 16, 15],
    },
    {
      title: "Revenue",
      value: "24500",
      prefix: "$",
      change: "+18%",
      up: true,
      icon: <DollarSign size={20} />,
      color: "#fb9100",
      bg: "from-orange-50 to-orange-100",
      data: [30, 40, 35, 50, 60, 70, 85],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item, i) => (
        <div
          key={i}
          className={`relative h-37.5 p-5 rounded-2xl 
          bg-linear-to-br ${item.bg}
          backdrop-blur-xl
          border border-white/30
          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
          hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
          hover:-translate-y-1
          transition-all duration-300`}
        >
          {/* GLASS */}
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-40" />

          {/* TOP */}
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>

              <h2 className="text-3xl font-bold mt-1">
                {item.prefix}
                <CountUp value={item.value}  />
              </h2>
            </div>

            <div
              className="p-3 rounded-xl shadow-inner"
              style={{
                background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
              }}
            >
              <div style={{ color: item.color }}>{item.icon}</div>
            </div>
          </div>

          {/* BOTTOM LEFT */}
          <div className="absolute bottom-4 left-5 flex items-center gap-2 text-sm z-10">
            {item.up ? (
              <TrendingUp size={16} className="text-green-600" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}

            <span
              className={`font-medium ${item.up ? "text-green-600" : "text-red-500"
                }`}
            >
              {item.change}
            </span>

            <span className="text-gray-500 text-xs">
              vs last month
            </span>
          </div>

          {/* GRAPH */}
          <div className="absolute bottom-4 right-4 w-30 opacity-90 mask-image:linear-gradient(to_left,black,transparent)">
            <Sparkline data={item.data} color={item.color} />
          </div>
        </div>
      ))}
    </div>
  );
}






// "use client";

// import {
//   Users,
//   ShoppingCart,
//   CreditCard,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react";

// /* ================= SPARKLINE ================= */
// const Sparkline = ({ data, color }: any) => {
//   const width = 100;
//   const height = 40;
//   const padding = 8;

//   const max = Math.max(...data);
//   const min = Math.min(...data);

//   const getX = (i: number) =>
//     padding + (i / (data.length - 1)) * (width - padding * 2);

//   const getY = (value: number) =>
//     height -
//     padding -
//     ((value - min) / (max - min || 1)) * (height - padding * 2);

//   const points = data
//     .map((d: number, i: number) => `${getX(i)},${getY(d)}`)
//     .join(" ");

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10">
//       <defs>
//         <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor={color} stopOpacity="0.35" />
//           <stop offset="100%" stopColor={color} stopOpacity="0" />
//         </linearGradient>
//       </defs>

//       {/* AREA */}
//       <polygon
//         points={`${padding},${height - padding} ${points} ${
//           width - padding
//         },${height - padding}`}
//         fill={`url(#grad-${color})`}
//       />

//       {/* LINE */}
//       <polyline
//         points={points}
//         fill="none"
//         stroke={color}
//         strokeWidth="2.5"
//         strokeLinecap="round"
//         opacity="0.9"
//       />
//     </svg>
//   );
// };

// /* ================= MAIN COMPONENT ================= */
// export default function DashboardCards() {
//   const stats = [
//     {
//       title: "Users",
//       value: "1,245",
//       change: "+12%",
//       up: true,
//       icon: <Users size={20} />,
//       color: "#1b5a96",
//       bg: "from-blue-50 to-blue-100",
//       data: [10, 20, 15, 25, 30, 40, 35],
//     },
//     {
//       title: "Orders",
//       value: "320",
//       change: "+8%",
//       up: true,
//       icon: <ShoppingCart size={20} />,
//       color: "#9333ea",
//       bg: "from-purple-50 to-purple-100",
//       data: [5, 15, 10, 20, 18, 25, 30],
//     },
//     {
//       title: "Subscriptions",
//       value: "89",
//       change: "-3%",
//       up: false,
//       icon: <CreditCard size={20} />,
//       color: "#16a34a",
//       bg: "from-green-50 to-green-100",
//       data: [20, 25, 22, 18, 17, 16, 15],
//     },
//     {
//       title: "Revenue",
//       value: "$24,500",
//       change: "+18%",
//       up: true,
//       icon: <DollarSign size={20} />,
//       color: "#fb9100",
//       bg: "from-orange-50 to-orange-100",
//       data: [30, 40, 35, 50, 60, 70, 85],
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//       {stats.map((item, i) => (
//         <div
//           key={i}
//           className={`relative h-[150px] p-5 rounded-2xl 
//           bg-gradient-to-br ${item.bg}
//           backdrop-blur-xl
//           border border-white/30
//           shadow-[0_10px_30px_rgba(0,0,0,0.05)]
//           hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
//           hover:-translate-y-1
//           transition-all duration-300`}
//         >
//           {/* GLASS OVERLAY */}
//           <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-40 pointer-events-none" />

//           {/* TOP */}
//           <div className="flex justify-between items-start relative z-10">
//             <div>
//               <p className="text-gray-500 text-sm">{item.title}</p>
//               <h2 className="text-3xl font-bold tracking-tight text-gray-900 mt-1">
//                 {item.value}
//               </h2>
//             </div>

//             <div
//               className="p-3 rounded-xl shadow-inner"
//               style={{
//                 background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
//               }}
//             >
//               <div style={{ color: item.color }}>{item.icon}</div>
//             </div>
//           </div>

//           {/* BOTTOM LEFT */}
//           <div className="absolute bottom-4 left-5 flex items-center gap-2 text-sm z-10">
//             {item.up ? (
//               <TrendingUp size={16} className="text-green-600" />
//             ) : (
//               <TrendingDown size={16} className="text-red-500" />
//             )}

//             <span
//               className={`font-medium ${
//                 item.up ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {item.change}
//             </span>

//             <span className="text-gray-500 text-xs tracking-wide">
//               vs last month
//             </span>
//           </div>

//           {/* GRAPH */}
//           <div className="absolute bottom-4 right-4 w-[120px] opacity-90 [mask-image:linear-gradient(to_left,black,transparent)]">
//             <Sparkline data={item.data} color={item.color} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }