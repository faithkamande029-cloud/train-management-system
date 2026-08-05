import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaTrain, FaUsers } from "react-icons/fa";
import { useBookings, useSchedules, useTrains } from "../../hooks";
import StatsCard from "../../components/admin-dashboard/StatsCard";
import RevenueChart from "../../components/admin-dashboard/RevenueChart";
import OccupancyChart from "../../components/admin-dashboard/OccupancyChart";
import Loader from "../../components/common/Loader/Loader";
import { formatCurrency, formatTime } from "../../utils/dateFormatter";

const statusStyles = {
  "on-time": "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  delayed: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
  confirmed: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  pending: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
  cancelled: "bg-red-400/10 text-red-300 ring-red-400/20",
};

function StatusBadge({ status }) {
  const label = status?.replace("-", " ") || "unknown";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${statusStyles[status?.toLowerCase()] || "bg-zinc-800 text-zinc-300 ring-zinc-700"}`}>{label}</span>;
}

function Dashboard() {
  const trainsQuery = useTrains();
  const bookingsQuery = useBookings();
  const schedulesQuery = useSchedules();
  const isLoading = trainsQuery.isLoading || bookingsQuery.isLoading || schedulesQuery.isLoading;

  if (isLoading) return <Loader />;

  const trains = trainsQuery.data || [];
  const bookings = bookingsQuery.data || [];
  const schedules = schedulesQuery.data || [];
  const activeTrains = trains.filter((train) => train.status?.toLowerCase() === "active").length;
  const confirmedBookings = bookings.filter((booking) => booking.status?.toLowerCase() === "confirmed");
  const delayedSchedules = schedules.filter((schedule) => schedule.status?.toLowerCase() === "delayed");
  const confirmedRevenue = confirmedBookings.reduce((total, booking) => total + Number(booking.fare || 0), 0);
  const nextSchedules = [...schedules].sort((a, b) => (a.departureTime || "").localeCompare(b.departureTime || "")).slice(0, 4);
  const recentBookings = [...bookings].slice(-5).reverse();
  const totalCapacity = trains.reduce((total, train) => total + Number(train.totalSeats || 0), 0);
  const occupancy = totalCapacity ? Math.round((confirmedBookings.length / totalCapacity) * 100) : 0;

  return (
    <section className="min-h-full bg-zinc-950 px-6 py-6 text-white lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-300">Operations centre</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Railway operations, at a glance.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">Keep an eye on services, capacity, bookings, and the issues that need attention today.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/schedules" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200"><FaCalendarAlt /> Manage schedules</Link>
              <Link to="/admin/trains/add" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"><FaTrain /> Add train</Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Active services" value={activeTrains} detail={`${trains.length} trains in fleet`} icon={<FaTrain />} tone="red" />
          <StatsCard title="Confirmed bookings" value={confirmedBookings.length} detail={`${bookings.length} total booking records`} icon={<FaTicketAlt />} tone="emerald" />
          <StatsCard title="Confirmed revenue" value={formatCurrency(confirmedRevenue)} detail="Excludes pending and cancelled fares" icon={<FaUsers />} tone="sky" />
          <StatsCard title="Attention needed" value={delayedSchedules.length} detail={delayedSchedules.length ? "Delayed services require review" : "No delayed services reported"} icon={<FaClock />} tone="amber" />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3"><RevenueChart bookings={bookings} /></div>
          <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-lg shadow-black/10">
            <p className="text-sm font-semibold text-white">Network health</p>
            <p className="mt-1 text-sm text-zinc-400">A quick read on today’s operation</p>
            <div className="mt-7 space-y-5">
              <div><div className="mb-2 flex justify-between text-sm"><span className="text-zinc-300">Seat occupancy</span><span className="font-bold text-white">{occupancy}%</span></div><div className="h-2 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.min(100, occupancy)}%` }} /></div></div>
              <div className="rounded-xl border border-white/5 bg-zinc-950/60 p-4"><p className="text-2xl font-bold text-white">{schedules.filter((schedule) => schedule.status?.toLowerCase() === "on-time").length}</p><p className="mt-1 text-sm text-zinc-400">services currently on time</p></div>
              <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 p-4"><p className="text-sm font-semibold text-amber-100">{delayedSchedules.length ? `${delayedSchedules.length} delayed service${delayedSchedules.length > 1 ? "s" : ""}` : "No operational alerts"}</p><p className="mt-1 text-xs leading-5 text-zinc-400">{delayedSchedules.length ? "Review platform and passenger communications." : "Every scheduled service is currently on track."}</p></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3"><OccupancyChart bookings={bookings} trains={trains} /></div>
          <section className="xl:col-span-2 rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/10 sm:p-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-white">Upcoming departures</p><p className="mt-1 text-sm text-zinc-400">Next scheduled movements</p></div><Link to="/admin/schedules" className="text-sm font-semibold text-red-300 hover:text-red-200">View all</Link></div>
            <div className="mt-5 divide-y divide-white/5">
              {nextSchedules.length ? nextSchedules.map((schedule) => <div className="flex items-center gap-3 py-4" key={schedule.id}><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-800 text-red-300"><FaTrain /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white">{schedule.trainName || schedule.train || schedule.trainId} <FaArrowRight className="mx-1 inline text-xs text-zinc-500" /> {schedule.fromStation} → {schedule.toStation}</p><p className="mt-1 text-xs text-zinc-400">Platform {schedule.platform || "—"} · {formatTime(schedule.departureTime)}</p></div><StatusBadge status={schedule.status} /></div>) : <p className="py-10 text-center text-sm text-zinc-500">No departures scheduled.</p>}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-white/10 bg-zinc-900/80 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between p-5 sm:p-6"><div><p className="text-sm font-semibold text-white">Recent bookings</p><p className="mt-1 text-sm text-zinc-400">Latest passenger activity across the network</p></div><Link to="/admin/bookings" className="text-sm font-semibold text-red-300 hover:text-red-200">Open bookings</Link></div>
          <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-y border-white/5 bg-zinc-950/40 text-xs uppercase tracking-wider text-zinc-500"><tr><th className="px-5 py-3 font-medium">Passenger</th><th className="px-5 py-3 font-medium">Route</th><th className="px-5 py-3 font-medium">Fare</th><th className="px-5 py-3 font-medium">Status</th></tr></thead><tbody className="divide-y divide-white/5">{recentBookings.length ? recentBookings.map((booking) => <tr key={booking.id} className="text-zinc-300"><td className="px-5 py-4"><p className="font-medium text-white">{booking.passengerName || "Passenger"}</p><p className="mt-0.5 text-xs text-zinc-500">{booking.id}</p></td><td className="px-5 py-4 text-zinc-400"><FaMapMarkerAlt className="mr-1 inline text-red-400" /> {booking.fromStation || "—"} → {booking.toStation || "—"}</td><td className="px-5 py-4 font-medium text-white">{formatCurrency(booking.fare)}</td><td className="px-5 py-4"><StatusBadge status={booking.status} /></td></tr>) : <tr><td className="px-5 py-10 text-center text-zinc-500" colSpan="4">No booking data available.</td></tr>}</tbody></table></div>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;
