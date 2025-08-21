import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { ENV_VARS } from "./config/envVars.js";
import { User } from "./models/User.js";

async function createAdminUser() {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI);

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
