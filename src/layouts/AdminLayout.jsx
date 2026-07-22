// src/layouts/AdminLayout.jsx

import { Link, useLocation } from "react-router-dom";
import {
  FaTrain, FaHome, FaCalendarAlt,
  FaUsers, FaChartBar, FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import AdminNavbar from "../components/common/Navbar/AdminNavbar";
import Footer from "../components/common/Footer/Footer";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
  { path: "/admin/trains", label: "Trains", icon: <FaTrain /> },
  { path: "/admin/stations", label: "Stations", icon: <FaMapMarkerAlt /> },
  { path: "/admin/schedules", label: "Schedules", icon: <FaCalendarAlt /> },
  { path: "/admin/bookings", label: "Bookings", icon: <MdEventSeat /> },
  { path: "/admin/users", label: "Users", icon: <FaUsers /> },
  { path: "/admin/reports", label: "Reports", icon: <FaChartBar /> },
];

function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-200">
      <AdminNavbar />

      <div className="flex flex-1">
        <aside className="hidden min-h-full w-64 border-r border-gray-800 bg-zinc-900 p-4 md:block">
          <p className="mb-4 px-2 text-xs uppercase tracking-widest text-gray-500">Admin Panel</p>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${location.pathname === item.path ? "bg-red-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;