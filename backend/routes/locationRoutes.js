import express from "express";
import { protect } from "../middleware/authMiddleware.js";
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

// Protected create (keep restricted)
router.post("/", protect, async (req, res) => {
  try {
    const created = await Location.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message || "Failed to create location" });
  }
});

export default router;
