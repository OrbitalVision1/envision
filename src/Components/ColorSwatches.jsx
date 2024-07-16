// ColorSwatches.jsx
import React from "react";
import { useStore } from "./Store";

const ColorSwatches = () => {
  const colors = useStore((state) => state.colors);
  const setColor = useStore((state) => state.setColor);

  const handleChange = (meshName, event) => {
    setColor(meshName, event.target.value);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}>
      {Object.keys(colors).map((meshName) => (
        <div key={meshName} style={{ margin: "10px" }}>
          <label>
            {meshName}
            <input
              type="color"
              value={colors[meshName]}
              onChange={(event) => handleChange(meshName, event)}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default ColorSwatches;
