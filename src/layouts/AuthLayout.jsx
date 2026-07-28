// src/layouts/AuthLayout.jsx

import { FaTrain } from "react-icons/fa";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaTrain className="text-cyan-400 text-3xl" />
          <span className="text-white font-bold text-2xl tracking-wide">
            RailMS
          </span>
        </div>

        {/* AUTH CARD */}
        <div className="bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl p-8">
          {children}
        </div>

        {/* FOOTER TEXT */}
        <p className="text-center text-gray-600 text-xs mt-6">
          &copy; {new Date().getFullYear()} RailMS. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default AuthLayout;