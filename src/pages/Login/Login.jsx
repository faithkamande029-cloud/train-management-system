import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateLogin } from "../../utils/authRole";
import redDoor from "../../assets/red-door.jpg";

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
    <section
      className="card relative h-screen w-full bg-cover bg-center flex items-center justify-center px-6"
      style={{ backgroundImage: `url(${redDoor})` }}
    >
      <div className="absolute inset-0 bg-black/45"></div>
      <div className="relative z-10 bg-linear-to-b from-black/90 via-zinc-800 to-black/40 
      shadow-2xl rounded-2xl w-full max-w-xl h-[80vh] p-8 border-t-8  border-zinc-800 text-white">

        <div className="text-center p-4">
          <p className="eyebrow text-3xl font-bold text-red-500">Access</p>
          <h2 className="text-zinc-300">User login</h2>
        </div>
        

        {/* sign in form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-3 mt-10">
            <div className=" text-xl">
            <label className="block text-gray-100 font-medium mb-3 text-center ">
            Sign in as
            <select 
              value={role} 
              onChange={(event) => setRole(event.target.value)}
              className="block mx-auto mt-2 bg-red-500 text-black rounded-lg p-1"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            
          </label>
          </div>
          
          <label className="block text-gray-100 mb-3">
            <span className="font-medium">Email</span>
            
            <input 
              type="email" value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              placeholder="user@railway.com" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3  placeholder:text-gray-50"
            />
          </label>
          <label className="block text-gray-100 mb-3">
            <span className="font-medium"> Password</span>
            <input 
              type="password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              placeholder="••••••••" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3  placeholder:text-gray-50"
            />
          </label>
          {error ? <p className="error-text">{error}</p> : null}
          <button 
            type="submit" 
            className="w-full bg-zinc-500 text-white font-semibold py-3 mt-4 rounded-lg hover:bg-red-600 transition"
          >
            Sign in
          </button>
            
          </div>
          
        </form>
        

      </div>
      
    </section>
  );
}

export default Login;
