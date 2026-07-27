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
    <section className="card">
      <p className="eyebrow">Account recovery</p>
      <h2>Reset your password</h2>
      <p className="helper-text">Enter your account email and choose a new password.</p>
      <form className="stacked-form" onSubmit={handleSubmit}>
        <label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
        <label>New password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></label>
        <label>Confirm new password<input required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></label>
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="pill-button primary">Update password</button>
      </form>
      <p className="helper-text"><Link to="/login">Back to sign in</Link></p>
    </section>
  );
}

export default ForgotPassword;
