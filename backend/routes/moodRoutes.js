import express from "express";
import { getUserMoodTrends, logMood } from "../controllers/moodController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all mood routes
router.post("/log", authMiddleware, logMood);
router.get("/trends", authMiddleware, getUserMoodTrends);


export default router;

