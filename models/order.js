const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: String, required: true },
  _id: { type: String, required: true },
  img: { type: String, required: true },
  pdname: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
