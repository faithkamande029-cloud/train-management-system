import React, { useState } from "react";
import expressTrain from "../../assets/express-101.jpg";
import nightRail from "../../assets/night-rail.jpg";
import hillLine from "../../assets/hill-line.jpg";

const platforms = ["1", "2", "3", "4"];

export default function PlatformAssignment() {
  const [trains, setTrains] = useState([
    {
      id: 1,
      name: "Express 101",
      departure: "06:30",
      arrival: "09:15",
      image: expressTrain,
    },
    {
      id: 2,
      name: "Night Rail",
      departure: "21:45",
      arrival: "00:20",
      image: nightRail,
    },
    {
      id: 3,
      name: "Hill Line",
      departure: "12:10",
      arrival: "14:30",
      image: hillLine,
    },
  ]);

  const handlePlatformChange = (id, platform) => {
    setTrains((prev) => prev.map((t) => (t.id === id ? { ...t, platform } : t)));
  };

  return (
    <section className="bg-gray-300 p-4 rounded-xl text-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-700 text-lg">Platform Assignment</h2>
        <p className="text-sm text-gray-500">Assign arriving trains to platforms</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-zinc-800 text-white">
            <tr>
              <th className="text-left px-4 py-3">Train</th>
              <th className="text-left px-4 py-3">Arrival</th>
              <th className="text-left px-4 py-3">Departure</th>
              <th className="text-left px-4 py-3">Platform</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {trains.map((train) => (
              <tr key={train.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={train.image} alt={train.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold">{train.name}</div>
                      <div className="text-xs text-gray-500">ID: {train.id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium">{train.arrival}</div>
                  <div className="text-xs text-gray-500">Arrival time</div>
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium">{train.departure}</div>
                  <div className="text-xs text-gray-500">Departure time</div>
                </td>

                <td className="px-4 py-3">
                  <select
                    value={train.platform || ""}
                    onChange={(e) => handlePlatformChange(train.id, e.target.value)}
                    className="border rounded-md px-3 py-2 bg-white text-sm"
                  >
                    <option value="">Select platform</option>
                    {platforms.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-3">
                  {train.platform ? (
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Assigned to {train.platform}
                    </span>
                  ) : (
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Unassigned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}