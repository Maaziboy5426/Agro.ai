import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; // Using AuthContext
import "./Signup.css";

const SignUp = () => {
    const { registerUser } = useAuth(); // Use registerUser from AuthContext
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Register user in Appwrite
            await registerUser(name, email, password);

            // Store the user data locally after successful registration
            localStorage.setItem("user", JSON.stringify({ name, email }));

            // Redirect to home after successful signup
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
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
