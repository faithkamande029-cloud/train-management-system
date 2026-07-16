import { useState } from "react";
import { validateStationForm } from "../../utils/validators";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

function StationForm({ onAdd, isSubmitting = false }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    city: "",
    platform: "",
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
    const validationErrors = validateStationForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd(form);
    setForm({ name: "", code: "", city: "", platform: "" });
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">Add Station</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Station Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Station Name e.g. Central Station"
          required
        />
        <Input
          label="Station Code"
          name="code"
          value={form.code}
          onChange={handleChange}
          error={errors.code}
          placeholder="Station Code e.g. CTL"
          required
        />
        <Input
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
          placeholder="City e.g. Nairobi"
          required
        />
        <Input
          label="Number of Platforms"
          type="number"
          name="platform"
          value={form.platform}
          onChange={handleChange}
          error={errors.platform}
          placeholder="e.g. 4"
          required
        />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Add Station
        </Button>
      </form>
    </div>
  );
}

export default StationForm;