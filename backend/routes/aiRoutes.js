import express from "express";
import { getMindAuraResponse } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask", getMindAuraResponse);

export default router;
