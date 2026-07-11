// src/components/trains/TrainCard.jsx

import { FaTrain, FaHeart } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

const TrainCard = ({ train, onSelect, onToggleFavorite, isFavorite }) => {

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":      return "bg-green-600";
      case "maintenance": return "bg-yellow-500";
      case "inactive":    return "bg-red-600";
      default:            return "bg-gray-500";
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "express":   return "bg-blue-600";
      case "intercity": return "bg-purple-600";
      case "regional":  return "bg-cyan-600";
      case "freight":   return "bg-orange-600";
      default:          return "bg-gray-600";
    }
  };

  return (
    <div
      className="bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:shadow-cyan-900 hover:shadow-lg transition group cursor-pointer border border-gray-800"
      onClick={() => onSelect(train)}
    >
      {/* TOP BANNER */}
      <div className="relative bg-cyan-950 h-36 flex items-center justify-center">
        <FaTrain className="text-cyan-400 text-6xl opacity-80 group-hover:scale-110 transition duration-500" />
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black z-10"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(train.id); }}
        >
          <FaHeart className={isFavorite ? "text-cyan-400" : "text-gray-500"} />
        </button>
        <span className={`absolute bottom-3 left-3 text-white text-xs px-2 py-1 rounded ${getTypeColor(train.type)}`}>
          {train.type || "Unknown"}
        </span>
        <span className={`absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded ${getStatusColor(train.status)}`}>
          {train.status || "Unknown"}
        </span>
      </div>

      {/* CARD BODY */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-3">
          {train.name}
        </h3>
        <div className="flex justify-between text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <MdEventSeat className="text-cyan-400" />
            {train.totalSeats || "?"} Total
          </div>
          <div className="flex items-center gap-1">
            <MdEventSeat className="text-green-400" />
            {train.availableSeats ?? "?"} Free
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(train); }}
          className="w-full bg-gray-800 hover:bg-cyan-700 hover:text-white text-gray-300 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaEye /> View Details
        </button>
      </div>
    </div>
  );
};

export default TrainCard;