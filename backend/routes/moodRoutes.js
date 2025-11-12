import express from "express";
import { getUserMoodTrends } from "../controllers/moodController.js";

const router = express.Router();

// For now, we’ll use mock data
router.get("/trends", getUserMoodTrends);

export default router;

