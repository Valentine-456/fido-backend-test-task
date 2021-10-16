const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  location: {
    type: String,
    maxlength: 256,
  },
  seatsNumber: {
    type: Number,
    required: true,
    max: 100,
    min: 0,
  },
});

const model = mongoose.model("Room", RoomSchema);

module.exports = model;
