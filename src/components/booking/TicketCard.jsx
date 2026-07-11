// src/components/booking/TicketCard.jsx

import { FaTrain, FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";

const TicketCard = ({ booking, onSelect, onToggleFavorite, isFavorite }) => {

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "bg-green-600";
      case "pending":   return "bg-yellow-500";
      case "cancelled": return "bg-red-600";
      default:          return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "text-green-400";
      case "pending":   return "text-yellow-400";
      case "cancelled": return "text-red-400";
      default:          return "text-gray-400";
    }
  };

  return (
    <div
      className="bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:shadow-cyan-900 hover:shadow-lg transition group cursor-pointer border border-gray-800"
      onClick={() => onSelect(booking)}
    >
      {/* TOP BANNER */}
      <div className="relative bg-cyan-950 h-36 flex items-center justify-center">
        <FaTrain className="text-cyan-400 text-6xl opacity-80 group-hover:scale-110 transition duration-500" />
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black z-10"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(booking.id); }}
        >
          <FaHeart className={isFavorite ? "text-cyan-400" : "text-gray-500"} />
        </button>
        <span className="absolute bottom-3 left-3 bg-cyan-700 text-white text-xs px-2 py-1 rounded">
          #{booking.id || "N/A"}
        </span>
        <span className={`absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded ${getStatusColor(booking.status)}`}>
          {booking.status || "Unknown"}
        </span>
      </div>

      {/* CARD BODY */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-1">
          {booking.passengerName || "Unknown Passenger"}
        </h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
          <FaMapMarkerAlt className="text-cyan-400" />
          <span>{booking.fromStation || "?"}</span>
          <span className="text-gray-600">→</span>
          <span>{booking.toStation || "?"}</span>
        </div>
        <div className="flex justify-between text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <MdEventSeat className="text-cyan-400" />
            Seat {booking.seatNumber || "?"}
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-cyan-400" />
            {booking.departureTime || "?"}
          </div>
          <div className={`font-semibold ${getStatusText(booking.status)}`}>
            ${Number(booking.fare || 0).toLocaleString()}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(booking); }}
          className="w-full bg-gray-800 hover:bg-cyan-700 hover:text-white text-gray-300 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaEye /> View Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketCard;