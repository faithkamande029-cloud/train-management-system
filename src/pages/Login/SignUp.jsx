import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import redDoor from "../../assets/red-door.jpg";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const result = signUp(name, email, password, confirmPassword);
    if (!result.ok) return setError(result.error);
    navigate("/dashboard");
  };

  return (
    <section className="card relative min-h-screen w-full bg-cover bg-center flex items-center justify-center px-6" style={{ backgroundImage: `url(${redDoor})` }}>
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 bg-linear-to-b from-black/90 via-zinc-800 to-black/40 shadow-2xl rounded-2xl w-full max-w-xl p-8 border-t-8 border-zinc-800 text-white">
        <div className="text-center p-4"><p className="eyebrow text-3xl font-bold text-red-500">TrainU</p><h2 className="text-zinc-300">Create your account</h2></div>
        <form className="space-y-4" onSubmit={submit}>
          <label className="block">Name<input required className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1" value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label className="block">Email<input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="block">Password<input required type="password" className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1" placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <label className="block">Confirm password<input required type="password" className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></label>
          {error ? <p className="error-text">{error}</p> : null}
          <button type="submit" className="w-full bg-zinc-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition">Create account</button>
        </form>
        <p className="text-center text-sm mt-5">Already have an account? <Link className="text-red-400 hover:text-red-300" to="/login">Sign in</Link></p>
      </div>
    </section>
  );
}

export default SignUp;
