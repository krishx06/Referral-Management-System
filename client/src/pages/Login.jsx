import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/main.css";

function Login() {
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
      <div className="login-card">
        <h2 className="login-title">Referral Management System</h2>
        <p className="login-subtitle">Login to continue</p>

        <div className="login-test-box">
          <p><strong>Test Credentials</strong></p>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
