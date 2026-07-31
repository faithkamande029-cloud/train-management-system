import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signUp(name, email, password, confirmPassword);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <section className="card p-5 bg-zinc-300 min-h-screen">

      <div className="text-center mb-7">
        <p className="font-bold text-3xl text-red-200 bg-red-600 rounded-lg p-1 tracking-wider mb-1">New Passenger</p>
        <h2 className="text-zinc-500 font-bold text-lg">Create your account</h2>
      </div>     

      <form className="w-full max-w-xl mx-auto rounded-2xl bg-zinc-800 border border-zinc-800 p-8 shadow-2xl space-y-5 flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="text-zinc-200 font-bold">
          Name
          <input 
            required 
            value={name} 
            onChange={(event) => setName(event.target.value)} 
            placeholder="Your name" 
            className="w-full border border-gray-600 rounded-lg px-4 py-3 font-normal placeholder:text-zinc-600"
          />
        </label>
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
          Password
          <input 
            required 
            type="password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
            placeholder="At least 6 characters" 
            className="w-full border border-zinc-600 rounded-lg px-4 py-3 font-normal placeholder:text-zinc-600"
          />
        </label>
        <label className="text-zinc-200 font-bold">
          Confirm password
          <input 
          required 
          type="password" 
          value={confirmPassword} 
          onChange={(event) => setConfirmPassword(event.target.value)} 
          className="w-full border border-gray-600 rounded-lg px-4 py-3 font-normal placeholder:text-zinc-600"
          />
        </label>

        {error ? <p className="error-text">{error}</p> : null}

        <button 
          type="submit" 
          className="bg-zinc-700 text-white font-semibold p-3 mt-4 rounded-lg hover:bg-red-600 transition "
        >
          Create account
        </button>
      </form>

      {/* Helper text */}
      <p className="helper-text flex flex-col gap-2 items-center mt-3">
        Already have an account? 
        <Link 
          to="/login"
          className=" bg-red-800 p-2.5 rounded-lg font-medium text-zinc-300 hover:bg-zinc-500"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}

export default SignUp;
