import { useTrains, useBookings, useStations, useSchedules } from "../../hooks";
import StatsCard from "../../components/admin-dashboard/StatsCard";
import RevenueChart from "../../components/admin-dashboard/RevenueChart";
import OccupancyChart from "../../components/admin-dashboard/OccupancyChart";
import { FaTrain, FaTicketAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import Loader from "../../components/common/Loader/Loader";
import { formatCurrency } from "../../utils/dateFormatter";

function Reports() {
  const { data: trains, isLoading: trainsLoading } = useTrains();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  const { data: stations, isLoading: stationsLoading } = useStations();
  const { data: schedules, isLoading: schedulesLoading } = useSchedules();

  if (trainsLoading || bookingsLoading || stationsLoading || schedulesLoading) {
    return <Loader />;
  }

  const totalRevenue = bookings?.filter(b => b.status === "confirmed")
    .reduce((sum, b) => sum + Number(b.fare || 0), 0) || 0;

  const activeTrains = trains?.filter(t => t.status === "active").length || 0;
  const totalBookings = bookings?.length || 0;
  const totalStations = stations?.length || 0;
  const totalSchedules = schedules?.length || 0;

  return (
    <section className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
      <div className="p-1">
        <p className="text-red-400 uppercase tracking-widest font-semibold">Performance Reports</p>
        <h2 className="mt-2 text-3xl font-bold text-zinc-100">Daily Operations Summary</h2>
        <p className="mt-2 text-zinc-400">View today's operational performance across the railway network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={<FaMoneyBillWave />} />
        <StatsCard title="Active Trains" value={activeTrains} icon={<FaTrain />} />
        <StatsCard title="Total Bookings" value={totalBookings} icon={<FaTicketAlt />} />
        <StatsCard title="Stations" value={totalStations} icon={<FaMapMarkerAlt />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart bookings={bookings} />
        <OccupancyChart bookings={bookings} trains={trains} />
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Total Schedules</p>
            <p className="text-2xl font-bold text-red-400">{totalSchedules}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Confirmed Bookings</p>
            <p className="text-2xl font-bold text-green-400">{bookings?.filter(b => b.status === "confirmed").length || 0}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">{bookings?.filter(b => b.status === "pending").length || 0}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Cancelled</p>
            <p className="text-2xl font-bold text-zinc-500">{bookings?.filter(b => b.status === "cancelled").length || 0}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reports;
