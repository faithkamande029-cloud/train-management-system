import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaTrain } from "react-icons/fa";
import { useSchedules, useTrains } from "../../hooks";
import Loader from "../../components/common/Loader/Loader";
import { formatTime } from "../../utils/dateFormatter";

function UserDashboard() {
  const { data: trains = [], isLoading: trainsLoading } = useTrains();
  const { data: schedules = [], isLoading: schedulesLoading } = useSchedules();

  if (trainsLoading || schedulesLoading) return <Loader />;

  const upcomingSchedules = [...schedules]
    .sort((first, second) => (first.departureTime || "").localeCompare(second.departureTime || ""))
    .slice(0, 4);
  const activeTrains = trains.filter((train) => train.status?.toLowerCase() === "active").length;

  return (
    <section className="min-h-full bg-zinc-950 px-6 py-6 text-white lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-300">Passenger portal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Plan your next journey.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">Browse current train services, check departure times, and manage your own tickets.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/bookings/new" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200"><FaTicketAlt /> Book a ticket</Link>
            <Link to="/bookings" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">My bookings <FaArrowRight /></Link>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-red-500/10 text-red-300"><FaTrain /></span><div><p className="text-2xl font-bold">{activeTrains}</p><p className="text-sm text-zinc-400">active train services</p></div></div></article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-400/10 text-sky-300"><FaCalendarAlt /></span><div><p className="text-2xl font-bold">{schedules.length}</p><p className="text-sm text-zinc-400">scheduled journeys available</p></div></div></article>
        </div>

        <section className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/10 sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-white">Upcoming departures</p><p className="mt-1 text-sm text-zinc-400">Find a service that fits your plans.</p></div><Link to="/schedules" className="text-sm font-semibold text-red-300 hover:text-red-200">View schedules</Link></div>
          <div className="mt-5 divide-y divide-white/5">
            {upcomingSchedules.length ? upcomingSchedules.map((schedule) => <div className="flex items-center gap-3 py-4" key={schedule.id}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-800 text-red-300"><FaMapMarkerAlt /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white">{schedule.fromStation} <FaArrowRight className="mx-1 inline text-xs text-zinc-500" /> {schedule.toStation}</p><p className="mt-1 text-xs text-zinc-400">Platform {schedule.platform || "—"} · Departs {formatTime(schedule.departureTime)}</p></div><Link to="/bookings/new" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20">Book</Link></div>) : <p className="py-10 text-center text-sm text-zinc-500">No departures are currently available.</p>}
          </div>
        </section>
      </div>
    </section>
  );
}

export default UserDashboard;
