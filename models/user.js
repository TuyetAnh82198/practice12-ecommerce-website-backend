const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: false },
  userId: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
