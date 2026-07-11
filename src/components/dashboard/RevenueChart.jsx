// src/components/dashboard/RevenueChart.jsx

import {
  BarChart, Bar, XAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

function RevenueChart({ bookings }) {
  const confirmedRevenue = bookings
    ?.filter((b) => b.status?.toLowerCase() === "confirmed")
    .reduce((total, b) => total + Number(b.fare || 0), 0);

  const cancelledRevenue = bookings
    ?.filter((b) => b.status?.toLowerCase() === "cancelled")
    .reduce((total, b) => total + Number(b.fare || 0), 0);

  const pendingRevenue = bookings
    ?.filter((b) => b.status?.toLowerCase() === "pending")
    .reduce((total, b) => total + Number(b.fare || 0), 0);

  const data = [
    { name: "Confirmed", revenue: confirmedRevenue },
    { name: "Pending",   revenue: pendingRevenue   },
    { name: "Cancelled", revenue: cancelledRevenue },
  ];

  return (
    <div className="bg-cyan-800 p-6 rounded-2xl shadow-sm h-[400px]">
      <h2 className="text-xl font-semibold mb-6 text-white">
        Revenue Overview
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip
            formatter={(value) => `$${Number(value).toLocaleString()}`}
          />
          <Bar dataKey="revenue" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;