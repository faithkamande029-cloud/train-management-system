import { useState } from "react";
import { validateBookingForm } from "../../utils/validators";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

function BookingForm({ onAdd, isSubmitting = false }) {
  const [form, setForm] = useState({
    passengerName: "",
    email: "",
    phone: "",
    trainId: "",
    scheduleId: "",
    seatNumber: "",
    fare: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBookingForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd(form);
    // Reset form after successful submission (optional, depends on parent)
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
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">New Booking</h2>
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
        <Input
          label="Train ID"
          name="trainId"
          value={form.trainId}
          onChange={handleChange}
          error={errors.trainId}
          placeholder="e.g. TR-101"
          required
        />
        <Input
          label="Schedule ID"
          name="scheduleId"
          value={form.scheduleId}
          onChange={handleChange}
          error={errors.scheduleId}
          placeholder="e.g. SCH-001"
          required
        />
        <Input
          label="Seat Number"
          name="seatNumber"
          value={form.seatNumber}
          onChange={handleChange}
          error={errors.seatNumber}
          placeholder="e.g. A12"
          required
        />
        <Input
          label="Fare"
          type="number"
          name="fare"
          value={form.fare}
          onChange={handleChange}
          error={errors.fare}
          placeholder="e.g. 1500"
          required
        />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Book Ticket
        </Button>
      </form>
    </div>
  );
}

export default BookingForm;