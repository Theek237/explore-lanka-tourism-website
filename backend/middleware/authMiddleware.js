import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

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
