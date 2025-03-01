import React, { useState, useEffect } from "react";
import { Client, Databases, ID } from "appwrite";
import SlideInNavbar from "./SlideInNavbar";

// 🛑 Replace with your ESP32's IP Address
const ESP32_IP = "http://192.168.225.51"; // Find this from Serial Monitor

const Schedule = () => {
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [automaticMode, setAutomaticMode] = useState(false);
  const [moistureValue, setMoistureValue] = useState(0);

  // Initialize Appwrite client
  const client = new Client();
  client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67bea2dc001e1c340258");
  const databases = new Databases(client);

  useEffect(() => {
    const interval = setInterval(fetchMoisture, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMoisture = async () => {
    try {
      const response = await fetch(`${ESP32_IP}/moisture`);
      const data = await response.text();
      setMoistureValue(parseInt(data));
    } catch (error) {
      console.error("Error fetching moisture data:", error);
    }
  };

  const toggleAutomaticMode = async () => {
    try {
      const response = await fetch(`${ESP32_IP}/toggle`);
      const modeStatus = await response.text();
      setAutomaticMode(modeStatus.includes("Automatic Mode"));
    } catch (error) {
      console.error("Error toggling mode:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await databases.createDocument(
        "67bea376001fcea919ba",
        "67c0b0e60027dd30d953",
        ID.unique(),
        {
          schedule_date: scheduleDate,
          schedule_time: scheduleTime,
          duration: Number(duration),
        }
      );

      setMessage("Watering schedule set successfully!");
      setScheduleDate("");
      setScheduleTime("");
      setDuration("");
    } catch (error) {
      console.error("Error setting schedule:", error);
      setMessage(`Error setting schedule: ${error.message}`);
    }
    setLoading(false);
  };

  const sendSchedule = async () => {
    try {
      await fetch(`${ESP32_IP}/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedules: [
            { startHour: 12, startMinute: 30, duration: 1 },
            { startHour: 18, startMinute: 0, duration: 2 },
          ],
        }),
      });
      alert("Schedule Sent!");
    } catch (error) {
      console.error("Error sending schedule:", error);
    }
  };

  const controlWaterFlow = async (state) => {
    try {
      const response = await fetch(`${ESP32_IP}/relay?state=${state}`);
      const data = await response.text();
      alert(`Water Flow: ${data}`);
    } catch (error) {
      console.error("Error controlling relay:", error);
      alert("Failed to control water flow. Check ESP32 connection.");
    }
  };

  return (
    <div>
      <SlideInNavbar />
      <h1>Schedule Watering</h1>
      <p>Moisture Level: {moistureValue}</p>
      <button onClick={() => controlWaterFlow("on")}>Start Water</button>
      <button onClick={() => controlWaterFlow("off")}>Stop Water</button>
      <button onClick={toggleAutomaticMode}>
        {automaticMode ? "Disable Automatic Mode" : "Enable Automatic Mode"}
      </button>
      <button onClick={sendSchedule}>Send Schedule</button>
    </div>
  );
};

export default Schedule;
