import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

// Home page layout (with header)
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

// Authentication check
const isAuthenticated = () => !!localStorage.getItem("fakecheck_auth");

// Reusable motion wrapper for page transitions
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    style={{ minHeight: "100vh" }}
  >
    {children}
  </motion.div>
);

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated() ? (
              <PageTransition>
                <HomePage />
              </PageTransition>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated() ? (
              <PageTransition>
                <Profile />
              </PageTransition>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

// Main app
const App = () => (
  <Router>
    <AnimatedRoutes />
  </Router>
);

export default App;
