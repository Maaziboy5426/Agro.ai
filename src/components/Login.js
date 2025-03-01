import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";  // Ensure this is importing the correct context
import "./Login.css";

const Login = () => {
    const { loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Use effect to check if the data exists in localStorage and pre-fill the form
    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            // Call loginUser with email and password only
            await loginUser(email, password);
            navigate("/home"); // Redirect to home after successful login

            // Store email and password in localStorage for future logins
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
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
                <button type="submit" className="login-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default Login;
