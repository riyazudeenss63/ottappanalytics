const { users, videos } = require("../data/sampleData");

const getAdminStats = (req, res) => {
  const totalUsers = users.length;
  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const totalWatchTime = videos.reduce((sum, v) => sum + v.watchTime, 0);
  const premiumUsers = users.filter(u => u.subscription === "Premium").length;
  const freeUsers = users.filter(u => u.subscription === "Free").length;

  res.json({
    totalUsers,
    totalVideos,
    totalViews,
    totalWatchTime,
    premiumUsers,
    freeUsers
  });
};

const getAdminVideos = (req, res) => {
  res.json(videos);
};

const getAdminUsers = (req, res) => {
  res.json(users);
};

const getAdminTopVideo = (req, res) => {
  if (videos.length === 0) {
    return res.status(404).json({ message: "No videos available" });
  }

  const topVideo = videos.reduce((max, v) => (v.views > max.views ? v : max));
  res.json(topVideo);
};

const getRecentUsers = (req, res) => {
  const recentUsers = users.slice(-5);
  res.json(recentUsers);
};

module.exports = {
  getAdminStats,
  getAdminVideos,
  getAdminUsers,
  getAdminTopVideo,
  getRecentUsers
};