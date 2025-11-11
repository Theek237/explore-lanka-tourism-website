//

import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const mongoUriToUse = process.env.MONGO_URI || ENV_VARS.MONGO_URI;

    if (!mongoUriToUse) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(mongoUriToUse);
    console.log(`MongoDB Connected: ${conn.connection.host}`); 
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
