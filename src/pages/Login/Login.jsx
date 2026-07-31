import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import redDoor from "../../assets/red-door.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(email, password, role);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    navigate(result.role === "admin" ? "/admin/dashboard" : "/dashboard");

  }

  return (
    <section
      className="card relative h-screen w-full bg-cover bg-center flex items-center justify-center px-6"
      style={{ backgroundImage: `url(${redDoor})` }}
    >
      <div className="absolute inset-0 bg-black/45"></div>
      <div className="relative z-10 bg-linear-to-b  from-black/90 via-zinc-800 to-black/40 
      shadow-2xl rounded-2xl w-full max-w-xl h-[80vh] p-8 border-t-8  border-zinc-800 text-white">

        <div className="text-center p-4">
          <p className="eyebrow text-3xl font-bold text-red-500">Access</p>
          <h2 className="text-zinc-300">User login</h2>
        </div>
        

        {/* sign in form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-3 mt-10">
              <div className=" text-xl">
              <label className="block text-gray-100 mb-3 text-center ">
              Sign in as
              <select 
                value={role} 
                onChange={(event) => setRole(event.target.value)}
                className="block mx-auto mt-2 bg-red-500 text-zinc-300 rounded-lg p-1 "
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              
            </label>
            </div>
            
          </div>

          {/* email rebramd */}
          <div>
            <label className="block text-gray-100 mb-3">
               Email
              <input 
                type="email" 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} 
                placeholder="user@railway.com" 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3  placeholder:text-gray-200"
              />
            </label>
            <label className="block text-gray-100 mb-3">
              Password
              <input 
                type="password" 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} 
                placeholder="••••••••" 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3  placeholder:text-gray-200"
              />
            </label>

          </div>
          
          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" className="w-full bg-zinc-500 text-white font-semibold py-3 mt-4 rounded-lg hover:bg-red-600 transition">Sign in</button>
        </form>

        <div className="mt-4 border-t border-zinc-700 pt-5 text-center">
          <p className="text-sm text-zinc-400">
            <Link 
              to="/forgot-password"
              className="font-medium text-red-400 hover:text-red-300 hover:underline transition"
            >
              Forgot password?</Link> 
              
              <span className="mx-3 text-zinc-600">.</span> 
            <Link 
              to="/sign-up"
              className="font-medium text-red-400 hover:text-red-300 hover:underline transition"
            >
              Create an account
            </Link>
          </p>

        </div>
        
        {user ? (
          <p className="helper-text">
            You are currently signed in as {user.role === "admin" ? "Admin" : "User"}. Select a role above and sign in to switch accounts.
          </p>
        ) : null}

        
      </div>
    </section>
  );
}

export default Login;
