// src/components/common/Footer/Footer.jsx

import { Link } from "react-router-dom";
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaPhone, FaEnvelope, FaMapMarkerAlt
} from "react-icons/fa";
import { TrainFront } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 border-t border-zinc-700">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrainFront className="text-red-400 text-2xl" />
            <h3 className="text-xl font-bold">GARILM</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Your trusted railway management platform for seamless
            train scheduling, booking, and station administration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-red-400">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/trains" className="hover:text-white transition">
                Trains
              </Link>
            </li>
            <li>
              <Link to="/stations" className="hover:text-white transition">
                Stations
              </Link>
            </li>
            <li>
              <Link to="/schedules" className="hover:text-white transition">
                Schedules
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="hover:text-white transition">
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4 text-zinc-400">Contact Info</h4>
          <ul className="space-y-3 text-zinc-100 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-zinc-400" />
              Nairobi, Kenya
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-zinc-400" />
              +254 700 123 456
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-zinc-400" />
              info@railms.co.ke
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-semibold mb-4 text-zinc-400">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-red-700 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-red-700 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-red-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-red-700 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-400 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} RailMS. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;