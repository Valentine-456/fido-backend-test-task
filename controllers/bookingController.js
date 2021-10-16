const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");
const Room = require("../models/RoomModel");
const catchAsync = require("../utils/catchAsync");

exports.getBookinsForRoom = catchAsync(async (req, res, next) => {
  const { roomName } = req.params;
  const { startTime, endTime } = req.query;

  if (!startTime || !endTime)
    return res.status(400).json({
      status: "fail",
      message: "Bad request, some parametrs arent included.",
    });

  const room = await Room.findOne({ roomName });
  if (!room)
    return res.status(400).json({
      status: "fail",
      message: "Room doesnt exist in a system.",
    });

  const bookings = await Booking.bookingsWithinTime(
    room._id,
    startTime,
    endTime
  );

  res.status(200).json({
    status: "success",
    length: bookings.length,
    data: bookings,
  });
});

exports.makeABooking = catchAsync(async (req, res, next) => {
  const { email, roomName, startTime, endTime } = req.body;
  if (!email || !roomName || !startTime || !endTime)
    return res.status(400).json({
      status: "fail",
      message: "Bad request, some parametrs arent included.",
    });

  const user = await User.findOne({ email });
  const room = await Room.findOne({ roomName });
  if (!user || !room)
    return res.status(400).json({
      status: "fail",
      message: "Either user or/and room doesnt exist in a system.",
    });

  const hasBookings = await Booking.bookingsWithinTime(
    room._id,
    startTime,
    endTime
  );
  if (!!hasBookings.length) {
    return res.status(400).json({
      status: "fail",
      message: "This room is already booked for this time.",
    });
  }

  const booking = await Booking.create({
    user: user._id,
    room: room._id,
    startTime,
    endTime,
  });

  return res.status(201).json({
    status: "success",
    data: booking,
  });
});
