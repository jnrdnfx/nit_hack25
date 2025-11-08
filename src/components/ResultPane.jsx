import React from "react";

/**
 * Displays analyze results.
 * Props:
 *  - result: the analyze response object (or null)
 */
const ResultPane = ({ result }) => {
  if (!result) return null;

  const {
    score,
    label,
    explanation,
    highlights = [],
    related = [],
    domain_score,
    community_consensus,
    // New AI format fields
    credibility,
    keyPoints = [],
    sources = [],
  } = result;

  // Use credibility if available, otherwise use label
  const displayCredibility = credibility || label;
  const badgeClass =
    displayCredibility === "Likely True" || displayCredibility === "Likely Authentic"
      ? "cred-badge cred-true"
      : displayCredibility === "Uncertain"
      ? "cred-badge cred-uncertain"
      : "cred-badge cred-false";

  // Use sources from AI if available, otherwise use related
  const displaySources = sources.length > 0 ? sources : related;

  return (
    <div className="result-pane">
      <div className="space-between" style={{ marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 14, color: "#374151" }}>Credibility</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{score}%</div>
            <div className={badgeClass} style={{ fontSize: 13 }}>
              {displayCredibility}
            </div>
          </div>
        </div>

        {domain_score && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Domain trust</div>
            <div style={{ fontWeight: 700 }}>{domain_score}%</div>
          </div>
        )}
      </div>

      {community_consensus && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Community consensus</div>
          <div style={{ fontSize: 13, color: "#374151" }}>
            ▲ {community_consensus?.up ?? 0} • ▼ {community_consensus?.down ?? 0}
          </div>
        </div>
      )}

      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Explanation</div>
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
          {explanation}
        </div>
      </div>

      {/* Key Points from AI analysis */}
      {keyPoints.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Key Points</div>
          <ul style={{ marginTop: 6, paddingLeft: 20 }}>
            {keyPoints.map((point, i) => (
              <li key={i} style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Highlights (legacy support) */}
      {highlights.length > 0 && keyPoints.length === 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>
            Suspicious / highlighted terms
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
            {highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  background: "#fff1f2",
                  color: "#9f1239",
                  fontSize: 12,
                }}
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources from AI analysis */}
      {displaySources.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Related verified sources</div>
          <ul style={{ marginTop: 6, paddingLeft: 20 }}>
            {displaySources.map((source, i) => {
              const url = source.uri || source.url;
              const title = source.title || "Source";
              return (
                <li key={i} style={{ marginBottom: 4 }}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 13,
                      color: "#3b82f6",
                      textDecoration: "underline",
                      wordBreak: "break-word",
                    }}
                  >
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultPane;
