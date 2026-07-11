// src/components/schedule/ScheduleForm.jsx

import { useState } from "react";

export default function ScheduleForm({ onAdd }) {
  const [form, setForm] = useState({
    trainId: "",
    fromStation: "",
    toStation: "",
    departureTime: "",
    arrivalTime: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      trainId: "",
      fromStation: "",
      toStation: "",
      departureTime: "",
      arrivalTime: "",
      status: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add Schedule
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="trainId"
          value={form.trainId}
          onChange={handleChange}
          placeholder="Train ID e.g. 1"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="fromStation"
          value={form.fromStation}
          onChange={handleChange}
          placeholder="From Station e.g. Central Station"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="toStation"
          value={form.toStation}
          onChange={handleChange}
          placeholder="To Station e.g. Westlands"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="departureTime"
          type="time"
          value={form.departureTime}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none text-gray-500"
        />
        <input
          name="arrivalTime"
          type="time"
          value={form.arrivalTime}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none text-gray-500"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none text-gray-500"
        >
          <option value="" disabled>Select Status</option>
          <option value="on-time">On Time</option>
          <option value="delayed">Delayed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg transition"
        >
          Add Schedule
        </button>
      </form>
    </div>
  );
}