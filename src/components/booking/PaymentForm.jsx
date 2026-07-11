// src/components/booking/PaymentForm.jsx

import { useState } from "react";

export default function PaymentForm({ onPay, fare }) {
  const [form, setForm] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPay(form);
    setForm({
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paymentMethod: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Payment Details
      </h2>
      {fare && (
        <p className="text-cyan-700 font-semibold mb-6">
          Total Amount Due: ${Number(fare).toLocaleString()}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none text-gray-500"
        >
          <option value="" disabled>Select Payment Method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="mobile-money">Mobile Money</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
        <input
          name="cardHolderName"
          value={form.cardHolderName}
          onChange={handleChange}
          placeholder="Card Holder Name"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <input
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder="Card Number e.g. 1234 5678 9012 3456"
          maxLength={19}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <div className="flex gap-4">
          <input
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            placeholder="Expiry MM/YY"
            maxLength={5}
            required
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <input
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            placeholder="CVV"
            maxLength={3}
            required
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg transition"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
}