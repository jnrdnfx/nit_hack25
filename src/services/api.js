// AI Model API service - connects to Gemini backend
import axios from "axios";

const API_BASE_URL = 'http://localhost:5001/api';

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

// Handle API response and convert to expected format
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'An error occurred with the analysis service.');
  }
  return response.json();
};

// Analyze text or URL using Gemini AI
export async function analyzeTextOrUrl(content) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const result = await handleApiResponse(response);
    
    // Convert to expected format for backward compatibility
    return convertToLegacyFormat(result);
  } catch (error) {
    console.error("Error calling backend for text/URL analysis:", error);
    throw new Error("Failed to connect to the analysis service. Is the backend server running?");
  }
}

// Analyze image using Gemini AI
export async function analyzeImage(base64Image, mimeType) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image, mimeType: mimeType }),
    });
    const result = await handleApiResponse(response);
    
    // Convert to expected format for backward compatibility
    return convertToLegacyFormat(result);
  } catch (error) {
    console.error("Error calling backend for image analysis:", error);
    throw new Error("Failed to connect to the analysis service. Is the backend server running?");
  }
}

// Convert new AI result format to legacy format for backward compatibility
function convertToLegacyFormat(result) {
  // Map credibility labels to score and label
  const credibilityMap = {
    "Likely True": { score: 85, label: "Likely True" },
    "Likely Authentic": { score: 85, label: "Likely True" },
    "Uncertain": { score: 50, label: "Uncertain" },
    "Likely False": { score: 20, label: "Likely False" },
    "Likely Manipulated": { score: 20, label: "Likely False" }
  };

  const mapped = credibilityMap[result.credibility] || { score: 50, label: "Uncertain" };
  
  // Extract highlights from keyPoints (first few words)
  const highlights = result.keyPoints?.slice(0, 3).map(point => {
    const words = point.split(' ').slice(0, 2).join(' ');
    return words;
  }) || [];

  // Convert sources to related format
  const related = result.sources?.map(source => ({
    title: source.title,
    url: source.uri
  })) || [];

  return {
    score: mapped.score,
    label: mapped.label,
    explanation: result.explanation || "No explanation provided.",
    highlights: highlights,
    related: related,
    domain_score: Math.round((Math.random() * 80) + 10), // Keep for backward compatibility
    community_consensus: { up: Math.round(Math.random()*40), down: Math.round(Math.random()*20) }, // Keep for backward compatibility
    // Also include new format fields for future use
    credibility: result.credibility,
    keyPoints: result.keyPoints || [],
    sources: result.sources || []
  };
}

// Legacy function for backward compatibility - now uses real AI
export async function analyzeSource(input) {
  // Determine if input is URL or text
  const isUrl = /^https?:\/\/.+/.test(input.trim());
  
  if (isUrl || input.trim().length > 0) {
    return await analyzeTextOrUrl(input.trim());
  }
  
  throw new Error("Invalid input provided");
}
