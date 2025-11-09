import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ showAuthButtons = false }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogin = () => { navigate("/login"); };
  const handleSignup = () => { navigate("/signup"); };


  return (
    <header
      style={{
        margin: "16px",
        borderRadius: "20px",
        height: "80px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        display: "flex",
        alignItems: "center",
        padding: "16px",
        position: "relative",
        border: "4px solid #ffffffff",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Left Side: Logo and Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            marginRight: 8,
            width: 42,
            height: 42,
            borderRadius: 8,
            background: "#a9cdffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          F
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 26, color: "#ffffff" }}>FakeCheck</div>
          <div
            style={{
              fontSize: 15,
              color: "#ffa181ff",
              fontWeight: 400,
              marginBottom: 3,
            }}
          >
            AI-powered fake news / hoax verification
          </div>
        </div>
      </div>

      {/* Right Side: Auth Buttons or Profile */}
      <div style={{ marginLeft: "auto", position: "relative", display: "flex", gap: "12px" }}>
        {showAuthButtons ? (
          <>
            <button
              onClick={handleLogin}
              style={{
                background: "transparent",
                border: "2px solid #ffffff",
                borderRadius: "10px",
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                padding: "8px 18px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
              onMouseOut={(e) => (e.target.style.background = "transparent")}
            >
              Login
            </button>

            <button
              onClick={handleSignup}
              style={{
                background: "#ffffff",
                border: "none",
                borderRadius: "10px",
                color: "#182848",
                fontWeight: "700",
                fontSize: "15px",
                padding: "8px 18px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#a9cdff")}
              onMouseOut={(e) => (e.target.style.background = "#ffffff")}
            >
              Signup
            </button>
          </>
        ) : (
          <button
            onClick={handleProfileClick}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: 8,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 56,
                height: 56,
                borderRadius: 999,
                border: "4px solid #ffffff",
                background: "#374151",
                textAlign: "center",
                lineHeight: "50px",
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              JD
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
