const express = require("express");
const userController = require("./controllers/userController");
const roomController = require("./controllers/roomController");
const bookingController = require("./controllers/bookingController");
const errorHandler = require("./controllers/errorHandler");
const app = express();

app.use(express.json({ limit: "10kb" }));

app
  .route("/api/users")
  .get(userController.getAll)
  .post(userController.createOne);
app.route("/api/users/:id").delete(userController.deleteOne);

app
  .route("/api/rooms")
  .get(roomController.getAll)
  .post(roomController.createOne);
app.route("/api/rooms/:id").delete(roomController.deleteOne);

app.route("/api/bookings").post(bookingController.makeABooking);
app.route("/api/bookings/:roomName").get(bookingController.getBookinsForRoom);

app.all("*").use(errorHandler);

module.exports = app;
