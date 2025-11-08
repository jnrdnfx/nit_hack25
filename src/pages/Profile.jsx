import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();

  // mock user and activity
  const user = {
    username: "janedoe",
    avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    bio: "AI enthusiast | Exploring facts one claim at a time.",
    joined: "March 2024",
    activity: [
      { id: 1, post: "Verified: 'AI will replace all jobs by 2030'", date: "3 days ago" },
      { id: 2, post: "Commented on: 'Global warming myths'", date: "6 days ago" },
      { id: 3, post: "Verified: 'Moon landing was staged'", date: "10 days ago" },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("fakecheck_auth");
    navigate("/"); // go back to landing page
  };

  return (
    <div className="profile-page-wrapper">
      {/* Top header */}
      <div className="profile-header">
  <button
    className="back-btn"
    onClick={() => navigate("/home")} // go to home screen
  >
    ← Home
  </button>
  <h1>Profile</h1>
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>


      {/* Main content */}
      <div className="profile-main">
        {/* Left sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <img src={user.avatar} alt="User avatar" className="avatar" />
            <h2>{user.username}</h2>
            <p className="bio">{user.bio}</p>
            <div className="meta">👤 Joined {user.joined}</div>
            <button className="edit-btn">Edit Profile</button>
          </div>
        </aside>

        {/* Right activity feed */}
        <section className="activity-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {user.activity.map((item) => (
              <div key={item.id} className="activity-card">
                <div className="post">{item.post}</div>
                <div className="date">{item.date}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
