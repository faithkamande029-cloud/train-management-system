import { memo, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const OccupancyChart = memo(({ bookings, trains }) => {
  const data = useMemo(() => (trains || []).map((train) => {
    const occupied = (bookings || []).filter((booking) => String(booking.trainId) === String(train.id) && booking.status?.toLowerCase() === "confirmed").length;
    return { name: train.name || `Train ${train.id}`, Occupied: occupied, Available: Math.max(0, Number(train.totalSeats || 0) - occupied) };
  }), [bookings, trains]);

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/10 sm:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold text-white">Seat availability</p>
        <p className="mt-1 text-sm text-zinc-400">Confirmed seats against total capacity</p>
      </div>
      <div className="h-72">
        {data.length ? <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#27272a" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#a1a1aa", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px" }} labelStyle={{ color: "#e4e4e7" }} />
            <Legend wrapperStyle={{ color: "#a1a1aa", fontSize: 12 }} />
            <Bar dataKey="Occupied" stackId="seats" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Available" stackId="seats" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer> : <div className="grid h-full place-items-center text-sm text-zinc-500">No train data available.</div>}
      </div>
    </section>
  );
});

OccupancyChart.displayName = "OccupancyChart";
export default OccupancyChart;
