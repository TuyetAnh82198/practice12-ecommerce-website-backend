const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderListSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  delivery: { type: String, required: true },
  status: { type: String, required: true },
  orderList: [
    {
      img: { type: String, required: true },
      pdname: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: String, required: true },
      total: { type: Number, required: true },
      _id: { type: String, required: true },
    },
  ],
  totalOrder: { type: Number, require: true },
});

module.exports = mongoose.model("OrderList", orderListSchema);
