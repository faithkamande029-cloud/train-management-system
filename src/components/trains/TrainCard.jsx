import { memo } from "react";
import { FaTrain, FaHeart } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { TRAIN_TYPE_COLORS, TRAIN_STATUS_COLORS } from "../../utils/constants";

const TrainCard = memo(({ train, onSelect, onToggleFavorite, isFavorite }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-red-200 hover:shadow-lg transition group cursor-pointer border border-slate-200"
      onClick={() => onSelect(train)}
    >
      <div className="relative bg-red-800/30 h-36 flex items-center justify-center">
        <FaTrain className="text-red-400 text-6xl opacity-80 group-hover:scale-110 transition duration-500" />
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white z-10"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(train.id); }}
        >
          <FaHeart className={isFavorite ? "text-red-400" : "text-gray-500"} />
        </button>
        <span className={`absolute bottom-3 left-3 text-white text-xs px-2 py-1 rounded ${TRAIN_TYPE_COLORS[train.type] || "bg-zinc-600"}`}>
          {train.type || "Unknown"}
        </span>
        <span className={`absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded ${TRAIN_STATUS_COLORS[train.status] || "bg-zinc-500"}`}>
          {train.status || "Unknown"}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{train.name}</h3>
        <div className="flex justify-between text-slate-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <MdEventSeat className="text-red-400" />
            {train.totalSeats || "?"} Total
          </div>
          <div className="flex items-center gap-1">
            <MdEventSeat className="text-green-400" />
            {train.availableSeats ?? "?"} Free
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(train); }}
          className="w-full bg-slate-100 hover:bg-red-700 hover:text-white text-slate-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaEye /> View Details
        </button>
      </div>
    </div>
  );
});

TrainCard.displayName = "TrainCard";
export default TrainCard;
