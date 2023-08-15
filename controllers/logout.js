const { Session } = require("express-session");
const mongoose = require("mongoose");
const SessionModel = require("../models/session");

const logOut = async (req, res) => {
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
    await SessionModel.findOneAndDelete({
      "session.user.userId": req.body.id,
      "session.user.role": "client",
    });
    return res.status(200).json({ message: "You are logged out" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = logOut;
