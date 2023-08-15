const mongoose = require("mongoose");

const OrderListModel = require("../models/orderList");

const getHistory = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://cluster0.ydyd3d0.mongodb.net/test?retryWrites=true&w=majority",
      {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const orderList = await OrderListModel.find({ userId: req.body.userId });
    if (orderList) {
      return res.status(200).json({ result: orderList });
    }
    return res.status(200).json({ result: [] });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getHistory;
