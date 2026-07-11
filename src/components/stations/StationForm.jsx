// src/components/stations/StationForm.jsx

import { useState } from "react";

export default function StationForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    city: "",
    platform: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", code: "", city: "", platform: "" });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add Station
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Station Name e.g. Central Station"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Station Code e.g. CTL"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City e.g. Nairobi"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="platform"
          type="number"
          value={form.platform}
          onChange={handleChange}
          placeholder="Number of Platforms e.g. 4"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg transition"
        >
          Add Station
        </button>
      </form>
    </div>
  );
}