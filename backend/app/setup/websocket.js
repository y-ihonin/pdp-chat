// Draft variant

// websocket.js
const WebSocket = require("ws");
const url = require("url");

const rooms = {};
const allowedUsers = {
  "room1": ["662e77d021e20ae8a41de3ef", "user2"],
  "room2": ["user4"]
};

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on("connection", (ws, request) => {
    const parsedUrl = url.parse(request.url, true);
    const roomID = parsedUrl.pathname.slice(1); // Get room ID from URL path
    const token = parsedUrl.query.token;
    const userID = token;  // Here we assume token is the user ID

    if (!allowedUsers[roomID] || !allowedUsers[roomID].includes(userID)) {
      ws.close();
      return;
    }

    if (!rooms[roomID]) {
      rooms[roomID] = [];
    }
    rooms[roomID].push(ws);

    ws.on("message", (message) => {
      const data = JSON.parse(message);
      if (data.type === "message") {
        console.log({ roomID, userID, message: data.message });
        rooms[roomID].forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ userID, message: data.message }));
          }
        });
      }
    });

    ws.on("close", () => {
      rooms[roomID] = rooms[roomID].filter(client => client !== ws);
    });
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
}

module.exports = setupWebSocket;
