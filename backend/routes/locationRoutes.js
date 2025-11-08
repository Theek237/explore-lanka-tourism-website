import express from "express";
import {
  addLocation,
  deleteLocation,
  updateLocation,
} from "../controllers/locationController.js";
import { adminProtect } from "../middleware/authMiddleware.js";
import { Location } from "../models/Location.js";

const router = express.Router();

// Public list
router.get("/", async (req, res) => {
  try {
    const list = await Location.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: "Failed to load locations" });
  }
});

// Public detail (id or slug) - was protected causing 401 for unauthenticated users
router.get("/:identifier", async (req, res) => {
  try {
    const loc = await Location.findByIdentifier(req.params.identifier);
    if (!loc) return res.status(404).json({ message: "Location not found" });
    res.json(loc);
  } catch {
    res.status(500).json({ message: "Failed to load location" });
  }
});

// Admin-only routes
router.post("/", adminProtect, addLocation);
router.put("/:id", adminProtect, updateLocation);
router.delete("/:id", adminProtect, deleteLocation);

export default router;
