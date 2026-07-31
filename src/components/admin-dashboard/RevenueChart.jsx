import { memo, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../utils/dateFormatter";

const RevenueChart = memo(({ bookings }) => {
  const data = useMemo(() => ["confirmed", "pending", "cancelled"].map((status) => ({
    name: `${status.slice(0, 1).toUpperCase()}${status.slice(1)}`,
    revenue: (bookings || [])
      .filter((booking) => booking.status?.toLowerCase() === status)
      .reduce((total, booking) => total + Number(booking.fare || 0), 0),
  })), [bookings]);

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/10 sm:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold text-white">Booking value</p>
        <p className="mt-1 text-sm text-zinc-400">Revenue grouped by booking status</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#27272a" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
            <Tooltip cursor={{ fill: "#27272a" }} formatter={(value) => formatCurrency(value)} contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px" }} labelStyle={{ color: "#e4e4e7" }} itemStyle={{ color: "#fbbf24" }} />
            <Bar dataKey="revenue" fill="#ef4444" radius={[8, 8, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
});

RevenueChart.displayName = "RevenueChart";
export default RevenueChart;
