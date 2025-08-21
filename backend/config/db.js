import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    if (!ENV_VARS.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
