const Room = require("../models/room.model");


const getMessagesByRoomId = async (roomId) => {
  try {
    const room = await Room.findById(roomId)
      .populate({
        path: "messages",
        populate: {
          path: "userId",
          select: "username",
        },
      });

    if (!room) {
      throw new Error("Room not found");
    }

    return room.messages.map(message => {
      const messageObject = message.toObject();
      messageObject.user = messageObject.userId;
      delete messageObject.userId;
      return messageObject;
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

exports.getMessagesByRoomId = async (req, res) => {
  const roomId = req.params.id;

  try {
    const messages = await getMessagesByRoomId(roomId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRoom = async (req, res) => {
  const { name, participants } = req.body;

  // Basic validation
  if (!participants || !Array.isArray(participants) || participants.length === 0) {
    return res.status(400).json({ error: "Participants are required and should be an array." });
  }

  try {
    // Create the new room
    const createdUserId = req.user?.id;

    const newRoom = new Room({
      name: name || "Unnamed Room", // If name is not provided, default to 'Unnamed Room'
      participants: [createdUserId, ...participants],
    });

    // Save the room to the database
    const savedRoom = await newRoom.save();

    // Respond with the newly created room
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Failed to create room" });
  }
};

exports.getRooms = async (req, res) => {
  try {
    // Create the new room
    const userId = req.user?.id;

    let rooms = [];

    await Room.find({
      participants: userId
    })
      .select("-messages")  // Exclude the messages field
      .populate({
        path: "participants",
        select: "id username" // Select only the id and name fields
      })
      .then(items => {
        rooms.push(...items);
      })
      .catch(err => {
        console.error(err);
      });

    res.status(200).json({ results: rooms });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Failed to create room" });
  }
};

exports.getSingleRoomById = async (req, res) => {
  const roomId = req.params.id;

  try {
    const userId = req.user?.id;

    const room = await Room.findOne({
      _id: roomId,
      participants: userId
    })
      .select("-messages")
      .populate({
        path: "participants",
        select: "id username"
      });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    };

    res.status(200).json(room);
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
};
