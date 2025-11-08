import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock signup: store a simple token and username
    localStorage.setItem("fakecheck_auth", JSON.stringify({ email, username }));
    navigate("/home");
  };

  return (
    <div style={{ minHeight: "100vh", padding: 40, fontFamily: "Poppins, sans-serif", background: "#f9fafb" }}>
      <div style={{ maxWidth: 480, margin: "40px auto", background: "white", padding: 24, borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <h2>Create account</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} style={{ padding:10, borderRadius:6, border:"1px solid #e5e7eb" }} required />
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{ padding:10, borderRadius:6, border:"1px solid #e5e7eb" }} required />
          <button type="submit" style={{ padding:10, borderRadius:8, background:"#10b981", color:"white", border:"none", cursor:"pointer" }}>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
