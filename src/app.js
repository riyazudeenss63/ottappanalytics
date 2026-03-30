const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart OTT Analytics Server Running");
});

app.use("/users", userRoutes);
app.use("/videos", videoRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/admin", adminRoutes);

module.exports = app;