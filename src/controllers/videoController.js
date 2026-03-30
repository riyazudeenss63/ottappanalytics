const { videos, getNextVideoId } = require("../data/sampleData");

const getAllVideos = (req, res) => {
  res.json(videos);
};

const createVideo = (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  const duplicate = videos.find(
    v => v.title.toLowerCase() === title.trim().toLowerCase()
  );

  if (duplicate) {
    return res.status(409).json({ message: "Video with this title already exists" });
  }

  const newVideo = {
    id: getNextVideoId(),
    title: title.trim(),
    views: 0,
    watchTime: 0
  };

  videos.push(newVideo);

  res.status(201).json({
    message: "Video added",
    video: newVideo
  });
};

const getVideoById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  const video = videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  res.json(video);
};

const updateVideo = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  const video = videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  const duplicate = videos.find(
    v => v.id !== id && v.title.toLowerCase() === title.trim().toLowerCase()
  );

  if (duplicate) {
    return res.status(409).json({ message: "Video with this title already exists" });
  }

  video.title = title.trim();

  res.json({
    message: "Video updated",
    video
  });
};

const deleteVideo = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  const index = videos.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Video not found" });
  }

  const deleted = videos.splice(index, 1)[0];

  res.json({
    message: "Video deleted",
    video: deleted
  });
};

const addView = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  const video = videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  video.views += 1;

  res.json({
    message: "View added",
    views: video.views
  });
};

const addWatchTime = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  const video = videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  const time = req.body.time;

  if (time === undefined || time === null) {
    return res.status(400).json({ message: "Watch time is required" });
  }

  if (typeof time !== "number" || isNaN(time)) {
    return res.status(400).json({ message: "Watch time must be a number" });
  }

  if (time < 0) {
    return res.status(400).json({ message: "Watch time cannot be negative" });
  }

  video.watchTime += time;

  res.json({
    message: "Watch time updated",
    watchTime: video.watchTime
  });
};

module.exports = {
  getAllVideos,
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  addView,
  addWatchTime
};