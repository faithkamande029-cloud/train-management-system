import { useState, useEffect } from "react";
import { useAuth } from "../../hooks";  // ✅ FIXED: import from hooks
import { useTrains, useSchedules } from "../../hooks";
import { validateBookingForm } from "../../utils/validators";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

function BookingForm({
  onAdd,
  isSubmitting = false,
  preselectedSeats = [],
  preselectedFare = 0,
}) {
  const { user } = useAuth();
  const { data: trains } = useTrains();
  const { data: schedules } = useSchedules();

  const [form, setForm] = useState({
    passengerName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    trainId: "",
    scheduleId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        passengerName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationData = {
      passengerName: form.passengerName,
      email: form.email,
      phone: form.phone,
      trainId: form.trainId,
      scheduleId: form.scheduleId,
      seatNumber: preselectedSeats.join(", "),
      fare: preselectedFare,
    };

    const validationErrors = validateBookingForm(validationData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAdd({
      ...form,
      seatNumbers: preselectedSeats,
      fare: preselectedFare,
    });
  };

  // ─── FIXED: Compare as strings ─────────────────────────────
  const filteredSchedules = schedules?.filter(
    (s) => !form.trainId || String(s.trainId) === form.trainId
  );

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">Confirm Booking Details</h2>

      {preselectedSeats.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <p className="text-gray-400 text-sm">Selected Seats</p>
          <p className="text-white font-bold text-lg">
            {preselectedSeats.join(", ")}
          </p>
          <p className="text-amber-400 font-semibold">
            Total: Ksh {preselectedFare.toLocaleString()}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Passenger Name"
          name="passengerName"
          value={form.passengerName}
          onChange={handleChange}
          error={errors.passengerName}
          placeholder="Enter full name"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="email@example.com"
          required
        />

        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="0712345678"
          required
        />

        {/* Train dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Train <span className="text-red-400">*</span>
          </label>
          <select
            name="trainId"
            value={form.trainId}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 outline-none"
            required
          >
            <option value="">Select a train</option>
            {trains?.map((train) => (
              <option key={train.id} value={String(train.id)}>
                {train.name} ({train.type}) — {train.totalSeats} seats
              </option>
            ))}
          </select>
          {errors.trainId && (
            <p className="text-red-400 text-xs mt-1">{errors.trainId}</p>
          )}
        </div>

        {/* Schedule dropdown (filtered by selected train) */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Schedule <span className="text-red-400">*</span>
          </label>
          <select
            name="scheduleId"
            value={form.scheduleId}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 outline-none"
            required
          >
            <option value="">Select a schedule</option>
            {filteredSchedules?.map((schedule) => (
              <option key={schedule.id} value={String(schedule.id)}>
                {schedule.fromStation} → {schedule.toStation} ({schedule.departureTime})
              </option>
            ))}
          </select>
          {errors.scheduleId && (
            <p className="text-red-400 text-xs mt-1">{errors.scheduleId}</p>
          )}
          {filteredSchedules?.length === 0 && form.trainId && (
            <p className="text-yellow-400 text-xs mt-1">No schedules available for this train</p>
          )}
        </div>

        {/* Hidden fields */}
        <div className="hidden">
          <input type="hidden" name="seatNumbers" value={preselectedSeats.join(", ")} />
          <input type="hidden" name="fare" value={preselectedFare} />
        </div>

        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Confirm Booking
        </Button>
      </form>
    </div>
  );
}

export default BookingForm;