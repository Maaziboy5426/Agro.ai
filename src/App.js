import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider,useAuth } from './utils/AuthContext'; // Import AuthProvider
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import SlideInNavbar from './components/SlideInNavbar';
import PlantSearch from './components/PlantSearch';
import Chat from './components/Chat';
import Control from './components/Control';
import Chatbot from './components/Chatbot';
import Schedule from './components/Schedule';

// Protected Route Wrapper
const PrivateRoute = ({ element }) => {
    const { user } = useAuth();  // Using useAuth to get the user
    return user ? element : <Navigate to="/login" />;  // Redirect to Login if no user
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<PrivateRoute element={<><SlideInNavbar /><Home /></>} />} />
                    <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                    <Route path="/plantSearch" element={<PrivateRoute element={<PlantSearch />} />} />
                    <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
                    <Route path="/control" element={<PrivateRoute element={<Control />} />} />
                    <Route path="/chatbot" element={<PrivateRoute element={<Chatbot />} />} />
                    <Route path="/schedule" element={<PrivateRoute element={<Schedule />} />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
