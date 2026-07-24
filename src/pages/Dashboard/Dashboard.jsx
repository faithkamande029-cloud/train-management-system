import { useTrains, useBookings } from "../../hooks";
import StatsCard from "../../components/admin-dashboard/StatsCard";
import RevenueChart from "../../components/admin-dashboard/RevenueChart";
import OccupancyChart from "../../components/admin-dashboard/OccupancyChart";
import { FaTrain, FaUsers, FaTicketAlt, FaClock } from "react-icons/fa";
import Loader from "../../components/common/Loader/Loader";

function Dashboard() {
  const { data: trains, isLoading: trainsLoading } = useTrains();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();

  if (trainsLoading || bookingsLoading) return <Loader />;

  const totalBookings = bookings?.length || 0;
  const confirmed = bookings?.filter((b) => b.status === "confirmed").length || 0;
  const activeTrains = trains?.filter((t) => t.status === "active").length || 0;
  const delayed = 0; // placeholder

  return (
    <section className="space-y-8 p-6">
      <div>
        <p className="text-red-400 uppercase font-bold tracking-widest text-lg">Operations Overview</p>
        <h2 className="text-3xl font-bold mt-2">Today at a Glance</h2>
        <p className="text-zinc-400 mt-2">Monitor today's railway activities and performance.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Active Trains" value={activeTrains} icon={<FaTrain />} />
        <StatsCard title="Total Bookings" value={totalBookings} icon={<FaTicketAlt />} />
        <StatsCard title="Confirmed" value={confirmed} icon={<FaUsers />} />
        <StatsCard title="Delayed Services" value={delayed} icon={<FaClock />} growth="-2%" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart bookings={bookings} />
        <OccupancyChart bookings={bookings} trains={trains} />
      </div>
    </section>
  );
}

export default Dashboard;