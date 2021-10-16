const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

BookingSchema.statics.bookingsWithinTime = async function (
  roomId,
  wantedStartTime,
  wantedEndTime
) {
  const bookings = await this.find({
    $or: [
      {
        room: roomId,
        startTime: { $lte: wantedStartTime },
        endTime: { $gte: wantedEndTime },
      },
      {
        room: roomId,
        startTime: { $gte: wantedStartTime, $lte: wantedEndTime },
      },
      {
        room: roomId,
        endTime: { $gte: wantedStartTime, $lte: wantedEndTime },
      },
    ],
  });

  return bookings;
};

const Model = mongoose.model("Booking", BookingSchema);
module.exports = Model;
