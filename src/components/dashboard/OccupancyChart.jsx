import { memo, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const OccupancyChart = memo(({ bookings, trains }) => {
  const data = useMemo(() => {
    if (!trains) return [];
    return trains.map((train) => {
      const occupied = bookings?.filter((b) => b.trainId === train.id && b.status?.toLowerCase() === "confirmed").length || 0;
      const available = (train.totalSeats || 0) - occupied;
      return { name: train.name || `Train ${train.id}`, Occupied: occupied, Available: Math.max(0, available) };
    });
  }, [bookings, trains]);

  if (!trains || trains.length === 0) {
    return <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 h-[400px] flex items-center justify-center"><p className="text-gray-400 text-sm">No train data available.</p></div>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 h-[400px] mt-6">
      <h2 className="text-xl font-semibold mb-6 text-white">Train Occupancy</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barSize={24}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "#0F172A", border: "1px solid #333" }} labelStyle={{ color: "#94A3B8" }} itemStyle={{ color: "#E2E8F0" }} />
          <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
          <Bar dataKey="Occupied" fill="#EF4444" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Available" fill="#06B6D4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

OccupancyChart.displayName = "OccupancyChart";
export default OccupancyChart;