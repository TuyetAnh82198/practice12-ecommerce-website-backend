const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user");

const signup = async (req, res) => {
  try {
    await mongoose.createConnection(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.ydyd3d0.mongodb.net/"
    );
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Existing User" });
    }
    const newUser = new UserModel({
      fullname: req.body.fullname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone: req.body.password,
      userId: Math.random() * 10,
      role: "client",
    });
    newUser.save();
    return res.redirect(`${process.env.WEBSITE_FOR_CLIENT}login`);
  } catch (err) {
    console.log(err);
  }
};

const signupAdmin = async (req, res) => {
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
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Existing User" });
    }
    const newUser = new UserModel({
      fullname: req.body.fullname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone: req.body.password,
      userId: Math.random() * 10,
      role: "admin",
    });
    newUser.save();
    return res.redirect(process.env.WEBSITE_FOR_ADMIN_LOGIN);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signup, signupAdmin };
