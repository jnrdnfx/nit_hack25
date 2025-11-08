// simple mocked API. Replace with real axios requests to backend.
import axios from "axios";

const MOCK_DELAY = (ms) => new Promise((r) => setTimeout(r, ms));

// Example: fetch feed posts (mock)
export async function fetchFeedPosts() {
  await MOCK_DELAY(200);
  return [
    {
      id: "p1",
      title: "Claim: Government banned X",
      excerpt: "A viral post claims the government passed a secret ban on X...",
      category: "Political",
      upvotes: 12,
      downvotes: 2,
      author: "user123",
      comments: [{ id: "c1", user: "alice", text: "Source? this sounds off." }]
    },
    {
      id: "p2",
      title: "City team wins inaugural cup (misleading)",
      excerpt: "This post misquotes the scoreboard and exaggerates attendance...",
      category: "Sports",
      upvotes: 3,
      downvotes: 8,
      author: "sportsfan",
      comments: []
    },
    {
      id: "p3",
      title: "City team wins inaugural cup (misleading)",
      excerpt: "This post misquotes the scoreboard and exaggerates attendance...",
      category: "Sports",
      upvotes: 3,
      downvotes: 8,
      author: "sportsfan",
      comments: []
    },
    {
      id: "p4",
      title: "City team wins inaugural cup (misleading)",
      excerpt: "This post misquotes the scoreboard and exaggerates attendance...",
      category: "Sports",
      upvotes: 5,
      downvotes: 9,
      author: "sportsfan",
      comments: []
    },
    // add more...
  ];
}

// Example: analyze function — replace with real POST to /analyze
export async function analyzeSource(input) {
  // Simulate network & ML analysis
  await MOCK_DELAY(1500);

  // A simple mock heuristic:
  const len = (input || "").length;
  const score = Math.max(5, Math.min(95, Math.round(len % 100)));
  const label = score >= 70 ? "Likely True" : score >= 40 ? "Uncertain" : "Likely False";

  return {
    score,
    label,
    explanation: "Mock analysis. Replace with your ML backend output.",
    highlights: ["shocking", "report", "unconfirmed"].slice(0, Math.min(3, Math.floor(len/20)+1)),
    related: [
      { title: "Verified: Official statement", url: "https://example.com/verified-article" }
    ],
    domain_score: Math.round((Math.random() * 80) + 10),
    community_consensus: { up: Math.round(Math.random()*40), down: Math.round(Math.random()*20) }
  };
}
