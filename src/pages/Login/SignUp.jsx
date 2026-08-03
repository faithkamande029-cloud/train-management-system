import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function SignUp() {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value
      .split("")
      .filter((character) => /\d|\+/.test(character))
      .join("");
    const normalizedValue = sanitizedValue.startsWith("+")
      ? `+${sanitizedValue.slice(1).replace(/\+/g, "")}`
      : sanitizedValue.replace(/\+/g, "");
    setPhone(normalizedValue);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!name.trim()) nextErrors.name = "Full name is required.";
    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (!phone.trim()) nextErrors.phone = "Phone number is required.";
    else if (!/^\+?\d+$/.test(phone)) {
      nextErrors.phone = "Phone number can only contain digits and an optional leading +.";
    } else if (phone.replace(/^\+/, "").length < 10) {
      nextErrors.phone = "Phone number must contain at least 10 digits.";
    }
    if (!password) nextErrors.password = "Password is required.";
    if (!confirmPassword) nextErrors.confirmPassword = "Please confirm your password.";
    else if (password && password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setValidationErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setError("");
      return;
    }

    const result = await signUp(name, email, password, confirmPassword, { firstName, lastName, phone });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/dashboard");
  };

  const renderField = (label, value, onChange, type = "text", placeholder = "", errorKey) => (
    <label className="text-sm font-semibold text-zinc-200">
      <span className="mb-2 block">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-3 font-normal text-zinc-100 placeholder:text-zinc-500 ${validationErrors[errorKey] ? "border-red-400" : "border-zinc-600"}`}
      />
      {validationErrors[errorKey] ? <p className="mt-2 text-sm text-red-300">{validationErrors[errorKey]}</p> : null}
    </label>
  );

  return (
    <section className="min-h-screen bg-zinc-300 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 rounded-lg bg-red-600 px-3 py-2 text-3xl font-bold tracking-wider text-red-100">New Passenger</p>
        <h2 className="text-lg font-bold text-zinc-600">Create your account</h2>
      </div>

      <form className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-800 p-6 shadow-2xl sm:p-8" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          {renderField("Full Name", name, (event) => setName(event.target.value), "text", "Your full name", "name")}
          {renderField("Email", email, (event) => setEmail(event.target.value), "email", "you@example.com", "email")}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {renderField("First Name", firstName, (event) => setFirstName(event.target.value), "text", "First name", "firstName")}
          {renderField("Last Name", lastName, (event) => setLastName(event.target.value), "text", "Last name", "lastName")}
        </div>

        <label className="text-sm font-semibold text-zinc-200">
          <span className="mb-2 block">Phone Number</span>
          <input
            required
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="0712345678 or +254712345678"
            className={`w-full rounded-lg border px-4 py-3 font-normal text-zinc-100 placeholder:text-zinc-500 ${validationErrors.phone ? "border-red-400" : "border-zinc-600"}`}
          />
          {validationErrors.phone ? <p className="mt-2 text-sm text-red-300">{validationErrors.phone}</p> : null}
          <p className="mt-2 text-sm text-zinc-400">Use digits only, or start with + followed by digits.</p>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          {renderField("Password", password, (event) => setPassword(event.target.value), "password", "At least 6 characters", "password")}
          {renderField("Confirm password", confirmPassword, (event) => setConfirmPassword(event.target.value), "password", "Repeat your password", "confirmPassword")}
        </div>

        {error ? <p className="rounded-lg border border-red-400/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">{error}</p> : null}

        <button type="submit" className="mt-2 rounded-lg bg-zinc-700 px-4 py-3 font-semibold text-white transition hover:bg-red-600">
          Create account
        </button>
      </form>

      <p className="mt-4 flex flex-col items-center gap-2 text-sm text-zinc-600">
        Already have an account?
        <Link to="/login" className="rounded-lg bg-red-800 px-3 py-2 font-medium text-zinc-200 transition hover:bg-zinc-500">
          Sign in
        </Link>
      </p>
    </section>
  );
}

export default SignUp;
