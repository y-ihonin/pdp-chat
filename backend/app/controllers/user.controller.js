const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const User = require("../models/user.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.usersList = async (req, res) => {
  let currentUserId = null;

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    const decoded = jwt.verify(token, config.secret); // Use your JWT secret key

    const currentUser = await User.findOne({ _id: decoded.id });

    currentUserId = currentUser.id;
  }

  const users = await User.find({ _id: { $ne: currentUserId || null } });

  const payload = users.map(user => {
    return {
      id: user.id,
      username: user.username,
    };
  });

  res.send({ results: payload, count: payload.length });
};
