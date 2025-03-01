import React, { useState, useEffect } from "react";
import { Client, Databases, ID } from "appwrite";
import SlideInNavbar from "./SlideInNavbar";

const ESP32_IP = "http://esp32.local"; // Use mDNS for dynamic IP resolution

const Schedule = () => {
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [automaticMode, setAutomaticMode] = useState(false);
  const [moistureValue, setMoistureValue] = useState(0);

  // Appwrite Client
  const client = new Client();
  client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67bea2dc001e1c340258");
  const databases = new Databases(client);

  // Fetch Moisture Data
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMoisture();
    }, 5000);
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

  // Toggle Automatic Mode
  const toggleAutomaticMode = async () => {
    try {
      const response = await fetch(`${ESP32_IP}/toggle`);
      const modeStatus = await response.text();
      setAutomaticMode(modeStatus.includes("Automatic Mode"));
    } catch (error) {
      console.error("Error toggling mode:", error);
    }
  };

  // Convert Date & Time to ESP32 Format and Send Schedule
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Extract hour & minute from input
      const [hour, minute] = scheduleTime.split(":").map(Number);

      // Store in Appwrite
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

      // Send to ESP32
      await sendSchedule(hour, minute, Number(duration));

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

  // Send Schedule to ESP32
  const sendSchedule = async (hour, minute, duration) => {
    try {
      await fetch(`${ESP32_IP}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schedules: [{ startHour: hour, startMinute: minute, duration }],
        }),
      });
      alert("Schedule Sent to ESP32!");
    } catch (error) {
      console.error("Error sending schedule:", error);
    }
  };

  // Manually Control Water Flow
  const controlWaterFlow = async (state) => {
    try {
      await fetch(`${ESP32_IP}/relay?state=${state}`);
      alert(`Water Pump ${state === "on" ? "Activated" : "Stopped"}!`);
    } catch (error) {
      console.error("Error controlling relay:", error);
    }
  };

  return (
    <div style={styles.container}>
      <SlideInNavbar />
      <h1 style={styles.header}>Schedule Watering</h1>
      <p>Moisture Level: {moistureValue}</p>
      <button onClick={toggleAutomaticMode} style={styles.toggleButton}>
        {automaticMode ? "Disable Automatic Mode" : "Enable Automatic Mode"}
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Time:</label>
          <input
            type="time"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={styles.input}
            required
            min="1"
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Scheduling..." : "Submit Schedule"}
        </button>
      </form>

      {/* Manual Water Control Buttons */}
      <button onClick={() => controlWaterFlow("on")} style={styles.manualButton}>
        Turn Water ON
      </button>
      <button onClick={() => controlWaterFlow("off")} style={styles.manualButton}>
        Turn Water OFF
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  header: { color: "#333" },
  toggleButton: {
    margin: "1rem 0",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: { marginTop: "2rem" },
  formGroup: { marginBottom: "1rem", textAlign: "left" },
  label: { display: "block", fontSize: "1rem", marginBottom: "0.5rem" },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  manualButton: {
    marginTop: "1rem",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#ff6347",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: { marginTop: "1rem", color: "#28a745" },
};

export default Schedule;
