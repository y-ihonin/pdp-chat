const mongoose = require("mongoose");

const AnalyticsOpenCreateRoomModal = mongoose.model(
  "AnalyticsOpenCreateRoomModal",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }, { collation: "analytics" })
);

module.exports = { AnalyticsOpenCreateRoomModal };
