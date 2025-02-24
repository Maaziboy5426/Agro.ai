import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Control.css";
import { Link } from 'react-router-dom';

const WaterLevelProgress = () => {
  const [waterLevel, setWaterLevel] = useState(50); // Default water level
  const [fertilizerLevel, setFertilizerLevel] = useState(30); // Default fertilizer level
  const [moistureLevel, setMoistureLevel] = useState(40); // Default moisture level

  // Function to dispense water
  const dispenseWater = () => {
    if (waterLevel > 0) {
      const dispenseAmount = 10; // Percentage of water to dispense
      setWaterLevel(Math.max(0, waterLevel - dispenseAmount));
    }
  };

  return (
    <div className="water-level-container">
      <h2>Resource Monitor</h2>
      <div className="progress-bar-row">
        {/* Water Level Bar */}
        <div className="progress-bar-wrapper">
          <h3>Water Level</h3>
          <CircularProgressbar
            value={waterLevel}
            text={`${waterLevel}%`}
            styles={buildStyles({
              pathColor: "#0000FF", // Blue color for water level
              textColor: "#000",
              trailColor: "#ddd",
            })}
          />
          <button
            className="dispense-button"
            onClick={dispenseWater}
            disabled={waterLevel === 0}
          >
            Dispense Water
          </button>
        </div>

        {/* Fertilizer Level Bar */}
        <div className="progress-bar-wrapper">
          <h3>Fertilizer Level</h3>
          <CircularProgressbar
            value={fertilizerLevel}
            text={`${fertilizerLevel}%`}
            styles={buildStyles({
              pathColor: "#8a6c0b", // Blue color for fertilizer level
              textColor: "#000",
              trailColor: "#ddd",
            })}
          />
        </div>

        {/* Moisture Level Bar */}
        <div className="progress-bar-wrapper">
          <h3>Moisture Level</h3>
          <CircularProgressbar
            value={moistureLevel}
            text={`${moistureLevel}%`}
            styles={buildStyles({
              pathColor: "#27dfe6", // Blue color for moisture level
              textColor: "#000",
              trailColor: "#ddd",
            })}
          />
        </div>
      </div>
      <p><Link to='/home'>Return</Link></p>
    </div>
  );
};

export default WaterLevelProgress;
