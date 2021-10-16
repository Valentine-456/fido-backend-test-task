const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const { MONGO_DB_URL, MONGO_DB_PASSWORD } = process.env;
const DB_ADRESS = MONGO_DB_URL.replace("<password>", MONGO_DB_PASSWORD);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is running... "));
mongoose
  .connect(DB_ADRESS)
  .then(console.log("Connected to DB... "))
  .catch("ERROR: Couldn't connect to DB!");
