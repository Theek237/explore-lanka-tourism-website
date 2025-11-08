import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/authRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

const app = express(); // Create an Express application
app.use(
  cors({
    origin: ENV_VARS.CLIENT_URL, // Allow requests from the client URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

connectDB(); // Connect to MongoDB

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route is working!" });
});

app.use("/api/auth", authRoutes); // Use the auth routes
app.use("/api/locations", locationRoutes); // Register the locations route

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
