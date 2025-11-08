import React, { useState } from "react";
import { analyzeSource, analyzeTextOrUrl, analyzeImage } from "../services/api";
import ResultPane from "./ResultPane";
import { motion, AnimatePresence } from "framer-motion";

const INPUT_TYPES = {
  URL: "URL",
  TEXT: "TEXT",
  IMAGE: "IMAGE",
};

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState(INPUT_TYPES.URL);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState({ base64: null, name: null, mimeType: null });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setImage({ base64: base64String, name: file.name, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    setResult(null);

    try {
      let res;
      if (activeTab === INPUT_TYPES.URL) {
        if (!url.trim()) {
          setError("Please enter a URL to analyze.");
          setLoading(false);
          return;
        }
        res = await analyzeTextOrUrl(url.trim());
      } else if (activeTab === INPUT_TYPES.TEXT) {
        if (!text.trim()) {
          setError("Please enter text to analyze.");
          setLoading(false);
          return;
        }
        res = await analyzeTextOrUrl(text.trim());
      } else if (activeTab === INPUT_TYPES.IMAGE) {
        if (!image.base64 || !image.mimeType) {
          setError("Please select an image to analyze.");
          setLoading(false);
          return;
        }
        res = await analyzeImage(image.base64, image.mimeType);
      }
      setResult(res);
    } catch (err) {
      setError(err.message || "Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setText("");
    setImage({ base64: null, name: null, mimeType: null });
    setResult(null);
    setError("");
  };

  const isSubmitDisabled =
    (activeTab === INPUT_TYPES.URL && !url.trim()) ||
    (activeTab === INPUT_TYPES.TEXT && !text.trim()) ||
    (activeTab === INPUT_TYPES.IMAGE && !image.base64) ||
    loading;

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

        <div style={{ fontSize: 13, color: "#f6f9ffff", marginTop: 8 }}>
          Select input type
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <button
            onClick={() => setActiveTab(INPUT_TYPES.URL)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background:
                activeTab === INPUT_TYPES.URL ? "#ff7547ff" : "#ddf3ffff",
              color: activeTab === INPUT_TYPES.URL ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: activeTab === INPUT_TYPES.URL ? 600 : 400,
            }}
          >
            URL
          </button>
          <button
            onClick={() => setActiveTab(INPUT_TYPES.TEXT)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background:
                activeTab === INPUT_TYPES.TEXT ? "#ff7547ff" : "#ddf3ffff",
              color: activeTab === INPUT_TYPES.TEXT ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: activeTab === INPUT_TYPES.TEXT ? 600 : 400,
            }}
          >
            Text
          </button>
          <button
            onClick={() => setActiveTab(INPUT_TYPES.IMAGE)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background:
                activeTab === INPUT_TYPES.IMAGE ? "#ff7547ff" : "#ddf3ffff",
              color: activeTab === INPUT_TYPES.IMAGE ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: activeTab === INPUT_TYPES.IMAGE ? 600 : 400,
            }}
          >
            Image
          </button>
        </div>

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
          {activeTab === INPUT_TYPES.URL && (
            <input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          )}

          {activeTab === INPUT_TYPES.TEXT && (
            <textarea
              placeholder="Paste text snippet here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid #ccc",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          )}

          {activeTab === INPUT_TYPES.IMAGE && (
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "120px",
                border: "2px dashed #ff7547ff",
                borderRadius: 8,
                cursor: "pointer",
                padding: "16px",
                background: image.base64 ? "#fff" : "#f0f0f0",
              }}
            >
              {image.name ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                    {image.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    Click to change
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, color: "#666" }}>
                    Click to upload image
                  </div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
                    or drag and drop
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              className="btn"
              onClick={handleAnalyze}
              disabled={isSubmitDisabled}
              style={{
                opacity: isSubmitDisabled ? 0.5 : 1,
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Analyzing..." : "Verify"}
            </button>
            <button
              onClick={handleClear}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: "1px solid #ccc",
                background: "#000000ff",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
          {error && (
            <div style={{ color: "#b91c1c", marginTop: 8, fontSize: 13 }}>
              {error}
            </div>
          )}
        </div>
      </div>

      <div style={{ fontSize: 13, color: "#ffffffff", marginTop: 8 }}>
        Results
      </div>

      {/* Animate the result pane */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ padding: 8, textAlign: "center" }}
          >
            <div style={{ fontSize: 14, color: "#fff" }}>Analyzing... ⏳</div>
            <div style={{ fontSize: 12, color: "#ccc", marginTop: 4 }}>
              This may take a moment.
            </div>
          </motion.div>
        )}

        {result && !loading && (
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
