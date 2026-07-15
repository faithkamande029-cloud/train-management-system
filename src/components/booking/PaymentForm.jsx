import { useState } from "react";
import { validatePaymentForm } from "../../utils/validators";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import { PAYMENT_METHODS } from "../../utils/constants";
import { formatCurrency } from "../../utils/dateFormatter";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function PaymentForm({ onPay, fare, isSubmitting = false }) {
  const [form, setForm] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePaymentForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Remove CVV before sending to parent
    const { cvv, ...safeData } = form;
    onPay(safeData);
    // Reset form after successful submission
    setForm({
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paymentMethod: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-2 text-white">Payment Details</h2>
      {fare && (
        <p className="text-amber-400 font-semibold mb-6">
          Total Amount Due: {formatCurrency(fare)}
        </p>
      )}
      <div className="mb-6">
        <Cards
          number={form.cardNumber || ""}
          expiry={form.expiryDate || ""}
          cvc={form.cvv || ""}
          name={form.cardHolderName || ""}
          focused={focus}
          placeholders={{ name: "CARD HOLDER NAME" }}
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Payment Method *
          </label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 outline-none"
            required
          >
            <option value="">Select Payment Method</option>
            {PAYMENT_METHODS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.paymentMethod && (
            <p className="text-red-400 text-xs mt-1">{errors.paymentMethod}</p>
          )}
        </div>

        <Input
          label="Card Holder Name"
          name="cardHolderName"
          value={form.cardHolderName}
          onChange={handleChange}
          error={errors.cardHolderName}
          placeholder="John Doe"
          onFocus={() => setFocus("name")}
          required
        />
        <Input
          label="Card Number"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          error={errors.cardNumber}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          onFocus={() => setFocus("number")}
          required
        />
        <div className="flex gap-4">
          <Input
            label="Expiry Date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            error={errors.expiryDate}
            placeholder="MM/YY"
            maxLength={5}
            onFocus={() => setFocus("expiry")}
            className="w-1/2"
            required
          />
          <Input
            label="CVV"
            type="password"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            error={errors.cvv}
            placeholder="•••"
            maxLength={4}
            onFocus={() => setFocus("cvc")}
            className="w-1/2"
            required
          />
        </div>
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Confirm Payment
        </Button>
      </form>
    </div>
  );
}

export default PaymentForm;