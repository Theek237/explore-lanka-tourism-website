import express from "express";
import { createTravelPlan } from "../controllers/travelPlanController.js";

const router = express.Router();

router.post("/", createTravelPlan);

export default router;
