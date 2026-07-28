import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = resetPassword(email, password, confirmPassword);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/login", { state: { message: "Password updated. Sign in with your new password." } });
  };

  return (
    <section className="card p-5 bg-zinc-300 min-h-screen ">
      {/*  */}
      <div className="text-center mb-5 ">
        <p className="font-bold text-2xl tracking-wider text-red-900">Account Recovery</p>
        <h2 className="text-zinc-600 font-semibold">Reset your password</h2>
        <p className="text-zinc-800">Enter your account email and choose a new password.</p>

      </div>
      
      {/* stacked-form */}
      <form className="w-full max-w-xl mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl space-y-5 flex flex-col gap-2" onSubmit={handleSubmit}>

        <label className="text-zinc-200 font-bold">
          Email
          <input 
            required 
            type="email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            placeholder="you@example.com"
            className="w-full border border-gray-600 rounded-lg px-4 py-3 font-normal placeholder:text-zinc-600"
          />
        </label>
        <label className="text-zinc-200 font-bold">
          New password
          <input 
            required 
            type="password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
            placeholder="At least 6 characters" 
            className="w-full border border-gray-600 rounded-lg px-4 py-3 font-normal  placeholder:text-zinc-600"
          />
          </label>
        <label className="text-zinc-200 font-bold">
          Confirm new password
          <input 
            required 
            type="password" 
            value={confirmPassword} 
            onChange={(event) => setConfirmPassword(event.target.value)} 
            className="w-full border border-gray-600 rounded-lg px-4 py-3 placeholder:text-zinc-700 "
          />
        </label>

        {/*  */}
        {error ? <p className="error-text">{error}</p> : null}

        <button 
          type="submit" 
          className="bg-zinc-700 text-white font-semibold p-3 mt-4 rounded-lg hover:bg-red-600 transition "
        >
          Update password
        </button>
      </form>

      <p className="helper-text mt-4">
        <Link 
          to="/login"
          className=" bg-zinc-800 p-2.5 rounded-lg font-medium text-zinc-300 hover:bg-red-600"
        >Back to sign in</Link>
      </p>
    </section>
  );
}

export default ForgotPassword;
