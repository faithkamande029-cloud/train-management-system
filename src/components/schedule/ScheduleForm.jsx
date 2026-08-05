import { useEffect, useState } from "react";
import { validateScheduleForm } from "../../utils/validators";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import { SCHEDULE_STATUSES } from "../../utils/constants";

const EMPTY_FORM = {
  trainId: "",
  fromStation: "",
  toStation: "",
  departureTime: "",
  arrivalTime: "",
  status: "",
};

function ScheduleForm({ onAdd, initialData = null, onCancel, isSubmitting = false }) {
  const [form, setForm] = useState(() => initialData
    ? {
        ...EMPTY_FORM,
        ...initialData,
        trainId: String(initialData.trainId ?? initialData.train_id ?? ""),
        fromStation: initialData.fromStation ?? initialData.from_station ?? "",
        toStation: initialData.toStation ?? initialData.to_station ?? "",
        departureTime: initialData.departureTime ?? initialData.departure_time?.slice(0, 5) ?? "",
        arrivalTime: initialData.arrivalTime ?? initialData.arrival_time?.slice(0, 5) ?? "",
        status: initialData.status || "",
      }
    : EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setForm(EMPTY_FORM);
      return;
    }

    setForm({
      ...EMPTY_FORM,
      ...initialData,
      trainId: String(initialData.trainId ?? initialData.train_id ?? ""),
      fromStation: initialData.fromStation ?? initialData.from_station ?? "",
      toStation: initialData.toStation ?? initialData.to_station ?? "",
      departureTime: initialData.departureTime ?? initialData.departure_time?.slice(0, 5) ?? "",
      arrivalTime: initialData.arrivalTime ?? initialData.arrival_time?.slice(0, 5) ?? "",
      status: initialData.status || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateScheduleForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd(form);
    if (!initialData) setForm(EMPTY_FORM);
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">{initialData ? "Edit Schedule" : "Add Schedule"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Train ID"
          name="trainId"
          value={form.trainId}
          onChange={handleChange}
          error={errors.trainId}
          placeholder="Train ID e.g. 1"
          required
        />
        <Input
          label="From Station"
          name="fromStation"
          value={form.fromStation}
          onChange={handleChange}
          error={errors.fromStation}
          placeholder="From Station e.g. Central Station"
          required
        />
        <Input
          label="To Station"
          name="toStation"
          value={form.toStation}
          onChange={handleChange}
          error={errors.toStation}
          placeholder="To Station e.g. Westlands"
          required
        />
        <Input
          label="Departure Time"
          type="time"
          name="departureTime"
          value={form.departureTime}
          onChange={handleChange}
          error={errors.departureTime}
          required
        />
        <Input
          label="Arrival Time"
          type="time"
          name="arrivalTime"
          value={form.arrivalTime}
          onChange={handleChange}
          error={errors.arrivalTime}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Status *
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-zinc-600 bg-zinc-500/30 text-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
            required
          >
            <option value="">Select Status</option>
            {SCHEDULE_STATUSES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status}</p>}
        </div>
        <div className="flex gap-3">
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            {initialData ? "Save Schedule" : "Add Schedule"}
          </Button>
          {initialData && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
        </div>
      </form>
    </div>
  );
}

export default ScheduleForm;
