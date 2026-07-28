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
    <section className="card">
      <p className="eyebrow">New passenger</p>
      <h2>Create your account</h2>
      <form className="stacked-form" onSubmit={handleSubmit}>
        <label>Name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label>
        <label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
        <label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></label>
        <label>Confirm password<input required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></label>
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="pill-button primary">Create account</button>
      </form>
      <p className="helper-text">Already have an account? <Link to="/login">Sign in</Link></p>
    </section>
  );
}

export default SignUp;
