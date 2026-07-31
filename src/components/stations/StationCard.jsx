import { memo } from "react";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { FaEye, FaTrain } from "react-icons/fa6";
import { MdPlace } from "react-icons/md";

const StationCard = memo(({ station, onSelect, onToggleFavorite, isFavorite }) => {
  const getCityColor = (city) => {
    switch (city?.toLowerCase()) {
      case "nairobi": return "bg-blue-600";
      case "mombasa": return "bg-orange-600";
      case "kisumu": return "bg-green-600";
      case "nakuru": return "bg-purple-600";
      default: return "bg-zinc-600";
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-red-200 hover:shadow-lg transition group cursor-pointer border border-slate-200"
      onClick={() => onSelect?.(station)}
    >
      <div className="relative bg-red-800/30 h-36 flex items-center justify-center">
        <FaMapMarkerAlt className="text-red-400 text-6xl opacity-80 group-hover:scale-110 transition duration-500" />
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white z-10"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(station.id); }}
        >
          <FaHeart className={isFavorite ? "text-red-400" : "text-gray-500"} />
        </button>
        <span className="absolute bottom-3 left-3 bg-red-700 text-white text-xs px-2 py-1 rounded">{station.code || "N/A"}</span>
        <span className={`absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded ${getCityColor(station.city)}`}>{station.city || "Unknown"}</span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{station.name}</h3>
        <div className="flex justify-between text-slate-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <MdPlace className="text-red-400" />
            {station.platform || "?"} Platforms
          </div>
          <div className="flex items-center gap-1">
            <FaTrain className="text-red-400" />
            {station.trains?.length ?? "?"} Trains
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect?.(station); }}
          className="w-full bg-slate-100 hover:bg-red-700 hover:text-white text-slate-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaEye /> View Details
        </button>
      </div>
    </div>
  );
});

StationCard.displayName = "StationCard";
export default StationCard;
