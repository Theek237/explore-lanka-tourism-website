import express from "express";
import {
  getMeUser,
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/me", protect, getMeUser);

export default router;
