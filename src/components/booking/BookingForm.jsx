// src/components/booking/BookingForm.jsx

import { useState } from "react";

export default function BookingForm({ onAdd }) {
  const [form, setForm] = useState({
    passengerName: "",
    email: "",
    phone: "",
    trainId: "",
    scheduleId: "",
    seatNumber: "",
    fare: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      passengerName: "",
      email: "",
      phone: "",
      trainId: "",
      scheduleId: "",
      seatNumber: "",
      fare: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        New Booking
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="passengerName"
          value={form.passengerName}
          onChange={handleChange}
          placeholder="Passenger Full Name"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="trainId"
          value={form.trainId}
          onChange={handleChange}
          placeholder="Train ID"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="scheduleId"
          value={form.scheduleId}
          onChange={handleChange}
          placeholder="Schedule ID"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="seatNumber"
          value={form.seatNumber}
          onChange={handleChange}
          placeholder="Seat Number e.g. A12"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="fare"
          type="number"
          value={form.fare}
          onChange={handleChange}
          placeholder="Fare Amount e.g. 150"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-cyan-700 hover:bg-cyan-800 text-white p-3 rounded-lg transition"
        >
          Book Ticket
        </button>
      </form>
    </div>
  );
}