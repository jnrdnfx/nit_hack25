import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LeftFeed from "./components/LeftFeed";
import RightPanel from "./components/RightPanel";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/homepage.css";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";

const HomePage = () => (
  <>
    <Header />
    <div className="homepage">
      <div>
        <LeftFeed />
      </div>
      <aside>
        <RightPanel />
      </aside>
    </div>
  </>
);

const App = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("fakecheck_auth");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
