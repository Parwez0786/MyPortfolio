const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbName = (process.env.MONGODB_DB || "portfolio").trim();
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName,
    });
    console.log(
      `MongoDB connected: ${conn.connection.host} (db: ${conn.connection.name})`
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
