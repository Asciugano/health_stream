import React, { useState } from "react";
import axios from "axios";

function LoginComponent({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [viewPsw, setViewPasswd] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8000/login", formData);

      const { access_token, token_type } = res.data;
      localStorage.setItem("token", access_token);

      if (onLogin) onLogin(access_token);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.detail || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password</label>
          <span>
            <input
              type={viewPsw ? "text" : "password"}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button onClick={(e) => {
              e.preventDefault();
              setViewPasswd(!viewPsw);
            }}>view</button>
          </span>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ marginTop: 15 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default LoginComponent;

