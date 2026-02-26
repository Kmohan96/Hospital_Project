import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { getPreferredRole, normalizeRole, setAuthToken, setPreferredRole, setUserRole } from "../../utils/auth";
import "./LoginForm.css";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get("role") || getPreferredRole() || "";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login/", formData);

      const resolvedRole = normalizeRole(res.data?.user?.role || selectedRole);
      const expectedRole = selectedRole ? normalizeRole(selectedRole) : "";

      if (expectedRole && resolvedRole !== expectedRole) {
        const portalName = expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1);
        const accountPortalName = resolvedRole.charAt(0).toUpperCase() + resolvedRole.slice(1);
        const message = `This account belongs to ${accountPortalName} portal. Please login from ${portalName} portal.`;
        setError(message);
        alert(message);
        return;
      }

      setAuthToken(res.data.token);
      setUserRole(resolvedRole);
      setPreferredRole(resolvedRole);

      if (["doctor", "admin"].includes(resolvedRole)) {
        navigate("/doctor-dashboard");
      } else if (resolvedRole === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/patient-dashboard");
      }

    } catch (err) {
      console.log("Login Error:", err.response?.data);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to continue to your {selectedRole || "selected"} dashboard.
        </p>

        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="login-input"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="login-link">
          Don't have an account? <Link to={`/register?role=${selectedRole || "patient"}`}>Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
