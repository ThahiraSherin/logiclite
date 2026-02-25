const mongoose = require("mongoose");
const User = require("./models/User");

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://knk77524:D2exqB7sFu5p5aLu@cluster0.thbfnpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@logiclite.com" });
    if (existingAdmin) {
      console.log("✅ Admin user already exists!");
      return process.exit(0);
    }

    // Create new admin
    const admin = new User({
      username: "admin",
      email: "admin@logiclite.com",
      password: "password123",
      role: "admin",
    });

    await admin.save();
    console.log("🎉 Demo admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
}

// Only run if called directly (not when imported)
if (require.main === module) {
  seedAdmin();
}

module.exports = seedAdmin;