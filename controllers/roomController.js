const Room = require("../models/RoomModel");
const CRUDfactory = require("../utils/CRUDfactory");

const roomsFactory = new CRUDfactory(Room, "roomName");

exports.getAll = roomsFactory.getAll();
exports.createOne = roomsFactory.createOne();
exports.deleteOne = roomsFactory.deleteOne();
