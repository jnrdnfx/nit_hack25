import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/landing.css";

const Landing = () => {
  const featuresRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleLearnMore = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
    };
  }, []);

  const features = [
    {
      title: "Source Verification",
      description:
        "Verify if a source or article is genuine using our AI-powered checker.",
      icon: "🔍",
    },
    {
      title: "User Feedback",
      description:
        "Read what others think and leave your own feedback on sources.",
      icon: "💬",
    },
    {
      title: "Profile & History",
      description:
        "Track all your past verifications and comments in one place.",
      icon: "📁",
    },
    {
      title: "Community Insights",
      description:
        "See trending verified sources and community trust ratings.",
      icon: "🌐",
    },
  ];

  return (
    <div className="landing-container">
      <Header showAuthButtons={true} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 style={{}}>Welcome to FakeCheck</h1>
          <p style={{fontFamily:"merriweather, serif", fontSize:"25px"}}>Fake news spreads fast and distorts the truth. Our platform helps you cut through the noise by detecting and filtering unreliable content using <b style={{color:"#743200ff",fontWeight:"800"}}>cutting-edge AI</b>. Using smart verification and trusted sources, we make sure you see only credible, fact-checked stories. Stay informed - the right way.
</p>
          <button className="learn-more-btn" onClick={handleLearnMore}>
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`features-section ${visible ? "visible" : ""}`}
        ref={featuresRef}
      >
        <h2 style={{"fontSize":"2rem", "color":"#ffffff"}}>What You Can Do</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
