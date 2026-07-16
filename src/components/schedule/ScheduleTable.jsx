import { useState, useMemo } from "react";
import { FaTrain, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { SCHEDULE_STATUS_COLORS } from "../../utils/constants";
import { ITEMS_PER_PAGE } from "../../utils/constants";

const ScheduleTable = ({ schedules, onDelete, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(schedules.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return schedules.slice(start, start + ITEMS_PER_PAGE);
  }, [schedules, currentPage]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-white">Schedules</h2>
        <div className="bg-gray-800 rounded-2xl h-64 animate-pulse" />
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-white">Schedules</h2>
        <p className="text-center text-gray-400 py-16">No schedules found. Add a schedule to get started.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5 ">
      <h2 className="text-3xl font-bold mb-6">Schedules</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-800">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="bg-gray-700/30 text-zinc-900 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Train</th>
              <th className="px-6 py-4">From</th>
              <th className="px-6 py-4">To</th>
              <th className="px-6 py-4">Departure</th>
              <th className="px-6 py-4">Arrival</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((schedule, index) => (
              <tr key={schedule.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800 transition">
                <td className="px-6 py-4 text-gray-500">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td className="px-6 py-4"><div className="flex items-center gap-2 text-white font-medium"><FaTrain className="text-red-500" />{schedule.trainId || "N/A"}</div></td>
                <td className="px-6 py-4"><div className="flex items-center gap-1"><FaMapMarkerAlt className="text-red-400" />{schedule.fromStation || "?"}</div></td>
                <td className="px-6 py-4"><div className="flex items-center gap-1"><FaMapMarkerAlt className="text-green-400" />{schedule.toStation || "?"}</div></td>
                <td className="px-6 py-4"><div className="flex items-center gap-1"><FaClock className="text-amber-400" />{schedule.departureTime || "?"}</div></td>
                <td className="px-6 py-4"><div className="flex items-center gap-1"><FaClock className="text-gray-400" />{schedule.arrivalTime || "?"}</div></td>
                <td className="px-6 py-4">
                  <span className={`text-white text-xs px-3 py-1 rounded-full ${SCHEDULE_STATUS_COLORS[schedule.status] || "bg-gray-500"}`}>
                    {schedule.status || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => onDelete(schedule.id)} className="text-red-400 hover:text-red-300 transition"><FaX size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-800 text-gray-300">Previous</button>
          <span className="px-4 py-2 text-gray-400">Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-800 text-gray-300">Next</button>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;