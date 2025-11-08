//

import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    // 1. Docker වලින් එන URI එකට මුල් තැන දෙන්න. නැත්නම් පරණ ක්‍රමයට file එකෙන් ගන්න.
    const mongoUriToUse = process.env.MONGO_URI || ENV_VARS.MONGO_URI;

    // 2. URI එකක් තියෙනවද කියලා check කරන්න
    if (!mongoUriToUse) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // 3. අලුතෙන් හදපු variable එකෙන් connect වෙන්න
    const conn = await mongoose.connect(mongoUriToUse);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Connection එක හරි ගියාම message එකක් දාමු
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
