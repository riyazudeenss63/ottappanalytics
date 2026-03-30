const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subscription: {
    type: String,
    enum: ["Free", "Premium"],
    default: "Free"
  }
});

module.exports = mongoose.model("User", userSchema);