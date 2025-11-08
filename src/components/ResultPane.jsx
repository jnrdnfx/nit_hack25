import React from "react";

/**
 * Displays analyze results.
 * Props:
 *  - result: the analyze response object (or null)
 */
const ResultPane = ({ result }) => {
  if (!result) return null;

  const { score, label, explanation, highlights = [], related = [], domain_score, community_consensus } = result;

  const badgeClass = label === "Likely True" ? "cred-badge cred-true" : label === "Uncertain" ? "cred-badge cred-uncertain" : "cred-badge cred-false";

  return (
    <div className="result-pane">
      <div className="space-between" style={{marginBottom:8}}>
        <div>
          <div style={{fontSize:14, color:"#374151"}}>Credibility</div>
          <div style={{display:"flex", alignItems:"center", gap:12, marginTop:6}}>
            <div style={{fontSize:20, fontWeight:700}}>{score}%</div>
            <div className={badgeClass} style={{fontSize:13}}>{label}</div>
          </div>
        </div>

        <div style={{textAlign:"right"}}>
          <div style={{fontSize:12, color:"#6b7280"}}>Domain trust</div>
          <div style={{fontWeight:700}}>{domain_score}%</div>
        </div>
      </div>

      <div style={{marginTop:8}}>
        <div style={{fontSize:13, fontWeight:600}}>Community consensus</div>
        <div style={{fontSize:13, color:"#374151"}}>▲ {community_consensus?.up ?? 0}  •  ▼ {community_consensus?.down ?? 0}</div>
      </div>

      <div style={{marginTop:10}}>
        <div style={{fontSize:13, fontWeight:600}}>Explanation</div>
        <div style={{fontSize:13, color:"#374151"}}>{explanation}</div>
      </div>

      {highlights.length > 0 && (
        <div style={{marginTop:10}}>
          <div style={{fontSize:13, fontWeight:600}}>Suspicious / highlighted terms</div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:6}}>
            {highlights.map((h,i) => <div key={i} style={{padding:"6px 8px", borderRadius:6, background:"#fff1f2", color:"#9f1239", fontSize:12}}>{h}</div>)}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div style={{marginTop:10}}>
          <div style={{fontSize:13, fontWeight:600}}>Related verified sources</div>
          <ul style={{marginTop:6}}>
            {related.map((r,i) => (
              <li key={i}><a href={r.url} target="_blank" rel="noreferrer">{r.title}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultPane;
