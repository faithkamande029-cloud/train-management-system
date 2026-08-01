// src/layouts/AdminLayout.jsx

import { Link, useLocation } from "react-router-dom";
import {
  FaTrain, FaHome, FaCalendarAlt,
  FaUsers, FaChartBar, FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import AdminNavbar from "../components/common/Navbar/AdminNavbar";

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <AdminNavbar />

      <div className="flex min-h-[calc(100vh-4rem)] bg-zinc-950">
        <aside className="fixed left-0 top-16 bottom-0 z-30 hidden w-64 shrink-0 border-r border-zinc-800 bg-zinc-900 p-4 md:flex md:flex-col">
          <p className="mb-4 px-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Admin Panel</p>
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

        <main className="flex-1 p-6 md:ml-64 md:pl-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;