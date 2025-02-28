import React, { useState, useEffect } from "react";
import { Client, Databases, ID } from "appwrite";
import SlideInNavbar from "./SlideInNavbar";

// Constants
const ESP32_IP = "http://YOUR_ESP32_IP"; // Replace with actual IP

const Schedule = () => {
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [automaticMode, setAutomaticMode] = useState(false);
  const [moistureValue, setMoistureValue] = useState(0);
  const [schedule, setSchedule] = useState("");

  // Initialize Appwrite client
  const client = new Client();
  client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67bea2dc001e1c340258");
  const databases = new Databases(client);

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
      const response = await databases.createDocument(
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
      <input
        type="text"
        style={styles.input}
        placeholder="Enter schedule JSON"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
      <button onClick={sendSchedule} style={styles.button}>Send Schedule</button>
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
  header: {
    color: "#333",
  },
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
  form: {
    marginTop: "2rem",
  },
  formGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
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
  message: {
    marginTop: "1rem",
    color: "#28a745",
  },
};

export default Schedule;
