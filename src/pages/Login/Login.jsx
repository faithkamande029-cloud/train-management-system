import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateLogin } from "../../utils/authRole";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
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
      <h2>{role === "admin" ? "Admin login" : "User login"}</h2>
      <form className="stacked-form" onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <button
            type="button"
            onClick={() => {
              setRole("user");
              setError("");
            }}
            aria-pressed={role === "user"}
            style={{
              flex: 1,
              border: role === "user" ? "1px solid #4f46e5" : "1px solid #cbd5e1",
              background: role === "user" ? "#4f46e5" : "#fff",
              color: role === "user" ? "#fff" : "#0f172a",
              padding: "0.65rem 0.9rem",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setError("");
            }}
            aria-pressed={role === "admin"}
            style={{
              flex: 1,
              border: role === "admin" ? "1px solid #4f46e5" : "1px solid #cbd5e1",
              background: role === "admin" ? "#4f46e5" : "#fff",
              color: role === "admin" ? "#fff" : "#0f172a",
              padding: "0.65rem 0.9rem",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Admin
          </button>
        </div>
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
      {user ? (
        <p className="helper-text">
          You are currently signed in as {user.role === "admin" ? "Admin" : "User"}. Select a role above and sign in to switch accounts.
        </p>
      ) : null}
      <p className="helper-text">Demo credentials: User - user@railway.com / user123, Admin - admin@railway.com / admin123</p>
    </section>
  );
}

export default Login;
