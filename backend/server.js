// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import authRoutes from "./routes/auth.js";      // Your auth routes
import moodRoutes from "./routes/moodRoutes.js"; // Mood routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Important to parse JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

