import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; // Make sure AuthContext exists
import "./Signup.css";

const SignUp = () => {
    const { registerUser } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
        navigate("/home"); // Redirect to home after successful signup
    };

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="sign-up-button">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
};

export default SignUp;
