// src/layouts/AdminLayout.jsx

import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaTrain, FaHome, FaCalendarAlt,
  FaUsers, FaChartBar, FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";
import { Outdent } from "lucide-react";

const navItems = [
  { path: "/admin/dashboard",    label: "Dashboard",  icon: <FaHome />         },
  { path: "/admin/trains",             label: "Trains",     icon: <FaTrain />        },
  { path: "admin/stations",           label: "Stations",   icon: <FaMapMarkerAlt /> },
  { path: "/admin/schedules",          label: "Schedules",  icon: <FaCalendarAlt />  },
  { path: "/admin/bookings",           label: "Bookings",   icon: <MdEventSeat />    },
  { path: "/admin/users",        label: "Users",      icon: <FaUsers />        },
  { path: "/admin/reports",      label: "Reports",    icon: <FaChartBar />     },
];

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
    
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-zinc-900 border-r border-gray-800 min-h-full p-4 hidden md:block">
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
                    ? "bg-zinc-800 text-white border-l-4 border-red-500"
                    : "text-gray-400 hover:bg-zinc-800 hover:text-white"
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
          <Outlet/>
        </main>
      </div>

      
    </div>
  );
}

export default AdminLayout;