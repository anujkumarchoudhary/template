"use client";

// import PieChart from "../components/graph/PieChart";

import DashboardCards from "./Dashboard/DashboardCards";
import DashboardCharts from "./Dashboard/DashboardCharts";
import RecentOrders from "./Dashboard/RecentOrders";

export default function DashboardPage() {
  return (
    <div className="px-10 pt-5 pb-10 space-y-4 bg-white rounded-lg shadow ">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Overview of Adaired Agency performance
        </p>
      </div>

      {/* TOP CARDS */}
      <DashboardCards />

      {/* CHARTS */}
      <DashboardCharts />

      {/* TABLE */}
      <div className="grid grid-cols-3 gap-">
        <div className="col-span-2 bg-b">
          <RecentOrders />
        </div>
        {/* <PieChart /> */}
      </div>
    </div>
  );
}