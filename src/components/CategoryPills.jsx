import React from "react";

/**
 * Props:
 *  - categories: [{id,name}]
 *  - activeId
 *  - onSelect(catId)
 */
const CategoryPills = ({ categories, activeId, onSelect }) => {
  return (
    <div className="pills-row" style={{padding:"6px 4px"}}>
      {categories.map((c) => (
        <div
          key={c.id}
          className={`pill ${activeId === c.id ? "active" : ""}`}
          onClick={() => onSelect(c.id)}
        >
          {c.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryPills;
