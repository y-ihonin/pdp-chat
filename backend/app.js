//Importing and creating an instance of express
const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and connect to the database
const connectToDatabase = require("./app/setup/db");
connectToDatabase();

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/conversion.routes")(app);

// set port, listen for requests
const PORT = process.env.BACKEND_PORT || 4000;

const server = require("http").createServer(app); 

// Import and setup WebSocket
const setupWebSocket = require("./app/setup/websocket");
setupWebSocket(server);

app.use(express.static("public"));

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
