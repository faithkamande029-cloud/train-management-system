// src/components/common/Navbar/Navbar.jsx

import { FaSearch, FaTrain } from "react-icons/fa";
import { TrainFront } from 'lucide-react';

function Navbar() {
  return (
    <div className="w-full bg-black px-6 py-4 flex justify-between items-center shadow-sm border-b border-zinc-400">

      {/* Left — Logo */}
      <div className="flex items-center gap-3">
        <FaTrain className="text-zinc-800 text-2xl" />
        <span className="text-white font-bold text-lg tracking-wide">
          GariLM
        </span>
      </div>

      {/* Center — Search */}
      <div className="flex items-center bg-gray-800 px-4 py-2 rounded-xl w-96">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search trains, stations, schedules..."
          className="bg-transparent outline-none ml-3 w-full text-white placeholder-gray-400"
        />
      </div>

      {/* Right — Bell + User */}
      <div className="flex items-center gap-5">
        <div className="relative cursor-pointer">
          <TrainFront className="text-red-500 text-xl hover:text-red-700 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="text-sm">
            <p className="text-white font-semibold">Admin</p>
            <p className="text-gray-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Navbar;
