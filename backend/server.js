// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db").default;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Import the database connection function
import { ENV_VARS } from "./config/envVars.js"; // Import environment variables

const app = express(); // Create an Express application
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

connectDB(); // Connect to MongoDB

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
