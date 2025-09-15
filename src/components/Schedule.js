import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Databases, ID } from "appwrite";
import SlideInNavbar from "./SlideInNavbar";

const Schedule = () => {
  const [mode, setMode] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(""); 
  const [scheduleTime, setScheduleTime] = useState(""); 
  const [duration, setDuration] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Initialize Appwrite client with the correct endpoint and project id
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")  // Correct endpoint for Appwrite
    .setProject("67bea2dc001e1c340258");  // Your actual project ID

  // Initialize the Appwrite database service
  const databases = new Databases(client);

  const handleModeSelection = (selectedMode) => {
    if (selectedMode === "automatic") {
      navigate("/"); // Redirect to home page
    } else {
      setMode("manual"); // Show scheduling form
    }
  };

  // Submit the schedule to Appwrite
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
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

  return (
    <div style={styles.container}>
      <SlideInNavbar />
      {mode === null ? (
        <div style={styles.buttonGroup}>
          <button style={styles.manualButton} onClick={() => handleModeSelection("manual")}>
            Manual
          </button>
          <button style={styles.automaticButton} onClick={() => handleModeSelection("automatic")}>
            Automatic
          </button>
        </div>
      ) : (
        <>
          <h1 style={styles.header}>Schedule Watering</h1>
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
          {message && <p style={styles.message}>{message}</p>}
        </>
      )}
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
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  manualButton: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  automaticButton: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#ffc107",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    color: "#333",
  },
};

export default Schedule;