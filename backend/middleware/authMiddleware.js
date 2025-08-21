import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/User.js";

export function protect(req, res, next) {
  try {
    // Accept cookie or Authorization: Bearer <token>
    let token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    if (!ENV_VARS.JWT_SECRET) {
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    // Standardize to _id
    req.user = { _id: decoded.id };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export async function adminProtect(req, res, next) {
  try {
    // Accept cookie or Authorization: Bearer <token>
    let token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    if (!ENV_VARS.JWT_SECRET) {
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
