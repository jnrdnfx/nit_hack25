import React, { useState } from "react";

/**
 * Props:
 *  - post: {id,title,excerpt,category,upvotes,downvotes,author,comments}
 *  - onVote(postId, +1/-1)
 *  - onAddComment(postId, text)
 */
const VerificationPost = ({ post, onVote, onAddComment }) => {
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    onAddComment(post.id, commentText.trim());
    setCommentText("");
    setShowComment(false);
  };

  return (
    <div className="post">
      <div className="meta">{post.category} • by {post.author}</div>
      <div className="title">{post.title}</div>
      <div className="excerpt">{post.excerpt}</div>
      <div className="actions space-between">
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={() => onVote(post.id, +1)} className="btn" style={{padding:"6px 8px"}}>▲ {post.upvotes}</button>
          <button onClick={() => onVote(post.id, -1)} style={{padding:"6px 8px", borderRadius:6}}>▼ {post.downvotes}</button>
          <button onClick={() => setShowComment(s=>!s)} style={{padding:"6px 8px"}}>💬 {post.comments.length}</button>
        </div>
        <div style={{fontSize:12,color:"#6b7280"}}>Discuss</div>
      </div>

      {showComment && (
        <div className="comment-panel">
          <form onSubmit={handleCommentSubmit}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a supporting source or comment..."
              style={{width:"100%",padding:8,borderRadius:6,border:"1px solid #e5e7eb",marginBottom:6}}
            />
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button type="button" onClick={() => setShowComment(false)} style={{padding:"6px 10px", borderRadius:6}}>Cancel</button>
              <button type="submit" className="btn">Post</button>
            </div>
          </form>

          {/* existing comments */}
          <div style={{marginTop:8}}>
            {post.comments.map((c) => (
              <div key={c.id} style={{padding:"6px 0", borderTop:"1px solid #f3f4f6"}}>
                <strong style={{fontSize:13}}>{c.user}</strong>
                <div style={{fontSize:13,color:"#374151"}}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationPost;
