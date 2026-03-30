const { videos } = require("../data/sampleData");

const getTotalViews = (req, res) => {
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  res.json({ totalViews });
};

const getTotalWatchTime = (req, res) => {
  const totalWatchTime = videos.reduce((sum, v) => sum + v.watchTime, 0);
  res.json({ totalWatchTime });
};

const getTopVideo = (req, res) => {
  if (videos.length === 0) {
    return res.status(404).json({ message: "No videos available" });
  }

  const topVideo = videos.reduce((max, v) => (v.views > max.views ? v : max));
  res.json(topVideo);
};

const getVideoAnalytics = (req, res) => {
  const stats = videos.map(v => ({
    id: v.id,
    title: v.title,
    views: v.views,
    watchTime: v.watchTime,
    avgWatchTime: v.views > 0 ? (v.watchTime / v.views).toFixed(2) : 0
  }));

  res.json(stats);
};

module.exports = {
  getTotalViews,
  getTotalWatchTime,
  getTopVideo,
  getVideoAnalytics
};