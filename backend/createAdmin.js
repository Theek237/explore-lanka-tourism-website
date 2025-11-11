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
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@explorelanka.com").toLowerCase().trim();
    const rawPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.warn(
        "[WARN] ADMIN_EMAIL/ADMIN_PASSWORD not provided. Using default development credentials. Please override via env vars in production and rotate after first login."
      );
    }

    if (rawPassword.length < 6) {
      throw new Error("ADMIN_PASSWORD must be at least 6 characters long");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${rawPassword}`);
    console.log("Please change this password after first login!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdminUser();
