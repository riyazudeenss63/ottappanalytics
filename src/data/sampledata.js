let videos = [
  { id: 1, title: "Movie 1", views: 120, watchTime: 300 },
  { id: 2, title: "Movie 2", views: 80, watchTime: 200 },
  { id: 3, title: "Movie 3", views: 40, watchTime: 100 }
];

let users = [
  { id: 1, name: "Kishore", subscription: "Premium" },
  { id: 2, name: "Arun", subscription: "Free" }
];

const getNextVideoId = () =>
  videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1;

const getNextUserId = () =>
  users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

module.exports = {
  videos,
  users,
  getNextVideoId,
  getNextUserId
};