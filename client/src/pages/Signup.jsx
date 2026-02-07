import { useState } from "react";
import { register } from "../api/auth.api";
import "../styles/main.css";

function Signup({ onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form);
      alert("Account created! Please sign in.");
      onSwitch();
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Referral Management</h1>
        <p>Track and manage candidate referrals</p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Get started with your account</p>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="login-switch">
            Already have an account?{" "}
            <button type="button" className="link-btn" onClick={onSwitch}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
