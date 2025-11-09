import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // optional if you plan to style login/signup together

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation (you can add Firebase or API logic later)
    if (email && password) {
      // Simulate login success
      localStorage.setItem("fakecheck_auth", "true");

      // Navigate to home
      navigate("/home");

      // Force reactivity for components using isAuth
      window.dispatchEvent(new Event("storage"));
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#1e3a8a" }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Log In
        </button>

        <p style={{ textAlign: "center", fontSize: "14px" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
