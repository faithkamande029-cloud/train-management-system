import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import redDoor from "../../assets/red-door.jpg";

function Login({ adminOnly = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const role = adminOnly ? "admin" : "user";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(email, password, role);

    if (!result.ok) {
      setError(adminOnly ? "Unable to sign in with those credentials." : result.error);
      return;
    }

    setError("");
    navigate(result.role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center px-4 py-8 sm:px-6"
      style={{ backgroundImage: `url(${redDoor})` }}
    >
      <div className="absolute inset-0 bg-zinc-950/80" />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="mb-7 text-center">
          <div className={`mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl ${adminOnly ? "bg-red-500/15 text-red-300" : "bg-zinc-800 text-zinc-100"}`}>
            {adminOnly ? <ShieldCheck className="h-6 w-6" /> : <LockKeyhole className="h-6 w-6" />}
          </div>
          <div className={`mx-auto mb-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${adminOnly ? "bg-red-500/15 text-red-300" : "bg-zinc-800 text-zinc-300"}`}>
            {adminOnly ? "Restricted admin portal" : "Customer portal"}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">GariLM</p>
          <h1 className="mt-2 text-2xl font-bold">{adminOnly ? "Administrator sign in" : "Welcome back"}</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {adminOnly ? "Use your authorized credentials to access operations, bookings, and reporting tools." : "Sign in to manage your journeys and bookings."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-zinc-200">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={adminOnly ? "admin@company.com" : "you@example.com"}
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            />
          </label>

          {error ? <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">{error}</p> : null}

          <button type="submit" className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-zinc-950">
            {adminOnly ? "Access administration" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 border-t border-zinc-800 pt-5 text-center">
          {adminOnly ? (
            <div className="space-y-2 text-sm text-zinc-400">
              <Link to="/login" className="inline-flex items-center gap-2 font-medium text-zinc-300 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Return to customer sign in
              </Link>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Only authorized staff can continue</p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <Link to="/forgot-password" className="font-medium text-red-300 hover:text-red-200">Forgot password?</Link>
              <span className="text-zinc-600">·</span>
              <Link to="/sign-up" className="font-medium text-red-300 hover:text-red-200">Create an account</Link>
              <span className="text-zinc-600">·</span>
              <Link to="/admin/login" className="font-medium text-zinc-300 transition hover:text-white">Admin sign in</Link>
            </div>
          )}
        </div>

        {user ? <p className="mt-4 text-center text-xs text-zinc-500">You are signed in as {user.role === "admin" ? "an administrator" : "a customer"}.</p> : null}
      </div>
    </section>
  );
}

export default Login;
