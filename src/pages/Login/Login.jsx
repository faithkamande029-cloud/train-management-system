import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateLogin } from "../../utils/authRole";

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
    <section className="card">
      <p className="eyebrow">Access</p>
      <h2>User login</h2>
      <form className="stacked-form" onSubmit={handleSubmit}>
        <label>
          Sign in as
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="user@railway.com" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="pill-button primary">Sign in</button>
      </form>
      <p className="helper-text">Demo credentials: User - user@railway.com / user123, Admin - admin@railway.com / admin123</p>
    </section>
  );
}

export default Login;
