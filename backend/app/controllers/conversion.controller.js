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

    return room.messages;
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
