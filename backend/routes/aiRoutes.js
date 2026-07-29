import express from "express";
import { getMindAuraResponse } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", authMiddleware, getMindAuraResponse);

export default router;
