//Importing and creating an instance of express
const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");

const Role = db.role;

async function initial() {
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

db.mongoose
  .connect(`mongodb://${dbConfig.DB_NAME}:${dbConfig.DB_PASSWORD}@mongo:${dbConfig.DB_PORT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    initial();
    console.log("Mongo connected successfully")
  })
  .catch((e) => {
    console.error("Mongo connection error", err);
    process.exit();
  });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
