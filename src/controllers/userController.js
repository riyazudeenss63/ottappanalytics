const User = require("../models/User");
const { users, getNextUserId } = require("../data/sampleData");

const getAllUsers = (req, res) => {
  res.json(users);
};

const createUser = (req, res) => {
  const { name, subscription } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  const duplicate = users.find(
    u => u.name.toLowerCase() === name.trim().toLowerCase()
  );

  if (duplicate) {
    return res.status(409).json({ message: "User with this name already exists" });
  }

  const validSubscriptions = ["Free", "Premium"];
  const subType =
    subscription && validSubscriptions.includes(subscription)
      ? subscription
      : "Free";

  const newUser = {
    id: getNextUserId(),
    name: name.trim(),
    subscription: subType
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added",
    user: newUser
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, subscription } = req.body;

  if (name) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Invalid name" });
    }
    user.name = name.trim();
  }

  if (subscription) {
    const validSubscriptions = ["Free", "Premium"];
    if (!validSubscriptions.includes(subscription)) {
      return res.status(400).json({ message: "Subscription must be 'Free' or 'Premium'" });
    }
    user.subscription = subscription;
  }

  res.json({
    message: "User updated",
    user
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deleted = users.splice(index, 1)[0];

  res.json({
    message: "User deleted",
    user: deleted
  });
};

// Optional MongoDB create
const createUserInMongo = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  createUserInMongo
};