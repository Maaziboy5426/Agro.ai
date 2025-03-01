import { createContext, useContext, useState, useEffect } from "react";
import { account, ID } from "./appwriteConfig"; 
// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // **Check if user is logged in on app load**
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await account.get(); // Get user session
                setUser(response);
            } catch {
                setUser(null);
            }
        };
        checkUser();
    }, []);

    // **REGISTER USER**
    const registerUser = async (name, email, password) => {
        try {
            const response = await account.create(ID.unique(), email, password, name);
            setUser(response);
            return response;
        } catch (error) {
            console.error("Registration Error:", error.message);
            throw new Error(error.message);
        }
    };

    // **LOGIN USER**
 // ✅ Ensure this import is correct

    const loginUser = async (email, password) => {
        try {
            await account.createEmailSession(email, password);
            
            // Fetch user details after login
            const response = await account.get();
            setUser(response);
            return response;
        } catch (error) {
            console.error("Login Error:", error.message);
            throw new Error("Invalid email or password");
        }
    };
    
    // **LOGOUT USER**
    const logoutUser = async () => {
        try {
            await account.deleteSession("current"); // Delete current session
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for Using AuthContext
export const useAuth = () => useContext(AuthContext);
