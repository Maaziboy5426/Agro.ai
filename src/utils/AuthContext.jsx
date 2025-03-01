import { createContext, useState, useEffect, useContext } from "react";
import { account } from "./appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);
        console.log("userInfo", userInfo);
    
        try {
            // Login the user and create a session
            let response = await account.createSession(userInfo.email, userInfo.password);
            
            // Fetch the account details
            let accountDetails = await account.get();
            
            // Set the user state
            setUser(accountDetails);
            
            // Navigate to home page
            navigate("/home"); 
        } catch (error) {
            console.error("Login Error:", error.message);
        }
        setLoading(false);
    };
    

    const logoutUser = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            navigate("/"); // Redirect to login after logout
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    const registerUser = async (userInfo) => {
        setLoading(true);
        try {
            let response = await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);

            // 🔥 FIX: Use `createSession` after registration
            await account.createSession(userInfo.email, userInfo.password1);
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("Register Error:", error.message);
        }
        setLoading(false);
    };

    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error("Check Status Error:", error.message);
        }
        setLoading(false);
    };

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
