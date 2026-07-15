// src/layouts/AdminLayout.jsx

import { Link, useLocation } from "react-router-dom";
import {
  FaTrain, FaHome, FaCalendarAlt,
  FaUsers, FaChartBar, FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";

const navItems = [
  { path: "/dashboard",    label: "Dashboard",  icon: <FaHome />         },
  { path: "/trains",       label: "Trains",     icon: <FaTrain />        },
  { path: "/stations",     label: "Stations",   icon: <FaMapMarkerAlt /> },
  { path: "/schedules",    label: "Schedules",  icon: <FaCalendarAlt />  },
  { path: "/bookings",     label: "Bookings",   icon: <MdEventSeat />    },
  { path: "/admin/users",  label: "Users",      icon: <FaUsers />        },
  { path: "/admin/reports",label: "Reports",    icon: <FaChartBar />     },
];

function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-full p-4 hidden md:block">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-4 px-2">
            Admin Menu
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${location.pathname === item.path
                    ? "bg-cyan-700 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;