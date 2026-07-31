import { useState } from "react";
import { validateTrainForm } from "../../utils/validators";

function TrainForm({ onAdd, isSubmitting = false }) {
  const [form, setForm] = useState({
    name: "",
    type: "express",
    totalSeats: "",
    status: "active",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateTrainForm(form);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setErrors({});
    const payload = {
      ...form,
      totalSeats: Number(form.totalSeats),
    };
    if (onAdd) onAdd(payload);
  };

  return (
    <form className="mt-6 space-y-5 rounded-2xl bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block font-medium text-gray-700">Train Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
          placeholder="Express 101"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">Type</label>
        <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-3">
          <option value="express">Express</option>
          <option value="intercity">Intercity</option>
          <option value="regional">Regional</option>
          <option value="freight">Freight</option>
        </select>
        {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type}</p>}
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">Total Seats</label>
        <input
          name="totalSeats"
          value={form.totalSeats}
          onChange={handleChange}
          type="number"
          min="1"
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
          placeholder="200"
        />
        {errors.totalSeats && <p className="text-sm text-red-500 mt-1">{errors.totalSeats}</p>}
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-3">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
        {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status}</p>}
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">Image URL (optional)</label>
        <input name="image" value={form.image} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-3" placeholder="https://example.com/train.jpg" />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-red-600">
        {isSubmitting ? "Saving..." : "Save Train"}
      </button>
    </form>
  );
}

export default TrainForm;
