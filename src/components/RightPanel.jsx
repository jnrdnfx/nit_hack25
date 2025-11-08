import React, { useState } from "react";
import { analyzeSource } from "../services/api";
import ResultPane from "./ResultPane";

/**
 * Right panel that accepts URL/input, calls analyze, and shows result pane (scrollable).
 * Only the result pane scrolls itself if content large.
 */
const RightPanel = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!input.trim()) {
      setError("Please paste a URL or text to analyze.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeSource(input.trim());
      setResult(res);
    } catch (err) {
      setError("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="right-panel">
      <div>
        <h2 style={{fontSize: 28, fontWeight: 600, textAlign: "center",color:"#ace2ffff"}}>Paste Source. Analyze. Verify.</h2>
        <div style={{fontSize:13, color:"#f6f9ffff"}}>Enter URL or source</div>
        <div className="input-area" style={{marginTop:8,marginRight:-7,border:"4px solid #ff7547ff",borderRadius:16,padding:12,background:"#ddf3ffff"}}>
          <input placeholder="https://example.com/article" value={input} onChange={(e)=>setInput(e.target.value)} />
          <div style={{display:"flex", gap:8, marginTop:8}}>
            <button className="btn" onClick={handleAnalyze} disabled={loading}>{loading ? "Analyzing..." : "Verify"}</button>
            <button onClick={() => { setInput(""); setResult(null); setError(""); }} style={{padding:"8px", borderRadius:6}}>Clear</button>
          </div>
          {error && <div style={{color:"#b91c1c", marginTop:8}}>{error}</div>}
        </div>
      </div>

      <div style={{fontSize:13, color:"#ffffffff", marginTop:8}}>Results</div>

      {/* result pane appears after analysis */}
      {loading && <div style={{padding:8}}>Analyzing... ⏳</div>}
      {result && <ResultPane result={result} />}
    </div>
  );
};

export default RightPanel;
