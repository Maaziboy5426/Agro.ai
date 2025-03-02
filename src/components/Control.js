import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Control.css";
import SlideInNavbar from "./SlideInNavbar";

const WaterLevelProgress = () => {
  const [waterLevel, setWaterLevel] = useState(50); // Default water level
  const [moistureLevel, setMoistureLevel] = useState(48); // Default moisture level
  const [moistureStatus, setMoistureStatus] = useState("Loading..."); // Status message
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch moisture data from the ESP32
  const fetchMoistureData = async () => {
    try {
      const response = await fetch("http://192.168.131.216/moisture"); // ESP32 IP
      const data = await response.json();
      
      setMoistureLevel(data.moisture);
      setMoistureStatus(data.status);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching moisture data:", error);
      setIsLoading(false);
    }
  };

  // Fetch moisture level every 5 seconds
  useEffect(() => {
    fetchMoistureData();
    const intervalId = setInterval(fetchMoistureData, 5000);
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Function to dispense water
  const dispenseWater = () => {
    if (waterLevel > 0) {
      setWaterLevel(Math.max(0, waterLevel - 10)); // Reduce water level by 10%
    }
  };

  return (
    <div className="water-level-container">
      <SlideInNavbar />
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
          <button className="dispense-button" onClick={dispenseWater} disabled={waterLevel === 0}>
            Dispense Water
          </button>
        </div>

        {/* Moisture Level Bar */}
        <div className="progress-bar-wrapper">
          <h3>Moisture Level</h3>
          {isLoading ? (
            <p>Loading...</p> // Show loading text while fetching data
          ) : (
            <CircularProgressbar
              value={moistureLevel}
              text={`${moistureLevel}%`}
              styles={buildStyles({
                pathColor: "#27dfe6", // Light blue for moisture level
                textColor: "#000",
                trailColor: "#ddd",
              })}
            />
          )}
          <p>Status: {moistureStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default WaterLevelProgress;
