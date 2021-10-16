const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxLength: 100,
  },
});

UserSchema.pre("save", function (next) {
  const plainPassword = this.password;
  const hashedPassword = crypto
    .createHash("sha256")
    .update(plainPassword)
    .digest("hex");

  this.password = hashedPassword;
  next();
});

const Model = mongoose.model("User", UserSchema);
module.exports = Model;
