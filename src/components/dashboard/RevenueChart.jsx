import { memo, useMemo } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency } from "../../utils/dateFormatter";

const RevenueChart = memo(({ bookings }) => {
  const data = useMemo(() => {
    const confirmed = bookings?.filter((b) => b.status?.toLowerCase() === "confirmed").reduce((sum, b) => sum + Number(b.fare || 0), 0) || 0;
    const pending = bookings?.filter((b) => b.status?.toLowerCase() === "pending").reduce((sum, b) => sum + Number(b.fare || 0), 0) || 0;
    const cancelled = bookings?.filter((b) => b.status?.toLowerCase() === "cancelled").reduce((sum, b) => sum + Number(b.fare || 0), 0) || 0;
    return [
      { name: "Confirmed", revenue: confirmed },
      { name: "Pending", revenue: pending },
      { name: "Cancelled", revenue: cancelled },
    ];
  }, [bookings]);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 h-[400px]">
      <h2 className="text-xl font-semibold mb-6 text-white">Revenue Overview</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 12 }} />
          <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: "#0F172A", border: "1px solid #333" }} />
          <Bar dataKey="revenue" fill="#EAB308" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

RevenueChart.displayName = "RevenueChart";
export default RevenueChart;