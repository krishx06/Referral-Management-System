import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/main.css";

function Login({ onSwitch }) {
  const { login } = useAuth();

  const TEST_EMAIL = "krish@test.com";
  const TEST_PASSWORD = "password123";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form);
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setForm({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    setError("");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Referral Management</h1>
        <p>Track and manage candidate referrals</p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>

          <div className="login-test-box">
            <strong>Test Credentials</strong>
            <p>Email: <code>{TEST_EMAIL}</code></p>
            <p>Password: <code>{TEST_PASSWORD}</code></p>
            <button
              type="button"
              className="test-credentials-btn"
              onClick={fillTestCredentials}
            >
              Use Test Credentials
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit} className="login-form">
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="login-switch">
            New user?{" "}
            <button type="button" className="link-btn" onClick={onSwitch}>
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
