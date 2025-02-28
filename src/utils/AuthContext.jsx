import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Get user from local storage when app loads
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // **LOGIN FUNCTION**
    const loginUser = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            setUser(storedUser);
            return true;
        }
        return false;
    };

    // **SIGNUP FUNCTION (optional, for better auth flow)**
    const registerUser = (name, email, password) => {
        const newUser = { name, email, password };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
    };

    // **LOGOUT FUNCTION**
    const logoutUser = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for Using AuthContext
export const useAuth = () => useContext(AuthContext);
