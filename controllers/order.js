const mongoose = require("mongoose");
const OrderModel = require("../models/order");

const order = async (req, res) => {
  //   console.log(req.body);
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
    const existingProduct = await OrderModel.findOne({
      userId: req.body.userId,
      _id: req.body._id,
    });
    if (!existingProduct) {
      const newProduct = new OrderModel(req.body);
      newProduct.save();
    } else {
      await OrderModel.findOneAndUpdate(
        { userId: req.body.userId, _id: req.body._id },
        {
          price: req.body.price,
          quantity: req.body.quantity,
          total: req.body.total,
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const getOrderList = async (req, res) => {
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
    const orderList = await OrderModel.find({ userId: req.body.userId });
    // console.log(orderList);
    if (!orderList) {
      return res.status(200).json({ orderList: [], total: 0 });
    }
    const totalArr = orderList.map((pd) => pd.total);
    return res.status(200).json({
      orderList: orderList,
      total: totalArr.reduce((acc, total) => acc + total, 0),
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { order, getOrderList };
