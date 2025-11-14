import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ChatPage from './pages/ChatPage';

// Placeholder pages (create these files in src/pages)
import LogMood from "./pages/LogMood";
import Trends from "./pages/Trends";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected / Logged-in Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/log-mood" element={<LogMood />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;


