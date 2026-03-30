const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/smartott");
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB Connection Error:", err.message);
  }
};

module.exports = connectDB;