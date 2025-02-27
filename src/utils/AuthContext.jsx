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
        // Normally you would check the credentials here, for now it's local storage
        if (email && password) {
            const user = { email, password };
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            return true;
        }
        return false;
    };

    // **LOGOUT FUNCTION**
    const logoutUser = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for Using AuthContext
export const useAuth = () => useContext(AuthContext);
