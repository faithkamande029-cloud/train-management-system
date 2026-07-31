import { useEffect } from "react";
import { FaX, FaHeart } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import { FaToggleOn, FaClock, FaMapMarkerAlt, FaTrain } from "react-icons/fa";
import { TRAIN_TYPE_COLORS, TRAIN_STATUS_COLORS } from "../../utils/constants";

const TrainDetails = ({ train, schedule, onBook, page = false, onClose, favorites, onToggleFavorite }) => {
  useEffect(() => {
    if (!train || page) return undefined;
    const handleKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [train, page, onClose]);

  if (!train) return null;

  const isFavorite = favorites?.includes(train.id);
  const journey = schedule && {
    from: schedule.fromStation,
    to: schedule.toStation,
    departureTime: schedule.departureTime,
    arrivalTime: schedule.arrivalTime,
    platform: schedule.platform,
  };

  const content = (
    <article className={`relative w-full overflow-y-auto rounded-3xl border border-zinc-600 bg-zinc-900 shadow-2xl ${page ? "max-w-4xl" : "max-h-[90vh] max-w-2xl"}`} onClick={(event) => event.stopPropagation()}>
      <div className="relative flex h-56 items-center justify-center bg-red-950/60">
        {schedule?.image ? <img src={schedule.image} alt={train.name} className="h-full w-full object-cover opacity-70" /> : <FaTrain className="text-8xl text-red-400 opacity-70" />}
        <span className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs text-white ${TRAIN_TYPE_COLORS[train.type] || "bg-zinc-600"}`}>{train.type || "Unknown type"}</span>
        <button onClick={onClose} aria-label="Back to schedules" className="absolute right-4 top-4 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"><FaX size={16} /></button>
        <button onClick={() => onToggleFavorite?.(train.id)} aria-label="Toggle favourite" className="absolute bottom-4 right-4 rounded-full bg-black/40 p-2 transition hover:bg-black"><FaHeart className={isFavorite ? "text-red-400" : "text-gray-300"} /></button>
      </div>

      <div className="border-b border-zinc-600 p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-white">{train.name}</h1>
          <span className={`flex items-center gap-1 text-sm font-semibold ${TRAIN_STATUS_COLORS[train.status] ? "text-zinc-100" : "text-gray-400"}`}><FaToggleOn />{train.status || "Unknown"}</span>
        </div>
        <p className="text-sm text-zinc-400">Train ID: #{train.id}</p>
      </div>

      <div className="mx-6 my-6 flex gap-4 rounded-xl bg-zinc-600/50 px-6 py-4">
        <div className="flex flex-1 flex-col items-center gap-1"><MdEventSeat className="text-xl text-red-400" /><span className="text-lg font-bold text-white">{train.totalSeats || "?"}</span><span className="text-xs text-gray-400">Total seats</span></div>
        <div className="w-px bg-zinc-700" />
        <div className="flex flex-1 flex-col items-center gap-1"><MdEventSeat className="text-xl text-green-400" /><span className="text-lg font-bold text-white">{train.availableSeats ?? "?"}</span><span className="text-xs text-gray-400">Available seats</span></div>
        <div className="w-px bg-zinc-700" />
        <div className="flex flex-1 flex-col items-center gap-1"><FaClock className="text-xl text-red-400" /><span className="text-lg font-bold text-white">{journey?.platform || "?"}</span><span className="text-xs text-gray-400">Platform</span></div>
      </div>

      {(journey || train.currentRoute) && <div className="mx-6 mb-6 rounded-xl bg-zinc-800 p-4">
        <h2 className="mb-3 font-semibold text-white">Journey details</h2>
        <div className="flex items-center justify-between gap-3 text-sm text-gray-300"><div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" />{journey?.from || train.currentRoute?.from || "N/A"}</div><div className="flex-1 border-t border-dashed border-gray-600" /><div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" />{journey?.to || train.currentRoute?.to || "N/A"}</div></div>
        {journey && <div className="mt-4 grid grid-cols-1 gap-3 border-t border-zinc-700 pt-4 text-sm text-zinc-300 sm:grid-cols-3"><p><span className="text-zinc-500">Departure:</span> {journey.departureTime || "N/A"}</p><p><span className="text-zinc-500">Arrival:</span> {journey.arrivalTime || "N/A"}</p><p><span className="text-zinc-500">Platform:</span> {journey.platform || "N/A"}</p></div>}
      </div>}

      <div className="mx-6 mb-6"><h2 className="mb-2 font-semibold text-white">Description</h2><p className="text-sm leading-relaxed text-gray-400">{train.description || "No description provided."}</p></div>
      <div className="mx-6 mb-6 flex gap-3"><button onClick={onClose} className="flex-1 rounded-2xl bg-zinc-800 py-3 font-semibold text-zinc-300 transition hover:bg-zinc-700">{page ? "Back to schedules" : "Close"}</button>{page && <button onClick={onBook} className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">Book Ticket</button>}</div>
    </article>
  );

  return page ? <section className="min-h-screen bg-zinc-100 px-6 py-10">{content}</section> : <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-500/70 p-4 backdrop-blur-md" onClick={onClose}>{content}</div>;
};

export default TrainDetails;
