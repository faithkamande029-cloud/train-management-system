import { memo } from "react";
import { FaTrain, FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import { BOOKING_STATUS_COLORS } from "../../utils/constants";

const TicketCard = memo(({ booking, onSelect, onToggleFavorite, isFavorite }) => {
  const getStatusColor = (status) => {
    return BOOKING_STATUS_COLORS[status?.toLowerCase()] || "bg-zinc-500";
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "text-green-400";
      case "pending": return "text-yellow-400";
      case "cancelled": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="bg-zinc-900 rounded-2xl shadow-md overflow-hidden hover:shadow-red-900/30 hover:shadow-lg transition group cursor-pointer border border-zinc-600" onClick={() => onSelect(booking)}>
      <div className="relative bg-red-950/30 h-36 flex items-center justify-center">
        <FaTrain className="text-red-400 text-6xl opacity-80 group-hover:scale-110 transition duration-500" />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black z-10" onClick={(e) => { e.stopPropagation(); onToggleFavorite(booking.id); }}>
          <FaHeart className={isFavorite ? "text-red-400" : "text-gray-500"} />
        </button>
        <span className="absolute bottom-3 left-3 bg-red-700 text-white text-xs px-2 py-1 rounded">#{booking.id || "N/A"}</span>
        <span className={`absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded ${getStatusColor(booking.status)}`}>{booking.status || "Unknown"}</span>
      </div>
      <div className="p-5">
        {/* Changed to snake_case field names */}
        <h3 className="text-xl font-bold text-white mb-1">{booking.passenger_name || "Unknown Passenger"}</h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
          <FaMapMarkerAlt className="text-red-400" />
          <span>{booking.from_station || "?"}</span>
          <span className="text-gray-600">→</span>
          <span>{booking.to_station || "?"}</span>
        </div>
        <div className="flex justify-between text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <MdEventSeat className="text-red-400" /> Seat {booking.seat_number || "?"}
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-red-400" />{booking.departure_time || "?"}
          </div>
          <div className={`font-semibold ${getStatusText(booking.status)}`}>
            ${Number(booking.fare || 0).toLocaleString()}
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onSelect(booking); }} className="w-full bg-zinc-800 hover:bg-red-700 hover:text-white text-gray-300 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition">
          <FaEye /> View Ticket
        </button>
      </div>
    </div>
  );
});

TicketCard.displayName = "TicketCard";
export default TicketCard;