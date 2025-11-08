import React, { useState } from "react";
import { analyzeSource } from "../services/api";
import ResultPane from "./ResultPane";
import { motion, AnimatePresence } from "framer-motion";

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
        <h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            textAlign: "center",
            color: "#ace2ffff",
          }}
        >
          Paste Source. Analyze. Verify.
        </h2>

        <div style={{ fontSize: 13, color: "#f6f9ffff" }}>Enter URL or source</div>

        <div
          className="input-area"
          style={{
            marginTop: 8,
            marginRight: -7,
            border: "4px solid #ff7547ff",
            borderRadius: 16,
            padding: 12,
            background: "#ddf3ffff",
          }}
        >
          <input
            placeholder="https://example.com/article"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button className="btn" onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Verify"}
            </button>
            <button
              onClick={() => {
                setInput("");
                setResult(null);
                setError("");
              }}
              style={{ padding: "8px", borderRadius: 6 }}
            >
              Clear
            </button>
          </div>
          {error && <div style={{ color: "#b91c1c", marginTop: 8 }}>{error}</div>}
        </div>
      </div>

      <div style={{ fontSize: 13, color: "#ffffffff", marginTop: 8 }}>Results</div>

      {/* Animate the result pane */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ padding: 8 }}
          >
            Analyzing... ⏳
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ResultPane result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RightPanel;
