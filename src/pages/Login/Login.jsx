import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateLogin } from "../../utils/authRole";
import { TrainFront } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateLogin(email, password, role);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    login({ email, role: result.role, name: result.role === "admin" ? "Admin User" : "Regular User" });
    setError("");
    navigate(result.role === "admin" ? "/admin/users" : "/dashboard");
  };

  return (
    <section className="relative h-screen w-full 
    bg-[url(src/assets/red-door.jpg)] bg-cover bg-center 
    flex items-center justify-center px-6 "
    >
      <div className="absolute inset-0 bg-black/35"></div>
      <div className="relative z-10 bg-linear-to-b from-black/90 via-zinc-800 to-black/40 
      shadow-2xl rounded-2xl w-full max-w-xl h-[80vh] p-8 border-t-8  border-zinc-800"
      >
        <div className="flex flex-col overflow-hidden items-center mt-6">
          <TrainFront className="text-red-500 w-12 h-12 mb-3"/>
          <p className="text-white font-bold uppercase tracking-wider">
          Railway Management System  
          </p>        

        </div>
        

        <h2 className="text-3xl font-bold text-gray-100 mt-6">
          Staff Login
        </h2>

        <p className="text-gray-400 mt-3 mb-6">
          Sign in to access the railway management dashboard.
        </p>

      {/* sign in form */}
      <form className="space-y-5" onSubmit={handleSubmit}>

        <div>
          <label className="block text-gray-100 font-medium mb-3">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@railway.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-50"
          />
        </div>

        <div>
          <label className="block text-gray-100 font-medium mb-3">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3  placeholder:text-gray-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
        >
          Sign In
      </button>

      </form>
  </div>
</section>
  );
}

export default Login;
