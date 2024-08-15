// db.js
const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");
const db = require("../models");

const Role = db.role;

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb://${dbConfig.DB_NAME}:${dbConfig.DB_PASSWORD}@mongo:${dbConfig.DB_PORT}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Mongo connected successfully");

    await initializeRoles();
  } catch (err) {
    console.error("Mongo connection error", err);
    process.exit();
  }
}

async function initializeRoles() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({ name: "user" }).save();
      console.log("Added 'user' to roles collection");

      await new Role({ name: "moderator" }).save();
      console.log("Added 'moderator' to roles collection");

      await new Role({ name: "admin" }).save();
      console.log("Added 'admin' to roles collection");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = connectToDatabase;
