import { useEffect } from "react";
import { FaX, FaHeart } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import { FaToggleOn, FaClock, FaMapMarkerAlt, FaTrain } from "react-icons/fa";
import { TRAIN_TYPE_COLORS, TRAIN_STATUS_COLORS } from "../../utils/constants";

const TrainDetails = ({ train, onClose, favorites, onToggleFavorite }) => {
  if (!train) return null;
  const isFavorite = favorites?.includes(train.id);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-zinc-500/70 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-600" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-red-950/60 h-48 flex items-center justify-center">
          <FaTrain className="text-red-400 text-8xl opacity-70" />
          <span className={`absolute bottom-4 left-4 text-white text-xs px-3 py-1 rounded-full ${TRAIN_TYPE_COLORS[train.type] || "bg-zinc-600"}`}>
            {train.type || "Unknown Type"}
          </span>
          <button onClick={onClose} className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 p-2 rounded-full text-white transition">
            <FaX size={16} />
          </button>
          <button onClick={() => onToggleFavorite?.(train.id)} className="absolute bottom-4 right-4 bg-black/40 hover:bg-black p-2 rounded-full transition">
            <FaHeart className={isFavorite ? "text-red-400" : "text-gray-500"} />
          </button>
        </div>
        <div className="p-6 border-b border-zinc-600">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">{train.name}</h2>
            <span className={`text-sm font-semibold flex items-center gap-1 ${TRAIN_STATUS_COLORS[train.status] ? `text-${TRAIN_STATUS_COLORS[train.status].replace('bg-', '').replace('-600', '-400')}` : "text-gray-400"}`}>
              <FaToggleOn />{train.status || "Unknown"}
            </span>
          </div>
          <p className="text-zinc-400 text-sm">Train ID: #{train.id}</p>
        </div>
        <div className="flex gap-4 mx-6 my-6 bg-zinc-600/50 rounded-xl py-4 px-6">
          <div className="flex-1 flex flex-col items-center gap-1">
            <MdEventSeat className="text-red-400 text-xl" />
            <span className="text-white font-bold text-lg">{train.totalSeats || "?"}</span>
            <span className="text-gray-400 text-xs">Total Seats</span>
          </div>
          <div className="w-px bg-zinc-700" />
          <div className="flex-1 flex flex-col items-center gap-1">
            <MdEventSeat className="text-green-400 text-xl" />
            <span className="text-white font-bold text-lg">{train.availableSeats ?? "?"}</span>
            <span className="text-gray-400 text-xs">Available</span>
          </div>
          <div className="w-px bg-zinc-700" />
          <div className="flex-1 flex flex-col items-center gap-1">
            <FaClock className="text-red-400 text-xl" />
            <span className="text-white font-bold text-lg">{train.schedules?.length ?? 0}</span>
            <span className="text-gray-400 text-xs">Schedules</span>
          </div>
        </div>
        {train.currentRoute && (
          <div className="mx-6 mb-6 bg-zinc-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Current Route</h3>
            <div className="flex items-center justify-between text-gray-300 text-sm">
              <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" />{train.currentRoute.from || "N/A"}</div>
              <div className="flex-1 border-t border-dashed border-gray-600 mx-3" />
              <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" />{train.currentRoute.to || "N/A"}</div>
            </div>
          </div>
        )}
        <div className="mx-6 mb-6">
          <h3 className="text-white font-semibold mb-2">Description</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{train.description || "No description provided."}</p>
        </div>
        <div className="flex gap-3 mx-6 mb-6">
          <button onClick={onClose} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-3 rounded-2xl font-semibold transition">Close</button>
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition">Book This Train</button>
        </div>
      </div>
    </div>
  );
};

export default TrainDetails;