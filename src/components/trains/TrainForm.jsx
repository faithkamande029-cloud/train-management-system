// src/components/trains/TrainForm.jsx

import { useState } from "react";

export default function TrainForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    totalSeats: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", type: "", totalSeats: "", status: "" });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add Train
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Train Name e.g. Express 101"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none text-gray-500"
        >
          <option value="" disabled>Select Train Type</option>
          <option value="express">Express</option>
          <option value="intercity">Intercity</option>
          <option value="regional">Regional</option>
          <option value="freight">Freight</option>
        </select>
        <input
          name="totalSeats"
          type="number"
          value={form.totalSeats}
          onChange={handleChange}
          placeholder="Total Seats e.g. 200"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none text-gray-500"
        >
          <option value="" disabled>Select Status</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg transition"
        >
          Add Train
        </button>
      </form>
    </div>
  );
}