import React, { useEffect, useState } from "react";
import CategoryPills from "./CategoryPills";
import VerificationPost from "./VerificationPost";
import { fetchFeedPosts } from "../services/api";

/**
 * Left feed that shows categories (pills) and a scrollable list of posts.
 * Only this panel scrolls (not the whole page).
 */
const LeftFeed = () => {
  const [categories] = useState([
    { id: "all", name: "All" },
    { id: "political", name: "Political" },
    { id: "social", name: "Social" },
    { id: "sports", name: "Sports" },
    { id: "health", name: "Health" },
    { id: "tech", name: "Tech" },
  ]);
  const [active, setActive] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const p = await fetchFeedPosts();
      if (!mounted) return;
      setPosts(p);
      setLoading(false);
    })();
    return () => (mounted = false);
  }, []);

  const visible = posts.filter((p) => active === "all" ? true : p.category.toLowerCase() === active.toLowerCase());

  const handleVote = (id, delta) => {
    setPosts((prev) => prev.map(p => p.id === id ? { ...p, upvotes: delta === 1 ? p.upvotes+1 : p.upvotes, downvotes: delta === -1 ? p.downvotes+1 : p.downvotes } : p));
    // TODO: send to backend
  };

  const handleAddComment = (id, text) => {
    setPosts((prev) => prev.map(p => p.id === id ? { ...p, comments: [...p.comments, { id: `c${Date.now()}`, user: "you", text }] } : p));
    // TODO: send to backend to persist
  };

  return (
    <div className="left-feed">
      <h2 style={{fontSize:"30px", fontWeight:"bold", textAlign:"center"}}>Claims Around You</h2>
      <CategoryPills categories={categories} activeId={active} onSelect={setActive} />

      <div className="posts-list" style={{flex:1, overflowY:"auto"}}>
        {loading ? <div>Loading feed...</div> : visible.length === 0 ? <div style={{padding:12}}>No posts in this category.</div> :
          visible.map((p) => (
            <VerificationPost key={p.id} post={p} onVote={handleVote} onAddComment={handleAddComment} />
          ))
        }
      </div>
    </div>
  );
};

export default LeftFeed;
