"use client";

// import Graph_4 from "@/app/components/graph/Graph_4";
import LineGraph from "@/app/components/graph/LineGraph";

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SALES GRAPH */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <LineGraph />
      </div>

      {/* KEYWORD GRAPH */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        {/* <Graph_4 /> */}
      </div>
    </div>
  );
}
