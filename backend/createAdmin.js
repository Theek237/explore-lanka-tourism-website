import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { ENV_VARS } from "./config/envVars.js";
import { User } from "./models/User.js";

async function createAdminUser() {
  try {
    const mongoUriToUse = process.env.MONGO_URI || ENV_VARS.MONGO_URI;
    if (!mongoUriToUse) {
      throw new Error(
        "MONGO_URI not found. Please set it in your environment variables."
      );
    }
    await mongoose.connect(mongoUriToUse);
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@explorelanka.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@explorelanka.com");
    console.log("Password: admin123");
    console.log("Please change this password after first login!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdminUser();
