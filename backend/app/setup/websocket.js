// Draft variant

// websocket.js
const WebSocket = require("ws");
const url = require("url");

// helpers
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const Room = require("../models/room.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");


async function checkIfUserIsAllowed({ roomID, token }) {
  try {
    const room = await Room.findOne({ _id: roomID });

    if (!room) {
      return { isAllowed: false, user: null };
    }

    const decoded = jwt.verify(token, config.secret); 

    const currentUser = await User.findOne({ _id: decoded.id });

    const isUserAbleConnect = room.participants.some(participant => participant.equals(currentUser._id));

    if (!isUserAbleConnect) {
      return { isAllowed: false, user: null };
    }

    return { isAllowed: true, user: currentUser };
  } catch (err) {
    return { isAllowed: false, user: null };
  }
}

const saveMessage = async ({ userId, text, attachments = null, roomId }) => {
  const message = new Message({
    userId,
    text,
    attachments,
  });

  const savedMessage = await message.save();
  
  const room = await Room.findById(roomId);
  
  if (!room) {
    return;
  }

  room.messages.push(savedMessage._id);
  
  await room.save();

  const payloadMessage = await savedMessage.populate("userId", "name username");

  return {
    _id: payloadMessage._id,
    user: payloadMessage.userId,
    text: payloadMessage.text,
    attachments: payloadMessage.attachments,
    date: payloadMessage.date,
  };
};

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ noServer: true });
  const rooms = new Map();

  wss.on("connection", async (ws, request) => {
    const parsedUrl = url.parse(request.url, true);
    const roomID = parsedUrl.pathname.slice(1); // Get room ID from URL path
    const token = parsedUrl.query.token;

    const { isAllowed } = await checkIfUserIsAllowed({ roomID, token });

    if (!isAllowed) {
      ws.close();
      return;
    }

    // Add the client to the room
    if (!rooms.has(roomID)) {
      rooms.set(roomID, new Set());
    }
    rooms.get(roomID).add(ws);

    ws.on("message", async (message) => {
      const data = JSON.parse(message);

      if (data.message && data.userId ) {
        const currentMessage = await saveMessage({
          userId: data.userId,
          text: data.message,
          roomId: roomID,
        })

        // Broadcast the message to all connected clients
        const clientsInRoom = rooms.get(roomID);
        clientsInRoom.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message: currentMessage }));
          }
        });
      }
    });

    ws.on("close", () => {
      const clientsInRoom = rooms.get(roomID);
      clientsInRoom.delete(ws);
      
      // Optionally, remove the room if it's empty
      if (clientsInRoom.size === 0) {
        rooms.delete(roomID);
      }
    });
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
}

module.exports = setupWebSocket;
