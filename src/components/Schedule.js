import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Schedule.css';

const ScheduleGenerator = () => {
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(0);
    const [repeatEvery, setRepeatEvery] = useState("day");
    const [endDate, setEndDate] = useState("");
    const [timezone, setTimezone] = useState("");
    const [schedule, setSchedule] = useState(null);

    const generateSchedule = () => {
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(endDate);

        const scheduleObj = {
            start: startDateTime.toLocaleString(),
            duration: `${duration} minutes`,
            repeatEvery: repeatEvery === "week" ? "Week on" : "Day on",
            endRecurrence: endDateTime.toLocaleString(),
            timezone: timezone,
        };

        setSchedule(scheduleObj);
    };

    const sendToESP32 = () => {
        if (schedule) {
            console.log("Schedule sent to ESP32:", schedule);
            alert("Schedule sent to ESP32!");
        } else {
            alert("Please generate a schedule first.");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",paddingRight:"40px" }}>
            <h2>Plant Watering Schedule Generator</h2>

            <div>
                <label>Start Date: </label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div>
                <label>Start Time: </label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div>
                <label>Duration (minutes): </label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>

            <div>
                <label>Repeat Every: </label>
                <select value={repeatEvery} onChange={(e) => setRepeatEvery(e.target.value)}>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                </select>
            </div>

            <div>
                <label>End Date: </label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div>
                <label>Timezone: </label>
                <input type="text" placeholder="e.g., Asia/Kolkata" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
            </div>

            <button onClick={generateSchedule} style={{ margin: "10px 5px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>Generate Schedule</button>
            <button onClick={sendToESP32} style={{ margin: "10px 5px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }}>Send to ESP32</button>

            {schedule && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Generated Schedule</h3>
                    <p><strong>Start:</strong> {schedule.start}</p>
                    <p><strong>Duration:</strong> {schedule.duration}</p>
                    <p><strong>Repeat Every:</strong> {schedule.repeatEvery}</p>
                    <p><strong>End Recurrence:</strong> {schedule.endRecurrence}</p>
                    <p><strong>Timezone:</strong> {schedule.timezone}</p>
                </div>
            )}
                    <p className="return-link">
                          <Link to="/home">Return</Link>
                        </p>
        </div>
    );
};

export default ScheduleGenerator;